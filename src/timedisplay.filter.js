(function(){

	angular
		.module('app')
		.filter('timeDisplay', function() {
		  	return function(input) {
		  		if(input.length == 3) 
		  			return input.slice(0,1)+':'+input.slice(1);
		  		else
		  			return input.slice(0,2)+':'+input.slice(2);
		  	}
		});	
})();