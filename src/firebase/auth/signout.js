import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOutUser() {
    let result = null;
    let error = null;
    
    try {
        await signOut(auth);
        result = "Sign Out successful";
    } catch (e) {
        error = e;
    }
    
    return { result, error };
}
