const jdenticon = require("jdenticon");
const fs = require("fs");

const size = 200;
// const value = "test"

const generateIcon = (value) => {
    const png = jdenticon.toPng(value, size);
    fs.writeFileSync(`./public/assets/img/${value}.png`, png)
};

module.exports = generateIcon;