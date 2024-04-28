import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async function (_, { rejectWithValue }) {
    try {
      const posts = await api.getPosts();

      return posts;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async function ({ postId, updatedPost }, { rejectWithValue, getState }) {
    try {
      const { posts } = getState().postsReducer;

      await api.mutatePost(postId, updatedPost);

      const updatedPosts = posts.map((post) => {
        if (post.id == postId) return updatedPost;
        return post;
      });

      return updatedPosts;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async function ({ newPost }, { rejectWithValue, getState }) {
    try {
      const { posts } = getState().postsReducer;

      await api.addPost(newPost);

      const updatedPosts = [newPost, ...posts];

      return updatedPosts;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async function ({ postId }, { rejectWithValue, getState }) {
    try {
      const { posts } = getState().postsReducer;

      await api.deletePost(postId);

      const updatedPosts = posts.filter(
        (post) => String(post.id) !== String(postId)
      );

      return updatedPosts;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async function ({ comment, postId }, { rejectWithValue, getState }) {
    const posts = getState().postsReducer.posts;

    let updatedPost = structuredClone(posts.find((post) => post.id === postId));
    updatedPost.comments = [comment, ...updatedPost.comments];

    try {
      await api.mutatePost(postId, updatedPost);

      const updatedPosts = posts.map((post) => {
        if (post.id === postId) return updatedPost;
        return post;
      });

      return updatedPosts;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const getUpdatedPostsAfterToggleLike = ({ posts, userId, postId }) => {
  let updatedPost = structuredClone(posts.find((post) => post.id == postId));

  updatedPost.likes = updatedPost.likes.find((id) => id === userId)
    ? updatedPost.likes.filter((id) => id !== userId)
    : [...updatedPost.likes, userId];

  const updatedPosts = posts.map((post) => {
    if (post.id === postId) return updatedPost;
    return post;
  });

  return { updatedPost, updatedPosts };
};

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async function ({ userId, postId }, { rejectWithValue, getState }) {
    const state = getState();
    const posts = state.postsReducer.posts;

    const { updatedPost, updatedPosts } = getUpdatedPostsAfterToggleLike({
      posts,
      userId,
      postId,
    });

    try {
      await api.mutatePost(postId, updatedPost);

      return updatedPosts;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = null;
      state.isLoading = false;
      state.isError = true;
    });
    ///
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    ///
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    ///
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    ///
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    ///
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

const postsReducer = postsSlice.reducer;
export default postsReducer;
