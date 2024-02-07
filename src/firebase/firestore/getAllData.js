import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function getAllData(collectionName) {
    let result = null;
    let error = null;

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        result = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (e) {
        error = e;
    }

    return { result, error };
}