const formSubmit = $('#search');
const input = $('#search-input')
const right = $('#right')



function apiCall(event) {
	event.preventDefault();
	
	console.log("Inside API Call");
	const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=216b199ad40ea7f7a10905ebc665b34c`;
	

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			localStorage.setItem('search', input.val());
			const recipeContent = data.feed;

			recipeContainer.empty();

			for (let i = 0; i < recipeContent.length; i++) {

				const recipeName = recipeContent[i].display.displayName;
				const recipeImg = recipeContent[i].display.images[0];
				const recipeUrl = recipeContent[i].display.source.sourceRecipeUrl

				const recipeCard = $('<div>').addClass('card m-3').css('width', '18rem');
				const cardImg = $('<img>').addClass('card-img-top').attr('src', recipeImg).css('height', '200px').css('object-fit', 'cover');
				const cardBody = $('<div>').addClass('card-body d-flex flex-column');
				const cardTitle = $('<h5>').addClass('card-title').text(recipeName);
				const cardUrl = $('<a>').addClass('btn btn-primary mt-auto stretched-link').attr('href', recipeUrl).text('See Recipe');

				cardImg.appendTo(recipeCard);
				cardBody.appendTo(recipeCard);
				cardTitle.appendTo(cardBody);
				cardUrl.appendTo(cardBody);
				recipeCard.appendTo(recipeContainer);
			}
		});

};


formSubmit.on('submit', apiCall);
