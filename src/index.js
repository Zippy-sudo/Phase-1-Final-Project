const serverURL = "https://final-project-db.onrender.com";
document.addEventListener("DOMContentLoaded", () => {
  fetch(`${serverURL}/games`)
    .then((resp) => resp.json())
    .then((object0) => {
      handleClick0("savedGamesBttn", "unhide");

      const numberOfGames = document.querySelector("span#numberOfGames");
      numberOfGames.innerText = object0.length;

      ImgSlider(object0);

      let newArr = new Array();

      const pSeeMore = document.querySelector("p#seeMore");
      pSeeMore.addEventListener("click", () => {
        const pSlideTitle = document.querySelector("p#slideTitle");
        const gameName = pSlideTitle.innerText.slice(7);
        for (let element0 of object0) {
          if (element0["title"] === gameName) {
            handleClick0("queryDiv", "hide");
            handleClick0("queryDiv1", "hide");
            handleClick0("gameDisplayDiv", "hide");
            handleClick0("gameDisplayDivAdvanced", "unhide");

            const saveButton = document.querySelector("div#extras button");
            const pTitle = document.querySelector("p#title");
            const imgThumbnail = document.querySelector("img#thumbnail");
            const pGenre = document.querySelector("p#genre");
            const pRelease_Date = document.querySelector("p#release_date");
            const pPlatform = document.querySelector("p#platform");
            const pDeveloper = document.querySelector("p#developer");
            const pPublisher = document.querySelector("p#publisher");

            saveButton.setAttribute("id", `${element0.title}`);

            pTitle.innerText = element0.title;
            imgThumbnail.title = element0.title;
            imgThumbnail.src = element0.thumbnail;
            pGenre.innerText = `Genre: ${element0.genre}`;
            pRelease_Date.innerText = `Year Released: ${element0.release_date.slice(
              0,
              4
            )}`;
            pPlatform.innerText = `Platform: ${element0.platform}`;
            pDeveloper.innerText = `Developer: ${element0.developer}`;
            pPublisher.innerText = `Publisher: ${element0.publisher}`;
          }
        }

        const saveButton = document.querySelector("div#extras button");
        saveButton.addEventListener("click", () => {
          handleClick0("queryDiv", "hide");
          handleClick0("queryDiv1", "hide");
          handleClick0("queryDiv1Modified", "hide");
          handleClick0("gameDisplayDiv", "hide");
          handleClick0("gameDisplayDivAdvanced", "hide");
          handleClick0("imgSlider", "hide");
          handleClick0("listDiv", "hide");
          handleClick0("listDivEmpty", "hide");
          handleClick0("savedGameDiv", "unhide");

          let newObj = {};
          for (let element of object0) {
            if (saveButton.id === element.title) {
              newObj = Object.assign({}, element);
            }
          }
          const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(newObj),
          };

          fetch(`${serverURL}/Saved_Games`, configObj)
            .then((resp) => resp.json())
            .then((object1) => {
              fetch(`${serverURL}/Saved_Games`)
                .then((resp) => resp.json())
                .then((object2) => {
                  const savedGames = document.querySelector("div#savedGames");

                  const backBttn = document.createElement("button");
                  backBttn.setAttribute("id", "SavedGamesBack");
                  backBttn.setAttribute("class", "backToMain");
                  savedGames.appendChild(backBttn);

                  for (let element of object2) {
                    const div0 = document.createElement("div");
                    div0.setAttribute("class", "created0");
                    const title = document.createElement("p");
                    title.setAttribute("class", "created1");
                    const img = document.createElement("img");
                    img.setAttribute("src", `${element.thumbnail}`);
                    img.setAttribute("title", `${element.title}`);
                    img.setAttribute("class", "created2");
                    const div1 = document.createElement("div");
                    div1.setAttribute("class", "created3");
                    const genre = document.createElement("p");
                    genre.setAttribute("class", "created4");
                    const release_date = document.createElement("p");
                    release_date.setAttribute("class", "created5");
                    const platform = document.createElement("p");
                    platform.setAttribute("class", "created6");
                    const publisher = document.createElement("p");
                    publisher.setAttribute("class", "created7");
                    const developer = document.createElement("p");
                    developer.setAttribute("class", "created8");
                    const descriptionTitle = document.createElement("p");
                    descriptionTitle.setAttribute("class", "created9");
                    const description = document.createElement("p");
                    description.setAttribute("class", "created10");

                    backBttn.innerText = "Back To Main Page";
                    description.innerText = `${element.short_description}`;
                    title.innerText = `${element.title}`;
                    genre.innerText = `Genre ${element.genre}`;
                    release_date.innerText = `Release Date: ${element.release_date}`;
                    platform.innerText = `Platform: ${element.platform}`;
                    publisher.innerText = `Publisher: ${element.publisher}`;
                    descriptionTitle.innerText = "Description";
                    developer.innerText = `Developer: ${element.developer}`;

                    div1.appendChild(genre);
                    div1.appendChild(release_date);
                    div1.appendChild(platform);
                    div1.appendChild(publisher);
                    div1.appendChild(developer);
                    div1.appendChild(descriptionTitle);
                    div1.appendChild(description);
                    div0.appendChild(title);
                    div0.appendChild(img);
                    div0.appendChild(div1);
                    savedGames.insertBefore(div0, backBttn);
                  }

                  const backToMain = document.querySelector(
                    "button#SavedGamesBack"
                  );
                  backToMain.addEventListener("click", () => {
                    handleClick0("queryDiv", "unhide");
                    handleClick0("queryDiv1", "hide");
                    handleClick0("queryDiv1Modified", "hide");
                    handleClick0("gameDisplayDiv", "hide");
                    handleClick0("gameDisplayDivAdvanced", "hide");
                    handleClick0("gameNotFound", "hide");
                    handleClick0("listDiv", "hide");
                    handleClick0("savedGamesBttn", "unhide");
                    handleClick0("savedGamesDivClear", "hide");
                    handleClick0("imgSlider", "unhide");
                  });
                })
                .catch((error) => console.log(error));
            });
        });
      });

      const queryForm = document.querySelector("form#gameDetails");
      queryForm.addEventListener("submit", () => {
        handleSubmit0(event, object0);
      });

      const pMoreInfoButton = document.querySelector("p#moreInfoButton");
      pMoreInfoButton.addEventListener("click", () => {
        handleClick0("queryDiv", "hide");
        handleClick0("queryDiv1", "hide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "unhide");

        const pTitle = document.querySelector("p#title");
        const saveButton = document.querySelector("div#extras button");
        saveButton.setAttribute("id", `${pTitle.innerText}`);
        const gameName = pTitle.innerText;
        for (let element0 of object0) {
          if (element0.title === gameName) {
            const pPlatform = document.querySelector("p#platform");
            const pPublisher = document.querySelector("p#publisher");
            const pDeveloper = document.querySelector("p#developer");

            pPlatform.innerText = `Platform: ${element0.platform}`;
            pPublisher.innerText = `Publisher: ${element0.publisher}`;
            pDeveloper.innerText = `Developer: ${element0.developer}`;
          }
        }
      });

      const cluelessButton = document.querySelector("button#clueless");
      cluelessButton.addEventListener("click", () => {
        handleClick0("queryDiv", "hide");
        handleClick0("queryDiv1", "unhide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");
      });

      const nextButton = document.querySelector("button#next");
      nextButton.addEventListener("click", () => {
        handleClick0("queryDiv", "hide");
        handleClick0("queryDiv1", "hide");
        handleClick0("queryDiv1Modified", "unhide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("listDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");

        newArr = [];
        const inputType = document.querySelector("input#selectInput");
        const dropDownChoice = document.querySelector("select#input1");
        newArr.push(dropDownChoice.value);

        const spanDropDownChoice = document.querySelector(
          "span#dropDownChoice"
        );
        const pOptions = document.querySelector("p#options");

        if (newArr[0] === "release_date") {
          spanDropDownChoice.innerText = "Release Year";
          inputType.setAttribute("type", "number");
          const dateItems = findUniqueDates(object0, "release_date");
          const dateItems1 = dateItems.slice(0, 4);
          dateItems1.push("etc.");
          pOptions.innerText = dateItems1.join();
        } else if (newArr[0] === "genre") {
          spanDropDownChoice.innerText = newArr[0];
          inputType.setAttribute("type", "text");
          const genreItems = findUniqueValues(object0, "genre");
          const genreItems1 = genreItems.slice(0, 4);
          genreItems1.push("etc.");
          pOptions.innerText = genreItems1.join();
        } else if (newArr[0] === "publisher") {
          spanDropDownChoice.innerText = newArr[0];
          inputType.setAttribute("type", "text");
          const publisherItems = findUniqueValues(object0, "publisher");
          const publisherItems1 = publisherItems.slice(0, 3);
          publisherItems1.push("etc.");
          pOptions.innerText = publisherItems1.join();
        }
      });

      const back = document.querySelector("div#navDiv button#queryDiv1Back");
      back.addEventListener("click", () => {
        handleClick0("queryDiv", "unhide");
        handleClick0("queryDiv1", "hide");
        handleClick0("queryDiv1Modified", "hide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");
        handleClick0("imgSlider", "unhide");
        handleClick0("listDiv", "hide");
        handleClick0("thelistDivError", "hide");
      });

      const formInput2 = document.querySelector("form#input2");
      formInput2.addEventListener("submit", (event) => {
        event.preventDefault();

        const valueNeeded = document.querySelector("input#selectInput");

        handleClick0("imgSlider", "hide");
        handleClick0("queryDiv", "hide");
        handleClick0("queryDiv1", "hide");
        handleClick0("queryDiv1Modified", "hide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");
        handleClick0("listDiv", "unhide");

        let newArr1 = new Array();
        for (let element0 of object0) {
          if (element0[`${newArr[0]}`] === valueNeeded.value) {
            newArr1.push(element0);
          }
        }
        console.log(newArr1.length);
        if (newArr1.length === 0) {
          handleClick0("queryDiv", "hide");
          handleClick0("queryDiv1", "hide");
          handleClick0("queryDiv1Modified", "hide");
          handleClick0("gameDisplayDiv", "hide");
          handleClick0("gameDisplayDivAdvanced", "hide");
          handleClick0("imgSlider", "hide");
          handleClick0("listDivEmptyInit", "hide");
          handleClick0("thelistDivError", "unhide");

          const paramSpan = document.querySelector("span#parameter");
          if (newArr[0] === "release_date") {
            paramSpan.innerText = "Release Year";
          } else paramSpan.innerText = newArr[0];

          const backBttn = document.querySelector(
            "div#listDivEmpty button#listDivBack"
          );
          console.log(backBttn);
          backBttn.addEventListener("click", () => {
            handleClick0("queryDiv", "unhide");
            handleClick0("queryDiv1", "hide");
            handleClick0("queryDiv1Modified", "hide");
            handleClick0("gameDisplayDiv", "hide");
            handleClick0("gameDisplayDivAdvanced", "hide");
            handleClick0("imgSlider", "unhide");
            handleClick0("listDiv", "hide");
            handleClick0("thelistDivError", "hide");
          });
        } else {
          handleClick0("queryDiv", "hide");
          handleClick0("queryDiv1", "hide");
          handleClick0("queryDiv1Modified", "hide");
          handleClick0("gameDisplayDiv", "hide");
          handleClick0("gameDisplayDivAdvanced", "hide");
          handleClick0("imgSlider", "hide");
          handleClick0("thelistDivError", "hide");
          handleClick0("listDivEmptyInit", "unhide");

          let newArr2 = new Array();
          newArr2 = newArr1.slice(0, 3);
          const listDiv = document.querySelector("div#listDiv");

          const backBttn = document.createElement("button");
          backBttn.setAttribute("id", "backToMain");
          backBttn.innerText = "Back To Main";
          listDiv.appendChild(backBttn);

          for (let element0 of newArr2) {
            const div0 = document.createElement("div");
            div0.setAttribute("class", "div0");
            const title = document.createElement("p");
            title.setAttribute("class", "title");
            const img = document.createElement("img");
            img.setAttribute("src", `${element0.thumbnail}`);
            img.setAttribute("title", `${element0.title}`);
            img.setAttribute("class", "img");
            const div1 = document.createElement("div");
            div1.setAttribute("class", "div1");
            const genre = document.createElement("p");
            genre.setAttribute("class", "genre");
            const release_date = document.createElement("p");
            release_date.setAttribute("class", "release_date");
            const platform = document.createElement("p");
            platform.setAttribute("class", "platform");
            const publisher = document.createElement("p");
            publisher.setAttribute("class", "publisher");
            const developer = document.createElement("p");
            developer.setAttribute("class", "developer");
            const descriptionTitle = document.createElement("p");
            descriptionTitle.setAttribute("class", "descriptionTitle");
            const description = document.createElement("p");
            description.setAttribute("class", "description");
            const save = document.createElement("button");
            save.setAttribute("class", "save1");
            save.setAttribute("id", `${element0.title}`);

            description.innerText = `${element0.short_description}`;
            save.innerText = "Save";
            title.innerText = `${element0.title}`;
            genre.innerText = `Genre: ${element0.genre}`;
            release_date.innerText = `Release Date: ${element0.release_date}`;
            platform.innerText = `Platform: ${element0.platform}`;
            publisher.innerText = `Publisher: ${element0.publisher}`;
            descriptionTitle.innerText = "Description";
            developer.innerText = `Developer: ${element0.developer}`;

            div1.appendChild(genre);
            div1.appendChild(release_date);
            div1.appendChild(platform);
            div1.appendChild(publisher);
            div1.appendChild(developer);
            div1.appendChild(descriptionTitle);
            div1.appendChild(description);
            div1.appendChild(save);
            div0.appendChild(title);
            div0.appendChild(img);
            div0.appendChild(div1);
            listDiv.insertBefore(div0, backBttn);
          }

          backBttn.addEventListener("click", () => {
            handleClick0("queryDiv", "unhide");
            handleClick0("queryDiv1", "hide");
            handleClick0("queryDiv1Modified", "hide");
            handleClick0("gameDisplayDiv", "hide");
            handleClick0("gameDisplayDivAdvanced", "hide");
            handleClick0("imgSlider", "unhide");
            handleClick0("listDiv", "hide");
            handleClick0("thelistDivError", "hide");
          });

          const save1 = document.querySelectorAll("div.div1 button.save1");
          for (let element of save1) {
            element.addEventListener("click", (event) => {
              let newObj = {};
              for (let element0 of newArr2) {
                if (element.id === element0.title) {
                  newObj = Object.assign({}, element0);
                }
              }
              const configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify(newObj),
              };

              fetch(`${serverURL}/Saved_Games`, configObj)
                .then((resp) => resp.json())
                .then((object1) => {
                  fetch(`${serverURL}/Saved_Games`)
                    .then((resp) => resp.json())
                    .then((object2) => {
                      handleClick0("queryDiv", "hide");
                      handleClick0("queryDiv1", "hide");
                      handleClick0("queryDiv1Modified", "hide");
                      handleClick0("gameDisplayDiv", "hide");
                      handleClick0("gameDisplayDivAdvanced", "hide");
                      handleClick0("imgSlider", "hide");
                      handleClick0("listDiv", "hide");
                      handleClick0("listDivEmpty", "hide");
                      handleClick0("savedGameDiv", "unhide");
                      handleClick0("savedGamesBttn", "hide");

                      const savedGames =
                        document.querySelector("div#savedGames");

                      const backBttn = document.createElement("button");
                      backBttn.setAttribute("id", "SavedGamesBack");
                      backBttn.setAttribute("class", "backToMain");
                      savedGames.appendChild(backBttn);

                      for (let element of object2) {
                        const div0 = document.createElement("div");
                        div0.setAttribute("class", "created0");
                        const title = document.createElement("p");
                        title.setAttribute("class", "created1");
                        const img = document.createElement("img");
                        img.setAttribute("src", `${element.thumbnail}`);
                        img.setAttribute("title", `${element.title}`);
                        img.setAttribute("class", "created2");
                        const div1 = document.createElement("div");
                        div1.setAttribute("class", "created3");
                        const genre = document.createElement("p");
                        genre.setAttribute("class", "created4");
                        const release_date = document.createElement("p");
                        release_date.setAttribute("class", "created5");
                        const platform = document.createElement("p");
                        platform.setAttribute("class", "created6");
                        const publisher = document.createElement("p");
                        publisher.setAttribute("class", "created7");
                        const developer = document.createElement("p");
                        developer.setAttribute("class", "created8");
                        const descriptionTitle = document.createElement("p");
                        descriptionTitle.setAttribute("class", "created9");
                        const description = document.createElement("p");
                        description.setAttribute("class", "created10");

                        backBttn.innerText = "Back To Main Page";
                        description.innerText = `${element.short_description}`;
                        title.innerText = `${element.title}`;
                        genre.innerText = `Genre ${element.genre}`;
                        release_date.innerText = `Release Date: ${element.release_date}`;
                        platform.innerText = `Platform: ${element.platform}`;
                        publisher.innerText = `Publisher: ${element.publisher}`;
                        descriptionTitle.innerText = "Description";
                        developer.innerText = `Developer: ${element.developer}`;

                        div1.appendChild(genre);
                        div1.appendChild(release_date);
                        div1.appendChild(platform);
                        div1.appendChild(publisher);
                        div1.appendChild(developer);
                        div1.appendChild(descriptionTitle);
                        div1.appendChild(description);
                        div0.appendChild(title);
                        div0.appendChild(img);
                        div0.appendChild(div1);
                        savedGames.insertBefore(div0, backBttn);
                      }

                      const backToMain = document.querySelector(
                        "button#SavedGamesBack"
                      );
                      backToMain.addEventListener("click", () => {
                        handleClick0("queryDiv", "unhide");
                        handleClick0("queryDiv1", "hide");
                        handleClick0("queryDiv1Modified", "hide");
                        handleClick0("gameDisplayDiv", "hide");
                        handleClick0("gameDisplayDivAdvanced", "hide");
                        handleClick0("gameNotFound", "hide");
                        handleClick0("listDiv", "hide");
                        handleClick0("savedGamesBttn", "unhide");
                        handleClick0("savedGamesDivClear", "hide");
                        handleClick0("imgSlider", "unhide");
                      });
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            });
          }
        }
      });

      const toSavedGames = document.querySelector("button#toSavedGames");
      toSavedGames.addEventListener("click", () => {
        handleClick0("queryDiv", "hide");
        handleClick0("queryDiv1", "hide");
        handleClick0("queryDiv1Modified", "hide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");
        handleClick0("imgSlider", "hide");
        handleClick0("listDiv", "hide");
        handleClick0("savedGamesBttn", "hide");
        handleClick0("savedGameDiv", "unhide");

        fetch(`${serverURL}/Saved_Games`)
          .then((resp) => resp.json())
          .then((object2) => {
            if (object2.length === 0) {
              handleClick0("queryDiv", "hide");
              handleClick0("queryDiv1", "hide");
              handleClick0("queryDiv1Modified", "hide");
              handleClick0("gameDisplayDiv", "hide");
              handleClick0("gameDisplayDivAdvanced", "hide");
              handleClick0("imgSlider", "hide");
              handleClick0("thelistDivError", "unhide");
              handleClick0("savedGamesBttn", "hide");
              handleClick0("savedGameDiv", "hide");

              const backBttn = document.querySelector(
                "div#listDivEmpty button#listDivBack"
              );
              backBttn.addEventListener("click", () => {
                handleClick0("queryDiv", "unhide");
                handleClick0("queryDiv1", "hide");
                handleClick0("queryDiv1Modified", "hide");
                handleClick0("gameDisplayDiv", "hide");
                handleClick0("gameDisplayDivAdvanced", "hide");
                handleClick0("imgSlider", "unhide");
                handleClick0("thelistDivError", "hide");
                handleClick0("savedGamesBttn", "unhide");
              });
            } else {
              const savedGames = document.querySelector("div#savedGames");
              const backBttn = document.createElement("button");
              backBttn.innerText = "Back To Main";
              backBttn.setAttribute("class", "backToMain");

              for (let element0 of object2) {
                const div0 = document.createElement("div");
                div0.setAttribute("class", "created0");
                div0.setAttribute("hidden", true);
                const title = document.createElement("p");
                title.setAttribute("class", "created1");
                const img = document.createElement("img");
                img.setAttribute("src", `${element0.thumbnail}`);
                img.setAttribute("title", `${element0.title}`);
                img.setAttribute("class", "created2");
                const div1 = document.createElement("div");
                div1.setAttribute("class", "created3");
                const genre = document.createElement("p");
                genre.setAttribute("class", "created4");
                const release_date = document.createElement("p");
                release_date.setAttribute("class", "created5");
                const platform = document.createElement("p");
                platform.setAttribute("class", "created6");
                const publisher = document.createElement("p");
                publisher.setAttribute("class", "created7");
                const developer = document.createElement("p");
                developer.setAttribute("class", "created8");
                const descriptionTitle = document.createElement("p");
                descriptionTitle.setAttribute("class", "created9");
                const description = document.createElement("p");
                description.setAttribute("class", "created10");

                description.innerText = `${element0.short_description}`;
                title.innerText = `${element0.title}`;
                genre.innerText = `Genre ${element0.genre}`;
                release_date.innerText = `Release Date: ${element0.release_date}`;
                platform.innerText = `Platform: ${element0.platform}`;
                publisher.innerText = `Publisher: ${element0.publisher}`;
                descriptionTitle.innerText = "Description";
                developer.innerText = `Developer: ${element0.developer}`;

                savedGames.appendChild(backBttn);
                div1.appendChild(genre);
                div1.appendChild(release_date);
                div1.appendChild(platform);
                div1.appendChild(publisher);
                div1.appendChild(developer);
                div1.appendChild(descriptionTitle);
                div1.appendChild(description);
                div0.appendChild(title);
                div0.appendChild(img);
                div0.appendChild(div1);
                savedGames.insertBefore(div0, backBttn);

                const backToMain = document.querySelector(
                  "div#savedGames button.backToMain"
                );
                backToMain.addEventListener("click", () => {
                  handleClick0("savedGamesDivClear", "hide");
                  handleClick0("queryDiv", "unhide");
                  handleClick0("queryDiv1", "hide");
                  handleClick0("queryDiv1Modified", "hide");
                  handleClick0("gameDisplayDiv", "hide");
                  handleClick0("gameDisplayDivAdvanced", "hide");
                  handleClick0("listDiv", "hide");
                  handleClick0("listDivEmptyInit", "hide");
                  handleClick0("savedGamesBttn", "unhide");
                  handleClick0("imgSlider", "unhide");
                });
              }
            }
          });
      });
    });
});

function findUniqueValues(object1, targetAttribute1) {
  let newArr0 = new Array();
  let newArr1 = new Array();
  for (let element0 of object1) {
    newArr0.push(element0[`${targetAttribute1}`]);
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
function handleSubmit0(event, object3) {
  event.preventDefault();

  const answer = document.querySelector("input#gameName").value;

  for (let element0 of object3) {
    if (element0["title"] === answer) {
      handleClick0("gameDisplayDiv", "unhide");
      handleClick0("queryDiv", "hide");
      handleClick0("queryDiv1", "hide");
      handleClick0("queryDiv1Modified", "hide");
      handleClick0("gameDisplayDivAdvanced", "hide");
      handleClick0("imgSlider", "hide");
      handleClick0("thelistDivError", "hide");

      const titleToDisplay = document.querySelector("p#title");
      const thumbnailToDisplay = document.querySelector("img#thumbnail");
      const genreToDisplay = document.querySelector("p#genre");
      const dateToDisplay = document.querySelector("p#release_date");
      const buttonToDisplay = document.querySelector("p#moreInfobutton");

      titleToDisplay.innerText = element0.title;
      thumbnailToDisplay.src = element0.thumbnail;
      thumbnailToDisplay.title = element0.title;
      genreToDisplay.innerText = `Genre:  ${element0.genre}`;
      dateToDisplay.innerText = `Release Year: ${element0["release_date"].slice(
        0,
        4
      )}`;
      buttonToDisplay.innerText = "More Info";
    } else {
      handleClick0("gameDisplayDiv", "hide");
      handleClick0("queryDiv", "hide");
      handleClick0("queryDiv1", "hide");
      handleClick0("queryDiv1Modified", "hide");
      handleClick0("gameDisplayDivAdvanced", "hide");
      handleClick0("imgSlider", "hide");
      handleClick0("thelistDivError", "unhide");

      const backBttn = document.querySelector(
        "div#listDivEmpty button#listDivBack"
      );
      backBttn.addEventListener("click", () => {
        handleClick0("queryDiv", "unhide");
        handleClick0("queryDiv1", "hide");
        handleClick0("queryDiv1Modified", "hide");
        handleClick0("gameDisplayDiv", "hide");
        handleClick0("gameDisplayDivAdvanced", "hide");
        handleClick0("imgSlider", "unhide");
        handleClick0("thelistDivError", "hide");
      });
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
    newArr3.push(element4["release_date"].slice(0, 4));
  }

  const img = document.querySelector("img#slide");
  const title = document.querySelector("p#slideTitle");
  const genre = document.querySelector("p#slideGenre");
  const releaseYear = document.querySelector("p#slideRelease");
  setInterval(() => {
    img.src = "";
    title.innerText = "";
    genre.innerText = "";
    releaseYear.innerText = "";

    img.src = newArr0.pop();
    title.innerText = `Title: ${newArr1.pop()}`;
    genre.innerText = `Genre: ${newArr2.pop()}`;
    releaseYear.innerText = `Release Year: ${newArr3.pop()}`;
  }, 10000);
}

function handleClick0(var0, val0) {
  const hideUnhide = (arr, val) => {
    if (val === "hide") {
      for (let element0 of arr) {
        element0.hidden = true;
      }
    } else if (val === "unhide") {
      for (let element0 of arr) {
        element0.hidden = false;
      }
    } else console.error("Invalid Input");
  };

  if (var0 === "gameDisplayDiv") {
    const gameDisplayDiv = document.querySelector("div#gameDisplayDiv");
    const prettyDiv = document.querySelector("div#prettyDiv");
    const pTitle = document.querySelector("p#title");
    const imgThumbnail = document.querySelector("img#thumbnail");
    const divMoreInfo = document.querySelector("div#moreInfo");
    const pGenre = document.querySelector("p#genre");
    const pRelease_Date = document.querySelector("p#release_date");
    const pMoreInfoButton = document.querySelector("p#moreInfobutton");

    let newArr0 = new Array();
    newArr0.push(
      gameDisplayDiv,
      prettyDiv,
      pTitle,
      imgThumbnail,
      divMoreInfo,
      pGenre,
      pRelease_Date,
      pMoreInfoButton
    );
    hideUnhide(newArr0, `${val0}`);
  } else if (var0 === "gameDisplayDivAdvanced") {
    const gameDisplayDiv = document.querySelector("div#gameDisplayDiv");
    const prettyDiv = document.querySelector("div#prettyDiv");
    const pTitle = document.querySelector("p#title");
    const imgThumbnail = document.querySelector("img#thumbnail");
    const divMoreInfo = document.querySelector("div#moreInfo");
    const pGenre = document.querySelector("p#genre");
    const pRelease_Date = document.querySelector("p#release_date");
    const pDeveloper = document.querySelector("p#developer");
    const pPublisher = document.querySelector("p#publisher");
    const divExtras = document.querySelector("div#extras");
    const save = document.querySelector("div#extras button");

    let newArr1 = new Array();
    newArr1.push(
      gameDisplayDiv,
      prettyDiv,
      pTitle,
      imgThumbnail,
      divMoreInfo,
      pGenre,
      pRelease_Date,
      save,
      pPublisher,
      pDeveloper,
      divExtras
    );
    hideUnhide(newArr1, `${val0}`);
  } else if (var0 === "queryDiv") {
    const queryDiv = document.querySelector("div#queryDiv");
    const requestParagrah = document.querySelector("p#requestParagraph");
    const gameDetailsForm = document.querySelector("form#gameDetails");
    const gameNameInput = document.querySelector("input#gameName");
    const cluelessButton = document.querySelector("button#clueless");

    let newArr2 = new Array();
    newArr2.push(
      queryDiv,
      requestParagrah,
      gameDetailsForm,
      gameNameInput,
      cluelessButton
    );
    hideUnhide(newArr2, `${val0}`);
  } else if (var0 === "queryDiv1") {
    const queryDiv1 = document.querySelector("div#queryDiv1");
    const input1Label = document.querySelector("label#input1Label");
    const input1 = document.querySelector("select#input1");
    const optionGenre = document.querySelector("option#optionGenre");
    const optionReleaseYear = document.querySelector(
      "option#optionReleaseYear"
    );
    const optionPublisher = document.querySelector("option#optionPublisher");
    const backButton = document.querySelector("button#queryDiv1Back");
    const nextButton = document.querySelector("button#next");
    const navDiv = document.querySelector("div#navDiv");

    let newArr3 = new Array();
    newArr3.push(
      queryDiv1,
      input1Label,
      input1,
      optionGenre,
      optionReleaseYear,
      optionPublisher,
      navDiv,
      backButton,
      nextButton
    );
    hideUnhide(newArr3, `${val0}`);
  } else if (var0 === "queryDiv1Modified") {
    const queryDiv1 = document.querySelector("div#queryDiv1");
    const optionGenre = document.querySelector("option#optionGenre");
    const optionReleaseYear = document.querySelector(
      "option#optionReleaseYear"
    );
    const optionPublisher = document.querySelector("option#optionPublisher");
    const backButton = document.querySelector("button.backtoMain");
    const navDiv = document.querySelector("div#navDiv");
    const input2Label = document.querySelector("label#input2Label");
    const input2 = document.querySelector("form#input2");
    const selectInput = document.querySelector("input#selectInput");
    const dropDownChoice = document.querySelector("span#dropDownChoice");
    const pOptions = document.querySelector("p#options");

    let newArr4 = new Array();
    newArr4.push(
      pOptions,
      dropDownChoice,
      input2Label,
      input2,
      selectInput,
      queryDiv1,
      optionGenre,
      optionReleaseYear,
      optionPublisher,
      navDiv,
      backButton
    );
    hideUnhide(newArr4, `${val0}`);
  } else if (var0 === "imgSlider") {
    const divImgSlider = document.querySelector("div#imgSlider");
    const imgDiv = document.querySelector("div#imgDiv");
    const imgSlide = document.querySelector("img#slide");
    const slideDetails = document.querySelector("div#slideDetails");
    const pSlideTitle = document.querySelector("p#slideTitle");
    const pSlideGenre = document.querySelector("p#slideGenre");
    const pSlideRelease = document.querySelector("p#slideRelease");
    const pseeMore = document.querySelector("p#seeMore");

    let newArr5 = new Array();
    newArr5.push(
      divImgSlider,
      imgDiv,
      imgSlide,
      slideDetails,
      pSlideTitle,
      pSlideGenre,
      pSlideRelease,
      pseeMore
    );
    hideUnhide(newArr5, `${val0}`);
  } else if (var0 === "listDiv") {
    const listDiv = document.querySelector("div#listDiv");
    listDiv.innerHTML = "";
  } else if (var0 === "listDivEmptyInit") {
    const listDiv = document.querySelector("div#listDiv");

    let newArr7 = new Array();
    newArr7.push(listDiv);
    hideUnhide(newArr7, `${val0}`);
  } else if (var0 === "thelistDivError") {
    const listDivEmpty = document.querySelector("div#listDivEmpty");
    const pError = document.querySelector("p#gameNotFound");
    const pVar = document.querySelector("span#parameter");
    const listDivBack = document.querySelector("button#listDivBack");

    let newArr7 = new Array();
    newArr7.push(listDivEmpty, pError, pVar, listDivBack);
    hideUnhide(newArr7, `${val0}`);
  } else if (var0 === "savedGamesBttn") {
    const toSavedGames = document.querySelector("button#toSavedGames");

    let newArr8 = new Array();
    newArr8.push(toSavedGames);
    hideUnhide(newArr8, `${val0}`);
  } else if (var0 === "savedGameDiv") {
    const savedGameDiv = document.querySelector("div#savedGames");

    let newArray10 = new Array();
    newArray10.push(savedGameDiv);
    hideUnhide(newArray10, `${val0}`);
  } else if (var0 === "savedGamesDivClear") {
    const savedGameDiv = document.querySelector("div#savedGames");

    savedGameDiv.innerHTML = " ";
  }
}
