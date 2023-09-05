import React, { useState } from "react";

export const LoginForm = ({
  onLogin,
  userinput,
  handleUserInput,
  passwordinput,
  handlePasswordInput,
}) => {
  const [isShown, setIsShown] = useState(false);

  const handleShowForm = () => {
    setIsShown(true);
  };

  const handleHideForm = () => {
    setIsShown(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      username: userinput,
      password: passwordinput,
    };

    onLogin(credentials);
  };
  return (
    <div>
      {isShown && (
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
            <div>
              <button type="submit">Login</button>
            </div>
            <div>
              <button onClick={handleHideForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {!isShown && <button onClick={handleShowForm}>Login in</button>}
    </div>
  );
};
