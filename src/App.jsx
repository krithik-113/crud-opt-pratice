import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [updateButton, setUpdateButton] = useState(false);

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: "",
    age: "",
    email: "",
    phone: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleUpdateUser = () => {
    const { name, age, email, phone } = userInfo;
    if (name && age && email && phone) {
      if (/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
        userInfo.id = uuidv4();
        setUsers((prev) => [...prev, userInfo]);
        setUserInfo({ name: "", age: "", email: "", phone: "" });
        toast.success("Record Added");

        localStorage.setItem("users", JSON.stringify(users.reverse()));
      } else {
        toast.error('Invalid email')
      }
        
    } else {
      toast.warning("Fields can't be empty...!");
    }
  };

  const handleEdit = (user) => {
    setUpdateButton(true);
    setUserInfo(user);
  };
  const handleUpdation = () => {
    const user = users.map((val) => {
      if (val.id === userInfo.id) {
        return userInfo;
      }
      return val;
    });
    setUsers(user);
    localStorage.setItem("users", JSON.stringify(user));
    setUpdateButton(false);
    setUserInfo({ name: "", age: "", email: "", phone: "" });
    toast.success("Updated Successfully!");
  };

  const handleDelete = (id) => {
    const user = users.filter((item) => item.id !== id);
    setUsers(user);
    localStorage.setItem("users", JSON.stringify(user));
    toast.success("Deleted Successfully!");
  };
  const cancelUpdation = () => {
    setUserInfo({ name: "", age: "", email: "", phone: "" });
    setUpdateButton(false);
    toast.info("Update Cancel");
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="form">
        <input
          type="text"
          placeholder="Enter your name"
          value={userInfo.name}
          onChange={handleInputs}
          name="name"
        />
        <br />
        <input
          type="number"
          placeholder="Enter your age"
          value={userInfo.age}
          onChange={handleInputs}
          name="age"
        />
        <br />
        <input
          type="text"
          placeholder="Enter your email"
          value={userInfo.email}
          onChange={handleInputs}
          name="email"
        />
        <br />
        <input
          type="number"
          placeholder="Enter your phone no."
          value={userInfo.phone}
          onChange={handleInputs}
          name="phone"
        />
        <br />
        {updateButton ? (
          <div className="updation">
            <button onClick={handleUpdation}>Update</button>
            <button onClick={cancelUpdation}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleUpdateUser}>Add</button>
        )}
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone no.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className="buttons">
                  <button id="edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button id="delete" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
