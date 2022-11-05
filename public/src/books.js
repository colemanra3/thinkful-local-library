const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find( author => id === author.id );
}

function findBookById(books, id) {
  return books.find( book => book.id === id );
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter( book => book.borrows.some( ({returned}) => !returned ));
  const returned = books.filter( book => book.borrows.every( ({returned}) => returned ));
  return [ borrowed, returned ];
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
