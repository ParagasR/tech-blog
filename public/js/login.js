//send request to api to login user
const loginButton = async (event) => {
    event.preventDefault();
    //grab the values in the two fields
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    //check to see if the exist
    console.log(email + ' ' + password)
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(email + ' ' + password)
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
    const user = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
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

document
    .querySelector('.login')
    .addEventListener('submit', loginButton);

document
    .querySelector('.signup')
    .addEventListener('submit', signupButton);