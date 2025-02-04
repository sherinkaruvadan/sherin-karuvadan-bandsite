// //Define an array of comment objects
// const comments = [
//   {
//     image: "avatar",
//     name: "Victor Pinto",
//     date: "11/02/2023",
//     text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     image: "avatar",
//     name: "Christina Cabrera",
//     date: "10/28/2023",
//     text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     image: "avatar",
//     name: "Isaac Tadesse",
//     date: "10/20/2023",
//     text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
// ];

const API_KEY = "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4";
//create a class instance for bandSite Api
const commentsInstance = new BandSiteApi(API_KEY);

//functiom to fetch comments

async function fetchComments(){

  const articleComments =  await commentsInstance.getComments();
  console.log(articleComments);
  return articleComments;
}
fetchComments();


//create container for all comments
let commentsSection = document.createElement("section");
commentsSection.classList.add("comments-container");

//select the parent element for appending
const main = document.querySelector("main");
main.appendChild(commentsSection);

//create a comment card
function createCommentCard(comment) {
  //create a div to hold each comment
  const commentCard = document.createElement("article");
  commentCard.classList.add("comment");
  //create elements for each tag in the comment
  //image
  const commentImage = document.createElement("div");
  commentImage.classList.add("comment__image");
  //name
  const commentName = document.createElement("p");
  commentName.classList.add("comment__name");
  commentName.textContent = comment.name;
  //text
  const commentText = document.createElement("p");
  commentText.classList.add("comment__text");
  commentText.textContent = comment.comment;
  //date
  const commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.textContent = new Date(comment.timestamp).toLocaleDateString();

  //create a div to hold the name and text
  const commentNameText = document.createElement("div");
  commentNameText.classList.add("comment__texts-container");
  //append the name and text with the above div
  commentNameText.appendChild(commentName);
  commentNameText.appendChild(commentText);
  //append all elements to the card
  commentCard.appendChild(commentImage);
  commentCard.appendChild(commentNameText);
  commentCard.appendChild(commentDate);

  return commentCard;
}

async function commentCardSection() {
  //update commentsSection before appending new comments
  commentsSection.innerHTML = "";

  const commentsAPI = await fetchComments();

  
  // console.log(commentsAPI);

  for (let i = 0; i < commentsAPI.length; i++) {
    let commentCard = createCommentCard(commentsAPI[i]);
    //create a divider
    var divider = document.createElement("div");
    divider.classList.add("comment__divider");
    commentsSection.appendChild(divider);
    //append each card to the parent section
    commentsSection.appendChild(commentCard);
  }
  divider = document.createElement("div");
  divider.classList.add("comment__divider");
  commentsSection.appendChild(divider);
}
// commentCardSection();

//function to add comment through form
async function handleFormSubmit(event) {
  event.preventDefault();

  const newComment = {
    name: event.target.nameField.value,
    comment: event.target.commentField.value,
  };
  console.log(newComment);
  console.log(typeof newComment);

  //checking condition of string that has only white space in input field
  if (
    event.target.nameField.value.trim().length === 0 ||
    event.target.commentField.value.trim().length === 0
  ) {
    event.target.nameField.classList.add("form__error");
    event.target.commentField.classList.add("form__error");
    event.target.nameField.value = "";
    event.target.commentField.value = "";
    return;
  }
  event.target.nameField.classList.remove("form__error");
  event.target.commentField.classList.remove("form__error");
  //add comment object to array

  const postComment = await commentsInstance.postComment(newComment);

  // comments.unshift(newComment);
  event.target.nameField.value = "";
  event.target.commentField.value = "";
  //call the function to update comments section
  commentCardSection();
}

//add event to form
const commentForm = document.getElementById("comment__form-id");
commentForm.addEventListener("submit", handleFormSubmit);
commentCardSection();


//Remove the error class when clicking inside the input field or text area
document.getElementById('nameField').addEventListener("click",(event)=>{
  nameField.classList.remove('form__error');
});

document.getElementById('commentField').addEventListener("click",(event)=>{
  commentField.classList.remove('form__error');
});