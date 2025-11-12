## markdown-pdf.css

- フォルダパス：`C:\Users\{ユーザー名}}\.vscode\extensions\yzane.markdown-pdf-1.5.0\styles\markdown-pdf.css`

> デフォルト

```css
/* for inline code */
:not(pre):not(.hljs) > code {
	/* Change the old color so it seems less like an error */
	/* color: #C9AE75;  */
	font-size: inherit;
}
```

> inline codeを灰色表示にする。

```css
/* for inline code */
:not(pre):not(.hljs) > code {
	/* Change the old color so it seems less like an error */
	/* color: #C9AE75;  */
	font-size: inherit;
	/* ユーザーによる追加 */
	background: #c0c0c0;
}
```

## Markdown-pdf: Convert On Save

`checked`



## Markdown-pdf: Header Template

> デフォルト設定

```html
<div style="font-size: 9px; margin-left: 1cm;"> <span class='title'></span></div> <div style="font-size: 9px; margin-left: auto; margin-right: 1cm; ">%%ISO-DATE%%</div>
```

> ヘッダーにページ数を表示する

```html
<div style="font-size: 9px; margin-left: 1cm;"> <span class='title'></span></div> <div style="font-size: 9px; margin-left: auto; margin-right: 1cm; "> <span class='pageNumber'></span> / <span class='totalPages'></span> </div>
```



## Markdown-pdf: Footer Template

> デフォルト設定

```html
<div style="font-size: 9px; margin: 0 auto;"> <span class='pageNumber'></span> / <span class='totalPages'></span></div>
```

