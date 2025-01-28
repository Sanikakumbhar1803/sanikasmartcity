// Ensure the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
    initTrafficChart();
    setTimeout(initMap, 1000); // Delay map initialization to ensure Google Maps API is loaded
});

// Real-time Traffic Congestion Chart
function initTrafficChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    let trafficData = [20, 15, 30, 50, 70, 90, 80, 60];
    let trafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
            datasets: [{
                label: 'Traffic Congestion (%)',
                data: trafficData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Simulate real-time traffic updates
    setInterval(() => {
        trafficData.shift(); // Remove oldest data point
        trafficData.push(Math.floor(Math.random() * 100)); // Add new data point
        trafficChart.update();
    }, 5000); // Update every 5 seconds
}

// Google Maps Integration with Indian Landmarks
function initMap() {
    if (typeof google === 'undefined') {
        console.error("Google Maps API failed to load.");
        return;
    }

    const cityCenter = { lat: 20.5939, lng: 78.9629 }; // India Center
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5, // Adjusted for better country-wide view
        center: cityCenter
    });

    // Add a marker for the city center
    new google.maps.Marker({
        position: cityCenter,
        map: map,
        title: "India Center"
    });

    // Key landmarks in India
    const locations = [
        { lat: 28.6139, lng: 77.2090, title: "New Delhi - Capital" },
        { lat: 19.0760, lng: 72.8777, title: "Mumbai - Financial Hub" },
        { lat: 13.0827, lng: 80.2707, title: "Chennai - Coastal City" },
        { lat: 22.5726, lng: 88.3639, title: "Kolkata - Cultural Hub" },
        { lat: 12.9716, lng: 77.5946, title: "Bangalore - IT Hub" }
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title
        });
    });
}
