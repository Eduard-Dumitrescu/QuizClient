function TestViewModel()
{
    var self = this;

    self.currentTechnology = ko.observable();

    self.questionList = ko.observableArray([]);
    self.technologyList = ko.observableArray([]);

    self.changeTechnology = function(technology) {
        alert(technology.Name);
    }

    self.populateTechnologyList = function() {
        var obj = new Object();
        var tL = [];
        obj.Name = 'HTML';
        tL.push(obj);
        var obj1 = new Object();
        obj1.Name = 'CSS';
        tL.push(obj1);
        var obj2 = new Object();
        obj2.Name = 'Javascript';
        tL.push(obj2);
        var obj3 = new Object();
        obj3.Name = 'C#';
        tL.push(obj3);
        var obj4 = new Object();
        obj4.Name = 'SQL';
        tL.push(obj4);
        self.technologyList(tL);
    }

    self.populateTechnologyList();


    //self.removeUser = function (user) {
    //    var userData = new Object();
    //    userData.UserId = user.UserId;

    //    $.ajax({
    //        url: 'https://localhost:44361/api/User',
    //        headers: {
    //            'Authorization': $.cookie('Authorization'),
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'DELETE',
    //        data: JSON.stringify(userData),
    //        datatype: "json"
    //    }).done(function (data) {
    //        self.refreshUsers();
    //        self.refreshTests();
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

    //self.assignTest = function () {
    //    if (self.selectedUser() === undefined && self.selectedTest() === undefined) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please select a user and a test");
    //        alertBox.fadeOut(3000);
    //    }
    //    else if (self.selectedUser() === undefined) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please select a user");
    //        alertBox.fadeOut(3000);
    //    }
    //    else if (self.selectedTest() === undefined) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please select a test");
    //        alertBox.fadeOut(3000);
    //    }
    //    else {
    //        var data = new Object();
    //        data.UserId = self.selectedUser().UserId;
    //        data.TestId = self.selectedTest().Id;

    //        $.ajax({
    //            url: 'https://localhost:44361/api/Exam/AssignTest',
    //            headers: {
    //                'Authorization': $.cookie('Authorization'),
    //                'Content-Type': 'application/json'
    //            },
    //            method: 'POST',
    //            data: JSON.stringify(data),
    //            datatype: "json"
    //        }).done(function (data) {
    //            self.refreshUsers();
    //            self.refreshTests();
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

    //self.addUser = function () {
    //    var regex = /\S+@\S+\.\S+/;

    //    if (self.emailInput() == undefined) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please insert a email address");
    //        alertBox.fadeOut(3000);
    //    }
    //    else if (!self.emailInput().match(regex)) {
    //        FadeInAlert();
    //        self.messageCssClass("alert alert-danger text-center");
    //        self.alertMessage("Please insert a vaild email address");
    //        alertBox.fadeOut(3000);
    //    }
    //    else {
    //        var userEmail = new Object();
    //        userEmail.Email = self.emailInput();
    //        $.ajax({
    //            url: 'https://localhost:44361/api/User',
    //            headers: {
    //                'Authorization': $.cookie('Authorization'),
    //                'Content-Type': 'application/json'
    //            },
    //            method: 'POST',
    //            data: JSON.stringify(userEmail),
    //            datatype: "json"
    //        }).done(function () {
    //            self.refreshUsers();
    //            self.refreshTests();
    //            FadeInAlert();
    //            self.messageCssClass("alert alert-success text-center");
    //            self.alertMessage("User with email: " + self.emailInput() + " has been added successfully");
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

    //self.refreshUsers = function () {
    //    $.ajax({
    //        url: 'https://localhost:44361/api/User',
    //        headers: {
    //            'Authorization': $.cookie('Authorization'),
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'GET'
    //    }).done(function (data) {
    //        self.users(data);
    //    });
    //}

    //self.refreshTests = function () {
    //    $.ajax({
    //        url: 'https://localhost:44361/api/Test',
    //        headers: {
    //            'Authorization': $.cookie('Authorization'),
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'GET'
    //    }).done(function (data) {
    //        self.tests(data);
    //    });
    //}


    //self.refreshUsers();
    //self.refreshTests();

}

ko.applyBindings(new TestViewModel());