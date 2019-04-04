//  var project_name = '/focus/webservices/Webapi';
// var project_name = '/focus/webservices/Webapi';
var project_name = '/Projects2018/pioneer/webservices/Webapi';
var country = 'en';
//  var base_url = 'http://projects.tekshapers.in'
// var base_url = 'http://192.168.1.43'
// var base_url = 'http://192.168.43.78'
// var base_url = 'http://192.168.1.97'
var base_url = 'http://192.168.31.199'
var WebUrl = base_url + project_name;
var app_upload_url = base_url + project_name;
var app_url = base_url + project_name;
// var image_url = base_url + '/Projects2018/pioneer/uploads/profile_image/'
var image_url = base_url + '/Projects2018/pioneer/uploads/profile_image/'
var api_key = 'focus_Lkjhg546dfhkduhrg43567';
var apikey = 'focus_Lkjhg546dfhkduhrg43567';
var db = window.openDatabase("focus", "1.0", "focus DB", 1000000);
var uuid = sessionStorage.u_ids;
var device_type = 'Android';
sessionStorage.seq = 0;
sessionStorage.tokenid = 'ddeebac2-bdd8-4e81-8f3d-75f6e45f0e1b';
var lat;
var lng;
var firebase = "ddeebac2-bdd8-4e81-8f3d-75f6e45f0e1b";
var app = angular.module("myApp", ['ngRoute', 'timepickerPop', 'ui.bootstrap', 'slickCarousel', 'ngSanitize', 'ngCookies', 'ngSidebarJS', 'geolocation', 'ngCordovaOauth', 'ngCordova']);

//document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//document.getElementById("networkInfo").addEventListener("onload", networkInfo);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  //  console.log();
    sessionStorage.u_ids = device.uuid;
    sessionStorage.device_type = device.platform;
    uuid = device.uuid;
    // alert(device.platform)
}

document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);


function networkInfo() {
    var networkState = navigator.connection.type;
    var states = {};

    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
};

function onOffline() {
    alert('You are now offline!');
    setTimeout(function () {
        navigator.app.exitApp();
    }, 1000)
    //window.location = 'no_internet.html';
};

