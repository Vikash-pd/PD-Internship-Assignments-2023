
    const apiKey = "b89d916651b72cc224e2498fa1f13a85";
    const searchButton = document.getElementById("searchButton");
    const locationInput = document.getElementById("locationInput");
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherIcon = document.getElementById("weatherIcon");
    

    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim().toLowerCase();
        if (location === "") {
            alert("Please enter a location");
            return;
        }

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const temperature = Math.round(data.main.temp - 273.15);
                const temperatureInFahrenheit = (temperature * 9/5) + 32;
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

                weatherInfo.innerHTML = `<p>Temperature: ${temperature}°C / ${temperatureInFahrenheit}°F</p>
                
                <p>Description: ${description}</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Humidity: ${humidity} %</p>`;
                // Display the weather icon
                weatherIcon.src = iconUrl;
                weatherIcon.style.visibility='visible';
               
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                weatherInfo.innerHTML = "Weather Detail for specified place coundn't get";
                weatherIcon.src = "images/icon image.png";
                weatherIcon.style.visibility='visible' 
            });
    });
