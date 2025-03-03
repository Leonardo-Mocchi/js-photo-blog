// assign the DOM node of the container
const postsEl = document.getElementById("posts_container")

// create 6 posts (to add more, simply edit the 6 below)
addStructure(6)

// select the DOM node of the single cards created above
const cardsEl = document.querySelectorAll(".my_card")
/* console.log(cardsEl); */




// fetch the cards raw details
fetch("https://lanciweb.github.io/demo/api/pictures/")
    .then(response => response.json())
    .then(data => {
        // log the data to see what we have
        /* console.log(data); */

        // show single posts using a loot  (through a loop) the posts value saving it in a variable
        for (let i = 0; i < data.length; i++) {
            const thisData = data[i];
            /* console.log(thisData); */

            const thisCard = document.querySelectorAll(".my_card")
            /* console.log(thisCard); */

            // assign the 4 data values to variables through destructuring
            const [thisCardID, thisCardTitle, thisCardDate, thisCardImgURL] = [thisData.id, thisData.title, thisData.date, thisData.url];
            /* console.log(thisCardID, thisCardTitle, thisCardDate, thisCardImgURL); */

            // create a variable that adds a <div> HTML element inside
            const cardsNode = document.createElement("div")
            // make the new div display the generated datas w/markup
            cardsNode.innerHTML = `
                    <img class="my_normal_pic" src="${thisCardImgURL}" alt="">
                    <p class="mt-3 mb-0 google_font_date">${thisCardDate}</p>
                    <h4 class="m-0 google_font_title">${thisCardTitle.toUpperCase()}</h4>`;


            /* console.log(cardsNode); */

            // officially insert the above variable inside every i° element of the HTML
            thisCard[i].appendChild(cardsNode);

        }

        const normalPicEl = document.querySelectorAll(".my_normal_pic")
        const closeOverlayEl = document.querySelectorAll(".close_my_overlay")
        const overlayEl = document.querySelectorAll(".my_overlay")
        const overlayPicEl = document.querySelectorAll(".my_overlay_pic")
        console.log(normalPicEl, closeOverlayEl, overlayEl, overlayPicEl);

        picOverlayOpen(normalPicEl)

        function picOverlayOpen(arr) {

            for (let i = 0; i < arr.length; i++) {
                const thisPic = arr[i];
                console.log(thisPic);

                thisPic.addEventListener("click", () => {
                    overlayEl[i].classList.remove("d-none")
                })
            }
        }

        picOverlayClose(closeOverlayEl)

        function picOverlayClose(arr) {

            for (let i = 0; i < arr.length; i++) {
                const thisCloseButton = arr[i];

                thisCloseButton.addEventListener("click", () => {
                    overlayEl[i].classList.add("d-none")
                })
            }
        }

    }).catch(error => console.error(error));


// overlay region

addOverlays(cardsEl)








// functions region

function addStructure(num) {
    for (let i = 0; i < num; i++) {
        //create posts by adding them as HTML
        postsEl.innerHTML += addThisStructure()
    }
}

/**
 * Adds the structure of the blog posts
 * @returns {string} HTML structure
 */
function addThisStructure() {
    return `<div class="col">
                <div class="my_card p-3 m-0">
                    <img class="pin" src="./assets/img/pin.svg" alt="">
                </div>
            </div>`
}

function addOverlays(arr) {
    for (let i = 0; i < arr.length; i++) {
        const thisCard = arr[i];
        thisCard.innerHTML += addThisOverlay()
    }
}

function addThisOverlay() {
    return `<div class="my_overlay d-none">
                <img class="my_overlay_pic" src='https://picsum.photos/400/400' alt='' />
                <button class="close_my_overlay bg-transparent btn text-light m-0 p-0" type="button"> <i class="fa-solid fa-xmark"></i> </button>
            </div>`
}