
import html2canvas from 'html2canvas';

/**
 * 使用 HTML2Canvas 将 DOM 转换为 Canvas
 * 然后使用 canvas.toDataURL 将 Canvas 转换为 Base64 并下载图片到本地
 */
export function exportMenu() {
  const menuContainer = document.querySelector('.img-container');
  html2canvas(menuContainer, {
    scale: 2,
  }).then(canvas => {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `menu-${new Date().toLocaleDateString()}.png`;
    a.click();
  });
}