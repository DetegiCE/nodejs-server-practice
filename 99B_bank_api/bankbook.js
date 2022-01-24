const crypto = require('crypto');
module.exports = (uuid) => {
    let bookNumber = '';
    let uuidArray = uuid.split('-');
    for (let i = 0; i < uuidArray.length; i++) {
        bookNumber += uuidArray[i];
    }
    
    // generate 14 digit number from uuid using SHA256
    let sha256 = crypto.createHash('sha256');
    sha256.update(bookNumber);
    bookNumber = sha256.digest('hex');
    bookNumber = String(parseInt(bookNumber, 16));
    bookNumber = bookNumber.substring(0, 15);
    bookNumber = bookNumber.replace('.', '');
    bookNumber = bookNumber.substring(0, 3) + '-' + bookNumber.substring(3, 9) + '-' + bookNumber.substring(9, 14);
    return bookNumber;
};