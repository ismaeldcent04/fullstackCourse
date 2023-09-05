import React, { useState } from "react";

export const BlogForm = ({
  name,
  handleLogout,
  handleTitleInput,
  titleInput,
  handleAuthorInput,
  authorInput,
  handleUrlInput,
  urlInput,
  onAddNewBlog,
}) => {
  const [isShown, setIsShown] = useState(false);

  const handleShowform = () => {
    setIsShown(true);
  };

  const handleHideForm = () => {
    setIsShown(false);
  };

  const handleNewBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: titleInput,
      author: authorInput,
      url: urlInput,
    };
    onAddNewBlog(newBlog);
  };
  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {` ${name} is logged in `}
        <button onClick={handleLogout}>Logout</button>
      </p>
      {isShown && (
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
              <button type="submit">Create</button>
            </div>
            <div>
              <button onClick={handleHideForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {!isShown && <button onClick={handleShowform}>New Blog</button>}
    </div>
  );
};
