app.controller('mastery_video', function ($sce, $rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.contents = function(){
        $location.path('/membership/membership_plans/focus_retreat/self_mastery/content')
    }
    $scope.video = function(){
        $location.path('/membership/membership_plans/focus_retreat/self_mastery/video')
    }

      
    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
       
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
        
    }

    $scope.backtoback = function(){
        $location.path('/membership/membership_plans/focus_retreat')
    }


    $scope.trustSrc = function(src) {
         setTimeout(function(){
            
        loading.deactive();
    },1500)
        return $sce.trustAsResourceUrl(src);
      }

    console.log($cookieStore.get('userinfo').id)

    $scope.truelist = false;
    $scope.get_morning_focus = function () {

        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey,
            typeofgoal:'video'
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_self_mastery',
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