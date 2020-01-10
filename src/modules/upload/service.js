function Service({ /* authClient, */ pump, fs }) {
  function writeFile(field, file, filename) {
    pump(file, fs.createWriteStream(`${__dirname}/s3-assets/${filename}`), (err) => {
      if (err) {
        console.log(err);
      }
      return true;
    });
  }

  function onEnd(err) {
    if (!err) {
      return true;
    }
    return false;
  }
  return {
    writeFile,
    onEnd,
  };
}

module.exports = Service;
