app.controller('coaches_corner', function ($sce, $rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
       
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
        
    }

    $scope.trustSrc = function(src) {
         setTimeout(function(){
            
        loading.deactive();
    },500)
        return $sce.trustAsResourceUrl(src);
      }

   

    console.log($cookieStore.get('userinfo').id)

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
            url: app_url + '/get_coaches_center',
            data : args   
        }).then(function (response) {
            //alert();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.morningfocus = res.data.data;
               $scope.truelist = true;
            }
                
        })

    }


    $scope.focus_detail = function(id){
       // alert(id)
    }



});