import { getFirestore, addDoc, collection, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import { initFirebase } from './firebase';



export const initDatabase = function () {
    const { app } = initFirebase();
    const db = getFirestore(app);

    async function addPrediction(uid: string, team: string, manOfMatch: string) {
        console.log(uid)
        const docRef = await addDoc(collection(db, "/predictions/list/" + uid), {
            team,
            manOfMatch
        });
        console.log("Document written with ID: ", docRef.id);
    }

    async function getLatestPrediction(uid: string) {

        const querySnapshot = await getDocs(collection(db, "predictions", "list", uid));
        return querySnapshot.docs[querySnapshot.docs.length - 1].data();




    }

    return { db, addPrediction, getLatestPrediction };
}