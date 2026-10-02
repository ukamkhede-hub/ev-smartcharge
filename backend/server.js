const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.json({
        project: "EV SmartCharge",
        status: "Backend running successfully",
        version: "1.0.0"
    });

});


app.get("/api/stations", (req, res) => {

    const stations = [
        {
            name: "GreenCharge Station",
            location: "Nagpur Central",
            power: "60 kW"
        },
        {
            name: "EV Power Hub",
            location: "Wardha Road",
            power: "30 kW"
        },
        {
            name: "EcoCharge Point",
            location: "Civil Lines",
            power: "15 kW"
        }
    ];

    res.json(stations);

});


app.post("/api/calculate", (req, res) => {

    const {
        capacity,
        currentBattery,
        targetBattery,
        rate,
        chargerPower
    } = req.body;


    if (
        !capacity ||
        currentBattery < 0 ||
        targetBattery <= currentBattery ||
        !rate ||
        !chargerPower
    ) {

        return res.status(400).json({
            error: "Invalid input"
        });

    }


    const energy =
        capacity *
        (targetBattery - currentBattery) /
        100;

    const cost =
        energy * rate;

    const minutes =
        Math.round((energy / chargerPower) * 60);


    res.json({

        energy: Number(energy.toFixed(2)),

        cost: Number(cost.toFixed(2)),

        chargingTimeMinutes: minutes

    });

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `EV SmartCharge backend running on port ${PORT}`
    );

});