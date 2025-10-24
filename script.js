const tableBody = document.querySelector("table>tbody");
const myLibrary = [];

function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary(myLibrary) {
  const fragment = document.createDocumentFragment();
  for (const book of myLibrary) {
    const tableRow = document.createElement("tr");
    for (const key in book) {
      const tableCell = document.createElement("td");
      tableCell.innerText = book[key];
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

console.log(myLibrary);
