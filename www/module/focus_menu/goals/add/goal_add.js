app.controller('goal_add', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   //alert('add')
   if (!$cookieStore.get('userinfo')) {
      $scope.loggedin = false;

   }

   if ($cookieStore.get('userinfo')) {
      $scope.loggedin = true;

   }

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


   $scope.select_day = function (id) {

      // alert(id)
      if ($('#select_day_' + id).hasClass('select_day')) {

         $('#select_day_' + id).removeClass('select_day');
      } else {
         $('#select_day_' + id).addClass('select_day');

      }
   }

   $scope.close_popup = function (id) {

      alert(id);
      return
      if ($('#select_day_' + id).hasClass('select_day')) {

         $('#select_day_' + id).removeClass('select_day');
      } else {
         $('#select_day_' + id).addClass('select_day');

      }
   }




});