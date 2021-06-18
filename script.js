//6/18 TODO: Work on local storage logic and start styling


const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const readCol = document.getElementById("readCol");
const unreadCol =document.getElementById("unreadCol");
const columns = document.getElementsByClassName("column");
const form = document.getElementById("addForm");

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
    /**Local storage varibles
 */
    let inputAuthor = document.getElementById("author").value;
    let inputTitle = document.getElementById("title").value;
    let inputPages = document.getElementById("pages").value;
    let inputRead = document.getElementById("read");
    if (inputRead.checked){
        addToLibrary(inputTitle, inputAuthor, inputPages, true);
    }
    else{
        addToLibrary(inputTitle, inputAuthor, inputPages, false);

    }
    updateLocal();
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
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('data', i);
        deleteButton.innerText = "Delete";
        column.appendChild(deleteButton).className = "removeBTN";
        if(userLibrary[i].read){
            readContainer.appendChild(column).className = "read-col";
            deleteButton.addEventListener("click", ()=>{
                let btnData = deleteButton.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    readContainer.removeChild(column);
                    userLibrary.splice(btnData, 1);
                    updateLocal();
                }
            })
            }
        else {
            unreadContainer.appendChild(column).className = "unread-col";
            deleteButton.addEventListener("click", ()=>{
                let btnData = deleteButton.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    unreadContainer.removeChild(column);
                    userLibrary.splice(btnData, 1);
                    updateLocal();
                }
            })
        }
    }
}
//function to store/update data
function updateLocal(){
    let myBooks = [];
    for (let i = 0; i < userLibrary.length; ++i){
        myBooks[i] = userLibrary[i];
    }
    localStorage["myBooks"] = JSON.stringify(myBooks);
    userLibrary = JSON.parse(localStorage["myBooks"]);
}
//function to generate html for books
function bookCard(book){
    let bookHTML = `<h3>${book.title}</h3> <p>${book.author}</p> <p>${book.pages} pages</p>`;
    if (book.read){
        bookHTML += `<p>Read</p>`;
    }
    else{
        bookHTML += `<p>Unread</p>`
    }
    return bookHTML;
}
//gets local storage to create row
userLibrary = JSON.parse(localStorage["myBooks"]);
updateLocal();
createRow(userLibrary);
