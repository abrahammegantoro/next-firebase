'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signOutUser from "@/firebase/auth/signout";

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await signOutUser();

        if (!error) {
            router.push("/");
        } else {
            console.error("Error signing out:", error);
        }
    };

    React.useEffect(() => {
        if (user == null) router.push("/signin");
    }, [user]);

    return (
        <div className="container mx-auto mt-8">
            <h1>Only logged in users can view this page</h1>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                Sign Out
            </button>
        </div>
    );
}

export default Page;
