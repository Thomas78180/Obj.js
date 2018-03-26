/**
Fichier: DocumentationClient.js
Rôle: SdkApp
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 22/01/2018

TODO - A DYNAMISER AVEC SOCKET MESSAGE 
*/

$('body').prepend(
'<style>'+
'pre.prettyprint { border: none}'+
'pre .nocode { background-color: none; color: #000 }'+
'pre .str { color: gray } /* string  - pink */'+
'pre .kwd { color: blue; font-weight: bold }'+
'pre .com { color: green } /* comment - skyblue */'+
'pre .typ { color: black } /* type    - lightgreen */'+
'pre .lit { color: blue } /* literal - darkred */'+
'pre .pun { color: black }    /* punctuation */'+
'pre .pln { color: black }    /* plaintext */'+
'pre .tag { color: #f0e68c; font-weight: bold } /* html/xml tag    - lightyellow */'+
'pre .atn { color: #bdb76b; font-weight: bold } /* attribute name  - khaki */'+
'pre .atv { color: #ffa0a0 } /* attribute value - pink */'+
'pre .dec { color: #98fb98 } /* decimal         - lightgreen */</style>')


var DocumentationClient = function(options) {
	
	$('body').css({
		backgroundColor: 'white',
		overflow: 'auto',
		overflowX: 'hidden'
	});
	
	SdkApp({
		addClass: 'DocumentationClient',
		preload: {
			packages: [
				'ui.basic.ToolBar',
				'ui.basic.MenuVertical',
				'app.documentation.ListeExemples',
				'ui.data.SelectData'
			],
			onSuccess: function(self) {
				
				var _listeExemples = null;
				
				var _showContent = function(value) {
					
					if(_listeExemples) _listeExemples.remove();
					
					_listeExemples = ListeExemples({
						obj: value,
						css: {
							width: Px(804),
							marginLeft: Px(220)
						},
						appendTo: self
					});
					
					$.getScript('https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
				};
				
				var _menuGauche = Obj({
					addClass: '_menuGauche',
					css: {
						backgroundColor: '#364150',
						color: '#b4bcc8',
						width: Px(220),
						height: $(window).height(),
						borderColor: 'green',
						position: 'fixed',
						float: 'left'
					},
					appendTo: self
				});
				
				MenuVertical({
					label: 'Composants',
					content: [
						{
							icon: {name: 'anchor'},
							label: 'Basiques',
							content: [
								{
									icon: {name: 'address-book'},
									label: 'Obj',
									onPress: function(self) {
										_showContent('Obj');
									}
								},
								{
									icon: {name: 'font'},
									label: 'Mot',
									onPress: function(self) {
										_showContent('Mot');
									}
								},
								{
									icon: {name: 'align-left'},
									label: 'Texte',
									onPress: function(self) {
										_showContent('Texte');
									}
								},
								{
									icon: {name: 'image'},
									label: 'Img',
									onPress: function(self) {
										_showContent('Img');
									}
								}
							]
						},
						{
							icon: {name: 'hand-point-up'},
							label: 'Boutons',
							content: [
								{
									icon: {name: 'hand-point-up'},
									label: 'Button',
									onPress: function(self) {
										_showContent('Button');
									}
								},
								{
									icon: {name: 'check-circle'},
									label: 'Checkbox',
									onPress: function(self) {
										_showContent('Checkbox');
									}
								},
								{
									icon: {name: 'dot-circle'},
									label: 'RadioButton',
									onPress: function(self) {
										_showContent('RadioButton');
									}
								}
							]
						},
						{
							icon: {name: 'table'},
							label: 'Tableaux',
							content: [
								{
									icon: {name: 'table'},
									label: 'Table',
									onPress: function(self) {
										_showContent('Table');
									}
								},
								{
									icon: {name: 'sort'},
									label: 'CustomDataTable',
									onPress: function(self) {
										_showContent('CustomDataTable');
									}
								}
							]
						},
						{
							icon: {name: 'plus'},
							label: 'Menus',
							content: [
								{
									icon: {name: 'minus'},
									label: 'Toolbar',
									onPress: function(self) {
										_showContent('Toolbar');
									}
								},
								{
									icon: {name: 'list'},
									label: 'Menu Vertical',
									onPress: function(self) {
										_showContent('MenuVertical');
									}
								},
								{
									icon: {name: 'list'},
									label: 'Parallax',
									onPress: function(self) {
										_showContent('Parallax');
									}
								}
							]
						},
						{
							icon: {name: 'play'},
							label: 'Média',
							content: [
								{
									icon: {name: 'file-audio'},
									label: 'Audio',
									onPress: function(self) {
										_showContent('Audio');
									}
								},
								{
									icon: {name: 'file-video'},
									label: 'Vidéo',
									onPress: function(self) {
										_showContent('Video');
									}
								}
							]
						},
						{
							icon: {name: 'chart-area'},
							label: 'Graphiques',
							content: [
								{
									icon: {name: 'chart-bar'},
									label: 'Barres',
									onPress: function(self) {
										// _showContent('Table');
									}
								},
								{
									icon: {name: 'chart-line'},
									label: 'Courbes',
									onPress: function(self) {
										// _showContent('CustomDataTable');
									}
								},
								{
									icon: {name: 'chart-pie'},
									label: 'Camemberts',
									onPress: function(self) {
										// _showContent('CustomDataTable');
									}
								}
							]
						},
						{
							icon: {name: 'exchange-alt'},
							label: 'Formulaires',
							content: [
								{
									icon: {name: 'retweet'},
									label: 'SocketForm',
									onPress: function(self) {
										_showContent('SocketForm');
									}
								}
							]
						},
						{
							icon: {name: 'map'},
							label: 'GoogleMaps',
							content: [
								{
									icon: {name: 'location-arrow'},
									label: 'GoogleMap',
									onPress: function(self) {
										_showContent('GoogleMap');
									}
								},
								{
									icon: {name: 'map-marker-alt'},
									label: 'PolylineMap',
									onPress: function(self) {
										_showContent('PolylineMap');
									}
								}
							]
						},
						{
							icon: {name: 'comment'},
							label: 'Notifications',
							content: [
								{
									icon: {name: 'exclamation'},
									label: 'Application',
									onPress: function(self) {
										_showContent('AppNotification');
									}
								},
								{
									icon: {name: 'desktop'},
									label: 'Bureau',
									onPress: function(self) {
										_showContent('DesktopNotification');
									}
								}
							]
						},
						{
							icon: {name: 'window-restore'},
							label: 'Windows',
							content: [
								{
									icon: {name: 'share-square'},
									label: 'Window',
									onPress: function(self) {
										_showContent('Window');
									}
								},
								{
									icon: {name: 'question'},
									label: 'PopIn',
									onPress: function(self) {
										_showContent('PopIn');
									}
								},
								{
									icon: {name: 'question'},
									label: 'Dialog',
									onPress: function(self) {
										_showContent('Dialog');
									}
								},
								{
									icon: {name: 'question-circle'},
									label: 'Confirm',
									onPress: function(self) {
										_showContent('Confirm');
									}
								},
								{
									icon: {name: 'quote-right'},
									label: 'Prompt',
									onPress: function(self) {
										_showContent('Prompt');
									}
								}
							]
						},
						{
							icon: {name: 'globe'},
							label: 'Pages',
							content: [
								{
									icon: {name: 'key'},
									label: 'Connexion',
									onPress: function(self) {
										
										sdk.require('ui.themes.pageConnexion');
										PageConnexion();
									}
								},
								{
									icon: {name: 'globe'},
									label: '404',
									onPress: function(self) {
										
										sdk.require('ui.themes.page404');
										Page404();
									}
								},
								{
									icon: {name: 'globe'},
									label: '500',
									onPress: function(self) {
										
										sdk.require('ui.themes.page500');
										Page500();
									}
								},
								{
									icon: {name: 'globe'},
									label: 'Prochainement',
									onPress: function(self) {
										
									}
								}
							]
						}
					],
					css: {
						color: '#b4bcc8',
						width: Px(220),
						fontSize: Px(14)
					},
					appendTo: _menuGauche
				});
				
				_showContent('Obj');
			},
			onError: function(err) {
				sdk.error('DocumentationClient 118', err);
			}
		}
	});
};