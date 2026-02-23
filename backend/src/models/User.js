import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
