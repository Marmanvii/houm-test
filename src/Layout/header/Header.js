import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import TITLES from '../../constants/titles';
import COLORS from '../../constants/colors';

const ColorAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'white',
    color: COLORS.primary,
}));

const Header = (props) => {
    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <ColorAppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {TITLES.appBar}
                        </Typography>
                    </Toolbar>
                </ColorAppBar>
            </Box>
        </Fragment>
    );
}

export default Header;
