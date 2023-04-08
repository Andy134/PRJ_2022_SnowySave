import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import moment from "moment";
import { db } from "../firebaseConfig";
import { util } from "../utility";

export const packService = {
  fetchSubs,
  saveSubs,
  resetSubs,
  currentBalance,
  updateHistory,
  fetchHistory,
  resetHistory,
  importHistory,
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
  let currYear = util.getDate(new Date()).year.toString()

  data.date = moment().toISOString();
  fetchHistory().then((resp)=>{
    if(resp.data) {
      let history = resp.data
      const currentyearData = history?.find((item)=> item[currYear])
      currentyearData[currYear].unshift(data)
      console.log("Save History :::");
      const docRef = doc(db, collection, "history");
      setDoc(docRef, {data : history});
    }
  })
}
async function resetHistory(){
  console.log("Reset History :::");
  const docRef = doc(db, collection, "history");
  setDoc(docRef, {data: []});
}

//Import data by year
async function importHistory(year, data){
  console.log("Import History :::");
  let impYear = util.getDate(year).year.toString()
  fetchHistory().then((resp)=>{
    if(resp.data) {
      let history = resp.data || []
      const yearData = history?.find((item)=> item[impYear]) || {}
      yearData[impYear] = data
      history =  [...history, yearData]
      console.log("Save History :::");
      const docRef = doc(db, collection, "history");
      setDoc(docRef, {data : [...history]});
    }
  })
}
