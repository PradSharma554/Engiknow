"use client";

import { cloneElement, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  useIngestTextMutation,
  useGetIngestions,
  useGetIngestionById,
} from "@/Common/Queries/ingestQueries";
import toast from "react-hot-toast";

export default function IngestContainer({ children }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [content, setContent] = useState("");
  const [activeIngestId, setActiveIngestId] = useState(null);

  const { data: ingestions = [], refetch: refetchIngestions } =
    useGetIngestions(user?._id, {
      enabled: !!user?._id,
    });

  const { data: activeIngestData, isFetching: isFetchingIngest } =
    useGetIngestionById(activeIngestId, {
      enabled: !!activeIngestId,
    });

  const mutation = useIngestTextMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Knowledge successfully ingested!");
      setTitle("");
      setSourceUrl("");
      setContent("");
      refetchIngestions();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to ingest data");
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || (!content && !sourceUrl)) {
      toast.error("Please fill in title and either content or source url");
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
    ingestions,
    activeIngestId,
    setActiveIngestId,
    activeIngestData,
    isFetchingIngest,
  };

  return cloneElement(children, { ...methods });
}
