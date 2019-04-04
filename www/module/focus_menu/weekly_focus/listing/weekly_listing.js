app.controller('weekly_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

// alert('li')
    $scope.backwithremove = function(){
        window.history.back();
    } 

    $scope.add_weekly = function(){
      $cookieStore.remove('weekly_id')
      $location.path('/focus_menu/weekly/add');
    } 

    $scope.weekly_detail = function(){
      $location.path('/focus_menu/weekly/detail');
    } 


    $scope.truelist = false;
    var count = 0;
    $scope.get_morning_focus = function () {

        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_weekly_list',
            data : args   
        }).then(function (response) {
            //alert();
            //loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){

              if(res.data.data.focus_data.length > 0){

                $scope.morningfocus = res.data.data.focus_data;
                setTimeout(function(){
                  loading.deactive();
                 
                  $.each($scope.morningfocus, function(key, val) {
                    console.log(count);
                   count++;
                    if(count < 6){
                    console.log("#detail_data_" + val.id);
                    $("#detail_data_" + val.id).addClass("weekly-color-up-" + count);
                  }else{
        
                    count = 1;
                    $("#detail_data_" + val.id).addClass("weekly-color-up-" + count);
                  }
                  });
                },100)
                $scope.truelist = true;
              }else{
                loading.deactive();
              }
            }
                
        })
    }
   

    $scope.undone = function(id){
     // alert(id)//undone_weekly
      
      loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey,
            weekly_id:id
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/undone_weekly',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
              $scope.get_morning_focus();
              $scope.totalstats()
              alert("Successfully Updated")
            }else{
              alert("There is problem with Weekly Focus")
            }
                
        })

//				<button ng-if="x.stats == 'done'" ng-click="undone(x.id)">Undone</button>
        //
    }


    $scope.totalstats = function(id){
      // alert(id)//undone_weekly
       
       loading.active();
 
         var args = $.param({
             user_id : $cookieStore.get('userinfo').id,
             apikey : apikey,
             weekly_id:id
         })
         $http({
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
             method: 'POST',
             url: app_url + '/get_weekly_stats',
             data : args   
         }).then(function (response) {
             //alert();
             loading.deactive();
             res = response;
             console.log(res.data.data)
             if(res.data.ErrorCode == 0){
               $scope.get_stats = res.data.data;
              // alert("Successfully Updated")
             }else{
               alert("There is problem with Weekly Focus Statistic")
             }
                 
         })
 
 //				<button ng-if="x.stats == 'done'" ng-click="undone(x.id)">Undone</button>
         //
     }

   //  $scope.totalstats();


   $scope.close_popup = function (id) {

    $('.modal-wrapper').removeClass('open')
    // alert(id);
    return

 }

    $scope.weekly_details = function(id){
		$cookieStore.put('weekly_id', id);
		$location.path('/focus_menu/weekly/detail');
    }
    
    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 


  

   
});