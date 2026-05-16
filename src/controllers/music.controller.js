const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created sucessfully!",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;
  const album = await albumModel.create({
    title,
    musics,
    artist: req.user.id,
  });
  res.status(201).json({
    message: "Album Created ",
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel.find();
  res.status(200).json({
    message: "Music fetched Sucessfully!",
    musics,
  });
}

async function getAllAlbums(req, res) {
  const musics = await albumModel
    .find()
    .populate("artist", "username email")
    .populate("musics");
  res.status(200).json({
    message: "Music fetched Sucessfully!",
    musics,
  });
}
async function getAlbumsById(req, res) {
  const albumId = req.params.albumId;
  const musics = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");
  res.status(200).json({
    message: "Music fetched Sucessfully!",
    musics,
  });
}
module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumsById,
};
