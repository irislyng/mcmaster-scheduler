(function () {
	'use strict';

	angular
		.module('app')
		.controller('Table', Table);

		function Table (ScheduleService, $rootScope) {
			var vm = this;
			vm.times = ['800', '830', '900', '930', '1000', '1030', '1100', '1130', '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030', '2100', '2130', '2200', '2230'];
			vm.term1 = [];
			vm.term2 = [];

			/* Functions */
			vm.mergeCells = mergeCells;
			vm.addInfo = addInfo;
			vm.setSchedule = setSchedule;

			activate();
			//////////

			function activate () {	
				$rootScope.$watch(function () {
					return ScheduleService.one;
				}, function() {
					vm.term1 = ScheduleService.one;
					setSchedule(1);
				}, true);

				$rootScope.$watch(function () {
					return vm.term1;
				}, function() {
					ScheduleService.one = vm.term1;
				}, true);

				$rootScope.$watch(function () {
					return ScheduleService.two;
				}, function() {
					vm.term2 = ScheduleService.two;
					setSchedule(2);
				}, true);

				$rootScope.$watch(function () {
					return vm.term2;
				}, function() {
					ScheduleService.two = vm.term2;
				}, true);

			}

			function mergeCells (array, term, info) {
				var start_time, end_time, start, end, calc, cells, place;

				for (var i = 0; i < array.length; i++) {
					if (array[i][5]==20) { 
						/* Get Start Time */
						start_time = Number(array[i][2].toString()+array[i][3].toString());

						/* Get End Time */
						end_time = Number(array[i][4].toString()+array[i][5].toString())-20;

						/* Get Cells */
						calc = ((end_time+30)-start_time).toString();
						cells = 2*Number(calc.slice(0,1));

					} else if (array[i][5]==0) {
						/* Get Start Time */
						start_time = Number(array[i][2].toString()+array[i][3].toString())*10;

						/* Get End Time */
						end_time = Number(array[i][4].toString()+array[i][5].toString())*10-70;

						/* Get Cells */
						calc = ((end_time+70)-start_time).toString();
						cells = 2*Number(calc.slice(0,1));
					} else if (array[i][5]==30) { 
						/* Get Start Time */
						start_time = Number(array[i][2].toString()+array[i][3].toString());

						/* Get End Time */
						end_time = Number(array[i][4].toString()+array[i][5].toString())-30;

						/* Get Cells */
						calc = ((end_time+30)-start_time).toString();
						cells = 2*Number(calc.slice(0,1));

					}

					/* Get Info */
					start = term + "_" + array[i][1] + "_" + start_time;
					end = term + "_" + array[i][1] + "_" + end_time;
					place = array[i][6];
					info.place = place;

					/* Merge Cells */
					addInfo(start, end, cells, info);
				}
			}

			function addInfo (startID, endID, cells, info) {
				var removed = endID;
				var last, next;
				for (var i = 0; i < cells-1; i++) {
					console.log(removed);
					var cell = document.getElementById(removed);
					// cell.style.display = "none"; does the same thing
					cell.parentNode.removeChild(cell);
					last = removed.substr(removed.length - 4);
					if (last.charAt(0) == '_') 
						last = last.slice(1);	
					if (Number(last.substr(last.length-2))==30) { 
						next = (Number(last)-30).toString();
					} else if (last.substr(last.length-2)=='00') {
						next = (Number(last)-70).toString();
					}
					removed = removed.replace(last, next);
				}
				var start =document.getElementById(startID);
				start.setAttribute('rowspan', cells);
				start.style.fontSize = "13px";
				start.style.backgroundColor = "#ececec";

				/* Format */
				var data = info.name + " " + info.type + info.num + "<br>";
				if (info.type == 'C') data += info.prof + "<br>";
				data += info.place;

				start.innerHTML = data;
			}

			function setSchedule (term) {
				/* Term 1 */
				if(vm.term1.length && term==1) {
					var latest1 = vm.term1[vm.term1.length-1];
					/* Variables */

					var name =latest1.dept + ' ' +latest1.code;

					/* Cores */
					mergeCells(latest1.core_times, 'term1', {
						name: name,
						prof: latest1.prof,
						type: 'C',
						num: latest1.core
					});

					/* Tutorials */
					if (latest1.tutorial) {
						mergeCells(latest1.tutorial_times, 'term1', {
							name: name,
							type: 'T',
							num: latest1.tutorial
						});
					}

					/* Labs */
					if (latest1.lab) {
						mergeCells(latest1.lab_times, 'term1', {
							name: name,
							type: 'L',
							num: latest1.lab
						});
					}
				} else if(vm.term2.length && term==2) {
					var latest2 = vm.term2[vm.term2.length-1];
					/* Variables */

					var name =latest2.dept + ' ' +latest2.code;

					/* Cores */
					mergeCells(latest2.core_times, 'term2', {
						name: name,
						prof: latest2.prof,
						type: 'C',
						num: latest2.core
					});

					/* Tutorials */
					if (latest2.tutorial) {
						mergeCells(latest2.tutorial_times, 'term2', {
							name: name,
							type: 'T',
							num: latest2.tutorial
						});
					}

					/* Labs */
					if (latest2.lab) {
						mergeCells(latest2.lab_times, 'term2', {
							name: name,
							type: 'L',
							num: latest2.lab
						});
					}
				}
			}
		}
})();		