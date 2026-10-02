const stations = [
    {
        name: "GreenCharge Station",
        location: "Nagpur Central",
        type: "fast",
        power: "60 kW",
        price: "₹14/kWh",
        distance: "1.2 km"
    },
    {
        name: "EV Power Hub",
        location: "Wardha Road",
        type: "fast",
        power: "30 kW",
        price: "₹13/kWh",
        distance: "2.8 km"
    },
    {
        name: "EcoCharge Point",
        location: "Civil Lines",
        type: "normal",
        power: "15 kW",
        price: "₹11/kWh",
        distance: "3.5 km"
    },
    {
        name: "VoltGo Charging",
        location: "Manish Nagar",
        type: "fast",
        power: "60 kW",
        price: "₹15/kWh",
        distance: "4.1 km"
    },
    {
        name: "Smart EV Point",
        location: "Dharampeth",
        type: "normal",
        power: "7 kW",
        price: "₹10/kWh",
        distance: "4.8 km"
    },
    {
        name: "FutureCharge Hub",
        location: "Hingna Road",
        type: "fast",
        power: "30 kW",
        price: "₹12/kWh",
        distance: "6.2 km"
    }
];


function displayStations() {

    const list = document.getElementById("stationList");

    const search =
        document.getElementById("stationSearch")
            .value
            .toLowerCase();

    const filter =
        document.getElementById("chargerFilter")
            .value;

    const filtered = stations.filter(station => {

        const matchesSearch =
            station.name.toLowerCase().includes(search) ||
            station.location.toLowerCase().includes(search);

        const matchesFilter =
            filter === "all" ||
            station.type === filter;

        return matchesSearch && matchesFilter;
    });


    if (filtered.length === 0) {

        list.innerHTML = `
            <div class="station">
                <div class="station-icon">🔍</div>
                <h3>No station found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.innerHTML = filtered.map(station => {

        return `
            <div class="station">

                <div class="station-icon">⚡</div>

                <h3>${station.name}</h3>

                <p>📍 ${station.location}</p>

                <div class="station-info">
                    <span>${station.power}</span>
                    <span>${station.price}</span>
                </div>

                <div class="station-info">
                    <span>${station.type === "fast" ? "Fast Charger" : "Normal Charger"}</span>
                    <span>${station.distance}</span>
                </div>

            </div>
        `;

    }).join("");
}


document
    .getElementById("stationSearch")
    .addEventListener("input", displayStations);

document
    .getElementById("chargerFilter")
    .addEventListener("change", displayStations);


displayStations();



const batterySlider =
    document.getElementById("batterySlider");

batterySlider.addEventListener("input", function() {

    const value = this.value;

    document.getElementById("batteryDisplay")
        .textContent = `${value}%`;

    document.getElementById("chargingProgress")
        .style.width = `${value}%`;

    const status =
        document.getElementById("chargingStatus");

    const text =
        document.getElementById("statusText");

    if (value < 20) {

        status.textContent = "Low Battery";
        text.textContent = "Charging recommended.";

    } else if (value < 80) {

        status.textContent = "Ready to Charge";
        text.textContent = "Vehicle can be charged.";

    } else {

        status.textContent = "Battery Healthy";
        text.textContent = "Battery level is sufficient.";
    }

});



function calculateCharging() {

    const capacity =
        Number(document.getElementById("capacity").value);

    const current =
        Number(document.getElementById("currentBattery").value);

    const target =
        Number(document.getElementById("targetBattery").value);

    const rate =
        Number(document.getElementById("rate").value);

    const power =
        Number(document.getElementById("chargerPower").value);


    if (
        capacity <= 0 ||
        rate <= 0 ||
        power <= 0 ||
        current < 0 ||
        target <= current ||
        target > 100
    ) {

        alert("Please enter valid charging values.");
        return;
    }


    const percentageNeeded =
        target - current;

    const energy =
        capacity * percentageNeeded / 100;

    const cost =
        energy * rate;

    const hours =
        energy / power;

    const minutes =
        Math.round(hours * 60);


    document.getElementById("energyResult")
        .textContent = `${energy.toFixed(2)} kWh`;

    document.getElementById("costResult")
        .textContent = `₹${cost.toFixed(2)}`;

    document.getElementById("timeResult")
        .textContent = formatTime(minutes);

    document.getElementById("result")
        .classList.remove("hidden");
}


function formatTime(minutes) {

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    if (hours === 0) {
        return `${mins} min`;
    }

    return `${hours} hr ${mins} min`;
}



const themeBtn =
    document.getElementById("themeBtn");

let darkMode = true;

themeBtn.addEventListener("click", function() {

    darkMode = !darkMode;

    if (!darkMode) {

        document.documentElement.style.setProperty("--bg", "#f4f8f5");
        document.documentElement.style.setProperty("--card", "#ffffff");
        document.documentElement.style.setProperty("--card2", "#eef7f0");
        document.documentElement.style.setProperty("--text", "#07110d");
        document.documentElement.style.setProperty("--muted", "#617168");
        document.documentElement.style.setProperty("--border", "rgba(0,0,0,0.1)");

        this.textContent = "☀️";

    } else {

        document.documentElement.style.setProperty("--bg", "#07110d");
        document.documentElement.style.setProperty("--card", "#0d1d16");
        document.documentElement.style.setProperty("--card2", "#10271d");
        document.documentElement.style.setProperty("--text", "#f5fff9");
        document.documentElement.style.setProperty("--muted", "#9eb5a9");
        document.documentElement.style.setProperty("--border", "rgba(255,255,255,0.09)");

        this.textContent = "🌙";
    }

});