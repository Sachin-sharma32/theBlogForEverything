import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    posts: [],
    session: "",
    user: "",
    bookmarks: [],
    likes: [],
    categories: [],
    tags: [],
};

const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("mode", state.mode);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
            console.log(state.posts);
        },
        setSession: (state, action) => {
            state.session = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
        },
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        },
        setLiked: (state, action) => {
            state.likes = action.payload;
            console.log(state.likes);
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
            console.log(state.categories);
        },
        setTags: (state, action) => {
            state.tags = action.payload;
            console.log(state.tags);
        },
    },
});

export const {
    setMode,
    setPosts,
    setSession,
    setUser,
    setBookmarks,
    setLiked,
    setCategories,
    setTags,
} = baseSlice.actions;
export default baseSlice.reducer;
