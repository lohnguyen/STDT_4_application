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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getNextIndex(numPumps, cur) {
    if (cur === numPumps - 1) return 0;
    return cur + 1;
}

/*
 * Complete the truckTour function below.
 */
function truckTour(petrolpumps) {
    let start = 0, cur = 0, gas = 0, count = 0;

    while (count !== petrolpumps.length) {
        gas += petrolpumps[cur][0];  // add gas at current pump
        gas -= petrolpumps[cur][1];  // subtract distance to next pump
        cur = getNextIndex(petrolpumps.length, cur);

        if (gas < 0) {
            start = cur;  // restart at next nump
            gas = 0;
            count = 0;
        } else {
            count += 1;
        }
    }

    return start;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let petrolpumps = Array(n);

    for (let petrolpumpsRowItr = 0; petrolpumpsRowItr < n; petrolpumpsRowItr++) {
        petrolpumps[petrolpumpsRowItr] = readLine().split(' ').map(petrolpumpsTemp => parseInt(petrolpumpsTemp, 10));
    }

    let result = truckTour(petrolpumps);

    ws.write(result + "\n");

    ws.end();
}
