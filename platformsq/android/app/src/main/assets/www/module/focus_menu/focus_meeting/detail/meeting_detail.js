app.controller('meeting_detail', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

   
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login')
    }
    
    if (!$cookieStore.get('meeting_id')) {
        $location.path('/focus_menu/focus_meeting/listing')
    }



   $scope.edit_meeting = function(){
      $location.path('focus_menu/focus_meeting/add');
   } 
   
   $scope.meeting_detail = function(){
    $location.path('/focus_menu/focus_meeting/detail');
   } 
   
   
   $scope.truelist = false;
   
   $scope.get_focus_detail = function () {
      
       loading.active();

       var args = $.param({
           user_id : $cookieStore.get('userinfo').id,
           meeting_id : $cookieStore.get('meeting_id'),
           apikey : apikey
       })
       $http({
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           },
           method: 'POST',
           url: app_url + '/get_focus_meetings_detail',
           data : args   
       }).then(function (response) {
           //alert();
           loading.deactive();
           res = response;
           console.log(res.data.data)
           if(res.data.ErrorCode == 0){
              $scope.focus_details = res.data.data.focus_data;
              $scope.goal_name = res.data.data.goal_name;
              $scope.goal_days = res.data.data.goal_days;
              $scope.truelist = true;
           }
               
       })

   }


   

 if ($cookieStore.get('meeting_id')) {
    $scope.get_days()
    $scope.get_focus_detail();
 
 }else{
    $scope.get_days()
 }



   $scope.edit_focus_detail = function(id){

      $location.path('/focus_menu/focus_meeting/add');

    } 

   
});