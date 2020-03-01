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
  const bookShelf = document.getElementById('book-shelf');

  const li = document.createElement('li');
  li.setAttribute('class', 'book');
  bookShelf.appendChild(li);
  li.innerHTML = newBook.info();
};

const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('book-author');
  const bookRead = document.getElementById('read');
  const bookNotRead = document.getElementById('not-read');
  let bookStatus = bookRead ? bookRead.value : bookNotRead.value;

  addBookToLibrary(bookTitle, bookAuthor, bookStatus);
});

// const theHobbit = new Book('The Hobbot', 'J.R.R. Tolkien', '295', 'not read yet')
