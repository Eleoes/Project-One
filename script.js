

const apiKey = "e00b87711d2f93def3b684538f72e256";
const url = "https://gateway.marvel.com:443/v1/public/events/227/characters?orderBy=name&limit=91&apikey="+apiKey;

//GET DATA
function getData(){
    
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res.data.results))
        .then(res =>{

            let characters = res.data.results;
            let mainContainer = document.querySelector('#main-container');
            
            characters.forEach(character =>{

                // fetch character's name
                let characterName = character.name;

                // fetch character's image
                let imgExtension = character.thumbnail.extension;
                let imgPath = character.thumbnail.path;
                let imgVariant = "portrait_medium";
                let characterImg = imgPath+"/"+imgVariant+"."+imgExtension;

                // create each character's div
                let div = document.createElement('div');
                div.setAttribute('id', 'character-container');
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


