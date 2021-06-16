

document.addEventListener("keyup",  function(event) {
   switch(event.keyCode) {
       case 65:
           var audio = new Audio("sounds/clap.wav");
           audio.play();
           document.getElementById("A").classList.add(".change");
           break;
       case 83:
        var audio = new Audio("sounds/hihat.wav");
        audio.play();
        break;      
       case 68:
        var audio = new Audio("sounds/kick.wav");
        audio.play();
        break;          
       case 70:
        var audio = new Audio("sounds/openhat.wav");
        audio.play();
        break;
       case 71:
        var audio = new Audio("sounds/boom.wav");
        audio.play();
        break;
       case 72:
        var audio = new Audio("sounds/ride.wav");
        audio.play();
        break;
       case 74:
        var audio = new Audio("sounds/snare.wav");
        audio.play();
        break;
       case 75:
        var audio = new Audio("sounds/tom.wav");
        audio.play();
        break;
       case 76:
        var audio = new Audio("sounds/tink.wav");
        audio.play();
        break;
       default:
           console.log("Error playing sound file.");
   }
});