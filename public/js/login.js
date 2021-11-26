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

//send request to api to create user
const signupButton = async (event) => {
    event.preventDefault();
    //grab all the data in the respective fields
    const user = $('#signup-username').value.trim();
    const email = $('#signup-email').value.trim();
    const password = $('#signup-password').value.trim();
    //check to see if the data exists
    if (user && email && password) {
        //send request to api to submit data to create user
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({ user, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            //go back to homepage
            document.location.replace('/')
        } else {
            //change to pop up
            alert('Failed to sign up')
        };
    };
}

//attach eventhandlers to buttons
$('#login').on('submit', loginButton);
$('#signup').on('submit', signupButton);