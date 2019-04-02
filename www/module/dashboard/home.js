app.controller('home', function ($controller, $scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {
    

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        
    }
    

    $scope.username = $cookieStore.get('userinfo').fname + " " + $cookieStore.get('userinfo').lname
   $scope.user_type = $cookieStore.get('userinfo').user_type;

    $scope.login = function(){
        $location.path('/login');
    }

    $scope.focus_menu = function(){
        $location.path('/focus_menu');
    }
    $scope.notification = function(){
        $location.path('/notification');
    }

    $scope.membership = function(){
        $location.path('/membership/before_member');
    }

    $scope.myprofile = function(){
        $location.path('/myaccount/profile');
    }

    $scope.queries = function(){
        alert('Chat API is Needed ');
        // $location.path('/queries');
    }

    $scope.change_password = function(){
        $location.path('/changepassword');
    }

    $scope.aboutus = function(){
        $location.path('/aboutus');
    }

    $scope.contactus = function(){
        alert('Coming Soon');
        // $location.path('/contactus');
    }

    $scope.terms = function(){
        $location.path('/terms');
    }

    $scope.logout = function(){
        $cookieStore.remove('userinfo');
        $cookieStore.remove('aid');
        $cookieStore.remove('cart');
        $cookieStore.remove('orderID');
        $cookieStore.remove('orderinfo');
        $cookieStore.remove('productinfo');
        $cookieStore.remove('search');
        $cookieStore.remove('subcategoryInfo');
        $cookieStore.remove('ticketid');
        $cookieStore.remove('FullName');
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM userinfo');
        });


        $location.path('/login');
    }


});


