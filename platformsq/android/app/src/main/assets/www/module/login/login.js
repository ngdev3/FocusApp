app.controller('login', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

     loading.active();
     //alert();
   // alert();
    if ($cookieStore.get('userinfo')) {

        $location.path('/dashboard/home')
    }

    //create table at local database to store the data of users information at time of login
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (id INTEGER PRIMARY KEY AUTOINCREMENT, uid, fname, email_address, lname, profile_image)');

    });

   /*  if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    } */

   // 
    loading.deactive();


    $scope.SentToforgot = function () {
        $location.path('/forgot');
    }
    $scope.SentToresgister = function () {
        $location.path('/register');
    }

    $scope.signup = function () {
        $location.path('/register');
    }

    $scope.default_hit = function(){

        var args = $.param({
           country_id : sessionStorage.country,
           user_id : $cookieStore.get('userinfo').uid,
           token : sessionStorage.u_ids
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/opt_cart_by_token_over_user_id',
            data: args 

        }).then(function (response) {
            console.log(response);
        }).finally(function(){

        })
    }

    // $scope.mobile_no = '8299334781';
    $scope.phoneVerifiedStatus = false;
    $scope.loginuser = function (form) {
      //  alert(sessionStorage.tokenid)
        if(!sessionStorage.tokenid){
            alert('Device Token Not Generated Try Again')
            $rootScope.initOneSignal()
            return false;
        }
        if ($scope[form].$error) {
            //  alert("Error");
            var error_str = '';
            if ($scope[form].email_id.$error.required !== undefined || $scope[form].email_id.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].userpassword.$error.required !== undefined) {
                error_str += "Password";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
               alert(error_str);
                // model.show('Alert', error_str);
            }
        };
        if ($scope[form].$valid) {

            if (jQuery.isEmptyObject($scope.userpassword)) {
                error_str += "Password";
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                model.show('Alert', error_str);
                // alert(error_str)
                return false;
            }

            loading.active();

            var args = $.param({
                email: $scope.email_id,
                password: $scope.userpassword,
                apikey:api_key,
                login_type:'Android',
                login_token:sessionStorage.tokenid
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
                console.log("---------------");
                console.log(response);
               // alert(response)
                if (!response.data.ErrorCode) {
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO userinfo ( uid, fname, email_address, lname, profile_image) VALUES ("' + response.data.data.id + '","' + response.data.data.fname + '","' + response.data.data.email + '","' + response.data.data.lname + '","' + response.data.data.profile_image + '")');
                    });
                    $cookieStore.put('userinfo', response.data.data);
                    $location.path('/dashboard/home');

                } else {

                   alert(response.data.message)
                    // model.show('Alert', response.data.responseMessage);
                }

            }).finally(function () {
                loading.deactive();
            });

        }
    };

});