

const apiKey = "e00b87711d2f93def3b684538f72e256";
const url = "https://gateway.marvel.com:443/v1/public/events/227/characters?orderBy=name&limit=91&apikey="+apiKey;

// GLOBAL VARIABLES
let currentList = [];
let mainContainer = document.querySelector('#main-container');


//GET DATA
function getData(){
    
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res.data.results))
        .then(res =>{

            let characters = res.data.results;
            currentList.push(characters);
            
            characters.forEach((character,index) =>{

                // fetch character's name
                let characterName = character.name;

                // fetch character's image
                let imgExtension = character.thumbnail.extension;
                let imgPath = character.thumbnail.path;
                let imgVariant = "portrait_medium";
                let characterImg = imgPath+"/"+imgVariant+"."+imgExtension;

                // create each character's div
                let div = document.createElement('div');
                div.setAttribute('id', `character-container-${index}`);
                div.setAttribute('class', 'container');
                div.innerHTML = `
                    <div class = "character-image center">
                        <img src = "${characterImg}" alt = "${characterName}">
                    </div>
                    <div class = "character-name">
                        <h3>${characterName}</h3>
                    </div>
                `;

                // append to mainContainer
                mainContainer.appendChild(div);

                
                
            });

        })
        .catch(error => console.log(error))
};
getData();

/* SEARCH BAR */
let searchInput = document.querySelector('#search-input');
searchInput.addEventListener("onkeydown", function(event){
    filterList(event.target.value);
});


// searchInput.addEventListener("input", () => {
//     setTimeout(function (){
//         let searchResults = [];
//         let characters = mainContainer;
//         console.log(characters);
//         // for (let i=0; i < characters.length; i++) {
//         //     if(characters[i].name){
//         //         if(characters[i].name.replaceAll('-', ' ').includes(document.getElementById('search-input').value.toLowerCase())){
//         //             searchResults.push(characters[i]);
//         //         };
//         //     };
//         // };

//         // document.getElementById('main-container').innerHTML = '';
//         // currentList = searchResults;
//         // updateCharacterList();
//     }, 1);

// });

// // function updateCharacterList(index) {
// //     if(currentList[index]) {
// //         mainContainer.insertAdjacentElement('beforeend', `<div class = "container center column" id = "character-container">`);
            
        
// //     }
// // }

