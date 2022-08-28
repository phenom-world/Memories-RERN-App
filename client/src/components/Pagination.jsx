import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts, getPostsBySearch } from "../redux/actions/posts";

import useStyles from "./styles";

const Paginate = ({ page, tags, search }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page && (search || tags.length > 0)) {
      dispatch(getPostsBySearch({ search, tags: tags.join(","), page }));
    } else {
      dispatch(getPosts(page));
    }
  }, [dispatch, page, search, tags]);

  if (search || tags.length > 0) {
    return (
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",") || "none"}&page=${item.page}`}
          />
        )}
      />
    );
  }
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts/?page=${item.page}`} />}
    />
  );
};

export default Paginate;
