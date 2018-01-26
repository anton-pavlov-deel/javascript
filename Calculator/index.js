$(".CalcButton").on("mouseover", function() {
	$(this).css("background-color", "gray");
}).on("mouseleave", function() {
	$(this).css("background-color", "#deadbeaf");
}).on("click", function() {
	var key = $(this).html();
	switch(key) {
		case "C":
			$("#CalcDisplay").attr("value", "");
			break;
		case "=":
			$("#CalcDisplay").attr("value", String(eval($("#CalcDisplay").attr("value"))));
			break;
		default:
			$("#CalcDisplay").attr("value", $("#CalcDisplay").attr("value") + key);
	}
	
})

