import Hikes from './hikes.js';
import Comments from './comments.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
const comments = new Comments('comments');

window.addEventListener('load', () => {
  myHikes.showHikeList();
});

// document.getElementById("commntBtn").addEventListener("submit", function() {
//   event.preventDefault();
//   // document.getElementById("demo").innerHTML = "Hello World";
// });



document.getElementById("commentBtn").addEventListener("submit", (event) => {
  event.preventDefault();
  processSubmission();
});

function processSubmission() {
  let comment = document.getElementById("comment").value.trim();
  let hikeName = document.getElementById("hikeName").value;

  const newComment = {
    name: hikeName,
    date: new Date(),
    content: comment,
    type: hike
  };

  let commentList = comments.getAllComments();

  commentList.append(newComment);

  comments.showCommentList();
}

// TODO LIST
// 1) HIKES LOAD, LIST COMMENTS WITH EACH HIKE
// 2) HIKE DETAILS AND ALL COMMENTS FOR THAT HIKE, INPUTTED COMMENT IS WITH THE HIKE DETAILS
// 3) SUBMIT HIKE:
//    A) COMMENT IS SAVED AND SINGLE HIKE IS RELOADED WITH NEW COMMENT IN DETAILS
//    B) HIKE COMMENTS SHOW ONLY WITH THE HIKE IT WAS ADDED FOR (COMMENT TYPE)