app.controller('weekly_add', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

   if (!$cookieStore.get('userinfo')) {
      $location.path('/login')
  }
  
  $scope.mytime = new Date();
  $scope.showMeridian = true;
  $scope.goaltitle = [1, 2, 3]
  $scope.set_date = new Date();
  $scope.select_days = [];
  $scope.meeting_goals = [{}, {}, {}];
  $scope.select_days_one = []
  $scope.select_days_two = []
  $scope.select_days_three = []


  
	$scope.get_focus_detail = function () {

		loading.active();
      var args = $.param({
         user_id : $cookieStore.get('userinfo').id,
         weekly_id : $cookieStore.get('weekly_id'),
         apikey : apikey
     })
     $http({
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         method: 'POST',
         url: app_url + '/get_weekly_detail',
         data : args   
     }).then(function (response) {
         //alert();
         loading.deactive();
         res = response;
         console.log(res.data.data)
         if(res.data.ErrorCode == 0){
            $scope.focus_details = res.data.data.focus_data;
            $scope.set_time = new Date(res.data.data.focus_data.set_time);
            $scope.set_reminder = res.data.data.focus_data.set_reminder;
            $scope.set_time_notification = new Date(res.data.data.focus_data.set_notification);
            $scope.meeting_name = res.data.data.focus_data.weekly_title;
            

            $scope.goal_name = res.data.data.goal_name;
            $scope.goal_days = res.data.data.goal_days;
            setTimeout(function () {
					$.each($scope.goal_days, function (i, v) {
						console.log(v)
						$scope.select_days.push(v.id);
						$('#select_day_' + v.id).addClass('select_day')
					})
            }, 500)
            
            $scope.truelist = true;
         }
             
     })

	}




	$scope.get_days = function () {

		loading.active();

		var args = $.param({
			user_id: $cookieStore.get('userinfo').id,
			apikey: apikey
		})
		$http({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			url: app_url + '/get_days',
			data: args
		}).then(function (response) {
			//alert();
			loading.deactive();
			res = response;
			console.log(res.data.data)
			if (res.data.ErrorCode == 0) {
				$scope.morningfocus = res.data.data;
				$scope.truelist = true;
			}

		})

	}


   if ($cookieStore.get('weekly_id')) {
		$scope.get_days()
		$scope.get_focus_detail();

	}else{
		$scope.get_days()
   }
   


	$scope.select_day = function (id) {

		// alert(id)
		if ($('#select_day_' + id).hasClass('select_day')) {

			// $scope.select_days.splice(id, 1);
			// $scope.select_days.indexOf(id);
			var index = $scope.select_days.indexOf(id);
			$scope.select_days.splice(index, 1);
			$('#select_day_' + id).removeClass('select_day');
		} else {
			// select_days.push(id);/////////////////////
			$scope.select_days.push(id);
			$('#select_day_' + id).addClass('select_day');

		}
		console.log($scope.select_days)
   }
   
   
   $scope.save_goal = function (form) {

     
      var error_str = '';
      
      if ($scope.select_days.length <= 0) {
			error_str += "Select Days, ";
			//return;
      }
      
      if ($scope.meeting_name == undefined || $scope.meeting_name == '') {
         error_str += "Add Title, ";
         //return;
      }

      if ($scope.set_time == undefined || $scope.set_time == '') {
         error_str += "Set Time, ";
         //return;
      }

      if ($scope.set_reminder == undefined || $scope.set_reminder == '') {
         error_str += "Set Reminder, ";
         //return;
      }
      if ($scope.set_time_notification == undefined || $scope.set_time_notification == '') {
         error_str += "Set Notification, ";
         //return;
      }
      if (error_str !== '') {
         error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
         alert(error_str);
         return
      }

      loading.active();

      if (!$cookieStore.get('weekly_id')) {
         var args = $.param({
            user_id: $cookieStore.get('userinfo').id,
            apikey: apikey,
            action_days: $scope.select_days,
            weekly_focus_title: $scope.meeting_name,
            set_time: $scope.set_time,
            set_reminder: $scope.set_reminder,
            set_notification: $scope.set_time_notification,
         })
         fullurl = app_url + '/save_weekly_focus'
      } else {

         var args = $.param({
            user_id: $cookieStore.get('userinfo').id,
            weekly_id: $cookieStore.get('weekly_id'),
            apikey: apikey,
            action_days: $scope.select_days,
            weekly_focus_title: $scope.meeting_name,
            set_time: $scope.set_time,
            set_reminder: $scope.set_reminder,
            set_notification: $scope.set_time_notification,
         })
         fullurl = app_url + '/update_weekly'
      }



      $http({
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         method: 'POST',
         url: fullurl,
         data: args
      }).then(function (response) {
         //alert();
         loading.deactive();
         res = response;
         console.log(res.data.data)
         if (res.data.ErrorCode == 0) {
            $cookieStore.remove('weekly_id')
            alert(res.data.message)
            $location.path('/focus_menu/weekly/listing')
         } else {
            alert(res.data.message)
         }

      }).finally(function () {
         loading.deactive();
      });


   }

   
});