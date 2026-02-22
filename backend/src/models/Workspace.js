import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    settings: {
      defaultRole: { type: String, default: "member" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Workspace", WorkspaceSchema);
