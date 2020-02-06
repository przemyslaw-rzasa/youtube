export const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp4|avi)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
