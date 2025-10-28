const tableBody = document.querySelector("table>tbody");
const dialogBookDataForm = document.querySelector("dialog#new-book-data");
const showDialogButton = document.querySelector("button.new-book");
const closeDialogButton = document.querySelector("button#cancel");
const bookDataForm = document.getElementById("book-data");
const myLibrary = [];

function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookById(id) {
  const indexToRemove = myLibrary.findIndex((obj) => obj.id === id);
  if (indexToRemove !== -1) {
    myLibrary.splice(indexToRemove, 1);
  }
}

function changeReadStatus(id) {
  const indexToChangeReadStatus = myLibrary.findIndex((obj) => obj.id === id);
  if (indexToChangeReadStatus !== -1) {
    myLibrary[indexToChangeReadStatus].toggleReadStatus();
  }
}

function displayLibrary(myLibrary) {
  tableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const displayKeys = ["title", "author", "year", "pages", "isRead"];
  for (const book of myLibrary) {
    const tableRow = document.createElement("tr");
    tableRow.id = book["id"];
    for (const key of displayKeys) {
      const tableCell = document.createElement("td");
      let cellValue = book[key];
      if (typeof cellValue === "boolean") {
        tableCell.innerText = cellValue ? "Already read" : "Not read yet";
      } else {
        tableCell.innerText = cellValue;
      }
      tableCell.classList = key;
      tableRow.appendChild(tableCell);
    }
    const tableCell = document.createElement("td");
    const removeBookButton = document.createElement("button");
    removeBookButton.id = "remove-book";
    removeBookButton.innerText = "Remove";
    tableCell.appendChild(removeBookButton);
    const changeReadStatusButton = document.createElement("button");
    changeReadStatusButton.id = "change-read-status-button";
    changeReadStatusButton.innerText = "Change read status";
    tableCell.appendChild(changeReadStatusButton);
    tableRow.appendChild(tableCell);

    fragment.appendChild(tableRow);
  }
  tableBody.appendChild(fragment);
}

const book1 = new Book(
  "Mi planta de naranja lima",
  "José Mauro de Vasconcelos",
  2019,
  253,
  true
);
const book2 = new Book(
  "Don Quijote de la Mancha",
  "Miguel de Cervantes Saavedra",
  2014,
  462,
  true
);
const book3 = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  1997,
  223,
  false
);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
displayLibrary(myLibrary);

showDialogButton.addEventListener("click", () => {
  dialogBookDataForm.showModal();
});

bookDataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.querySelector('input[name="status"]:checked').value;

  const book = new Book(title, author, year, pages, isRead);
  addBookToLibrary(book);
  displayLibrary(myLibrary);
  bookDataForm.reset();
});

tableBody.addEventListener("click", (e) => {
  const id = e.target.closest("tr").id;
  if (e.target.matches("#remove-book")) {
    removeBookById(id);
  }
  if (e.target.matches("#change-read-status-button")) {
    changeReadStatus(id);
  }
  displayLibrary(myLibrary);
});

closeDialogButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialogBookDataForm.close();
  bookDataForm.reset();
});
