var key, lives;
var random=0, life=localStorage.getItem('gameLives');
var check=0;
var response, temp, check, qlistlen, qnum, audio,tout,tintervalout;
var point=0;
var t=localStorage.getItem('gameDuration');
var points, fpoint=0, newtime;
var z=0;
var resultMsg,x;
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


function setLives()
{
	for(x=1; x<=life;x++)
{
    lives = document.createElement('img');
    lives.className='life';
    lives.id='life#'+x;
    lives.src='img/life.png';
    document.getElementById('lifeDiv').appendChild(lives);
}
}

function resetLives()
{
	console.log("Life:"+life);
	for(x=1; x<=life;x++)
	{
		var lifeid='life#'+x;
		document.getElementById(lifeid).src = 'img/life.png';		
    }
}


function gameInit()
{
	document.getElementById("gameName").innerHTML = gname;
	document.addEventListener('keydown', readEvent);
	setLives();
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
	check=1;
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
	artyom.shutUp();
	btnSound();
	life=localStorage.getItem('gameLives');
	resetLives();
	check=1;	
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
	check=0;		
	document.getElementById("timerCircle").style.backgroundColor = null;	
	document.getElementById("game").style.display = 'none';
	document.getElementById("startGameBtn").style.display = null;	
	point=0;
	fpoint=0;
	z=0;
	life=localStorage.getItem('gameLives');
	resetLives();
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
	if (check=="0")
	{
		check=0;
	}
	else
	{
		check=2;
	}
	document.getElementById("timerCircle").style.backgroundColor = null;	
	audio = new Audio(def[0].resultSound);
	audio.play();	
	document.getElementById("game").style.display = 'none';
	document.getElementById("game").style.visiblity = 'hidden';	
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
	artyom.shutUp();  		
  	response=key;
  	if (check=="0")
  	{
  		if (key==" ")
	    	{
	    	startgame();
	    	}
  	}
  	else if (check=="2")
  	{
  		if (key==" ")
	    	{
	    	playAgain();
	    	}
  	}  	
  	else if (check=="1")
  	{
	    if (key==" ")
	    {
	    	restartgame();
	    }
	    else if(key=="control")
	    {
	    	endgame();
	    }  	
	  	else if (response==qlist[qnum].key) {
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
			if (life>"1")
			{
		    	document.getElementById("score").innerHTML = point;   		
		  		audio = new Audio(def[0].wrongSound);
				audio.play();
				setTimeout(artyom.say(qlist[qnum].question),(2000));	
				var lifeid='life#'+life;
				console.log("Life ID="+lifeid);
				document.getElementById(lifeid).src = 'img/nolife.png';
		    	document.getElementById(lifeid).style.transform = "scale(1.2)";
			    function lifeZoom()
			    {
					document.getElementById(lifeid).style.transform = null;
				}	 
		    	setTimeout(lifeZoom,(200));				
				life=life-1;				
			}
			else
			{
				audio = new Audio(def[0].gameOverSound);
				audio.play();
				resultMsg="Oops, You are dead.";
				check=2;	
				showresult();
			}
	  	}
	}
}

function exitGame() {
	window.open('../startgame.html', "_self");
}

