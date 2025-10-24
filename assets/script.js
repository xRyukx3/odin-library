const tableBody = document.querySelector("table>tbody");
const myLibrary = [];

function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(myLibrary) {
  const fragment = document.createDocumentFragment();
  const displayKeys = ["title", "author", "year", "pages", "isRead"];
  for (const book of myLibrary) {
    const tableRow = document.createElement("tr");
    tableRow.id = book["id"];
    for (const key of displayKeys) {
      const tableCell = document.createElement("td");
      let cellValue = book[key];
      if (typeof cellValue === "boolean") {
        tableCell.innerText = cellValue ? "already read" : "not read yet";
      } else {
        tableCell.innerText = cellValue;
      }
      tableCell.classList = key;
      tableRow.appendChild(tableCell);
    }
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
