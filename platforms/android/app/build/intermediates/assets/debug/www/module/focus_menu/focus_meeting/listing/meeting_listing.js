app.controller('meeting_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_meeting = function(){
      $location.path('focus_menu/focus_meeting/add');
    } 

    $scope.meeting_detail = function(){
      $location.path('/focus_menu/focus_meeting/detail');
    } 

  

   
});