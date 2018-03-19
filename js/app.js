//event listener for submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
  console.log('func');
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  //local storage
  if (localStorage.getItem('bookmarks') === null) {
    console.log('null');
    var bookmarks = [];

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    console.log('notnull');
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchItems();

  e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }
  fetchItems();
}

//get items
function fetchItems() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="card-block bg-light p-3">' +
      '<h3>' +
      name +
      ' <a class="btn btn-primary" target="_blanks" href="' +
      url +
      '">Visit</a>' +
      ' <a  onclick="deleteBookmark(\'' +
      url +
      '\')" class="btn btn-danger" href="">Delete</a>' +
      '</h3>' +
      '</div></br>';
  }
}
