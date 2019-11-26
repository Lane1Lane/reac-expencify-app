import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC1mFdu7GlnT9B7fcU7xKLqSK_m2C6F0rE",
    authDomain: "expensify-bb07e.firebaseapp.com",
    databaseURL: "https://expensify-bb07e.firebaseio.com",
    projectId: "expensify-bb07e",
    storageBucket: "expensify-bb07e.appspot.com",
    messagingSenderId: "288165500214",
    appId: "1:288165500214:web:18dc2019f6c5f106714f97",
    measurementId: "G-WDR7HS36QL"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

export { firebase, database as default };

// database.ref('expenses').on('child_changed',(snapshot) => {
//     console.log(snapshot.key,snapshot.val());
// });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((oneSnap) => {
//         expenses.push({
//             id: oneSnap.key,
//             ...oneSnap.val()
//         });
//     });
//     console.log(expenses);
// }, (e) => {console.log(e)});


// database.ref('expenses').push({
//     description: 'aaa',
//     note: 'bbbb',
//     amount: 100,
//     createdAt: 123   
// });

// database.ref('expenses').push({
//     description: '111',
//     note: '222',
//     amount: 200,
//     createdAt: 987  
// });

// database.ref('expenses').push({
//     description: 'pppp',
//     note: 'uuu',
//     amount: 3000,
//     createdAt: 567 
// });


// database.ref('job')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {console.log(e)})

// const onValueChange = database.ref().on('value', (snapshot) => {
//         console.log(snapshot.val());
//     }, (e) => {console.log(e)});


// const onValueChange = database.ref().on('value',(snapshot) => {
//     console.log(`${snapshot.val().name} is ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
// }, (e) => {console.log(e)});

// database.ref().set({
//     name: 'Andrew',
//     attributes: {
//         height: 170,
//         weight: 90
//     },
//     stressLevel: 6,
//     job: {
//         title: 'aaa',
//         company: '111'
//     }
// }).then(() => {
//     console.log('GOOD');
// });

// database.ref('attributes2/aaa').set({
//     age: 30
// }).then(() => {
//     console.log('Age added');
// }).catch((e) => {
//     console.log('Fuck! Stuck!');
// });

// database.ref().remove()

// database.ref().update({
//     name: 'Mike',
//     age: 25,
//     'attributes/height': 1,
//     stressLevel: 9,
//     'job/company': 'Amazon'
// })