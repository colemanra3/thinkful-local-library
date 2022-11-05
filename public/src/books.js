const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find( author => id === author.id );
}

function findBookById(books, id) {
  return books.find( book => book.id === id );
}

function partitionBooksByBorrowedStatus(books) {
  const status = [ [], [] ];
  const borrowed = status[0];
  const returned = status[1];
  books.forEach( (book) => {
    // console.log('book:'+book.id);
    if ( book.borrows.some( borrow => !borrow.returned )) {
      borrowed.push(book);
      // console.log('borrowed:'+borrowed.length);
    } else {
      returned.push(book);
      // console.log('returned:'+returned.length);
    }
  });
  // console.log(status);
  return status;
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  book.borrows.every( borrow => {
    const account = findAccountById(accounts,borrow.id);
    // console.log({...account, returned: borrow.returned });
    borrowers.push({...account, returned: borrow.returned });
    return borrowers.length == 10 ? false : true;
  })
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
