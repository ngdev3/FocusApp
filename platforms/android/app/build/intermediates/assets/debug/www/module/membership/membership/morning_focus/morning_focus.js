app.controller('morning_focus', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
       
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
        
    }

    console.log($cookieStore.get('userinfo').id)

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
            url: app_url + '/get_morning_focus',
            data : args   
        }).then(function (response) {
            //alert();
          //  loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.morningfocus = res.data.data;
               setTimeout(function(){
                loading.deactive();
               
                $.each(res.data.data, function(key, val) {
                  console.log(count);
                 count++;
                  if(count < 4){
                  console.log("#detail_data_" + val.id);
                  $("#detail_data_" + val.id).addClass("bg-color" + count);
                }else{
      
                  count = 0;
                  $("#detail_data_" + val.id).addClass("bg-color" + count);
                }
                });
              },500)
               $scope.truelist = true;
            }
                
        })

    }


    $scope.focus_detail = function(id){
       // alert(id)
    }


   




});