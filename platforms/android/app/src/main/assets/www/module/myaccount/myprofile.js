app.controller('myprofile', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $route) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
       
    }

    var imageSet = false;
// console.log(image_url + $cookieStore.get('userimage'))
    if($cookieStore.get('userimage') !== undefined || $cookieStore.get('userimage') == ''){
       // alert()
        $('#bckground').css('background-image', 'url(' +$cookieStore.get('userimage') + ')');
        $('#profilepic').attr('src',$cookieStore.get('userimage'))
    }else{
        //alert()
        $('#bckground').css('background-image', 'url(assets/img/bg-profile.png)');
        $('#profilepic').css('background-image', 'url(assets/img/upload-pic1.png)');

    }
    


    // if ($cookieStore.get('ad_image')) {
    //     $('#bckground').css('background-image', 'url(' + $cookieStore.get('ad_image') + ')');
    //     $('#profilepic').attr('src',$cookieStore.get('ad_image'))
    // }

    $scope.file_uploadss = function(){
   console.log('11111')
        if (navigator.camera) {
            //alert()
            navigator.camera.getPicture(onSuccess, onFail, {
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: navigator.camera.MediaType.PICTURE,
                quality: 50,
                EncodingType : 0,
                allowEdit:true,
                destinationType: Camera.DestinationType.FILE_URI,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 300, 600)
            });

            window.onorientationchange = function() {
                var cameraPopoverHandle = new CameraPopoverHandle();
                var cameraPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 400, 500);
                cameraPopoverHandle.setPosition(cameraPopoverOptions);
            }
    
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
            imageSet = false;
            ft.upload(imageURI, encodeURI(app_url + "/upload_profile"),
            function (msg) {
                imageSet = true;
                var res = JSON.parse(msg.response);
                $('#bckground').css('background-image', 'url(' + res.data.result + ')');
                $('#profilepic').attr('src',res.data.result)
                $cookieStore.put('userimage', res.data.result);
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

        
        $scope.backtoafterSavehome = function(){
            if(imageSet){
                alert("Profile image successfully updated")
                $location.path('/dashboard/home');
            }else{
                alert("No Image updated Yet")
                $location.path('/dashboard/home');

            }
        }



});
