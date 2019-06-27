const formAddBooks = document.getElementById("formAddBooks");
const bookList = document.getElementById("bookList");

//LISTENERS
formAddBooks.addEventListener("submit", (e) => {
	e.preventDefault();
	const bookName = document.getElementById("bookName").value;
	const author = document.getElementById("author").value;
	const sinopsis = document.getElementById("sinopsis").value;

	const book = new Book(bookName, author, sinopsis);
	const ui = new Ui();

	// Input User Validation
	if (bookName === "" || author === "" || sinopsis === "") {
		return ui.showMessage("Please insert data in all fields", "danger");
	}

	ui.addBook(book);
	ui.showMessage('Book added successfully', 'success');
	ui.resetForm();
});


bookList.addEventListener('click', (e) =>{
	if (e.target.name == 'delete') {
		const ui = new Ui();
		ui.deleteBook(e.target);
	}
})

//END LISTENERS

// CLASSES 
class Book {
	constructor(bookName, author, sinopsis) {
		this.bookName = bookName;
		this.author = author;
		this.sinopsis = sinopsis;
	}
}

class Ui {
	//METHOD ADD BOOK
	addBook(book) {
		bookList.innerHTML += `
		<div class="card mb-3 w-100">
			<div class="card-body">
				<h5 class="card-title">${book.bookName}</h5>
				<h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
				<p class="card-text">${book.sinopsis}</p>
				<a href="#" class="btn btn-danger" name="delete">Delete book</a>
			</div>
		</div>
	`;
	}
	//METHOD DELETE BOOK
	deleteBook(element) {
		element.parentNode.parentNode.remove();
		this.showMessage("Book deleted successfully", "success");
	}

	//METHOD SHOW MESSAGES
	showMessage(message, cssClass) {
		const divContainer = document.querySelector(".container");
		const app = document.querySelector("#app");
		const element = document.createElement("div");

		element.className = `alert alert-${cssClass} mt-3`;
		element.appendChild(document.createTextNode(message));
		divContainer.insertBefore(element, app);

		//After 2 seconds, remove alert message
		setTimeout(() => {
			const alertMessage = document.querySelector(".alert");
			alertMessage.remove();
		}, 2000);
	}
	//METHOD RESET FORM
	resetForm() {
		formAddBooks.reset();
	}
}
//END CLASSES