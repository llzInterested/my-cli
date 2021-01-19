module.exports = (sourceCode) => {
  console.log("自己的loader3调用了");
  return sourceCode;
};

// loader上的pitch方法，非必须
module.exports.pitch = function () {
  console.log("pitching3 graph");
  // todo
};
