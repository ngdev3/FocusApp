app.controller('mastery_content', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

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
    

    console.log($cookieStore.get('userinfo').id)

    $scope.truelist = false;
    $scope.get_morning_focus = function () {

        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey,
            typeofgoal:'content'
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
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.first = res.data.data.first;
               $scope.fourth = res.data.data.fourth;
               $scope.second = res.data.data.second;
               $scope.third = res.data.data.third;

               $scope.first_cat = res.data.data.cat[0];

               $scope.second_cat = res.data.data.cat[1];

               $scope.third_cat = res.data.data.cat[2];

               $scope.fourth_cat = res.data.data.cat[3];
               
               $scope.truelist = true;
            }
                
        })

    }


    $scope.focus_detail = function(id){
       // alert(id)
    }


    
});