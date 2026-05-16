const express = require("express");
const router = express.Router();
const {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumsById,
} = require("../controllers/music.controller");
const multer = require("multer");
const { authArtist, authUser } = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);
router.get("/", authUser, getAllMusics);
router.get("/albums", authUser, getAllAlbums);
router.get("/albums/:albumId", authUser, getAlbumsById);

module.exports = router;
