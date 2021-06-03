

export default class Comments {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
  }
  commentList = [];
  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllComments() {
    return this.commentList;
  }

  addComment(comment) {
    this.commentList.push(comment);
    this.updatePersistentData();
  }

  // For the first stretch we will need to get just one hike.
  getCommentByType(type) {
    return this.getAllComments().find(comment => comment.type === type);
  }

  getCommentByHike(name) {
      return this.getAllComments().find(comment => comment.name === name);
  }

  renderComment(comment) {
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

  //show a list of hikes in the parentElement
  showCommentList() {
    this.parentElement.innerHTML = '';
    if (document.getElementById("hikeName").value != "main") {
       this.displayCommentList(this.commentList.filter(comment => comment.name === document.getElementById("hikeName").value));
    }
    else {
      this.displayCommentList(this.commentList);
    }
  }

  displayCommentList(commentList) {
    commentList.forEach(comment => {
      this.parentElement.appendChild(this.renderComment(comment));
    });
  }

  loadPersistent() {
    const storedList = localStorage.getItem("comments");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
    let newComment = {
      name: itemObj.name,
      date: itemObj.date,
      content: itemObj.content,
      type: itemObj.type
    }
    this.addComment(newComment);
    })
  }

  updatePersistentData() {
    localStorage.setItem("comments", JSON.stringify(this.commentList));
  }
}

