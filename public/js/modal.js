const currentModal = document.querySelector('.modal');
const modalBackground = document.querySelector('.modal-background');
const newButton = document.querySelector('#create-new');

newButton.addEventListener('click', (event) => {
    event.preventDefault();
    currentModal.classList.add('is-active');
});

modalBackground.addEventListener('click', (event) => {
    event.preventDefault;
    currentModal.classList.remove('is-active');
});