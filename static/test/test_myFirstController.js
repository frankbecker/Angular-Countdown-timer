describe("myFirstController", function(){
    var $rootScope,
        $scope,
        controller;

        beforeEach(function(){
            module('App');

            inject(function($injector , _$interval_){
                $rootScope = $injector.get("$rootScope");
                $interval = _$interval_;
                $scope = $rootScope.$new();
                controller = $injector.get("$controller")("myFirstController", { $scope : $scope });
            });
        });
    describe("Initialization", function(){
        it("Should Initialize show equals false", function(){
            expect($scope.show).toEqual(false);
        });
        it("Should Initialize colors length equal 5", function(){
            expect($scope.colors.length).toEqual(5);
        });
        it("Should Initialize time_run_down equal 0", function(){
            expect($scope.time_run_down).toEqual(0);
        });
    });
    describe("Check Input Function", function(){
        it("Should take 21 and return FALSE", function(){
            expect($scope.check_input(21)).toEqual(false);
            expect($scope.show).toEqual(true);
        });
        it("Should take -1 and return FALSE", function(){
            expect($scope.check_input(-1)).toEqual(false);
            expect($scope.show).toEqual(true);
        });
        it("Should take 0 and return FALSE", function(){
            expect($scope.check_input(0)).toEqual(false);
            expect($scope.show).toEqual(true);
        });
        it("Should take empty string and return FALSE", function(){
            expect($scope.check_input("")).toEqual(false);
            expect($scope.show).toEqual(true);
        });
        it("Should take undefined and return FALSE", function(){
            expect($scope.check_input(undefined)).toEqual(false);
            expect($scope.show).toEqual(true);
        });
        it("Should take 20 and return TRUE", function(){
            expect($scope.check_input(20)).toEqual(true);
            expect($scope.show).toEqual(false);
        });
        it("Should take 1 and return TRUE", function(){
            expect($scope.check_input(1)).toEqual(true);
            expect($scope.show).toEqual(false);
        });
    });

    describe("Check set_color function", function(){
        it("Should take 20 and return black", function(){
            expect($scope.set_color($scope.colors, 20)).toEqual("black");
        });
        it("Should take 16 and return green", function(){
            expect($scope.set_color($scope.colors, 16)).toEqual("green");
        });
        it("Should take 15 and return black", function(){
            expect($scope.set_color($scope.colors, 15)).toEqual("black");
        });
        it("Should take 14 and return grey", function(){
            expect($scope.set_color($scope.colors, 14)).toEqual("grey");
        });
        it("Should take 7 and return red", function(){
            expect($scope.set_color($scope.colors, 7)).toEqual("red");
        });
        it("Should take 1 and return green", function(){
            expect($scope.set_color($scope.colors, 1)).toEqual("green");
        });
    });

    describe("Testing runTimer function", function(){
        it("Should take 21 and return false ", function(){
            expect($scope.runTimer(21)).toEqual(false);
        });
        it("Should take 0 and return false ", function(){
            expect($scope.runTimer(0)).toEqual(false);
        });
        it("Should take '' and return false ", function(){
            expect($scope.runTimer("")).toEqual(false);
        });
        it("Should take 20 ", function(){
            $scope.runTimer(20);
            $interval.flush(1000);
            expect($scope.time_run_down).toEqual(19);
            expect($scope.color).toEqual("grey");
            $interval.flush(10000);
            expect($scope.color).toEqual("grey");
            expect($scope.time_run_down).toEqual(9);
            $interval.flush(1000);
            expect($scope.color).toEqual("purple");
            expect($scope.time_run_down).toEqual(8);
            $interval.flush(1000);
            expect($scope.color).toEqual("red");
            expect($scope.time_run_down).toEqual(7);
        });
    });
    
});