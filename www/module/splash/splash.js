app.controller('splash', function ($translate,$scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {

    //$location.path('/login');
    $scope.season_fetch = function () {
       
        $rootScope.initOneSignal();
        //  alert('--------')
        setTimeout(function () {
            $scope.$apply(
                function(){

                    $location.path('/login');
                }
            )
         }, 1000)
    }



   



   

   

});