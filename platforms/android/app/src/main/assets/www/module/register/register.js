app.controller('register', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.backwithremove = function(){
        $cookieStore.remove('regdata');
        window.history.back();
    } 

    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
        return false;
    }

  
  


    $scope.loginusers = function (form) {
      //  loading.active();
        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "First Name, ";
            }

            if ($scope[form].lname.$error.required !== undefined) {
                error_str += "Last Name, ";
            }

            if ($scope[form].email_id.$error.required !== undefined || $scope[form].email_id.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].mobile_no.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }

            if ($scope[form].password.$error.required !== undefined) {
                error_str += "Password, ";
            }
        }
      

        if(!sessionStorage.tokenid){
         //   $rootScope.initOneSignal();
            error_str += "Token Missing, ";
        }


        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                //model.show('Alert', error_str);
                alert(error_str)
                return false;
            }
        }, 100);

        if($scope[form].$valid){
            var reg1 = /^[^%\s]{6,}$/;
            var reg2 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            var reg4 = /^[a-zA-Z ]+$/;
            var reg5 = /^[^0][0-9]{9}$/;
            var reg6 = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}/;

            if (reg4.test($scope.fname) == false) {
                error_str = "First Name should contain Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg4.test($scope.lname) == false) {
                error_str = "Last Name should contain Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg3.test($scope.email_id) == false) {
                error_str = " Please enter proper Email-ID ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg1.test($scope.password) == false) {
                error_str = " Password should contain at least one Character & Number and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg5.test($scope.mobile_no) == false) {
                error_str = "Mobile Number should contain Numbers Only & Length should be 10";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }
            if (reg6.test($scope.password) == false) {
                error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
        }
       
        if (error_str == '') {

            loading.active();
            var args = $.param({
                fname: $scope.fname,
                lname: $scope.lname,
                email: $scope.email_id,
                mobile_number: $scope.mobile_no,
                password: $scope.password,
                apikey:api_key,
                // device_type:sessionStorage.device_type,
                device_token:sessionStorage.tokenid
            });
            // alert(args);
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/register',
                data: args //forms user object

            }).then(function (response) {
                if (!response.data.ErrorCode) {
                    alert(response.data.message)
                $location.path('/login');

            } else {

               alert(response.data.message)
                // model.show('Alert', response.data.responseMessage);
            }
            }).finally(function () {
                loading.deactive();
            }) 
        }

    }
});