function onOnline() {
    //  navigator.app.exitApp();
    // alert('You are now online!');
};

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "module/splash/splash.html"
        })
        .when("/login", {
            templateUrl: "module/login/login.html"
        })
        .when("/forgot", {
            templateUrl: "module/forgot/forgot.html"
        })
        .when("/changepassword", {
            templateUrl: "module/changepassword/changepassword.html"
        })
        .when("/register", {
            templateUrl: "module/register/register.html"
        })

        .when("/focus_menu", {
            templateUrl: "module/focus_menu/menu.html"
        })
        .when("/focus_menu/focus_meeting", {
            templateUrl: "module/focus_menu/focus_meeting/focus_meeting.html"
        })
        .when("/focus_menu/goal", {
            templateUrl: "module/focus_menu/goal/goal.html"
        })


        .when("/focus_menu/vision/listing", {
            templateUrl: "module/focus_menu/vision/listing/vision_listing.html"
        })
        .when("/focus_menu/vision/detail", {
            templateUrl: "module/focus_menu/vision/detail/vision_detail.html"
        })
        .when("/focus_menu/vision/add", {
            templateUrl: "module/focus_menu/vision/add/vision_add.html"
        })

        .when("/focus_menu/goal/listing", {
            templateUrl: "module/focus_menu/goals/listing/goal_listing.html"
        })
        .when("/focus_menu/goal/detail", {
            templateUrl: "module/focus_menu/goals/detail/goal_detail.html"
        })
        .when("/focus_menu/goal/add", {
            templateUrl: "module/focus_menu/goals/add/goal_add.html"
        })

        .when("/focus_menu/weekly/listing", {
            templateUrl: "module/focus_menu/weekly_focus/listing/weekly_listing.html"
        })
        .when("/focus_menu/weekly/detail", {
            templateUrl: "module/focus_menu/weekly_focus/detail/weekly_detail.html"
        })
        .when("/focus_menu/weekly/add", {
            templateUrl: "module/focus_menu/weekly_focus/add/weekly_add.html"
        })

        .when("/focus_menu/focus_meeting/listing", {
            templateUrl: "module/focus_menu/focus_meeting/listing/meeting_listing.html"
        })
        .when("/focus_menu/focus_meeting/detail", {
            templateUrl: "module/focus_menu/focus_meeting/detail/meeting_detail.html"
        })
        .when("/focus_menu/focus_meeting/add", {
            templateUrl: "module/focus_menu/focus_meeting/add/meeting_add.html"
        })


        .when("/membership/before_member", {
            templateUrl: "module/membership/before_membership/before_member.html"
        })
        .when("/membership/membership_plans", {
            templateUrl: "module/membership/membership/member.html"
        })

        .when("/membership/membership_plans/coaches_corner", {
            templateUrl: "module/membership/membership/coaches_corner/coaches_corner.html"
        })
        .when("/membership/membership_plans/focus_retreat", {
            templateUrl: "module/membership/membership/focus_retreat/focus_retreat.html"
        })
        .when("/membership/membership_plans/master_class", {
            templateUrl: "module/membership/membership/master_class/master_class.html"
        })
        .when("/membership/membership_plans/morning_focus", {
            templateUrl: "module/membership/membership/morning_focus/morning_focus.html"
        })
        .when("/membership/membership_plans/focus_retreat/self_mastery", {
            templateUrl: "module/membership/membership/focus_retreat/self_mastery/self_mastery.html"
        })
        .when("/membership/membership_plans/focus_retreat/self_mastery/video", {
            templateUrl: "module/membership/membership/focus_retreat/self_mastery/video/mastery_video.html"
        })
        .when("/membership/membership_plans/focus_retreat/self_mastery/content", {
            templateUrl: "module/membership/membership/focus_retreat/self_mastery/content/mastery_content.html"
        })

        .when("/membership/membership_plans/focus_retreat/leadership", {
            templateUrl: "module/membership/membership/focus_retreat/business_leadership/self_mastery.html"
        })

        .when("/membership/membership_plans/focus_retreat/leadership/video", {
            templateUrl: "module/membership/membership/focus_retreat/business_leadership/video/leadership_video.html"
        })
        .when("/membership/membership_plans/focus_retreat/leadership/content", {
            templateUrl: "module/membership/membership/focus_retreat/business_leadership/content/leadership_content.html"
        })


        .when("/contactus", {
            templateUrl: "module/cms/contactus/contactus.html"
        })
        .when("/aboutus", {
            templateUrl: "module/cms/about_us/about_us.html"
        })
        .when("/terms", {
            templateUrl: "module/cms/terms_and_conditions/terms_and_conditions.html"
        })

        .when("/dashboard/home", {
            templateUrl: "module/dashboard/home.html"
        })

        .when("/myaccount/account", {
            templateUrl: "module/myaccount/myaccount.html"
        })

        .when("/myaccount/profile", {
            templateUrl: "module/myaccount/myprofile.html"
        })

        .when("/sidemenu", {
            templateUrl: "module/sidemenu/sidemenu.html"
        })
        .when("/splash", {
            templateUrl: "module/splash/splash.html"
        })
        .when("/notification", {
            templateUrl: "module/notification/notification.html"
        })
        .when("/newpassword", {
            templateUrl: "module/forgot/newpassword.html"

        })
        .when("/payment_info", {
            templateUrl: "module/payment/payment_mode.html"

        })


});



var currentUrl = '';

//Detect the Current Path
app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {

    //it used to show the data in all screen
    $rootScope.contentfornodata = 'No Data Found';

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

    });
}]);

app.filter('modulo', function () {
    return function (arr, div, val) {
        return arr.filter(function (item, index) {
            return index % div === (val || 0);
        })
    };
});

