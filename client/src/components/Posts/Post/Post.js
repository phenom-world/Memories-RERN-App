import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";
import NoImage from "../../../images/noimage.jpg";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { SETCURRENTID } from "../../../redux/constants/actionTypes";

const Post = ({ post, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [likes, setLikes] = useState(post?.likes || []);

  const userId = user?.result?.googleId || user?.result?.id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleClick = () => {
    dispatch(likePost(post.id));
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2 ? `You and ${likes?.length - 1} others` : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history(`/posts/${post.id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post?.selectedFile || NoImage} title={post?.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {user?.result?.googleId === post?.creator || user?.result?.id === post?.creator ? (
          <Button style={{ color: "white" }} size="small" onClick={() => dispatch({ type: SETCURRENTID, payload: post.id })}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        ) : null}
      </div>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.tags && post?.tags.split(",").map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent style={{ marginTop: "-18px" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.message.slice(0, 100) + `${post?.message.length > 100 && "..."}`}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleClick}>
          <Likes />
        </Button>
        {user?.result?.googleId === post?.creator || user?.result?.id === post?.creator ? (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post.id))}>
            <DeleteIcon fontSize="small" /> &nbsp;Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
