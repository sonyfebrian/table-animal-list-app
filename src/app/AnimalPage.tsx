'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Animal {
    name: string;
    children: Animal[];
}

const AnimalsPage: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get<{ data: Animal[] }>('https://mockdata.sivadira.com/api/mock/animals');
                setAnimals(response.data.data);
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        };

        fetchAnimals();
    }, []);

    const renderAnimalRow = (animal: Animal, level: number): JSX.Element => {
        return (
            <tr key={`${animal.name}-${level}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td style={{ paddingLeft: `${level * 20}px` }} className='px-6 py-4'>{animal.name}</td>
            </tr>
        );
    };

    const renderAnimal = (animal: Animal, level: number): JSX.Element => {
        return (
            <>
                <React.Fragment key={`${animal.name}-${level}`}>
                    {renderAnimalRow(animal, level)}
                    {animal.children.length > 0 && animal.children.map((child) => renderAnimal(child, level + 1))}
                </React.Fragment>
            </>
        );
    };

    return (
        <div>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-center text-gray-900'>Table List Animals</h1>
            {animals.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>

                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'> <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className='px-6 py-3'>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map((animal, index) => (
                                <React.Fragment key={`${animal.name}-${index}`}>
                                    {renderAnimal(animal, 0)}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table></div>
                </>

            )}
        </div>
    );
};

export default AnimalsPage;
