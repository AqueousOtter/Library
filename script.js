//6/18 TODO: Work on local storage and radio button


const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const readCol = document.getElementById("readCol");
const unreadCol =document.getElementById("unreadCol");
const columns = document.getElementsByClassName("column");
const form = document.getElementById("addForm");


/**Local storage varibles
 */
const inputAuthor = document.getElementById("author").value;
const inputTitle = document.getElementById("title").value;
const inputPages = document.getElementById("pages").value;
const inputRead = document.getElementById("read").checked;
const submit = document.getElementById("submit");

const addButton = document.getElementById("addToLibrary");



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
addButton.addEventListener("click", function() {
    form.classList.toggle("hide");
    addButton.classList.toggle("hide");

})

// local storage
submit.addEventListener("click", ()=>{
    localStorage.setItem(inputTitle, inputAuthor, inputPages, inputRead);
    if (inputRead.checked){
        addToLibrary(inputTitle, inputAuthor, inputPages, true);
    }
    else{
        addToLibrary(inputTitle, inputAuthor, inputPages, false);

    }
    form.classList.toggle("hide");
    addButton.classList.toggle("hide");
})
function addToLibrary(title, author, pages, read) {
    let addBook = new Book(title,author,pages,read);
    userLibrary.push(addBook);
    let newLib = []; //to handle adding new book without having to redo display
    newLib.push(addBook);
    createRow(newLib);
}

//function to create rows based off of library length
function createRow(userLibrary){ 
    for (let i = 0; i < userLibrary.length; ++i){
        let column = document.createElement("div");
        column.innerHTML = bookCard(userLibrary[i]);
        column.setAttribute('data', i);
        let button = document.createElement("button");
        button.setAttribute('data', i);
        button.innerText = "Delete";
        column.appendChild(button).className = "removeBTN";
        if(userLibrary[i].read){
            readContainer.appendChild(column).className = "read-col";
            button.addEventListener("click", ()=>{
                let btnData = button.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    readContainer.removeChild(column);
                }
            })
            }
        else {
            unreadContainer.appendChild(column).className = "unread-col";
            button.addEventListener("click", ()=>{
                let btnData = button.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    unreadContainer.removeChild(column);
                }
            })
        }
    }
}

//function to generate html for books
function bookCard(book){
    let bookHTML = `<h3>${book.title}</h3> <p>${book.author}</p> <p>${book.pages} pages</p> <p>${book.read}</p>`;
    return bookHTML;
}
createRow(userLibrary);
