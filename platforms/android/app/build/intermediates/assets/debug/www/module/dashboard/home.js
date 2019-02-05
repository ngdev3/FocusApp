app.controller('home', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {
    

    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
       
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
        
    }
    
   

    $scope.login = function(){
        $location.path('/login');
    }

    $scope.focus_menu = function(){
        $location.path('/focus_menu');
    }

    $scope.membership = function(){
        $location.path('/membership/before_member');
    }

    $scope.myprofile = function(){
        $location.path('/myaccount/profile');
    }

    $scope.queries = function(){
        $location.path('/queries');
    }

    $scope.change_password = function(){
        $location.path('/changepassword');
    }

    $scope.aboutus = function(){
        $location.path('/aboutus');
    }

    $scope.contactus = function(){
        $location.path('/contactus');
    }

    $scope.terms = function(){
        $location.path('/terms');
    }

    $scope.signout = function(){
        $location.path('/membership/before_member');
    }


});


