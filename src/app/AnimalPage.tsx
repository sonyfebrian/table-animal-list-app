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
            <tr key={`${animal.name}-${level}`}>
                <td style={{ paddingLeft: `${level * 20}px` }}>{animal.name}</td>
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
            <h1>Animals</h1>
            {animals.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animals.map((animal, index) => (
                            <React.Fragment key={`${animal.name}-${index}`}>
                                {renderAnimal(animal, 0)}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AnimalsPage;
