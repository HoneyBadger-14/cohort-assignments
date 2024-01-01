console.log("Started the execution!")

function counter(limit) {
    for(let i = 0; i < limit; i += 1) {
        setTimeout(() => console.log(i), 1000);
    }
}

// counter(5);

let fs = require('fs');

let fileName = './week-2/01-async-js/easy/1-counter.md';
let fileData = '';
function readFile() {
    fs.readFile(fileName, 'utf-8', function(err, data) {
        if(err) throw err;
        console.log(data);
        fileData = data;
        // console.log(fileData);
    });
}

function writeToFile() {
    setTimeout(() => {
        fs.writeFile(fileName, fileData + "Updated by Puneet!", (err) => {
            if (err) throw err;
        });
    }, 5000);
}

readFile();
writeToFile();
// setTimeout(() => writeToFile(), 5000);
console.log('Printing the updated data from file');
readFile();