'use strict';


// ./Images/bag



let imageSrc = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass']

let productsContainer = document.getElementById('productsContainer')


/*
<div class="card">
  <img src="img_avatar.png" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>John Doe</b></h4> 
    <p>Architect & Engineer</p> 
  </div>
</div>
*/

function test() {

  for (let i = 0; i < imageSrc.length; i++) {

    // productsContainer

    


    let card = document.createElement("div")
    card.setAttribute('class', 'card')
    productsContainer.appendChild(card)

    let title = document.createElement('h2')
    title.textContent=`${imageSrc[i]}`
    title.setAttribute("class", "titles")
    card.appendChild(title)

    let image = document.createElement("img")
    image.setAttribute('src', `./Images/${imageSrc[i]}.jpg`)
    image.setAttribute('alt', `${imageSrc[i]}`)
    card.appendChild(image)

    let container = document.createElement('div')
    container.setAttribute('class', 'container')
    card.appendChild(container)

    let description = document.createElement('p')
    description.textContent = "Description"
    container.appendChild(description)
//     <h2>Card</h2>

// <div class="card">
//   <img src="img_avatar.png" alt="Avatar" style="width:100%">
//   <div class="container">
//     <h4><b>John Doe</b></h4> 
//     <p>Architect & Engineer</p> 
//   </div>
// </div>

  }
}

test()