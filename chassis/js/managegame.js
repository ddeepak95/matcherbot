var gData;
var template={"gameName":"Enter Game Name","gameDuration":30,"gameLives":3,"gameAudio":true,"gameData":[{"question":"Enter Question","hint":"","key":"Select Key","answer":"Type some instruction"}]}
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
	console.log(gData);
    duration= document.getElementById("gameTime");
    nameId= document.getElementById("gameNameId");
    livesId= document.getElementById("gameLivesId");
    audioId= document.getElementById("audioCheck");        
    console.log(gData.gameName);    
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
	 	{title:"Question", field:"question", width:"25%", editor:"input", headerSort:false},
	 	{title:"Hint", field:"hint", width:"25%", editor:"input", headerSort:false},	 	
	 	{title:"Key", field:"key", align:"left", editor:"select", headerSort:false, editorParams:{values:["arrowleft","arrowup","arrowright","arrowdown","w","a","s","d","f","g","z","x","c","v","b","n"]}},
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
	window.open("../startgame.html", "_self");
}

function addRow()
{
	btnSound();
	table.addRow({"question":"","key":"Select Key","answer":""});
}
var tempData,tempGameName,tempGameDuration;
function saveFile()
{
	tempGameName=nameId.innerText;
	tempGameDuration=duration.innerText;
	tempGameLives=livesId.innerText;
	tempGameAudio=audioId.checked;		
	console.log(tempGameName,tempGameDuration);
	var tableData=table.getData();
	var stringGameData=JSON.stringify(tableData);
	tempData='{"gameName":"'+tempGameName+'","gameDuration":'+tempGameDuration+',"gameLives":'+tempGameLives+',"gameAudio":'+tempGameAudio+',"gameData":'+stringGameData+'}';
	console.log(tempData);
	var blob = new Blob([tempData],{type:"application/json"});
	saveAs(blob, tempGameName+".json");
}
function audioCheck()
{
	var audio=document.getElementById("audioCheck").checked;
	console.log(audio);
}