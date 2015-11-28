angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/home");
})

.controller('HomeCtrl', function($scope, $http, $ionicSideMenuDelegate) {
  console.log("in home controller");
  var feeds = {};
  var feed_id = 0;
  // $http.get('http://oapi.cmivxx.com/v2/feeds').success(function(data) {
  $http.get('feedList.json').success(function(data) {
    console.log("Testing call data");
    feeds.content = data;
    console.log("Data:");
    console.log(data);
  }).error(function(data) {
    console.log("houston, we have a problem...");
  }).then(function(data) {
    angular.forEach(feeds.content.feeds, function(feed_inf) {
      feed_id++;
      console.log("Feed Data: ");
      console.log(feed_inf);
      console.log("Feed Name:");
      console.log(feed_inf.name);
      // $http.get('http://ajax.googleapis.com/ajax/services/feed/load?v1.0&num=1000&callback=?&q=' + encodeURIComponent(feed_inf.rss)).success(function(fdata) {
      // $http.get(feed_inf.rss).success(function(fdata) {
      // $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": feed_inf.rss } }).success(function(fdata) {
      $http.get("sampleFeed.json", { params: { "v": "1.0", "q": feed_inf.rss } }).success(function(fdata) {
        console.log("In individual Fed Call:");
        console.log(fdata);
      }).error(function(fdata) {
        console.log("houston, we have a different problem...");
      })
    })
  })
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});