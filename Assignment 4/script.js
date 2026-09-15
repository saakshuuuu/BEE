let seatsAvailable = true;

document.getElementById("bookBtn").addEventListener("click", () => {

    document.getElementById("status").textContent = "Booking in progress...";

    let booking = new Promise((resolve, reject) => {

        setTimeout(() => {

            if (seatsAvailable) {
                resolve("Seat is available");
            } else {
                reject("No Seats Available");
            }

        }, 1000);
    });

    booking
        .then((result) => {
            console.log("1. Check Seat Availability:", result);
            document.getElementById("status").textContent = result;
            return "Payment processed successfully";
        })

        .then((result) => {
            console.log("2. Process Payment:", result);
            document.getElementById("status").textContent = result;
            return "Booking confirmed successfully";
        })

        .then((result) => {
            console.log("3. Confirm Booking:", result);
            document.getElementById("status").textContent = result;
            return "Ticket generated successfully";
        })

        .then((result) => {
            console.log("4. Generate Ticket:", result);
            document.getElementById("status").textContent = result;
        })

        .catch((error) => {
            console.log("Booking Failed:", error);
            document.getElementById("status").textContent = "Booking Failed: " + error;
        });
});
