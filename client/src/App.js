import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { ToastContainer } from "react-toastify";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home user={user} />} />
          <Route path="/posts/search" element={<Home user={user} />} />
          <Route path="/posts/:id" exact element={<PostDetails user={user} />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
        </Routes>
        <ToastContainer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
