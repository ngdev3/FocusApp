app.controller('changepassword', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation,$rootScope) {
    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    $scope.pwd_change = function (form) {
        
        var res = '';
        //if fields are invalid
        if ($scope[form].$error) {
            var error_str = '';

            if ($scope[form].old_pwd.$error.required !== undefined)
            {
                error_str += "Current Password, ";
            }
            if ($scope[form].new_pwd.$error.required !== undefined)
            {
                error_str += "New Password, ";
            }
            if ($scope[form].conf_pwd.$error.required !== undefined)
            {
                error_str += "Confirm New Password, ";
            }
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));

            if (error_str !== '')
            {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span> <br/> " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
            }
        }
       
       if ($scope[form].$valid) {
                var reg = /^[^%\s]{6,}$/;
                var reg2 = /[a-zA-Z]/;
                var reg3 = /[0-9]/;
                if (reg.test($scope.new_pwd) == false) {
                    error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
                if (reg2.test($scope.conf_pwd) == false) {
                    error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
                if (reg3.test($scope.new_pwd) == false) {
                    error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
        }
        
        
        if ($scope[form].$valid) {
            if ($scope.conf_pwd != $scope.new_pwd)
            {
                error_str += "Password and Confirm Password does not match.";
            }

            if (error_str !== '')
            {
                //error_str = " ollowing fields must have valid information " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            
            
             loading.active();
             //console.log($scope.old_pwd)
            //store cookie if check box for remember me is checked and codition goes true only otherwise none
            var args = $.param({
                apikey: apikey,
                'id'  : $cookieStore.get('userinfo').id,
                'old_password'   :   $scope.old_pwd,
                'new_password'   :    $scope.new_pwd,
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/change_pwd',
                data: args //forms user object

            }).then(function (response) {
                loading.deactive();
                res = response;
                if (res.data.ErrorCode == 0) {
                   // $cookieStore.remove('goal_id')
                    alert(res.data.message)
                    $location.path('/dashboard/home')
                 } else {
                    alert(res.data.message)
                 }


            }).finally(function () {
                loading.deactive();
            });  
        }

    };


});