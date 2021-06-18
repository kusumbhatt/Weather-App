const loader = document.querySelector('#loading');
const result = document.querySelector('#results');

const http = new HTTP();

document.getElementById('weather-form').addEventListener('submit', function(e) {
    loader.style.display='block';
    setTimeout(findWeather, 2000);
    e.preventDefault();
});

document.getElementById('reset').addEventListener('click', reset);

// Show error
function showError(error) {
    clearError();
    loader.style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 3000);
}

function clearError() {
    const error = document.querySelector('.alert');
    if(error) error.remove();
}

function showWeather(location, comment, temperature, feelslike) {
    loader.style.display = 'none';
    result.style.display = 'block';
    document.querySelector('#input').disabled = 'true';
    document.querySelector('#location').value = location;
    comment = "It is " + comment + " day. Current Temperature: " + temperature + ". It feelslike " + feelslike ;
    document.querySelector('#description').value = comment;
}

function reset(e) {
    e.preventDefault();
    window.location.reload();
}

//Calculate Results
function findWeather() {
    const address = document.querySelector('#input').value;
    if(address) {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoia3VzdW1iaGF0dCIsImEiOiJja3EwNm9zYmswMXgxMm9vMWU5djBtdGhzIn0.DgD_WbuyJXiZHO17qzu4hw";
        http.get(url)
            .then((body) => {
                if(body.features.length > 0) {
                    const longitude = body.features[0].center[0];
                    const latitude = body.features[0].center[1];
                    const location = body.features[0].place_name;
                    const url = "http://api.weatherstack.com/current?access_key=2bb36b8c77d05cdbf0eaffddd91477bc&query=" + latitude + "," + longitude;
                    http.get(url) 
                        .then((data) => {
                            if(!data.current.error) {
                                const comment = data.current.weather_descriptions[0];
                                const temp = data.current.temperature;
                                const feel = data.current.feelslike;
                                showWeather(location, comment, temp, feel);
                            }
                            else 
                                showError('Unable to connect to Weather Services!');
                        })
                        .catch(err => showError('Unable to connect!'));

                }
                else 
                    showError('Unable to connect to location services!');
            })
            .catch(err => showError('Unable to connect to net!'));
    }
    else 
        showError('You must provide a search address');
}