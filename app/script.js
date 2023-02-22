"use strict";
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
  isRead.checked = false;
};

//Constructor functon
function Book(title, author, numberOfPages, boolean) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = boolean;
  this.id = myLibrary.length + 1;
}

//
//Looping through myLibrary Array to display books cards
const displayBooks = function (array) {
  grid.innerHTML = "";
  array.forEach(book => {
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("card");
    readBtn.classList.add("btn");

    if (book.isRead === "true") {
      readBtn.classList.add("btn-green");
      readBtn.textContent = "Read";
    } else {
      readBtn.classList.add("btn-red");
      readBtn.textContent = "Not read";
    }

    removeBtn.classList.add("btn", "remove");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.numberOfPages} pages`;
    removeBtn.textContent = "Remove";
    grid.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    readBtn.addEventListener("click", function () {
      if (readBtn.textContent === "Read") {
        readBtn.classList.remove("btn-green");
        readBtn.classList.add("btn-red");
        book.isRead = "false";
        readBtn.textContent = "Not read";
      } else {
        readBtn.classList.add("btn-green");
        readBtn.classList.remove("btn-red");
        book.isRead = "true";
        readBtn.textContent = "Read";
      }
    });

    removeBtn.addEventListener("click", () => {
      const item = book.id;
      myLibrary = myLibrary.filter(book => book.id !== item);
      card.remove();
      myLibrary.forEach(book => {
        book.id = myLibrary.indexOf(book) + 1;
      });
      console.log(myLibrary);
    });
  });
};

//Submit button listener
form.addEventListener("submit", e => {
  if (
    title.validity.valid &&
    author.validity.valid &&
    numberOfPages.validity.valid
  ) {
    const newBook = new Book(
      title.value,
      author.value,
      numberOfPages.value,
      isRead.checked ? "true" : "false"
    );
    myLibrary.push(newBook);
    displayBooks(myLibrary);
    closeModal();
    resetForm();
    e.preventDefault();
  }
});
