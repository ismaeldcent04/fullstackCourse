import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { BlogList } from "./components/BlogList";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userinput, setuserinput] = useState("");
  const [passwordinput, setpasswordinput] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => a.likes - b.likes));
    });
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
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
      setLoggedUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedUser(null);
  };

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value);
  };
  const handleAuthorInput = (e) => {
    setAuthorInput(e.target.value);
  };
  const handleUrlInput = (e) => {
    setUrlInput(e.target.value);
  };

  const onAddNewBlog = async (newNote) => {
    try {
      const newBlog = await blogService
        .create({
          ...newNote,
        })
        .then((blog) => {
          setBlogs(blogs.concat(blog));
        });
      console.log(newBlog);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!loggedUser && (
        <LoginForm
          onLogin={onLogin}
          handleUserInput={handleUserInput}
          userinput={userinput}
          passwordinput={passwordinput}
          handlePasswordInput={handlePasswordInput}
        />
      )}
      {loggedUser && (
        <div>
          <BlogForm
            name={loggedUser.name}
            blogs={blogs}
            titleInput={titleInput}
            authorInput={authorInput}
            urlInput={urlInput}
            handleTitleInput={handleTitleInput}
            handleAuthorInput={handleAuthorInput}
            handleUrlInput={handleUrlInput}
            onAddNewBlog={onAddNewBlog}
            handleLogout={handleLogout}
          />
          <BlogList LoggedUser={loggedUser.name} blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
