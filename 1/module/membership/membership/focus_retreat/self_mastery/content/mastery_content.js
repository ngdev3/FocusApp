app.controller('mastery_content', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    $scope.contents = function(){
        $location.path('/membership/membership_plans/focus_retreat/self_mastery/content')
    }
    $scope.video = function(){
        $location.path('/membership/membership_plans/focus_retreat/self_mastery/video')
    }
    
});