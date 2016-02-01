var fs = require("fs");
var path = require("path");
var readLine = require("readline");

var toc = [];
var jsonWriter = fs.createWriteStream("toc.json");
var texWriter = fs.createWriteStream("pdf/toc.tex");

var lineReader = readLine.createInterface({
    input: fs.createReadStream("markdown/all.markdown")
});

var distil = function(line) {
    return line.replace("@include ", "");
};

lineReader.on("line", function(line) {
    toc.push(distil(line));
});

lineReader.on("close", function() {
    jsonWriter.write(JSON.stringify(toc, null, 2));

    var line = "";
    toc.forEach(function(elt, i) {
        line = `\\include{sections_tex/${elt}}\n`;
        texWriter.write(line);
    });
});
