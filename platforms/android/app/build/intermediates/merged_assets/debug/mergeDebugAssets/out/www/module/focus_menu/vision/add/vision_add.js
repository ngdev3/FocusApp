app.controller('vision_add', function ($filter, $cordovaImagePicker, $rootScope, $cordovaFileTransfer, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
    }

    
    $scope.set_min_date = $filter('date')(new Date(), 'yyyy-MM-dd');
    
    $scope.delete_old_vision_temp = function () {

        loading.active();

        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/delete_old_vision_temp',
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
        // get_vision_pics_per
        if($cookieStore.get('vision_id')){

            dynamicurl = "get_vision_pics_per"

        }else{
            
            dynamicurl = "get_vision_pics"
        }

        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            typeofgoal: 'vision',
            uuid: sessionStorage.u_ids,
            vision_id:$cookieStore.get('vision_id')
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/'+dynamicurl,
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



    $scope.file_uploads_at_app = function () {
        // alert("---")

        if($cookieStore.get('vision_id')){

            dynamicurl = "upload_banner_image_per"

        }else{
            
            dynamicurl = "upload_banner_image"
        }
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

        function onFail(err) { alert(err); }

        function onSuccess(imageURI) {
           loading.active();
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.chunkedMode = false;
            // options.fileName = 'random.jpg';//imageURI.substr(imageURI.lastIndexOf('/') + 1);

            var params = {};
            params.user_id = $cookieStore.get('userinfo').id;
            params.uuid = sessionStorage.u_ids;
            params.vision_id = $cookieStore.get('vision_id');
            options.params = params;
            // options.headers =  { 'Content-Type': undefined }
            // alert(params);
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(app_url + "/"+dynamicurl),
                function (result) {
                    loading.deactive();
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
                    loading.deactive();
                    alert("Error:-  " + JSON.stringify(error));
                }, options);
        }
    }

    $scope.prompt = function(id){
        $.confirm({
            title: 'Confirm!',
            content: 'Are You Sure!',
            columnClass:'col-md-4 col-md-offset-4',
            buttons: {
                confirm: function () {
                    btnClass: 'btn-blue'
                    $scope.delete_image(id);
                },
                cancel: function () {
                    // $.alert('Canceled!');
                },
            }
        });
    }
   


    var dynamicurl;
    $scope.delete_image = function (id) {
        // console.log(); return


        if($scope.getdata.length == 1){
            alert("You can not delete last image")
            return false;
        }

        if($cookieStore.get('vision_id')){

            dynamicurl = "delete_vision_pics_per"

        }else{
            
            dynamicurl = "delete_vision_pics"
        }

        loading.active();

        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            typeofgoal: 'vision',
            id: id,
            uuid: sessionStorage.u_ids,
            vision_id:$cookieStore.get('vision_id')
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/'+dynamicurl,
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


    $scope.view_image = function (url, file_name) {
        //loading.active();
        $('#profilepic').attr('src',url+"/"+file_name)
        $('#notification_one').toggleClass('open');
		$('.page-wrapper').toggleClass('blur');
    }
    $scope.view_image_close = function () {
        //loading.active();
        $('#notification_one').removeClass('open');
		$('.page-wrapper').removeClass('blur');
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
                $('.body_bg , .multiple-upload').css('background', $scope.background_color)
               
                $('.button-color').css('background-color', $scope.button_color)
               
                $('.font-color, ::placeholder').css('color', res.data.data.font_color)
                $scope.truelist = true;

            }

        })
    }

    
    $scope.get_choose_background();
    $scope.select_bg();


    $scope.get_focus_detail = function () {

		loading.active();

		var args = $.param({
			user_id: $cookieStore.get('userinfo').id,
			vision_id: $cookieStore.get('vision_id'),
			apikey: apikey
		})
		$http({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			url: app_url + '/get_focus_vision_detail',
			data: args
		}).then(function (response) {
			//alert();
			//loading.deactive();
			res = response;
			console.log(res.data.data)
			if (res.data.ErrorCode == 0) {
                $scope.focus_details = res.data.data.focus_data;
                $scope.background = $scope.focus_details.background_id
                $scope.vision_name = $scope.focus_details.vision_title
                // $scope.goal_date = $scope.focus_details.vision_title
                $scope.goal_date = new Date($scope.focus_details.goal_date);
                $scope.getdata = res.data.data.goal_name;
                $scope.select_bg();
                $scope.url = res.data.data.vision_url;
				$scope.goal_days = res.data.data.goal_days;
			}
		})
	}



    

    if ($cookieStore.get('vision_id')) {
    $scope.get_focus_detail();
	}else{
        $scope.delete_old_vision_temp();
	}



    $scope.save_goal = function (form) {

        if($cookieStore.get('vision_id')){

            dynamicurl = "upload_vision_update"

        }else{
            
            dynamicurl = "upload_vision"
        }

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

        if (currentstatus < 0 || currentstatus > 10 || currentstatus == undefined || currentstatus == '') {
            error_str += "Upload Picture, ";
        }

       

        if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
        }

        // console.log(currentstatus)
        // return
        loading.active();


        var args = $.param({
            apikey: apikey,
            user_id: $cookieStore.get('userinfo').id,
            background_id: $scope.background,
            goal_date: $scope.goal_date,
            vision_title: $scope.vision_name,
            vision_id: $cookieStore.get('vision_id'),
        })

        fullurl = app_url + '/'+dynamicurl
      //  alert(args);
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
                $cookieStore.remove('vision_id')
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