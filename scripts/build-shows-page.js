
const API_KEY = "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4";
//create a class instance for bandSite Api
const showsInstance = new BandSiteApi(API_KEY);

//function to fetch show details
async function fetchShows() {
  //call the class method
  const articles = await showsInstance.getShows();
  //iterate over array of object
  for (let i = 0; i < articles.length; i++) {
    let showCard = createShow(articles[i]);

    showsContainer.appendChild(showCard);
  }

  //add a modifier class to card on clicking
  const cardSelected = document.querySelectorAll(".show");
  console.log(cardSelected);

  cardSelected.forEach((card) => {
    card.addEventListener("click", (event) => {
      cardSelected.forEach((anotherCard) => {
        anotherCard.classList.remove("show--active");
      });
      card.classList.add("show--active");
    });
  });
}

fetchShows();

//select the parent element for comment section
const main = document.querySelector("main");

//create a container for shows using section tag
let showsSection = document.createElement("section");
showsSection.classList.add("shows");
main.appendChild(showsSection);

//create an h2 Element for Shows
let showsTitle = document.createElement("h2");
showsTitle.classList.add("shows__title");
showsTitle.textContent = "Shows";
//append it with showsSection
showsSection.appendChild(showsTitle);

//create a container for holding shows
let showsContainer = document.createElement("div");
showsContainer.classList.add("shows__container");
//append it with showsSection
showsSection.appendChild(showsContainer);

//create the showTitles for tablet and desktop
let dateTitle = document.createElement("p");
dateTitle.classList.add("show__title-date");
dateTitle.textContent = "DATE";
let venueTitle = document.createElement("p");
venueTitle.classList.add("show__title-venue");
venueTitle.textContent = "VENUE";
let locationTitle = document.createElement("p");
locationTitle.classList.add("show__title-location");
locationTitle.textContent = "LOCATION";

//create a parent div to hold titles for tablet and desktop
const parentTitle = document.createElement("div");
parentTitle.classList.add("show__title--parent");

//append all show titles to parent div

parentTitle.appendChild(dateTitle);
parentTitle.appendChild(venueTitle);
parentTitle.appendChild(locationTitle);

//append the div to div with class shows__container
showsContainer.appendChild(parentTitle);

//function to create title and text tag
function createHeadingAndText(title, detail) {
  const heading = document.createElement("p");
  heading.classList.add("show__title");
  heading.textContent = title;
  const text = document.createElement("p");
  text.classList.add("show__detail");
  text.textContent = detail;
  return { heading, text };
}

//function to create a Card for each Show
function createShow(show) {
  //create a div to hold each show
  const showCard = document.createElement("article");
  showCard.classList.add("show");

  //use createTitleAndDetail function to create the heading and text with values
  const dateElements = createHeadingAndText(
    "DATE",
    new Date(show.date).toDateString()
  );
  const venueElements = createHeadingAndText("VENUE", show.place);
  const locationElements = createHeadingAndText("LOCATION", show.location);

  //Append each child element to show
  showCard.appendChild(dateElements.heading);
  showCard.appendChild(dateElements.text);
  showCard.appendChild(venueElements.heading);
  showCard.appendChild(venueElements.text);
  showCard.appendChild(locationElements.heading);
  showCard.appendChild(locationElements.text);

  //create a button element
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "BUY TICKETS";
  showCard.appendChild(button);

  return showCard;
}
