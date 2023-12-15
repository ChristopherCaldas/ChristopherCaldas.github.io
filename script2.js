var globalPlayerSelectionCount = {}; // Global object to track overall player selections
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
            var currentSelection = select.value;
            var previousSelection = lastSelections[select.id];

            // Update counts only if the selection has changed
            if (currentSelection !== previousSelection) {
                if (previousSelection) {
                    globalPlayerSelectionCount[previousSelection]--;
                }
                if (currentSelection) {
                    globalPlayerSelectionCount[currentSelection] = (globalPlayerSelectionCount[currentSelection] || 0) + 1;
                }
                lastSelections[select.id] = currentSelection;
            }

            var round = this.getAttribute('data-round');
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
                if (globalPlayerSelectionCount[player] > 5) {
                    feedbackElement.textContent = '⚠️ Selected more than 5 times';
                    feedbackElement.style.color = 'red';
                } else {
                    // Show the number of times this player has been selected across all dropdowns
                    feedbackElement.textContent = `Selected ${globalPlayerSelectionCount[player]} time(s)`;
                    feedbackElement.style.color = 'green';
                }
            }
        });
    }
});