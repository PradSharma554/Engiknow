import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "ai"], required: true },
    content: { type: String, required: true },
    sources: [
      {
        score: Number,
        documentId: String,
        sourceText: String,
      },
    ],
  },
  { _id: false },
);

const ChatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    title: { type: String, default: "New Chat" },
    messages: [MessageSchema],
  },
  { timestamps: true },
);

export default mongoose.model("ChatSession", ChatSessionSchema);
