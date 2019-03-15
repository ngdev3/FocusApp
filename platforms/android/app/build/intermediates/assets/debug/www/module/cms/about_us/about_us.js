app.controller('aboutus', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
    
   //cms_profile

   
if (!$cookieStore.get('userinfo')) {
    $location.path('/login')
}


    $scope.backwithremove = function(){
        $location.path('/focus_menu');
    } 
   

  
    $scope.truelist = false;
    $scope.get_cms_content = function () {

        loading.active();

        var args = $.param({
            cms_id : '1',
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cms_profile',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){
               $scope.morningfocus = res.data.data.description;
               $scope.truelist = true;
            }
                
        })

    }
    
});