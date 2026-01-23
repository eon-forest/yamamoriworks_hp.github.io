# 山守ワークス HP

森林を見守る仕組みを地域に実装する会社のウェブサイト

## 📁 ファイル構成

```
yamamori-works/
├── index.html      # HTMLメインファイル
├── styles.css      # コンパイル済みCSS（本番用）
├── styles.scss     # SCSSソースファイル（開発用）
├── script.js       # JavaScriptファイル
└── README.md       # このファイル
```

## 🎨 デザインコンセプト

### 色彩設計
- **白（#FDFDFB）**: 潜在価値を表現する基調色
- **緑系統**: 森林の機能をグラデーションで表現
  - Forest Green: #2D5016
  - Moss Green: #5A7B3A
  - Sage Green: #8BA870
- **茶・橙系統**: 人の役割と意思決定を象徴
  - Earth Brown: #8B6F47
  - Warm Orange: #C4956C

### UIコンセプト
1. **シングルカラム構造**: 文脈を辿るように縦に流れるレイアウト
2. **伴走する印象**: 左側のラインとドット、カードの左ボーダーで「並走」を視覚化
3. **見守る余白**: 過剰な装飾を避け、情報を呼吸させる空間設計

## 🚀 セットアップ

### 1. 基本的な使い方（CSS版）

そのまま使用できます：

```bash
# ファイルをウェブサーバーに配置
# または直接index.htmlをブラウザで開く
```

### 2. SCSS開発環境のセットアップ

SCSSを編集する場合は、Sassコンパイラが必要です：

```bash
# Node.jsがインストールされている場合
npm install -g sass

# SCSSをウォッチしてCSSに自動コンパイル
sass --watch styles.scss:styles.css

# または1回だけコンパイル
sass styles.scss styles.css
```

### 3. Pythonでローカルサーバーを起動

```bash
# Python 3の場合
python -m http.server 8000

# ブラウザで http://localhost:8000 にアクセス
```

## 📝 カスタマイズガイド

### 色の変更

**styles.scss**の変数を編集：

```scss
// 変数定義セクション
$forest-green: #2D5016;  // メインカラー
$moss-green: #5A7B3A;    // アクセント
$earth-brown: #8B6F47;   // 人の役割を表す色
```

### コンテンツの編集

**index.html**を直接編集してください。主要なセクション：

1. `.hero` - ヒーローセクション（ロゴ・キャッチフレーズ）
2. `.about` - 会社概要
3. `.functions` - 3つの機能（再定義・実行・育成）
4. `.philosophy` - 哲学・考え方
5. `.footer` - フッター

### アニメーションの調整

**script.js**の設定値を変更：

```javascript
// スクロールアニメーションの発火位置
isInViewport(element) {
  // 0.8 = 画面の80%位置で発火（0.0-1.0で調整）
  return rect.top <= windowHeight * 0.8;
}
```

## 🎯 機能一覧

### 実装済み機能

- ✅ レスポンシブデザイン（モバイル対応）
- ✅ スクロールアニメーション
- ✅ スムーススクロール
- ✅ パララックス効果（軽微）
- ✅ アクティブセクション検出
- ✅ パフォーマンス最適化（throttle/debounce）

### JavaScript機能の詳細

**ScrollAnimations**
- 要素がビューポートに入ったときにアニメーション

**SmoothScroll**
- スクロールインジケーターとアンカーリンクのスムーズスクロール

**PageLoader**
- ページ読み込み時のアニメーション管理

**ParallaxEffect**
- ヒーローセクションの軽いパララックス効果

**ActiveSectionDetector**
- 現在表示中のセクションを検出

## 📱 レスポンシブ対応

768px以下のデバイスで自動的にレイアウトが調整されます：

- フォントサイズの縮小
- パディングの調整
- タイムラインの幅調整
- セクションタイトル装飾の位置変更

## 🔧 トラブルシューティング

### アニメーションが動かない

1. **script.js**が正しく読み込まれているか確認
2. ブラウザのコンソールでエラーをチェック
3. JavaScriptが有効になっているか確認

### SCSSがコンパイルできない

```bash
# Sassがインストールされているか確認
sass --version

# インストールされていない場合
npm install -g sass
```

### フォントが表示されない

- インターネット接続を確認（Google Fontsを使用）
- フォールバックフォントで表示される場合があります

## 🎨 使用フォント

- **Noto Serif JP**: 見出し・ロゴ用
- **Zen Kaku Gothic New**: 本文用

両フォントともGoogle Fontsから読み込み。

## 📄 ライセンス

© 2025 Yamamori Works. All Rights Reserved.

## 🤝 バイブコーディング開発のポイント

### VS CodeとCursorでの作業推奨

1. **Live Server拡張機能**を使用してリアルタイムプレビュー
2. SCSSファイルを編集 → 自動コンパイル → ブラウザ自動更新
3. JavaScriptはモジュール化されているため、一部だけ修正可能

### 推奨する編集順序

1. **index.html** - コンテンツの追加・変更
2. **styles.scss** - スタイルの調整（変数から始める）
3. **script.js** - インタラクションの追加

### よく使うSCSSパターン

```scss
// ネスト構造
.section {
  padding: 2rem;
  
  &-title {
    font-size: 2rem;
  }
  
  &:hover {
    background: #eee;
  }
}

// 変数の活用
$spacing-unit: 1rem;
padding: $spacing-unit * 2;

// ミックスイン（よく使うスタイルの再利用）
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 📞 サポート

質問や提案があれば、プロジェクトの担当者にお問い合わせください。
