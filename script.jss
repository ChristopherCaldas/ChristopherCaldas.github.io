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
    var selections = {}; // To keep track of selections for each round

    document.querySelectorAll('.song-select').forEach(function(select) {
        select.addEventListener('change', function() {
            var round = this.getAttribute('data-round');
            var songId = this.getAttribute('id');
            var player = this.value;
            var feedbackElement = document.getElementById('feedback-' + songId);

            // Reset selections if a new choice is made
            if (!selections[round]) {
                selections[round] = [];
            }

            // Check if this player has already been selected in this round
            if (player && selections[round].includes(player)) {
                // Duplicate selection - update feedback
                feedbackElement.textContent = '⚠️ Already selected in this round';
                feedbackElement.style.color = 'red';
            } else {
                // Valid selection - update selections and clear feedback
                if (player) {
                    selections[round].push(player);
                }
                feedbackElement.textContent = '';
                feedbackElement.style.color = 'initial';
            }
        });
    });
});