/**
Fichier: TestsUnitairesClient.js
Rôle: Client web pour lancer les testsUnitaires des packagesServer
Version: 03e
Encodage: utf-8
Stabilite: 5 ( Frozen )
MAJ: 04/06/2017
*/

var TestsUnitairesClient = function(options) {
	
	var defauts = {
		addClass: 'TestsUnitairesClient'
	};
	
	var param = $.extend(true, defauts, options);
	
	SdkApp({
		preload: {
			packages: [
				'ui.data.CustomDataTable'
			],
			onSuccess: function(self) {
				
				$('body').css('overflow-y', 'auto');
				
				// obligatoire pour pluggin DataTable
				var dataTableApi = null;
				window.startTest = function(name) {
					
					$('.result_'+name.replace(/\./g, '')).html(
						Img({
							src: sdk.app.packageAssets+'img/loader.gif',
							css: {
								width: '12px'
							}
						})
					);
					
					sdk.socket.emit('testUnitaire', {
						name: name,
						token: sdk.token
					});
				};
				
				Obj({
					typeDOM: 'h1',
					html: 'TESTS UNITAIRES DES PACKAGES SERVER',
					css: {
						fontSize: Px(30),
						textAlign: 'center',
						marginTop: Px(40),
						marginBottom: Px(50)
					},
					appendTo: self
				});
				
				_testList = [];
				var _currentTest = 1;
				var _testAll = false; // mode pour lancer tout les tests d'un coup
				var _nextTest = function() {
					
					if(_currentTest <= _testList.length) {
						
						$('#startTest_'+_currentTest).click();
						return _currentTest++;
					}
					_testAll = false;
					_currentTest = 0;
				};
				
				Button({
					mot: {
						html: 'Tout tester'
					},
					css: {
						marginLeft: '20px',
						textAlign: 'center',
						border: '1px solid darkgray'
					},
					onPress: function(self, event) {
						_currentTest = 1;
						_testAll = true;
						_nextTest();
					},
					appendTo: self
				})
				
				
				// TODO - REMPLACER par un SocketMessase
				sdk.socket.on('testList', function(data) {
					
					_testList = [];
					var num = 0;
					data.forEach(function(name) {
						
						_testList.push({
							num: ++num,
							run: '<button id="startTest_'+num+'" onclick="startTest(\''+name+'\')">Run</button>',
							name: name,
							result: '<span class="result_'+name.replace(/\./g, '')+'"></span>'
						});
					});
					
					CustomDataTable({
						id: 'testList',
						cols: {
							run: {label: ''},
							num: {label: 'N°'},
							name: {label: 'Test'},
							result: {label: 'Résultat'}
						},
						data: _testList,
						appendTo: self
					});
					
					dataTableApi = new $.fn.DataTable.Api('#testList');
				});
				
				sdk.socket.on('unitTestResponse', function(data) {
					
					var cell = dataTableApi.cell($('.result_'+data.name.replace(/\./g, '')).parent().get(0));
					cell.data(
						Mot({
							addClass: 'result_'+data.name.replace(/\./g, ''),
							html: data.success ? 'PASS' : 'FAIL',
							css: {
								color: 'white',
								fontSize: '15px',
								backgroundColor: data.success ? 'green' : 'red'
							}
						}).get(0).outerHTML
					);
					
					cell.draw();
					
					if(_testAll) {
						_nextTest();
					}
				});
				
				sdk.socket.emit('getTestsList', {token: sdk.token});
			},
			onError: function(err) {
				sdk.error('PrototypeChoixBanqueClient 158', err);
			}
		}
	});
};
