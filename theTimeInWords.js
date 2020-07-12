'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function convertMin(m, words) {
    if (m <= 20) return words[m];
    if (m === 30) return 'half';
    return 'twenty ' + words[m % 10];
}

function getMinUnit(m) {
    if (m === 15 || m === 30) return ' ';
    if (m === 1) return ' minute ';
    return ' minutes ';
}

// Complete the timeInWords function below.
function timeInWords(h, m) {
    const words = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
        'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'quarter', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

    if (!m) return words[h] + " o' clock";
    if (m <= 30) return convertMin(m, words) + getMinUnit(m) + 'past ' + words[h];
    return convertMin(60 - m, words) + getMinUnit(60 - m) + 'to ' + words[h + 1];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const num = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(num, m);

    ws.write(result + "\n");

    ws.end();
}

