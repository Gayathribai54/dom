function generateBookmarkId() {
  return Math.floor(1000 + Math.random() * 9000);
}

const form = document.getElementById('form');
const bookmarkList = document.getElementById('book');
let currentFilter = 'All';
const buttons = document.querySelectorAll('.filter-btn');
let filterArr = [];
let bookmarks = [];
const container = document.querySelector('.container');
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById('title-text').value.trim();
  const url = document.getElementById('url-text').value.trim();
  const categorySelect = document.getElementById('proffession');
  const category = categorySelect.options[categorySelect.selectedIndex].text;

  if (!title || !url) {
    alert("Please fill in both title and URL.");
    return;
  }

  const bookObj = {
    id: generateBookmarkId(),
    title: title,
    url: url,
    cat: category
  };

  bookmarks.push(bookObj);
  applyFilter();
  saveBookmarks();
  document.getElementById('title-text').value = "";
  document.getElementById('url-text').value = "";
});

function renderBookmarks() {
  container.style.width = "1000px";
  if (filterArr.length === 0) {
    bookmarkList.innerHTML = "<p>No Bookmarks found.</p>";
    return;
  }

  bookmarkList.innerHTML = '';

  filterArr.forEach((b) => {
    const bookmarkItem = document.createElement('div');
    bookmarkItem.classList.add('item');
    bookmarkItem.innerHTML = `
      <strong>${b.title}</strong><br>
      <a href="${b.url}" target="_blank">${b.url}</a>
      <button class="btn-v">${b.cat}</button>
      <button class="btn-del">Delete</button>
    `;

    const deleteBtn = bookmarkItem.querySelector('.btn-del');
    deleteBtn.addEventListener("click", () => handleDelete(b.id));

    bookmarkList.appendChild(bookmarkItem);
  });

}

function handleDelete(id) {
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
  applyFilter();
  saveBookmarks();
}

function applyFilter() {
  if (currentFilter === 'All') {
    filterArr = bookmarks;
  } else {
    filterArr = bookmarks.filter(b => b.cat === currentFilter);
  }

  renderBookmarks();
  saveBookmarks();
}

document.addEventListener("DOMContentLoaded", () => {
  loadBookmarks();
  
  applyFilter();
});

buttons.forEach((button) => {
  // Set data-category on buttons if not already set in HTML
  if (!button.dataset.category) {
    button.dataset.category = button.textContent.trim();
  }

  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.category;
    applyFilter();
  });
});

function saveBookmarks(){
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
}
function loadBookmarks(){
 const stored = localStorage.getItem('bookmarks');
 if(stored){
    bookmarks = JSON.parse(stored);
 }
 applyFilter();
}
