const newFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#post-field').value;
    const title = document.querySelector('#title-field').value;
    if (comment && title) {

        const response = await fetch('api/post/', {
            method: 'POST',
            body: JSON.stringify({ comment, title }),
            headers: { 'Content-type': 'application/json' }
        });
        if (response.ok) {
            document.querySelector('#post-field').value = "";
            document.querySelector('#title-field').value = "";
            document.location.reload();
        } else {
            alert(response.statusText)
        };
    };
};

document
    .querySelector('#add-post')
    .addEventListener('submit', newFormHandler)