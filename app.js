// search by bookname from API
const searchBooks = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value='';
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res=>res.json())
    .then(data=>console.log(data.docs))
}