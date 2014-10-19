var App = angular.module('App', ['ngRoute']);

App.config(function($routeProvider){
    $routeProvider
        .when("/",{
            controller : "myFirstController",
            templateUrl : "templates/myFirstTemplate.html"
        })
        .otherwise( { redirectTo: "/" } );
});

App.factory("factory_color" , function(){

    var colors = [
        { color:"black" , name: "Black" },
        { color:"green" , name: "Green" },
        { color:"red" , name: "Red" },
        { color:"purple" , name: "Purple" },
        { color:"grey" , name: "Grey" }
    ];

    this.get_colors = function(){
        return colors;
    };

    return this;
});

App.controller("myFirstController" , [ '$scope','$interval', 'factory_color',
    function($scope, $interval, factory_color) {
    $scope.colors  = factory_color.get_colors();
    $scope.time_run_down = 0;
    $scope.color = "black";
    var promise = null;
    $scope.show = false;

    $scope.runTimer = function(time){
        var time_selected = parseInt(time, 10);
        if(!$scope.check_input(time_selected))return false;
        $scope.time_run_down = time_selected;
        $scope.set_color($scope.colors , $scope.time_run_down);
        promise = $interval(function () {
            $scope.time_run_down--;
            $scope.set_color($scope.colors , $scope.time_run_down);
            if($scope.time_run_down === 0){
                $scope.cancel_promise();
            }
        }, 1000);
    };

    $scope.cancel_promise = function(){
        $interval.cancel(promise);
    };

    $scope.set_color = function(colors, time_run_down){
        var colors_length = colors.length;
        var index = time_run_down % colors_length;
        $scope.color = colors[index].color;
        return $scope.color;
    };

    $scope.check_input = function(time){
        if(promise){
           $scope.cancel_promise();
        }
        if(time > 20 || time < 0 || time === 0 || time === "" || time === undefined || isNaN(time)){
            $scope.show = true;
            $scope.time_run_down = 0;
            $scope.color = "black";
            return false;
        }else{
            $scope.show = false;
            return true;
        }
    };

    $scope.$on("$destroy", function( event ) {
        $scope.cancel_promise();
    });
}
]);