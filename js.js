class Book {

    constructor(title, author, number) {
        this.title  = title;
        this.author = author;
        this.number = number
    }
}

class UI {

    AddBookToList(book) {

        var list = document.getElementById('book-list');

        var row  = document.createElement("tr");

        row.innerHTML = 
            `<td>${book.title} </td>
             <td>${book.author}</td>
             <td>${book.number}</td>
             <td><a href="#" class="delete"><i class="fas fa-trash-alt float-right"></i></a></td>`;

        list.appendChild(row);
    }

    showAlertMessage(message, className) {

        var div       = document.createElement('div');
        
        div.className = `col-sm-10 mx-auto alert ${className}`;

        div.appendChild(document.createTextNode(message));

        var container = document.getElementById('container');

        var form      = document.getElementById('form-submit');

        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.classList.contains('fas') && confirm('Are you sure?')) {
          target.parentElement.parentElement.parentElement.remove();

          this.showAlertMessage('The Book Was Delete', 'success');
        }
      }

    clearFields() {
        document.getElementById('title') .value = '';
        document.getElementById('author').value = '';
        document.getElementById('number').value = '';
    }
}

class LSrorage {
    // first
    static getBooksFromLS() {

        var books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
            return books;
    }
    //third
    static displayBooksFromLS() {

        var books = LSrorage.getBooksFromLS();

        books.forEach(function(book) {

            var ui = new UI;

            ui.AddBookToList(book);
        });
    }
    //second
    static addBookToLS(book) {

        var books = LSrorage.getBooksFromLS();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(book));
    }
    //last
    static deleteBookFromLS() {

    }

}

    document.addEventListener('DOMContentLoaded', LSrorage.displayBooksFromLS);

    document.getElementById('form-submit').addEventListener('submit', function(e) {

    var title  = document.getElementById('title') .value;
    var author = document.getElementById('author').value;
    var number = document.getElementById('number').value;

    var book = new Book(title, author, number);

    var ui = new UI();

    if( title === '' || author === '' || number === '') {
     
        ui.showAlertMessage('You must fill all fields', 'error')
    } else {
        ui.AddBookToList(book);

        LSrorage.addBookToLS(book)

        ui.showAlertMessage('Book Added Succesfully', 'success');

        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();
  
    ui.deleteBook(e.target);
  });
