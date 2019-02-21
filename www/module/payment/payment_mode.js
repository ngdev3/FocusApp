app.controller('payment_mode', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {


    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
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
            if ($scope[form].email_id.$error.required !== undefined || $scope[form].email_id.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name. ";
            }
            if ($scope[form].p_number.$error.required !== undefined || $scope[form].email_id.$error.tel) {
                error_str += "Phone Number, ";
            }
            if ($scope[form].card_num.$error.required !== undefined || $scope[form].email_id.$error.number) {
                error_str += "Card Number, ";
            }
            if ($scope[form].name_card.$error.required !== undefined) {
                error_str += "Name on Card, ";
            }
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
            console.log($scope)
            loading.active();

            var args = $.param({
                apikey:api_key,
                user_id: $cookieStore.get('userinfo').id,
                card_num:$scope.card_num,
                fname:$scope.fname,
                p_number:$scope.p_number,
                email_id:$scope.email_id,
                name_card:$scope.name_card,
                select_plans:$scope.select_plans,
                payment_type:$scope.payment_type,
            });

         //   alert(args)

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/login',
                data: args //forms user object

            }).then(function (response) {


            }).finally(function () {
                loading.deactive();
            });
        }
    }
});