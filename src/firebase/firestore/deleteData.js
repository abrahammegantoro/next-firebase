import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function deleteData(collectionName, documentId) {
    let result = null;
    let error = null;

    try {
        await deleteDoc(doc(db, collectionName, documentId));
        result = "Document successfully deleted";
    } catch (e) {
        error = e;
    }

    return { result, error };
}
