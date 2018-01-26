$("#TranslateButton").click(function() {
	document.getElementById("ViewDiv").innerHTML = $("#InputArea").val();
});

$("#RefreshButton").click(function() {
	document.getElementById("ViewDiv").innerHTML = $("#InputArea").val();
});

$("#SearchButton").click(function() {
	document.getElementById("ViewDiv").innerHTML = $("#InputArea").val();
	$("#ViewDiv").find($($("#SearchText").val())).css("border", "1px solid red");
});