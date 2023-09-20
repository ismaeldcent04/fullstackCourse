import { useState } from "react";
import { useField } from "../hooks";

export const CreateNew = (props) => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.fields.value,
      author: author.fields.value,
      info: info.fields.value,
      votes: 0,
    });
  };
  const clearAllFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={clearAllFields}>
          reset
        </button>
      </form>
    </div>
  );
};
