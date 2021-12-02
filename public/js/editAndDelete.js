const postDelete = document.querySelector('#delete');

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

postDelete.addEventListener('click', deleteHandler)