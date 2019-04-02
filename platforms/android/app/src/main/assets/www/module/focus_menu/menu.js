app.controller('menu', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   $scope.backwithremove = function () {
      window.history.back();
   }
   
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

   console.log($cookieStore.get('ad_image'))
   if ($cookieStore.get('ad_image') !== undefined) {

      $('#bckground').css('background-image', 'url(' + $cookieStore.get('ad_image') + ')');
      $('#profilepic').attr('src', $cookieStore.get('ad_image'))

   } else if ($cookieStore.get('userinfo').profile_image !== undefined) {
      $('#bckground').css('background-image', 'url(' + image_url + $cookieStore.get('userinfo').profile_image + ')');
      $('#profilepic').attr('src', image_url + $cookieStore.get('userinfo').profile_image)
   } else {
      $('#bckground').css('background-image', 'url(assets/img/profile-pic.png)');
      $('#profilepic').css('background-image', 'url(assets/img/upload-pic1.png)');

   }



});