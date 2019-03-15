app.controller('terms', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
   

    //cms_profile
    
if (!$cookieStore.get('userinfo')) {
    $location.path('/login')
}


    $scope.backwithremove = function(){
        $location.path('/focus_menu');
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
            cms_id : '2',
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cms_profile',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.morningfocus = res.data.data.description;
               $scope.truelist = true;
            }
                
        })

    }
    
});