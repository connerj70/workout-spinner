
//Instructions

//1. Pass your array into the scroll function on line 106
//2. Call the spin function when you would like to start the spin


// here is an example array. it may be any length, but must have a name followed by a decimal representing the percentage of slots this user 'owns'
// the last entry in the array will be the name of the winner.
var exampleArray =  [
{
"name":"arnie3",
"percentage":0.1,
"sound": "arnie3"
},
{
"name":"arnie2",
"percentage":0.1,
"sound": "arnie2"
},
{
"name":"arnie1",
"percentage":0.1,
"sound": "arnie1"
},
{
"name":"arnie4",
"percentage":0.1,
"sound": "arnie4"
},{
"name":"arnie5",
"percentage":0.1,
"sound": "arnie5"
},{
"name":"arnie6",
"percentage":0.1,
"sound": "arnie6"
},{
"name":"arnie7",
"percentage":0.1,
"sound": "arnie7"
},{
"name":"arnie8",
"percentage":0.1,
"sound": "arnie8"
}
]

//IIFE to prevent polluting scope. The function will run then save a spin function to the variable spin. You can then call this spin function whenever you would like to start the spin

	// arr1 is the array that will be passed to the fillScroller function
	var arr1 = exampleArray;

	var scroller = document.querySelector('.scroller');

	//the parameter arr will be the array containing the names of the contestants, their percentage of pictures, with the last entry in the array being the winner
	function fillScroller(arr) {
		//this array will contain 100 images with the percentage an image appears based on the percentage given in the initial array
		var pictureArray = [];

		//create an array of length 100 containing pictures of the contestants in proportion to their percentages
		for(let k=0; k < arr.length; k++) {
			for(let l=0; l<arr[k].percentage * 100; l++) {
				pictureArray.push(arr[k].name);
			}
		}

		//randomize the order in which the pictures will appear in the scroll
		pictureArray = shuffle(pictureArray);

		//make sure the winners picture will appear in the winning slot
		pictureArray.splice(78, 1, arr[arr.length - 1].name);

		//loop over the array and create an image for each entry

		for(var i=0; i < pictureArray.length; i++) {
			var image= document.createElement("IMG")
			image.classList.add("scroller-img");
			image.classList.add("pic-" + i);
			//you will need to change this string to the correct file path where your pictures will be coming from.
			image.src = "./assets/" + pictureArray[i] + ".jpeg";
			scroller.appendChild(image);
		}
		
	}

	//function to start the scrolling animation

	fillScroller(exampleArray);


	function spin() {

		arr1 = shuffle(arr1);

		fillScroller(arr1);

		var audio;
		var randomNum = Math.floor(Math.random()*10); // this will get a number between 1 and 99;
		// 	randomNum *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
		// var incrementer = 100;
		var winArr = [-18,-18,-18,-18,0,18,18,18,18,18]
		//this is what will change the X offset every 0.1 milliseconds
				var num1 = -4015.199999 + winArr[randomNum];
				scroller.style.transform = "translateX(" + num1 + "px)"

				//You can run your next function inside this setTimeout in replace of the console.log
				setTimeout(function () {
					scroller.transitionDuration = "1s";
        			audio = new Audio('./assets/sounds/' + arr1[arr1.length - 1].sound + ".mp3");
					audio.play();
					scroller.style.transform = 'translateX(0)';
    			}, 4800);
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