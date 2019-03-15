app.controller('weekly_detail', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   if (!$cookieStore.get('userinfo')) {
      $location.path('/login')
  }
  
  if (!$cookieStore.get('weekly_id')) {
      $location.path('/focus_menu/weekly/listing')
  }



 $scope.edit_meeting = function(){
    $location.path('focus_menu/weekly/add');
 } 
 
 $scope.meeting_detail = function(){
  $location.path('/focus_menu/weekly/detail');
 } 
 
 
 $scope.truelist = false;
 $scope.select_days = [];

 
 $scope.get_days = function () {

   loading.active();

   var args = $.param({
      user_id: $cookieStore.get('userinfo').id,
      apikey: apikey
   })
   $http({
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: app_url + '/get_days',
      data: args
   }).then(function (response) {
      //alert();
      loading.deactive();
      res = response;
      console.log(res.data.data)
      if (res.data.ErrorCode == 0) {
         $scope.morningfocus = res.data.data;
         $scope.truelist = true;
      }

   })

}


 $scope.get_focus_detail = function () {
    
     loading.active();

     var args = $.param({
         user_id : $cookieStore.get('userinfo').id,
         weekly_id : $cookieStore.get('weekly_id'),
         apikey : apikey
     })
     $http({
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         method: 'POST',
         url: app_url + '/get_weekly_detail',
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
            setTimeout(function () {
					$.each($scope.goal_days, function (i, v) {
						console.log(v)
						$scope.select_days.push(v.id);
						$('#select_day_' + v.id).addClass('select_day')
					})
            }, 500)
            
            $scope.truelist = true;
         }
             
     })

 }


 if ($cookieStore.get('weekly_id')) {
   $scope.get_days()
   $scope.get_focus_detail();

}else{
   $scope.get_days()
}


 $scope.edit_weekly_detail = function(id){
   $cookieStore.put('weekly_id', id);
    $location.path('/focus_menu/weekly/add');

  } 

});