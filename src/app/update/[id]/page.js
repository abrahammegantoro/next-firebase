'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getData from '@/firebase/firestore/getData';
import updateData from '@/firebase/firestore/updateData';
import deleteData from '@/firebase/firestore/deleteData';

export default function DataDetails({ params }) {
    const { id } = params;
    const router = useRouter();

    const [documentData, setDocumentData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const { result, error } = await getData('tests', id);

                if (error) {
                    setError(error.message);
                } else {
                    setDocumentData(result);
                    setFormData({ name: result.name, job: result.job });
                }
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();
        const collectionName = 'tests';

        const { error } = await updateData(collectionName, id, formData);

        if (error) {
            setError(error.message);
            console.log(error)
        } else {
            alert('Data updated successfully!');
            router.push('/');
        }
    };

    const handleDeleteData = async () => {
        const collectionName = 'tests';

        const { error } = await deleteData(collectionName, id);

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
        }
    };

    if (!documentData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-xl font-bold">Data Details</h1>
            <form onSubmit={handleUpdateData} className="w-1/4">
                <label className="block mt-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="mr-2 px-2 py-1 border border-gray-300 rounded text-black w-full"
                />
                <label className="block mt-2">Job</label>
                <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    placeholder="Job"
                    className="mr-2 px-2 py-1 border border-gray-300 rounded text-black w-full"
                />
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Data
                    </button>
                    <button
                        onClick={handleDeleteData}
                        type='button'
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete Data
                    </button>
                </div>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    Error: {error}
                </div>
            )}
        </div>
    );
}
