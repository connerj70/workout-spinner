
//Instructions

//1. Pass your array into the scroll function on line 106
//2. Call the spin function when you would like to start the spin
var exampleArray = ['pic1', 0.1, 'pic2', 0.1, 'pic3', 0.1, 'pic4', 0.7, 'pic2']

//IIFE to prevent polluting scope. The function will run then save a spin function to the variable spin. You can then call this spin function whenever you would like to start the spin
var spin = (function scroll(arr) {
	// arr1 is the array that will be passed to the fillScroller function
	var arr1 = arr;

	var scroller = document.querySelector('.scroller');

	//the parameter arr will be the array containing the names of the contestants, their percentage of pictures, with the last entry in the array being the winner
	function fillScroller(arr) {
		//this is an intermediate array that will contain an array of objects each containing a name and a percentage
		var slotArray = [];
		//this array will contain 100 images with the percentage an image appears based on the percentage given in the initial array
		var pictureArray = [];


		//loop over the initial array and create an object for each contestant containing their name and the percentage their picture should appear.
		for(var j=0; j < arr.length - 1; j = j + 2) {
			var obj = {name: arr[j], percentage: arr[j + 1]};
			slotArray.push(obj);
		}

		//create an array of length 100 containing pictures of the contestants in proportion to their percentages
		for(let k=0; k < slotArray.length; k++) {
			for(let l=0; l<slotArray[k].percentage * 100; l++) {
				pictureArray.push(slotArray[k].name);
			}
		}

		//randomize the order in which the pictures will appear in the scroll
		pictureArray = shuffle(pictureArray);

		//make sure the winners picture will appear in the winning slot
		pictureArray.splice(60, 1, arr[arr.length - 1]);

		//loop over the array and create an image for each entry

		for(var i=0; i < pictureArray.length; i++) {
			var image= document.createElement("IMG")
			image.classList.add("scroller-img");
			image.classList.add("pic-" + i);
			//you will need to change this string to the correct file path where your pictures will be coming from.
			image.src = "./" + pictureArray[i] + ".jpeg";
			scroller.appendChild(image);
		}
		
	}
	fillScroller(arr1);


	//function to start the scrolling animation

	function spin() {
		var offset = 0;
		var interval = setInterval(increment, 0.1);

		//this is what will change the X offset every 0.1 milliseconds
		function increment() {

			if(offset < 100 * 30.25) {
				if(offset > 100 * 20) {
					offset = offset + 2.5;
				} else if(offset > 100 * 26) {
				offset = offset + 2;
				} else {
					offset = offset + 3;
				}
				scroller.style.transform = "translateX(-" + offset + "px)";
			} else {
				//this is where you can run your next function when the spinner is done
				console.log('done');
				clearInterval(interval);
			}
		}
	}


	//Fisher-Yates shuffle used to shuffle the pictures in the pictureArray
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

return spin;

})(exampleArray);