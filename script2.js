var playerSelectionCount = {}; // Object to track player selections per round
var lastSelections = {}; // Object to track the last selection of each dropdown

document.getElementById('guessForm').addEventListener('submit', function(event) {
    var song1Input = document.getElementsByName('song1')[0].value;
    // Validate other fields as needed

    if (!song1Input) {
        alert('Missing A Selection');
        event.preventDefault(); // Prevent form submission
    }

    // Add similar checks for other fields
});

document.addEventListener('DOMContentLoaded', function() {
    var allDropdowns = document.querySelectorAll('.song-select');

    allDropdowns.forEach(function(select) {
        select.addEventListener('change', function() {
            var round = this.getAttribute('data-round');
            var currentSelection = select.value;
            var previousSelection = lastSelections[select.id];

            // Initialize round count object if it doesn't exist
            if (!playerSelectionCount[round]) {
                playerSelectionCount[round] = {};
            }

            // Update counts only if the selection has changed
            if (currentSelection !== previousSelection) {
                if (previousSelection) {
                    playerSelectionCount[round][previousSelection] = Math.max(0, (playerSelectionCount[round][previousSelection] || 0) - 1);
                }
                if (currentSelection) {
                    playerSelectionCount[round][currentSelection] = (playerSelectionCount[round][currentSelection] || 0) + 1;
                }
                lastSelections[select.id] = currentSelection;
            }

            updateSelectionsForRound(round, allDropdowns);
        });
    });

    function updateSelectionsForRound(round, dropdowns) {
        var dropdownsInRound = Array.from(dropdowns).filter(dropdown => dropdown.getAttribute('data-round') === round);

        // Reset feedback for all dropdowns in this round
        dropdownsInRound.forEach(function(dropdown) {
            var feedbackElement = document.getElementById('feedback-' + dropdown.id);
            feedbackElement.textContent = '';
            feedbackElement.style.color = 'initial';
        });

        // Check for duplicate selections and update feedback
        dropdownsInRound.forEach(function(dropdown) {
            var player = dropdown.value;
            var feedbackElement = document.getElementById('feedback-' + dropdown.id);

            if (player) {
                var playerCountInRound = playerSelectionCount[round][player] || 0;

                if (playerCountInRound > 5) {
                    feedbackElement.textContent = '⚠️ Selected more than 5 times in this round';
                    feedbackElement.style.color = 'red';
                } else {
                    // Show the number of times this player has been selected in this round
                    feedbackElement.textContent = `Selected ${playerCountInRound} time(s) in this round`;
                    feedbackElement.style.color = 'green';
                }
            }
        });
    }
});