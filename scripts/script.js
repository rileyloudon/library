let myLibrary = [];
let bookStatus = 'unread';

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

const unread = document.getElementById('unread');
const read = document.getElementById('read');
unread.addEventListener('click', () => {
  bookStatus = 'read';
  unread.style.visibility = 'hidden';
  read.style.visibility = 'visible';
});

read.addEventListener('click', () => {
  bookStatus = 'unread';
  unread.style.visibility = 'visible';
  read.style.visibility = 'hidden';
});

const addBook = e => {
  e.preventDefault();
  let userBook = document.getElementById('book-title').value;
  let userAuthor = document.getElementById('book-author').value;

  userAuthor ? (userAuthor = userAuthor) : (userAuthor = 'Unknown');

  addBookToLibrary(userBook, userAuthor, bookStatus);

  document.getElementById('add-book').reset();
};

// const theHobbit = new Book('The Hobbot', 'J.R.R. Tolkien', '295', 'not read yet')

// Support Google Books Autoconplete one day?
// let bookSuggestions = [];

// let userBookInput = document.getElementById('book-title');
// userBookInput.addEventListener('input', () => {
//   if (userBookInput.value.length >= 1) {
//     let findBooks =
//       'https://www.googleapis.com/books/v1/volumes?q=' +
//       encodeURIComponent(userBookInput.value) +
//       '&maxResults=5&langRestrict=en&fields=items/volumeInfo(title,authors)';

//     fetch(findBooks)
//       .then(response => response.json())
//       .then(data => getBookSuggestions(data));
//   }
// });

// const getBookSuggestions = data => {
//   bookSuggestions.splice(0, 5, ...data.items);

//   const bookShelf = document.getElementById('bookshelf');
//   bookSuggestions.forEach(book => {
//     console.log(book.volumeInfo.title + ' by ' + book.volumeInfo.authors);
//     const li = document.createElement('li');
//     li.setAttribute('class', 'book');
//     bookShelf.appendChild(li);
//     li.innerHTML = book.volumeInfo.title + ' by ' + book.volumeInfo.authors;
//   });
// };
