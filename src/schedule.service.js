(function () {
	angular
		.module('app')
		.factory('ScheduleService', ScheduleService);

	function ScheduleService () {
		var service = {
			one: [],
			two: [],
			getSchedule: getSchedule,
			setSchedule: setSchedule
		};

		return service;

		function getSchedule (term) {
			return service[term];
		}

		function setSchedule (term, course, add) {
			if(add) {
				service[term].push(course);
			} else {
				var index = service[term].indexOf(course);
				if(index>-1) {
					service[term].splice(index, 1);
				}
			}	
		}
	};
})();