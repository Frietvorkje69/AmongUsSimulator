window.addEventListener('load', init);

//Globals
let imageList = ['red', 'purple', 'green', 'impostor'];
let playField;
let playForm;
let lastItem;
let message;
let numberGuessedField;

/**
 * Initialize after the DOM is ready
 */
function init()
{
  //Retrieve the playing field element from the HTML
  playField = document.getElementById('playing-field');
  playField.addEventListener('click', playingFieldClickHandler);
  playForm = document.getElementById('play-form');
  playForm.addEventListener('submit', formSubmitHandler);
  message = document.getElementById('alert');

  createPlayField();
}

/**
 * Generate the playing field dynamically with all the available images
 */
function createPlayField()
{
  //Empty field & shuffle current array to actually have a 'game feeling'
  imageList = shuffleArray(imageList);

  //Loop through all the images
  for (let i = 0; i < imageList.length; i++) {
    //Create div for card
    let div = document.createElement('div');
    div.classList.add('playing-card');

    //Create & append H2 to div
    let h2 = document.createElement('h2');
    h2.innerHTML = i.toString();
    div.appendChild(h2);

    //Create image, hide it & append to div
    let img = document.createElement('img');
    img.src = `img/questionmark.png`;
    img.dataset.id = i.toString();
    div.appendChild(img);




    //Append div to playing field
    playField.appendChild(div);
  }
}

/**
 * Show the card by its front so the player knows whats going on
 *
 * @param e
 */
function playingFieldClickHandler(e) {
  let clickedItem = e.target;

  //Check if the clicked element is an image
  if (clickedItem.nodeName === "IMG") {
    if(lastItem){
      lastItem.src = `img/questionmark.png`
    }
    clickedItem.src = `img/${imageList[clickedItem.dataset.id]}.png`
    lastItem = clickedItem;
  }
}

/**
 * Handler for when the form is submitted
 *
 * @param e
 */
function formSubmitHandler(e){
  e.preventDefault();
  numberGuessedField = document.getElementById('guess-number');
  let numberGuessed = numberGuessedField.value;

  if(imageList[numberGuessed] === 'impostor'){
    writeFeedbackMessage("Impostor Ejected! No more sussy bakas! ")
  }else{
    writeFeedbackMessage("Crewmate Ejected! There is one impostor remaining.")
  }
}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */
function writeFeedbackMessage(text){
  message.innerHTML = "";

  let span = document.createElement('span');
  span.innerHTML = text;
  message.append(span);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @link http://stackoverflow.com/a/12646864
 *
 * @param array
 * @returns {*}
 */
function shuffleArray(array)
{
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
