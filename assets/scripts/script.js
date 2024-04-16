const formSubmit = $('#search');
const input = $('#search-input')
const right = $('#right')
const cityContainer = $('city-info')
const cityNameResult = $('#city-name-result')
const cityTempResult = $('#city-temp-result')
const cityWindResult = $('#city-wind-result')
const cityHumidResult = $('#city-humid-result')

let savedData = localStorage.getItem('search');
// console.log(savedData)


function convertTemp(num) {
	const kelvin = num;
	const celsius = kelvin - 273;
	let fahrenheit = celsius * (9 / 5) + 32;
	fahrenheit = Math.floor(fahrenheit);

	return fahrenheit;
}

function apiCall(event) {
	event.preventDefault();
	// savedData.push(input.val());
	console.log("Inside API Call");
	
let inputValue = input.val();

//making first API call to receive geocode values

	const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=216b199ad40ea7f7a10905ebc665b34c`

	fetch(cityUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		let lat = data[0].lat;
		let lon = data[0].lon;
		console.log(lon);

//API call using Lat and Lon found with first call

		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=216b199ad40ea7f7a10905ebc665b34c`;
	fetch(weatherUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data.daily);

			localStorage.setItem('search', inputValue);

			right.css('display','block');
			let citySearchInput = inputValue.toUpperCase();
			cityNameResult.text(citySearchInput);
			cityTempResult.text(`Today's High is ` + convertTemp(parseInt(data.daily[0].temp.max)));
			cityWindResult.text('Wind: ' + (parseInt(data.daily[0].wind_speed)));
			cityHumidResult.text('Humidity is: ' + (parseInt(data.daily[0].humidity)));



			for (let i = 0; i < 5; i++) {
				const maxTemp = parseInt(data.daily[i].temp.max);
				const windSpeed = parseInt(data.daily[i].wind_speed);
				const humidityRating = parseInt(data.daily[i].humidity);

				console.log(`Humidity is ${humidityRating}%`);
				console.log(`Windspeed is ${windSpeed} mph`);
				console.log(`Today's high is ${convertTemp(maxTemp)}°`);
			}
		});
	})
};

formSubmit.on('submit', apiCall);
