import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const CharacterCard = styled(Card)(({ theme }) => ({
    height: 350,
    width: 200,
    margin: `10px 10px 10px`,
}));

const Character = (props) => {
    return (
        <CharacterCard>
            <CardMedia
                component="img"
                height="140"
                image={props.image}
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.species}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Living in {props.location}, currently {props.status.toLowerCase()}
                </Typography>
            </CardContent>
        </CharacterCard>
    );
}

export default Character;
