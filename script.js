

const apiKey = "e00b87711d2f93def3b684538f72e256";
const url = "https://gateway.marvel.com:443/v1/public/events/227/characters?orderBy=name&limit=91&apikey="+apiKey;

// GLOBAL VARIABLES
let characters = [];
let filteredCharacters = [];
let currentCharacterImg = document.getElementById('current-character');
const mainContainer = document.querySelector('#main-container');
let currentCharacterName = document.querySelector('#selected-character-name');

//GET DATA
function getData(){
    
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res.data.results))
        .then(res =>{

            characters.push(...res.data.results);
            displayCharacters(characters);
                        
        })
        .catch(error => console.log(error))
};
getData();

function displayCharacters(results){
    // clear main container
    mainContainer.innerHTML = '';

    //loop through each character's array
    results.forEach((character) =>{

        // fetch character's name
        let characterName = character.name;

        // fetch character's image
        let imgExtension = character.thumbnail.extension;
        let imgPath = character.thumbnail.path;
        let imgVariant = "standard_amazing";
        let characterImg = imgPath+"/"+imgVariant+"."+imgExtension;

        //fetch character's comics & generate a new array of 3 elements
        let characterComics = character.comics.items.map(obj => obj.name);
        let randomComics = [];
        for (let i=0 ; i < 3; i++){
            randomComics.push(...characterComics.splice(Math.floor(Math.random() * characterComics.length), 1));
        }

        //fetch character's events & generate a new array of 3 elements
        let characterEvents = character.events.items.map(obj => obj.name);
        let randomEvents = [];
        for (let i =0; i < 3; i++){
            randomEvents.push(...characterEvents.splice(Math.floor(Math.random() * characterEvents.length),1));
        }
        // console.log(character.comics);

        // characterEvents prints [Object Object], solution: serialize character events (NOT USED)
       let characterEvents_serialized = JSON.stringify(characterEvents);
        //    console.log(characterEvents_serialized);

        // create each character's div
        let div = document.createElement('div');
        // div.setAttribute('id', `character-container-${index}`); NOT NEEDED...YET
        div.setAttribute('class', 'character-container container center column');  
        
        
        
        div.innerHTML = `
            
                <img class = "character-image" src = "${characterImg}" alt = "${characterName}" 
                data-name = "${characterName}" 
                data-comics = "${randomComics}"
                data-events = "${randomEvents}"
                >
           
            
                <h3 class = "character-name">${characterName}</h3>
            
        `;

        //add a click event listener to each div

        div.addEventListener('click', openInfo);

        // append to mainContainer
        mainContainer.appendChild(div);            
    });
}

/* SEARCH BAR */
const searchInput = document.querySelector('#search-input');

searchInput.addEventListener("input", function(event){
    filteredCharacters = characters.filter(char => {
        return char.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    displayCharacters(filteredCharacters);
});

/* DISPLAY CHARACTER INFO */
const selectedCharacterContainer = document.querySelector('#selected-character-container');


function openInfo(e){
    console.log(e.target);

    //update selected character img
    currentCharacterImg.src = e.target.src;

    //update selected character's name
    currentCharacterName.innerText = e.target.dataset.name;    

    //populate character events
    let events = document.querySelector('#selected-character-events');
    events.innerText = '';
    let eventString = e.target.dataset.events;
    let newArr = eventString.split(',');
    //console.log(newArr);
    let eventList = newArr.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item;
        events.appendChild(li);
    })

    //populate selected character's comics & prevent accumulation
    let comics = document.querySelector('#selected-character-comics');
    comics.innerText = '';
    let string = e.target.dataset.comics;
    let newArray = string.split(',');
    // console.log(newArray);
    let comicList = newArray.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item;
        comics.appendChild(li);           
    });

}


