// assign the DOM node of the container
const postsEl = document.getElementById("posts_container")

// create 6 posts
for (let i = 0; i < 6; i++) {
    //create posts by adding them as HTML
    postsEl.innerHTML += addStructure()
}

// select the DOM node of the single cards created above
const cardsEl = document.querySelectorAll(".my_card")
console.log(cardsEl);

// fetch the cards raw details
fetch("https://lanciweb.github.io/demo/api/pictures/")
    .then(response => response.json())
    .then(data => {
        // log the data to see what we have
        console.log(data);

        // show single posts using a loot  (through a loop) the posts value saving it in a variable
        for (let i = 0; i < data.length; i++) {
            const thisData = data[i];
            console.log(thisData);

            const thisCard = document.querySelectorAll(".my_card")
            console.log(thisCard);

            // assign the 4 data values to variables through destructuring
            const [thisCardID, thisCardTitle, thisCardDate, thisCardImgURL] = [thisData.id, thisData.title, thisData.date, thisData.url]; //thisCardDetails
            console.log(thisCardID, thisCardTitle, thisCardDate, thisCardImgURL);

            // create a variable that adds a <p> HTML element inside
            const cardsNode = document.createElement("div")
            // make the new paragraph display the generated file
            cardsNode.innerHTML = `
                    <img src="${thisCardImgURL}" alt="">
                    <p class="mt-3 mb-0 google_font_date">${thisCardDate}</p>
                    <h4 class="m-0 google_font_title">${thisCardTitle.toUpperCase()}</h4>`;
            // fix the margins of the new element
            /* cardsNode.classList.add('m-0'); */


            /* console.log(cardsNode); */

            // officially insert the above variable inside every i° element of the HTML
            thisCard[i].appendChild(cardsNode);
        }

    })/* .catch(error => console.error(error)); */



// functions region


/**
 * Adds the structure of the blog posts
 * @returns {string} HTML structure
 */
function addStructure() {
    return `<div class="col">
                <div class="my_card p-3 m-0">
                    <img class="pin" src="./assets/img/pin.svg" alt="">
                </div>
            </div>`
}

/* function addCardsMarkup() {
    return `<img src="${thisCardImgURL}" alt="">
            <p class="">${thisCardDate}</p>
            <h4>${thisCardTitle}</h4>`
} */






