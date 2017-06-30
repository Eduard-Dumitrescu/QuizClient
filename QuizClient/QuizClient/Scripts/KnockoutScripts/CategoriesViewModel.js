var alertBox = $("#displayMessage");
alertBox.hide();

function FadeInAlert() {
    if (alertBox.css('opacity') > 0)
        alertBox.hide();
    alertBox.show();
}

function FadeOutAlert() {

}

//var userList = [
//        { Email: "admin@admin.admin", CurrentTest: "<strong>C# test</strong>", FinishedTests: 0 },
//        { Email: "user@user.user", CurrentTest: "Java test", FinishedTests: 34.95 },
//        { Email: "user2.user2.user2", CurrentTest: "", FinishedTests: 290 }
//];

function CategoriesViewModel()
{
    var self = this;

    self.categoryInput = ko.observable();
    self.difficultyInput = ko.observable();

    self.messageCssClass = ko.observable();
    self.alertMessage = ko.observable();

    self.categoryList = ko.observableArray([]);
    self.difficultyList = ko.observableArray([]);

    self.removeCategory = function (category)
    {
      
        $.ajax({
            url: 'https://localhost:44361/api/Category/' + category.Id,
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }).done(function (data) {

            self.refreshCategoryList();
            self.refreshDifficultyList();

            FadeInAlert();
            self.messageCssClass("alert alert-success text-center");
            self.alertMessage(data.Message);
            alertBox.fadeOut(3000);

        }).fail(function (jqXHR)
        {
            console.log(jqXHR);
            if (jqXHR.status === 400) {

                FadeInAlert();
                self.messageCssClass("alert alert-danger text-center");
                self.alertMessage(jqXHR.responseJSON.Message);
                alertBox.fadeOut(3000);
            }
        });

    }

    self.removeDifficulty = function (difficulty)
    {

        $.ajax({
            url: 'https://localhost:44361/api/Difficulty/' + difficulty.Id,
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }).done(function (data) {

            self.refreshCategoryList();
            self.refreshDifficultyList();

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


    self.addCategory = function ()
    {
       
        if (self.categoryInput() == undefined) {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please insert a category");
            alertBox.fadeOut(3000);
        }
        else {
            var categoryData = new Object();
            categoryData.data = self.categoryInput();
            $.ajax({
                url: 'https://localhost:44361/api/Category',
                headers: {
                    'Authorization': $.cookie('Authorization'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: JSON.stringify(categoryData),
                datatype: "json"
            }).done(function (data) {

                self.refreshCategoryList();
                self.refreshDifficultyList();

                FadeInAlert();
                self.messageCssClass("alert alert-success text-center");
                self.alertMessage(data.Message);

                alertBox.fadeOut(3000);
            }).fail(function (jqXHR)
            {
                console.log(jqXHR);
                if (jqXHR.status === 400) {

                    FadeInAlert();
                    self.messageCssClass("alert alert-danger text-center");
                    self.alertMessage(jqXHR.responseJSON.Message);
                    alertBox.fadeOut(3000);
                }
            });



        }
    }

    self.addDifficulty = function () {

        if (self.difficultyInput() == undefined) {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please insert a difficulty");
            alertBox.fadeOut(3000);
        }
        else {
            var difficultyData = new Object();
            difficultyData.data = self.difficultyInput();
            $.ajax({
                url: 'https://localhost:44361/api/Difficulty',
                headers: {
                    'Authorization': $.cookie('Authorization'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: JSON.stringify(difficultyData),
                datatype: "json"
            }).done(function (data) {

                self.refreshCategoryList();
                self.refreshDifficultyList();

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
    }


    self.refreshCategoryList = function () {
        $.ajax({
            url: 'https://localhost:44361/api/Category',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            self.categoryList(data);
        });
    }

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


    self.refreshCategoryList();
    self.refreshDifficultyList();

}

ko.applyBindings(new CategoriesViewModel());