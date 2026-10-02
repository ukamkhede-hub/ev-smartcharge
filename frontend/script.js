// ==========================================
// EV SMARTCHARGE
// FRONTEND VERSION
// ==========================================


// ==========================================
// DEMO CHARGING STATIONS
// ==========================================

const chargingStations = [

    {
        id: 1,
        name: "Tata Power EV Charging",
        city: "Nagpur",
        state: "Maharashtra",
        address: "Wardha Road, Nagpur",
        lat: 21.1458,
        lng: 79.0882,
        distance: 2.4,
        status: "Operational",
        chargers: ["AC", "DC", "Fast"]
    },

    {
        id: 2,
        name: "Statiq EV Station",
        city: "Nagpur",
        state: "Maharashtra",
        address: "Sadar, Nagpur",
        lat: 21.1539,
        lng: 79.0808,
        distance: 4.1,
        status: "Operational",
        chargers: ["DC", "Fast"]
    },

    {
        id: 3,
        name: "ChargeZone Station",
        city: "Nagpur",
        state: "Maharashtra",
        address: "Manish Nagar, Nagpur",
        lat: 21.1177,
        lng: 79.0787,
        distance: 6.2,
        status: "Operational",
        chargers: ["AC", "DC"]
    },

    {
        id: 4,
        name: "Tata Power EV Station",
        city: "Pune",
        state: "Maharashtra",
        address: "Baner, Pune",
        lat: 18.5590,
        lng: 73.7868,
        distance: 8.5,
        status: "Operational",
        chargers: ["AC", "DC", "Fast"]
    },

    {
        id: 5,
        name: "Ather Grid",
        city: "Mumbai",
        state: "Maharashtra",
        address: "Andheri, Mumbai",
        lat: 19.1197,
        lng: 72.8468,
        distance: 5.8,
        status: "Operational",
        chargers: ["AC", "Fast"]
    },

    {
        id: 6,
        name: "ChargePoint India",
        city: "Delhi",
        state: "Delhi",
        address: "Connaught Place, New Delhi",
        lat: 28.6315,
        lng: 77.2167,
        distance: 7.3,
        status: "Operational",
        chargers: ["AC", "DC", "Fast"]
    },

    {
        id: 7,
        name: "Tata Power EV Station",
        city: "Bengaluru",
        state: "Karnataka",
        address: "Whitefield, Bengaluru",
        lat: 12.9698,
        lng: 77.7500,
        distance: 9.1,
        status: "Operational",
        chargers: ["DC", "Fast"]
    },

    {
        id: 8,
        name: "Statiq Charging Hub",
        city: "Hyderabad",
        state: "Telangana",
        address: "Hitech City, Hyderabad",
        lat: 17.4435,
        lng: 78.3772,
        distance: 6.7,
        status: "Operational",
        chargers: ["AC", "DC", "Fast"]
    },

    {
        id: 9,
        name: "ChargeZone EV Hub",
        city: "Ahmedabad",
        state: "Gujarat",
        address: "SG Highway, Ahmedabad",
        lat: 23.0395,
        lng: 72.5110,
        distance: 11.2,
        status: "Operational",
        chargers: ["DC", "Fast"]
    },

    {
        id: 10,
        name: "Tata Power Charging Hub",
        city: "Chennai",
        state: "Tamil Nadu",
        address: "OMR, Chennai",
        lat: 12.9352,
        lng: 80.2300,
        distance: 13.4,
        status: "Operational",
        chargers: ["AC", "DC"]
    }

];


// ==========================================
// MAP VARIABLES
// ==========================================

let evMap;

let mapMarkers = [];

let currentLatitude = 21.1458;

let currentLongitude = 79.0882;


// ==========================================
// INITIALIZE MAP
// ==========================================

function initializeMap() {

    evMap = L.map("evMap").setView(
        [currentLatitude, currentLongitude],
        5
    );


    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(evMap);


    loadStations();

}


// ==========================================
// LOAD STATIONS
// ==========================================

