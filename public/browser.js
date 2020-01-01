
function template(item) {
    return `  
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li> 
  `
}
 
document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.getElementById('create-field');
    axios.post('/create', { text: input.value }).then((response) => {
        document.getElementById('item-list').insertAdjacentHTML('beforeend', template(response.data));
        input.value = "";
        input.focus();
    }).catch((err) => {
        console.log(err);
    })
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-me')) {
        let UserInput = prompt('Add Something new', e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
        if (UserInput) {
            axios.post('/update-item', { text: UserInput, id: e.target.getAttribute("data-id") }).then(() => {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = UserInput;
            }).catch((err) => {
                console.log(err);
            })
        }
    }

});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-me')) {
        if (confirm('Are you really sure')) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then(() => {
                e.target.parentElement.parentElement.remove();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
})
