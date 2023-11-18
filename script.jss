document.getElementById('guessForm').addEventListener('submit', function(event) {
    var song1Input = document.getElementsByName('song1')[0].value;
    // Validate other fields as needed

    if (!song1Input) { // Check if the field is empty
        alert('Please enter your guess for Song 1.');
        event.preventDefault(); // Prevent form submission
    }

    // Add similar checks for other fields
});