# AEROVA — Intelligent Smart City Platform

AEROVA is a student project that demonstrates how different city services could be brought together in one easy-to-use web dashboard. Instead of opening separate screens for each service, a user can explore traffic, energy, water, waste collection, public transport, safety, and city analytics from the same control center.

## Live Demo

**Try AEROVA here:**

https://kommubalaji2007-dev.github.io/AEROVA--Intelligent-Smart-City-Platform/

## What Can I Explore?

* **City Home:** View a summary of the sample city indicators.
* **Digital City Map:** Explore a visual map with clickable markers for city assets.
* **Traffic Management:** View road conditions and run a simulated traffic update.
* **Energy Management:** Explore electricity demand, solar generation, grid status, and energy charts.
* **Water Management:** View reservoir information, water-zone indicators, and simulated leak scans.
* **Smart Waste:** Explore sample waste-bin information and collection-route features.
* **Transport Management:** View bus availability, routes, passenger loads, and fleet information.
* **Safety Center:** View sample incident information and try the demonstration alert button.
* **AI Center:** Ask questions about city services using the built-in chat-style assistant.
* **City Analytics:** View visual summaries and export a text report.
* **Settings and Notifications:** Explore interface settings, notification messages, and sidebar controls.
* **Floating Windows:** Open, close, and move supported panels around the screen.

## Technologies Used

* **HTML5** – Builds the webpage structure.
* **CSS3** – Handles the dashboard design, styling, and responsive layout.
* **JavaScript** – Controls navigation, buttons, map markers, simulated data, charts, notifications, and report export.

The project uses plain HTML, CSS, and JavaScript. The current version does not require a separate backend or external JavaScript libraries.

## Demo Login

Use the following demonstration credentials:

* **Email:** `admin@aerova.city`
* **Password:** `aerova123`

These credentials are for demonstration purposes only. The current login is a front-end demonstration and does not provide real account security.

## How to Run the Project in Visual Studio Code

1. Download or extract the AEROVA project folder.
2. Open Visual Studio Code.
3. Select **File → Open Folder**.
4. Choose the folder containing `index.html`.
5. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.
6. Open `index.html` in your browser.

For a convenient development setup, install the **Live Server** extension in VS Code. Right-click `index.html` and choose **Open with Live Server**.

You do not need to run `npm install` for this version of the project.

## Project Structure

```text
AEROVA/
├── index.html    # Main webpage and dashboard structure
├── style.css     # Dashboard design and responsive styling
├── script.js     # Interactions, simulations, charts, and report export
└── README.md     # Project documentation
```

## Important Note About the Demo

AEROVA is currently a front-end prototype. The city information, sensor readings, map indicators, and predictions are simulated rather than verified live city data.

The AI Center uses predefined responses based on keywords rather than a trained AI model. Some buttons demonstrate simulated updates or display confirmation messages.

The emergency-alert button does not contact emergency services or send a real alert. The map is an interface illustration and is not connected to a live GIS service.

Therefore, the project is intended to demonstrate the interface and its interactions, not to support real-world decisions about traffic, energy, water, transport, or public safety.

## Future Improvements

In the future, AEROVA could be improved by adding:

* A backend API and database for storing city information.
* Secure authentication and role-based access.
* Connections to authorized IoT sensors and city-service data sources.
* Integration with a real digital map or GIS service.
* Properly trained and evaluated AI/ML prediction models.
* Better error handling, accessibility, and automated testing.

These improvements would help develop the current prototype into a more complete smart-city platform.

## Project Goal

The main goal of AEROVA is to demonstrate how different urban services could be monitored through one unified dashboard.

This project focuses on the website's design, navigation, service modules, and interactive features. Real-time data integration, verified AI predictions, and production-level security would need to be developed separately.

**AEROVA — Bringing City Services Together in One Smart Platform.**
