class Book {

    constructor(title, author, number) {
        this.title  = title;
        this.author = author;
        this.number = number
    }
}

class UI {

    AddBooktoList(book) {

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

    deleteBook(e) {

        if(e.target.className === 'delete') {
            e.target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title') .value = '';
        document.getElementById('author').value = '';
        document.getElementById('number').value = '';
    }
}
    document.getElementById('form-submit').addEventListener('submit', function(e) {

    var title  = document.getElementById('title') .value;
    var author = document.getElementById('author').value;
    var number = document.getElementById('number').value;

    var book = new Book(title, author, number);

    var ui = new UI();

    if( title === '' || author === '' || number === '') {
     
        ui.showAlertMessage('You must fill all fields', 'error')
    } else {
        ui.AddBooktoList(book);

        ui.showAlertMessage('Book Added Succesfully', 'success');

        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {

    var ui = new UI();

    ui.deleteBook(e);

    ui.showAlertMessage('The Book is Successfully Delete', "success");

    e.preventDefault();
});