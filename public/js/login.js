//send request to api to login user
const loginButton = async (event) => {
    event.preventDefault();
    //grab the values in the two fields
    const email = $('#login-email').value.trim();
    const password = $('#login-password').value.trim();
    //check to see if the exist
    if (email && password) {
        const response = await fetch('/api/users/login', {
            methond: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            //change to pop up
            alert('Failed to login')
        }
    }
}

