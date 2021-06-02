// const newComment = {
//     name: hikeName,
//     date: new Date(),
//     content: comment,
//     type: hike
//   };

  const commentList = [];

  export default class Comments {
    constructor(elementId) {
      this.parentElement = document.getElementById(elementId);
      // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
      this.backButton = this.buildBackButton();
    }
    // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
    getAllComments() {
      return commentList;
    }

    // For the first stretch we will need to get just one hike.
    getCommentByType(type) {
      return this.getAllComments().find(comment => comment.type === type);
    }

    getCommentByHike(name) {
        return this.getAllComments().find(comment => comment.name === name);
      }

    //show a list of hikes in the parentElement
    showCommentList() {
      this.parentElement.innerHTML = '';
      // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
      renderCommentList(this.parentElement, this.getAllComments());
    }  
  }

  function renderCommentList(parent, commentList) {
    commentList.forEach(comment => {
      parent.appendChild(renderComment(comment));
    });
  }

  function renderComment(comment) {
    const item = document.createElement('li');
    item.classList.add('light');
    //item.setAttribute('data-name', comment.name);
    item.innerHTML = ` <h2>${comment.name}</h2>
    <div>
        <div>
            <h3>Date</h3>
            <p>${comment.date}</p>
        </div>
        <div>
            <h3>Comment</h3>
            <p>${comment.content}</p>
        </div>
    </div>`;
    return item;
  }

