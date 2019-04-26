app.controller('menu', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   $scope.backwithremove = function () {
      window.history.back();
   }

   // navigator.app.clearHistory(); 
   
  // $scope.notific_length = $rootScope.morningfocus;
   console.log($rootScope.notification);

   $scope.myvision = function () {
      $location.path('focus_menu/vision/listing');
   }

   $scope.mygoal = function () {
      $location.path('focus_menu/goal/listing');
   }

   $scope.weekly_focus = function () {
      $location.path('focus_menu/weekly/listing');
   }

   $scope.notification = function(){
      $location.path('/notification');
  }

   $scope.back_weekly = function () {
      $location.path('dashboard/home');
   }

   $scope.focus_meeting = function () {
      $location.path('focus_menu/focus_meeting/listing');
   }

   $scope.sendtoprofileimage = function () {
      $location.path('myaccount/profile');
   }

   if($cookieStore.get('userimage') !== undefined || $cookieStore.get('userimage') == ''){
      // alert()
       $('#bckground').css('background-image', 'url(' +$cookieStore.get('userimage') + ')');
       $('#profilepic').attr('src',$cookieStore.get('userimage'))
   }else{
       //alert()
       $('#bckground').css('background-image', 'url(assets/img/bg-profile.png)');
       $('#profilepic').css('background-image', 'url(assets/img/upload-pic1.png)');

   }



});