function loadStations() {

    const search =
        document
            .getElementById("stationSearch")
            .value
            .toLowerCase()
            .trim();


    const distance =
        Number(
            document
                .getElementById("distanceFilter")
                .value
        );


    const charger =
        document
            .getElementById("chargerFilter")
            .value;


    const status =
        document
            .getElementById("statusFilter")
            .value;


    let filtered =
        chargingStations.filter(
            station => {


                // Search

                const searchable =
                    (
                        station.name +
                        " " +
                        station.city +
                        " " +
                        station.state +
                        " " +
                        station.address
                    ).toLowerCase();


                if (
                    search &&
                    !searchable.includes(search)
                ) {

                    return false;

                }


                // Distance

                if (
                    station.distance > distance
                ) {

                    return false;

                }


                // Charger

                if (
                    charger !== "all" &&
                    !station.chargers.includes(charger)
                ) {

                    return false;

                }


                // Status

                if (
                    status !== "all" &&
                    station.status !== status
                ) {

                    return false;

                }


                return true;

            }
        );


    displayStations(filtered);

}


// ==========================================
// DISPLAY STATIONS
// ==========================================

function displayStations(stations) {

    const container =
        document.getElementById(
            "stationResults"
        );


    const count =
        document.getElementById(
            "stationCount"
        );


    // Clear old markers

    mapMarkers.forEach(
        marker =>
            evMap.removeLayer(marker)
    );


    mapMarkers = [];


    container.innerHTML = "";


    count.textContent =
        `${stations.length} stations found`;


    if (stations.length === 0) {

        container.innerHTML = `

            <div class="real-station-card">

                <h3>
                    😕 No charging station found
                </h3>

                <p>
                    Try another city,
                    distance or charger filter.
                </p>

            </div>

        `;

        return;

    }


    stations.forEach(
        station => {


            // MAP MARKER

            const marker =
                L.marker([
                    station.lat,
                    station.lng
                ])
                .addTo(evMap)
                .bindPopup(`

                    <strong>
                        ⚡ ${station.name}
                    </strong>

                    <br><br>

                    📍 ${station.address}

                    <br>

                    🟢 ${station.status}

                `);


            mapMarkers.push(marker);


            // CHARGER TAGS

            const chargerTags =
                station.chargers
                    .map(
                        charger =>
                            `<span class="charger-tag">
                                ⚡ ${charger}
                             </span>`
                    )
                    .join("");


            // NAVIGATION LINK

            const navigationURL =
                `https://www.google.com/maps/dir/?api=1` +
                `&destination=${station.lat},${station.lng}`;


            // CARD

            const card =
                document.createElement("div");


            card.className =
                "real-station-card";


            card.innerHTML = `

                <h3>
                    ⚡ ${station.name}
                </h3>


                <p>
                    📍 ${station.address}
                </p>


                <p>
                    🏙️ ${station.city},
                    ${station.state}
                </p>


                <span class="status">
                    🟢 ${station.status}
                </span>


                <div class="charger-tags">
                    ${chargerTags}
                </div>


                <p>
                    📏
                    <strong>
                        ${station.distance} km
                    </strong>
                    away
                </p>


                <button
                    class="primary-btn"
                    onclick="
                        focusStation(
                            ${station.lat},
                            ${station.lng}
                        )
                    ">

                    🗺️ View on Map

                </button>


                <a
                    class="navigate-btn"
                    href="${navigationURL}"
                    target="_blank">

                    🧭 Navigate

                </a>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// FOCUS STATION
// ==========================================

function focusStation(
    latitude,
    longitude
) {

    evMap.setView(
        [latitude, longitude],
        16
    );


    const marker =
        mapMarkers.find(
            item => {

                const position =
                    item.getLatLng();


                return (
                    Math.abs(
                        position.lat -
                        latitude
                    ) < 0.000001 &&

                    Math.abs(
                        position.lng -
                        longitude
                    ) < 0.000001
                );

            }
        );


    if (marker) {

        marker.openPopup();

    }

}


// ==========================================
// NEAR ME
// ==========================================

function useMyLocation() {

    if (
        !navigator.geolocation
    ) {

        alert(
            "Geolocation is not supported."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            currentLatitude =
                position.coords.latitude;


            currentLongitude =
                position.coords.longitude;


            evMap.setView(
                [
                    currentLatitude,
                    currentLongitude
                ],
                13
            );


            L.marker([
                currentLatitude,
                currentLongitude
            ])
            .addTo(evMap)
            .bindPopup(
                "📍 Your Current Location"
            )
            .openPopup();


            alert(
                "📍 Your location detected!"
            );

        },


        function() {

            alert(
                "Location permission denied."
            );

        }

    );

}


// ==========================================
// ALL INDIA
// ==========================================

function showAllIndia() {

    evMap.setView(
        [22.9734, 78.6569],
        5
    );


    // Show all demo stations

    displayStations(
        chargingStations
    );

}


// ==========================================
// BATTERY SYSTEM
// ==========================================

const batterySlider =
    document.getElementById(
        "batterySlider"
    );


if (batterySlider) {

    batterySlider.addEventListener(
        "input",
        function() {

            const battery =
                Number(this.value);


            document.getElementById(
                "batteryValue"
            ).textContent =
                `${battery}%`;


            document.getElementById(
                "batteryFill"
            ).style.width =
                `${battery}%`;


            const range =
                Math.round(
                    battery * 3
                );


            document.getElementById(
                "rangeValue"
            ).textContent =
                range;


            const status =
                document.getElementById(
                    "batteryStatus"
                );


            if (battery <= 20) {

                status.textContent =
                    "⚠️ Low Battery";

            }
            else if (battery <= 50) {

                status.textContent =
                    "🟡 Battery condition: Medium";

            }
            else {

                status.textContent =
                    "🟢 Battery condition: Good";

            }

        }
    );

}


// ==========================================
// CALCULATOR
// ==========================================

const calculateBtn =
    document.getElementById(
        "calculateBtn"
    );


if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        function() {


            const capacity =
                Number(
                    document.getElementById(
                        "batteryCapacity"
                    ).value
                );


            const current =
                Number(
                    document.getElementById(
                        "currentBattery"
                    ).value
                );


            const target =
                Number(
                    document.getElementById(
                        "targetBattery"
                    ).value
                );


            const price =
                Number(
                    document.getElementById(
                        "pricePerKwh"
                    ).value
                );


            if (
                target <= current
            ) {

                alert(
                    "Target battery must be greater than current battery."
                );

                return;

            }


            const energy =
                capacity *
                (
                    (target - current) /
                    100
                );


            const cost =
                energy * price;


            document.getElementById(
                "energyResult"
            ).textContent =
                `${energy.toFixed(2)} kWh`;


            document.getElementById(
                "costResult"
            ).textContent =
                `₹${cost.toFixed(2)}`;

        }
    );

}


// ==========================================
// DARK MODE
// ==========================================

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                themeBtn.textContent =
                    "☀️";

            }
            else {

                themeBtn.textContent =
                    "🌙";

            }

        }
    );

}


// ==========================================
// BUTTON EVENTS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeMap();


        document
            .getElementById("nearbyBtn")
            .addEventListener(
                "click",
                useMyLocation
            );


        document
            .getElementById("indiaBtn")
            .addEventListener(
                "click",
                showAllIndia
            );


        document
            .getElementById("searchBtn")
            .addEventListener(
                "click",
                loadStations
            );


        document
            .getElementById("stationSearch")
            .addEventListener(
                "keyup",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        loadStations();

                    }

                }
            );


        document
            .getElementById("distanceFilter")
            .addEventListener(
                "change",
                loadStations
            );


        document
            .getElementById("chargerFilter")
            .addEventListener(
                "change",
                loadStations
            );


        document
            .getElementById("statusFilter")
            .addEventListener(
                "change",
                loadStations
            );

    }
);d