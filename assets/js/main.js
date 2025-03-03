// assign the DOM node of the container
const postsEl = document.getElementById("posts_container")


// fetch the cards raw details
fetch("https://lanciweb.github.io/demo/api/pictures/")
    .then(response => response.json())
    .then(data => {
        // log the data to see what we have
        /* console.log(data); */

        // create posts dinamically based on how many are coming from the recource
        addStructure(data.length)

        // select the DOM node of the single cards created above
        const cardsEl = document.querySelectorAll(".my_card")

        // a loop is used to apply all the incoming data to our posts
        for (let i = 0; i < data.length; i++) {
            const thisData = data[i];
            /* console.log("Raw data as singular objects:", thisData); */

            // cardsEl = document.querySelectorAll(".my_card")
            const thisCard = cardsEl;
            /* console.log("Cards as singular objects:", thisCard); */

            // assign 3 data values to variables through destructuring (skipping the first)
            const [thisCardTitle, thisCardDate, thisCardImgURL] = [thisData.title, thisData.date, thisData.url];
            /* console.log("Data extracted and shown as a string:", "Title is", thisCardTitle,"Date is", thisCardDate,"Img URL is", thisCardImgURL); */

            // create a variable that adds a <div> HTML element inside
            const cardsNode = document.createElement("div");

            // make the new variable display the incoming data w/markup
            cardsNode.innerHTML = addimages(thisCardImgURL, thisCardDate, thisCardTitle);
            /* console.log("These are the upcoming additions to the HTML:", cardsNode); */

            // officially insert the above markup inside every single i° element of the HTML
            thisCard[i].appendChild(cardsNode);


            // overlay region below

            // same as above for the overlay
            const thisOverlay = document.querySelectorAll(".card_overlay_container");
            const overlayNode = document.createElement("div");
            overlayNode.innerHTML = addThisOverlay(thisCardImgURL);

            thisOverlay[i].appendChild(overlayNode);
        }

        // since the overlay was created above, we can now use the DOM nodes that were added in its markup
        const normalPicEl = document.querySelectorAll(".my_normal_pic");
        const overlayEl = document.querySelectorAll(".my_overlay");

        // this is a button inside the overlay markup created above
        const closeOverlayEl = document.querySelectorAll(".close_my_overlay");
        /* console.log(normalPicEl, overlayEl, closeOverlayEl); */

        // to open the overlay when clicking on a picture
        picOverlayOpen(normalPicEl, overlayEl)

        // make the freshly displayed button close the overlay
        picOverlayClose(closeOverlayEl, overlayEl)

    }).catch(error => console.error(error));

// functions region

/**
 * Uses the addThisStructure()'s markup in a loop to create as many posts as needed
 * @param {*} num an arbitrary numerical value that can be changed
 */
function addStructure(num) {
    for (let i = 0; i < num; i++) {
        postsEl.innerHTML += addThisStructure()
    }
}

/**
 * Adds the structure of a blog post
 * @returns {string} HTML structure
 */
function addThisStructure() {
    return `<div class="col">
                <div class="my_card position-relative p-3 m-0">
                    <img class="pin" src="./assets/img/pin.svg" alt="">
                </div>
                <div class="card_overlay_container"></div>
            </div>`
}

/**
 * Fills in the details of a post
 * @param {*} picUrl URL of a picture that comes from the fetched data
 * @param {*} Date Date of the picture that comes from the fetched data
 * @param {*} Title Title of the picture that comes from the fetched data
 * @returns {String} HTML markup
 */
function addimages(picUrl, Date, Title) {
    return `<img class="my_normal_pic" src="${picUrl}" alt="">
             <p class="mt-3 mb-0 google_font_date">${Date}</p>
             <h4 class="m-0 google_font_title">${Title.toUpperCase()}</h4>`
}

/**
 * Creates an HTML structure for the focus overlay 
 * @param {*} sameUrl this must be the same as the fetched picture's URL value
 * @returns {String} HTML markup
 */
function addThisOverlay(sameUrl) {
    return `<div class="my_overlay d-none">
                <img class="my_overlay_pic" src="${sameUrl}" alt="" />
                <button class="close_my_overlay bg-transparent btn text-light m-0 p-0" type="button"> <i class="fa-solid fa-xmark"></i> </button>
            </div>`
}

/**
 * Makes a single-element-focus style overlay appear for each element 
 * @param {*} pics must be the DOM node of the picture to focus on
 * @param {*} overlay the overlay structure
 * @returns an active focus-overlay for a single item
 */
function picOverlayOpen(pics, overlay) {

    for (let i = 0; i < pics.length; i++) {
        const thisPic = pics[i];
        console.log(thisPic);

        thisPic.addEventListener("click", () => {
            overlay[i].classList.remove("d-none")
        })
    }
}

/**
 * Makes the focus overlay disappear
 * @param {*} close_buttons must be teh DOM node of the chosen close button
 * @param {*} overlay the overlay structure
 * @returns a disappearence of the overlay through the d-none booststrap class
 */
function picOverlayClose(close_buttons, overlay) {

    for (let i = 0; i < close_buttons.length; i++) {
        const thisCloseButton = close_buttons[i];

        thisCloseButton.addEventListener("click", () => {
            overlay[i].classList.add("d-none")
        })
    }
}