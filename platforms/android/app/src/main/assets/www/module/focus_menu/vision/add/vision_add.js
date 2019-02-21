app.controller('vision_add', function ($cordovaImagePicker, $rootScope, $cordovaFileTransfer, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

   if (!$cookieStore.get('userinfo')) {
      $scope.loggedin = false;
     
  }

  if ($cookieStore.get('userinfo')) {
      $scope.loggedin = true;
      
  }

  console.log($cookieStore.get('userinfo').id)

  $scope.truelist = false;
  $scope.get_choose_background = function () {

      loading.active();

      var args = $.param({
          apikey : apikey
      })
      $http({
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: app_url + '/get_backgound_color',
          data : args   
      }).then(function (response) {
          //alert();
          loading.deactive();
          res = response;
          console.log(res.data.data)
          if(res.data.ErrorCode == 0){
             $scope.morningfocus = res.data.data;
             $scope.truelist = true;
          }
              
      })

  }


//   $scope.focus_detail = function(id){
//      // alert(id)

//      var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
//     var targetPath = cordova.file.documentsDirectory + "testImage.png";
//     var trustHosts = true;
//     var options = {};

//      $cordovaFileTransfer.upload(server, filePath, options)
//       .then(function(result) {
//         // Success!
//         alert(JSON.parse(result))
//       }, function(err) {
//          // Error
//          alert(JSON.parse(err))
//       }, function (progress) {
//          alert(JSON.parse(progress))
//         // constant progress updates
//       });

//       var ft = new FileTransfer();
//       var options = new FileUploadOptions();

      
//       var serverURL = app_url + 'webservices/upload_advertisement';
//       ft.upload(imageData, serverURL, onUploadSuccess, onUploadError, options);

//   } 
  
//   function openFilePicker(selection) {

//     var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
//     var options = setOptions(srcType);
//     var func = createNewFileEntry;

//     if (selection == "picker-thmb") {
//         // To downscale a selected image,
//         // Camera.EncodingType (e.g., JPEG) must match the selected image type.
//         options.targetHeight = 100;
//         options.targetWidth = 100;
//     }

//     navigator.camera.getPicture(function cameraSuccess(imageUri) {

//         // Do something with image

//     }, function cameraError(error) {
//         console.debug("Unable to obtain picture: " + error, "app");

//     }, options);
// }


  $scope.file_uploads = function(){
   
    // https://github.com/wymsee/cordova-imagePicker
    // cordova plugin add cordova-plugin-image-picker
    // var options = {
    //     maximumImagesCount: 10,
    //     width: 800,
    //     height: 800,
    //     quality: 80
    //    };
     
    //    $cordovaImagePicker.getPictures(options)
    //      .then(function (results) {
    //        for (var i = 0; i < results.length; i++) {
    //         alert('Image URI: ' + results[i]);
    //        }
    //      }, function(error) {
    //        // error getting photos
    //      });

    if (navigator.camera) {
        //alert()
        navigator.camera.getPicture(onSuccess, onFail, {
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: navigator.camera.MediaType.PICTURE,
            quality: 50,
            EncodingType : 0,
            destinationType: Camera.DestinationType.FILE_URI,
        });

    }else{
        alert('false')
    }
    
    function onFail(err){ alert(error); }

    function onSuccess(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = 'random.jpg';//imageURI.substr(imageURI.lastIndexOf('/') + 1);
        // options.mimeType = "image/jpeg";
        // alert(options)
        
       // var params = new Object();
        //params.apikey = apikey;
        //params.type = "video";
        //params.user_id = $cookieStore.get('userinfo').id;
       // params.user_type = $cookieStore.get('userinfo').user_type;
        
//options.params = params;
       // options.chunkedMode = false;
       
      //  alert(JSON.stringify(options));
        var ft = new FileTransfer();
        ft.upload(imageURI, "http://192.168.31.199/Projects2018/pioneer/webservices/Webapi/upload_banner_image",
        function (result) {
            alert(" result: " + JSON.stringify( result));
        },
        function (error) {
            alert("Error:-  "+JSON.stringify(error));
        }, options);
    }
    }

//   function uploadFile() {
      
//    var fileURL = "///storage/emulated/0/DCIM/myFile"
//    var uri = encodeURI("http://192.168.32.199/Projects2018/pioneer/webservices/Webapi/upload_picture");
//    var options = new FileUploadOptions();
//    options.fileKey = "file";
//    options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
//    options.mimeType = "text/plain";
   
//    var headers = {'headerParam':'headerValue'};
//    options.headers = headers;
//    var ft = new FileTransfer();
//    ft.upload(fileURL, uri, onSuccess, onError, options);

//    function onSuccess(r) {
//       console.log("Code = " + r.responseCode);
//       console.log("Response = " + r.response);
//       console.log("Sent = " + r.bytesSent);
//    }

//    function onError(error) {
//       alert("An error has occurred: Code = " + error.code);
//       console.log("upload error source " + error.source);
//       console.log("upload error target " + error.target);
//    }
	
// }


});