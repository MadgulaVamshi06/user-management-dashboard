import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const LoadDetail = (id) => {
    navigate("/users/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/users/update/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Removed successfully.");
            setUsers(users.filter((user) => user.id !== id));
          } else {
            throw new Error("Failed to remove the user");
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-title text-center p-3">
          <h2>Users List</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/users/create" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
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
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                    <td>
                      <button
                        onClick={() => LoadEdit(user.id)}
                        className="btn btn-success me-2 mb-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => LoadDetail(user.id)}
                        className="btn btn-primary me-2 mb-2"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => Removefunction(user.id)}
                        className="btn btn-danger mb-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ${
                  currentPage === index + 1 ? "btn-primary" : "btn-light"
                } me-2`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
