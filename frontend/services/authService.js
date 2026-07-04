(function(){
  var app = angular.module("shortApp");

  app.factory("AuthService", function($http, $window){
    var apiBase = "http://localhost:5000/api/auth";

    return {
      signup: function(email, password){
        return $http.post(apiBase + "/signup", { email: email, password: password });
      },

      login: function(email, password){
        return $http.post(apiBase + "/login", { email: email, password: password })
          .then(function(response){
            if(response.data && response.data.token){
              $window.localStorage.setItem("token", response.data.token);
            }
            return response;
          });
      },

      logout: function(){
        $window.localStorage.removeItem("token");
      },

      resetPassword: function(email, newPassword){
        return $http.post(apiBase + "/forgot-password", { email: email, password: newPassword });
      },

      getToken: function(){
        return $window.localStorage.getItem("token");
      },

      isAuthenticated: function(){
        return !!$window.localStorage.getItem("token");
      },

      authHeaders: function(){
        var token = $window.localStorage.getItem("token");
        return token ? { headers: { Authorization: 'Bearer ' + token } } : {};
      }
    };
  });

})();
