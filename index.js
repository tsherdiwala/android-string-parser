var parser = require('fast-xml-parser');
var fs = require('fs');


var data = fs.readFileSync("./strings-en.xml", "utf8");

let text = '<resources><string translatable="false" name="abc">Hello</string><string name="def">World</string></resources>';
try {
    var jsonObj = parser.parse(data, {ignoreAttributes: false, stopNodes: ["string"]}, true);

    jsonObj.resources.string.forEach(stringElement => {
        console.log(stringElement);
        var item = `"${stringElement['@_name']}","${stringElement['#text'].trim()}"`
        fs.appendFileSync('./output.csv', item+'\n');
    });

    console.log("DONE");
} catch (error) {
    console.log(error.message)
}

