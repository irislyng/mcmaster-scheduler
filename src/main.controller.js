(function () {

	'use strict';

	angular
		.module('app')
		.controller('Main', Main);

		function Main (DataService, ScheduleService, $rootScope) {
			var vm = this;

			vm.selected = [];
			vm.term1 = ScheduleService.getSchedule(1);
			vm.term2 = ScheduleService.getSchedule(2);

			/* Functions */
			vm.hideSelect = hideSelect;
			vm.addCourse = addCourse;

			activate();
			////////////

			function activate () {
				DataService.get(function(data) {
					vm.departments = data.departments;

					$rootScope.$watch(function() {
						return vm.department;
					}, function (dept) {
						reset(true);
						vm.courses = data.courses[dept];
					});

					$rootScope.$watch(function () {
						return vm.course;
					}, function (course) {
						reset(false);
						if(course) {
							var result = vm.courses.filter(function( obj ) {
							  	return obj.cod == course.cod && obj.t == course.t;
							});

							var info = result[0];
							vm.cores = info.c;
							vm.tutorials = info.tu;
							vm.labs = info.l;
						}	
						
					})
				});				
			}

			function reset (all) {
				if (all) {
					vm.courses = null;
					vm.course = null;
				}
				vm.cores = null;
				vm.core = null;
				vm.tutorials = null;
				vm.tutorial = null; 
				vm.labs = null;
				vm.lab = null;
			}

			function hideSelect () {
				if (vm.tutorials && vm.labs) {
					return !(vm.tutorial && vm.lab && vm.core);
				} else if (vm.tutorials) {
					return !(vm.tutorial && vm.core);
				} else if (vm.labs) {
					return !(vm.lab && vm.core)
				} else {
					return !vm.core;
				}
			}

			function addCourse () {
				if (checkCourse(vm.core)) {
					var course = {
						dept: vm.department,
						code: vm.course.cod,
						name: vm.course.n,
						term: vm.course.t,
						prof: vm.core.sups[0],
						core: vm.core.n,
						core_times: vm.core.ti
					}

					if (vm.tutorials) {
						course.tutorial = vm.tutorial.n;
						course.tutorial_times = vm.tutorial.ti;
					}
					if (vm.labs) {
						course.lab = vm.lab.n;
						course.lab_times = vm.lab.ti;
					}

					if (vm.course.t===1) {
						console.log(course);
						ScheduleService.setSchedule('one', course, true);
					} else if (vm.course.t===2) {
						ScheduleService.setSchedule('two', course, true);
					} else {
						ScheduleService.setSchedule('one', course, true);
						ScheduleService.setSchedule('two', course, true);

					}

					vm.selected.push(course);
					reset(true);
					vm.department = null;
				} else {
					alert('No information is available for ' + vm.department + ' ' + vm.course.cod + '. Please select another one!');
				}
				
			}

			function checkCourse (core) {
				if(core.ti[0][0] == 'TBA') return false;
				else return true;
			}
		}
})();