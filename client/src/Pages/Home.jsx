import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const [userData, setuserData] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("update/" + id);
    }

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        return res.json();
      })
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
            <Link to='/create'  className='btn btn-success'>Add New +</Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.lastname}</td>
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td>{user.company}</td>
                  <td>
                    <a onClick={() => { LoadEdit(user.id) }} className="btn btn-success">Edit</a>
                    <a onClick={() => { LoadDetail(user.id) }}  className="btn btn-success">Details</a>
                    <a onClick={() => { Removefunction(user.id) }}  className="btn btn-danger">Remove</a>
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
