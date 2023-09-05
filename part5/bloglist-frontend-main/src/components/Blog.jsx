import { useState } from "react";
import blogService from "../services/blogs";

export const Blog = ({ blog, LoggedUser }) => {
  const [isShown, setIsShown] = useState(false);
  const handleShowBlogDetails = () => {
    setIsShown(true);
  };
  const handleHideBlogDetails = () => {
    setIsShown(false);
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      console.log(updatedBlog);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBlog = async () => {
    try {
      window.confirm(`Are you sure you want to delete this blog?`)
        ? await blogService.remove(blog.id)
        : alert("Good choice, everyone is important");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <fieldset>
        {!isShown && (
          <div>
            {blog.title} {blog.author}{" "}
            <button onClick={handleShowBlogDetails}>View</button>
          </div>
        )}
        {isShown && (
          <div>
            <h3>
              {blog.title} <button onClick={handleHideBlogDetails}>Hide</button>
            </h3>
            <h3>{blog.url}</h3>
            <h3>
              {Number(blog.likes)} <button onClick={handleLike}>like</button>
            </h3>
            <h3>{blog.user.name}</h3>

            {LoggedUser === blog.user.name ? (
              <button onClick={handleRemoveBlog}>remove</button>
            ) : (
              ""
            )}
          </div>
        )}
      </fieldset>
    </div>
  );
};
