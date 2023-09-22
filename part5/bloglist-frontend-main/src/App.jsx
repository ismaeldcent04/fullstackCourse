import { useState, useEffect } from "react";
import blogService from "./services/blogServices";
import loginService from "./services/login";
import { BlogList } from "./components/BlogList";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, setBlogs } from "./reducers/blogReducer";
import { setLoggedUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UsersList } from "./components/UsersList";
import { User } from "./components/User";
import { BlogView } from "./components/BlogView";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  const [userinput, setuserinput] = useState("");
  const [passwordinput, setpasswordinput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // setLoggedUser(user);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, [blogs]);

  const handleUserInput = (e) => {
    setuserinput(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setpasswordinput(e.target.value);
  };

  const onLogin = async (credentials) => {
    try {
      const user = await loginService.login({
        ...credentials,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setLoggedUser(null));
  };

  return (
    <div>
      <h2>Blogs</h2>
      {loggedUser ? (
        <p>
          <Link to={"/users"}>users </Link> <Link to={"/"}>blogs</Link>
          {` ${loggedUser.name} is logged in `}
          <button onClick={handleLogout}>Logout</button>
        </p>
      ) : (
        <LoginForm
          onLogin={onLogin}
          handleUserInput={handleUserInput}
          userinput={userinput}
          passwordinput={passwordinput}
          handlePasswordInput={handlePasswordInput}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {loggedUser && (
                <div>
                  <BlogForm />
                  <BlogList LoggedUser={loggedUser.name} blogs={blogs} />
                </div>
              )}
            </div>
          }
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  );
};

export default App;
