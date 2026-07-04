var app = angular.module("shortApp", []);

app.controller("AuthController", function($scope, $http){

/* SIGNUP */

$scope.signup = function(){

$http.post("http://localhost:5000/api/auth/signup",{

email:$scope.email,
password:$scope.password

}).then(function(){

alert("Signup Successful!");

},function(error){

alert(error.data);

});

};


/* LOGIN */

$scope.login = function(){

$http.post("http://localhost:5000/api/auth/login",{

email:$scope.email,
password:$scope.password

}).then(function(response){

localStorage.setItem("token",response.data.token);

window.location="views/dashboard.html";

},function(error){

alert(error.data);

});

};


/* 🔥 FORGOT PASSWORD */

$scope.resetPassword=function(){

$http.post(

"http://localhost:5000/api/auth/forgot-password",

{
email:$scope.email,
password:$scope.newPassword
}

).then(function(){

alert("Password reset successful!");

window.location="../index.html";

},function(error){

alert(error.data);

});

};

});