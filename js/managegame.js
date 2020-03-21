var gData;
var template={"gameName":"","gameDuration":30,"gameLives":3,"gameAudio":true,"gameData":[{"question":"Enter Question","hint":"","key":"Select Key","answer":""}]}
function getGameFileManage()
{
    btnSound();
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
        }
	setTimeout(showTableData,(10));    
}

function newGameFile()
{
    btnSound();
    gData=template;
    showTableData();
}
	
var table;
var gName, nameId, duration;
function showTableData()
{	
	document.getElementById("dataFrame").style.display = null;		
    duration= document.getElementById("gameTime");
    nameId= document.getElementById("gameNameId");
    livesId= document.getElementById("gameLivesId");
    audioId= document.getElementById("audioCheck");           
    nameId.innerHTML = gData.gameName;	
    duration.innerHTML = gData.gameDuration;
    livesId.innerHTML = gData.gameLives; 
	audioId.checked = gData.gameAudio;	    
	table = new Tabulator("#objectsTable", {
 	// height:100%, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	data:gData.gameData, //assign data to table
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
		{field:"row number", width:20, formatter:"rownum", headerSort:false}, 	
	 	{title:"Question", field:"question", width:"25%", editor:"input", headerSort:false,validator:"required"},
	 	{title:"Hint", field:"hint", width:"25%", editor:"input", headerSort:false},	 	
	 	{title:"Key", field:"key", align:"left", editor:"select", validator:"regex:^(?!select key$).*$", headerSort:false, editorParams:{values:["arrowleft","arrowup","arrowright","arrowdown","w","a","s","d","f","g","b","c","e","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"]}},
	 	{title:"Connection Instruction", field:"answer", width:"20%", headerSort:false, editor:"autocomplete", editorParams:{
		    showListOnEmpty:true, //show all values when the list is empty,
		    freetext:true, //allow the user to set the value of the cell to a free text entry
		    allowEmpty:true, //allow empty string values
		    values:true, //create list of values from all values contained in this column
		    sortValuesList:"asc", //if creating a list of values from values:true then choose how it should be sorted
		}},
	 	{formatter:"buttonCross", width:20, align:"center", headerSort:false, cellClick:function(e, cell){cell.getRow().delete();}}
	 	// {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
 	],
});
}

function backSelect()
{
	btnSound();
	window.open("./index.html", "_self");
}

function addRow()
{
	btnSound();
	table.addRow({"question":"","hint":"","key":"Select Key","answer":""});
}
var tempData,tempGameName,tempGameDuration;
function saveFile()
{
	tempGameName=nameId.innerText;
	tempGameDuration=duration.innerText;
	tempGameLives=livesId.innerText;
	tempGameAudio=audioId.checked;		
	var tableData=table.getData();
	validateData=dataValidation(tempGameName, tempGameDuration, tempGameLives, tableData);
	if (validateData=="Success")
	{
		document.getElementById("validateMsg").style.color = "green";
		document.getElementById("validateMsg").innerHTML = "Questions Validation Successful!";
		var stringGameData=JSON.stringify(tableData);
		tempData='{"gameName":"'+tempGameName+'","gameDuration":'+tempGameDuration+',"gameLives":'+tempGameLives+',"gameAudio":'+tempGameAudio+',"gameData":'+stringGameData+'}';
		var blob = new Blob([tempData],{type:"application/json"});
		saveAs(blob, tempGameName+".json");
	}
	else
	{
		document.getElementById("validateMsg").style.color = "red";		
		document.getElementById("validateMsg").innerHTML = '<strong>'+"Questions validation failed: "+'</strong>'+'<br>'+qErrorstr+'<br>'+kErrorstr+'<br>'+nameErrorstr+'<br>'+durationErrorstr+'<br>'+livesErrorstr;		
		console.log(validateData)
	}

}
var qErrorIndex=[]
var kErrorIndex=[]
var errorCounter=[]
var qErrorstr, kErrorstr, nameErrorstr, durationErrorstr, livesErrorstr;
function dataValidation(gamename, gameduration, gamelives, datafromtable)
{
	console.log("Data Validation Started");
	errorCounter=[]
	checkName(gamename);
	checkDuration(gameduration);
	checkLives(gamelives);
	var data=datafromtable;
	console.log(data);
	// var quesError=indexOfAll(data,"Enter Question");
	indexOfqError(data,"");
	if (qErrorIndex.length<1)
	{
		qErrorstr = "";
	}
	else
	{
		qErrorstr = "Invalid question format in the following rows: "+qErrorIndex.join(', ');		
	}
	
	indexOfkError(data,"Select Key");	
	if (kErrorIndex.length<1)
	{
		kErrorstr = "";
	}
	else
	{
		kErrorstr = "Key not selected in the following rows: "+kErrorIndex.join(', ');			
	}
	console.log(qErrorstr);
	console.log(kErrorstr);
	if(errorCounter.length < 1)
	{
		var validationResult="Success";
		return(validationResult)
	}
	else
	{
		var validationResult="Failure";
		return(validationResult)
	}			

}

function checkName(game)
{
	if (game==="")
	{
		nameErrorstr="Enter Valid Game Name!";
		errorCounter.push(1);
		return(nameErrorstr)
	}
	else
	{
		nameErrorstr="";
	}
}

function checkDuration(game)
{
	if (isNaN(game))
	{
		durationErrorstr="Enter Valid Duration in Numbers!";
		errorCounter.push(1);
		return(durationErrorstr)
	}
	else
	{
		durationErrorstr="";
	}
}
function checkLives(game)
{
	if (isNaN(game))
	{
		livesErrorstr="Enter Valid Lives in Numbers!";
		errorCounter.push(1);
		return(livesErrorstr)
	}
	else
	{
		livesErrorstr="";
	}
}

function indexOfqError(array, searchItem) {
	qErrorIndex=[]
	for (i=0;i<array.length;i++) {
	  if (array[i].question == searchItem) {
	  	qErrorIndex.push(i+1);
	  	errorCounter.push(1);
	  }
	}
	  if (array[0].question == "Enter Question") {
	  	qErrorIndex.unshift(1);
	  	errorCounter.push(1);
	  }	
}
function indexOfkError(array, searchItem) {
	kErrorIndex=[]
	for (i=0;i<array.length;i++) {
	  if (array[i].key == searchItem) {
	  	kErrorIndex.push(i+1);
	  	errorCounter.push(1);
	  }
	}
}



function audioCheck()
{
	var audio=document.getElementById("audioCheck").checked;
	console.log(audio);
}