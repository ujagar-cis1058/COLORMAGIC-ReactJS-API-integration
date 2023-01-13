import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, ListItemText, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreed, fetchData, fetchFilteredData } from '../features/beer/beerSlice';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../store/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CheckBox } from '@mui/icons-material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';


export default function BeerList() {

    const dispatch = useDispatch<AppDispatch>()
    const beerState = useSelector((state: RootState) => state)
    const [selected,setSelected] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [breedId, setbreedId] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        (dispatch(fetchBreed()));
        console.log("useeffect 1..................")
    }, [])

    // // Remove items from localstorage
    // useEffect(() => {
    //     let obj = { id: breedId };
    //     if (localStorage.getItem("breedId")) {
    //         const id = localStorage.removeItem("breedId");
    //         // obj.id = id !== null ? id : '';
    //         setbreedId(obj.id);

    //     }
    //     dispatch(fetchData(obj))
    // }, [breedId])


    // SET items from localstorage
    useEffect(() => {
        if (breedId.length > 0) {
            localStorage.setItem('breedId', breedId);
        }
    }, [breedId])

    const loadMoreImage = (e: any) => {
        setPage(page + 1);
    }

    useEffect(() => {
        const obj = { page: page, id: breedId };
        dispatch(fetchFilteredData(obj))
        console.log("useeffect 2..................")
    }, [page])


    // GET items from localstorage
    useEffect(() => {
        let obj = { id: breedId };
        if (localStorage.getItem("breedId")) {
            const id = localStorage.getItem("breedId");
            obj.id = id !== null ? id : '';
            setbreedId(obj.id);
        }
        dispatch(fetchData(obj))
    }, [breedId])

    const handleOnChange = (e: any) => {
        setbreedId(e.target.value);
    }
    console.log(beerState, 'state');

    return (

        <Box component='div' sx={{ '& button': { m: 1 } }}>
            <br />
            <label>
                <span style={{ fontSize: 30 }}>Select Breed:</span>
                <br />

                <Select style={{ width: 200, }} onChange={handleOnChange} value ={breedId}>
                    
                    {/* conditions for select breed in dropdown  */}
                    {beerState.beer.breeds.length > 0 && beerState.beer.breeds.map((name: any) => (
                        <MenuItem selected={localStorage.getItem("breedId") === name.id} key={name.name} value={name.id}> {name.id} </MenuItem>

                    ))}
                </Select>
            </label>

            {breedId && (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {beerState.beer.catList.map((beer: any) =>
                    <Grid item xs={2} sm={4} md={4} >
                        <Card sx={{ maxWidth: 345, minHeight: '40%', margin: '10px' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={beer.url}
                                alt="green iguana"
                                sx={{ objectFit: 'contain' }}
                            />

                            {/* <CardContent>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {beer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {beer.description.substring(0, 100)}
                            </Typography>
                        </CardContent> */}
                            <CardActions>
                                <Link href={`/rymindr/${beer.id}`}><Button variant="contained" >View Details</Button></Link>
                            </CardActions>

                        </Card>
                    </Grid>
                )}
            </Grid>)}
            {/* <Button variant='outlined' size='large' sx={{ maring: '20px' }} onClick={handleMoreImage}>Load More</Button> */}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', justifyContent: 'center' }}>

            </Box>
            <Box sx={{ textAlign: 'center' }}>
                {/* <Button variant='outlined' size='large' sx={{ maring: '20px' }} disabled={(page == 1) ? true : false} onClick={loadPreviousPage}>Previous</Button> */}
                {/* <Button variant='outlined' size='large' sx={{ maring: '20px' }} onClick={loadMoreImage}>Load More</Button> */}
                {/* <Button variant="contained" >Success</Button> */}
                <Button variant='contained' color="success" size='large' sx={{ maring: '20px' }} onClick={loadMoreImage}>Load More</Button>
            </Box>
        </Box>
    );
}
