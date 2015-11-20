module.exports = function(broccoli){

	require('m-util');
	var it79 = require('iterate79');
	var php = require('phpjs');
	var resouce = require('br-resouce');
	var mLog = require('m-log');
	var _ = require('underscore');

	var _resMgr = broccoli.resourceMgr;
	var _imgDummy = 'data:image/png;base64,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';
	var _this = this;


	//  Server Side  | <Client Side>
	// --------------+-------------------
	// bind          |
	// mkPreviewHtml | mkPreviewHtml
	// normalizeData | normalizeData
	//               | mkEditor
	//               | duplicateData
	//               | saveEditorContent
	// gpi           |

	/**
	 * プレビュー用の簡易なHTMLを生成する
	 */
	this.mkPreviewHtml = function( fieldData, mod, callback ){
		var rtn = {}
		if( typeof(fieldData) === typeof({}) ){
			rtn = fieldData;
		}
		_resMgr.getResource( rtn.resKeyEditPng, function(res){
			rtn.PngPath = 'data:'+res.type+';base64,' + res.base64;
			if( !res.base64 ){
				// ↓ ダミーの Sample Image
				rtn.PngPath = _imgDummy;
			}
			rtn = $('<img src="'+rtn.PngPath+'" />');
			rtn.css({
				'max-width': 200,
				'max-height': 200
			});

			callback( rtn.get(0).outerHTML );
		} );
		return;
	}

	/**
	 * データを正規化する
	 */
	this.normalizeData = function( fieldData, mode ){
		var rtn = fieldData;
		if( typeof(fieldData) !== typeof({}) ){
			rtn = {
				"resKey":'', // 元データ(psd,png,jpg...)
				"path":'about:blank',
				"resKeyOrgPng":'', // 元画像PNG 最大  <-PngPath
				"OrgPngPath":'',
				"resKeyEditPng":'', // 加工済みPNG
				"EditPngPath":'',
				"resKeyRect":'', // 切り取り座標
				"resKeyEditData":'', // リンクデータ
				"resKeyHtml":'', // htmlデータ
				"HtmlPath":''
			};
		}
		return rtn;
	}

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		var isCache = false;
		var extParam = (isCache) ? "" : "?dt=" + new Date().getTime();
		var rtn = $('<div>');

		var htmlImgEditor = (function() {/*
			<div class="nav-box">
		    <div class="jCrop-trim-group">
		      <canvas id="jCrop-original-canvas" width="0" height="0" style="display:none;"></canvas><a class="button-M btn_icon_readfile jCrop-restore">元画像を読込み</a>
		      <label>
		        <input type="checkbox" checked="" class="jCrop-showClickable"/><a class="button-M btn_icon_eye_on">矩形エリア確認</a>
		      </label><a class="button-M btn_icon_cut jCrop-trim">切り取り</a>
					<div class="button-group"><a class="button-S btn_icon_minimum jCrop-minimum">最小</a><a class="button-S btn_icon_maximum jCrop-maximum">最大</a></div>
					<div class="button-group"><a class="button-S btn_icon_horizontal_center jCrop-horizontal-center">横中央</a><a class="button-S btn_icon_vertical_center jCrop-vertical-middle">縦中央</a><a class="button-S btn_icon_center jCrop-center">中央</a></div>
					<div class="button-group"><a class="button-S btn_icon_horizotal_split jCrop-hTrim">横分割</a><a class="button-S btn_icon_vertical_split jCrop-vTrim">縦分割</a></div>
		      <div class="jCrop-trim-prevew">
		        <h3>プレビュー</h3>
		        <div class="jCrop-origin-imgSize">
		          <div class="dialog">
		            <div class="dialog-message">この画像でよろしいですか？</div>
		            <div class="dialog-btns"><a class="button-S jCrop-reset-trim">いいえ</a><a class="button-S jCrop-commit">はい</a></div>
		          </div>
		          <canvas id="jCrop-work-canvas" width="0" height="0" style="display:block;"></canvas>
		        </div>
		      </div><a class="button-M btn_icon_fix jCrop-autofix">自動調整マクロ</a>
		    </div>
		  </div>
		  <div id="jCrop-interface" class="page-interface"><%= imageData %></div>
		  <div class="nav-box">
		    <div id="text-inputs">
		      <h3>矩形エリア</h3>
		      <div class="input-rect-area">
		        <div class="input-rect-group">
		          <div class="border-vertical"></div>
		          <div class="border-horizontal"></div><span class="input-group"><b>X</b>
		            <input id="crop-x" type="number" name="cx" style="width:4em" class="span1"/></span><span class="input-group"><b>Y</b>
		            <input id="crop-y" type="number" name="cy" style="width:4em" class="span1"/></span><span class="input-group"><b>W</b>
		            <input id="crop-w" type="number" name="cw" style="width:4em" class="span1"/></span><span class="input-group"><b>H</b>
		            <input id="crop-h" type="number" name="ch" style="width:4em" class="span1"/></span>
		        </div>
		      </div>
		    </div>
		  </div>
		  <div class="nav-box">
		    <div id="text-inputs">
		      <h3>リンク一覧</h3>
		      <div class="jCrop-link-group">
		        <input type="hidden" name="linkId" value=""/>
		        <input type="text" name="linkName" value="" placeholder="ラベル" style="width:12em;"/>
		        <input type="text" name="linkURL" value="" placeholder="http://www.imjp.co.jp" style="width:36em;"/><a class="button-L btn_icon_link jCrop-addLink">矩形エリアをリンクに設定</a>
		      </div>
		      <ul id="jCrop-link" style="padding:0;"></ul>
		    </div>
		  </div>
		  <h3 class="readonly">rect</h3>
		  <input id="jCrop-rect" type="text" style="width:100%;" readonly="readonly"/>
		  <h3 class="readonly">base64</h3>
		  <input id="jCrop-imgBase64" type="text" style="width:100%;" readonly="readonly"/>

			<script>
			function JcropWaiting(){
			  // onloadの代替
			  try{
					JcropLib(jQuery);
					JcropEditorLib(<%= rectData %>, <%= editData %>);
			  }catch (e){
					setTimeout(JcropWaiting,200);
				}
				return;
			}
			JcropWaiting();
			</script>
		*/}).toString().uHereDoc();

		var _htmlImgEditor = _.template(htmlImgEditor);

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '//rawgithub.com/misak1/node-clop/master/css/Jcrop.css';
		rtn.append(link);

		var url = [
		"//rawgithub.com/misak1/node-clop/master/js/underscore-min.js" + extParam,
		"//rawgithub.com/misak1/node-clop/master/js/jquery.animate-colors-min.js" + extParam,
		"//rawgithub.com/misak1/node-clop/master/js/Jcrop.js" + extParam,
		"//rawgithub.com/misak1/node-clop/master/js/Jcrop-editor.js" + extParam,
		"//rawgithub.com/misak1/node-clop/master/js/rgbcolor.js" + extParam
		];
		for(var url_i=0; url_i< url.length; url_i++){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url[url_i];
			rtn.append(script);
		}

		var _this = this;
		var $DL_link = "", DL_file = "";
		if( typeof(data) !== typeof({}) ){ data = {}; }

console.log('data',data);

		if( typeof(data.resKeyOrgPng) !== typeof('') ){
			data.resKeyOrgPng = '';
		}
		// if( typeof(data.original) !== typeof({}) ){ data.original = {}; }
		_resMgr.getResource( data.resKeyOrgPng, function(res){
			// var PngPath = 'data:'+res.type+';base64,' + res.base64;
			// if( !res.base64 ){
			// 	// ↓ ダミーの Sample Image
			// 	PngPath = _imgDummy;
			// }
		});

		/****************
		 * resKey
		 ****************/
		if( typeof(data.resKey) !== typeof('') ){
			data.resKey = '';
		}else{
			_resMgr.getResource( data.resKey, function(res){
				if(typeof res.base64 !== "undefined"){
					/* for Browser */
					// DL_file = res.publicFilename + '.' + res.ext;
					// var DL_data = 'data:' +res.type + ';base64,'+ res.base64;
					// DL_link = '<a href="' + DL_data + '" download="' + res.publicFilename + '">' + "Download" + '</a>';

					/* for node-webkit */
					DL_file = res.publicFilename + '.' + res.ext;
					var DL_data = res.base64;
					$DL_link = $('<div data-psd-info>');
					$DL_link.html('')
					.append($('<input type="button" class="download" value="Download" />')
						.attr({
							'data-psd-resKey': data.resKey
						})
						.click(function(){
							var resKey = $(this).attr('data-psd-resKey');
							var $chooser = $('#nw_download');
							$chooser.nwsaveas = DL_file;
							// console.log('chooser', $chooser);
							$chooser.click();
							$chooser.bind('change', function(evt){
								// console.log('evt', evt);
						    // $chooser.addEventListener("change", function(evt) {
						    var dlFilePath = $(this).val();
						    $chooser.nwdirectory = dlFilePath;
						    // console.log('directory', dlFilePath);
						    $(this).val('');
						    // console.log("white");
						    _this.callGpi(
						      {
						        'api': 'openOuternalEditor',
						        'data': {'base64': DL_data, 'dlFilePath': dlFilePath + '/'+ DL_file}
						      } ,
						      function(output){
						        return;
						      }
						    );
							});
						})
					).append($('<input id="nw_download" type="file" style="display:none" nwworkingdir="" nwsaveas="" nwdirectory="" />'));
				}
			});
		}
		/****************
		 * resKeyRect
		 ****************/
		 var rectData = "";
		 if( typeof(data.resKeyRect) !== typeof('') ){
			 data.resKeyRect = '';
		 }
		 _resMgr.getResource( data.resKeyRect, function(res){
			rectData = res.base64;
			if(!res.base64){
				rectData = '{"x":0,"y":0,"w":100,"h":100}';
			}else{
				eval("rectData = JSON.parse(res.base64)");
				if(rectData === ""){
					rectData = '{"x":0,"y":0,"w":0,"h":0}';
				}
			}
		});
		/****************
		 * resKeyEditData
		 ****************/
		 var editData;
		 if( typeof(data.resKeyEditData) !== typeof('') ){
			 data.resKeyEditData = '';
		 }
		 _resMgr.getResource( data.resKeyEditData, function(res){
			if(!res.base64){
				editData = '[]';
			}else{
				editData = res.base64;
			}
		});

		/****************
		 * resKeyEditPng
		 ****************/
		if( typeof(data.resKeyEditPng) !== typeof('') ){
			data.resKeyEditPng = '';
		}
		// ↓ ダミーの Sample Image
		var editPng, PngPath = _imgDummy;
		_resMgr.getResource( data.resKeyEditPng, function(res){
			if(res.base64 != null){
				PngPath = 'data:'+res.type+';base64,' + res.base64;
			}
			editPng = PngPath;
		});
		/****************
		 * resKeyOrgPng
		 ****************/
		 if( typeof(data.resKeyOrgPng) !== typeof('') ){
 			data.resKeyOrgPng = '';
 		}
 		var orgPng;
 		_resMgr.getResource( data.resKeyOrgPng, function(res){
 			if(!res.base64){
 				orgPng = _imgDummy;
 			}else{
 				orgPng = 'data:'+res.type+';base64,' + res.base64;
 			}
			var $img = $('<img id="jCrop-target" class="img_editor-img">');
			var $btnOK = $('.btn-primary');
			$img.attr({
				"src": PngPath ,
				"data-size": res.size ,
				"data-extension": res.ext,
				"data-mime-type": res.type,
				"data-base64": res.base64
			});
			rtn.append( $('<input>')
				.attr({
					"name":mod.name ,
					"type":"file",
					"webkitfile":"webkitfile"
					// ,
					// "accept":"image/vnd.adobe.photoshop"
				})
				.css({'width':'100%'})
				.bind('change', function(e){
					var fileInfo = e.target.files[0];
					var realpathSelected = $(this).val();
					var resInfo = new resouce();

console.log('fileInfo.type', fileInfo.type);
					// (PNG)
					if( realpathSelected ){
						if(fileInfo.type === 'image/png'){
							fileInfo.name
							resInfo.readSelectedLocalFile(fileInfo, function(obj){
								// $btnOK.prop('disabled', true); // ボタン無効化
								var $dom = $(elm);
								if( typeof(data) !== typeof({}) ){
									data = {};
								}
								if( typeof(data.resKey) !== typeof('') ){
									data.resKey = '';
								}
								it79.fnc(
									data,
									[
										// 画像登録
										function(it1, data){
											_resMgr.getResource(data.resKey, function(result){
												if( result === false ){
													_resMgr.addResource(function(newResKey){
														data.resKey = newResKey;
														it1.next(data);
													});
													return;
												}
												it1.next(data);
											});
										} ,
										function(it1, data){
											// HTML一旦削除して作り直し
											$img.attr({
												"src": obj.dataUri
											});
											$('.jCrop-editor').empty().append($(_htmlImgEditor({
												'imageData': $img[0].outerHTML,
												'rectData': rectData,
												'editData': editData
											})));
											resInfo.base64 = obj.base64;
											_resMgr.updateResource( data.resKey, resInfo, function(){
												_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
													data.path = publicPath;
													_resMgr.resetBinFromBase64( data.resKey, function(){
														$elem = $("[data-broccoli-edit-window-field-name='image_src']");

														// resKey, path一時保存
														$elem.data('resKey', data.resKey);
														$elem.data('path', data.path);

														it1.next(data);
													});
												});
											} );
											return;
										} ,
										// /画像更新
										function(it1, data){
											// case 'convertPPTX':

											// _this.callGpi(
											// 	{
											// 		'api': 'convertPSD',
											// 		'data': data
											// 	},
											// 	function(result){
											// 		$btnOK.prop('disabled', false); // ボタン無効化解除
											// 		$elem = $("[data-broccoli-edit-window-field-name='image_src']");
											// 		$elem.data('resKeyOrgPng', result.resKeyOrgPng);
											// 		$elem.data('PngPath', result.PngPath);
											// 		$elem.data('PngInfo', result.PngInfo);
											//
											// 		$elem.data('resKeyHtml', result.resKeyHtml);
											// 		$elem.data('HtmlPath', result.HtmlPath);
											// 		$elem.data('isChanged', true);
											// 		// console.log(result.PngInfo);
											// 		var base64Png = 'data:image/png;base64,' + result.PngInfo.base64;
											// 		$('.img_editor-img').attr({"src": base64Png});
											// 		// console.log(result);
											// 		it1.next(data);
											// 	}
											// );
										} ,
										function(it1, data){
											callback(data);
											it1.next(data);
										}
									]
								);
							});


					} else if(fileInfo.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
						// PPTX
							resInfo.readSelectedLocalFile(fileInfo, function(obj){
								$btnOK.prop('disabled', true); // ボタン無効化
								var $dom = $(elm);
								if( typeof(data) !== typeof({}) ){
									data = {};
								}
								if( typeof(data.resKey) !== typeof('') ){
									data.resKey = '';
								}
								it79.fnc(
									data,
									[
										// PSD登録
										function(it1, data){
											_resMgr.getResource(data.resKey, function(result){
												if( result === false ){
													_resMgr.addResource(function(newResKey){
														data.resKey = newResKey;
														it1.next(data);
													});
													return;
												}
												it1.next(data);
											});
										} ,
										function(it1, data){
											// resInfo.src = obj.dataUri;
											resInfo.base64 = obj.base64;
											_resMgr.updateResource( data.resKey, resInfo, function(){
												_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
													data.path = publicPath;
													_resMgr.resetBinFromBase64( data.resKey, function(){
														$elem = $("[data-broccoli-edit-window-field-name='image_src']");
														$elem.data('resKey', data.resKey);
														it1.next(data);
													});
												});
											} );
											return;
										} ,
										// /PSD登録
										function(it1, data){
											_this.callGpi(
												{
													'api': 'convertPPTX',
													'data': data
												},
												function(result){
													$btnOK.prop('disabled', false); // ボタン無効化解除
													$elem = $("[data-broccoli-edit-window-field-name='image_src']");
													$elem.data('resKeyOrgPng', result.resKeyOrgPng);
													$elem.data('PngPath', result.PngPath);
													$elem.data('PngInfo', result.PngInfo);
													$elem.data('isChanged', true);
													// console.log(result.PngInfo);
													var base64Png = 'data:image/png;base64,' + result.PngInfo.base64;

													// HTML一旦削除して作り直し
													$img.attr({
														"src": base64Png
													});
													$('.jCrop-editor').empty().append($(_htmlImgEditor({
														'imageData': $img[0].outerHTML,
														'rectData': rectData,
														'editData': editData
													})));
													resInfo.base64 = obj.base64;
													_resMgr.updateResource( data.resKey, resInfo, function(){
														_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
															data.path = publicPath;
															_resMgr.resetBinFromBase64( data.resKey, function(){
																$elem = $("[data-broccoli-edit-window-field-name='image_src']");

																// resKey, path一時保存
																$elem.data('resKey', data.resKey);
																$elem.data('path', data.path);

																it1.next(data);
															});
														});
													} );

													console.log(result);
													it1.next(data);
												}
											);
										} ,
										function(it1, data){
											callback(data);
											it1.next(data);
										}
									]
								);
							});
							// PPTX
					}else if(fileInfo.type === 'image/vnd.adobe.photoshop'){
						// PSD
							resInfo.readSelectedLocalFile(fileInfo, function(obj){
								$btnOK.prop('disabled', true); // ボタン無効化
								var $dom = $(elm);
								if( typeof(data) !== typeof({}) ){
									data = {};
								}
								if( typeof(data.resKey) !== typeof('') ){
									data.resKey = '';
								}
								it79.fnc(
									data,
									[
										// PSD登録
										function(it1, data){
											_resMgr.getResource(data.resKey, function(result){
												if( result === false ){
													_resMgr.addResource(function(newResKey){
														data.resKey = newResKey;
														it1.next(data);
													});
													return;
												}
												it1.next(data);
											});
										} ,
										function(it1, data){
											// resInfo.src = obj.dataUri;
											resInfo.base64 = obj.base64;
											_resMgr.updateResource( data.resKey, resInfo, function(){
												_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
													data.path = publicPath;
													_resMgr.resetBinFromBase64( data.resKey, function(){
														$elem = $("[data-broccoli-edit-window-field-name='image_src']");
														$elem.data('resKey', data.resKey);
														it1.next(data);
													});
												});
											} );
											return;
										} ,
										// /PSD登録
										function(it1, data){
											_this.callGpi(
												{
													'api': 'convertPSD',
													'data': data
												},
												function(result){
													$btnOK.prop('disabled', false); // ボタン無効化解除
													$elem = $("[data-broccoli-edit-window-field-name='image_src']");
													$elem.data('resKeyOrgPng', result.resKeyOrgPng);
													$elem.data('PngPath', result.PngPath);
													$elem.data('PngInfo', result.PngInfo);

													$elem.data('resKeyHtml', result.resKeyHtml);
													$elem.data('HtmlPath', result.HtmlPath);
													$elem.data('isChanged', true);
													// console.log(result.PngInfo);
													var base64Png = 'data:image/png;base64,' + result.PngInfo.base64;
													$('.img_editor-img').attr({"src": base64Png});
													// console.log(result);
													it1.next(data);
												}
											);
										} ,
										function(it1, data){
											callback(data);
											it1.next(data);
										}
									]
								);
							});
						// /PSD
					}else{
						console.log('unknown fileType.');
					}
				}
				})
			);
			rtn.append(
					$('<div>')
						.append( $('<span>')
							.text('ファイル名')
						)
						.append( $('<input>')
							.attr({
								"name":mod.name+'-publicFilename' ,
								"type":"text",
								"placeholder": "file name",
								"readonly": "readonly"
							}).val(DL_file)
							// .val( (typeof(res.publicFilename)==typeof('') ? res.publicFilename : '') )
				)
			);
			rtn.append(
					$('<div>').append($DL_link)
			);
			console.log('rectData######', rectData);
			rtn.append(
				$('<div class="jCrop-editor">').append($(_htmlImgEditor({
				'imageData': $img[0].outerHTML,
				'rectData': rectData,
				'editData': editData
			}))));
			$(elm).html(rtn);

			var img_real_w, img_real_h;
			$("<img/>") // Make in memory copy of image to avoid css issues
				.attr("src", orgPng)
				.load(function() {
					var org_canvas = $("#jCrop-original-canvas")[0];
					$(org_canvas).attr('width', this.width);
					$(org_canvas).attr('height', this.height);
					if (!org_canvas || !org_canvas.getContext) {return false;}
					var org_ctx = org_canvas.getContext('2d');
					$(org_canvas).css('display', 'block'); // FIXED display:noneのcanvasにdrawImageできない？
					org_ctx.drawImage(this, 0, 0);
					$(org_canvas).css('display', 'none');
				});

			var work_canvas = $("#jCrop-work-canvas")[0];
			if (!work_canvas || !work_canvas.getContext) {return false;}
			var work_ctx = work_canvas.getContext('2d');
			var img1 = new Image();
			img1.src = editPng;
			work_ctx.drawImage(img1, 0, 0);

			console.log('【PNG】', editPng, orgPng);

			setTimeout(function(){ callback(); }, 0);
		} );
		return;
	}

	/**
	 * データを複製する
	 */
	this.duplicateData = function( data, callback ){
		data = JSON.parse( JSON.stringify( data ) );
		it79.fnc(
			data,
			[
				function(it1, data){
					_resMgr.duplicateResource( data.resKey, function(newResKey){
						data.resKey = newResKey;
						it1.next(data);
					} );
				} ,
				function(it1, data){
					_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
						data.PngPath = publicPath;
						it1.next(data);
					} );
				} ,
				function(it1, data){
					callback(data);
					it1.next(data);
				}
			]
		);
		return;
	}

	/**
	 * エディタUIで編集した内容を保存
	 */
	this.saveEditorContent = function( elm, data, mod, callback ){
		var resInfo;
		var linkData = [];
		var $dom = $(elm);
		$.each($('#jCrop-link li'), function(i,v){
			var data = {
				'x':parseInt($(v).find('input[name="cx"]').val()),
				'y':parseInt($(v).find('input[name="cy"]').val()),
				'w':parseInt($(v).find('input[name="cw"]').val()),
				'h':parseInt($(v).find('input[name="ch"]').val()),
				'color': $(v).find('input[name="color"]').val(),
				'label': $(v).find('input[name="linkName"]').val(),
				'url':   $(v).find('input[name="linkURL"]').val(),
				'target':$(v).find('input[name="linkTarget"]').val()
			};
			linkData.push(data);
		});
		var rect = $('#jCrop-rect').val();
		var b64Img = $('#jCrop-imgBase64').val();


		it79.fnc(
			data,
			[
				/****************
				 * resKeyOrgPng
				 ****************/
				function(it1, data){
					_resMgr.getResource(data.resKeyOrgPng, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKeyOrgPng = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					_resMgr.getResource(data.resKeyOrgPng, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
					resInfo.ext = 'png';
					resInfo.type = 'image/png';
					resInfo.size = 0;
					resInfo.base64 = $('#jCrop-original-canvas')[0].toDataURL().replace(new RegExp('^data\\:[^\\;]*\\;base64\\,'), '');
					resInfo.isPrivateMaterial = false;
					resInfo.publicFilename = $dom.find('input[name='+mod.name+'-publicFilename]').val();
					_resMgr.updateResource( data.resKeyOrgPng, resInfo, function(result){
						_resMgr.getResourcePublicPath( data.resKeyOrgPng, function(publicPath){
							data.OrgPngPath = publicPath;
							_resMgr.resetBinFromBase64(data.resKeyOrgPng, function() {
								it1.next(data);
							});
						} );
					} );
					return;
				},
				/****************
				 * resKeyEditPng
				 ****************/
				function(it1, data){
					_resMgr.getResource(data.resKeyEditPng, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKeyEditPng = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					_resMgr.getResource(data.resKeyEditPng, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
					resInfo.ext = 'png';
					resInfo.type = 'image/png';
					resInfo.size = 0;
					resInfo.base64 = $('#jCrop-work-canvas')[0].toDataURL().replace(new RegExp('^data\\:[^\\;]*\\;base64\\,'), '');
					if(resInfo.base64 === 'data:,'){
						// 空の場合は、originalを使う
						resInfo.base64 = $('#jCrop-original-canvas')[0].toDataURL().replace(new RegExp('^data\\:[^\\;]*\\;base64\\,'), '');
					}
					resInfo.isPrivateMaterial = false;
					// resInfo.publicFilename = $dom.find('input[name='+mod.name+'-publicFilename]').val();
					_resMgr.updateResource( data.resKeyEditPng, resInfo, function(result){
						_resMgr.getResourcePublicPath( data.resKeyEditPng, function(publicPath){
							data.EditPngPath = publicPath;
							_resMgr.resetBinFromBase64(data.resKeyEditPng, function() {
								it1.next(data);
							});
						} );
					} );
					return;
				},
				/****************
				 * resKeyRect
				 ****************/
				function(it1, data){
					_resMgr.getResource(data.resKeyRect, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKeyRect = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					_resMgr.getResource(data.resKeyRect, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
					resInfo.ext = 'json';
					resInfo.isPrivateMaterial = false;
					resInfo.base64 = JSON.stringify($('#jCrop-rect').val()).toString('base64');
					_resMgr.updateResource( data.resKeyRect, resInfo, function(result){
						_resMgr.getResourcePublicPath( data.resKeyRect, function(publicPath){
							_resMgr.resetBinFromBase64(data.resKeyRect, function() {
								it1.next(data);
							});
						} );
					} );
					return;
				},
				/****************
				 * resKeyEditData
				 ****************/
				function(it1, data){
					_resMgr.getResource(data.resKeyEditData, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKeyEditData = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					_resMgr.getResource(data.resKeyEditData, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
					resInfo.ext = 'json';
					resInfo.isPrivateMaterial = false;
					resInfo.base64 = JSON.stringify(linkData).toString('base64');
					_resMgr.updateResource( data.resKeyEditData, resInfo, function(result){
						_resMgr.getResourcePublicPath( data.resKeyEditData, function(publicPath){
							_resMgr.resetBinFromBase64(data.resKeyEditData, function() {
								it1.next(data);
							});
						} );
					} );
					return;
				},
				/****************
				 * resKeyHtml
				 ****************/
				function(it1, data){
					_resMgr.getResource(data.resKeyHtml, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKeyHtml = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					_resMgr.getResource(data.resKeyHtml, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
					resInfo.ext = 'html';
					resInfo.isPrivateMaterial = false;

					var jsonRect = JSON.parse($('#jCrop-rect').val())
					var psdWidth = jsonRect.w; // 画像サイズ
					var psdHeight = jsonRect.h; // 画像サイズ
					var linkHtml = '';
					for (var r in linkData) {
						var psd_data = linkData[r];
						var rect_top = Math.uFloor(psd_data.y / psdHeight * 100, 3) + '%';
						var rect_left = Math.uFloor(psd_data.x  / psdWidth * 100, 3) + '%';
						var rect_width = Math.uFloor(psd_data.w  / psdWidth * 100, 3) + '%';
						var rect_height =  Math.uFloor(psd_data.h / psdHeight * 100, 3) + '%';
						linkHtml += '<a href="' + psd_data.url + '" class="img_link" style="display:block; position:absolute; top:' + rect_top + '; left:' + rect_left + '; width:' + rect_width + '; height:' + rect_height + ';"></a>' + "\n";
					}

					var htmlTmpl = (function() {/*
<style>
.psdrb_html_generator .img_link{opacity:0; background:rgba(204,204,204,0.7);}
</style>
<div class="psdrb_html_generator" style="position:relative;margin:0;padding:0;<%= maxWidth %>;">
<img src="<%- imgFile %>" alt="">
<%= link_html %>
</div>
*/}).toString().uHereDoc();
					var _htmlTmpl = _.template(htmlTmpl);
					var html = _htmlTmpl({
						'link_html': _.unescape(linkHtml),
						'imgFile': data.EditPngPath,
						'maxWidth': 'max-width:' + psdWidth + "px"
					});
					resInfo.base64 = html;
					_resMgr.updateResource( data.resKeyHtml, resInfo, function(result){
						_resMgr.getResourcePublicPath( data.resKeyHtml, function(publicPath){
							data.HtmlPath = publicPath;
							_resMgr.resetBinFromBase64(data.resKeyHtml, function() {
								it1.next(data);
							});
						} );
					} );
					return;
				},
				function(it1, data){
					// オリジナルの保存
					data.resKey = $dom.data('resKey');
					data.path = $dom.data('path');
					_resMgr.getResource(data.resKey,function(){
						callback(data);
						it1.next(data);
					});
				}
			]
		);
		return;
	}// this.saveEditorContent()
}
