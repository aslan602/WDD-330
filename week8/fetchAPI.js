let display = document.querySelector("#display");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");

fetch("https://swapi.dev/api/starships/")
    .then(response => response.json())
    .then(data => {
        display.innerHTML = JSON.stringify(data.results)
        let linkprev = document.createElement("a");
        linkprev.href = data.prev;
        linkprev.innerText("Prev");
        prev.appendChild(linkprev);     
    })
    .catch("There was a n error!");
