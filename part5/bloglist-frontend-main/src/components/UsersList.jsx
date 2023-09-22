import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { Link, useParams } from "react-router-dom";

export const UsersList = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Username</th>
          <th>Blogs created</th>
        </tr>

        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
