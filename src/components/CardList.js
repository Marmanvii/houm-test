import Character from './Character';
import Grid from '@mui/material/Grid';

const CardList = (props) => {
    return (
        <Grid container columns={3} justifyContent="space-around"
        alignItems="center">
            {props.characters.map((character) => {
                return <Character
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    origin={character.origin}
                    species={character.species}
                    location={character.location}
                />
            })}
        </Grid>
    );
};

export default CardList;
