const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //clear data
    searchField.value = "";
    if (searchText === '') {
        const searchNotFound = document.getElementById('search-not-found');
        searchNotFound.style.display = 'block';
    } else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
        const searchNotFound = document.getElementById('search-not-found');
        searchNotFound.style.display = 'none';
    }

};

const displaySearchResult = (books) => {
    console.log(books);
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = '';
    if (books.length === 0) {
        const searchNothingFound = document.getElementById('search-nothing-found');
        searchNothingFound.style.display = 'block';
        const searchCount = document.getElementById('search-count');
        searchCount.style.display = 'none';
    }
    else {
        const arrayLength = books.length;
        console.log(arrayLength);
        const searchCount = document.getElementById('search-count');
        searchCount.style.display = 'block';
        searchCount.textContent = '';
        const searchResultDiv = document.createElement('div');
        searchResultDiv.classList.add('search-result-show');
        searchResultDiv.innerHTML = `
                <p>${arrayLength} results found</p>
        `;
        searchCount.appendChild(searchResultDiv);
        const searchNothingFound = document.getElementById('search-nothing-found');
        searchNothingFound.style.display = 'none';
        books.forEach((book) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div onclick="" class="card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class=" card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-title">Author: ${book.author_name}</h6>
                 <p class="card-text">Publisher: ${book.publisher}</p>
                 <p class="card-text">First Published ${book.first_publish_year}</p>
          </div>
        </div>
    `;
            searchResult.appendChild(div);
        });
    }

};
