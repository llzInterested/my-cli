const loaderUtils = require("loader-utils");
// module.exports = (source) => {};

module.exports.pitch = (remainingRequest, precedingRequest, data) => {
  console.log("loader======", remainingRequest, precedingRequest, data);
  console.log(
    "路径",
    require(loaderUtils.stringifyRequest(this, "!!" + remainingRequest))
  );
  return `const styleDom = document.createElement('style')
  styleDom.innerHTML = require(${loaderUtils.stringifyRequest(
    this,
    "!!" + remainingRequest
  )})

  document.head.append(styleDom)`;
};
