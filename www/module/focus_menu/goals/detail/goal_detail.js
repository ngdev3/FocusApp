app.controller('goal_detail', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

   $scope.truelist = false;
   
   $scope.get_focus_detail = function () {
      
       loading.active();

       var args = $.param({
           user_id : $cookieStore.get('userinfo').id,
           goal_id : $cookieStore.get('goal_id'),
           apikey : apikey
       })
       $http({
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           },
           method: 'POST',
           url: app_url + '/get_goal_detail',
           data : args   
       }).then(function (response) {
           //alert();
           loading.deactive();
           res = response;
           console.log(res.data.data)
           if(res.data.ErrorCode == 0){
              $scope.goal_action_step = res.data.data.goal_action_step;
              $scope.goal_data = res.data.data.goal_data;
              $scope.goal_days = res.data.data.goal_days;
              $scope.truelist = true;
           }
               
       })

   }

   $scope.edit_focus_detail = function(id){

      $location.path('/focus_menu/focus_meeting/add');

    } 
  

   
});