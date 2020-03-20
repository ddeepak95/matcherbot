// Modal Script
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("viewGameInfoBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	btnSound();	
	var objectsTable = "<table id='gameDataTable'>";
	for (var i = 0; i < gData.gameData.length; i++) {
	    objectsTable+="<tr>";
	    objectsTable+="<td>"+gData.gameData[i].question+"</td>";
	    objectsTable+="<td>"+gData.gameData[i].hint+"</td>";
	    objectsTable+="<td>"+gData.gameData[i].key+"</td>";
	    objectsTable+="<td>"+gData.gameData[i].answer+"</td>";    
	    objectsTable+="</tr>";
	}	
	objectsTable+="</table>";
	document.getElementById("objectsTable").innerHTML = objectsTable;

	// function headerRow
	  	var table = document.getElementById("gameDataTable");
	  	var header = table.createTHead();
	  	var row = header.insertRow(0);
	 	row.insertCell(0).innerHTML = "<b>Question</b>";
	 	row.insertCell(1).innerHTML = "<b>Hint</b>";	 	
	 	row.insertCell(2).innerHTML = "<b>Key</b>";
	 	row.insertCell(3).innerHTML = "<b>Instructions</b>";
	 	var row = header.insertRow(1);
	 	row.insertCell(0).innerHTML = "";
	 	row.insertCell(1).innerHTML = "";	 	
	 	row.insertCell(2).innerHTML = "Space";
	 	row.insertCell(3).innerHTML = "To start/restart game";
		document.getElementById("gameTimeModal").innerHTML = gData.gameDuration+" Secs";
		document.getElementById("gameNameModal").innerHTML = gData.gameName;
		document.getElementById("gameLivesModal").innerHTML = gData.gameLives;	
		document.getElementById("gameAudioModal").innerHTML = gData.gameAudio;						
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

