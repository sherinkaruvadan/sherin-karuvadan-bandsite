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

async function fetchComments() {
  try {
    const articleComments = await commentsInstance.getComments();
    console.log(articleComments);
    return articleComments;
  } catch (error) {
    console.error(error);
  }
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
  //comment text
  const commentText = document.createElement("p");
  commentText.classList.add("comment__text");
  commentText.textContent = comment.comment;
  //date
  const commentDate = document.createElement("p");
  commentDate.classList.add("comment__date");
  commentDate.textContent = timeStamp(comment.timestamp);

  //create a delete icon
  const commentDelete = document.createElement("button");
  commentDelete.classList.add("button__delete");
  commentDelete.textContent = "DELETE";
  commentDelete.addEventListener("click", ()=>handleCommentDelete(comment.id, commentDelete));

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
  commentCard.appendChild(commentDelete);
  return commentCard;
}

async function commentCardSection() {
  try {
    //update commentsSection before appending new comments
    commentsSection.innerHTML = "";

    const commentsAPI = await fetchComments();

    for (let i = 0; i < commentsAPI.length; i++) {
      let commentCard = createCommentCard(commentsAPI[i]);
      //create a divider
      // let divider = document.createElement("div");
      // divider.classList.add("comment__divider");
      // commentsSection.appendChild(divider);
      //append each card to the parent section
      commentsSection.appendChild(commentCard);
    }
    // divider = document.createElement("div");
    // divider.classList.add("comment__divider");
    // commentsSection.appendChild(divider);
  } catch (error) {
    console.error(error);
  }
}

//function to add comment through form
async function handleFormSubmit(event) {
  event.preventDefault();

  const nameFieldEl = document.getElementById('nameField')
  const commentFieldEl = document.getElementById('commentField')
  
  const newComment = {
    name: nameFieldEl.value,
    comment: commentFieldEl.value,
  };

  //checking condition of string that has only white space in input field
  if (
    nameFieldEl.value.trim().length === 0 ||
    commentFieldEl.value.trim().length === 0
  ) {
    nameFieldEl.classList.add("form__error");
    commentFieldEl.classList.add("form__error");
    nameFieldEl.value = "";
    commentFieldEl.value = "";
    return;
  }
  nameFieldEl.classList.remove("form__error");
  commentFieldEl.classList.remove("form__error");

  try {
    //add or post comment to the API
    const postComment = await commentsInstance.postComment(newComment);

    // comments.unshift(newComment);
    nameFieldEl.value = "";
    commentFieldEl.value = "";
    //call the function to update comments section
    commentCardSection();
  } catch (error) {
    console.error(error);
  }
}

//add event to form
const commentForm = document.getElementById("comment__form-id");
commentForm.addEventListener("submit", handleFormSubmit);
commentCardSection();

// function to delete comment
async function handleCommentDelete(commentId, buttonElement){
  try{
    const response = await commentsInstance.deleteComment(commentId)
    const commentCard = buttonElement.closest(".comment");
    const divider = buttonElement.closest(".comment__divider");
    if(commentCard){
      commentCard.remove();
      divider.remove();
    }
    commentCardSection();
  }catch(error){
    console.error(error);
  }
}

//Remove the error class when clicking inside the input field or text area
document.getElementById("nameField").addEventListener("click", (event) => {
  nameField.classList.remove("form__error");
});

document.getElementById("commentField").addEventListener("click", (event) => {
  commentField.classList.remove("form__error");
});


//function to display the date from timestamp in a user friendly approach
function timeStamp(timestamp) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  if (minutes < 1) {
    return "Just Now";
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hour ago`;
  } else {
    return new Date(timestamp).toLocaleDateString();
  }
}
