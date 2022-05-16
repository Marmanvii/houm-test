import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Selector from './components/Selector';
import COLORS from './constants/colors';
import ERRORS from './constants/errors';
import SELECT_ITEMS from './constants/select-items';
import TITLES from './constants/titles';
import ENV_CONFIG from './environment/env-config';
import Header from './Layout/header/Header';

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

  const theme = createTheme({
    palette: {
      primary: {
        main: COLORS.primary,
      },
      secondary: {
        main: COLORS.secondary,
      },
    },
  });

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${ENV_CONFIG.rickMortyApiUrl}?page=${page}&status=${status}&gender=${gender}&name=${name}`);
      if (!response.ok) {
        if (response.status !== 404) throw new Error(ERRORS.notLoaded);
        else throw new Error(ERRORS.noData);
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
          status: characterData.status,
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
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Stack className='Stack' direction={{ xs: 'column', md: 'row' }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
          <Pagination count={paginationData.pages} onChange={handlePageChange} variant="outlined" shape="rounded" />
          <TextField className='name-input' onChange={handleNameChange} id="name-search" label={TITLES.nameInput} variant="outlined" />
          <Stack className='Stack' spacing={2}>
            <Selector value={gender} handleChange={handleGenderChange} title={TITLES.genderSelect} items={SELECT_ITEMS.genderOptions} />
            <Selector value={status} handleChange={handleStatusChange} title={TITLES.statusSelect} items={SELECT_ITEMS.statusOptions} />
          </Stack>
        </Stack>
        {
          isLoading ? <LinearProgress /> :
            characters.length > 0 ?
              <CardList characters={characters} /> :
              <Typography variant="h3" className='centered-indicator'>{error}</Typography>
        }
      </Box>
    </ThemeProvider>
  );
}

export default App;
