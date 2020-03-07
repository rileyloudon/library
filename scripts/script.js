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

const myForm = document.getElementById('add-book');
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
    : (userBookStatus = 'Unknown Status');

  userAuthor ? (userAuthor = userAuthor) : (userAuthor = 'Unknown');
  addBookToLibrary(userBook, userAuthor, userBookStatus);
  myForm.reset();
});

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
