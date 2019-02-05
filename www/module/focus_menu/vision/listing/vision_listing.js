app.controller('vision_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_visions = function(){
      $location.path('/focus_menu/vision/add');
    } 

    $scope.vision_detail = function(){
      $location.path('/focus_menu/vision/detail');
    } 

  

   
});