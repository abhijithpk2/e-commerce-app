import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

//   get user data
useEffect(() => {
  const { email, name, phone, address } = auth?.user;
  setName(name);
  setEmail(email);
  setPhone(phone);
  setAddress(address);
}, [auth?.user]);

  // Form functioning
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        // ls=local storage
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth");
        ls= JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("profile updated successfully");
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Layouts title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container mt">
              <h1 className="title text-center mt-4">User Profile</h1>
              <form onSubmit={handleSumbit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Enter your name"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter your Email"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Password"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone1"
                    placeholder="Enter your Phone"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress1"
                    placeholder="Enter your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default Profile