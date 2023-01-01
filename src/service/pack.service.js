import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

const SUB_LIST = "SUB_LIST";
const HISTORY = "HISTORY";

export const packService = {
    fetchSubs,
    saveSubs,
    currentBalance,
    updateHistory,
    fetchHistory,
    distribution,
}

// Balance

// Get balance from your database
async function currentBalance() {
  console.log("Fetch Balance :::")
  const docRef = doc(db, "balance", "data");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else return null
}

async function distribution(pBalance) {
  console.log("Distribution :::");
  const docRef = doc(db, "balance", "data");
  await setDoc(docRef, pBalance);
}

// Sub

function fetchSubs(packId) {
    var subs = JSON.parse(localStorage.getItem(SUB_LIST)) || [];
    if(packId && subs){
        subs = [].concat(subs).filter((el)=>el.packId === packId)
    }
    return subs
}

function saveSubs(data) {
    const subs = JSON.stringify(data);
    localStorage.setItem(SUB_LIST, subs)
    return subs
}

// History

function updateHistory(param){
    var history = JSON.parse(localStorage.getItem(HISTORY)) || []
    param.date = new Date();
    history?.unshift(param)
    localStorage.setItem(HISTORY, JSON.stringify(history))
}

function fetchHistory(){
    var history = JSON.parse(localStorage.getItem(HISTORY)) || []
    return history?.slice(0,5)
}



// ::: Balance 
// {
//     "total": 0,
//     "undefine": 0,
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

//     [
//         {
//             "source": "food.png",
//             "amount": 3000,
//             "date":null,
            //    "type": "I" ,
//         },
//         {
//             "source": "food.png",
//             "amount": 3000
            //    "type": "O" ,
//         }
//      ]