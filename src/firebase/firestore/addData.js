import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function addData(collectionName, data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, collectionName), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
