console.log('Destructuring!')

// const person = {
//     name: 'Abiola',
//     age: 23,
//     location: {
//         city: 'Lagos',
//         temp: 100
//     }
// }

// const { name, age } = person 

// console.log(`${name} is ${age} years old`)

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         //name: 'penguin',

//     }
// }
//  const { name: publisherName = 'Self-Published' } = book.publisher
// console.log(publisherName)

//array destructuring

const address = ['Block 3', 'Flat 4', 'Millenium estate', 'Lagos']

const [, , estate = 'Victoria Crest', state] = address;

console.log(`You are in ${estate}, ${state}, Nigeria`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [actualItem, , medium] = item 

console.log(`A medium ${actualItem} cost ${medium}`)