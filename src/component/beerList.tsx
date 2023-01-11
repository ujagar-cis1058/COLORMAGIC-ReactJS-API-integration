import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, ListItemText, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreed, fetchData, fetchFilteredData, fetchFilteredImageData } from '../features/beer/beerSlice';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../store/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CheckBox } from '@mui/icons-material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


export default function BeerList() {

    const dispatch = useDispatch<AppDispatch>()
    const beerState = useSelector((state: RootState) => state)
    const [page, setPage] = useState<number>(0);
    const [breedId, setbreedId] = useState<string>('');
    const [catId, setcatId] = useState<string>('');



    useEffect(() => {
        console.log(beerState);
        dispatch(fetchBreed())
    }, [])


    const loadMoreImage = (e: any) => {
        setPage(page + 1);
    }

    //to fetch image from breed
    useEffect(() => {
        const obj = { page: page, id: breedId };
        dispatch(fetchFilteredData(obj))
        console.log("fetchFilteredData=================");
    }, [page])

    // useEffect(() => {
    //     console.log(catId);

    // },[catId]);




    useEffect(() => {
        const obj = { page: page, id: breedId };
        dispatch(fetchData(obj))
        console.log("fetchData=================");
    }, [breedId])


    // const loadPreviousPage = (e: any) => {
    //     if (page > 1) {
    //         setPage(page - 1)
    //     }
    // }
    const handleOnChange = (e: any) => {
        setbreedId(e.target.value);
    }
    // const handleMoreImage = () => {
    //     setHasMore(hasMore + imagePerRow)
    // }

    return (
        catId === undefined || catId === ''?
        (<Box component='div' sx={{ '& button': { m: 1 } }}>
            <br />
            <label>
                <span style={{ fontSize: 30 }}>Select Breed:</span>
                <br />

                <Select style={{ width: 200, }} onChange={handleOnChange}>
                    {beerState.beer.breeds.length > 0 && beerState.beer.breeds.map((name: any) => (

                        <MenuItem key={name.name} value={name.id}>
                            {name.id}
                        </MenuItem>
                    ))}
                </Select>
            </label>

            {breedId && (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {beerState.beer.catList.map((beer: any) =>
                <Grid item xs={2} sm={4} md={4} >
                    <Card sx={{ maxWidth: 345, minHeight: '40%', margin: '10px'}}>
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
                            <Button variant="contained" onClick={()=> {setcatId(beer.id); dispatch(fetchFilteredImageData(beer.id));}} >View Details</Button>
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
                <Button variant='outlined' size='large' sx={{ maring: '20px' }} onClick={loadMoreImage}>Load More</Button>
            </Box>
        </Box>) :
        (
            <Box component='div' sx={{ '& button': { m: 1 } }}>
            <Button variant="contained" onClick={()=>setcatId('')} >Back</Button>
            {
                beerState.beer.catDetails.breeds && <Card sx={{ maxWidth: 345, minHeight: '40%', margin: '10px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={beerState.beer.catDetails.url}
                        alt="green iguana"
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent >
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {beerState?.beer?.catDetails?.breeds[0]?.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Origin : {beerState?.beer?.catDetails?.breeds[0]?.origin}
                        </Typography>

                        <br />
                        <Typography variant="body2" color="text.secondary">
                            {beerState?.beer?.catDetails?.breeds[0]?.temperament}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                            {beerState?.beer?.catDetails?.breeds[0]?.description.substring(0, 100)}
                        </Typography>
                    </CardContent>
                </Card>}
        </Box>
        )
    );
}
