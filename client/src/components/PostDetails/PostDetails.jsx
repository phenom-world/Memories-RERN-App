import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getSuggestedPosts } from "../../redux/actions/posts";
import NoImage from "../../images/noimage.jpg";
import CommentSection from "./CommentSection";
import Post from "../Posts/Post/Post";

const PostDetails = ({ user }) => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(getSuggestedPosts({ tags: post?.tags.replace(/,/g, " ") }));
    }
  }, [dispatch, post]);

  const recommendedPosts = posts?.filter(({ id }) => id !== post?.id);
  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper elevation={6} className={classes.postContainer}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <img className={classes.media1} src={post.selectedFile || NoImage} alt={post.title} />
        </div>
        <div className={classes.section}>
          <Typography variant="h3" component="h2" className={classes.postTitle}>
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post?.tags?.split(",").map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} user={user} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || NoImage} alt={post.title} />
        </div>
      </div>
      {recommendedPosts?.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map((post) => (
              <div style={{ margin: "20px", cursor: "pointer" }} key={post.id}>
                <Post post={post} user={user} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
