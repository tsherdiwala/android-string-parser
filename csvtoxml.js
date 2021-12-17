var fs = require('fs');

var data = fs.readFileSync("./bahasa.csv", "utf8").trim();

console.log(data);


var rows = data.split("\n")

var output = './output.xml';

fs.appendFileSync(output, "<resources>");
rows.forEach(row => {

    var columns = row.split(/,(.*)/);
    var key = columns[0].replace(/\"/g, "");
    var value = columns[1].replace(/^"(.+(?="$))"$/, '$1');
    var item = `<string name="${key}">${value}</string>`
    fs.appendFileSync(output, item+'\n');

});
fs.appendFileSync(output, "</resources>");
