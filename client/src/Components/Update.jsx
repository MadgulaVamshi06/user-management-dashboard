import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { userid } = useParams();
  const navigate = useNavigate();

 
  const [updatedUserId, setUpdatedUserId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedCompanyName, setUpdatedCompanyName] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  
  useEffect(() => {
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userid}`)
      .then((res) => res.json())
      .then((resp) => {
        setUpdatedUserId(resp.id);
        setUpdatedName(resp.name);
        setUpdatedUserName(resp.name);
        setUpdatedEmail(resp.email);
        setUpdatedCompanyName(resp.company.name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedUserId,
      lastname: updatedName,
      firstname: updatedUserName,
      email: updatedEmail,
      company: updatedCompanyName,
    };

    
    fetch(`https://jsonplaceholder.typicode.com/users/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert('Saved successfully.');
          navigate('/');
        } else {
          throw new Error('Failed to update the user');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2> Update User</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        type="number"
                        value={updatedUserId}
                        onChange={(e) => setUpdatedUserId(e.target.value)} 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Name</label>
                      <input
                        required
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>User Name</label>
                      <input
                        required
                        value={updatedUserName}
                        onChange={(e) => setUpdatedUserName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={updatedEmail}
                        onChange={(e) => {
                          setUpdatedEmail(e.target.value);
                          setEmailValidationError(""); 
                        }}
                        className="form-control"
                      />
                      {emailValidationError && (
                        <span className="text-danger">{emailValidationError}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        value={updatedCompanyName}
                        onChange={(e) => setUpdatedCompanyName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
