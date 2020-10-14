const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// when the button.diabled is ture, it === false, when its false, it === true
// call the function after tellMeAJoke, when the joke is playing, the button is disabled by calling the toggleButton, but when the joke is finished, it will trigger audioElement ended event, and trigger the toggleButton again to enable the button
function toggleButton() {
    button.disabled = ! button.disabled;
}

// To connect getJokeFromApi and VoiceRSS.speech, *****------ tellMeAJoke should be above getJokeFromApi ----*********
// Step 1: create a new function called tellMeAJoke and pass joke as a parameters, put tellMeAJoke inside the getJokeFromApi function, and pass joke to it
// step 2: inside tellMeAJoke, add voiceRSS.speech and use joke as the src
// step 3: add eventListener to the button, when click the button, call getJokesFromApi function
// step 4: use audioElement.addEventListener and toggleButton function to achieve a goal: when the joke is playing, disabled the button, when finished telling jokes, the button is enabled again

function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: 'f9fc8fe40a2c4290af2946cf25a8cdf8',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

// fetch data from joke api, and output as string
// because we choose to have single and two part jokes, so there will be two possible outcomes:
// 1) single joke will have only data.joke
// 2) two part joke will have data.setup and data.delivery, so we use if statement to combine these two parts
async function getJokesFromApi() {
    let joke = '';
    const jokeApiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {  
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else{
            joke = data.joke;
        }
        tellMeAJoke(joke);
        toggleButton();
    } catch(err) {
        console.log('whoops, something wrong', err)
    }
};

button.addEventListener('click', getJokesFromApi);

// use eneded event on audio, and call toggleButton function to disable and enable the button
audioElement.addEventListener('ended', toggleButton);
