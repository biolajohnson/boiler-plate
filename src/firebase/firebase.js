import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database()

export { firebase, database as default }


//child_removed, child_added, child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })
// const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...snapshot.val()
//         })
//     })
//     console.log(expenses)
// })

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = []
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })
//setup expenses

// database.ref('expenses').push({
//     description: 'Coffee',
//     amount: 100,
//     createdAt: 2345665,
//     note: 'mornings'
// })

// database.ref('expenses/-MGiNOCKepFG4fqvnVkY').remove()




//setup subscription
// database.ref().on('value', (snapshot) => {
//     const { name, job, location } = snapshot.val()
//     console.log(`${name} works for ${job.company} in ${location.city}`)
// }, (e) => {
//     console.log('an error occured', e)
// })

// setTimeout(() => {
//     database.ref().update({
//         name: 'Agnes'
//     })
// }, 2000)

// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => {
//         console.log('error!', e)
//     })
// database.ref().set({
//     name: 'Abiola Johnson',
//     age: 24,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     },
//     isSingle: true,
//     location: {
//         city: 'Abuja',
//         country: 'Nigeria'
//     }
// }).then(() => {
//     console.log('data is saved')
// }).catch((e) => {
//     console.log('error, ', e)
// })
// database.ref().update({
//     stressLevel: 9,
//     'job/title': 'Manager',
//     'job/company': 'Amazon',
//     'location/city': 'Seattle',
//     'location/country': 'United States'
//})
