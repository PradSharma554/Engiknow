import mongoose from "mongoose";

const DocumentMetadataSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    integrationId: { type: mongoose.Schema.Types.ObjectId, ref: "Integration" },
    type: { type: String, required: true },
    title: { type: String, required: true },
    sourceUrl: { type: String },
    authorId: { type: String },
    contentHash: { type: String, required: true },
    content: { type: String },
    chunkIds: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("DocumentMetadata", DocumentMetadataSchema);