app.run(function ( $rootScope, $cookieStore, loading, model, $http, $location, $interval) {



    $rootScope.InsertData = function (password, type, username, created_date, modified_date) {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS passwordLog (pid INTEGER PRIMARY KEY AUTOINCREMENT, password, type, username, created_date, modified_date)');
            tx.executeSql('INSERT INTO passwordLog (password, type, username, created_date, modified_date) VALUES ("' + password + '","' + type + '","' + username + '","' + created_date + '","' + '-' + '")');
        });
    }

    $rootScope.UpdateDate = function (password, type, username, id, modified_date) {
        db.transaction(function (tx) {
            //  tx.executeSql('CREATE TABLE IF NOT EXISTS passwordLog (pid INTEGER PRIMARY KEY AUTOINCREMENT, password, type, username, created_date, modified_date)');
            tx.executeSql('UPDATE passwordLog set password=?, type=?, username=?, modified_date=? where pid=?', [password, type, username, modified_date, id]);
        });
    }

    if ($cookieStore.get('userinfo')) {
        var uid = $cookieStore.get("userinfo").id;
    } else {
        var uid = '';
        var user_type = '';
    }

    $rootScope.FetchData = function (id) {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM userinfo WHERE id = ?', ['1'], function (tx, results) {

                $rootScope.user_id = results.rows[0].uid;
                $rootScope.phone_no = results.rows[0].phone_no;
                $rootScope.email_address = results.rows[0].email_address;
                $rootScope.username = results.rows[0].username;
                $rootScope.date_added = results.rows[0].date_added;
                $rootScope.$apply();

            });
        });
    }

    $rootScope.DeleteData = function () {
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM userinfo', [], function (tx, results) {
                console.log("Databse Deleted");
            });
        });
    }

    $rootScope.checkToken = function () {
        if (!$cookieStore.get('userinfo')) {
            uuid = sessionStorage.u_ids;
        } else {
            uuid = '';
        }
    }

    var currentUrl;
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        currentUrl = $location.path();
        currentUrl = currentUrl.split('/')[1];
        console.log(currentUrl)
        // $rootScope.ChangeRoute = currentUrl.split('/')[1];
        if (currentUrl !== "cart" && currentUrl !== "addressdetail" && currentUrl !== "payment" && currentUrl !== "payment/mode") {
        }
    });

});


app.run(function ($rootScope, $cookieStore, loading, model, $http, $location, $interval) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        // Now safe to use device APIs
        model.hide();

    }


    // window.alert = function (type, content) {

    //     if (content == '' || content == undefined) {

    //         if (typeof type === 'string') {

    //             var j = type.toLowerCase();
    //             var a = j.indexOf("successfully");
    //             var b = j.indexOf("successful");
    //             var c = j.indexOf("success");
    //             // //console.log(c)
    //             if (a >= 0 || b >= 0 || c >= 0) {
    //                 model.show('Info', type);
    //             } else {
    //                 model.show('Alert', type);
    //             }

    //         } else {

    //             //it will show when u passed the object
    //             model.show('Info', JSON.stringify(type));
    //         }
    //     } else {

    //         model.show(type, content);
    //     }
    // }


    $rootScope.back = function () {

        model.hide();
        window.history.back();
    }




    $rootScope.initOneSignal = function () {
        // alert()
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            sessionStorage.u_ids = device.uuid;
            sessionStorage.device_type = device.platform;
            uuid = device.uuid;
            // Now safe to use device APIs
            // alert(firebase)
            window.plugins.OneSignal
            .startInit(firebase)
            .endInit();
            
            window.plugins.OneSignal.getPermissionSubscriptionState(function (status) {
                $rootScope.UniversalAppToken = status.subscriptionStatus.userId;
            });
            
            window.plugins.OneSignal.getIds(function (ids) {
                alert(JSON.stringify(ids.userId))
                loading.active();
                sessionStorage.tokenid = ids.userId;
                loading.deactive();
            });
            
            
            window.plugins.OneSignal
            .startInit(firebase)
            .handleNotificationOpened(function (jsonData) {
                
                
                var data = JSON.stringify(jsonData);
                // alert(data)
                
                // var get = data.split('additionalData')[1];
                
                // var data_address = get.replace(/"/g, " ");
                // var data_address1 = get.split('},')[0];
                // var data_address2 = data_address1.replace('":{', ' ');
                // var data_address3 = data_address2.replace(/"/g, " ");
                // var data_address4 = data_address3.replace(/:/g, " ");
                // var data_address5 = data_address4.replace(/,/g, " ");
                // var data_address6 = data_address5.split('  ');
                
                // var timer = data_address6[2];
                // var ads_id = data_address6[4];
                // var user_id = data_address6[6];
                
                // var notification = {
                    //     user_id: user_id,
                    //     ads_id: ads_id,
                    //     timer: timer
                    // }
                    // $cookieStore.put('notification', notification);
                    
                    // if ($rootScope.ChangeRoute == 'push_notify') {
                        //     location.reload();
                        // } else {
                            
                            //     $location.path('/push_notify')
                            //     $rootScope.$apply();
                            // }
                            
                        })
                        .endInit();
                        
                        window.plugins.OneSignal
                        .startInit(firebase)
                        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
                        .endInit();
                        
                    }
                    
                    // alert($rootScope.UniversalAppToken)
    }

    $rootScope.initOneSignal();


});



