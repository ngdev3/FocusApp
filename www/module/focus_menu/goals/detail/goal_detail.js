app.controller('goal_detail', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login')
    }


    if (!$cookieStore.get('goal_id')) {
        $location.path('/focus_menu/goal/listing');
    }


    $scope.truelist = false;

    $scope.get_focus_detail = function () {

        loading.active();

        var args = $.param({
            user_id: $cookieStore.get('userinfo').id,
            goal_id: $cookieStore.get('goal_id'),
            apikey: apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_goal_detail',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if (res.data.ErrorCode == 0) {
                $scope.goal_action_step = res.data.data.goal_action_step;
                $scope.goal_data = res.data.data.goal_data;
                var goal_date_one = '';
                var goal_date_two = '';
                var goal_date_three = '';
                $scope.goal_days_one = res.data.data.goal_days[0];
                $scope.goal_days_two = res.data.data.goal_days[1];
                $scope.goal_days_three = res.data.data.goal_days[2];
                $.each($scope.goal_days_one, function (key, val) {
                    console.log(key)
                    goal_date_one += val.short_name+","
                })
                $.each($scope.goal_days_two, function (key, val) {
                    console.log(key)
                    goal_date_two += val.short_name+","
                })
                $.each($scope.goal_days_three, function (key, val) {
                    console.log(key)
                    goal_date_three += val.short_name+","
                })
                setTimeout(function(){
                    $('#goal_0').html(goal_date_one)
                    $('#goal_1').html(goal_date_two)
                    $('#goal_2').html(goal_date_three)
                },500)

                console.log(goal_date_one);
                $scope.truelist = true;
            }

        })

    }

    $scope.edit_focus_detail = function (id) {

        $location.path('/focus_menu/goal/add');

    }



});