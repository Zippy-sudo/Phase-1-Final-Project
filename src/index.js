document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/games")
        .then(resp => resp.json())
        .then(object0 => {
            const numberOfGames = document.querySelector("span#numberOfGames");
            numberOfGames.innerText = object0.length;

            ImgSlider(object0);
            const queryForm = document.querySelector("form#gameDetails")
            queryForm.addEventListener("submit", () => {
                handleSubmit(event, object0);
            })
            const cluelessButton = document.querySelector("button#clueless");
            cluelessButton.addEventListener("click", () => {
                handleClick(object0);
            })
        });
})

function findUniqueValues(object1, targetAttribute1) {
    let newArr0 = new Array();
    let newArr1 = new Array();
    for (let element0 of object1) {
        newArr0.push(element0[`${targetAttribute1}`])
    }
    for (let element1 of newArr0) {
        if (newArr1.indexOf(element1) < 0) {
            newArr1.push(element1);
        }
    }
    return newArr1;
}
function findUniqueDates(object2, targetAttribute2) {
    let newArr0 = new Array();
    let newArr1 = new Array();
    let newArr2 = new Array();

    for (let element0 of object2) {
        newArr0.push(element0[`${targetAttribute2}`]);
    }
    for (let element1 of newArr0) {
        if (newArr1.indexOf(element1) < 0) {
            newArr1.push(element1.slice(0, 4));
        }
    }
    for (let element2 of newArr1) {
        if (newArr2.indexOf(element2) < 0) {
            newArr2.push(element2);
        }
    }
    return newArr2;
}
function handleSubmit(event, object3) {
    event.preventDefault();

    const answer = document.querySelector("input#gameName").value;
    for (let element0 of object3) {
        if (element0["title"] === answer) {

            const titleToDisplay = document.querySelector("p#title");
            const thumbnailToDisplay = document.querySelector("img#thumbnail");
            const genreToDisplay = document.querySelector("p#genre");
            const dateToDisplay = document.querySelector("p#release_date");
            const buttonToDisplay = document.querySelector("p#moreInfobutton");

            titleToDisplay.innerText = element0.title;

            thumbnailToDisplay.src = element0.thumbnail;
            thumbnailToDisplay.title = element0.title;
            genreToDisplay.innerText = `Genre:  ${element0.genre}`;
            dateToDisplay.innerText = `Release Year: ${element0["release_date"].slice(0, 4)}`;
            buttonToDisplay.removeAttribute("hidden");
            buttonToDisplay.innerText = "More Info";
        }
    }
    event.target.reset();
}
function ImgSlider(object4) {
    const imgSlider = document.querySelector("div#imgSlider");
    let newArr0 = new Array();
    let newArr1 = new Array();
    let newArr2 = new Array();
    let newArr3 = new Array();

    for (let element1 of object4) {
        newArr0.push(element1["thumbnail"]);
    }
    for (let element2 of object4) {
        newArr1.push(element2["title"]);
    }
    for (let element3 of object4) {
        newArr2.push(element3["genre"]);
    }
    for (let element4 of object4) {
        newArr3.push(element4["release_date"].slice(0,4))
    }

    const img = document.querySelector("img#slide");
    const title = document.querySelector("p#slideTitle");
    const genre = document.querySelector("p#slideGenre");
    const releaseYear = document.querySelector("p#slideRelease");
    setInterval(() => {
        img.src = "";
        title.innerText = "";
        genre.innerText ="";
        releaseYear.innerText ="";

        img.src = newArr0.pop();
        title.innerText = `Title: ${newArr1.pop()}`;
        genre.innerText = `Genre: ${newArr2.pop()}`;
        releaseYear.innerText = `Release Year: ${newArr3.pop()}`;
    }, 10000)
}
function handleClick(object5) {
    console.log("Hello, World!");
}
// function displaySecondForm(object3, newArr1) {

//     const queryParagraph = document.querySelector("p#requestParagraph");
//     const queryForm = document.querySelector("form#gameDetails");
//     const gameNameInput = document.querySelector("input#gameName");
//     const cluelessbutton = document.querySelector("button#clueless");

//     gameNameInput.remove();
//     cluelessbutton.remove();
//     queryParagraph.innerText = "Please enter the details of the game you are looking for below";

//     const createDOMElements = (arr) => {
//         for (let element0 of arr) {
//             const select = document.createElement("select");
//             select.setAttribute("id", `${element0}`);
//             select.style.size = "2"
//             select.classList.add("select0");
//             queryForm.appendChild(select);
//         }
//     }
//     createDOMElements(newArr1);

//     const createDropdowns = (object) => {
//         const selectList = document.querySelectorAll("select.select0");
//         for (let element4 of selectList) {
//             createDropdown(object, element4.id, element4);
//         }
//     }
//     createDropdowns(object3);

//     const createButton = () => {
//         const search = document.createElement("button");
//         search.innerText = "SEARCH";
//         search.addEventListener("click", () => {
//             handleFormSubmit();
//         })
//         queryForm.appendChild(search);
//     }
//     createButton();
// }
// function createDropdown(object4, targetAttribute3, targettedSelect1) {
//     let newArr0 = findUniqueValues(object4, targetAttribute3);
//     createOption(newArr0, targettedSelect1);
// }
// function createOption(newArr2, targettedSelect2) {
//     for (let element0 of newArr2) {
//         const option = document.createElement("option");
//         option.setAttribute("value", element0);
//         option.innerText = element0;
//         targettedSelect2.appendChild(option);
//     }
// }
// function handleFormSubmit(event) {
//     event.preventDefault();

//     console.log("Hello, World!");

//     event.target.reset();
// }
// function handleClick(object5, newArr3) {
//     console.log("Hello")
//     displaySecondForm(object5, newArr3);
// }