app.run(function ($cordovaDialogs, $q, $http, $rootScope, $location, $interval, $cordovaToast, loading, $cordovaGeolocation, $cookieStore, model, $controller) {


    $rootScope.get_days = function () {

		loading.active();

		var args = $.param({
			user_id: $cookieStore.get('userinfo').id,
			apikey: apikey
		})
		$http({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			url: app_url + '/get_days',
			data: args
		}).then(function (response) {
			//alert();
			loading.deactive();
			res = response;
			console.log(res.data.data)
			if (res.data.ErrorCode == 0) {
				$rootScope.morningfocus = res.data.data;
				$rootScope.truelist = true;
			}

		})

    }


    $rootScope.get_vision_list = function () {

//        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').id,
            apikey : apikey
        })
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/notification_list',
            data : args   
        }).then(function (response) {
            //alert();
            //loading.deactive();
            res = response;
            $rootScope.notification_len = res.data.data.length;
            console.log($rootScope.notification_len)
                
        })

    }
    
});



//Encrypt thr Url or string also Decrypt the Url or String
//Download the offline videos, Create File , Remove File, Set the path
//CRUD Directory and File
app.run(function ($rootScope, $location, $interval, $cordovaToast, $cookieStore, $cordovaFile) {

    // Create Base64 Object

    var Base64 = {
        _keyStr: "ABCuvZaUVWXYNOklmnIdewPQRSTopqrsGHKLMt012345JfghijxyzDEFbc6789+/=",
        encode: function (r) {
            var t, e, o, a, h, n, c, d = "",
                C = 0;
            for (r = Base64._utf8_encode(r); C < r.length;) a = (t = r.charCodeAt(C++)) >> 2, h = (3 & t) << 4 | (e = r.charCodeAt(C++)) >> 4, n = (15 & e) << 2 | (o = r.charCodeAt(C++)) >> 6, c = 63 & o, isNaN(e) ? n = c = 64 : isNaN(o) && (c = 64), d = d + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(c);
            return d
        },
        decode: function (r) {
            var t, e, o, a, h, n, c = "",
                d = 0;
            for (r = r.replace(/[^A-Za-z0-9+/=]/g, ""); d < r.length;) t = this._keyStr.indexOf(r.charAt(d++)) << 2 | (a = this._keyStr.indexOf(r.charAt(d++))) >> 4, e = (15 & a) << 4 | (h = this._keyStr.indexOf(r.charAt(d++))) >> 2, o = (3 & h) << 6 | (n = this._keyStr.indexOf(r.charAt(d++))), c += String.fromCharCode(t), 64 != h && (c += String.fromCharCode(e)), 64 != n && (c += String.fromCharCode(o));
            return c = Base64._utf8_decode(c)
        },
        _utf8_encode: function (r) {
            r = r.replace(/rn/g, "n");
            for (var t = "", e = 0; e < r.length; e++) {
                var o = r.charCodeAt(e);
                o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
            }
            return t
        },
        _utf8_decode: function (r) {
            for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;)(o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3);
            return t
        }
    };


    // Encode the String
    $rootScope.encodedString = function (string) {

        return Base64.encode(JSON.stringify(string));
    }

    // Decode the String
    $rootScope.decodedString = function (string) {
        return JSON.parse(Base64.decode((string)));
    }

    $rootScope.createDir = function () {

        document.addEventListener('deviceready', function () {

            $cordovaFile.createDir(cordova.file.externalDataDirectory, "nomedia", false)
                .then(function (success) {
                    // success
                    ////alert(JSON.stringify(success));
                    return 'true';
                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    return 'false';
                });
        }, false);

    }
    $rootScope.createFile = function () {

        document.addEventListener('deviceready', function () {

            $cordovaFile.createFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt', true)
                .then(function (success) {
                    // success
                    value = success;
                    // //alert(JSON.stringify(success));

                    return value;

                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    value = error;
                    return value;

                });

        }, false);

        return value;

    }

    $rootScope.WriteFile = function (string) {

        document.addEventListener('deviceready', function () {
            $cordovaFile.writeFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt', string, true)
                .then(function (success) {
                    // success
                    ////alert(JSON.stringify(success));
                    return true;
                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    return false;
                });
        }, false);

    };

    $rootScope.ReadFile = function (string) {
        // alert(string);
        // READ
        document.addEventListener('deviceready', function () {
            $cordovaFile.readAsText(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt')
                .then(function (success) {
                    // success
                    value = success;
                    // alert(JSON.stringify(success));

                    return value;

                }, function (error) {
                    // error
                    // alert(JSON.stringify(error));
                    value = error;
                    return error;

                });

        }, false);
        return value;
    };


    $rootScope.haveFile = '';
    $rootScope.CheckFile = function () {
        var IsExist = {};
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "nomedia/temp_0.txt",
            function (entries) {
                ////alert(JSON.stringify(entries.isFile));
                $rootScope.haveFile = JSON.stringify(entries.isFile);
            }
        )

    }


    $rootScope.RemoveFile = function (string) {

        // READ
        document.addEventListener('deviceready', function () {

            $cordovaFile.removeFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt')
                .then(function (success) {
                    // success

                    // //alert(JSON.stringify(success));
                    return success;

                }, function (error) {
                    // error
                    // //alert(JSON.stringify(error));
                    return error;

                });

        }, false);
    };




});

