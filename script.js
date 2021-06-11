
const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const readCol = document.getElementById("readCol");
const unreadCol =document.getElementById("unreadCol");
const columns = document.getElementsByClassName("column");


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
console.log(userLibrary.length);
console.log(userLibrary[1]);



//const for size of library, easier to update functions
const librarySize = userLibrary.length;
Book.prototype.info = function() {
    return console.log(`${title} by ${author}, ${pages} pages long, ${read}`);
}
function addToLibrary(title, author, pages, read) {
    let addBook = new Book(title,author,pages,read);
    return userLibrary.push(addBook);
}

/*
make functions for dynamically making divs for display w/constants control
function that splices library for displaying x amount at a time -- maybe toggle hide if < const limit
*/

function createRow(userLibrary){
    
    for (let i = 0; i < userLibrary.length; ++i){
        let column = document.createElement("div");
        if(userLibrary[i].read){
            readContainer.appendChild(column).className = "read-col";
        }
        else {
            unreadContainer.appendChild(column).className = "unread-col";
        }
    }
}