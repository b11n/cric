import { getFirestore, addDoc, collection,serverTimestamp,query, getDocs ,orderBy,where} from "firebase/firestore";
import { initFirebase } from './firebase';



export const initDatabase = function () {
    const { app } = initFirebase();
    const db = getFirestore(app);

    async function addPrediction(uid: string, team: string, manOfMatch: string, matchId: number) {
        console.log(uid)
        const docRef = await addDoc(collection(db, "/predictions/list/" + uid), {
            team,
            manOfMatch,
            matchId,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    }

    async function getLatestPrediction(uid: string, matchId: number) {

        
        const q = query(collection(db,"predictions", "list", uid), where('matchId', '==', matchId) );
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc)=>doc.data()).sort((a,b)=>{
            return a.timestamp.seconds - b.timestamp.seconds;
        })
        if(result){
            return result[result.length - 1];
        }else {
            return {manOfMatch: '', team: 'none'}
        }




    }

    return { db, addPrediction, getLatestPrediction };
}