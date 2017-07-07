var alertBox = $("#displayMessage");
alertBox.hide();

function FadeInAlert() {
    if (alertBox.css('opacity') > 0)
        alertBox.hide();
    alertBox.show();
}

function FadeOutAlert() {

}


function TestsViewModel() {
    var self = this;

    self.testNameInput = ko.observable();
    self.selectedTestLevel = ko.observable();

    self.hoursInput = ko.observable();
    self.minutesInput = ko.observable();
    self.secondsInput = ko.observable();

    self.numberOfQuestions = ko.observable();


    self.selectedSubject = ko.observable();
    self.selectedDifficulty = ko.observable();

    self.difficultyList = ko.observableArray([]);
    self.subjectList = ko.observableArray([]);

    self.messageCssClass = ko.observable();
    self.alertMessage = ko.observable();

 
  


    self.refreshDifficultyList = function () {
        $.ajax({
            url: 'https://localhost:44361/api/Difficulty',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            self.difficultyList(data);
        });
    }

    self.refreshSubjectList = function () {
        $.ajax({
            url: 'https://localhost:44361/api/Category',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {

            var subjectData = [];

            for (var i = 0; i < data.length; i++) {
                var obj = {
                    "Id": data[i].Id,
                    "Name": data[i].Name,
                    "IsSelected": ko.observable(false)
            };

                subjectData.push(obj);
            }

            self.subjectList(subjectData);
        });
    }

  


    self.createTest = function () {


        var obj = new Object();

        obj.TestName = self.testNameInput();
        obj.TestLevelId = self.selectedTestLevel().Id;

        obj.Hours = self.hoursInput();
        obj.Minutes = self.minutesInput();
        obj.Seconds = self.secondsInput();

        obj.NumberOfQuestions = self.numberOfQuestions();
        obj.SubjectList = [];


        for (var i = 0; i < self.subjectList().length; i++) {

            if(self.subjectList()[i].IsSelected())
                obj.SubjectList.push(self.subjectList()[i]);
        }

        alert(JSON.stringify(obj));

        $.ajax({
            url: 'https://localhost:44361/api/Test',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(obj),
            datatype: "json"
        }).done(function (data) {

            FadeInAlert();
            self.messageCssClass("alert alert-success text-center");
            self.alertMessage(data.Message);

            alertBox.fadeOut(3000);
        }).fail(function (jqXHR) {
            console.log(jqXHR);
            if (jqXHR.status === 400) {

                FadeInAlert();
                self.messageCssClass("alert alert-danger text-center");
                self.alertMessage(jqXHR.responseJSON.Message);
                alertBox.fadeOut(3000);
            }
        });

    }

    //self.removeCategory = function (category) {

    //    $.ajax({
    //        url: 'https://localhost:44361/api/Category/' + category.Id,
    //        headers: {
    //            'Authorization': $.cookie('Authorization'),
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'DELETE'
    //    }).done(function (data) {

    //        self.refreshCategoryList();
    //        self.refreshDifficultyList();

    //        FadeInAlert();
    //        self.messageCssClass("alert alert-success text-center");
    //        self.alertMessage(data.Message);
    //        alertBox.fadeOut(3000);

    //    }).fail(function (jqXHR) {
    //        console.log(jqXHR);
    //        if (jqXHR.status === 400) {

    //            FadeInAlert();
    //            self.messageCssClass("alert alert-danger text-center");
    //            self.alertMessage(jqXHR.responseJSON.Message);
    //            alertBox.fadeOut(3000);
    //        }
    //    });

    //}

    //self.removeDifficulty = function (difficulty) {

    //    $.ajax({
    //        url: 'https://localhost:44361/api/Difficulty/' + difficulty.Id,
    //        headers: {
    //            'Authorization': $.cookie('Authorization'),
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'DELETE'
    //    }).done(function (data) {

    //        self.refreshCategoryList();
    //        self.refreshDifficultyList();

    //        FadeInAlert();
    //        self.messageCssClass("alert alert-success text-center");
    //        self.alertMessage(data.Message);
    //        alertBox.fadeOut(3000);

    //    }).fail(function (jqXHR) {
    //        console.log(jqXHR);
    //        if (jqXHR.status === 400) {

    //            FadeInAlert();
    //            self.messageCssClass("alert alert-danger text-center");
    //            self.alertMessage(jqXHR.responseJSON.Message);
    //            alertBox.fadeOut(3000);
    //        }
    //    });

    //}

    //self.addDifficulty = function () {

    //    if (self.difficultyInput() == undefined) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please insert a difficulty");
    //        alertBox.fadeOut(3000);
    //    }
    //    else {
    //        var difficultyData = new Object();
    //        difficultyData.data = self.difficultyInput();
    //        $.ajax({
    //            url: 'https://localhost:44361/api/Difficulty',
    //            headers: {
    //                'Authorization': $.cookie('Authorization'),
    //                'Content-Type': 'application/json'
    //            },
    //            method: 'POST',
    //            data: JSON.stringify(difficultyData),
    //            datatype: "json"
    //        }).done(function (data) {

    //            self.refreshCategoryList();
    //            self.refreshDifficultyList();

    //            FadeInAlert();
    //            self.messageCssClass("alert alert-success text-center");
    //            self.alertMessage(data.Message);

    //            alertBox.fadeOut(3000);
    //        }).fail(function (jqXHR) {
    //            console.log(jqXHR);
    //            if (jqXHR.status === 400) {

    //                FadeInAlert();
    //                self.messageCssClass("alert alert-danger text-center");
    //                self.alertMessage(jqXHR.responseJSON.Message);
    //                alertBox.fadeOut(3000);
    //            }
    //        });


    //    }
    //}



    self.refreshSubjectList();
    self.refreshDifficultyList();

}

ko.applyBindings(new TestsViewModel());