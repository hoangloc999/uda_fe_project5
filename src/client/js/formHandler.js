// Make sure get form after DOM load completely

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('travel-form');
    form.addEventListener('submit', handleSubmit);

    // User cannot select past
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
})

function handleSubmit(event) {
    event.preventDefault();
    alert('Submit success')

    // get input
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    console.log(location)
    console.log(date)
    console.log(resultDiv)
    // Call API to my server

    // Display response result
}

export { handleSubmit };