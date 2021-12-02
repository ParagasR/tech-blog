const currentModal = document.querySelector('#new');
const addModalBackground = document.querySelector('#add-background');
const newButton = document.querySelector('#create-new');

newButton.addEventListener('click', (event) => {
  event.preventDefault();
  currentModal.classList.add('is-active');
});

addModalBackground.addEventListener('click', (event) => {
  event.preventDefault;
  currentModal.classList.remove('is-active');
});