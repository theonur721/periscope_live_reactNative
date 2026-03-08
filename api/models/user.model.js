import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Kullanıcı adı zorunlu"],
      unique: [true, "Bu kullanıcı adı zaten alınmış"],
    },
    name: {
      type: String,
      required: [true, "İsim zorunlu"],
    },
    password: {
      type: String,
      required: [true, "Şifre Zorunlu"],
    },
    image: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
    },
  },
  // oluşturulan tüm belgelere createdAt & updatedAt ekler
  {
    timestamps: true,
  }
);

export default model("Users", userSchema);
