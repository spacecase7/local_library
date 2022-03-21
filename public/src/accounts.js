/*The `findAccountById()` function in `public/src/accounts.js` has two parameters, 
in the following order:

- An array of account objects.
- A string ID of a single account object.
It returns the account object that has the matching ID.*/
function findAccountById(accounts, id) {
let foundId = accounts.find((account) => account.id === id);
return foundId;
}
/*The `sortAccountsByLastName()` function in `public/src/accounts.js` has a single parameter:

- An array of account objects.

It returns a sorted array of the provided account objects. 
The objects are sorted alphabetically by last name. */
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
   accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}
/*The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, 
in the following order:

- An account object.
- An array of all book objects.

It returns a _number_ that represents the number of times the account's ID appears in 
any book's `borrows` array. */
function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
     if (account.id === books[i].borrows[j].id) {
      totalBorrows += 1;
    }
   }
  }
  return totalBorrows;
}
/*The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters,
 in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, 
that represents all books _currently checked out_ by the given account.
 _Look carefully at the object below,_ as it's not just the book object; 
 the author object is nested inside of it. */
function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  let borrowMatch = [];
  books.forEach((item) => {
   const borrowed = item.borrows;
   const book = {
   id: item.id,
   title: item.title,
   genre: item.genre,
   authorId: item.authorId,
   author: {},
   borrows: {}
  };
  const { id, title, genre, authorId, author, borrows } = book;

  borrowed.forEach((borrow) => {
    if (borrow.id === account.id && borrow.returned === false) {
      result.push(book);
      borrowMatch.push(borrow);
      book.borrows = borrowMatch;
      book.author = authors.filter((auth) => auth.id === book.authorId)[0];
    }
   });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
