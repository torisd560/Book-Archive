// search by bookname from API
const searchBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    //load data from API
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displyBooks(data.docs))
}
//display books on UI
const displyBooks = books => {
    books.forEach(book => {
        const bookContainer = document.getElementById('books-container');
        bookContainer.textContent - '';
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                        <h6 class="card-title"><strong>Book Name:</strong> ${book.title}</h6>
                        <p><strong>Author Name:</strong> ${book.author_name ? book.author_name : ''}<p>
                        <p><strong>First publish year:</strong>  ${book.first_publish_year ? book.first_publish_year : ''}</p>
                        <p><strong>Publisher: </strong> ${book.publisher}</p>
                </div>
            </div>
            `;
        bookContainer.appendChild(div)
    });
}