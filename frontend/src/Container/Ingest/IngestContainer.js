"use client";

import { cloneElement, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useIngestTextMutation } from "@/Common/Queries/ingestQueries";
import toast from "react-hot-toast";

export default function IngestContainer({ children }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [content, setContent] = useState("");

  const mutation = useIngestTextMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Knowledge successfully ingested!");
      setTitle("");
      setSourceUrl("");
      setContent("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to ingest data");
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in title and content");
      return;
    }

    mutation.mutate({
      title,
      text: content,
      type: "manual_upload",
      sourceUrl,
      workspaceId: user._id,
    });
  };

  const methods = {
    title,
    setTitle,
    sourceUrl,
    setSourceUrl,
    content,
    setContent,
    handleSubmit,
    isSubmitting: mutation.isPending,
  };

  return cloneElement(children, { ...methods });
}
