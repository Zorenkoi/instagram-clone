import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isFirst: false,
  isLast: false,
  isOpen: false,
  postId: null,
  posts: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { postId, posts } = action.payload;

      const postIndex = posts.findIndex((post) => post.postId === postId);
      const isLast = postIndex === posts.length - 1;
      const isFirst = postIndex === 0;

      document.body.style.overflow = "hidden";
      return {
        isOpen: true,
        postId,
        posts,
        isLast,
        isFirst,
      };
    },
    closeModal: () => {
      document.body.style.overflow = "auto";
      return initialState;
    },
    nextPost: (state, action) => {
      const { posts, postId } = state;

      const postIndex = posts.findIndex((post) => post.postId === postId);
      const newPostIndex = postIndex + 1;
      const newPost = posts[newPostIndex];

      if (newPost) {
        const isLast = newPostIndex === posts.length - 1;
        const isFirst = newPostIndex === 0;

        return {
          ...state,
          isLast,
          isFirst,
          postId: newPost.postId,
        };
      }
    },
    prevPost: (state, action) => {
      const { posts, postId } = state;

      const postIndex = posts.findIndex((post) => post.postId === postId);
      const newPostIndex = postIndex - 1;
      const newPost = posts[newPostIndex];

      if (newPost) {
        const isLast = newPostIndex === posts.length - 1;
        const isFirst = newPostIndex === 0;

        return {
          ...state,
          isLast,
          isFirst,
          postId: newPost.postId,
        };
      }
    },
  },
});

export const { closeModal, openModal, prevPost, nextPost } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
