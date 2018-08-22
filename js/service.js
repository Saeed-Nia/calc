app.factory('CalculatorService', ['$http', '$q', function($http, $q) {
	    
    return {
	getOperations : function() {
	    return $http.get('http://calctest.iesim.biz/operations')
	    	.then(function(response) {
	    	    return response.data;
	    	}, function(errResponse) {
	    	    console.error('Error initializing operations');
	    	    return $q.reject(errResponse);
	    	})
	},
		
	eval : function(operator, op1, op2) {
	    return $http.get('http://calctest.iesim.biz/' + operator + 
		    		(angular.isDefined(op1)? '?op1=' + op1 : '') +
		    		(angular.isDefined(op2)? '&op2=' + op2 : ''))
		    	.then(function(response) {
		    	    return response.data;
		    	}, function(errResponse) {
		    	    console.error('Error initializing operations');
		    	    return $q.reject(errResponse);
		    	})
		}
	    }
}])