//Generate the Random string throught out the Whole App
app.service('data', function ($rootScope) {

    var SetData = {};

    SetData.EncryptData = function (source) {
        return $rootScope.encodedString(source);
    };
    SetData.DecryptData = function (source) {
        return $rootScope.decodedString(source);
    };

    return SetData;
});


//End Written By Rajat Gupta//

/* Service for loading image */
app.service('loading', function ($rootScope) {

    var process = {};
    var load = angular.element(document.querySelector('.loading-overlay'));
    process.active = function () {
        $('body').css('overflow', 'hidden');
        return load.removeClass('hide').addClass('show');

    };
    process.deactive = function () {
        $('body').css('overflow', 'auto');
        return load.removeClass('show').addClass('hide');

    };

    $rootScope.globalAction = function (callBack) {
        if (callBack) {
            $('body').css('overflow', 'auto');
            load.removeClass('show').addClass('hide');
            $rootScope.globalReaction = true;
        }
    }

    return process;
});
/* End of service for loading image */

/* Service for open popup */
app.service('model', function () {
    var process = {};
    var load = angular.element(document.querySelector('.obscure'));
    var title = angular.element(document.querySelector('.title'));
    var message = angular.element(document.querySelector('.message'));
    process.show = function (a, b) {
        title.html(a);
        message.html(b);
        return load.removeClass('hide').addClass('show');
    };
    process.hide = function () {
        return load.removeClass('show').addClass('hide');
    };
    return process;
});

/* End of Service for open popup */


/* Make a directive to allow only numbers on key press  */


app.directive('onlyNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                if (event.shiftKey) {
                    event.preventDefault();
                    return false;
                }
                ////console.log(event.which);
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers 0 to 9
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                }
                // else if ([110, 190].indexOf(event.which) > -1) {
                //     // dot and numpad dot
                //     return true;
                // }
                else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});


/* End  a directive to allow only numbers on key press  */


/* Make a directive to allow only Letters on key press  */

app.directive('onlyLetters', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^A-Za-z ]/g, '');
                // //console.log(transformedInput);
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


/* End a directive to allow only Letters on key press  */


/* Capital words of all inputs */
app.filter("ucwords", function () {
    return function (input) {
        if (input) { //when input is defined the apply filter
            input = input.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }
        return input;
    }
})
/* End filter*/

/* Making a directive for file upload*/

app.directive('fileUpload', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //console.log(files);
                //iterate files since 'multiple' may be specified on the element

                //emit event upward
                scope.$apply("fileSelected", {
                    file: files
                });

            });
        }
    };


});

