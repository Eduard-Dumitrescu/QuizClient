var alertBox = $("#displayMessage");
alertBox.hide();

function FadeInAlert() {
    if (alertBox.css('opacity') > 0)
        alertBox.hide();
    alertBox.show();
}

function FadeOutAlert() {

}

var answerListMock = [
        { AnswerText: ko.observable(""), AnswerValue: ko.observable(false) },
        { AnswerText: ko.observable(""), AnswerValue: ko.observable(false) },
        { AnswerText: ko.observable(""), AnswerValue: ko.observable(false) },
        { AnswerText: ko.observable(""), AnswerValue: ko.observable(false) }
];

function QuestionsViewModel() {
    var self = this;

    self.questionTextInput = ko.observable();
    self.selectedQuestionType = ko.observable();
    self.selectedSubject = ko.observable();
    self.selectedDifficulty = ko.observable();

    self.messageCssClass = ko.observable();
    self.alertMessage = ko.observable();

    self.questionTypeList = ko.observableArray([]);
    self.difficultyList = ko.observableArray([]);
    self.subjectList = ko.observableArray([]);
    self.answersList = ko.observableArray(answerListMock);


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
            self.subjectList(data);
        });
    }

    self.refreshQuestionTypeList = function() {
        $.ajax({
            url: 'https://localhost:44361/api/QuestionType',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            self.questionTypeList(data);
        });
    }


    self.addQuestion = function () {

        var data = new Object();
        data.Text = self.questionTextInput();
        data.DifficultyId = self.selectedDifficulty().Id;
        data.SubjectId = self.selectedSubject().Id;
        data.TypeId = self.selectedQuestionType().Id;

        data.Answers = [
        { Text: self.answersList()[0].AnswerText(), Value: self.answersList()[0].AnswerValue() },
        { Text: self.answersList()[1].AnswerText(), Value: self.answersList()[1].AnswerValue() },
        { Text: self.answersList()[2].AnswerText(), Value: self.answersList()[2].AnswerValue() },
        { Text: self.answersList()[3].AnswerText(), Value: self.answersList()[3].AnswerValue() }
        ];

      
        
        $.ajax({
            url: 'https://localhost:44361/api/Questions',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(data),
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
    self.refreshQuestionTypeList();
    self.refreshDifficultyList();

}

ko.applyBindings(new QuestionsViewModel());