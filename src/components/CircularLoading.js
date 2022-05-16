import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

export const CircularLoading = (props) => {
    const CenteredCircular = styled(CircularProgress)(({ theme }) => ({
        overflow: 'hidden',
        position: 'absolute',
        width: `100%`,
        height: `20 %`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'slategrey',
    }));

    return (
        <CenteredCircular />
    );
}

export default CircularLoading;
