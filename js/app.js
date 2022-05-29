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
let imageSrc = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']


// loop for creating objects
for (let i = 0; i < imageSrc.length; i++) {
    let a = new SetImagesObject(imageSrc[i], imageSrc[i]);
}

function randomNumber() { // generate random number
    return (Math.floor(Math.random() * (objectArray.length)));
}

getDataLocally();


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

// check images for iteration
let previousImg = [];


function repeatPrevious() { // function to make sure that images did not repeat 
    while ((img1 === previousImg[0]) || (img1 === previousImg[1]) || (img1 === previousImg[2])) {
        img1 = randomNumber();
    }
    while ((img2 === previousImg[0]) || (img2 === previousImg[1]) || (img2 === previousImg[2])) {
        img2 = randomNumber();
    }
    while ((img3 === previousImg[0]) || (img3 === previousImg[1]) || (img3 === previousImg[2])) {
        img3 = randomNumber();
    }
}

// show images 

let img1, img2, img3;

function render() {
 
    img1 = randomNumber();
    img2 = randomNumber();
    img3 = randomNumber();

    repeatPrevious();

    // while loop to make sure that images are not the same and will not repeat two times
    while ((img1 === img2 || img1 === img3 || img2 === img3)) {
        img1 = randomNumber();
        img2 = randomNumber();
        img3 = randomNumber();

        repeatPrevious();

    }

    // ------------------------------------
    //   console to test random numbers 
    // ------------------------------------
    /*
        console.log("previousImg");
        for(let i=0;i<previousImg.length;i++){
            console.log(previousImg[i]);
        }
        
        console.log("newImg");
    
        console.log(img1);
        console.log(img2);
        console.log(img3);
    */
    // -------------------------------



    previousImg = []; // to make previousImg array empty

    objectArray[img1].show++;
    objectArray[img2].show++;
    objectArray[img3].show++;

    // enter Images into previousImg array to check them in the next iteration
    previousImg.push(img1);
    previousImg.push(img2);
    previousImg.push(img3);


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

    event.preventDefault();
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
        thirdImg.removeEventListener('click',clicked);
        

    }
    //    console.log(objectArray);
}

// Local Storing data by using function
function storageLocally(){
    let myViews = JSON.stringify(fullViews);
    let myClicks = JSON.stringify(fullClick);

    localStorage.setItem("clicks",myClicks);
    localStorage.setItem("views",myViews);
        
}
// Rendering Data from Local Storage 
function getDataLocally(){
    let myViews = localStorage.getItem("views");
    let myClicks = localStorage.getItem("clicks");

    let viewCount = JSON.parse(myViews);
    let clickCount = JSON.parse(myClicks);

    if (viewCount !== null){
        for(let i=0;i<objectArray.length;i++){
            objectArray[i].show = viewCount[i];
        }
    }
    if(clickCount !== null){
        for(let i=0;i<objectArray.length;i++){
            objectArray[i].clicks = clickCount[i];
        }
    }
    
}

// arrays for chart

let fullNames = [];
let fullClick = [];
let fullViews = [];

// View last results from button 

newBtn.addEventListener('click', view);

function view(event) {

    for (let i = 0; i < objectArray.length; i++) {
        // console.log(i);
        let ulEl = document.createElement('ul');
        let liEl = document.createElement('li');

        lowerSect.appendChild(ulEl);
        ulEl.appendChild(liEl);
        liEl.textContent = `${objectArray[i].name} had ${objectArray[i].clicks} votes, and was seen ${objectArray[i].show} times.`;

        // input information for arrays
        fullNames.push(objectArray[i].name);
        fullClick.push(objectArray[i].clicks);
        fullViews.push(objectArray[i].show);
    }
    storageLocally(); // calling function to store data locally

    createChart(); // call chart
    newBtn.removeEventListener('click', view);
}





// Creating Chart Function

function createChart() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fullNames,
            datasets: [{ // numer of views
                label: 'Number of Views',
                data: fullViews,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'

                ],
                borderWidth: 1
            },
            { // number of clicks
                label: 'Number of Clicks',
                data: fullClick,
                backgroundColor: [
                    'rgb(13, 13, 245)'

                ],
                borderColor: [
                    'blue'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true

                }
            }
        }
    });
}

