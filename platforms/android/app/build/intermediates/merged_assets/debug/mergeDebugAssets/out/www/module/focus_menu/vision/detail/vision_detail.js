app.controller('vision_detail', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


   if (!$cookieStore.get('userinfo')) {
      $location.path('/login')
  }
  
  if (!$cookieStore.get('vision_id')) {
      $location.path('/focus_menu/vision/listing')
  }



 $scope.edit_meeting = function(){
    $location.path('focus_menu/vision/add');
 } 
 
 $scope.meeting_detail = function(){
  $location.path('/focus_menu/vision/detail');
 } 
 
 $scope.select_bg = function (NewID) {
    if (NewID == undefined || NewID == '') {
        return
    }
    loading.active();
    var args = $.param({
        apikey: apikey,
        user_id: $cookieStore.get('userinfo').id,
        typeofgoal: 'vision',
        background: NewID
    })
    $http({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        url: app_url + '/get_background',
        data: args
    }).then(function (response) {
        loading.deactive();
        res = response;
        console.log(res.data.data)
        if (res.data.ErrorCode == 0) {
            $scope.getcolor = res.data.data;
            $scope.background_color = res.data.data.background_color;
            $scope.button_color = res.data.data.button_color;
            $('.body_bg , .multiple-upload').css('background', $scope.background_color)
           
            $('.button-color').css('background-color', $scope.button_color)
           
            $('.font-color, ::placeholder').css('color', res.data.data.font_color)
            $scope.truelist = true;

        }

    })
}

 
 $scope.truelist = false;
 
 $scope.get_vision_detail = function () {
    
     loading.active();

     var args = $.param({
         user_id : $cookieStore.get('userinfo').id,
         vision_id : $cookieStore.get('vision_id'),
         apikey : apikey
     })
     $http({
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         method: 'POST',
         url: app_url + '/get_focus_vision_detail',
         data : args   
     }).then(function (response) {
         //alert();
         loading.deactive();
         res = response;
         console.log(res.data.data)
         if(res.data.ErrorCode == 0){
            $scope.focus_details = res.data.data.focus_data;
            $scope.goal_name = res.data.data.goal_name;
            $scope.vision_url = res.data.data.vision_url;
            $scope.truelist = true;
            $scope.select_bg(res.data.data.focus_data.background_id);
         }
             
     })

 }


 $scope.edit_focus_detail = function(id){
    $location.path('/focus_menu/vision/add');

  } 

 
   
});