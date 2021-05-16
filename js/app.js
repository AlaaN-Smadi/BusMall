'use strict';


let objectArray = []; // array of all objects

function SetImagesObject(name, src) { // constructure to create objects
    this.name = name.split('.')[0];
    this.src = 'Images/' + src;
    this.clicks = 0;
    this.show = 0;

    objectArray.push(this);
}


// array for image sources 
let imageSrc = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']


// loop for creating objects
for (let i = 0; i < imageSrc.length; i++) {
    let a = new SetImagesObject(imageSrc[i], imageSrc[i]);
}

function randomNumber() { // generate random number
    return (Math.floor(Math.random() * (objectArray.length)));
}


/*   ---------------------------
   test random function
// console.log(randomNumber());
*/// ---------------------------


// call elements from html pages
// images
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdImg = document.getElementById('thirdImg');

// btns

let noItemsbtn = document.getElementById('noItemsbtn');

// input texts

let noItems = document.getElementById('noItems');

// --------------------------------------
// created things in the lists
let btnSect = document.getElementById('btnSect');

let newBtn = document.createElement('button');
newBtn.id = 'viewBTN';

let lowerSect = document.getElementById('lowerSect');
// --------------------------------------

//**************************************** */
// set actions for select and clicks
//**************************************** */


//set number of items to buy
let number_of_iterations = ['25'];
noItems.value = number_of_iterations[0];

noItemsbtn.addEventListener('click', noItemsFunction);

function noItemsFunction(event) {
    if ((noItems.value > 0) && (noItems.value <= 25)) {
        number_of_iterations.push(noItems.value);

        number_of_iterations.shift();

        noItems.parentNode.removeChild(noItems);
        let newNo = document.createElement('h4');
        let inputDiv = document.getElementById('inputDiv');
        inputDiv.appendChild(newNo);
        newNo.textContent = number_of_iterations[0];

        newNo.id = 'noItems2';
        // console.log(number_of_iterations);
    } else {
        alert('Number of Items must be more than one and less than 25 items at most');
    }
}


// show images 

let img1, img2, img3;
function render() {
    img1 = randomNumber();
    img2 = randomNumber();
    img3 = randomNumber();

    while (img1 === img2 || img1 === img3 || img2 === img3) {
        img1 = randomNumber();
        img2 = randomNumber();
        img3 = randomNumber();
    }

    // console.log(img1);
    // console.log(img2);
    // console.log(img3);

    objectArray[img1].show++;
    objectArray[img2].show++;
    objectArray[img3].show++;

    firstImg.setAttribute('src', objectArray[img1].src);
    secondImg.setAttribute('src', objectArray[img2].src);
    thirdImg.setAttribute('src', objectArray[img3].src);
}
render();

/*   ---------------------------
   test show images function
// console.log(objectArray);
*/// ---------------------------



// images clicks 
firstImg.addEventListener('click', clicked);
secondImg.addEventListener('click', clicked);
thirdImg.addEventListener('click', clicked);

let a = 0;

function clicked(event) {

    a++;
    if (a < parseInt(number_of_iterations[0])) {
        if (event.target.id === "firstImg") {
            objectArray[img1].clicks++;
        } else if (event.target.id === "secondImg") {
            objectArray[img2].clicks++;
        } else if (event.target.id === "thirdImg") {
            objectArray[img3].clicks++;
        }
        render();


    } else if (a == parseInt(number_of_iterations[0])) {
        // firstImg.removeEventListener();
        // secondImg.removeEventListener();
        // thirdImg.removeEventListener();

        if (event.target.id === "firstImg") {
            objectArray[img1].clicks++;
        } else if (event.target.id === "secondImg") {
            objectArray[img2].clicks++;
        } else if (event.target.id === "thirdImg") {
            objectArray[img3].clicks++;
        }
        
        btnSect.appendChild(newBtn);

        newBtn.textContent = 'View Chart';

        firstImg.removeEventListener('click', clicked);
        secondImg.removeEventListener('click', clicked);
        thirdImg.removeEventListener('click', clicked);

    }
    //    console.log(objectArray);
}



// View last results from button 

newBtn.addEventListener('click', view);

function view(event) {

    for (let i = 0; i < objectArray.length; i++) {
        console.log(i);
        let ulEl = document.createElement('ul');
        let liEl = document.createElement('li');

        lowerSect.appendChild(ulEl);
        ulEl.appendChild(liEl);
        liEl.textContent = `${objectArray[i].name} had ${objectArray[i].clicks} votes, and was seen ${objectArray[i].show} times.`;
    }
}