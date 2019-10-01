const artyom = new Artyom();
var path;
var gData;
var def = [
    {
    wrongSound: "sounds/wrong.wav", //Wrong answer
    gameOverSound: "sounds/beep.wav",
    resultSound: "sounds/result.wav", //Result
    rightSound: "sounds/success.wav", //Right answer
    btnSound: "sounds/btn.wav",
    indexbtnSound: "./chassis/sounds/btn.wav"
    }
];

function btnSound()
{
    audio = new Audio(def[0].btnSound);
    audio.play();
}

function indexbtnSound()
{
    audio = new Audio(def[0].indexbtnSound);
    audio.play();
}

function getGameFile()
{
    indexbtnSound();
    const file=document.getElementById("filePath").files[0];
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);

        function onReaderLoad(event)
        {
            console.log(event.target.result);
            try
            {
                gData = JSON.parse(event.target.result);
            }
            catch(error)
            {
                alert("Invalid File");
            }
            console.log("Game Name "+gData.gameName);
            document.getElementById("showGameName").innerHTML = gData.gameName;
            localStorage.setItem('gameName', gData.gameName);        
            localStorage.setItem('gameDuration', gData.gameDuration);
            localStorage.setItem('gameLives', gData.gameLives);                    
            localStorage.setItem('gameData', JSON.stringify(gData.gameData));  
            console.log(gData.gameData);    
            artyom.say('Game Selected');             
            document.getElementById("viewGameInfoBtn").style.display = null;
            document.getElementById("beginGame").style.display = null;             
        }
}

function newGame()
{
    indexbtnSound();
    artyom.say("Let's begin!");    
	window.open('./chassis/gameplay.html', "_self");
}

function generateGame()
{
    indexbtnSound();
    var password=prompt("Enter the secret code!");
    if (password==="5555")
    {
        window.open('./chassis/managegame.html', "_self");   
    }
    else
    {
        alert("Access Denied");
    }
}

function startVoice()
{
    artyom.fatality();// use this to stop any of
    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:'en-GB',// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:false, // Start recognizing
            debug:true, // Show everything in the console
            speed:1 // talk normally
            }).then(function(){
            console.log("Ready to work !");
        });
         },250);
}
