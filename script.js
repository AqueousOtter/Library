
const readContainer = document.getElementById("readContainer");
const unreadContainer = document.getElementById("unreadContainer");
const form = document.getElementById("addForm");
const submit = document.getElementById("submit");
const addButton = document.getElementById("addToLibrary");
const returnDefault = document.getElementById("defaults");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//library logic
const book1 = new Book("The Grip of It", "Jac Jemeric", 500, true);
const book2 = new Book("Jurassic Park", "Micheal Crichton", 500, false);
const book3 = new Book("Surviving the Oregon Trail, 1852", "Weldon Willis Rau", 256, true);
let userLibrary = [];
const defaultLibrary = []; //default library for first time/reset button pushed
defaultLibrary.push(book1);
defaultLibrary.push(book2);
defaultLibrary.push(book3);
userLibrary = defaultLibrary;

//info function from earlier excercise
Book.prototype.info = function() {
    return console.log(`${this.title} by ${this.author}, ${this.pages} pages long, ${this.read}`);
}
//hides/shows adding form
addButton.addEventListener("click", function() {
    form.classList.toggle("hide");
    addButton.classList.toggle("hide");

})

//return user library to default books
returnDefault.addEventListener("click", ()=>{
    userLibrary = defaultLibrary; //set to default
    updateLocal();
    userLibrary = JSON.parse(localStorage["myBooks"]);
    location.reload();
})
// local storage
submit.addEventListener("click", ()=>{
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
        
        column.setAttribute('data', i);
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('data', i);
        deleteButton.innerText = "remove";
        column.innerHTML = bookCard(userLibrary[i]);
        
        if(userLibrary[i].read){
            readContainer.appendChild(column).className = "readCol";
            column.appendChild(deleteButton).className = "readCol";
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
            unreadContainer.appendChild(column).className = "unreadCol";
            column.appendChild(deleteButton).className = "unreadCol";

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
    let bookHTML; 
    if (book.read){
        bookHTML = `<div id="readCard"><h3><img class="readImg" src="./images/outline_check_circle_black_24dp.png"> ${book.title}</h3><br> <p>By: ${book.author}</p> <p>Length: ${book.pages} pages</p><p>Status: Read</p></div>`;

    }
    else{
        bookHTML = `<div id="unreadCard"><h3><img class="readImg" src="./images/outline_highlight_off_black_24dp.png"> ${book.title}</h3> <br><p>By: ${book.author}</p> <p>Length: ${book.pages} pages</p><p>Status: Unread</p></div>`
    }
    return bookHTML;
}
//gets local storage to create row

userLibrary = JSON.parse(localStorage["myBooks"]);
updateLocal();
createRow(userLibrary);
