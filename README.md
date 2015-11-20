# broccoli-imageeditor-field

_broccoli-imageeditor-field_ は、 _broccoli-html-editor_ に カスタムフィールド "画像編集フィールド" を追加する拡張パッケージです。

## インストール - Install

```
$ npm install broccoli-html-editor --save
$ npm install broccoli-imageeditor-field --save
```

※ モジュール化手順
下リンクの差分箇所を修正します  
https://goo.gl/oRQ9Lo

※ 設定手順
### broccoli-imageeditor-field install
- youngcorn/package.jsonに一行追加
```
"dependencies": {
  "broccoli-imageeditor-field": "git://github.com/pickles2/broccoli-imageeditor-field.git",
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
gulp.src(["node_modules/broccoli-imageeditor-field/dist/*"])
  .pipe(gulp.dest( './dist/libs/broccoli-imageeditor-field/dist/' ))
;
```

- baskendJSに追加  
```
# atom backend/apis/broccoliBridgeForThemeEditor.js
```
```js
'customFields': {
  'imageeditor': require('broccoli-imageeditor-field')
},
```

- frontendJSに追加  
```
# atom  src/project/themeEditor/editors/broccoli-html-editor/index.html.twig
```
```js
<!--broccoli-imageeditor-field -->
<script src="/libs/broccoli-imageeditor-field/dist/broccoli-imageeditor-field.js"></script>

```

- themeに追加  
```
# atom src/project/themeEditor/editors/broccoli-html-editor/index_files/cont.js
```
```js
'customFields': {
  'imageeditor': window.BroccoliImageEditorField
},
```

- templateを追加
```
# cp node_modules/broccoli-imageeditor-field/tests/testdata/modules1/dev/imageeditor #{プロジェクトフォルダ}/px-files/themes/broccoli/modules/images/
```


## ライセンス - License

MIT License


## 作者 - Author

- (C)Misaki Shibata <misaki.pink@gmail.com>
