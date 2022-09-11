import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const renderAfterCalled = useRef(false);
  const Navigate = useNavigate();

  const { verifyId } = useParams();

  const checkMail = async () => {
    await axios
      .get(`http://127.0.1:4000/api/verify/${verifyId}`)
      .then(() => {
        Navigate("/");
        toast.success("Your Email is Verified");
      })
      .catch(() => {
        Navigate("/");
        toast.error("Your Email is Already Verified");
      });
  };

  React.useEffect(() => {
    if (!renderAfterCalled.current) {
      checkMail();
    }

    renderAfterCalled.current = true;
  }, [verifyId]);

  return null;
};

export default VerifyEmail;
