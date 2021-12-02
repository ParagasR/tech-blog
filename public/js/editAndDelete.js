const postDelete = document.querySelector('#delete');

const deleteHandler = async (event) => {

    const post_id = postDelete.dataset.id;
    console.log(post_id);
}

postDelete.addEventListener('click', deleteHandler)