app.controller('weekly_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_weekly = function(){
      $cookieStore.remove('weekly_id')
      $location.path('/focus_menu/weekly/add');
    } 

    $scope.weekly_detail = function(){
      $location.path('/focus_menu/weekly/detail');
    } 


    $scope.truelist = false;
    var count = 0;
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
            //loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){

              if(res.data.data.focus_data.length > 0){

                $scope.morningfocus = res.data.data.focus_data;
                setTimeout(function(){
                  loading.deactive();
                 
                  $.each($scope.morningfocus, function(key, val) {
                    console.log(count);
                   count++;
                    if(count < 6){
                    console.log("#detail_data_" + val.id);
                    $("#detail_data_" + val.id).addClass("weekly-color-up-" + count);
                  }else{
        
                    count = 1;
                    $("#detail_data_" + val.id).addClass("weekly-color-up-" + count);
                  }
                  });
                },500)
                $scope.truelist = true;
              }else{
                loading.deactive();
              }
            }
                
        })

    }
    

    $scope.undone = function(id){
      alert(id)
    }

    $scope.weekly_details = function(id){
		$cookieStore.put('weekly_id', id);
		$location.path('/focus_menu/weekly/detail');
    }
    
    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 


  

   
});