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
var gaudio=localStorage.getItem('gameAudio');
console.log("Game Name: "+gname);
document.getElementById("gamePageTitle").innerHTML = gname+" | Matcherbot";


function setLives()
{
	for(x=1; x<=life;x++)
{
    lives = document.createElement('img');
    lives.className='life';
    lives.id='life#'+x;
    lives.src='images/life.png';
    document.getElementById('lifeDiv').appendChild(lives);
}
}

function resetLives()
{
	console.log("Life:"+life);
	for(x=1; x<=life;x++)
	{
		var lifeid='life#'+x;
		document.getElementById(lifeid).src = 'images/life.png';		
    }
}


function gameInit()
{
	document.getElementById("gameName").innerHTML = gname;
	document.addEventListener('keydown', readEvent);
	setLives();
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

function changeQuestion()
{
  	document.getElementById("ques").innerHTML = qlist[qnum].question;
  	if (qlist[qnum].hint==undefined)
  	{
  	  	document.getElementById("hint").innerHTML = "   ";	
  	}
  	else
  	{
  	  	document.getElementById("hint").innerHTML = qlist[qnum].hint;  		
  	} 		
}

function sayQuestion()
{
	if (gaudio=="true")
    {
    	artyom.say(qlist[qnum].question); 
    }	
}

function startgame()
{
	btnSound();
	document.documentElement.requestFullscreen();
	newtime=t;
	check=1;
	console.log("start game newtime"+newtime);
  	document.getElementById("keyHint").innerHTML = '[Press <span id="keyColor">SPACE</span> to restart/ <span id="keyColor">CTRL</span> to end game]';		
  	document.getElementById("timer").innerHTML = newtime;
  	tintervalout=setInterval(myTimer,1000)	
	document.getElementById("game").style.display = null;
	document.getElementById("resultboard").style.display = 'none';	
	document.getElementById("startGameBtn").style.display = 'none';	
	qnum=random;
	document.getElementById("score").innerHTML = point;
	changeQuestion();	
  	if (z<1)
  	{
  		console.log("Say 1");
		sayQuestion();
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
	document.getElementById("timerCircle").style.backgroundColor = null;	
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
  	changeQuestion();
 	sayQuestion();
}

function endgame()
{
	btnSound();
	check=0;	
  	document.getElementById("keyHint").innerHTML = '[Press <span id="keyColor">SPACE</span> to start game]';		
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
	gameOverSound();
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
	changeQuestion();
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
			rightAnswerSound();	
	  	  	random = Math.floor(Math.random() * Math.floor(qlistlen));	
	  	  	qnum=random;		
	  	  	changeQuestion();
			sayQuestion();   	
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
		    	wrongSound();
				setTimeout(sayQuestion(),(2000)); 				
				var lifeid='life#'+life;
				console.log("Life ID="+lifeid);
				document.getElementById(lifeid).src = 'images/nolife.png';
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
				gameOverSound();
				resultMsg="Oops, You are dead.";
				check=2;	
				showresult();
			}
	  	}
	}
}

function exitGame() {
	window.open('./index.html', "_self");
}

