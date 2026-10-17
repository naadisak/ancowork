/* ============================================================
   avatar.js — การ์ตูน avatar สร้างจาก SVG ในเครื่อง (ไม่ต่อเน็ต)
   ใช้: avatarSvg('E1042')  → คืนค่าเป็น <svg>…</svg>
   seed = รหัสพนักงาน → คนเดิมได้ตัวเดิมทุกครั้ง
   ============================================================ */
(function (global) {
  'use strict';

  var FACE_BG = ['#e0e7ff', '#dcfce7', '#fef3c7', '#fce7f3', '#e0f2fe', '#f3e8ff', '#ffedd5', '#d1fae5'];
        var FACE_SKIN = ['#f7d5b5', '#eec19a', '#dda37a', '#c98b5e', '#a9704a', '#8a573a'];
        var FACE_HAIR = ['#2b2723', '#40312a', '#5c4033', '#1f2937', '#7a4a26', '#3b2f2f', '#8d6e63'];
        var FACE_SHIRT = ['#4f6bed', '#0d9488', '#ea580c', '#db2777', '#7c3aed', '#0f766e', '#475569', '#c2410c'];
  
        function avatarSvg(seed) {
          var str = String(seed || 'x');
          var h = 2166136261;
          for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
          h = h >>> 0;
  
          function rnd() {
            h |= 0; h = h + 0x6D2B79F5 | 0;
            var t = Math.imul(h ^ h >>> 15, 1 | h);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
          }
          function pick(arr) { return arr[Math.floor(rnd() * arr.length)]; }
  
          var bg = pick(FACE_BG), skin = pick(FACE_SKIN), hair = pick(FACE_HAIR), shirt = pick(FACE_SHIRT);
          var style = Math.floor(rnd() * 7);
          var glasses = rnd() < 0.3;
          var happy = rnd() < 0.35;
          var blush = rnd() < 0.5;
          var ink = '#2a2422';
  
          var s = '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">';
          s += '<rect width="48" height="48" fill="' + bg + '"/>';
          s += '<path d="M4.6 48c1.3-7.6 9.6-11.9 19.4-11.9S42.1 40.4 43.4 48z" fill="' + shirt + '"/>';
  
          if (style === 2) {
            s += '<circle cx="24" cy="9.8" r="3.4" fill="' + hair + '"/>';
          }
          if (style === 3) {
            s += '<circle cx="16.4" cy="17.4" r="4.2" fill="' + hair + '"/>' +
                 '<circle cx="24" cy="13.4" r="4.8" fill="' + hair + '"/>' +
                 '<circle cx="31.6" cy="17.4" r="4.2" fill="' + hair + '"/>';
          }
  
          s += '<ellipse cx="24" cy="23" rx="9.6" ry="10.2" fill="' + skin + '"/>';
  
          if (style === 4) {
            s += '<path d="M13.4 17.2l3.2-6.4 2.2 4.4 3-7.2 3.1 7.2 2.4-4.4 3.2 6.4z" fill="' + hair + '"/>';
          }
  
          s += '<path d="M12.8 22.6a11.2 11.2 0 0 1 22.4 0z" fill="' + hair + '"/>';
  
          if (style === 6) {
            s += '<path d="M14.6 20.4c1.8-5.4 6.2-7.6 9.4-7.4-4.6 2.2-6.6 5.6-7 9.4z" fill="' + hair + '"/>';
          }
  
          if (style === 1) {
            s += '<path d="M11.2 21.5h5.2v11.5c0 1.5-1.2 2.6-2.6 2.6s-2.6-1.1-2.6-2.6z" fill="' + hair + '"/>' +
                 '<path d="M31.6 21.5h5.2v11.5c0 1.5-1.2 2.6-2.6 2.6s-2.6-1.1-2.6-2.6z" fill="' + hair + '"/>';
          }
          if (style === 5) {
            s += '<path d="M11.8 21h4.4v6.9c0 1.4-1 2.5-2.2 2.5s-2.2-1.1-2.2-2.5z" fill="' + hair + '"/>' +
                 '<path d="M31.8 21h4.4v6.9c0 1.4-1 2.5-2.2 2.5s-2.2-1.1-2.2-2.5z" fill="' + hair + '"/>';
          }
  
          var ex = 3.8, ey = 24.4;
          if (happy) {
            s += '<path d="M' + (24 - ex - 1.6) + ' ' + ey + 'q1.6-1.7 3.2 0" stroke="' + ink + '" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
            s += '<path d="M' + (24 + ex - 1.6) + ' ' + ey + 'q1.6-1.7 3.2 0" stroke="' + ink + '" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
          } else {
            s += '<circle cx="' + (24 - ex) + '" cy="' + ey + '" r="1.35" fill="' + ink + '"/>';
            s += '<circle cx="' + (24 + ex) + '" cy="' + ey + '" r="1.35" fill="' + ink + '"/>';
          }
  
          s += '<path d="M20.8 28.3q3.2 2.9 6.4 0" stroke="#8a4b3a" stroke-width="1.7" fill="none" stroke-linecap="round"/>';
  
          if (blush) {
            s += '<circle cx="17.4" cy="27.2" r="1.9" fill="#e88a8a" opacity=".45"/>' +
                 '<circle cx="30.6" cy="27.2" r="1.9" fill="#e88a8a" opacity=".45"/>';
          }
  
          if (glasses) {
            s += '<g stroke="' + ink + '" stroke-width="1.35" fill="none">' +
                 '<rect x="16.4" y="21.9" width="7.2" height="5.4" rx="1.8"/>' +
                 '<rect x="24.4" y="21.9" width="7.2" height="5.4" rx="1.8"/>' +
                 '<path d="M23.6 24.2h.8"/></g>';
          }
  
          return s + '</svg>';
        }

  global.avatarSvg = avatarSvg;
})(window);
