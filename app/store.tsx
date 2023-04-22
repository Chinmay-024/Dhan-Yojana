interface Group {
    groupId: number;
    title: string;
    image: string;
    description: string;
  }

import { configureStore, createSlice } from "@reduxjs/toolkit";
const groupDataSlice = createSlice({
    name:"groupData",
    initialState:{group:[]},
    reducers:{
        updateGroups(state:any,action){
            console.log("state action",action);
            state.group = [...action.payload.groups]
        }
    }
});

export const groupDataSliceActions = groupDataSlice.actions;
export const store = configureStore({reducer:{groupData:groupDataSlice.reducer}});
