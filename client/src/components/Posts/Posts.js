import React, { useEffect } from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import EmptyPost from "../EmptyPost/EmptyPost";
import { getPosts } from "../../redux/actions/posts";

const Posts = ({ user }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(1));
  }, [dispatch]);

  if (!posts?.length && !isLoading) return <EmptyPost />;
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post?.id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
