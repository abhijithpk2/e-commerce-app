import React, { useState } from "react";
import Layouts from "../../components/Layouts/Layouts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");


  const navigate = useNavigate();
 

  // Form functioning
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email, newPassword,answer });
      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };
  return (
    <Layouts title={"Register - ecommerce app"}>
      <div className="form-container mt">
        <h1 className="title text-center mt-4">Reset Password</h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="Enter your secret answer"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputNewPassword1"
              placeholder="Enter your new Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layouts>
  );
};

export default ForgotPassword;
