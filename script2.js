var playerSelectionCount = {}; // Global object to track player selections

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
            updateSelectionsForRound(round, allDropdowns);
        });
    });

    function updateSelectionsForRound(round, dropdowns) {
        var selections = [];
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
                // Update global selection count
                playerSelectionCount[player] = (playerSelectionCount[player] || 0) + 1;

                if (playerSelectionCount[player] > 5) {
                    feedbackElement.textContent = '⚠️ Selected more than 5 times';
                    feedbackElement.style.color = 'red';
                } else {
                    // Show the number of times this player has been selected
                    feedbackElement.textContent = `Selected ${playerSelectionCount[player]} time(s)`;
                    feedbackElement.style.color = 'green';
                    selections.push(player);
                }
            }
        });
    }
});