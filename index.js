var parser = require('fast-xml-parser');
var fs = require('fs');


var data = fs.readFileSync("./test.xml", "utf8");

try {
    var jsonObj = parser.parse(data, {ignoreAttributes: false, stopNodes: ["string"]}, true);

    jsonObj.resources.string.forEach(stringElement => {
        console.log(stringElement);
        var shouldTranslate = stringElement['@_translatable'] === 'true';
        var item = `"${stringElement['@_name']}","${stringElement['#text'].trim()}", ${shouldTranslate}`;
        fs.appendFileSync('./output.csv', item+'\n');
    });

    console.log("DONE");
} catch (error) {
    console.log(error.message)
}

