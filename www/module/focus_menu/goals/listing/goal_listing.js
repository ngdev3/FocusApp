app.controller('goal_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_goal = function(){
      $location.path('/focus_menu/goal/add');
    } 

    $scope.goal_detail = function(){
      $location.path('/focus_menu/goal/detail');
    } 

  

   
});