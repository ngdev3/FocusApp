app.controller('payment_mode', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {


    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }


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
      //   $scope.ref.close();
         $location.path('/membership/membership_plans')
     }else{
         //$scope.ref.close();
        // $scope.ref.executeScript({code: "localStorage.removeItem('isCloseSelf')"})
        // $scope.payment_info();
     }
         
 })



    $scope.backtomenu = function(){
        $location.path('membership/before_member');
      } 

    $scope.form = {}
    $scope.plans = function () {
        var args = $.param({
            user_id: $cookieStore.get('userinfo').id,
            apikey: apikey
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_plans',
            data: args

        }).then(function (response) {

            res = response;
            console.log(res)
            if (res.data.ErrorCode == 0) {
                $scope.morningfocus = res.data.data;
            } else {
                alert(res.data.message)
            }
        }).finally(function () {
            loading.deactive();
        });
    }

    
    $scope.get_method = function () {
        var args = $.param({
            user_id: $cookieStore.get('userinfo').id,
            apikey: apikey
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_pay_method',
            data: args

        }).then(function (response) {

            res = response;
            console.log(res)
            if (res.data.ErrorCode == 0) {
                $scope.get_pay_method = res.data.data;
            } else {
                alert(res.data.message)
            }
        }).finally(function () {
            loading.deactive();
        });
    }

    // $scope.payment_type = 1;
    $scope.get_payment = function (form) {

        if ($scope[form].$error) {
            //  alert("Error");
            var error_str = '';
            if ($scope[form].select_plans.$error.required !== undefined) {
                error_str += "Select Duration, ";
            }
            if ($scope[form].payment_type.$error.required !== undefined) {
                error_str += "Payment Method, ";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                alert(error_str);
                // model.show('Alert', error_str);
            }
        };
        if ($scope[form].$valid) {
            console.log($scope.select_plans)
            if($scope.select_plans == 1)
            {
                var setget;
                
                $scope.ref = null;
                $scope.getStateSecondWindow = function() 
                { 
                    $scope.ref.executeScript(
                        {code: "localStorage.getItem('isCloseSelf')"},
                        function(data)
                        {
                    // alert("YES 160")

                            if (data == 'yes')
                            {
                                clearInterval(setget);
                            //    localStorage.removeItem('isCloseSelf')
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
                                    $scope.ref.close();
                                    $location.path('/membership/membership_plans')
                                }else{
                                    $scope.ref.close();
                                    $scope.ref.executeScript({code: "localStorage.removeItem('isCloseSelf')"})
                                   // $scope.payment_info();
                                }
                                    
                            })
                               
                            } 
                        }
                    );
                }

                              
                    $scope.ref = window.open(payment_url + '/welcome/pay/1/'+ $cookieStore.get('userinfo').id,'_blank','location=no');
                    $scope.ref.addEventListener('loadstart', function(event) {  });
                    $scope.ref.addEventListener('loadstop', function(event) {
                        setget =  setInterval($scope.getStateSecondWindow, 5000);
                        // setInterval($scope.detailofmypayment, 4000);
                    });
                    $scope.ref.addEventListener('exit', function(event) {   //$scope.detailofmypayment();
                    });

            }else if($scope.select_plans == 2){

                var setget;
                
                $scope.ref = null;
                $scope.getStateSecondWindow = function() 
                { 
                    $scope.ref.executeScript(
                        {code: "localStorage.getItem('isCloseSelf')"},
                        function(data)
                        {
                    // alert("YES 160")

                            if (data == 'yes')
                            {
                                clearInterval(setget);
                            //    localStorage.removeItem('isCloseSelf')
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
                                    $scope.ref.close();
                                    $location.path('/membership/membership_plans')
                                }else{
                                    $scope.ref.close();
                                    $scope.ref.executeScript({code: "localStorage.removeItem('isCloseSelf')"})
                                   // $scope.payment_info();
                                }
                                    
                            })
                               
                            } 
                        }
                    );
                }

               
                    
                    $scope.ref = window.open(payment_url + '/welcome/pay/2/'+$cookieStore.get('userinfo').id,'_blank','location=no');
                    $scope.ref.addEventListener('loadstart', function(event) {  });
                    $scope.ref.addEventListener('loadstop', function(event) {
                        setget =  setInterval($scope.getStateSecondWindow, 5000);
                    });
                    $scope.ref.addEventListener('exit', function(event) { });

            }else{
                alert("There is problem with Plans")
            }
        }
    }
});