var playerSelectionCount = {}; // Track player selections per round
var lastSelections = {}; // Track the last selection of each dropdown

// Single source of truth for players
var PLAYERS = [
  "Arya",
  "Chris",
  "Diana",
  "Drew",
  "Eric",
  "Gabby",
  "Gus",
  "Josh",
  "Katie",
  "Kenzie",
  "Lauren",
];

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("guessForm");
  var allDropdowns = document.querySelectorAll(".song-select");

  // Inject player options into every dropdown
  allDropdowns.forEach(function (select) {
    ensurePlayersInjected(select);
  });

  // Submit validation (optional, but safer than hardcoding song1)
  if (form) {
    form.addEventListener("submit", function (event) {
      // require every select to be chosen (player + all songs)
      var anyMissing = Array.from(allDropdowns).some((s) => !s.value);
      if (anyMissing) {
        alert("Missing A Selection");
        event.preventDefault();
      }
    });
  }

  // Change listeners (your existing counter logic)
  allDropdowns.forEach(function (select) {
    select.addEventListener("change", function () {
      var round = this.getAttribute("data-round");
      var currentSelection = select.value;
      var previousSelection = lastSelections[select.id];

      if (!playerSelectionCount[round]) {
        playerSelectionCount[round] = {};
      }

      if (currentSelection !== previousSelection) {
        if (previousSelection) {
          playerSelectionCount[round][previousSelection] = Math.max(
            0,
            (playerSelectionCount[round][previousSelection] || 0) - 1
          );
        }
        if (currentSelection) {
          playerSelectionCount[round][currentSelection] =
            (playerSelectionCount[round][currentSelection] || 0) + 1;
        }
        lastSelections[select.id] = currentSelection;
      }

      updateSelectionsForRound(round, allDropdowns);
    });
  });

  function ensurePlayersInjected(selectEl) {
    // Avoid duplicating if you already have options in HTML
    var existingValues = new Set(
      Array.from(selectEl.options).map((o) => o.value)
    );

    PLAYERS.forEach(function (name) {
      if (existingValues.has(name)) return;

      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      selectEl.appendChild(opt);
    });
  }

  function updateSelectionsForRound(round, dropdowns) {
    var dropdownsInRound = Array.from(dropdowns).filter(
      (dropdown) => dropdown.getAttribute("data-round") === round
    );

    // Reset feedback for dropdowns in this round (skip if no span exists)
    dropdownsInRound.forEach(function (dropdown) {
      var feedbackElement = document.getElementById("feedback-" + dropdown.id);
      if (!feedbackElement) return;
      feedbackElement.textContent = "";
      feedbackElement.style.color = "initial";
    });

    // Update feedback
    dropdownsInRound.forEach(function (dropdown) {
      var player = dropdown.value;
      var feedbackElement = document.getElementById("feedback-" + dropdown.id);
      if (!feedbackElement) return;

      if (player) {
        var playerCountInRound = playerSelectionCount[round][player] || 0;

        if (playerCountInRound > 5) {
          feedbackElement.textContent =
            "⚠️ Selected more than 5 times in this round";
          feedbackElement.style.color = "red";
        } else {
          feedbackElement.textContent = `Selected ${playerCountInRound} time(s) in this round`;
          feedbackElement.style.color = "green";
        }
      }
    });
  }
});
