// create array that contains movie names

var movie = ["The Godfather", "Wizard of Oz", "Casablanca", "Star Wars", "2001: A Space Odyssey", "E.T. The Extra-Terrestrial",
	"Apocalypse Now", "One Flew Over The Cuckoo's Nest", "Rocky", "Saving Private Ryan", "The Sixth Sense"];

	// create a function that will create a button
	function renderButtons() {
		$("#buttonsArea").empty(); // empties the buttonsArea div so we don't make duplicates
	
		// for loop to add attributes for every item in the movies array
		for (var i = 0; i < movie.length; i++) {
			var button = $("<button>");
			button.html(movie[i]);
			button.addClass("btn btn-outline-warning m-1");
			button.attr("id", "movie-btn");
			button.attr("movie-title", movie[i]);
			$("#buttonsArea").append(button);
		}
	}

	// create function to display button
function displayGifs() {
	var thisMovie = $(this).attr("movie-title");
	console.log(thisMovie);
	//link to giphy website and attached search?q so user can submit the moive they want
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisMovie + "&api_key=QuIu7GhZPi2QdFJQ5TANXO0dsGIrtzYb&limit=10"; // specilized key for this project

	// use ajax to call and gets and returns the response object from the query url
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var response = response.data;

		// creates a div that contains a still image gif and rating info for each response item
		for (var i = 0; i < response.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gifDiv ");

			var rating = response[i].rating;
			var p = $("<p>").html("Rating: " + rating);
			p.addClass("text-center ");

			var gifImage = $("<img>");
			gifImage.addClass("gif");
			gifImage.attr("src", response[i].images.fixed_height_still.url);
			gifImage.attr("data-still", response[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", response[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");

			// places the image and the rating text in the gifDiv
			gifDiv.append(p);
			gifDiv.prepend(gifImage);

			// places the gifDiv at the top of the mainArea div
			$("#mainArea").prepend(gifDiv);
		}
	});
}
// when the submit button is clicked, the input value is pushed to the movies array and rendered into a new button
$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	var newMovie = $("#userInput").val().trim();
	movie.push(newMovie);
	renderButtons();
});

// An event listener that waits for the user to click any buttons with an id of movie-btn, then performs the displayGifs function
$(document).on("click", "#movie-btn", displayGifs);

// starts and stops the animated gif on click
$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");

	// create if else statement 
	//if the state of the gif is still, when it clicked, make it move/animate
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
		// or if its moving/animated , when clicked it will stop and become still (until its clicked again)
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons();
