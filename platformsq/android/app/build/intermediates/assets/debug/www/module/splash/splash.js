app.controller('splash', function ($scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {

    //$location.path('/login');
    $scope.season_fetch = function () {
       
        $rootScope.initOneSignal();
        //  alert('--------')
        setTimeout(function () {
            $scope.$apply(
                function(){

                    $location.path('/login');
                    $rootScope.initOneSignal();
                    window.plugins.OneSignal
                    .startInit(firebase)
                    .endInit();
                    
                }
            )
         }, 1000)
    }



   



   

   

});