function TestViewModel()
{
    var self = this;

    self.currentTechnology = ko.observable();

    self.currentQuestions = ko.observableArray([]);

    self.questionList = ko.observableArray([]);
    self.technologyList = ko.observableArray([]);

    self.changeTechnology = function (technology) {
   
        var obj = new Object();
        obj.dataNumber = technology.Id;

        $.ajax({
            url: 'https://localhost:44361/api/Exams/QuestionsWithAnswers',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(obj),
            datatype: "json"
        }).done(function (data) {
            self.questionList(data);

        });
    }

    self.populateTechnologyList = function () {
        return $.ajax({
                    url: 'https://localhost:44361/api/Exams/Subjects',
                    headers: {
                        'Authorization': $.cookie('Authorization'),
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                }).done(function (data) {
                    self.technologyList(data);
                
                });

    }

    self.populateQuestionList = function () {
        var obj = new Object();
        obj.dataNumber = self.technologyList()[0].Id;

        $.ajax({
            url: 'https://localhost:44361/api/Exams/QuestionsWithAnswers',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(obj),
            datatype: "json"
        }).done(function (data) {
            self.questionList(data);
          
        });
    }

    self.populateTechnologyList().done(function () { self.populateQuestionList() });

    setInterval(function () {

        var time = $("#timer");
        $.ajax({
            url: 'https://localhost:44361/api/Exams/TimeLeft',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            time.text(data.Hours + ':' + data.Minutes + ':' + data.Seconds);
        });

    }, 1000);

}

ko.applyBindings(new TestViewModel());