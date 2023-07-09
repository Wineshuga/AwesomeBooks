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
      bookDiv.innerHTML += '<p>You have no awesome books</p>';
    }
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
