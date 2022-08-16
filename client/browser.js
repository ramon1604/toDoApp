//Initial page render
let initialItems = (JSON.parse(atob(items))).map((item) => itemsToInsert(item)).join('')
document.querySelector('ul').insertAdjacentHTML("beforeend", initialItems)

document.addEventListener("click", (e) => {
    let itemMainParent = e.target.parentElement.parentElement
    // Create item
    if (e.target.classList.contains("create-item") && itemMainParent.querySelector('input[name="item"]').value) {
        if (confirm(`Add item: ${itemMainParent.querySelector('input[name="item"]').value} ?`)) {
            axios.post('/create-item', { item: itemMainParent.querySelector('input[name="item"]').value }).then((response) => {
                if (response.data._id) {
                    document.querySelector('ul').insertAdjacentHTML("beforeend", itemsToInsert(response.data))
                    itemMainParent.querySelector('input[name="item"]').value = ''
                    itemMainParent.querySelector('input[name="item"]').focus()
                }
            }).catch((response) => console.log(response))
        }
    }

    // Delete item
    if (e.target.classList.contains("delete-me")) {
        if (confirm(`Delete item: ${itemMainParent.querySelector(".item-text").innerHTML} ?`)) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then((response) => {
                if (response.data == 'ok') {
                    itemMainParent.remove()
                }
            }).catch((response) => console.log(response))
        }
    }

    // Update item
    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter new text", itemMainParent.querySelector(".item-text").innerHTML)
        if (userInput) {
            axios.post('/update-item', { id: e.target.getAttribute("data-id"), item: userInput }).then((response) => {
                if (response.data == 'ok') {
                    itemMainParent.querySelector(".item-text").innerHTML = userInput
                }
            }).catch((response) => console.log(response))
        }
    }
})