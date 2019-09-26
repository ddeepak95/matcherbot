var key;
var random=0;
var response, temp, check, qlistlen, qnum, audio,tout,tintervalout;
var point=0;
var t=localStorage.getItem('gameDuration');
var points, fpoint=0, newtime;
var z=0;
var resultMsg;
var gamedata_string = localStorage.getItem('gameData');
var gamedata_parsed = JSON.parse(gamedata_string);
console.log(gamedata_parsed);
var qlist_temp = gamedata_parsed;
console.log(qlist_temp);
var qlist=qlist_temp;
qlistlen = qlist.length;
var gname=localStorage.getItem('gameName');
console.log("Game Name: "+gname);
document.getElementById("gamePageTitle").innerHTML = gname+" | Matcherbot";


function gameInit()
{
	document.getElementById("gameName").innerHTML = gname;
}
function btnSound()
{
	audio = new Audio(def[0].btnSound);
	audio.play();
}
function myTimer() {
	newtime=newtime-1;
	document.getElementById("timer").innerHTML = newtime;
	if (newtime==10)
	{
		document.getElementById("timerCircle").style.backgroundColor = '#f60707';
	}
	if (newtime==0)
	{
		resultMsg="Times up.";
	}
}

function readEvent(event)
{
	key = event.key.toLowerCase();
    console.log(key);
    gameplay();
}

function startgame()
{
	btnSound();
	document.documentElement.requestFullscreen();
	newtime=t;
	console.log("start game newtime"+newtime);	
  	document.getElementById("timer").innerHTML = newtime;
  	tintervalout=setInterval(myTimer,1000)	
	document.getElementById("game").style.display = null;
	document.getElementById("resultboard").style.display = 'none';	
	document.getElementById("startGameBtn").style.display = 'none';	
	qnum=random;
	document.getElementById("score").innerHTML = point;
  	document.getElementById("ques").innerHTML = qlist[qnum].question;	
  	if (z<1)
  	{
  		console.log("Say 1");
		artyom.say(qlist[qnum].question);
		z=z+1;   
  	}  		
   	tout=setTimeout(showresult, (t*1000));

	document.addEventListener('keydown', readEvent);	   	
}

function restartgame()
{
	btnSound();	
	point=0;
	newtime=t;
  	document.getElementById("timer").innerHTML = newtime;	
	console.log("restart game newtime "+newtime);
	document.getElementById("resultboard").style.display = 'none';	
	document.getElementById("score").innerHTML = point;
	clearInterval(tintervalout);
	clearTimeout(tout);
	console.log("restart game tout "+tout);
  	tintervalout=setInterval(myTimer,1000)	
	tout=setTimeout(showresult, (t*1000));
  	random = Math.floor(Math.random() * Math.floor(qlistlen));	
  	qnum=random;	
    document.getElementById("ques").innerHTML = qlist[qnum].question; 	
	artyom.say(qlist[qnum].question); 
}

function endgame()
{
	btnSound();		
	document.getElementById("timerCircle").style.backgroundColor = null;	
	document.removeEventListener('keydown', readEvent);
	document.getElementById("game").style.display = 'none';
	document.getElementById("startGameBtn").style.display = null;	
	point=0;
	fpoint=0;
	z=0;
	clearInterval(tintervalout);	
	clearTimeout(tout);
  	random = Math.floor(Math.random() * Math.floor(qlistlen));	
  	qnum=random;	
}

function playAgain()
{
	document.getElementById("game").style.display = null;
	restartgame();
	document.addEventListener('keydown', readEvent);
}


function showresult()
{
	document.getElementById("timerCircle").style.backgroundColor = null;	
	document.removeEventListener('keydown', readEvent);
	audio = new Audio(def[0].resultSound);
	audio.play();	
	document.getElementById("game").style.display = 'none';
	document.getElementById("resultboard").style.display = null;
	function sayResult()
	{
		artyom.say(resultMsg+" Your score is " + fpoint);
		fpoint=0;
	}
	setTimeout(sayResult,(1000));	
	document.getElementById("resultmessage").innerHTML = resultMsg;
	document.getElementById("scorePoint").innerHTML = fpoint;
	point=0;
	clearInterval(tintervalout);	
	clearTimeout(tout);
	console.log(tout);
	console.log("show result newtime "+newtime);
}

function gameplay() {
	qnum=random;	
	document.getElementById("score").innerHTML = point;	
  	document.getElementById("ques").innerHTML = qlist[qnum].question;	
  	response=key;
  	if (response==qlist[qnum].key) {
		audio = new Audio(def[0].rightSound);
		audio.play();	
  	  	random = Math.floor(Math.random() * Math.floor(qlistlen));	
  	  	qnum=random;		
    	document.getElementById("ques").innerHTML = qlist[qnum].question;
		artyom.say(qlist[qnum].question);     	
    	console.log(qlist[qnum].question);
    	point=point+1;
    	fpoint=point;  
    	document.getElementById("score").innerHTML = point;
    	document.getElementById("score").style.transform = "scale(1.2)";
    function scoreZoom()
    {
		document.getElementById("score").style.transform = null;
	}	 
    	setTimeout(scoreZoom,(200));	    					
  	}
  	else {
    	document.getElementById("score").innerHTML = point;   		
  		audio = new Audio(def[0].wrongSound);
		audio.play();
		resultMsg="Oops, Wrong answer.";
		showresult();
  	}

}

function exitGame() {
	window.open('../index.html', "_self");
}

