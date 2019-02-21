app.controller('meeting_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login')
    }

    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_meeting = function(){
        $cookieStore.remove('meeting_id');
      $location.path('focus_menu/focus_meeting/add');
    } 

    $scope.meeting_detail = function(){
      $location.path('/focus_menu/focus_meeting/detail');
    } 

    $scope.truelist = false;
    $scope.get_morning_focus = function () {

        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_focus_meetings_list',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.morningfocus = res.data.data;
               $scope.truelist = true;
            }
                
        })

    }
    
    $scope.meeting_details = function(id){
		$cookieStore.put('meeting_id', id);
		$location.path('/focus_menu/focus_meeting/detail');
    }
    

    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 

   
});