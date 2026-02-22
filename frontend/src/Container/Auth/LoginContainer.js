"use client";

import { cloneElement, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoginMutation } from "@/Common/Queries/authQueries";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginContainer({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginSuccess } = useAuth(); // We'll update AuthContext to expose this
  const router = useRouter();

  const mutation = useLoginMutation({
    onSuccess: (data) => {
      handleLoginSuccess(data);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const methods = {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isSubmitting: mutation.isPending,
  };

  return cloneElement(children, { ...methods });
}
