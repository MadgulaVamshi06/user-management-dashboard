import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/users/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/users/update/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        if (res.ok) {
          alert('Removed successfully.');
          setUsers(users.filter(user => user.id !== id));
        } else {
          throw new Error('Failed to remove the user');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  };
  

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((resp) => {
        setUsers(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title text-center">
          <h2>Users List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to='/users/create' className='btn btn-success'>Add New +</Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <a onClick={() => { LoadEdit(user.id) }} className="btn btn-success">Edit</a>
                    <a onClick={() => { LoadDetail(user.id) }} className="btn btn-success">Details</a>
                    <a onClick={() => { Removefunction(user.id) }} className="btn btn-danger">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
