import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "500px",
    height: "500px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  media1: {
    borderRadius: "20px",
    objectFit: "cover",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "200px",
      display: "block",
    },
  },
  postContainer: {
    padding: "20px",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
    },
  },
  card: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px",
    },
    flex: 1,
    width: "100%",
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    width: "100%",
    gap: "16px",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    maxHeight: "200px",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "10px",
    },
  },
  commentBox: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  commentList: {
    overflowY: "auto",
    maxHeight: "170px",
  },
  postTitle: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
      marginTop: "10px",
      marginBottom: "10px",
    },
  },
}));
