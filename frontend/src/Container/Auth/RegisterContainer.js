"use client";

import { cloneElement, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRegisterMutation } from "@/Common/Queries/authQueries";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterContainer({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginSuccess } = useAuth();
  const router = useRouter();

  const mutation = useRegisterMutation({
    onSuccess: (data) => {
      handleLoginSuccess(data);
      toast.success("Registered successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, email, password });
  };

  const methods = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isSubmitting: mutation.isPending,
  };

  return cloneElement(children, { ...methods });
}
