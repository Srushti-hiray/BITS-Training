function fetchData(callback) {
    
    setTimeout(() => {
        
        const isServerError = Math.random() < 0.1;
        if (isServerError) {
            
            callback("Failed to fetch data", null);
        }
        else{
            const data = ["Alice", "Bob", "Charlie", "Diana"];
            callback(null, data);
        }
    }, 2000); 
}

function printdata(error, data)  {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data fetched successfully:", data);
    }
};

fetchData(printdata);

// Output:
//Error: Failed to fetch data   or
// Data fetched successfully: [ 'Alice', 'Bob', 'Charlie', 'Diana' ]