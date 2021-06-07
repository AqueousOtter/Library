
const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const readCol = document.getElementById("readCol");
const unreadCol =document.getElementById("unreadCol");

//let userLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
const book1 = new Book("The Grip of It", "Jac Jemeric", 500, true);
const book2 = new Book("Jurassic Park", "Micheal Crichton", 500, false);
const book3 = new Book("Surviving the Oregon Trail, 1852", "Weldon Willis Rau", 256, true);
let userLibrary = [book1, book2, book3];
//const for size of library, easier to update functions
const librarySize = userLibrary.length;
Book.prototype.info = function() {
    return console.log(`${title} by ${author}, ${pages} pages long, ${read}`);
}
function addToLibrary(title, author, pages, read) {
    let addBook = new Book(title,author,pages,read);
    return addBook;
}
function createRow(userLibrary){
    let readRow = [];
    let unreadRow = [];
    const maxDisplay = 5;
    for(let i = 0; i < librarySize; ++i){
        if (userLibrary[i].read){
            readRow.push(userLibrary[i]);
            console.log(readRow[i]);
            for(let j = 0; j < readRow.length; ++i){
                let col = document.createElement("div");
                console.log("col");
                if (readRow.length > maxDisplay){
                    readContainer.appendChild(col).className = "hide-col";
                }
                else {
                    readContainer.appendChild(col).className = "read-col";
                };
            };
        }
        else {
            unreadRow.push(userLibrary[i]);
            for(let j = 0; j < unreadRow.length; ++i){
                let col = document.createElement("div");
                if (unreadRow.length > maxDisplay){
                    unreadContainer.appendChild(col).className = "hide-col";
                }
                else {
                    unreadContainer.appendChild(col).className = "unread-col";
                };
            };
        };
    };

};

function createBookDisplay(Book){
    if (Book.read){

    }

}