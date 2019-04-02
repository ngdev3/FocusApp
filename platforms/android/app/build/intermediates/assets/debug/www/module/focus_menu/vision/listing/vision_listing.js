app.controller('vision_listing', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.backwithremove = function(){
        window.history.back();
    } 

  //   function alertDismissed() {
  //     // do something
  //     alert('Wprking')
  // }
  
  // navigator.notification.alert(
  //     'You are the winner!',  // message
  //     alertDismissed,         // callback
  //     'Game Over',            // title
  //     'Done'                  // buttonName
  // );

  //     var clientIDs = {
  //       "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
  //       "PayPalEnvironmentSandbox": "access_token$sandbox$d7t5tjqzgv57mzw9$8e106496070036bfc3fa8935c019d898"
  //     };

  //     function configuration() {
  //       // for more options see `paypal-mobile-js-helper.js`
  //       var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
  //       return config;
  //     }


  //     function onPayPalMobileInit() {
  //       // must be called
  //       // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
  //       PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", configuration(), onPrepareRender);
  //     }

  //     PayPalMobile.init(clientIDs, onPayPalMobileInit);

    
  //   function onSuccesfulPayment(payment) {
  //     alert("payment success: " + JSON.stringify(payment, null, 4));
  //   }

  //   // This code is only used for independent card.io scanning abilities
  //   function onCardIOComplete(card) {
  //     alert("Card Scanned success: " + JSON.stringify(card, null, 4));
  //   }

  //   function onAuthorizationCallback(authorization) {
  //     alert("authorization: " + JSON.stringify(authorization, null, 4));
  //   }

  //   function createPayment () {
  //     // for simplicity use predefined amount
  //     // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
  //     var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
  //     var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
  //     return payment;
  //   }

  //   function onPrepareRender (){

  //     PayPalMobile.renderSinglePaymentUI(createPayment(), onSuccesfulPayment, onCardIOComplete);
  //   }
      

    $scope.add_visions = function(){
      // alert('We are Working on it')
      // return

      $location.path('/focus_menu/vision/add');
    } 

    $scope.vision_detail = function(){
      $location.path('/focus_menu/vision/detail');
    } 

    
    $scope.truelist = false;
    var count = 0;
    $scope.get_vision_list = function () {

        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_vision_list',
            data : args   
        }).then(function (response) {
            //alert();
          //  loading.deactive();
            res = response;
            console.log(res.data.data)
            if(res.data.ErrorCode == 0){

              if(res.data.data.focus_data.length > 0){

                $scope.morningfocus = res.data.data.focus_data;

                setTimeout(function(){
                  loading.deactive();
                 
                  $.each(res.data.data.focus_data, function(key, val) {
                    console.log(count);
                   count++;
                    if(count < 4){
                    console.log("#detail_data_" + val.id);
                    $("#detail_data_" + val.id).addClass("bg-color" + count);
                  }else{
        
                    count = 0;
                    $("#detail_data_" + val.id).addClass("bg-color" + count);
                  }
                  });
                },500)

                $scope.truelist = true;
              }else{
                loading.deactive();
              }
            }
                
        })

    }
    
    $scope.weekly_details = function(id){
		$cookieStore.put('weekly_id', id);
		$location.path('/focus_menu/weekly/detail');
    }
    
    $scope.back_weekly = function(){
        $location.path('/focus_menu');
      } 


  

  
});