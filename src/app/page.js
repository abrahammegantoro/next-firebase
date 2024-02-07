'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import getAllData from '@/firebase/firestore/getAllData';
import deleteData from '@/firebase/firestore/deleteData';

export default function AllData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { result, error } = await getAllData('tests');

      if (error) {
        setError(error.message);
      } else {
        setData(result);
      }
    };

    fetchData();
  }, []);

  const handleDeleteData = async (documentId) => {
    const collectionName = 'tests';

    const { error } = await deleteData(collectionName, documentId);

    if (error) {
      setError(error.message);
    } else {
      setData(data.filter(item => item.id !== documentId));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">All Data</h1>
        <Link href="/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
          Add Data
        </Link>
      </div>
      <ul className="mt-4">
        {data.map((item) => (
          <li key={item.id} className='flex justify-between border bg-white items-center rounded mt-3'>
            <h1 className="py-2 px-4 text-black">
              <span className='font-bold'>{item.name}</span> is a <span className='font-bold'>{item.job}</span>
            </h1>
            <div>
              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDeleteData(item.id)}
              >
                Delete
              </button>
              <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                <a href={`/update/${item.id}`}>
                  Update
                </a>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {error && (
        <div className="mt-4 text-red-500">
          Error: {error}
        </div>
      )}
    </div>
  );
}
