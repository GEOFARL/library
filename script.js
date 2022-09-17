const newBookBtn = document.querySelector('.new-book-btn button');
const newBookForm = document.querySelector('.add-new-book');
const overlay = document.querySelector('.overlay');
const submitFormBtn = document.querySelector('#addBook');
const bookCardTemplate = document.querySelector('.card');
const cardContainer = document.querySelector('.card-container');

const allBookCards = [...document.querySelectorAll('.card')];

newBookBtn.addEventListener('click', openNewBookForm);
newBookBtn.addEventListener('touch', openNewBookForm);
submitFormBtn.addEventListener('click', submitForm);
submitFormBtn.addEventListener('touch', submitForm);

let bookLibrary = new Array();

function deleteCard(e) {
    e.path.forEach((element) => {
        if (allBookCards.includes(element)) {
            bookLibrary.splice(element.getAttribute('data-key'), 1);
            element.remove();
        }
    })
}

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function openNewBookForm(e) {
    newBookForm.style.display = 'block';
    overlay.style.display = 'block';
    e.stopPropagation();
    window.addEventListener('mousedown', (e) => {
        if (!e.path.includes(newBookForm)) {
            newBookForm.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
    window.addEventListener('touch', (e) => {
        if (!e.path.includes(newBookForm)) {
            newBookForm.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
}

function submitForm(e) {
    const checkbox = document.querySelector('#isRead');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');

    let newCard = bookCardTemplate.cloneNode(true);

    const cardTitle = newCard.querySelector('.title');
    const cardAuthor = newCard.querySelector('.author');
    const cardPages = newCard.querySelector('.num-of-pages');
    const cardReadStatus = newCard.querySelector('.read-state');
    const readStateToggleBtn = newCard.querySelector('.toggle');
    const deleteCardBtn = newCard.querySelector('.close');
    readStateToggleBtn.addEventListener('click', changeStatus);
    readStateToggleBtn.addEventListener('touch', changeStatus);
    deleteCardBtn.addEventListener('click', deleteCard);
    deleteCardBtn.addEventListener('touch', deleteCard);

    const patternWord = /^[a-zA-Z-_. ]{3,40}$/g;
    const patternNumber = /^[1-9][0-9]{0,3}$/g;

    if (title.value.match(patternWord) && 
        author.value.match(patternWord) &&
        pages.value.match(patternNumber)) {
            let book = new Book(title.value, author.value, pages.value, checkbox.checked);
            bookLibrary.push(book);
            pages.value = title.value = author.value = '';
            if (checkbox.checked) checkbox.checked = false;
            newBookForm.style.display = 'none';
            overlay.style.display = 'none';

            newCard.style.display = 'flex';
            cardTitle.innerText = bookLibrary[bookLibrary.length-1].title;
            cardAuthor.innerText = bookLibrary[bookLibrary.length-1].author;
            cardPages.innerText = bookLibrary[bookLibrary.length-1].pages;
            if (bookLibrary[bookLibrary.length - 1].readStatus) {
                cardReadStatus.innerText = 'Read';
                cardReadStatus.style.color = '#558B2F';
                readStateToggleBtn.classList.add('read');
                readStateToggleBtn.innerText = 'Read';
            }
            else {
                cardReadStatus.innerText = 'Not read';
                readStateToggleBtn.classList.add('unread');
                readStateToggleBtn.innerText = 'Not read';
            }
            newCard.setAttribute('data-key', bookLibrary.length - 1);
            allBookCards.push(newCard);
            cardContainer.appendChild(newCard);
        }
}

function changeStatus(e) {
    let card;
    e.path.forEach((element) => {
        if (allBookCards.includes(element)) {
            card = element;
        }
    })
    console.log(card)
    let readStateToggleBtn = card.querySelector('.toggle');
    let currentStatus = card.querySelector('.read-state');
    if (currentStatus.innerText === 'Read') {
        readStateToggleBtn.classList.replace('read', 'unread');
        currentStatus.innerText = 'Not read';
        currentStatus.style.color = 'red';
        readStateToggleBtn.innerText = 'Not read';
    }
    else {
        readStateToggleBtn.classList.replace('unread', 'read');
        currentStatus.innerText = 'Read';
        currentStatus.style.color = '#558B2F';
        readStateToggleBtn.innerText = 'Read';
    }
}