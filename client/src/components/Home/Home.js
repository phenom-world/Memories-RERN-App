import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPostsBySearch } from "../../redux/actions/posts";
import useStyles from "./styles";
import Pagination from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { useDispatch, useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ user }) => {
  const { currentId } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const tag = query.get("tags") || "";
  const searchQuery = query.get("searchQuery") || "";
  const [search, setSearch] = useState(searchQuery);
  const [tags, setTags] = useState(tag ? tag.split(",") : []);
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(","), page }));
      history(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",") || "none"}&page=${page}`);
    } else {
      history("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts user={user} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags.length > 0 ? tags : []}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} user={user} />
            <Paper elevation={6} className={classes.pagination}>
              <Pagination page={page} search={search} tags={tags} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
