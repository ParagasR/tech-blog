const postDelete = document.querySelector('#delete-button');
const postEdit = document.querySelector('#edit');
const formEdit = document.querySelector('#edit-post');
const editModalBackground = document.querySelector('#edit-background');

const deleteHandler = async (event) => {
  if (event.target.getAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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
  if (event.target.getAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const post = await fetch(`/edit/${id}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })

    const parsedPost = await post.json();
    console.log(parsedPost)
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

  const id = event.target.getAttribute('data-id')
  const post = document.querySelector('#edit-post-field').value;
  const title = document.querySelector('#edit-title-field').value;
  console.log(id)
  if (post && title) {
    const response = await fetch(`api/post/edit/${id}`, {
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
}

document.querySelector('#edit-button').addEventListener('click', editShowModal);

postDelete.addEventListener('click', deleteHandler);
formEdit.addEventListener('submit', editHandler);

editModalBackground.addEventListener('click', (event) => {
  event.preventDefault;
  postEdit.classList.remove('is-active');
});