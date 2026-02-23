"use client";

import { cloneElement, useState } from "react";
import { useForgotPasswordMutation } from "@/Common/Queries/authQueries";
import toast from "react-hot-toast";

export default function ForgotPasswordContainer({ children }) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useForgotPasswordMutation({
    onSuccess: (data) => {
      setIsSuccess(true);
      toast.success("Reset link sent!");
      setEmail("");
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        setIsSuccess(true);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to send reset link",
        );
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    mutation.mutate(email);
  };

  const methods = {
    email,
    setEmail,
    handleSubmit,
    isSubmitting: mutation.isPending,
    isSuccess,
  };

  return cloneElement(children, { ...methods });
}
