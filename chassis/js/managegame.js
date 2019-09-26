var gData;
var template={"gameName":"Enter Game Name","gameDuration":30,"gameData":[{"question":"Enter Question","key":"Select Key","answer":"Type some instruction"}]}
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
    console.log(gData.gameName);    
    nameId.innerHTML = gData.gameName;	
    duration.innerHTML = gData.gameDuration;	    
	table = new Tabulator("#objectsTable", {
 	// height:100%, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	data:gData.gameData, //assign data to table
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
		{field:"row number", width:20, formatter:"rownum", headerSort:false}, 	
	 	{title:"Question", field:"question", width:"35%", editor:"input", headerSort:false},
	 	{title:"Key", field:"key", align:"left", editor:"select", headerSort:false, editorParams:{values:["a","b","c","d","e","f","g","h","i","j"]}},
	 	{title:"Instruction", field:"answer", width:"40%", headerSort:false, editor:"autocomplete", editorParams:{
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
	window.open("../index.html", "_self");
}

function addRow()
{
	btnSound();
	table.addRow({"question":"Enter Question","key":"Select Key","answer":"Type some instruction"});
}
var tempData,tempGameName,tempGameDuration;
function saveFile()
{
	tempGameName=nameId.innerText;
	tempGameDuration=duration.innerText;	
	console.log(tempGameName,tempGameDuration);
	var tableData=table.getData();
	var stringGameData=JSON.stringify(tableData);
	tempData='{"gameName":"'+tempGameName+'","gameDuration":'+tempGameDuration+',"gameData":'+stringGameData+'}';
	console.log(tempData);
	var blob = new Blob([tempData],{type:"application/json"});
	saveAs(blob, tempGameName+".json");
}