app.controller('vision_add', function ($rootScope, $cordovaFileTransfer, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {

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


  $scope.focus_detail = function(id){
     // alert(id)

     var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
    var targetPath = cordova.file.documentsDirectory + "testImage.png";
    var trustHosts = true;
    var options = {};

     $cordovaFileTransfer.upload(server, filePath, options)
      .then(function(result) {
        // Success!
        alert(JSON.parse(result))
      }, function(err) {
         // Error
         alert(JSON.parse(err))
      }, function (progress) {
         alert(JSON.parse(progress))
        // constant progress updates
      });

      var ft = new FileTransfer();
      var options = new FileUploadOptions();

      
      var serverURL = app_url + 'webservices/upload_advertisement';
      ft.upload(imageData, serverURL, onUploadSuccess, onUploadError, options);

  } 
  
  function uploadFile() {
      
   var fileURL = "///storage/emulated/0/DCIM/myFile"
   var uri = encodeURI("http://192.168.32.199/Projects2018/pioneer/webservices/Webapi/upload_picture");
   var options = new FileUploadOptions();
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
   options.mimeType = "text/plain";
   
   var headers = {'headerParam':'headerValue'};
   options.headers = headers;
   var ft = new FileTransfer();
   ft.upload(fileURL, uri, onSuccess, onError, options);

   function onSuccess(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
   }

   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
	
}


});