const postDelete = document.querySelector('#delete-button');
const postEdit = document.querySelector('#edit');
const editForm = document.querySelector('#edit-post');
const editModalBackground = document.querySelector('#edit-background');

let currentPostId;

const deleteHandler = async (event) => {
  if (event.target.getAttribute('data-delete')) {
    const id = event.target.getAttribute('data-delete');

    const response = await fetch(`api/post/delete/${id}`, {
      method: 'DELETE',
    });


    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete project');
    }
  }
};

const editShowModal = async (event) => {
  if (event.target.getAttribute('data-edit')) {
    const id = event.target.getAttribute('data-edit')
    currentPostId = id;

    const post = await fetch(`/edit/${id}`)

    const parsedPost = await post.json();
    if (post.ok) {
      document.querySelector('#edit-title-field').value = parsedPost.title;
      document.querySelector('#edit-post-field').value = parsedPost.post;
      postEdit.classList.add('is-active');
    } else {
      alert('Failed to open edit window')
    }

  }
}

const editHandler = async (event) => {
  event.preventDefault();


  const post = document.querySelector('#edit-post-field').value;
  const title = document.querySelector('#edit-title-field').value;
  try {
    if (post && title && currentPostId) {
      const response = await fetch(`api/post/edit/${currentPostId}`, {
        method: 'PUT',
        body: JSON.stringify({ post, title }),
        headers: { 'Content-type': 'application/json' }
      });
      console.log(response)
      if (response.ok) {
        document.location.reload()
      } else {
        alert('Unable to edit post')
      }
    }
  } catch (err) {
    console.log(err)
  }
}

document
  .querySelector('#edit-button')
  .addEventListener('click', editShowModal);

postDelete
  .addEventListener('click', deleteHandler);

//editForm returning null? unhandled promise error?
editForm
  .addEventListener('submit', editHandler);

editModalBackground
  .addEventListener('click', (event) => {
    event.preventDefault;
    postEdit.classList.remove('is-active');
  });