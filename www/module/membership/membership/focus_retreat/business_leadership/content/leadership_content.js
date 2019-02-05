app.controller('leadership_content', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    $scope.contents = function(){
        $location.path('/membership/membership_plans/focus_retreat/leadership/content')
    }
    $scope.video = function(){
        $location.path('/membership/membership_plans/focus_retreat/leadership/video')
    }

});
