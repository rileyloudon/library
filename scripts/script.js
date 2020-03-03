let myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + ' by ' + this.author + ', ' + this.read;
};

const addBookToLibrary = (title, author, read) => {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
  render(newBook);
};

const render = newBook => {
  const bookShelf = document.getElementById('bookshelf');

  const li = document.createElement('li');
  li.setAttribute('class', 'book');
  bookShelf.appendChild(li);
  li.innerHTML = newBook.info();
};

const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', e => {
  e.preventDefault();
  let userBook = document.getElementById('book-title').value;
  let userAuthor = document.getElementById('book-author').value;
  let userBookRead = document.getElementById('read').checked;
  let userBookNotRead = document.getElementById('not-read').checked;

  console.log(userBookRead, userBookNotRead);

  userBookRead
    ? (userBookStatus = 'Read')
    : userBookNotRead
    ? (userBookStatus = 'Want to Read')
    : (userBookStatus = 'Unknown');

  addBookToLibrary(userBook, userAuthor, userBookStatus);
});

// const theHobbit = new Book('The Hobbot', 'J.R.R. Tolkien', '295', 'not read yet')
