'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        return router.push("/admin")
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-xl font-bold">Sign In</h1>
            <form onSubmit={handleForm} className="w-1/4">
                <label className="block mt-2">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="mr-2 px-2 py-1 border border-gray-300 rounded text-black w-full"
                />
                <label className="block mt-2">Password</label>
                <input
                    required
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="mr-2 px-2 py-1 border border-gray-300 rounded text-black w-full"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4">
                    Sign in
                </button>
            </form>
            <p className="mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500">Sign Up</a>
            </p>
        </div>
    );
}

export default Page;