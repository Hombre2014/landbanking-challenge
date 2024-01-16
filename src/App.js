import { useState } from 'react';

function App() {
  const [animalName, setAnimalName] = useState('');
  const [animalData, setAnimalData] = useState(null);
  const [favoriteAnimals, setFavoriteAnimals] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [cache, setCache] = useState(
    JSON.parse(localStorage.getItem('cache')) || {}
  );

  const searchForAnimal = async (event) => {
    event.preventDefault();
    try {
      if (cache[animalName]) {
        // If the item is in the cache, use the cached data
        setAnimalData(cache[animalName]);
      } else {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/animals?name=${animalName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': process.env.REACT_APP_API_KEY,
            },
          }
        );

        const data = await response.json();
        setAnimalData(data);

        // Update the cache
        setCache({ ...cache, [animalName]: data });

        // Store updated cache in the localStorage
        localStorage.setItem(
          'cache',
          JSON.stringify({ ...cache, [animalName]: data })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCharacteristics = (characteristics) => {
    return (
      <ul className="">
        {Object.entries(characteristics).map(([key, value]) => (
          <li key={key} className="mb-1">
            <div className="flex gap-2">
              <strong>{key}:</strong> {value}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const addToFavorites = (item) => {
    if (animalData[item]) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(animalData[item]);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFavoriteAnimals(favorites);
    }
  }

  const removeFromFavorites = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.name !== item
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteAnimals(updatedFavorites);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">
        My favorite animals
      </h1>
      <div className='w-8/9 px-6 pb-12'>
        <div className='flex justify-between items-start gap-8'>
          <div className='flex flex-col justify-start items-center w-1/2'>
            <h3 className="text-2xl font-bold text-center mt-6">
              Search for an animal
            </h3>
            <form className='flex'>
              <label htmlFor="name" className='mt-6 text-center'>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter an animal's name"
                  required value={animalName}
                  onChange={(event) => setAnimalName(event.target.value)}
                  className="border-2 outline-10 rounded-md py-2 px-2 bg-gray-100 block mt-4 mr-4"
                />
              </label>
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-md px-4 mt-10 mr-4'
                onClick={searchForAnimal}
              >
                Search
              </button>
              <button
                type='reset'
                onClick={() => setAnimalName('')}
                className='bg-red-500 text-white rounded-md px-4 mt-10'
              >
                Clear
              </button>
            </form>
            <div className="flex flex-col items-start">
              {animalData && (
                <>
                  {animalData.map((animal, index) => (
                    <div
                      className="flex flex-col justify-center items-start"
                      key={index}
                    >
                      <h3
                        className="text-2xl font-bold text-center my-6"
                        key={index}
                      >
                        {index + 1}. {animal.name}
                      </h3>
                      <h4 className="text-xl mb-4 font-bold">
                        Characteristics
                      </h4>
                      <ul>
                        {renderCharacteristics(
                          animalData[index].characteristics
                        )}
                      </ul>
                      {/* Add a button to add the animal to favorites only if it is not already in the favorites array */}
                      {JSON.parse(localStorage.getItem('favorites'))?.some(
                        (favorite) => favorite.name === animal.name
                      ) ? (
                        <p className="text-red-500 font-bold mt-2">
                          The animal is already added to favorites list
                        </p>
                      ) : (
                        <button
                          className="bg-blue-500 text-white rounded-md px-4 py-2 mt-6"
                          onClick={() => addToFavorites(index)}
                        >
                          Add to Favorites
                        </button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold text-center mt-6">
              Favorites List
            </h2>
            {favoriteAnimals?.map((favorite, index) => (
              <ul key={index}>
                <li key={index}>
                  <h3 className="text-2xl font-bold my-6">
                    {index + 1}. {favorite.name}
                  </h3>
                  <p className="text-xl font-bold my-2">Characteristics</p>
                  <ul>{renderCharacteristics(favorite.characteristics)}</ul>
                  <button
                    className="bg-red-500 text-white rounded-md px-4 py-2 mt-6"
                    onClick={() => removeFromFavorites(favorite.name)}
                  >
                    Remove from Favorites
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
