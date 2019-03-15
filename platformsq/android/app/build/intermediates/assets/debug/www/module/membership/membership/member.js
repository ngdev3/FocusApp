app.controller('member', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.morning_focus = function(){
        $location.path('/membership/membership_plans/morning_focus')
    }

    $scope.coaches_corner = function(){
        $location.path('/membership/membership_plans/coaches_corner')
    }

    $scope.master_class = function(){
        $location.path('/membership/membership_plans/master_class')
    }

    $scope.retreat = function(){
        $location.path('/membership/membership_plans/focus_retreat')
    }

    $scope.backtodash = function(){
        $location.path('/dashboard/home')
    }

});