import { useState } from 'react';

function App() {
  const [animalName, setAnimalName] = useState('');
  const [animalData, setAnimalData] = useState({});

  const searchForAnimal = async (event) => {
    event.preventDefault();
    try {
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
    } catch (error) {
      console.log(error);
    }
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
                <input type="text" name="name" id="name" placeholder="Enter an animal's name" required value={animalName} onChange={(event) => setAnimalName(event.target.value)} />
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
