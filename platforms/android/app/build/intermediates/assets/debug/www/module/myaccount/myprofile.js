app.controller('myprofile', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $route) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
       
    }
console.log($cookieStore.get('userinfo').profile_image)
    if($cookieStore.get('userinfo').profile_image !== undefined || $cookieStore.get('userinfo').profile_image !== ''){
        $('#bckground').css('background-image', 'url(' + image_url + $cookieStore.get('userinfo').profile_image + ')');
        $('#profilepic').attr('src',image_url + $cookieStore.get('userinfo').profile_image)
    }else{
        $('#bckground').css('background-image', 'url(assets/img/profile-pic.png)');
        $('#profilepic').css('background-image', 'url(assets/img/upload-pic1.png)');

    }
    


    if ($cookieStore.get('ad_image')) {
        $('#bckground').css('background-image', 'url(' + $cookieStore.get('ad_image') + ')');
        $('#profilepic').attr('src',$cookieStore.get('ad_image'))
    }

    $scope.file_uploadss = function(){
   console.log('11111')
        if (navigator.camera) {
            //alert()
            navigator.camera.getPicture(onSuccess, onFail, {
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: navigator.camera.MediaType.PICTURE,
                quality: 50,
                EncodingType : 0,
                destinationType: Camera.DestinationType.FILE_URI,
            });
    
        }
        
        function onFail(err){ 
            alert(error); 
        }
    
        function onSuccess(imageURI) {
           loading.active()
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = 'random.jpg';//imageURI.substr(imageURI.lastIndexOf('/') + 1);
        
            var params = {};
            params.user_id = $cookieStore.get('userinfo').id;
            options.chunkedMode = false;
            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(app_url + "/upload_profile"),
            function (msg) {
              // alert(JSON.stringify(msg))
                var res = JSON.parse(msg.response);

                $('#bckground').css('background-image', 'url(' + res.data.result + ')');
                $('#profilepic').attr('src',res.data.result)
             
                // $cookieStore.put('userinfo',data);
                $cookieStore.put('ad_image', res.data.result);
                alert('Profile image successfully updated')
                setTimeout(function(){
                    loading.deactive();
                    
                },500)
            },
            function (error) {
                alert("Error:-  "+JSON.stringify(error));
                setTimeout(function(){
                    loading.deactive();
                    
                },500)
            }, options);
        }
        }


        $scope.backtohome = function(){
            $location.path('/dashboard/home');
        }

});
