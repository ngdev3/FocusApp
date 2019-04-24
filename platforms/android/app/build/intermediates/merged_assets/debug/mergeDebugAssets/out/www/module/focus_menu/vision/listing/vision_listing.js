app.controller('vision_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.backtomenu = function(){
      $location.path('/focus_menu');
    } 

    $cookieStore.remove('vision_id');

 
    
    $scope.add_visions = function(){
      // alert('We are Working on it')
      // return

      $location.path('/focus_menu/vision/add');
    } 

  

    
    $scope.truelist = false;
    var count = 0;
    $scope.get_vision_list = function () {

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
            url: app_url + '/get_vision_list',
            data : args   
        }).then(function (response) {
            //alert();
          //  loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){

              if(res.data.data.focus_data.length > 0){

                $scope.morningfocus = res.data.data.focus_data;

                setTimeout(function(){
                  loading.deactive();
                 
                  $.each(res.data.data.focus_data, function(key, val) {
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
              }else{
                loading.deactive();
              }
            }
                
        })

    }
    
    $scope.vision_detail = function(id){
      $cookieStore.put('vision_id', id);
      $location.path('/focus_menu/vision/detail');
    } 

    
    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 


  

  
});