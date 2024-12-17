import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  const [updateButton, setUpdateButton] = useState(false);
  const [id,setId]=useState('')

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: "",
    age: "",
    email: "",
    phone: "",
  });
  const getUsers = useCallback(async (msg = "") => {
     const { data } = await axios.get("/getUsers");
    if (data.success) {
      setUsers(data.users)
      if (msg) toast.success(msg);
    }
  },[])
  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleUpdateUser = async () => {
    const { name, age, email, phone } = userInfo;
    if (name && age && email && phone) {
      try {
        const { data } = await axios.post("addUser", userInfo);
        if (data.success) {
          setUserInfo({ name: "", age: "", email: "", phone: "" });
          toast.success(data.message);
          getUsers()
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.warning("Fields can't be empty...!");
    }
  };

  const handleEdit = (user) => {
    setUpdateButton(true);
    setUserInfo(user);
    setId(user._id)
  };
  const handleUpdation =async () => {
    try {
      const { data } = await axios.put(`/updateUser/${id}`, userInfo);
      if (data.success) {
        getUsers(data.message);
         setUpdateButton(false);
         setUserInfo({ name: "", age: "", email: "", phone: "" });
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err.message)
    }
    
   
  };

  const handleDelete = async (userid) => {
    const { data } = await axios.delete(`/delete/${userid}`)
    if (data.success) {
      getUsers()
      toast.success("Deleted Successfully!");
    }
    
  };
  const cancelUpdation = () => {
    setUserInfo({ name: "", age: "", email: "", phone: "" });
    setUpdateButton(false);
    toast.info("Update Cancel");
  };
  useEffect(() => {
  getUsers()
},[])
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
        <span>{userInfo.phone.toString().length}</span>
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
                  <button id="delete" onClick={() => handleDelete(item._id)}>
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
