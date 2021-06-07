
let userLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function() {
    return console.log(`${title} by ${author}, ${pages} pages long, ${read}`);
}
function addToLibrary(title, author, pages, read) {
    let addBook = new Book(title,author,pages,read);
    return addBook;
}
function createBookDisplay(Book){
    
}