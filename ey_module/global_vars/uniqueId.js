let uniqueId = function() {
  // let str = Math.floor(Math.random() * 10000) + 1000;
  let str = Math.random()
    .toString()
    .substr(2, 5);

  return str;
};

module.exports = uniqueId;
