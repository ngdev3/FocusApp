app.controller('splash', function ($translate,$scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {

    $scope.season_fetch = function () {
        //alert('--------')
        $rootScope.initOneSignal();
        $location.path('/login');
    }



    setTimeout(function () {
      //  $scope.redirect();
    }, 100)



   

   

});