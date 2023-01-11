import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface beerState {
  loading: boolean;
  catList: any;
  breeds: any;
  catDetails: any;
  favoriteBeer: any;
  homeBeer: any;
  error: any;
}

const initialState: beerState = {
  loading: false,
  catList: [],
  breeds: [],
  catDetails: [],
  favoriteBeer: [],
  homeBeer: [],
  error: "",
};

export const fetchBreed = createAsyncThunk(
  "fetchBreed",
  async () => {
    try {
      const res = await fetch(
        "https://api.thecatapi.com/v1/breeds"
      ).then((data) => data.json());
      return res;
    } catch (Error) {
      alert('Apologies but we could not load new cats for you at this time! Miau!')
      console.error(Error);
    }
  }
);

// export const fetchFilteredData = createAsyncThunk(
//   "fetchFilteredData",
//   async (food_pairing: string) => {
//     try {
//       const res = await fetch(
//         "https://api.punkapi.com/v2/beers?food=" + food_pairing + "&per_page=10"
//       ).then((data) => data.json());
//       return res;
//     } catch (Error) {
//       console.error(Error);
//     }
//   }
// );

export const fetchFilteredData = createAsyncThunk(
  "fetchFilteredData",
  async (obj: any) => {
    try {
      // console.log('breed_id',obj.id);
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?page=" + obj.page + "&limit=10&breed_id=" + obj.id
      ).then((data) => data.json());
      return res;
    } catch (Error) {
      alert('Apologies but we could not load new cats for you at this time! Miau!')
      console.error(Error);
    }
  }
);

export const fetchData = createAsyncThunk(
  "fetchData",
  async (obj: any) => {
    try {
      console.log('breed_id', obj.id);
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?page=" + obj.page + "&limit=10&breed_id=" + obj.id
      ).then((data) => data.json());
      return res;
    } catch (Error) {
      alert('Apologies but we could not load new cats for you at this time! Miau!')
      console.error(Error);
    }
  }
);

export const fetchFilteredImageData = createAsyncThunk(
  "fetchFilteredImageData",
  async (id: string) => {
    try {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/" + id
      ).then((data) => data.json());

      return res;
    } catch (Error) {
      alert('Apologies but we could not load new cats for you at this time! Miau!')
      console.error(Error);
    }
  }
);

// export const fetchHomeData = createAsyncThunk(
//   "fetchHomeData",
//   async (id: string | undefined) => {
//     try {
      
//     } catch (Error) {
//       alert('Apologies but we could not load new cats for you at this time! Miau!')
//       console.error(Error);
//     }
//   }
// );

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    //fetchBreed
    builder.addCase(fetchBreed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBreed.fulfilled, (state, action) => {
      state.loading = false;
      state.breeds = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBreed.rejected, (state, action) => {
      state.loading = false;
      state.breeds = [];
      state.error = action.error.message;
    });

    //fetchFilteredData
    builder.addCase(fetchFilteredData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredData.fulfilled, (state, action) => {
      state.loading = false;
      state.catList = [...state.catList, ...action.payload];
      state.error = "";
    });
    builder.addCase(fetchFilteredData.rejected, (state, action) => {
      state.loading = false;
      state.catList = [];
      state.error = action.error.message;
    });

    //fetchFilteredData
    builder.addCase(fetchFilteredImageData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredImageData.fulfilled, (state, action) => {
      // console.log(action,"jas");

      state.loading = false;
      state.catDetails = action.payload;
      state.error = "";
    });
    builder.addCase(fetchFilteredImageData.rejected, (state, action) => {
      state.loading = false;
      state.catDetails = [];
      state.error = action.error.message;
    });


    //fetchData
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.catList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.catList = state.catList || [];;
      state.error = action.error.message;
    });
    //fetchFilteredImageData
    // builder.addCase(fetchFilteredImageData.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchFilteredImageData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.catDetails = action.payload;
    //   state.error = "";
    // });
    // builder.addCase(fetchFilteredImageData.rejected, (state, action) => {
    //   state.loading = false;
    //   state.catDetails = [];
    //   state.error = action.error.message;
    // });
   
  },
});

export default beerSlice.reducer;
