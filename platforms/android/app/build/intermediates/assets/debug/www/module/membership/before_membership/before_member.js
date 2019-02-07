app.controller('before_member', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    
    $scope.membership = function(){
        $location.path('/membership/membership_menu');
    }

    $scope.get_membership = function(){
        $location.path('/membership/membership_plans');
    }


});
