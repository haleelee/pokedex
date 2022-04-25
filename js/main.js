//Example fetch using pokemonapi.co
const input = document.getElementById("myInput");

input.addEventListener('keyup', function (event){
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("myButton").click();
    }
});

// document.querySelector('button').addEventListener('click', getFetch)
// document.querySelector('#myBtn').addEventListener('click', getFetch)


function getFetch(randomToggle){
  const random = (Math.floor(Math.random() * 700));
  const choice = document.querySelector('input').value.toLowerCase()

  // const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  let url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  const random_url = `https://pokeapi.co/api/v2/pokemon/${random}`

  //if randomToggle is true (randomButton is clicked), then do getFetch but with random Pokemon
  if(randomToggle){
    url = random_url;
  }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const item = new PokemonInfo(data)
        item.showInfo()

      //   //forEach loop to list the types
      //   data.types.forEach( obj => {
      //     console.log(obj)
      //     //create an li
      //     const li = document.createElement('li')
          
      //     //add text to li
      //      li.textContent = obj.type.name

      //     //append to li to the ul
      //     document.querySelector('ul').appendChild(li)
      // })

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class PokemonInfo {
  constructor(pokemonData) { //I am passing in data
    this.name = pokemonData.name
    // this.image = pokemonData.sprites.other.dream_world.front_default
    this.image = pokemonData.sprites.front_default
    this.types = pokemonData.types
    this.height = pokemonData.height
    this.weight = pokemonData.weight
    this.id = pokemonData.id
    this.back_sprites = pokemonData.sprites.back_default
    this.front_sprites = pokemonData.sprites.front_shiny

  }

  showInfo() {
    document.getElementById('pokemon_name').innerText = this.name.charAt(0).toUpperCase() + this.name.slice(1); //shows the Pokemon's name capitalized
    
    document.getElementById('pokemon_type').innerText = this.types[0].type.name.charAt(0).toUpperCase() + this.types[0].type.name.slice(1); //shows the Pokemon's type capitalized

    document.getElementById('pokemon_id').innerText = `#${this.id}`; //shows the Pokemon's id number

    //******convert height from meters to feet-inches*****
    let height_in_inches = this.height/10 * 39.37;
    let feet = Math.floor(height_in_inches/12);
    
    let decimal_inches = height_in_inches - (feet * 12);
    let inches = Math.round(decimal_inches)

    if(inches === 12){
      feet++;
      inches = 0;
    }
    console.log(`total inches is ${height_in_inches} so feet is ${feet} and height in inches is ${inches}`);
  //****************************** */    
    
    document.getElementById('pokemon_height').innerText = `Height: ${feet}'-${inches}"`; //shows the Pokemon's type height

    document.getElementById('pokemon_weight').innerText = `Weight: ${this.weight} lbs`; //shows the Pokemon's type weight

    document.getElementById('pokemon_image').src = this.image; //show the Pokemon's image
    
    //clear previous li's 
    let myNode = document.querySelector(".ul_text2");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }

    //below adds to a ul for each Type of the Pokemon
    for (let key in this.types){
      //create an li
      const li = document.createElement('li')
           
      //add text to li
       li.textContent = this.types[key].type.name.charAt(0).toUpperCase() + this.types[key].type.name.slice(1); //shows the Pokemon's type capitalized

      //append to li to the ul
      document.querySelector('ul').appendChild(li)
    }

    document.querySelector('#front_sprites').classList.remove('hidden')

    document.querySelector('#back_sprites').classList.remove('hidden')

    document.getElementById('front_sprites').src = this.front_sprites; //show the Pokemon's front sprite

    document.getElementById('back_sprites').src = this.back_sprites; //show the Pokemon's back sprite

  }

  // listTypes(){
  //   let typesList = [];
  //   typesList = push.document.getElementById('pokemon_type')
    
  // }
}

