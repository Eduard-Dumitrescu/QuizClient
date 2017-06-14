var mainContainer = $(".mainPage");
var sideBtn = $("#menuBtn");
var isOver = false;

sideBtn.click(function (e) {
    if (isOver)
    {
        mainContainer.animate({ marginLeft: "12%" });
        isOver = false;
    }
    else
    {
        mainContainer.animate({ marginLeft: "2.9%" });
        isOver = true;
    }
});