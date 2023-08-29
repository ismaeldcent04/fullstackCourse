import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { BlogList } from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userinput, setuserinput] = useState("");
  const [passwordinput, setpasswordinput] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [likeInput, setLikeInput] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUserInput = (e) => {
    setuserinput(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setpasswordinput(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: userinput,
        password: passwordinput,
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
  const handleLikesInput = (e) => {
    setLikeInput(e.target.value);
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService
        .create({
          title: titleInput,
          author: authorInput,
          url: urlInput,
          likes: likeInput,
        })
        .then((blog) => {
          setBlogs(blogs.concat(blog));
        });
    } catch (error) {
      console.log(newBlog);
    }
  };
  return (
    <div>
      {!loggedUser && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username:
              <input
                type="text"
                name="Username"
                value={userinput}
                onChange={handleUserInput}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="Password"
                value={passwordinput}
                onChange={handlePasswordInput}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {loggedUser && (
        <div>
          <h2>Blogs</h2>
          <p>
            {` ${loggedUser.name} is logged in `}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <div>
            <h3>Create new</h3>
            <form onSubmit={handleNewBlog}>
              <div>
                Title:
                <input
                  type="text"
                  name="Title"
                  onChange={handleTitleInput}
                  value={titleInput}
                />
              </div>
              <div>
                Author:
                <input
                  type="text"
                  name="Author"
                  onChange={handleAuthorInput}
                  value={authorInput}
                />
              </div>
              <div>
                Url:
                <input
                  type="text"
                  name="Url"
                  onChange={handleUrlInput}
                  value={urlInput}
                />
              </div>
              <div>
                Likes:
                <input
                  type="number"
                  name="Likes"
                  onChange={handleLikesInput}
                  value={likeInput}
                />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>

          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
