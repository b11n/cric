import { addDoc, collection, getDocs, getFirestore, orderBy, query,arrayUnion,updateDoc,doc, serverTimestamp, where } from "firebase/firestore";

import { initFirebase } from './firebase';

export const initDatabase = function () {
    const { app } = initFirebase();
    const db = getFirestore(app);

    async function checkAndAddUser(userId: string, userName:string, email:string) {
        if(!userId) {
            throw new Error("User id not provided")
        }
        const q = query(collection(db,"users"), where('userId', '==', userId) );
        const querySnapshot = await getDocs(q);
       if(querySnapshot.docs.length === 0){
        const docRef = await addDoc(collection(db, "/users"), {
            userId,
            userName,
            email,
            timestamp: serverTimestamp()
        });
        return docRef;
       }
    }

    async function getUserList() {
        const q = query(collection(db,"users") );
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc)=>doc.data());
        return result;
    }

    async function getLeaderList() {
        const q = query(collection(db,"leaderboard") , orderBy('points','desc')) ;
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc)=>doc.data());
        return result;
    }

    async function addPrediction(uid: string, team: string, manOfMatch: string, matchId: number) {
        const docRef = await addDoc(collection(db, "/predictions/list/" + uid), {
            team,
            manOfMatch,
            matchId,
            timestamp: serverTimestamp()
        });
        return docRef;
    }

    async function getLatestPrediction(uid: string, matchId: number) {
        const q = query(collection(db,"predictions", "list", uid), where('matchId', '==', matchId) );
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc)=>doc.data()).sort((a,b)=>{
            return a.timestamp.seconds - b.timestamp.seconds;
        });
        if(result.length > 0){
            return result[result.length - 1];
        }else {
            return {manOfMatch: '', team: 'none'}
        }
    }


    async function getUpcomingMatches(count:number) {
        const q = query(collection(db,"matches"), orderBy('index') );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc)=>doc.data());
    }

    async function getFinalBets(matchId: number) {
        const q = query(collection(db,"finalPredictions2"), where('game', '==' , matchId));
        const querySnapshot = await getDocs(q);
        const allBets = querySnapshot.docs.map((doc)=>doc.data());
        return allBets;
    }

    async function getFeatureUsers(featureName: string) {
        const q = query(collection(db,"featureflags"));
        const querySnapshot = await getDocs(q);
        const found = querySnapshot.docs.find((doc)=>{
            return doc.id === featureName;
        });
        return found?.data();
    }

    async function getUserBets(userId:string) {
        const q = query(collection(db,"predictions", "list" , userId), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const allBets = querySnapshot.docs.map((doc)=>doc.data());
        const selectedBets = new Map();

        allBets.forEach((bet,index)=>{
            if(!selectedBets.has(bet.matchId)){
                selectedBets.set(bet.matchId, bet);
            }
        });

       return [...selectedBets].map(item=>item[1]);

    }

    async function registerToken(userId: string, token:string) {

        const q = query(collection(db,"users"), where('userId', '==', userId) );
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length > 0) {
            const user = querySnapshot.docs[0];
            await updateDoc(doc(db, "users", user.id), {
                tokens: arrayUnion(token)
              });
        }
    }




    return { db, addPrediction,registerToken, getLatestPrediction,checkAndAddUser,getUserList,getUserBets,getFinalBets,getLeaderList,getFeatureUsers };
}