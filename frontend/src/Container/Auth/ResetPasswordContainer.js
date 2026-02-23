"use client";

import { cloneElement, useState, use } from "react";
import { useResetPasswordMutation } from "@/Common/Queries/authQueries";
import toast from "react-hot-toast";

export default function ResetPasswordContainer({ children, params }) {
  const { resettoken } = use(params);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useResetPasswordMutation({
    onSuccess: (data) => {
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      setErrorMsg("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to reset password");
      setErrorMsg(error.response?.data?.message || "Failed to reset password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");
    mutation.mutate({ resetToken: resettoken, password });
  };

  const methods = {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    isSubmitting: mutation.isPending,
    isSuccess,
    errorMsg,
  };

  return cloneElement(children, { ...methods });
}
