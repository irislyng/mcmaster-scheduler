(function () {
	angular
		.module('app')
		.factory('DataService', DataService);

	function DataService ($resource) {
		return $resource('/data/mcmaster.json', 
		    {
		        'get': { method:'GET' }
		    });
	};
})();