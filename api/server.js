import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import AuthRouter from "./routes/auth.routes.js";
import LivekitRoutes from "./routes/livekit.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Bağlantısı Başarılı 🍀"))
  .catch((e) => console.log("MongoDB Bağlanamadı 🍁", e?.message));

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/control", (req, res) => {
  res.json("Server Çalışıyor");
});

// ✅ ROUTES
app.use("/api/auth", AuthRouter);
app.use("/api/livekit", LivekitRoutes);

// ✅ ERROR MIDDLEWARE (EN SON!)
app.use((err, req, res, next) => {
  console.log("😡 HATA MEYDANA GELDİ 😡");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz bir şeyler ters gitti";

  return res.status(errStatus).json({ message: errMessage });
});

app.listen(process.env.PORT, () => {
  console.log(`🏁 Server ${process.env.PORT} portunda çalışıyor 🏁`);
});
