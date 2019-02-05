app.controller('weekly_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_weekly = function(){
      $location.path('/focus_menu/weekly/add');
    } 

    $scope.weekly_detail = function(){
      $location.path('/focus_menu/weekly/detail');
    } 

  

   
});