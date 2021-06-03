import Hikes from './hikes.js';
import Comments from './comments.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
const comments = new Comments('comments');

window.addEventListener('load', () => {
  myHikes.showHikeList();
  comments.loadPersistent();
  comments.showCommentList();
});

document.addEventListener("click", () => {
  comments.showCommentList();
});

document.getElementById("commentForm").addEventListener("submit", (event) => {
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
    type: "hike"
  };

  comments.addComment(newComment)

  comments.showCommentList();
}