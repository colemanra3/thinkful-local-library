function findAccountById(accounts, id) {
  return accounts.find( (account) => ( account.id === id ))
};

function sortAccountsByLastName(accounts) {
  return accounts.sort( (a,b) => a.name.last < b.name.last ? -1 : 1 );
}

function getTotalNumberOfBorrows(account, books) {
  let cnt = 0;
  books.forEach( book => { book.borrows.forEach( borrow => { if ( borrow.id === account.id ) { cnt++ } }) } );
  return cnt;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = [];
  // console.log('account:');
  // console.log(account);
  books.forEach( book => {
    book.borrows.forEach( borrow => {
      if ( borrow.id === account.id && !borrow.returned ) {
        // console.log('book:');
        // console.log(book);
        const author = authors.find( author => author.id == book.authorId );
        // console.log('author:');
        // console.log(author);
        borrowedBooks.push({ ...book, author });
      }
    })
  });
  // console.log( 'borrowedBooks:');
  // console.log(borrowedBooks);
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
