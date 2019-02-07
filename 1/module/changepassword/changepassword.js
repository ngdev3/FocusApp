app.controller('changepassword', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation,$rootScope) {
    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

});