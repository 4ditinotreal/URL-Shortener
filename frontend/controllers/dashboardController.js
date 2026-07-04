router.get("/myurls",auth, async (req,res)=>{

const urls = await Url.find({userId:req.user.id});

res.json(urls);

});app.controller("DashboardController",function($scope,$http){

$http.get("http://localhost:5000/api/url/myurls",{
headers:{
Authorization:localStorage.getItem("token")
}
}).then(res=>{

$scope.urls = res.data;

});

});