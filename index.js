// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.bookArray = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const aBook = new Book(title, author);
    this.bookArray.push(aBook);
    localStorage.setItem('books', JSON.stringify(this.bookArray));
    this.displayBooks();
  }

  removeBook(index) {
    this.bookArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.bookArray));
    this.displayBooks();
  }

  displayBooks() {
    const bookSection = document.querySelector('.book-list-sec');
    const bookDiv = document.querySelector('.book-list');
    bookDiv.innerHTML = '';
    if (this.bookArray.length === 0) {
      bookDiv.insertAdjacentHTML('beforebegin', '<p class="no-book">You have no awesome books</p>');
      bookDiv.style.border = 'none';
    } else {
      const noBook = document.querySelector('.no-book');
      if (noBook) {
        noBook.textContent = '';
      }
      bookDiv.style.border = '2px solid';
      this.bookArray.forEach((element, index) => {
        bookDiv.innerHTML += `
        <div class='book-div'>
          <p>"${element.title}" by ${element.author}</p>
          <button class='remove-btn' data-index='${index}'>Remove</button>
        </div>
        `;
        const removeBtn = document.querySelectorAll('.remove-btn');
        removeBtn.forEach((btn) => {
          btn.addEventListener('click', (event) => {
            const { index } = event.target.dataset;
            this.removeBook(index);
          });
        });
      });
    }
    bookSection.appendChild(bookDiv);
  }
}

const bookList = new BookList();

// Display date and time
function displayDate() {
  const dateHtml = document.querySelector('.date');
  const currentDate = new Date();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const time = currentDate.toLocaleTimeString('default', { timeStyle: 'medium' });
  dateHtml.innerHTML = `${month} ${day}, ${year} ${time}`;
}
setInterval(displayDate, 1000);

// Add book implementation
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  const inputTitle = document.querySelector('.title');
  const inputAuthor = document.querySelector('.author');
  event.preventDefault();
  if (inputTitle.value && inputAuthor.value) {
    bookList.addBook(inputTitle.value, inputAuthor.value);
    inputTitle.value = '';
    inputAuthor.value = '';
  } else {
    inputTitle.value = '';
    inputAuthor.value = '';
  }
});

// Navigation toggle display content
const userBooks = document.querySelector('.book-list-sec');
const formPage = document.querySelector('.form-sec');
const contactPage = document.querySelector('.contact');
const listBtn = document.querySelector('.list-btn');
const addNewBtn = document.querySelector('.add-new-btn');
const contactBtn = document.querySelector('.contact-btn');

const showElement = (element) => {
  userBooks.style.display = (element === userBooks) ? 'block' : 'none';
  formPage.style.display = (element === formPage) ? 'block' : 'none';
  contactPage.style.display = (element === contactPage) ? 'block' : 'none';

  listBtn.style.color = (element === userBooks) ? 'blue' : 'black';
  addNewBtn.style.color = (element === formPage) ? 'blue' : 'black';
  contactBtn.style.color = (element === contactPage) ? 'blue' : 'black';
};

listBtn.addEventListener('click', () => showElement(userBooks));
addNewBtn.addEventListener('click', () => showElement(formPage));
contactBtn.addEventListener('click', () => showElement(contactPage));

// Display books
bookList.displayBooks();