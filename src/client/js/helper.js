// Function to calculate the difference in days between two dates
function getDifferenceInDays(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(d2 - d1);

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

function getCurrentDate(){
    // Create a Date object for the current date
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export { 
    getDifferenceInDays,
    getCurrentDate
 };