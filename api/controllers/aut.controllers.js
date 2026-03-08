import bcrypt from "bcrypt";
import Users from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res, next) => {
  try {
    // Şifre hashleme saltlama işlemi
    const hashedpassword = bcrypt.hashSync(req.body.password, 12);

    // Kullanıcıyı veritabanına kaydetme işlemi
    const newUser = await Users.create({
      ...req.body,
      password: hashedpassword,
    });

    // şifreyi yanıt olarak göndermeme
    newUser.password = undefined;
    console.log(newUser);

    // Client'a başarılı yanıt gönderme
    res.status(200).json({ message: "Kayıt başarılı", user: newUser });
  } catch (error) {
    next(error(500, err.message || err));
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    // kullanıcı adına göre kullanıcıyı ara, bulunamazsa hata döndür
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return next(error(404, "Kullanıcı bulunamadı"));

    // şifreyi doğrula, yanlışsa hata döndür
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(error(400, "Kullanıcı adı veya şifre yanlış"));

    // jwt token oluştur
    const scopetoken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );

    // şifreyi yanıt olarak göndermeme
    user.password = undefined;

    // Clienta başarılı giriş yanıtı gönder
    res
      .cookie("scopetoken", scopetoken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Giriş başarılı", user, token: scopetoken });
    console.log("TOKENNN", scopetoken);
  } catch (err) {
    next(error(500, err.message || err));
  }
};

// Logout
export const logout = (req, res, next) => {
  res.clearCookie("scopetoken").status(200).json({ message: "Çıkış başarılı" });
};

// Delete Account
export const deleteAccount = async (req, res, next) => {
  try {
    // Id'sine göre kullanıcıyı sil
    await Users.findByIdAndDelete(req.user.id);

    res.status(200).json({ message: "Hesap silindi" });
  } catch (err) {
    next(error(500, err.message || err));
  }
};

// Token User sorgusu için
export const me = async (req, res, next) => {
  try {
    const userId = req.user?.id; // verifytoken set ediyor
    if (!userId) return next(error(401, "Token hatalı"));

    const user = await Users.findById(userId);
    if (!user) return next(error(404, "Kullanıcı bulunamadı"));

    user.password = undefined;

    return res.status(200).json({ user });
  } catch (err) {
    next(error(500, err));
  }
};
