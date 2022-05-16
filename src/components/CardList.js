import Character from './Character';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const CharacterList = styled(Grid)(({ theme }) => ({
    justifyContent: 'center',
    marginLeft: `0`,
    maxWidth: 'fit-content',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
        marginLeft: `5vw`,
    },
}));

const CardList = (props) => {
    return (
        <CharacterList container columns={3} justifyContent="space-around"
            alignItems="center">
            {props.characters.map((character) => {
                return <Character
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    origin={character.origin}
                    species={character.species}
                    location={character.location}
                    status={character.status}
                />
            })}
        </CharacterList>
    );
};

export default CardList;
