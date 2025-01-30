//Define an array of show objects
const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    showLocation: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    showLocation: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    showLocation: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    showLocation: "San Francisco, CA",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    showLocation: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    showLocation: "San Francisco, CA",
  },
];

// for(let i=0;i<shows.length;i++){
//     //create a div to hold each show
//     const show = document.createElement("div");
//     show.classList.add("show");

//     //create a p tag for each show text
//     //create a p tag for the date heading
//     const date = document.createElement("p");
//     date.classList.add("show__title");
//     date.textContent="Date";
//     //create a p tag for the date text
//     const dateDetail = document.createElement("p");
//     dateDetail.classList.add("show__detail");
//     dateDetail.textContent=shows[i].date;
//     //create a p tag for the venue heading
//     const venue = document.createElement("p");
//     venue.classList.add("show__title");
//     venue.textContent="Venue";
//     //create a p tag for the venue text
//     const venueDetail = document.createElement("p");
//     venueDetail.classList.add("show__detail");
//     venueDetail.textContent=shows[i].venue;
//     //create a p tag for the showLocation heading
//     const showLocation = document.createElement("p");
//     showLocation.classList.add("show__title");
//     showLocation.textContent="Location";
//     //create a p tag for the showLocation text
//     const locationDetail = document.createElement("p");
//     locationDetail.classList.add("show__detail");
//     locationDetail.textContent=shows[i].showLocation;
//     //append the p tags to the show div
//     show.appendChild(date);
//     show.appendChild(dateDetail);
//     show.appendChild(venue);
//     show.appendChild(venueDetail);
//     show.appendChild(showLocation);
//     show.appendChild(locationDetail);
//     //append the show to the shows container
//     showsContainer.appendChild(show);
// }

//select the parent element
const main = document.querySelector("main");

//create a container for shows using div tag
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
let showsContainer = document.createElement('div');
showsContainer.classList.add("shows__container");
//append it with showsSection
showsSection.appendChild(showsContainer);

//create the showTitles for tablet and desktop
let dateTitle = document.createElement('p');
dateTitle.classList.add("show__title-date");
dateTitle.textContent = "DATE";
let venueTitle = document.createElement('p');
venueTitle.classList.add("show__title-venue");
venueTitle.textContent = "VENUE";
let locationTitle = document.createElement('p');
locationTitle.classList.add("show__title-location");
locationTitle.textContent = "LOCATION";

//create a parent div to hold titles for tablet and desktop
const parentTitle = document.createElement('div');
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
//   heading.classList.add("show__title--hidden");
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
  const dateElements = createHeadingAndText("DATE", show.date);
  const venueElements = createHeadingAndText("VENUE", show.venue);
  const locationElements = createHeadingAndText("LOCATION", show.showLocation);

  //Append each child element to show
  showCard.appendChild(dateElements.heading);
  showCard.appendChild(dateElements.text);
  showCard.appendChild(venueElements.heading);
  showCard.appendChild(venueElements.text);
  showCard.appendChild(locationElements.heading);
  showCard.appendChild(locationElements.text);

  //create a button element
  const button = document.createElement("div");
  button.classList.add("button");
  button.textContent = "BUY TICKETS";
  showCard.appendChild(button);

  return showCard;
}

//iterate over array of object
for (let i = 0; i < shows.length; i++) {
  let showCard = createShow(shows[i]);

  //create a divider
  const divider = document.createElement("div");
  divider.classList.add("show__divider");
  //append the card
  showsContainer.appendChild(showCard);
  showsContainer.appendChild(divider);
}

//function to add a modifier class to card on clicking 
const cardSelected = document.querySelectorAll(".show");
cardSelected.addEventListener("click", (event)=>{
  // event.preventDefault();
  console.log("Clicked");
  cardSelected.classList.add('show--active');
});

