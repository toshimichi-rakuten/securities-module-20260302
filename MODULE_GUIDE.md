# 楽天証券 モジュール活用ガイド（AI向け）

## 📋 目次
1. [概要](#概要)
2. [Template.htmlの構造](#templatehtmlの構造)
3. [モジュール配置方法](#モジュール配置方法)
4. [モジュール一覧（お品書き）](#モジュール一覧お品書き)
5. [実装ルール](#実装ルール)
6. [サンプルコード](#サンプルコード)

---

## 概要

### このガイドの目的
AIが楽天証券のWebページを作成する際に、既存のモジュールを正確に活用し、`template.html`を基にして新しいHTMLページを完成させるためのリファレンス。

### 基本方針
- ✅ **既存モジュールのみを使用** - オリジナルデザインは一切加えない
- ✅ **BEMベース** - Block Element Modifierの命名規則
- ✅ **マージン管理** - ユーティリティクラスで間隔調整
- ✅ **SSIインクルード** - ヘッダー・フッター・サイドバーは自動読込

---

## Template.htmlの構造

### 基本テンプレート
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル｜楽天証券</title>

  <!-- 楽天証券本番CSS -->
  <link rel="stylesheet" href="https://www.rakuten-sec.co.jp/web/shared/css/style-bottom.css">

  <!-- ページ固有スクリプト -->
  <script src="https://www.rakuten-sec.co.jp/web/shared/js/s1-common.js"></script>

  <!-- パス変換スクリプト（絶対パスモードの場合のみ） -->
  <script>
(function() {
  const PRODUCTION_BASE_URL = 'https://www.rakuten-sec.co.jp';

  function convertPaths() {
    // 画像パス変換
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('/') && !src.startsWith('//')) {
        img.setAttribute('src', PRODUCTION_BASE_URL + src);
      }
    });

    // リンクパス変換
    const anchors = document.querySelectorAll('a');
    anchors.forEach(function(a) {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && href !== '#' && !href.startsWith('javascript:')) {
        a.setAttribute('href', PRODUCTION_BASE_URL + href);
      }
    });
  }

  // 初回実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', convertPaths);
  } else {
    convertPaths();
  }

  // 動的変更を監視
  const observer = new MutationObserver(convertPaths);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
</script>

  <style>
/* キャンバス内のブロック用の最小限のスタイル */
.canvas-block {
  position: relative;
  margin-bottom: 20px;
}

.canvas-block.selected {
  outline: 2px solid #bf0000;
}

.canvas-block__toolbar {
  display: none;
  position: absolute;
  top: -35px;
  right: 0;
  background: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.canvas-block:hover .canvas-block__toolbar,
.canvas-block.selected .canvas-block__toolbar {
  display: flex;
  gap: 5px;
}
  </style>
</head>
<body id="top">
  <!-- ヘッダー（SSI） -->
  <!--#include virtual="/web/shared/include/grpheader/v1-grpheader.html"-->
  <!--#include virtual="/web/shared/include/nav-global/other.html"-->

  <!-- メインコンテンツエリア -->
  <div class="s1-content-area mb-triple">
    <div class="s1-content-area__container">

      <!-- 左側：メインコンテンツ -->
      <div class="s1-content-area__main" role="main">

        <!-- パンくず -->
        <ul class="s1-breadcrumbs mb-normal">
          <li><a href="/">ホーム</a>&nbsp;&gt;&nbsp;</li>
          <li>ページ</li>
        </ul>

        <!-- SNS共有ボタン -->
        <!--#include virtual="/web/shared/include/socialbookmark/s1-parts.html"-->

        <!-- PCSP共通コンテンツ -->
        <div id="pcsp-quick" class="mb-triple">
          <!-- ここにモジュールを配置 -->
        </div>

        <!-- SNS共有ボタン（2回目） -->
        <!--#include virtual="/web/shared/include/socialbookmark/s1-parts.html"-->

      </div>

      <!-- 右側：サイドバー（SSI） -->
      <div class="s1-content-area__sidebar" role="complementary">
        <!--#include virtual="/web/shared/include/str-sub-common/s1-side-account.html"-->
        <!--#include virtual="/web/shared/include/str-sub-common/s1-side-login.html"-->
        <!--#include virtual="/web/shared/include/str-sub-common/s1-common-side.html"-->
        <!--#include virtual="/web/shared/include/str-sub-common/s1-common-info-side-contents.html"-->
      </div>

    </div>
  </div>

  <!-- フッター（SSI） -->
  <!--#include virtual="/web/shared/include/str-footer/v1-str-footer.html"-->

  <!-- 分析タグ（SSI） -->
  <!--#include virtual="/web/shared/include/analysis/analysis-sitecatalyst.html"-->
  <!--#include virtual="/web/shared/include/analysis/analysis-mebius.html"-->
</body>
</html>
```

---

## モジュール配置方法

### 配置場所
**`<div id="pcsp-quick" class="mb-triple">` の中にモジュールを配置する**

```html
<div id="pcsp-quick" class="mb-triple">
  <!-- ここから -->

  <!-- 見出し1 -->
  <div class="s1-hdg-lv1">
    <h1 class="s1-hdg-lv1__element">ページタイトル</h1>
  </div>

  <!-- 本文 -->
  <div class="s1-box-section mb-double">
    <p>テキスト内容</p>
  </div>

  <!-- ここまで -->
</div>
```

### パンくずの編集
```html
<!-- パンくず -->
<ul class="s1-breadcrumbs mb-normal">
  <li><a href="/">ホーム</a>&nbsp;&gt;&nbsp;</li>
  <li><a href="/market/">マーケット情報</a>&nbsp;&gt;&nbsp;</li>
  <li>現在のページ名</li>
</ul>
```

---

## モジュール一覧（お品書き）

### 1. 見出しモジュール

#### 見出しレベル1（ページタイトル）
```html
<div class="s1-hdg-lv1">
  <h1 class="s1-hdg-lv1__element">見出し1</h1>
</div>
```

#### 見出しレベル2（セクション見出し）
```html
<div class="s1-hdg-lv2">
  <h2 class="s1-hdg-lv2__element">見出し2</h2>
</div>
```

#### 見出しレベル3（サブセクション見出し）
```html
<div class="s1-hdg-lv3">
  <h3 class="s1-hdg-lv3__element">見出し3</h3>
</div>
```

#### 見出しレベル4
```html
<div class="s1-hdg-lv4">
  <h4 class="s1-hdg-lv4__element">見出し4</h4>
</div>
```

#### その他見出し（小見出し）
```html
<p class="s1-entitle">小見出しテキスト</p>
```

---

### 2. 本文・テキストモジュール

#### 基本テキストボックス
```html
<div class="s1-box-section mb-double">
  <p>テキスト内容1</p>
  <p>テキスト内容2</p>
</div>
```

#### メディア付きテキスト
```html
<div class="s1-box-media">
  <p class="mb-normal"><img src="画像URL" alt="" class="s1-box-media__img"></p>
  <p class="s1-box-media__hdg">メディアタイトル</p>
  <p class="s1-box-media__caption">キャプション</p>
</div>
```

---

### 3. お知らせ・ピックアップモジュール

#### お知らせボックス（日付付き）
```html
<div class="s1-box-list-info mb-double">
  <h2 class="s1-box-list-info__hdg">お知らせ</h2>
  <ul class="s1-list-info">
    <li class="s1-list-info__item">
      <div class="s1-list-info__content s1-list-info__content--time">2026/03/02</div>
      <div class="s1-list-info__content"><a href="#">お知らせタイトル</a></div>
    </li>
    <li class="s1-list-info__item">
      <div class="s1-list-info__content s1-list-info__content--time">2026/03/01</div>
      <div class="s1-list-info__content"><a href="#">お知らせタイトル</a></div>
    </li>
  </ul>
</div>
```

#### ピックアップボックス（ラベル付き）
```html
<div class="s1-box-list-info mb-double">
  <h2 class="s1-box-list-info__hdg">ピックアップ</h2>
  <ul class="s1-list-info">
    <li class="s1-list-info__item">
      <div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--info">お知らせ</span></div>
      <div class="s1-list-info__content"><a href="#">記事タイトル</a></div>
    </li>
    <li class="s1-list-info__item">
      <div class="s1-list-info__content s1-list-info__content--label"><span class="s1-label--important">重要</span></div>
      <div class="s1-list-info__content"><a href="#">記事タイトル</a></div>
    </li>
  </ul>
</div>
```

**ラベルバリエーション:**
- `.s1-label--info` - 青色ラベル（お知らせ）
- `.s1-label--important` - 赤色ラベル（重要）

---

### 4. リストモジュール

#### スタンダードリスト（黒丸）
```html
<ul class="s1-list-standard mb-normal">
  <li>リストアイテム1</li>
  <li>リストアイテム2</li>
  <li>リストアイテム3</li>
</ul>
```

#### バブルリスト（白丸）
```html
<ul class="s1-list-bubble mb-normal">
  <li>リストアイテム1</li>
  <li>リストアイテム2</li>
  <li>リストアイテム3</li>
</ul>
```

#### 番号付きリスト
```html
<ol class="s1-list-number mb-normal">
  <li>リストアイテム1</li>
  <li>リストアイテム2</li>
  <li>リストアイテム3</li>
</ol>
```

#### 自動カウントバブルリスト（推奨）
```html
<ol class="s1-list-num-bubble-count mb-normal">
  <li>リストアイテム1</li>
  <li>リストアイテム2</li>
  <li>リストアイテム3</li>
</ol>
```

#### ポイントリスト
```html
<ol class="s1-list-num-point">
  <li class="s1-list-num-point__item">
    <div class="s1-list-num-point__circle">point<br><span class="fs24">1</span></div>
    <div class="s1-list-num-point__txt">ポイント内容1</div>
  </li>
  <li class="s1-list-num-point__item">
    <div class="s1-list-num-point__circle">point<br><span class="fs24">2</span></div>
    <div class="s1-list-num-point__txt">ポイント内容2</div>
  </li>
</ol>
```

#### リンクリスト
```html
<ul class="s1-list-link">
  <li class="s1-list-link__item"><a href="#">リンクテキスト1</a></li>
  <li class="s1-list-link__item"><a href="#">リンクテキスト2</a></li>
  <li class="s1-list-link__item"><a href="#">リンクテキスト3</a></li>
</ul>
```

#### 注釈リスト（米印付き）
```html
<ul class="s1-list-notice">
  <li><div>※</div><div>注釈テキスト1</div></li>
  <li><div>※</div><div>注釈テキスト2</div></li>
</ul>
```

#### アンカーリンクリスト（ページ内リンク）
```html
<ul class="s1-list-anchor s1-list-anchor--wrap">
  <li class="s1-list-anchor__item"><a href="#section1" class="s1-list-anchor__element">セクション1</a></li>
  <li class="s1-list-anchor__item"><a href="#section2" class="s1-list-anchor__element">セクション2</a></li>
  <li class="s1-list-anchor__item"><a href="#section3" class="s1-list-anchor__element">セクション3</a></li>
</ul>
```

---

### 5. ボタンモジュール

#### 口座開設ボタン（赤）
```html
<div class="s1-btn-account-open">
  <a href="/account/"><i class="s-glyph">&#xf10a;</i>&nbsp;口座申込</a>
</div>
```

#### サブアカウントボタン（オレンジ）
```html
<div class="s1-btn-account-sub">
  <a href="#"><i class="s-glyph">&#xf10a;</i>&nbsp;NISA口座申込</a>
</div>
```

#### 楽天会員ボタン
```html
<div class="s1-btn-account-rakuten">
  <a href="#">楽天会員の方はこちら</a>
</div>
```

#### 汎用ボタン1
```html
<div class="s1-btn-general01">
  <a href="#">ボタンテキスト</a>
</div>
```

#### 汎用ボタン2
```html
<div class="s1-btn-general02">
  <a href="#"><i class="s-glyph">&#xf10a;</i>&nbsp;ボタンテキスト</a>
</div>
```

#### コンバージョンボックス（上下マージン付き）
```html
<div class="s1-box-conversion mb-double">
  <div class="s1-btn-account-open">
    <a href="/account/"><i class="s-glyph">&#xf10a;</i>&nbsp;口座申込</a>
  </div>
</div>
```

**注意:** `.s1-box-conversion` は自動的に上下28pxのマージンが付きます

---

### 6. テーブルモジュール

#### 基本テーブル（フル幅）
```html
<table class="s1-tbl-data01 s1-tbl--width-full">
  <thead>
    <tr>
      <th>見出し1</th>
      <th>見出し2</th>
      <th>見出し3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>項目名</th>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
    <tr>
      <th>項目名</th>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
  </tbody>
</table>
```

#### ストライプテーブル（縞模様）
```html
<table class="s1-tbl-data01 s1-tbl--width-full s1-tbl--row-color">
  <thead>
    <tr>
      <th>見出し1</th>
      <th>見出し2</th>
      <th>見出し3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>項目名</th>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
    <tr>
      <th>項目名</th>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
  </tbody>
</table>
```

#### 均等幅テーブル
```html
<table class="s1-tbl-data01 s1-tbl--width-full s1-tbl--layout-fixed">
  <thead>
    <tr>
      <th>見出し1</th>
      <th>見出し2</th>
      <th>見出し3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="ta-c">項目名</th>
      <td class="ta-c">データ1</td>
      <td class="ta-c">データ2</td>
    </tr>
  </tbody>
</table>
```

**テーブル用クラス:**
- `.s1-tbl--width-full` - フル幅
- `.s1-tbl--row-color` - 行ごとに色を変える
- `.s1-tbl--layout-fixed` - 均等幅
- `.s1-tbl--width-10` ～ `.s1-tbl--width-60` - 列幅指定（10%刻み）

---

### 7. バナーモジュール

#### 横並び2連バナー
```html
<div class="s1-box-banner mb-normal">
  <ul class="s1-box-banner__list s1-box-banner__list--center s1-box-banner__list--top">
    <li class="mr-10"><a href="#"><img src="画像URL1" alt=""></a></li>
    <li><a href="#"><img src="画像URL2" alt=""></a></li>
  </ul>
</div>
```

#### バナー + テキストリンク
```html
<div class="s1-box-banner mb-normal">
  <ul class="s1-box-banner__list s1-box-banner__list--center s1-box-banner__list--top">
    <li class="mr-10">
      <a href="#"><img src="画像URL" alt=""></a><br>
      <a href="#">バナー説明テキスト</a>
    </li>
  </ul>
</div>
```

#### 4連バナー
```html
<div class="s1-box-banner mb-normal">
  <ul class="s1-box-banner__list s1-box-banner__list--center s1-box-banner__list--top">
    <li class="mr-10"><a href="#"><img src="画像URL1" alt=""></a></li>
    <li class="mr-10"><a href="#"><img src="画像URL2" alt=""></a></li>
    <li class="mr-10"><a href="#"><img src="画像URL3" alt=""></a></li>
    <li><a href="#"><img src="画像URL4" alt=""></a></li>
  </ul>
</div>
```

#### 縦並びバナー
```html
<div class="s1-box-banner">
  <ul class="s1-box-banner__list s1-box-banner__list--center">
    <li class="mb-10"><a href="#"><img src="画像URL1" alt=""></a></li>
    <li><a href="#"><img src="画像URL2" alt=""></a></li>
  </ul>
</div>
```

**バナー用モディファイア:**
- `.s1-box-banner__list--center` - センタリング
- `.s1-box-banner__list--top` - 上揃え

---

### 8. グリッドレイアウトモジュール

#### 2カラムグリッド
```html
<div class="s1-grid mb-double">
  <div class="s1-grid__cell--thin-1-2">
    <p>左側コンテンツ</p>
  </div>
  <div class="s1-grid__cell--thin-1-2">
    <p>右側コンテンツ</p>
  </div>
</div>
```

---

## 実装ルール

### ユーティリティクラス（間隔調整）

#### 下マージン（推奨：キーワード指定）
| クラス | 効果 |
|--------|------|
| `.mb-0` | マージンなし |
| `.mb-normal` | 14px（ベースユニット） |
| `.mb-one-third` | 4.2px（1/3倍） |
| `.mb-half` | 7px（1/2倍） |
| `.mb-point-five` | 21px（1.5倍） |
| `.mb-double` | 28px（2倍） ⭐よく使う |
| `.mb-triple` | 42px（3倍） |
| `.mb-10` | 10px |
| `.mb-15` | 15px |
| `.mb-20` | 20px |
| `.mb-30` | 30px |
| `.mb-40` | 40px |

#### 上マージン
| クラス | 効果 |
|--------|------|
| `.mt-0` | マージンなし |
| `.mt-normal` | 14px |
| `.mt-double` | 28px |
| `.mt-triple` | 42px |
| `.mt-10` | 10px |
| `.mt-20` | 20px |
| `.mt-30` | 30px |

#### 右マージン（バナー等の横並び調整用）
| クラス | 効果 |
|--------|------|
| `.mr-10` | 10px |
| `.mr-20` | 20px |

#### テキスト配置
| クラス | 効果 |
|--------|------|
| `.ta-c` | 中央揃え |
| `.ta-l` | 左揃え |
| `.ta-r` | 右揃え |

#### フォントサイズ
| クラス | 効果 |
|--------|------|
| `.fs-s` | 小さいフォント |
| `.fs24` | 24pxフォント |

#### 色指定
| クラス | 効果 |
|--------|------|
| `.fc-r-01` | 赤色テキスト |

#### 幅指定
| クラス | 効果 |
|--------|------|
| `.wd-350` | 幅350px |

---

### セクション間の推奨マージン

1. **見出し（hX要素）で区切られるセクション**: 自動的に28pxのマージンが付く
2. **セクション間**: 基本 `.mb-double`（28px）
3. **コンバージョンモジュール（.s1-box-conversion）**: 自動的に上下28pxのマージンが付く

---

### 命名規則（BEM）

#### ブロック（Block）
```html
<div class="s1-box-section">
```

#### 要素（Element）
```html
<h1 class="s1-hdg-lv1__element">
```

#### モディファイア（Modifier）
```html
<ul class="s1-list-anchor s1-list-anchor--wrap">
```

---

### SSIインクルードについて

**自動的に読み込まれるファイル:**
- ヘッダー: `/web/shared/include/grpheader/v1-grpheader.html`
- グローバルナビ: `/web/shared/include/nav-global/other.html`
- サイドバー: `/web/shared/include/str-sub-common/` 配下
- フッター: `/web/shared/include/str-footer/v1-str-footer.html`
- 分析タグ: `/web/shared/include/analysis/` 配下

**SSIの仕組み:**
- `ssi-server.py` が `<!--#include virtual="..." -->` を検出
- 指定されたパスのファイルを読み込んで埋め込む
- `/web/...` → `web/...` に変換される（現在のフォルダ構造）

---

## サンプルコード

### 例1: シンプルなお知らせページ

```html
<div id="pcsp-quick" class="mb-triple">

  <!-- 見出し1 -->
  <div class="s1-hdg-lv1">
    <h1 class="s1-hdg-lv1__element">重要なお知らせ</h1>
  </div>

  <!-- お知らせリスト -->
  <div class="s1-box-list-info mb-double">
    <h2 class="s1-box-list-info__hdg">お知らせ</h2>
    <ul class="s1-list-info">
      <li class="s1-list-info__item">
        <div class="s1-list-info__content s1-list-info__content--time">2026/03/02</div>
        <div class="s1-list-info__content"><a href="#">システムメンテナンスのお知らせ</a></div>
      </li>
      <li class="s1-list-info__item">
        <div class="s1-list-info__content s1-list-info__content--time">2026/03/01</div>
        <div class="s1-list-info__content"><a href="#">新サービス開始のお知らせ</a></div>
      </li>
    </ul>
  </div>

  <!-- 本文 -->
  <div class="s1-box-section mb-double">
    <p>お客様各位</p>
    <p>平素は楽天証券をご利用いただき、誠にありがとうございます。</p>
  </div>

</div>
```

---

### 例2: 商品紹介ページ

```html
<div id="pcsp-quick" class="mb-triple">

  <!-- メインタイトル -->
  <div class="s1-hdg-lv1">
    <h1 class="s1-hdg-lv1__element">投資信託のご案内</h1>
  </div>

  <!-- ページ内リンク -->
  <ul class="s1-list-anchor s1-list-anchor--wrap">
    <li class="s1-list-anchor__item"><a href="#features" class="s1-list-anchor__element">特徴</a></li>
    <li class="s1-list-anchor__item"><a href="#merit" class="s1-list-anchor__element">メリット</a></li>
    <li class="s1-list-anchor__item"><a href="#howto" class="s1-list-anchor__element">始め方</a></li>
  </ul>

  <!-- セクション1 -->
  <div class="s1-hdg-lv2" id="features">
    <h2 class="s1-hdg-lv2__element">投資信託の特徴</h2>
  </div>

  <div class="s1-box-section mb-double">
    <p>投資信託は、多くの投資家から集めた資金を専門家が運用する金融商品です。</p>
  </div>

  <!-- ポイントリスト -->
  <ol class="s1-list-num-point mb-double">
    <li class="s1-list-num-point__item">
      <div class="s1-list-num-point__circle">point<br><span class="fs24">1</span></div>
      <div class="s1-list-num-point__txt">少額から始められる</div>
    </li>
    <li class="s1-list-num-point__item">
      <div class="s1-list-num-point__circle">point<br><span class="fs24">2</span></div>
      <div class="s1-list-num-point__txt">プロが運用するので安心</div>
    </li>
    <li class="s1-list-num-point__item">
      <div class="s1-list-num-point__circle">point<br><span class="fs24">3</span></div>
      <div class="s1-list-num-point__txt">分散投資でリスク軽減</div>
    </li>
  </ol>

  <!-- セクション2 -->
  <div class="s1-hdg-lv2" id="merit">
    <h2 class="s1-hdg-lv2__element">楽天証券で始めるメリット</h2>
  </div>

  <div class="s1-box-section mb-double">
    <ul class="s1-list-standard">
      <li>購入手数料が無料の投資信託多数</li>
      <li>楽天ポイントで投資信託が買える</li>
      <li>積立投資で楽天カード決済が可能</li>
    </ul>
  </div>

  <!-- コンバージョン -->
  <div class="s1-box-conversion mb-double">
    <div class="s1-btn-account-open">
      <a href="/account/"><i class="s-glyph">&#xf10a;</i>&nbsp;口座申込</a>
    </div>
  </div>

  <!-- 関連リンク -->
  <div class="s1-hdg-lv3">
    <h3 class="s1-hdg-lv3__element">関連情報</h3>
  </div>

  <div class="s1-box-section mb-normal">
    <ul class="s1-list-link">
      <li class="s1-list-link__item"><a href="#">投資信託ランキング</a></li>
      <li class="s1-list-link__item"><a href="#">投資信託の選び方</a></li>
      <li class="s1-list-link__item"><a href="#">よくあるご質問</a></li>
    </ul>
  </div>

</div>
```

---

### 例3: データテーブル付きページ

```html
<div id="pcsp-quick" class="mb-triple">

  <!-- タイトル -->
  <div class="s1-hdg-lv1">
    <h1 class="s1-hdg-lv1__element">手数料一覧</h1>
  </div>

  <!-- 説明 -->
  <div class="s1-box-section mb-double">
    <p>楽天証券の各種手数料をご案内いたします。</p>
  </div>

  <!-- セクション -->
  <div class="s1-hdg-lv2">
    <h2 class="s1-hdg-lv2__element">国内株式取引手数料</h2>
  </div>

  <!-- テーブル -->
  <table class="s1-tbl-data01 s1-tbl--width-full s1-tbl--row-color mb-double">
    <thead>
      <tr>
        <th>約定代金</th>
        <th>手数料（税込）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>5万円まで</th>
        <td>55円</td>
      </tr>
      <tr>
        <th>10万円まで</th>
        <td>99円</td>
      </tr>
      <tr>
        <th>20万円まで</th>
        <td>115円</td>
      </tr>
      <tr>
        <th>50万円まで</th>
        <td>275円</td>
      </tr>
    </tbody>
  </table>

  <!-- 注釈 -->
  <ul class="s1-list-notice mb-normal">
    <li><div>※</div><div>2026年3月現在の手数料です。</div></li>
    <li><div>※</div><div>別途消費税がかかります。</div></li>
  </ul>

</div>
```

---

## チェックリスト

新しいページを作成する際は、以下を確認してください：

- [ ] `template.html` をベースにしている
- [ ] `<title>` タグを適切に設定
- [ ] パンくずリストを正しく設定
- [ ] モジュールは `<div id="pcsp-quick">` 内に配置
- [ ] 既存モジュールのみを使用（オリジナルデザインなし）
- [ ] マージン調整にユーティリティクラスを使用
- [ ] 見出しの階層が正しい（h1 → h2 → h3）
- [ ] SSIインクルードはそのまま（削除・変更しない）
- [ ] リンク先URLは適切に設定

---

## よくある質問

### Q1: モジュール間の間隔はどうすればいい？
A: 基本的に `.mb-double`（28px）を使用。見出しやコンバージョンボックスは自動的にマージンが付きます。

### Q2: ボタンの幅を調整したい
A: ボタンモジュール自体は100%幅です。親要素の幅を調整するか、`.wd-350` 等の幅指定クラスを使用してください。

### Q3: テキストの色を変えたい
A: `.fc-r-01` で赤色になります。他の色が必要な場合は既存モジュールを確認してください。

### Q4: 画像はどこから取得する？
A: 絶対パスモードでは `/` で始まるパスが自動的に `https://www.rakuten-sec.co.jp` に変換されます。

### Q5: カスタムCSSは追加できる？
A: **できません**。既存モジュールとユーティリティクラスのみを使用してください。

---

## まとめ

このガイドに従えば、AIは以下ができるようになります：

1. ✅ `template.html` をベースにした新規ページ作成
2. ✅ 適切なモジュールの選択と配置
3. ✅ 正しいマージン調整
4. ✅ オリジナルデザインを加えない実装
5. ✅ 楽天証券の統一されたデザインガイドラインに準拠

**重要:** このガイドは楽天証券の既存デザインシステムを尊重し、一貫性のあるWebページを作成するためのものです。