app.directive('googleplace', function () {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function (scope, element, attrs, model, $scope, $rootScope) {
            var options = {
                types: [],
                componentRestrictions: {}
            };

            console.log(attrs.googleplace)

            // console.log(element[0])
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            //console.log(scope.gPlace);
            google.maps.event.addListener(scope.gPlace, 'place_changed',
                function () {
                    // console.log(scope.gPlace)
                    var place = scope.gPlace.getPlace();
                    console.log(place);

                    var components = place.formatted_address; // from Google API place object   
                    lat = place.geometry.location.lat();
                    lng = place.geometry.location.lng();

                    scope.$apply(function () {
                        model.$setViewValue(element.val());
                    });

                    if (attrs.googleplace == 'one') {

                        var myEl = angular.element(document.querySelector('#pickup_location'));
                        var myEl1 = angular.element(document.querySelector('#pickup_location_find'));
                        var store_lat = angular.element(document.querySelector('#store_lat'));
                        var store_lng = angular.element(document.querySelector('#store_lng'));

                        var e2 = components;

                        myEl.attr('ng-model', e2);
                        myEl1.attr('ng-model', e2);
                        store_lat.attr('ng-model', lat);
                        store_lng.attr('ng-model', lng);

                        myEl.val(e2).trigger('change');
                        myEl1.val(e2).trigger('change');
                        store_lat.val(lat).trigger('change');
                        store_lng.val(lng).trigger('change');

                        //var abc = angular.element(document.querySelector("#pickup_zipcode")).scope();
                        //abc.pickup_zipcode = '23';
                        // angular.element(document.querySelector("#pickup_zipcode")).val(components[6].short_name);
                    } else if (attrs.googleplace == 'two') {
                        var myE2 = angular.element(document.querySelector('#pickup_location'));


                        var e3 = components;

                        myE2.attr('ng-model', e3);
                        myE2.val(e3).trigger('change');
                    }

                });
        }
    };
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onConfirm(buttonIndex) {
    // alert(buttonIndex)
    if (buttonIndex == 1) {

        navigator.app.exitApp();

    } else if(buttonIndex == 2){

        $location.path('/login');

    }else{
        
        $location.path('/login');
        
    }
}

function onBackKeyDown(ev) {
    var loads = angular.element(document.querySelector('.obscure'));
    loads.removeClass('show').addClass('hide');
    var home = $("#containernew div:first-child").hasClass("homes");
    if (home) {
        navigator.notification.confirm('Do You Want To Exit App!',onConfirm,'Exit App',['Exit','Cancel'])
    } else {
        sessionStorage.back = "";
        navigator.app.backHistory();
    }
}


app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});

app.directive("mwInputRestrict", [
    function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.on("keypress", function (event) {
                    if (attrs.mwInputRestrict === "onlynumbers") {
                        alert(event.charCode);
                        // allow only digits to be entered, or backspace and delete keys to be pressed
                        return (event.charCode >= 48 && event.charCode <= 57) || (event.keyCode === 8 || event.keyCode === 46);
                    }
                    return true;
                });
            }
        }
    }
]);

app.filter('myDateFormat', function myDateFormat($filter) {
    return function (text) {
        var tempdate = new Date(text.replace(/-/g, "/"));
        return $filter('date')(tempdate, "dd MMMM yyyy");
    }
});

app.filter('myTimeFormat', function myDateFormat($filter) {
    return function (text) {
        var tempdate = new Date(text.replace(/-/g, "/"));
        return $filter('date')(tempdate, "hh:mma");
    }
});

app.filter('myTimecustomFormat', function myDateFormat($filter) {
    return function (text) {
        //  alert(text)
        if (text !== undefined) {

            var tempdate = new Date(text.replace(/-/g, "/"));
            return $filter('date')(tempdate, "hh:mma");
        }
    }
});


app.filter('myDatecustomFormat', function myDateFormat($filter) {
    return function (text) {
        if (text !== undefined) {
            var tempdate = new Date(text.replace(/-/g, "/"));
            return $filter('date')(tempdate, "dd MMMM yyyy");
        }
    }
});


app.directive('dateInput', function(){
    return {
        restrict : 'A',
        scope : {
            ngModel : '='
        },
        link: function (scope) {
            if (scope.ngModel) scope.ngModel = new Date(scope.ngModel);
        }
    }
});

app.directive('dateFormat', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
        //Angular 1.3 insert a formater that force to set model to date object, otherwise throw exception.
        //Reset default angular formatters/parsers
        ngModelCtrl.$formatters.length = 0;
        ngModelCtrl.$parsers.length = 0;
      }
    };
  });

/*End a directive for file upload*/

/**
 * get the API Cart Values From One to Another
 *
 */

