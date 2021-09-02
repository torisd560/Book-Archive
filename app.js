//---------------global variable start-------------------------------
//-------------------display books-------------------------------
const cardContainer = document.getElementById('card-container')
const bookContainer = document.getElementById('books-container');

//-------------------- found result number----------------------------
const searchResultContainer = document.getElementById('search-result');
const foundResult = document.getElementById('found-result')

//----------------error div----------------------------
const erreDiv = document.getElementById('error');
//---------------global variable end-------------------------

//----------------spinner------------------------------------
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//---------------search feild---------------------
const searchBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    //----------display spinner---------------------
    toggleSpinner('block')
    searchResultContainer.style.display = 'none'
    cardContainer.style.display = 'none'
    erreDiv.style.display = 'none'

    //-----------------clear search input--------------------
    searchInput.value = '';
    //------------load data from API----------------
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displyBooks(data))
}
    //----------------------------display books on UI-----------------------
    const displyBooks = books => {
    const books1 = books.docs
    //---------------error message---------------------------------------
    if (books1.length === 0) {
        searchResultContainer.style.display = 'none';
        erreDiv.style.display = 'block'
        toggleSpinner('none')
    }

    //------------------clear display data-------------------------
    bookContainer.textContent = '';

    //----------------------forEatch get book----------------------
    books1.forEach(book => {
        if (book.cover_i) {
            searchResultContainer.style.display = 'block';
            foundResult.innerText = books.numFound;
            erreDiv.style.display = 'none'
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class=" card h-100 border-2 border-secondary">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top img-fluid h-75" alt="...">
                <div class="card-body">
                        <h6 class="card-title"><strong>Book Name:</strong> ${book.title}</h6>
                        <p><strong>Author Name:</strong> ${book.author_name ? book.author_name : ''}<p>
                        <p><strong>First publish year:</strong>  ${book.first_publish_year ? book.first_publish_year : ''}</p>
                        <p><strong>Publisher: </strong> ${book.publisher ? book.publisher[0] : ''}</p>
                </div>
            </div>
            `;
            bookContainer.appendChild(div);
        }
        toggleSpinner('none')
        searchResultContainer.style.display = 'block'
        cardContainer.style.display = 'block'
    });
}