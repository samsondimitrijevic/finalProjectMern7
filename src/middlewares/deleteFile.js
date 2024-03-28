const cloudinary = require("cloudinary");

// https://res.cloudinary.com/dfbtczn6c/image/upload/v1711641895/SamsonVideoGameStore/kmw8qvkup184jsffddbc.jpg

const deleteFile = (imgUrl) => {
  const urlSplit = imgUrl.split("/");
  const nameSplit = urlSplit.at(-1).split(".");
  const folderSplit = urlSplit.at(-2);
  const public_id = `${folderSplit}/${nameSplit[0]}`;

  cloudinary.v2.uploader.destroy(public_id, () => {
    console.log(`image deleted at ${public_id}`);
  });
};

module.exports = { deleteFile };
