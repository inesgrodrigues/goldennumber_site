function check(input) {
    if (input.value != document.getElementById('password').value) {
        input.setCustomValidity('Passwords devem coincidir');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}