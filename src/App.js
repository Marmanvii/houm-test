import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Header from './Layout/header/Header';
import TextField from '@mui/material/TextField';
import Selector from './components/Selector';
import ENV_CONFIG from './environment/env-config';
import ERRORS from './constants/error';
import SELECT_ITEMS from './constants/select-items';

function App() {

  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [paginationData, setPaginationData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleGenderChange = (event) => {
    setPage(0);
    setGender(event.target.value);
  }

  const handleNameChange = (event) => {
    setPage(0);
    setName(event.target.value);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${ENV_CONFIG.rickMortyApiUrl}?page=${page}&status=${status}&gender=${gender}&name=${name}`);
      if (!response.ok) {
        throw new Error(ERRORS.notLoaded);
      }

      const data = await response.json();

      const tranformedCharacters = data.results.map((characterData) => {
        return {
          id: characterData.id,
          name: characterData.name,
          image: characterData.image,
          origin: characterData.origin.name,
          location: characterData.location.name,
          species: characterData.species,
        };
      });
      setCharacters(tranformedCharacters);
      setPaginationData(data.info);
    } catch (error) {
      setError(error.message);
      setCharacters([]);
    }
    setIsLoading(false);
  }, [gender, status, name, page]);

  useEffect(() => {
    getCharactersHandler();
  }, [getCharactersHandler]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Pagination count={paginationData.pages} onChange={handlePageChange} variant="outlined" shape="rounded" />
      <TextField onChange={handleNameChange} id="name-search" label="Name..." variant="outlined" />
      <Selector value={gender} handleChange={handleGenderChange} title={'Gender'} items={SELECT_ITEMS.genderOptions} />
      <Selector value={status} handleChange={handleStatusChange} title={'Status'} items={SELECT_ITEMS.statusOptions} />
      <CardList characters={characters} />
    </Box>
  );
}

export default App;
