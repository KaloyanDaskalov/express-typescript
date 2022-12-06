document.addEventListener('DOMContentLoaded', (e) => {
	const toDos = document.getElementById("toDos")
	let node = null
	let nodeContent = null
	toDos.addEventListener('click', editToDo)

	function editToDo(e) {
		if (e.target.className === 'fas fa-edit') {
			e.preventDefault()
			if (node) {
				node.innerHTML = nodeContent
			}
			const current = e.target
			node = current.parentElement.parentElement
			nodeContent = current.parentElement.parentElement.innerHTML
			current.parentElement.parentElement.innerHTML =
				`<form action="/edit/${current.id}" method="POST">
			<input type="text" value="${current.getAttribute('data-value')}" name="message">
			<button type="submit">Confirm</button>
			<a href="/" class="cancel">Cancel</a>
			</form>`
		}
	}
})