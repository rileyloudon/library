let myLibrary = [];
let currentBook = {};

function Book(title, author, read, dateAdded, dateCompleted) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.dateAdded = dateAdded;
  this.dateCompleted = dateCompleted;
}

Book.prototype.info = function() {
  return this.title + ' by ' + this.author;
};

Book.prototype.markComplete = function() {
  return (this.read = 'read');
};

Book.prototype.delete = function() {
  myLibrary = myLibrary.filter((e) => {
    return e !== this;
  });
};

const todaysDate = () => {
  let day = new Date().getDate();
  let nth = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  let monthNumber = new Date().getMonth();
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let year = new Date().getFullYear();
  return months[monthNumber] + ' ' + day + nth(day) + ', ' + year;
};

const bookForm = document.getElementById('add-book');
const toggleForm = document.querySelector('.toggle-form-button');
toggleForm.addEventListener('click', () => {
  if (bookForm.style.display === 'none') {
    bookForm.style.display = 'grid';
    toggleForm.style.backgroundColor = '#e0928d';
    toggleForm.innerHTML = 'Close';
  } else {
    bookForm.style.display = 'none';
    toggleForm.style.backgroundColor = '';
    toggleForm.innerHTML = 'Add Book';
  }
});

const addBookToLibrary = (title, author, read, dateAdded, dateCompleted) => {
  const newBook = new Book(title, author, read, dateAdded, dateCompleted);
  myLibrary.push(newBook);
  render();
};

const render = () => {
  const booksUnreadList = document.getElementById('unread');
  const booksReadList = document.getElementById('read');

  booksUnreadList.innerHTML = 'Unread';
  booksReadList.innerHTML = 'Read';

  console.log(myLibrary);
  myLibrary.forEach((book) => {
    console.log(book);
    const li = document.createElement('li');
    li.className = 'book';

    book.read === 'read'
      ? booksReadList.appendChild(li)
      : booksUnreadList.appendChild(li);

    li.innerHTML = book.info();
    li.addEventListener('click', function handler() {
      openBookModal(book);
    });
  });

  // Hide Unread/Read title if there are no books of that type.
  booksUnreadList.innerHTML === 'Unread'
    ? (booksUnreadList.style.opacity = '0')
    : (booksUnreadList.style.opacity = '1');

  booksReadList.innerHTML === 'Read'
    ? (booksReadList.style.opacity = '0')
    : (booksReadList.style.opacity = '1');

  localStorage.setItem('books', JSON.stringify(myLibrary));
};

function openBookModal(book) {
  currentBook = book;

  // Hide the Add Book form.
  bookForm.style.display = 'none';
  toggleForm.style.backgroundColor = '';
  toggleForm.innerHTML = 'Add Book';

  // Display the modal
  const bookModal = document.getElementById('book-modal');
  bookModal.style.display = 'grid';

  // Display the title of the book clicked in the modal.
  document.getElementById('book-modal-title').innerHTML = currentBook.title;
  // Display the author of the book clicked in the modal.
  document.getElementById('book-modal-author').innerHTML =
    'By ' + currentBook.author;

  // If a book was added before tracking dateAdded, reaplce Undefined with ---
  currentBook.dateAdded
    ? (currentBook.dateAdded = currentBook.dateAdded)
    : (currentBook.dateAdded = '-/-/-');
  // Display the date added property in the modal.
  document.getElementById('book-modal-date-added').innerHTML =
    'Added: ' + currentBook.dateAdded;

  const bmMarkComplete = document.getElementById('book-modal-mark-complete');
  bmMarkComplete.addEventListener('click', markReadHandler);

  const bmDelete = document.getElementById('book-modal-delete');
  bmDelete.addEventListener('click', deleteHandler);

  function markReadHandler() {
    currentBook.markComplete();
    currentBook.dateCompleted = todaysDate();
    render();
    bookModal.style.display = 'none';

    bmMarkComplete.removeEventListener('click', markReadHandler);
    bmDelete.removeEventListener('click', deleteHandler);
  }

  bmClose = document.getElementById('book-modal-close');
  bmClose.addEventListener('click', () => {
    bookModal.style.display = 'none';

    bmMarkComplete.removeEventListener('click', markReadHandler);
    bmDelete.removeEventListener('click', deleteHandler);
  });

  function deleteHandler() {
    book.delete();
    render();
    bookModal.style.display = 'none';

    bmMarkComplete.removeEventListener('click', markReadHandler);
    bmDelete.removeEventListener('click', deleteHandler);
  }

  // If the book is marked read, display the date completed, remove the Read button
  // and center the Close button.
  if (currentBook.read === 'read') {
    document.getElementById('book-modal-date-completed').innerHTML =
      'Completed: ' + currentBook.dateCompleted;
    bmMarkComplete.style.display = 'none';
    bmClose.style.gridArea = '5 / 3 / 6 / 7';
  } else {
    document.getElementById('book-modal-date-completed').innerHTML = '';
    bmMarkComplete.style.display = 'flex';
    bmClose.style.gridArea = '5 / 5 / 6 / 9';
  }
}

const addBook = (e) => {
  // Prevent the page from refreshing on submit.
  e.preventDefault();

  // Title:
  let userBook = document.getElementById('book-title').value;
  // Make first letter uppercase, rest lowercase. Or after a period. (eg. J.K Rowling)
  userBook = userBook
    .toLowerCase()
    .split(' ')
    .map((title) => title.charAt(0).toUpperCase() + title.substring(1))
    .join(' ')
    .split('.')
    .map((title) => title.charAt(0).toUpperCase() + title.substring(1))
    .join('.');

  // Author
  let userAuthor = document.getElementById('book-author').value;
  userAuthor = userAuthor
    .toLowerCase()
    .split(' ')
    .map((author) => author.charAt(0).toUpperCase() + author.substring(1))
    .join(' ')
    .split('.')
    .map((author) => author.charAt(0).toUpperCase() + author.substring(1))
    .join('.');
  // If author is left empty, use Unknown
  userAuthor ? (userAuthor = userAuthor) : (userAuthor = 'Unknown');

  // Read checkbox:
  let bookStatus = '';
  let dateCompleted = 'Incomplete';
  document.getElementById('book-status-checkbox').checked
    ? (bookStatus = 'read')
    : (bookStatus = 'unread');
  if (bookStatus === 'read') dateCompleted = todaysDate();

  // Date Added:
  dateAdded = todaysDate();

  addBookToLibrary(userBook, userAuthor, bookStatus, dateAdded, dateCompleted);

  document.getElementById('add-book').reset();

  localStorage.setItem('books', JSON.stringify(myLibrary));
};

if (localStorage.getItem('books')) {
  retrievedBooks = JSON.parse(localStorage.getItem('books'));
  retrievedBooks.forEach((item) => {
    addBookToLibrary(
      item.title,
      item.author,
      item.read,
      item.dateAdded,
      item.dateCompleted,
    );
  });
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet')

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
