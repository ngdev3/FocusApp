app.controller('before_member', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

	if (!$cookieStore.get('userinfo')) {
        $location.path('/login')
    }
    
    $scope.membership = function(){
        $location.path('/membership/membership_menu');
    }

    $scope.backtohome = function(){
        $location.path('/dashboard/home');
    }

    $scope.get_membership = function(){
        $location.path('/membership/membership_plans');
    }
    $scope.payment_info = function(){
        $location.path('payment_info');
    }

    $scope.get_membership_check = function(){
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
            url: app_url + '/check_membership',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
              $location.path('/membership/membership_plans')
            }else{
                $scope.payment_info();
            }
                
        })
    }

    


});
