// const book = {
//     title: "Bla bla bla",
//     author: 'Bob Huy',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-published'} = book.publisher;

// console.log(publisherName);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice, ] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);