
const bookLibrary = {
    books: [],

    addBook(book) {
        this.books.push(book);
        console.log(`Added book: "${book.title}" by ${book.author}`);
    },

    getBooksByAuthor(author) {
        return this.books.filter(book => book.author === author);
    },

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
        console.log(`Removed book: "${title}"`);
    },

    getAllBooks() {
        return this.books.map(book => book.title);
    }
};

bookLibrary.addBook({ title: "book1", author: "author1", yearPublished: 2000 });
bookLibrary.addBook({ title: "book2", author: "author2", yearPublished: 2001 });
bookLibrary.addBook({ title: "book3", author: "author3", yearPublished: 2002 });
bookLibrary.addBook({ title: "book4", author: "author4", yearPublished: 2003 });

const author1 = bookLibrary.getBooksByAuthor("author1");
console.log("Books by author1", author1);

bookLibrary.removeBook("book1");

const allBooks = bookLibrary.getAllBooks();
console.log("All book titles:", allBooks);


// Output:
// Added book: "book1" by author1
// Added book: "book2" by author2
// Added book: "book3" by author3
// Added book: "book4" by author4
// Books by author1 [ { title: 'book1', author: 'author1', yearPublished: 2000 } ]
// Removed book: "book1"
// All book titles: [ 'book2', 'book3', 'book4' ]
