let leakyArray = [];

function addData() {
    for (let i = 0; i < 10000; i++) {
        leakyArray.push(new Array(1000).join("leak"));
    }
    console.log("Data added. Array size:", leakyArray.length);
}

function cleanup() {
    if (leakyArray.length > 100000) {
        leakyArray = [];
        console.log("Cleanup performed. Array cleared.");
    }
}

function logMemoryUsage() {
    if (performance.memory) {
        const usedMB = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        console.log(`Memory usage: ${usedMB} MB`);
    } else {
        console.log("performance.memory is not available.");
    }
}

setInterval(addData, 1000);
setInterval(cleanup, 10000);
setInterval(logMemoryUsage, 5000);