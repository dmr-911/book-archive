// toggler
const toggleSearch = (displayStyle) => {
  document.getElementById("searched").style.display = displayStyle;
};

// get and decode the url
const getBooks = async () => {
  const input = document.getElementById("search-input");
  const value = input.value;

  const url = `https://openlibrary.org/search.json?q=${value}`;
  const res = await fetch(url);
  const data = await res.json();
  input.value = "";

    // checking length 
  if (data.docs.length === 0) {
    document.getElementById("total-books").innerText = "No";
  } else {
    document.getElementById("total-books").innerText = data.numFound;
  }

  toggleSearch("block");
  displayBooks(data.docs);
};

// display items to booksContainer
const displayBooks = (books) => {
  const booksContainer = document.getElementById("books-container");
  booksContainer.textContent = "";
  books.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    div.innerHTML = `
                    <div class="card">
                        <img src="${url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author : ${book?.author_name}</p>
                            <p class="card-text">First Published in : ${book?.first_publish_year}</p>
                        </div>
                    </div>
        `;
    booksContainer.appendChild(div);
  });
};
