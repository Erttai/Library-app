const addBookBtn = document.getElementById("addBookBtn");
const grid = document.querySelector(".grid");
//
//Modal elements
const modal = document.querySelector(".modal");
const submitBtn = document.querySelector(".btn-light-green");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
//
//Form atributes
const form = document.querySelector(".modal__form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const numberOfPages = document.getElementById("pages");
const isRead = document.getElementById("is-read");

let myLibrary = [];

//Modal window functionality
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBookBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

const resetForm = function () {
  title.value = "";
  author.value = "";
  numberOfPages.value = "";
};

//Constructor functon
function Book(title, author, numberOfPages, readen) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readen = readen;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
    this.readen ? "readen" : "not read yet"
  }`;
};

//Submit button and object
// Check if i can use and submit event instead of click. To do so I would have to attach the event to the form instead of the submit button.
submitBtn.addEventListener("click", e => {
  if (
    title.validity.valid &&
    author.validity.valid &&
    numberOfPages.validity.valid
  ) {
    const newBook = new Book(title.value, author.value, numberOfPages.value);
    myLibrary.push(newBook);
    console.log(myLibrary);
    e.preventDefault();
    resetForm();
  }
});
