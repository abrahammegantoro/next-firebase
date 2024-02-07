'use client'
import { useState } from 'react';
import addData from '@/firebase/firestore/addData';
import { useRouter } from 'next/navigation';

export default function AddData() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: '', job: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = async (e) => {
    e.preventDefault();

    const collectionName = 'tests';
    const newData = formData;

    const { error } = await addData(collectionName, newData);

    if (error) {
      setError(error.message);
    } else {
      setFormData({ name: '', job: '' });
      alert('Data added successfully!');
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-xl font-bold">Add New Data</h1>
      <form onSubmit={handleAddData}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="mr-2 px-2 py-1 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleChange}
          placeholder="Job"
          className="mr-2 px-2 py-1 border border-gray-300 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Data
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          Error: {error}
        </div>
      )}
    </div>
  );
}
