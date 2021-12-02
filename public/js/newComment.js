const newFormHandler = async (event) => {
    event.preventDefault();
    let comment = document.querySelector('#comment-field').value;
    if (comment) {
        const response = await fetch('/api/post/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.querySelector('#comment-field').value = "";
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    };
};

document
    .querySelector('#add-comment')
    .addEventListener('submit', newFormHandler)