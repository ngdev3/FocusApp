app.controller('meeting_add', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

	
	if (!$cookieStore.get('userinfo')) {
        $location.path('/login')
    }
   	 
	 $scope.mytime = new Date();
	$scope.showMeridian = true;
	$scope.goaltitle = [1, 2, 3]
	$scope.set_date = new Date();
	$scope.select_days = [];
	$scope.meeting_goals = [{},{},{}];
	var d = new Date();
	var n = d.getTime();
	var today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
	$scope.mytime = today;

	$scope.get_focus_detail = function () {

		loading.active();

		var args = $.param({
			user_id: $cookieStore.get('userinfo').id,
			meeting_id: $cookieStore.get('meeting_id'),
			apikey: apikey
		})
		$http({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			url: app_url + '/get_focus_meetings_detail',
			data: args
		}).then(function (response) {
			//alert();
			//loading.deactive();
			res = response;
			console.log(res.data.data)
			if (res.data.ErrorCode == 0) {
				$scope.focus_details = res.data.data.focus_data;
				$scope.goal_name = res.data.data.goal_name;
				$scope.goal_days = res.data.data.goal_days;
				
				$scope.meeting_name = res.data.data.focus_data.meeting_name
				for (i = 0; i < res.data.data.goal_name.length; i++) {
					console.log(i)
					$scope.meeting_goals[i].campuses = res.data.data.goal_name[i].action_step;
				}
				$scope.set_date = new Date(res.data.data.focus_data.set_date);
				$scope.set_time = new Date(res.data.data.focus_data.set_time);
				$scope.truelist = true;
				$scope.set_reminder = res.data.data.focus_data.set_reminder;
				$scope.notification = new Date(res.data.data.focus_data.set_notification);
				setTimeout(function () {
					$.each($scope.goal_days, function (i, v) {
						console.log(v)
						$scope.select_days.push(v.id);
						$('#select_day_' + v.id).addClass('select_day')
					})
				}, 500)
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

	if ($cookieStore.get('meeting_id')) {
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


	$scope.loginuser = function (form) {
		console.log($scope.select_days)
		var error_str = '';
		var readytoSubmit = false;
		if ($scope.meeting_goals !== undefined) {
			var keys = Object.keys($scope.meeting_goals);
			var len = keys.length;
		}

		if ($scope.select_days.length <= 0) {
			error_str += "Select Days, ";
			//return;
		}

		if ($scope.meeting_name == undefined || $scope.meeting_name == '') {
			error_str += "Meeting Name, ";
			//return;
		}

		if ($scope.set_time == undefined || $scope.set_time == '') {
			error_str += "Set Time, ";
			//return;
		}

		if ($scope.notification == undefined || $scope.notification == '') {
			error_str += "Notification, ";
			//return;
		}

		if ($scope.set_reminder == undefined || $scope.set_reminder == '') {
			error_str += "Set Reminder, ";
			//return;
		}

		if ($scope.set_date == undefined || $scope.set_date == '') {
			error_str += "Set Date, ";
			//return;
		}

		if (len == undefined || len <= 0) {
			error_str += "Goal Meeting, ";
			//return;
		}

		if (error_str !== '') {
			error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
			alert(error_str);
			return
		} else {
			readytoSubmit = true;
		}



		if (readytoSubmit) {


			loading.active();

			
			if(!$cookieStore.get('meeting_id')){
				var args = $.param({
					user_id: $cookieStore.get('userinfo').id,
					apikey: apikey,
					action_days: $scope.select_days,
					meeting_name: $scope.meeting_name,
					meeting_goals: $scope.meeting_goals,
					set_time: $scope.set_time,
					set_reminder: $scope.set_reminder,
					set_notification: $scope.notification,
					set_date: $scope.set_date
				});	
				fullurl = app_url + '/save_focus_meeting'
			}else{
				var args = $.param({
					user_id: $cookieStore.get('userinfo').id,
					apikey: apikey,
					action_days: $scope.select_days,
					meeting_name: $scope.meeting_name,
					meeting_goals: $scope.meeting_goals,
					set_time: $scope.set_time,
					set_reminder: $scope.set_reminder,
					set_notification: $scope.notification,
					set_date: $scope.set_date,
					meeting:$cookieStore.get('meeting_id')
				});	
				fullurl = app_url + '/update_focus_meeting'
			}

			$http({
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				url: fullurl,
				data: args //forms user object

			})
			
			.then(function (res) {
				console.log(res)
				if (res.data.ErrorCode == 0) {
					alert(res.data.message);
					$cookieStore.remove('meeting_id')
					$location.path('/focus_menu/focus_meeting/listing')

				} else {
					alert(res.data.message)
				}
			}).finally(function () {
				loading.deactive();
			});

		}
	};



});