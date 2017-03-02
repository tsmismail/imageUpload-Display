/**
 * Created by ISMAIL on 12/15/2016.
 */
var app = angular.module('contact-app',[]);
app.controller('mainController',['$scope','$http',function(scope,http){
scope.display = false;
    scope.fileNameChanged = function(element) {
        scope.display = false;
        http({
            method: 'POST',
            url: 'http://localhost:3000/api/photo',
        transformRequest: function () {
            var formData = new FormData();
            formData.append('file', element.files[0]);
            return formData;
        }
    }).then(function(res){
            scope.contactList = res.data.data;
            scope.display = true;
        });
    };

    /*http.get('/getImage').then(function(res){
           console.log(res,res.data.img.data.data);
        scope.contactList = res.data.img.data.data;
        scope.display = true;
        //var file = new Blob([res.data.img.data.data], {type:res.data.img.data.contentType});
        //var fileURL = URL.createObjectURL(file);
        //window.open(fileURL);
    });*/
   
}]);