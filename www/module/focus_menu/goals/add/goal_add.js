app.controller('goal_add', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   //alert('add')


   if (!$cookieStore.get('userinfo')) {
      $scope.loggedin = false;

   }

   if ($cookieStore.get('userinfo')) {
      $scope.loggedin = true;

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

   var d = new Date();
   var n = d.getTime();
   var today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
   $scope.mytime = today;

   $scope.truelist = false;
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


   $scope.select_day = function (id, type) {
      if (type == 'one') {
         if ($('#select_day_one_' + id).hasClass('select_day')) {
            var index = $scope.select_days_one.indexOf(id);
            $scope.select_days_one.splice(index, 1);
            $('#select_day_one_' + id).removeClass('select_day');
         } else {
            $scope.select_days_one.push(id);
            $('#select_day_one_' + id).addClass('select_day');

         }
      } else if (type == 'two') {
         if ($('#select_day_two_' + id).hasClass('select_day')) {
            var index = $scope.select_days_two.indexOf(id);
            $scope.select_days_two.splice(index, 1);
            $('#select_day_two_' + id).removeClass('select_day');
         } else {
            $scope.select_days_two.push(id);
            $('#select_day_two_' + id).addClass('select_day');

         }
      } else if (type == 'three') {
         if ($('#select_day_three_' + id).hasClass('select_day')) {
            var index = $scope.select_days_three.indexOf(id);
            $scope.select_days_three.splice(index, 1);
            $('#select_day_three_' + id).removeClass('select_day');
         } else {
            $scope.select_days_three.push(id);
            $('#select_day_three_' + id).addClass('select_day');

         }
      }


   }

   // alert($scope.select_days_one)

   $scope.close_popup = function (id) {

      $('#' + id).removeClass('open')
      // alert(id);
      return

   }

   console.log($scope.select_days_one);
   console.log($scope.select_days_two);
   console.log($scope.select_days_three);



   $scope.save_popup = function (type) {

      len1 = $scope.select_days_one.length;
      len2 = $scope.select_days_two.length;
      len3 = $scope.select_days_three.length;

      console.log(len1 + "----" + len2 + "-----" + len3)
      var error_str = '';

      if (type == 'notification_one') {

         if (len1 <= 0) {
            error_str += "Select Days, ";
            //return;
         }

         if ($scope.notification_one == undefined || $scope.notification_one == '') {
            error_str += "Set Time, ";
            //return;
         }

         if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
         }
         $('#' + type).removeClass('open')
         // alert(id);
         return

      } else if (type == 'notification_two') {

         if (len2 <= 0) {
            error_str += "Select Days, ";
            //return;
         }

         if ($scope.notification_two == undefined || $scope.notification_two == '') {
            error_str += "Set Time, ";
            //return;
         }

         if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
         }
         $('#' + type).removeClass('open')
         // alert(id);
         return

      } else if (type == 'notification_three') {


         if (len3 <= 0) {
            error_str += "Select Days, ";
            //return;
         }

         if ($scope.notification_three == undefined || $scope.notification_three == '') {
            error_str += "Set Time, ";
            //return;
         }

         if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
         }
         $('#' + type).removeClass('open')
         // alert(id);
         return

      }
   }

   $scope.save_goal = function (form) {


      var error_str = '';
      if ($scope.goal_name == undefined || $scope.goal_name == '') {
         error_str += "Your Goal, ";
         //return;
      }
      if ($scope.goal_date == undefined || $scope.goal_date == '') {
         error_str += "Target Date, ";
         //return;
      }
      if ($scope.action_step_one == undefined || $scope.action_step_one == '') {
         error_str += "First Action Step here, ";
         //return;
      }
      if ($scope.action_step_two == undefined || $scope.action_step_two == '') {
         error_str += "Second Action Step here, ";
         //return;
      }
      if ($scope.action_step_three == undefined || $scope.action_step_three == '') {
         error_str += "Three Action Step here, ";
         //return;
      }

      if (len1 <= 0 || len2 <= 0 || len3 <= 0) {

         error_str += "Select Days at All Notification Action Steps";

      }
      if (error_str !== '') {
         error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
         alert(error_str);
         return
      }

      loading.active();

      collection_step = [$scope.action_step_one, $scope.action_step_two, $scope.action_step_three];
      collection_days = [$scope.select_days_one, $scope.select_days_two, $scope.select_days_three];
      collection_time = [$scope.notification_one, $scope.notification_two, $scope.notification_three];

      var args = $.param({
         user_id: $cookieStore.get('userinfo').id,
         apikey: apikey,
         goal_name: $scope.goal_name,
         target_date: $scope.goal_date,
         action_step_title: collection_step,
         action_days: collection_days,
         action_time: collection_time,
      })
      $http({
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         method: 'POST',
         url: app_url + '/save_my_goal',
         data: args
      }).then(function (response) {
         //alert();
         loading.deactive();
         res = response;
         console.log(res.data.data)
         if (res.data.ErrorCode == 0) {
            alert(res.data.message)
            $location.path('/focus_menu/goal/listing')
         } else {
            alert(res.data.message)
         }

      }).finally(function () {
         loading.deactive();
      });


   }










});