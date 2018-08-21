var app = angular.module('CalculatorApp', []);

app.controller('CalculatorCtrl', [ '$scope', 'CalculatorService', function($scope, CalculatorService) {
	
    $scope.initCtrl = function() {
	CalculatorService.getOperations().then(function(operations) {
	    $scope.operations = operations;
	}, function(error) {
	    $scope.requestCallback('systemerror');
	});
    }
	
    $scope.eval = function(operator, op1, op2) {
	CalculatorService.eval(operator, op1, op2).then(function(data) {
	    $scope.calcScreen = data.result;
	    return;
	}, function(error) {
	    $scope.requestCallback('systemerror');
	});
    }
	
    $scope.handleOperation = function(operation) {
	$scope.handleInput(operation.symbol);
	$scope.calcScreen += operation.symbol;
    }
	
    $scope.handleInput = function(key) {
	var operator = $scope.operations.find(op => op.symbol == key);
	if (angular.isDefined(operator)) {
    	    var existingOperator = undefined;
    	    if (angular.isDefined($scope.calcScreen)) {
    		existingOperator = $scope.operations.find(op => $scope.calcScreen.includes(op.symbol));
    	    }
    	    if (angular.isDefined(existingOperator)) {
    	        var operands = $scope.calcScreen.split(existingOperator.symbol);
    	        CalculatorService.eval(existingOperator.operation, operands[0], operands[1]).then(function(data) {
    	            $scope.calcScreen = data.result;
    		    if (operator.arguments == 2) {
    		        $scope.calcScreen += key;
    		    } else if (operator.arguments == 1) {
    		        $scope.eval(operator.operation, $scope.calcScreen);
    		    } else if (operator.arguments == 0) {
    		        $scope.eval(operator.operation);
    		    }
    	        }, function(error) {
    	            $scope.requestCallback('systemerror');
    	        });
    	    } else if (operator.arguments == 1) {
    		$scope.eval(operator.operation, $scope.calcScreen);
    	    } else if (operator.arguments == 0) {
    		$scope.eval(operator.operation);
    	    }
	}
    }
    
}]);