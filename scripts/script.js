let myLibrary = [];

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

// Returns myLibrary with all the books except the book that was passed.
Book.prototype.delete = function() {
  myLibrary = myLibrary.filter((e) => {
    return e !== this;
  });
};

const todaysDate = () => {
  // Get Day. Uses a switch + if to add the proper ending to numbers. eg. 1st/2nd/3rd
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
  // Get Month. Uses the month number to select the proper month name.
  let monthNumber = new Date().getMonth();
  let monthNames = [
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
  // Get Year
  let year = new Date().getFullYear();
  // Combine them all.
  return monthNames[monthNumber] + ' ' + day + nth(day) + ', ' + year;
};

// When the Add Book button is pressed, display the form for adding books.
const bookForm = document.getElementById('add-book');
const toggleForm = document.querySelector('.toggle-form-button');
toggleForm.addEventListener('click', () => {
  if (bookForm.style.display === 'none') {
    bookForm.style.display = 'grid';
    // Change 'Add Book' to 'Close'.
    toggleForm.innerHTML = 'Close';

    // Change the Close button to the proper unread color - light or dark.
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? (toggleForm.style.backgroundColor = 'var(--light-unread-color)')
      : (toggleForm.style.backgroundColor = 'var(--dark-unread-color)');
  } else {
    // Change them all back. Empty background color uses the color from CSS.
    bookForm.style.display = 'none';
    toggleForm.style.backgroundColor = '';
    toggleForm.innerHTML = 'Add Book';
  }
});

// Push each book to myLibrary. Then display everything.
const addBookToLibrary = (title, author, read, dateAdded, dateCompleted) => {
  const newBook = new Book(title, author, read, dateAdded, dateCompleted);
  myLibrary.push(newBook);
  render();
};

// Display everything in myLibrary.
const render = () => {
  const booksUnreadList = document.getElementById('unread');
  const booksReadList = document.getElementById('read');

  // Set the titles of each list.
  // This also prevents books from appearing multiple times by resetting the list to just the title.
  booksUnreadList.innerHTML = 'Unread';
  booksReadList.innerHTML = 'Read';

  // For each book in myLibrary do the following:
  myLibrary.forEach((book) => {
    // Create a li with the class book.
    const li = document.createElement('li');
    li.className = 'book';

    // Fill the li with the book's info.
    li.innerHTML = book.info();

    // Place the book in its proper list - read or unread.
    book.read === 'read'
      ? booksReadList.appendChild(li)
      : booksUnreadList.appendChild(li);

    // Add an event listener to the book so when it's clicked a modal appears with more options for that book.
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

  // Add the book to local storage. This allows the books to be saved during reload.
  localStorage.setItem('books', JSON.stringify(myLibrary));
};

// Function for the book modal.
function openBookModal(book) {
  let currentBook = book;

  // Reset the Add Book form to be hidden.
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

  // If a book was added before tracking dateAdded, reaplce Undefined with -/-/-
  currentBook.dateAdded
    ? (currentBook.dateAdded = currentBook.dateAdded)
    : (currentBook.dateAdded = '-/-/-');
  // Display the date added in the modal.
  document.getElementById('book-modal-date-added').innerHTML =
    'Added: ' + currentBook.dateAdded;

  // Add an event listener to the Read button.
  const bmMarkComplete = document.getElementById('book-modal-mark-complete');
  bmMarkComplete.addEventListener('click', markReadHandler);

  // Add an event listener to the delete button (Trash Can)
  const bmDelete = document.getElementById('book-modal-delete');
  bmDelete.addEventListener('click', deleteHandler);

  // When the Read button is clicked do the following:
  function markReadHandler() {
    // Update the current book from Unread -> Read.
    currentBook.markComplete();
    // Set the date completed to the current date.
    currentBook.dateCompleted = todaysDate();
    // Rerender myLibrary, to update the position of the complete book.
    render();
    // Hide the modal.
    bookModal.style.display = 'none';

    // Remove the event listeners so they don't fire on the wrong book.
    bmMarkComplete.removeEventListener('click', markReadHandler);
    bmDelete.removeEventListener('click', deleteHandler);
  }

  // Simply close the book modal when clicking Close.
  bmClose = document.getElementById('book-modal-close');
  bmClose.addEventListener('click', () => {
    bookModal.style.display = 'none';

    // Remove the event listeners so they don't fire on the wrong book.
    bmMarkComplete.removeEventListener('click', markReadHandler);
    bmDelete.removeEventListener('click', deleteHandler);
  });

  // When the trash can is clicked, do the following:
  function deleteHandler() {
    // Pass the current book to the prototype delete. This will delete it.
    currentBook.delete();
    // Rerender myLibrary. This time without the deleted book.
    render();
    // Close the modal.
    bookModal.style.display = 'none';

    // Remove the event listeners so they don't fire on the wrong book.
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
  // Make first letter uppercase, rest lowercase. And after a period. (eg. J.K Rowling)
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
  // If the book is already completed, set the date completed to today.
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
