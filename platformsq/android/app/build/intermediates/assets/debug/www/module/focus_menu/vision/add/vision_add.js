app.controller('vision_add', function ($cordovaImagePicker, $rootScope, $cordovaFileTransfer, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
    }


    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        sessionStorage.u_ids = device.uuid;
        uuid = device.uuid;
    }

    var currentstatus = ''

    $scope.truelist = false;
    $scope.get_choose_background = function () {

        loading.active();

        var args = $.param({
            apikey: apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_backgound_color',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if (res.data.ErrorCode == 0) {
                $scope.morningfocus = res.data.data;
                $scope.truelist = true;
            }

        })

    }

    $scope.get_collection_image = function () {
        loading.active();
        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            typeofgoal: 'vision',
            uuid: sessionStorage.u_ids
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_vision_pics',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if (res.data.ErrorCode == 0) {
                $scope.getdata = res.data.data.list;
                $scope.url = res.data.data.url;
                $scope.truelist = true;
                currentstatus = res.data.data.list.length;
            }

        })

    }



    $scope.file_uploads = function () {
        if (navigator.camera) {
            navigator.camera.getPicture(onSuccess, onFail, {
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: navigator.camera.MediaType.PICTURE,
                quality: 50,
                EncodingType: 0,
                destinationType: Camera.DestinationType.FILE_URI,
            });

        } else {
            alert('There is problem with camera')
        }

        function onFail(err) { alert(error); }

        function onSuccess(imageURI) {
          //  loading.active();
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.chunkedMode = false;
            // options.fileName = 'random.jpg';//imageURI.substr(imageURI.lastIndexOf('/') + 1);

            var params = {};
            params.user_id = $cookieStore.get('userinfo').id;
            params.uuid = sessionStorage.u_ids;
            options.params = params;
            // options.headers =  { 'Content-Type': undefined }
            // alert(params);
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(app_url + "/upload_banner_image"),
                function (result) {
                    var res = JSON.parse(result.response);

                    if (res.responseCode == 200) {

                        $scope.get_collection_image();
                        setTimeout(function () {
                            loading.deactive();
                        }, 500)
                        currentstatus = res.data.row
                        alert(res.data.msg)
                    } else {

                        alert(res.responseMessage)
                    }
                },
                function (error) {
                    alert("Error:-  " + JSON.stringify(error));
                }, options);
        }
    }


    $scope.delete_image = function (id) {
        loading.active();

        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            typeofgoal: 'vision',
            id: id,
            uuid: sessionStorage.u_ids
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/delete_vision_pics',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if (res.data.ErrorCode == 0) {
                $scope.getdata = res.data.data.list;
                $scope.url = res.data.data.url;
                $scope.truelist = true;
                $scope.get_collection_image()
                alert('Image Deleted Successfully')
            }

        })

    }

    $scope.select_bg = function () {
        if ($scope.background == undefined || $scope.background == '') {
            return
        }
        loading.active();
        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            typeofgoal: 'vision',
            background: $scope.background
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
                $('.body_bg').css('background', $scope.background_color)
                $('.save-bttn').css('background-color', $scope.button_color)
                $('.multiple-upload').css('background', $scope.background_color)
                $scope.truelist = true;

            }

        })
    }



    $scope.save_goal = function (form) {

        var error_str = '';
        if ($scope.background == undefined || $scope.background == '') {
            error_str += "Background, ";
        }
        if ($scope.goal_date == undefined || $scope.goal_date == '') {
            error_str += "Goal Date, ";
        }
        if ($scope.vision_name == undefined || $scope.vision_name == '') {
            error_str += "Enter Your Vision, ";
        }
        if (currentstatus < 0 || currentstatus > 10) {
            error_str += "Upload Picture, ";
        }

        if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
        }

        loading.active();


        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            background_id: $scope.background,
            goal_date: $scope.goal_date,
            vision_title: $scope.vision_name,
        })

        fullurl = app_url + '/upload_vision'

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: fullurl,
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            console.log(res.data.data)
            if (res.data.ErrorCode == 0) {
                $cookieStore.remove('weekly_id')
                alert(res.data.message)
                $location.path('/focus_menu/vision/listing')
            } else {
                alert(res.data.message)
            }

        }).finally(function () {
            loading.deactive();
        });


    }


});