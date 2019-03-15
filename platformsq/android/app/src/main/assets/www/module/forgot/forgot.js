app.controller('forgot', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    
    loading.deactive();

    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    }


    //alert();
    /*if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
    }*/

    // function for back button on login page created by sajal
    $scope.backToLogin = function () {
        $location.path('/login');
        //window.history.back();
    }

    /*  $scope.home = function() {
         //$location.path('/home');
         window.history.back();
     } */

    /**
     * Function Name : forgot_password
     * Created By : Sajal Goyal
     * Created Date : 10/10/2018 at 06:05pm
     * Post The mobile no send the OTP By http request
     */


    $scope.forgot_password = function (form) {
        var res = '';
        //if fields are invalid
        if ($scope[form].$error) {
            var error_str = '';
            
            if ($scope[form].mobile_no.$error.required !== undefined || $scope[form].mobile_no.$error.number) {
                error_str += "Email ID ";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/> " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
            }
        };
        if ($scope[form].$valid) {
          
            loading.active();

            var args = $.param({
                email: $scope.mobile_no,
                apikey:api_key
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/forgot_password',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                
                if(res.data.ErrorCode == '1'){
                    alert('Please Enter Registered Mobile no.');
                }else{
                    alert(res.data.message);
                    $location.path('/login');     
                }
               

            }).finally(function () {
                loading.deactive();
            });




        }

    };

    $scope.backwithremove = function(){
        $location.path('/focus_menu');
    } 

     $scope.login = function () {
          $location.path('/login');
     } 

});