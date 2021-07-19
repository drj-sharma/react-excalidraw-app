const { getImagesNames } = require('./getImagesNames');

const getAllImagesLink = async (req, res) => {
  const t = await getImagesNames();
  const links = [];
  t.forEach((fileName) => {
    const link = `${process.env.ServerUrl}/excalidraw/get-image/${fileName}`;
    links.push(link);
  });
  res.send(links);
};

module.exports.getAllImagesLink = getAllImagesLink;
