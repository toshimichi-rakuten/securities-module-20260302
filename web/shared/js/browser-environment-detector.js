/**
 * @file browser-environment-detector.js
 * @brief ユーザーのOSとブラウザ情報を検出し、指定されたHTML要素に表示するスクリプト。
 *
 * 依存関係:
 *   - /web/shared/js/app/bowser-bundled.js (bowserライブラリ)
 *
 * 設定情報:
 *   - OS情報: HTML要素 <p id="p-os"></p> に設定されます。
 *     (例: "Windows 10/11 (64bit)", "macOS 14")
 *   - ブラウザ情報: HTML要素 <p id="p-name"></p> に設定されます。
 *     (例: "Chrome（120.0.0.0）", "Safari（17.1）")
 */
document.addEventListener('DOMContentLoaded', () => {
  const pOsElement = document.getElementById('p-os');
  const pNameElement = document.getElementById('p-name');
  const authButton = document.getElementById('auth-button');

  const parser = bowser.getParser(window.navigator.userAgent);
  const os = parser.getOS();
  const browser = parser.getBrowser();

  let osDisplay = `${os.name} ${os.version}`;
  let is64bit = false;

  // User-Agent文字列から64bit情報を確認
  if (window.navigator.userAgent.includes('Win64') || window.navigator.userAgent.includes('x64')) {
    is64bit = true;
  }

  const isWindows10or11 = os.name === 'Windows' && (
    os.version === '10' ||
    os.version?.startsWith('10.0') ||
    os.version?.includes('NT 10.0') // NT 10.0 が含まれる場合を考慮
  );

  if (isWindows10or11) {
    // Windows 10 または 11 の場合
    osDisplay = 'Windows 10/11';
    if (is64bit) {
      osDisplay += ' (64bit)';
    }
  } else {
    // その他のOSの場合 (Windows 以外で64bit情報が必要ならここにロジックを追加)
    if (is64bit && os.name !== 'Unknown') { // Unknownの場合は表示しない
      osDisplay += ' (64bit)';
    }
  }

  // OS情報をテーブルセル内の <p id="p-os"></p> に設定
  pOsElement.textContent = osDisplay;

  // ブラウザ情報をテーブルセル内の <p id="p-name"></p> に設定
  pNameElement.textContent = `${browser.name}（${browser.version}）`;

});