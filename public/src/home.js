let getTotalBooksCount = books => books.length;

let getTotalAccountsCount = accounts => accounts.length;

// function getBooksBorrowedCount(books) {
//   let sum = 0;
//   return books.reduce( (sum,book) => {
//     console.log(`sum:${sum}`);
//     if ( book.borrows.some( borrow => !borrow.returned ) ) {
//       return sum+1;
//     } else {
//       return sum;
//     }
//   },0);
// }

// function getBooksBorrowedCount(books) {
//   return books.reduce( (sum,book) =>
//     book.borrows.some( borrow => !borrow.returned ) ? sum+1 : sum, 0);
// }

let getBooksBorrowedCount = books =>
  books.reduce( (sum,book) =>
    book.borrows.some( borrow => !borrow.returned ) ? sum+1 : sum, 0);

function mostPopular (counts,max=5) {
  // console.log(genreCount);
  let popular = [];
  for ( let genre in counts ) {
    popular.push({ name: genre, count: counts[genre] });
  }
  // console.log(popular);
  popular.sort( (a,b) => b.count - a.count );
  // console.log(popular);
  if ( popular.length > 5 ) popular.length = 5;
  // console.log(popular);
  return popular;
}

function getMostCommonGenres(books) {
  let counts = {};
  books.forEach( book => {
    let genre = book.genre;
    if ( genre in counts ) {
      counts[genre]++;
    } else {
      counts[genre]=1;
    }
  })
  // console.log(counts);
  return mostPopular(counts);
}

function getMostPopularBooks(books) {
  let counts = {};
  books.forEach( book => counts[book.title]=book.borrows.length );
  // console.log(counts);
  return mostPopular(counts);
}

function getMostPopularAuthors(books, authors) {
  let counts = {};
  books.forEach( book => {
    const id = book.authorId;
    const count = book.borrows.length;
    counts[id]=count;
  } );
  // console.log(counts);
  let popular = mostPopular(counts);
  // console.log(popular);
  popular.map(
    authCount => {
      const authorName = authors.find( ({id}) => id == authCount.name ).name;
      authCount.name = authorName.first + ' ' + authorName.last;
    }
  );
  // console.log(popular);
  return popular;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
