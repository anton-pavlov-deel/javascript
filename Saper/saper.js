function getFieldElement(field, i, j) {
	if (i >= 0 && i < field.length && j >= 0 && j < field.length) return field[i][j];
	return ERROR_CODE;
}

function calculateFieldElement(field, i, j) {
	var result = 0;
	for (var a = i-1; a < i+2; a++) {
		for (var b = j-1; b < j+2; b++) {
			if (getFieldElement(field, a, b) == -1) result++;
		}
	}
	return result;
}

function checkFieldElement(fieldSize, i, j) {
	if (i >= 0 && i < fieldSize && j >= 0 && j < fieldSize) return true;
	return false;
}

function showNeighbours(elem) {
	var ids = elem.attr("id").split("_");
	var i = Number(ids[0]);
	var j = Number(ids[1]);
	
	showElement(elem);
	window.buttons[i][j] = false;
	
	for (var a = i-1; a < i+2; a++) {
		for (var b = j-1; b < j+2; b++) {
			if (checkFieldElement(fieldSize, a, b) && window.buttons[a][b]) $("#"+a+"_"+b).click();
		}
	}
}

function showOnlyOne(elem) {
	var ids = elem.attr("id").split("_");
	var i = Number(ids[0]);
	var j = Number(ids[1]);
	
	showElement(elem);
	window.buttons[i][j] = false;
	
	if (checkForWin()) Win();
}

function markNeighbours(elem) {
	var ids = elem.attr("id").split("_");
	var i = Number(ids[0]);
	var j = Number(ids[1]);
	
	for (var a = i-1; a < i+2; a++) {
		for (var b = j-1; b < j+2; b++) {
			if (checkFieldElement(fieldSize, a, b) && window.buttons[a][b]) $("#"+a+"_"+b).css("background-color", "gray");
		}
	}
}

function unmarkNeighbours(elem) {
	var ids = elem.attr("id").split("_");
	var i = Number(ids[0]);
	var j = Number(ids[1]);
	
	for (var a = i-1; a < i+2; a++) {
		for (var b = j-1; b < j+2; b++) {
			if (checkFieldElement(fieldSize, a, b) && window.buttons[a][b]) $("#"+a+"_"+b).css("background-color", "white");
		}
	}
}

function showElement(elem) {
	var ids = elem.attr("id").split("_");
	var i = Number(ids[0]);
	var j = Number(ids[1]);
	var value = field[i][j];
	var color;
	
	switch (value) {
		case 0:
			color = "#00ff00";
			break;
		case 1:
			color = "#33cc00";
			break;
		case 2:
			color = "#669900";
			break;
		case 3:
			color = "#996600";
			break;
		case 4:
			color = "#cc3300";
			break;
		case 5:
			color = "#ff0000";
			break;
		case 6:
			color = "#ff0066";
			break;
		case 7:
			color = "#ff00cc";
			break;
		case 8:
			color = "#ff00ff";
			break;
	}
	
	elem.css("background-color", color);
	elem.text(String(field[i][j]));
}

function checkForWin() {
	
	for (var i = 0; i < window.buttons.length; i++) {
		for (var j = 0; j < window.buttons.length; j++) {
			if (window.buttons[i][j]) {
				if (field[i][j] == -1) continue;
				else return false;
			}
		}
	}
	
	return true;
}

function Lose() {
	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field.length; j++) {
			if (field[i][j] == -1) {
				$("#"+i+"_"+j).css("background-color", "black")
				window.buttons[i][j] = false;
			}
		}
	}
	
	alert("You Lose. Try Again!");
}

function Win() {
	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field.length; j++) {
			if (field[i][j] == -1) {
				$("#"+i+"_"+j).css("background-color", "black")
				window.buttons[i][j] = false;
			}
		}
	}
	
	alert("You Win! Congratulations!");
}

//------------------------------------------------------------FUNCS

var ERROR_CODE = -10;
var fieldSize = 20;
var buttonSize = 20;
var mineChance = 0.06;

var field = [];
window.buttons = [];

//------------------------------------------------------------MAIN

for (var i = 0; i < fieldSize; i++) {
	field.push([]);
	window.buttons.push([]);
	for (var j = 0; j < fieldSize; j++) {
		if (Math.random() < mineChance) field[i].push(-1);
		else					 field[i].push(0);
		window.buttons[i].push(true);
	}
}

for (var i = 0; i < fieldSize; i++) {
	for (var j = 0; j < fieldSize; j++) {
		if (field[i][j] == 0) field[i][j] = calculateFieldElement(field, i, j);
		$("<label>", {
			id: i+"_"+j,
			align: "center",
			on: {
				mouseover: function() {
					var ids = $(this).attr("id").split("_");
					var i = Number(ids[0]);
					var j = Number(ids[1]);
					if (!window.buttons[i][j]) markNeighbours($(this));
					else $(this).css("background-color", "gray");
				},
				mouseleave: function() {
					var ids = $(this).attr("id").split("_");
					var i = Number(ids[0]);
					var j = Number(ids[1]);
					if (!window.buttons[i][j]) unmarkNeighbours($(this));
					else $(this).css("background-color", "white");
				},
				click: function() {
					var ids = $(this).attr("id").split("_");
					var i = Number(ids[0]);
					var j = Number(ids[1]);
					if (!window.buttons[i][j]) return null;
					if (field[i][j] == 0) showNeighbours($(this));
					else if (field[i][j] != -1) showOnlyOne($(this));
					else Lose();
				}
			},
			css: {
				position: "absolute",
				top: i*(buttonSize+1) + "px",
				left: j*(buttonSize+1) + "px",
				width: buttonSize + "px",
				height: buttonSize + "px",
				border: "1px solid black",
				cursor: "pointer"
			}
		}).appendTo("#GameField");
	}
}

