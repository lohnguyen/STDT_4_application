'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the balancedSums function below.
function balancedSums(arr) {
    let leftSum = 0, rightSum = 0;

    if (arr.length === 1) return 'YES';

    for (let i = 1; i < arr.length; i++) rightSum += arr[i];

    for (let i = 0; i < arr.length; i++) {
        if (leftSum === rightSum) return 'YES';

        leftSum += arr[i];
        if (i + 1 < arr.length) rightSum -= arr[i + 1];  // check upper bound
    }

    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}

