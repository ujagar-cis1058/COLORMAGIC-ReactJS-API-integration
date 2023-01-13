import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { fetchFilteredImageData } from "../features/beer/beerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate, useParams } from "react-router";
// import { log } from 'console';

export default function SingleCatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const beerState = useSelector((state: RootState) => state);
  const { id } = useParams();
  const history = useNavigate();
  // const [myState, setMyState] = useSessionSt("state_key", "initial_value")

  console.log(id, "riwe");

  useEffect(() => {
    dispatch(fetchFilteredImageData(id));
  }, []);
  //the following data:  breed nameimage,, origin,
  // temperament, and description.
  return (
    <Box component="div" sx={{ "& button": { m: 1 } }}>
      <Button variant="contained" onClick={() => history("/rymindr")}>
        {" "}
        Back{" "}
      </Button>
      {beerState.beer.catDetails.breeds && (
        <Card sx={{ maxWidth: 345, minHeight: "40%", margin: "10px" }}>
          <CardMedia
            component="img"
            height="140"
            image={beerState.beer.catDetails.url}
            alt="green iguana"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
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
              {/* {beerState.beer.catDetails.breeds.description.substring(0, 100)} */}
              {beerState?.beer?.catDetails?.breeds[0]?.description.substring(
                0,
                100
              )}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Link href={`/${beer.id}`}><Button variant="contained" >View Details</Button></Link> */}

            {/* <IconButton aria-label="add to favorites" onClick={ () => addToFavorite(beer.id)}>
                            <FavoriteIcon sx={{ color : beerState.beer.favoriteBeer.filter( (x:any) => x.id==beer.id).length > 0 ? '#EB1D36' : '#0000008a'}} />
                        </IconButton> */}
          </CardActions>
        </Card>
      )}
    </Box>
  );
}
