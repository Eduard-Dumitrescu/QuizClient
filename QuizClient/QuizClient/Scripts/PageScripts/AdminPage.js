var mainContainer = $(".mainPage");
var sideBtn = $("#menuBtn");
var isOver = false;

sideBtn.click(function (e) {
    if (isOver)
        mainContainer.css("margin-left","12%");
    alert(mainContainer.css("margin-left"));
});