import mongoose from "mongoose";

const IntegrationSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    provider: {
      type: String,
      enum: ["slack", "github", "notion", "jira", "gdrive"],
      required: true,
    },
    accessToken: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "failed", "syncing"],
      default: "active",
    },
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export default mongoose.model("Integration", IntegrationSchema);
