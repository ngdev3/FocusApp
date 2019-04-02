app.controller('notification', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }
    
    loading.deactive();

    $scope.back_weekly = function(){
        $location.path('/dashboard/home');
    }

    //notification_list

    $scope.truelist = false;
    var count = 0;
    $rootScope.morningfocus = 0;
    $scope.get_vision_list = function () {

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
            url: app_url + '/notification_list',
            data : args   
        }).then(function (response) {
            //alert();
            //loading.deactive();
            res = response;
            console.log(res.data.data)
            $rootScope.morningfocus = res.data.data.length;
            if(res.data.ErrorCode == 0){

              if(res.data.data.length > 0){

                $scope.morningfocus = res.data.data;

                setTimeout(function(){
                  loading.deactive();
                 
                  $.each(res.data.data, function(key, val) {
                    console.log(count);
                   count++;
                    if(count < 4){
                    console.log("#detail_data_" + val.id);
                    $("#detail_data_" + val.id).addClass("bg-color" + count);
                  }else{
        
                    count = 0;
                    $("#detail_data_" + val.id).addClass("bg-color" + count);
                  }
                  });
                },500)

                $scope.truelist = true;
              }
            }else{
              loading.deactive();
            }
                
        })

    }
    
});