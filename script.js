document.getElementById('guessForm').addEventListener('submit', function(event) {
    var song1Input = document.getElementsByName('song1')[0].value;
    // Validate other fields as needed

    if (!song1Input) { // Check if the field is empty
        alert('Please enter your guess for Song 1.');
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
                if (selections.includes(player)) {
                    // Duplicate selection - update feedback
                    feedbackElement.textContent = '⚠️ Already selected in this round';
                    feedbackElement.style.color = 'red';
                } else {
                    selections.push(player);
                }
            }
        });
    }
});