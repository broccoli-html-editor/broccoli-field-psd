# broccoli-field-psd

_broccoli-field-psd_ は、 _broccoli-html-editor_ に カスタムフィールド "画像編集フィールド" を追加する拡張パッケージです。

※ モジュール化手順
下リンクの差分箇所を修正します  
https://goo.gl/aOB8Jn

※ 設定手順
### broccoli-field-psd install
- youngcorn/package.jsonに一行追加
```
"dependencies": {
  "broccoli-field-psd": "git://github.com/pickles2/broccoli-field-psd.git",
}
```
- npmモジュールダウンロード
```
# cd youngcorn
# npm i
```

- gulpfile.jsにタスクを追加
```
# atom gulpfile.js
```
```js
// broccoli-client (frontend) を処理
gulp.src(["node_modules/broccoli-field-psd/dist/*"])
  .pipe(gulp.dest( './dist/{PATH_TO_YOUR_DIRECTORY}' ))
;
```

- baskendJSに追加  
```
# atom backend/apis/broccoliBridgeForThemeEditor.js
```
```js
'customFields': {
  'psd': require('broccoli-field-psd')
},
```

- frontendJSに追加  
```
# atom  src/project/themeEditor/editors/broccoli-html-editor/index.html.twig
```
```js
<!--broccoli-field-psd -->
<script src="/{PATH_TO_YOUR_DIRECTORY}broccoli-field-psd.js"></script>

```

- themeに追加  
```
# atom src/project/themeEditor/editors/broccoli-html-editor/index_files/cont.js
```
```js
'customFields': {
  'psd': window.BroccoliFieldPSD
},
```

- templateを追加
```
# cp node_modules/broccoli-field-psd/tests/testdata/modules1/dev/psd #{プロジェクトフォルダ}/px-files/themes/broccoli/modules/images/
```

- 配置&実行
```
# gulp; gulp watch;
```

## ライセンス - License

MIT License


## 作者 - Author

- (C)Misaki Shibata <misaki.pink@gmail.com>
