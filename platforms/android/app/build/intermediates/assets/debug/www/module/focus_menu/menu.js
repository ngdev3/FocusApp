app.controller('menu', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.myvision = function(){
      $location.path('focus_menu/vision/listing');
   } 
   
   $scope.mygoal = function(){
      $location.path('focus_menu/goal/listing');
   } 
    
   $scope.weekly_focus = function(){
      $location.path('focus_menu/weekly/listing');
   } 

   $scope.focus_meeting = function(){
      $location.path('focus_menu/focus_meeting/listing');
   }  

  

   
});