app.controller('weekly_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_weekly = function(){
      $location.path('/focus_menu/weekly/add');
    } 

    $scope.weekly_detail = function(){
      $location.path('/focus_menu/weekly/detail');
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
            url: app_url + '/get_weekly_list',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){

              if(res.data.data.focus_data.length > 0){

                $scope.morningfocus = res.data.data.focus_data;
                $scope.truelist = true;
              }
            }
                
        })

    }
    
    $scope.weekly_details = function(id){
		$cookieStore.put('weekly_id', id);
		$location.path('/focus_menu/weekly/detail');
    }
    
    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 


  

   
});