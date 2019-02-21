app.controller('goal_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')

if (!$cookieStore.get('userinfo')) {
    $location.path('/login')
}


    $scope.backwithremove = function(){
        window.history.back();
    } 
    $cookieStore.remove('goal_id');

    $scope.add_goal = function(){
        $cookieStore.remove('goal_id');
      $location.path('/focus_menu/goal/add');
    } 

    $scope.goal_detail = function(){
      $location.path('/focus_menu/goal/detail');
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
            url: app_url + '/get_goal_list',
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
    
    $scope.goal_details = function(id){
		$cookieStore.put('goal_id', id);
		$location.path('/focus_menu/goal/detail');
	}
   
});