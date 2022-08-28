import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../redux/actions/posts";

const CommentSection = ({ post, user }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post?.id));

    setComments(newComments);
    setComment("");

    commentsRef?.current?.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <div className={classes.commentList}>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong> {c.split(": ")[0]} </strong>
                {c.split(":")[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
        </div>

        {user?.result?.name && (
          <div className={classes.commentBox}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment.trim(" ")} variant="contained" color="primary" onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
