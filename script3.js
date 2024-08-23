document.getElementById('guessForm').addEventListener('submit', function(event) {
    var song1Input = document.getElementsByName('song1')[0].value;
    // Validate other fields as needed

    if (!song1Input) { // Check if the field is empty
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

});