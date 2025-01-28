import React, { useState, useEffect } from "react";

const EmergencyAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    // Simulate fetching emergency alerts from an API
    useEffect(() => {
        const fetchAlerts = () => {
            const sampleAlerts = [
                { id: 1, type: "Weather", message: "Severe thunderstorm warning issued." },
                { id: 2, type: "Traffic", message: "Major accident on Highway 101, expect delays." },
                { id: 3, type: "Power", message: "City-wide power outage expected from 8 PM - 10 PM." },
            ];

            // Only set the state if the alerts are different
            setAlerts((prevAlerts) => {
                // Compare with previous alerts to avoid unnecessary updates
                if (JSON.stringify(prevAlerts) !== JSON.stringify(sampleAlerts)) {
                    return sampleAlerts;
                }
                return prevAlerts;
            });
        };

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 15000); // Fetch new alerts every 15 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-red-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-4">🚨 Emergency Alerts</h2>
            {alerts.length === 0 ? (
                <p className="text-gray-700">No active emergency alerts.</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id} className="bg-white p-3 my-2 rounded-lg shadow-md">
                            <span className="font-semibold">{alert.type} Alert: </span>
                            {alert.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmergencyAlerts;
