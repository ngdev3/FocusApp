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
            loading.deactive();
            res = response;
            console.log(res.data.data)
            $rootScope.morningfocus = res.data.data.length;
            if(res.data.ErrorCode == 0){
              $scope.morningfocus = res.data.data.totalval;
              if($scope.morningfocus.length > 0){
                
                $scope.truelist = true;
              }
            
              // 3874

            }else{
              loading.deactive();
            }
                
        })

    }
    
    $scope.read_notification = function (type,id) {

     // loading.active();

      var args = $.param({
          user_id : $cookieStore.get('userinfo').id,
          apikey : apikey,
          id : id,
          type:type
      })
      $http({
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: app_url + '/read_notification_list',
          data : args   
      }).then(function (response) {
          //alert();

          loading.deactive();
          res = response;
          console.log(res.data.data)
          $rootScope.morningfocus = res.data.data;
          if(res.data.ErrorCode == 0){
            $scope.get_vision_list();
          }else{
            loading.deactive();
          }
              
      })

      if(type == 'vision'){
        $location.path('/focus_menu/vision/listing');
      }



  }
});