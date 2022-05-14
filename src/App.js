import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Header from './Layout/header/Header';
import TextField from '@mui/material/TextField';

function App() {

  const [characters, setCharacters] = useState([]);
  const [isAlive, setIsAlive] = useState([]);
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
    setGender(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&status=${isAlive ? 'alive' : 'dead'}&gender=${gender}&name=${name}`);
      if (!response.ok) {
        throw new Error('Could not load characters!');
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
      console.log(data.info);
    } catch (error) {
      setError(error.message);
      setCharacters([]);
    }
    setIsLoading(false);
  }, [gender, isAlive, name, page]);

  useEffect(() => {
    getCharactersHandler();
  }, [getCharactersHandler]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Pagination count={paginationData.pages} onChange={handlePageChange} variant="outlined" shape="rounded" />
      <TextField onChange={handleNameChange} id="outlined-basic" label="Outlined" variant="outlined" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
        >
          <MenuItem value={''}>Any</MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'genderless'}>Genderless</MenuItem>
        </Select>
      </FormControl>
      <CardList characters={characters} />
    </Box>
  );
}

export default App;
