var alertBox = $("#displayMessage");
alertBox.hide();

function FadeInAlert()
{
    if (alertBox.css('opacity') > 0)
        alertBox.hide();
    alertBox.show();
}

function FadeOutAlert()
{
    
}

//var userList = [
//        { Email: "admin@admin.admin", CurrentTest: "<strong>C# test</strong>", FinishedTests: 0 },
//        { Email: "user@user.user", CurrentTest: "Java test", FinishedTests: 34.95 },
//        { Email: "user2.user2.user2", CurrentTest: "", FinishedTests: 290 }
//];

function UsersViewModel() {
    var self = this;

    self.emailInput = ko.observable();

    self.selectedUser = ko.observable();
    self.selectedTest = ko.observable();

    self.messageCssClass = ko.observable();
    self.alertMessage = ko.observable();

    self.users = ko.observableArray([]);
    self.tests = ko.observableArray([]);

    //// Editable data
    //self.seats = ko.observableArray([
    //    new SeatReservation("Steve", self.availableMeals[0]),
    //    new SeatReservation("Bert", self.availableMeals[0])
    //]);

    //// Computed data
    //self.totalSurcharge = ko.computed(function () {
    //    var total = 0;
    //    for (var i = 0; i < self.seats().length; i++)
    //        total += self.seats()[i].meal().price;
    //    return total;
    //});

    self.removeUser = function (user) { self.users.remove(user) }

    self.assignTest = function () {
        if (self.selectedUser() === undefined && self.selectedTest() === undefined) {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please select a user and a test");
            alertBox.fadeOut(3000);
        }
        else if (self.selectedUser() === undefined)
        {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please select a user");
            alertBox.fadeOut(3000);
        } 
        else if(self.selectedTest() === undefined)
        {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please select a test");
            alertBox.fadeOut(3000);
        }
        else
        {
            FadeInAlert();
            self.messageCssClass("alert alert-success text-center");
            self.alertMessage("User with email : " + self.selectedUser().Email + " has been assigned test : " + self.selectedTest().Email);
            alertBox.fadeOut(3000);
        }
      
    }

    self.addUser = function ()
    {
        var regex = /\S+@\S+\.\S+/;

        if (self.emailInput() == undefined)
        {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please insert a email address");
            alertBox.fadeOut(3000);
        }
        else if (!self.emailInput().match(regex))
        {
            FadeInAlert();
            self.messageCssClass("alert alert-danger text-center");
            self.alertMessage("Please insert a vaild email address");
            alertBox.fadeOut(3000);
        }
        else {
            var userEmail = new Object();
            userEmail.Email = self.emailInput();
            $.ajax({
                url: 'http://localhost:12358/api/User',
                headers: {
                    'Authorization': $.cookie('Authorization'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: JSON.stringify(userEmail),
                datatype:"json"
            }).done(function ()
            {
                self.refreshUsers();
                self.refreshTests();
                FadeInAlert();
                self.messageCssClass("alert alert-success text-center");
                self.alertMessage("User with email: " + self.emailInput() + " has been added successfully");
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

    self.refreshUsers = function() {
        $.ajax({
            url: 'http://localhost:12358/api/User',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            self.users(data);
        });
    }

    self.refreshTests = function () {
        $.ajax({
            url: 'http://localhost:12358/api/Test',
            headers: {
                'Authorization': $.cookie('Authorization'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).done(function (data) {
            self.tests(data);
        });
    }


    self.refreshUsers();
    self.refreshTests();

}

ko.applyBindings(new UsersViewModel());