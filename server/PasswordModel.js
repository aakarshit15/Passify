import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    name: String,
    password: String,
    tags: [String],
    user_id: String
});

const Password = mongoose.model("Password", passwordSchema);

export default Password;