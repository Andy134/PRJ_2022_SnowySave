import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import moment from "moment";
import { db } from "../firebaseConfig";

export const packService = {
  fetchSubs,
  saveSubs,
  resetSubs,
  currentBalance,
  updateHistory,
  fetchHistory,
  resetHistory,
  distribution,
}

const collection = process.env.REACT_APP_FOO;

// Balance
async function currentBalance() {
  console.log("Fetch Balance :::")
  const docRef = doc(db, collection, "data");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else return null
}
async function distribution(pBalance) {
  console.log("Distribution :::");
  const docRef = doc(db, collection, "data");
  await setDoc(docRef, pBalance);
}

// Sub
async function fetchSubs() {
  console.log("Fetch Subs :::")
  const docRef = doc(db, collection, "subs");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else return null;
}
async function saveSubs(data) {
  console.log("Save Subs :::");
  const docRef = doc(db, collection, "subs");
  await setDoc(docRef, data);
}
async function resetSubs() {
  console.log("Reset Subs :::");
  const docRef = doc(db, collection, "subs");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let subs = docSnap.data();
    let {data} = subs
    let initData = data.filter((el)=>el.id === 0)
    await setDoc(docRef, {data: initData});
  }
}

// History
async function fetchHistory(){
  console.log("Fetch History :::")
  const docRef = doc(db, collection, "history");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data())
    return docSnap.data();
  }
  else return null;
}
async function updateHistory(data){
  data.date = moment().toISOString();
  fetchHistory().then((resp)=>{
    if(resp.data) {
      let history = resp.data
      history.unshift(data)
      console.log("Save History :::");
      const docRef = doc(db, collection, "history");
      setDoc(docRef, {data: history});
    }
  })
}
async function resetHistory(){
  console.log("Reset History :::");
  const docRef = doc(db, collection, "history");
  setDoc(docRef, {data: []});
}
// ::: Balance 
// {
//     "total": 0,
//     "packs": [
//         {
//             "id": 0,
//             "amount": 0,
//         },
//         {
//             "id": 1,
//             "amount": 0,
//         },
//         {
//             "id": 2,
//             "amount": 0,
//         },
//         {
//             "id": 3,
//             "amount": 0,
//         },
//         {
//             "id": 4,
//             "amount": 0,
//         },
//         {
//             "id": 5,
//             "amount": 0,
//         },
//     ]
// }


// ::: Sublist 
// {
//     "sublist":
//     [
//         {
//             "id": 0,
//             "packId": 0,
//             "title": "Food",
//             "img": "food.png",
//             "amount": 3000
//         },
//         {
//             "id": 1,
//             "packId": 0,
//             "title": "Clothing",
//             "img": "laundry.png",
//             "amount": 23000
//         }
// }

// ::: History 

// [
//   {
//     "source": "food.png",
//     "amount": 3000,
//     "date":null,
//         "type": "I" ,
//   },
//   {
//     "source": "food.png",
//     "amount": 3000,
//     "type": "O" ,
//   }
// ]