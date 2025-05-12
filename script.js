document.addEventListener("DOMContentLoaded", showBooks);

document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const isbn = document.getElementById("isbn").value.trim();

  if (!title || !author || !isbn) {
    alert("Please fill in all fields.");
    return;
  }

  const book = { title, author, isbn };
  addBookToList(book);
  saveBook(book);
  this.reset();
});

function addBookToList(book) {
  const list = document.querySelector("#book-list tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button class="delete">Delete</button></td>
  `;

  list.appendChild(row);
}

function showBooks() {
  const books = getBooks();
  books.forEach(addBookToList);
}

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function deleteBookFromStorage(isbn) {
  let books = getBooks();
  books = books.filter(book => book.isbn !== isbn);
  localStorage.setItem("books", JSON.stringify(books));
}

document.querySelector("#book-list tbody").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr");
    const isbn = row.children[2].textContent;
    row.remove();
    deleteBookFromStorage(isbn);
  }
});
