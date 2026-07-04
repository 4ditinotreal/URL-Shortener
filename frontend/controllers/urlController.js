app.controller("UrlController", function($scope,$http){

$scope.short="";
$scope.limitReached=false;
$scope.links=[];

/* Create Short Link */

$scope.createLink = function(){

console.log("Sending request...");

$http.post(
"http://localhost:5000/api/url/create",
{
  url: $scope.url,
  customCode: $scope.customCode
},
{
  headers:{
    Authorization: localStorage.getItem("token")
  }
}
).then(function(res){

  console.log("Response:", res.data);

  $scope.short = res.data.shortUrl;   
  $scope.url = "";
  $scope.customCode = "";

  $scope.getLinks();

},function(err){

  console.log("Error:", err);

  alert(err.data);

  if(err.status === 403){
    $scope.limitReached = true;
  }

});

};


/* Get All User Links */

$scope.getLinks=function(){

$http.get(

"http://localhost:5000/api/url/myurls",

{
headers:{
Authorization:localStorage.getItem("token")
}
}

).then(function(res){

console.log("Links:", res.data);  

$scope.links=res.data;

});

};

/* COPY LINK */
$scope.copyLink = function(code){

const url = "http://localhost:5000/4diti/" + code;

navigator.clipboard.writeText(url);

alert("Copied: " + url);
};


/* DELETE LINK */
$scope.deleteLink=function(id){

$http.delete(
"http://localhost:5000/api/url/" + id,
{
  headers:{
    Authorization: localStorage.getItem("token")
  }
}
).then(function(){

  alert("Deleted");
  $scope.getLinks();
});

};


/* 🔥 Fake Payment (Replaces Razorpay) */

$scope.upgradePro=function(){

let confirmPayment = confirm("Upgrade to Pro for ₹199?\nClick OK to proceed.");

if(confirmPayment){

alert("Payment Successful! ✅");

$http.post(

"http://localhost:5000/api/payment/upgrade",

{},

{
headers:{
Authorization:localStorage.getItem("token")
}
}

).then(function(){

$scope.limitReached=false;

alert("You are now a Pro user 🚀");

});

}

};

});