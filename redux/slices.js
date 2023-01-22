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
        },
        setSession: (state, action) => {
            state.session = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        },
        setLiked: (state, action) => {
            state.likes = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
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
