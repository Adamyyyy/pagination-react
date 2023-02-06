import { useState, useEffect } from "react";
import axios from "axios";

import Pagination from "./components/Pagination/Pagination.component";
import Posts from "./components/Posts/Posts.component";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curretPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const fectchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const postsArr = res.data;
      setPosts(postsArr);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fectchPosts();
  }, []);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPostsSlice = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPostsSlice);
  }, [currentPage, posts]);

  const activePagesHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2 className="title">My Blog</h2>
      <Posts currentPosts={curretPosts} isLoading={isLoading} />
      <Pagination
        activePagesHandler={activePagesHandler}
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
