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

Book.prototype.delete = function() {
  myLibrary = myLibrary.filter(e => {
    return e !== this;
  });
};

const addBookToLibrary = (title, author, read) => {
  const newBook = new Book(title, author, read);

  // Make first letter uppercase, rest lowercase.
  newBook.title = newBook.title
    .toLowerCase()
    .split(' ')
    .map(title => title.charAt(0).toUpperCase() + title.substring(1))
    .join(' ');

  newBook.author = newBook.author
    .toLowerCase()
    .split(' ')
    .map(author => author.charAt(0).toUpperCase() + author.substring(1))
    .join(' ');

  myLibrary.push(newBook);
  render();
};

const render = () => {
  const booksUnreadList = document.getElementById('unread');
  const booksReadList = document.getElementById('read');

  booksUnreadList.innerHTML = 'Unread';
  booksReadList.innerHTML = 'Read';

  myLibrary.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book';

    book.read === 'Read'
      ? (booksReadList.appendChild(li), (booksReadList.style.opacity = '1'))
      : (booksUnreadList.appendChild(li),
        (booksUnreadList.style.opacity = '1'));

    li.innerHTML = book.info();
  });
};

const bookForm = document.getElementById('add-book');
const toggleForm = document.querySelector('.toggle-form-button');
toggleForm.addEventListener('click', () => {
  if (bookForm.style.display === 'none') {
    bookForm.style.display = 'grid';
    toggleForm.innerHTML = 'Close';
  } else {
    bookForm.style.display = 'none';
    toggleForm.innerHTML = 'Add Book';
  }
});

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
