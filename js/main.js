const links = [
    {
        label: "Week 1",
        url: "week1/week1.html"
    },
    {
        label: "Week 2",
        url: "week2/week2.html"
    },
    {
        label: "Week 3",
        url: "week3/week3.html"
    },
    {
        label: "Week 4",
        url: "week4/week4.html"
    },
    {
        label: "Week 5",
        url: "week5/week5.html"
    },
    {
        label: "Week 6",
        url: "week6/week6.html"
    },  
    {
        label: "Week 7",
        url: "week7/week7.html"
    }, 
    {
        label: "Week 8",
        url: "week8/week8.html"
    },
    {
        label: "Week 9",
        url: "week9/week9.html"
    },
    {
        label: "Proposal",
        url: "JosephsonProposal.pdf"
    }, 
    {
        label: "Week 10",
        url: "week10/week10.html"
    }, 
    {
        label: "Week 11",
        url: "week11/week11.html"
    },
    {
        label: "Final Project",
        url: "check/check.html"
    },                         
];

function display() {    
    const space = document.createElement('br');   
    const max = links.length;
    let i = 0;
    let y;
    for(i; i < max; i++) { 
        let y =  document.createElement("li");
        y.async = false;         
        let a = document.createElement("a");
        let label = document.createTextNode(links[i].label);
        a.appendChild(label);       
        a.title = label;     
        a.href = links[i].url;
        y.appendChild(a);
        y.appendChild(space);                       
        document.querySelector("#list").appendChild(y);                     
    }
    // document.getElementById("lists").appendChild(y);
};