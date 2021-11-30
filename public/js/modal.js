const currentModal = document.querySelector('.modal');
const modalBackground = document.querySelector('.modal-background');
const commentButton = document.querySelector('#new-comment');
const commentForm = document.querySelector('#add-comment')
const comment = document.querySelector('#comment-field').value

commentButton.addEventListener('click', (event) => {
    event.preventDefault();
    currentModal.classList.add('is-active')
})

modalBackground.addEventListener('click', (event) => {
    event.preventDefault;
    currentModal.classList.remove('is-active')
})

commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (comment) {
        const response = await fetch('/api/post/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
})