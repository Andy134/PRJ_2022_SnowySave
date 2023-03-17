import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

export const settingService = {
    fetchSetting,
    saveSetting,
}

const collection = process.env.REACT_APP_FOO;

// Sub
async function fetchSetting() {
  console.log("Fetch Setting :::")
  const docRef = doc(db, collection, "settings");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else return null;
}
async function saveSetting(data) {
  console.log("Save Setting :::");
  const docRef = doc(db, collection, "settings");
  await setDoc(docRef, data);
}