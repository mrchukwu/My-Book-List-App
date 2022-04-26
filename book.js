// Book constructor
function Book(title, author, isbn) {
  (this.title = title), (this.author = author), (this.isbn = isbn);
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  //  create row
  const row = document.createElement("tr");

  // insert cols
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // create Div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// celar form fields
UI.prototype.clearFields = function () {
  const titleClear = document.getElementById("title").value;
  const authorClear = document.getElementById("author").value;
  const isbnClear = document.getElementById("isbn").value;

  titleClear = "";
  authorClear = "";
  isbnClear = "";
};

// Event listener for Add Book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please add book by filling in all form fields ", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // show success
    ui.showAlert("Book Added!", "success");

    // clear fields
    ui.clearFields(row);
  }

  e.preventDefault();
});

// Event Listener for Delete Book
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate UI
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // show message
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
