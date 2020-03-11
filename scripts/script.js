let myLibrary = [];
let bookStatus = '';

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + ' by ' + this.author;
};

const addBookToLibrary = (title, author, read) => {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
  render(newBook);
};

const render = newBook => {
  const booksUnreadList = document.getElementById('unread');
  const booksReadList = document.getElementById('read');

  const li = document.createElement('li');
  li.className = 'book';

  bookStatus === 'Read'
    ? booksReadList.appendChild(li)
    : booksUnreadList.appendChild(li);
  li.innerHTML = newBook.info();
};

const getBookStatus = document.getElementById('book-status-checkbox');
getBookStatus.addEventListener('click', () => {
  getBookStatus.classList.toggle('read');
});

const addBook = e => {
  e.preventDefault();
  let userBook = document.getElementById('book-title').value;
  let userAuthor = document.getElementById('book-author').value;

  getBookStatus.classList.contains('read')
    ? (bookStatus = 'Read')
    : (bookStatus = 'Unread');

  userAuthor ? (userAuthor = userAuthor) : (userAuthor = 'Unknown');

  addBookToLibrary(userBook, userAuthor, bookStatus);

  if (getBookStatus.classList.contains('read')) {
    getBookStatus.classList.remove('read');
  }
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
