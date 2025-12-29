var playerSelectionCount = {}; // Object to track player selections per round
var lastSelections = {}; // Object to track the last selection of each dropdown

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
  "Lauren"
];

document.getElementById('guessForm').addEventListener('submit', function(event) {
  const selects = document.querySelectorAll('select.song-select');
  const anyMissing = Array.from(selects).some(s => !s.value);
  if (anyMissing) {
    alert('Missing A Selection');
    event.preventDefault();
  }
});


  if (!song1Input) {
    alert("Missing A Selection");
    event.preventDefault(); // Prevent form submission
  }

  // Add similar checks for other fields
});

document.addEventListener("DOMContentLoaded", function () {
  var allDropdowns = document.querySelectorAll(".song-select");

  // --- NEW: inject player options into every dropdown once ---
  allDropdowns.forEach(function (select) {
    ensurePlayersInjected(select);
  });

  // Your existing change listeners
  allDropdowns.forEach(function (select) {
    select.addEventListener("change", function () {
      var round = this.getAttribute("data-round");
      var currentSelection = select.value;
      var previousSelection = lastSelections[select.id];

      // Initialize round count object if it doesn't exist
      if (!playerSelectionCount[round]) {
        playerSelectionCount[round] = {};
      }

      // Update counts only if the selection has changed
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
    // Avoid duplicating options if the HTML already includes them
    // or if this runs more than once.
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

    // Reset feedback for all dropdowns in this round
    dropdownsInRound.forEach(function (dropdown) {
      var feedbackElement = document.getElementById("feedback-" + dropdown.id);
      if (!feedbackElement) return;
      feedbackElement.textContent = "";
      feedbackElement.style.color = "initial";
    });

    // Check for duplicate selections and update feedback
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
          // Show the number of times this player has been selected in this round
          feedbackElement.textContent = `Selected ${playerCountInRound} time(s) in this round`;
          feedbackElement.style.color = "green";
        }
      }
    });
  }
});
