//6/21 Future:
    //fix display bugs when refreshing
    //split true and false read into seperate arrays to fix blank displays after removing

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


//info function from earlier excercise
Book.prototype.info = function() {
    return console.log(`${this.title} by ${this.author}, ${this.pages} pages long, ${this.read}`);
}
//hides/shows adding form
let changedAddColor = false //for checking if color has changed.Future: Update this method?
addButton.addEventListener("click", function() {
    form.classList.toggle("hide");
    if (!changedAddColor){
        addButton.setAttribute("style", "background-color : rgba(255, 0, 0, 0.205);")
        changedAddColor = true;
    }
    else {
        addButton.setAttribute("style", "background-color : #c8f1c8;")
        changedAddColor = false;
    }

    returnDefault.classList.toggle("hide");

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
    addButton.setAttribute("style", "background-color : #c8f1c8;");
    returnDefault.classList.toggle("hide");
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
        let modButton = document.createElement("button");
        deleteButton.setAttribute('data', i);
        modButton.setAttribute('data', i);
        deleteButton.setAttribute('title', "remove book from collection");
        modButton.setAttribute('title',"modify book's read status")
        deleteButton.innerText = "remove";
        column.innerHTML = bookCard(userLibrary[i]);
        
        if(userLibrary[i].read){
            modButton.innerText = "read";
            readContainer.appendChild(column).className = "readCol";
            modButton.setAttribute("style",  "background-color: #abf1ab");
            column.appendChild(modButton).className = "readMod";
            column.appendChild(deleteButton).className = "readCol";
            deleteButton.addEventListener("click", ()=>{
                let btnData = deleteButton.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    readContainer.removeChild(column);
                    userLibrary.splice(btnData, 1);
                    bookCheck();
                    updateLocal();
                }
            })
            }
        else {
            modButton.innerText = "unread";
            unreadContainer.appendChild(column).className = "unreadCol";
            modButton.setAttribute("style",  "background-color: #abd3df");
            column.appendChild(modButton).className = "unreadMod";
            column.appendChild(deleteButton).className = "unreadCol";

            deleteButton.addEventListener("click", ()=>{
                let btnData = deleteButton.getAttribute('data');
                let cardData = column.getAttribute('data');
                if (btnData == cardData){
                    unreadContainer.removeChild(column);
                    userLibrary.splice(btnData, 1);
                    bookCheck();
                    updateLocal();    
                }
            })
        }
        modButton.addEventListener("click", ()=> {
            if (userLibrary[i].read){
                userLibrary[i].read = false;
            }
            else{
                userLibrary[i].read = true;
            }
            updateLocal();
            location.reload();
        
        });
        //event listeners to modify mod buttons colors
        modButton.addEventListener("mouseover", ()=>{
            if(modButton.innerHTML == 'unread'){
                modButton.setAttribute("style",  "background-color: #abf1ab");
                modButton.innerText = "read";
            }
            else if (modButton.innerHTML == 'read'){
                modButton.setAttribute("style",  "background-color: #abd3df");
                modButton.innerText = "unread";
            }

        });
        modButton.addEventListener("mouseleave", ()=>{
            if(modButton.innerHTML == 'unread'){
                modButton.setAttribute("style",  "background-color: #abf1ab");
                modButton.innerText = "read";
            }
            else if (modButton.innerHTML == 'read'){
                modButton.setAttribute("style",  "background-color: #abd3df");
                modButton.innerText = "unread";
            }
        });
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

};
//function to generate html for books
function bookCard(book){
    let bookHTML; 
    if (book.read){
        bookHTML = `<div id="readCard"><br><h3>${book.title}</h3><br> <p>By: ${book.author}</p> <p>Length: ${book.pages} pages</p><p>Status: Read</p></div>`;

    }
    else{
        bookHTML = `<div id="unreadCard"><br><h3>${book.title}</h3> <br><p>By: ${book.author}</p> <p>Length: ${book.pages} pages</p><p>Status: Unread</p></div>`
    }
    return bookHTML;
};

//function to leave a blank book placeholder if all books are deleted
//Patch empty rows
function bookCheck(){
    let blankLibrary = [];
    if (unreadContainer.childElementCount == 0){
        let blankBook = new Book("Please Add A Book", "bookie", 101, false);
        blankLibrary.push(blankBook);
       createRow(blankLibrary);
        
    }
    else if(readContainer.childElementCount == 0){
        let blankBook = new Book("Please Add A Book", "bookie", 100, true);
        blankLibrary.push(blankBook);
       createRow(blankLibrary);
    }
}
//load after dom
document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.length == 0){
        userLibrary = defaultLibrary;
        updateLocal();
        
        createRow(userLibrary);
    }
    else{
        userLibrary = JSON.parse(localStorage["myBooks"]);
        updateLocal();
        
        createRow(userLibrary);
    }
});
