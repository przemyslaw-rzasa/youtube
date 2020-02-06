import * as uuid from "uuid";

export const editFileName = (req, file, callback) => {
  const arrayOriginalName = file.originalname.split(".");
  const ext = arrayOriginalName.pop();
  const unique = uuid().replace(/-/g, "");

  const filename = `${arrayOriginalName.join("_")}_${unique}.${ext}`;

  callback(null, filename);
};
