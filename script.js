
const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const readCol = document.getElementById("readCol");
const unreadCol =document.getElementById("unreadCol");
const columns = document.getElementsByClassName("column");
const button = document.querySelectorAll("button");

// 6.15 TODO: Work out logic for removing book on button click
button.addEventListener("click", ()=> {
    let index = column.getAttribute('data');
    userLibrary.splice(index, 1);
    console.log(userLibrary.length);
});


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
const book1 = new Book("The Grip of It", "Jac Jemeric", 500, true);
const book2 = new Book("Jurassic Park", "Micheal Crichton", 500, false);
const book3 = new Book("Surviving the Oregon Trail, 1852", "Weldon Willis Rau", 256, true);
let userLibrary = [];
userLibrary.push(book1);
userLibrary.push(book2);
userLibrary.push(book3);

Book.prototype.info = function() {
    return console.log(`${this.title} by ${this.author}, ${this.pages} pages long, ${this.read}`);
}


function addToLibrary(title, author, pages, read) {
    let addBook = new Book(title,author,pages,read);
    let column = document.createElement("div");
    if(addBook.read){   //displays added book in correct row
        readContainer.appendChild(column).className = "read-col";
    }
    else {
        unreadContainer.appendChild(column).className = "unread-col";
    }
    return userLibrary.push(addBook);
}

//function to create rows based off of library length
function createRow(userLibrary){ 
    for (let i = 0; i < userLibrary.length; ++i){
        let column = document.createElement("div");
        if(userLibrary[i].read){
            readContainer.appendChild(column).className = "read-col";
            column.setAttribute('data', i);
            console.log(column.getAttribute('data'));
            column.innerHTML = bookCard(userLibrary[i]);        }
        else {
            unreadContainer.appendChild(column).className = "unread-col";
            column.setAttribute('data', i);
            console.log(column.getAttribute('data'));
            column.innerHTML = bookCard(userLibrary[i]);
        }
    }
}

//function to generate html for books
function bookCard(book){
    let bookHTML = `<h3>${book.title}</h3> <p>${book.author}</p> <p>${book.pages} pages</p> <p>Read: ${book.read}</p> <button class="removeBTN">Remove</button>`;

    return bookHTML;
}

