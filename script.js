const STORAGE_KEY = 'graphiquesgpt_v9_1_5_glitter_sans_ombre_types';
const THEMES = ['midnight','clean','neon','ocean','forest','sunset','astral','crystal','lifestream','phoenix','voidstar','twitch','streamdeck','resonance','royal','arcade','glitter1soft','glitter2soft'];
const CHART_TYPES = ['bar','glitterBar','glitterBarNoShadow','glitterBar2','glitterBar2NoShadow','horizontalBar','line','area','pie','donut','radar'];
const FORMATS = {
  wide:{w:1600,h:900,label:'16:9'},
  square:{w:1200,h:1200,label:'Carré'},
  story:{w:1080,h:1350,label:'Vertical'}
};
const TYPE_LABELS = {
  bar:'Barres verticales',
  glitterBar:'Barres arrondies glitter 1',
  glitterBarNoShadow:'Barres arrondies glitter 1 sans ombre',
  glitterBar2:'Barres arrondies glitter 2',
  glitterBar2NoShadow:'Barres arrondies glitter 2 sans ombre',
  horizontalBar:'Barres horizontales',
  line:'Courbe',
  area:'Aire',
  pie:'Camembert',
  donut:'Donut',
  radar:'Radar'
};
const AUTO_COLORS = ['#38bdf8','#a78bfa','#f472b6','#fbbf24','#34d399','#fb7185','#60a5fa','#c084fc','#f97316','#22d3ee'];
const THEME_PALETTES = {
  midnight:['#38bdf8','#a78bfa','#f472b6','#fbbf24','#34d399','#60a5fa','#c084fc','#22d3ee'],
  clean:['#2563eb','#7c3aed','#db2777','#ea580c','#059669','#0891b2','#4f46e5','#be123c'],
  neon:['#d946ef','#22d3ee','#a3e635','#f97316','#f472b6','#8b5cf6','#06b6d4','#facc15'],
  ocean:['#0ea5e9','#22d3ee','#38bdf8','#14b8a6','#818cf8','#67e8f9','#2563eb','#2dd4bf'],
  forest:['#10b981','#a3e635','#84cc16','#22c55e','#facc15','#2dd4bf','#65a30d','#4ade80'],
  sunset:['#fb7185','#fbbf24','#f97316','#f43f5e','#fdba74','#e879f9','#ef4444','#fde047'],
  astral:['#7dd3fc','#c084fc','#f0abfc','#facc15','#38bdf8','#818cf8','#e879f9','#a5b4fc'],
  crystal:['#67e8f9','#a5f3fc','#93c5fd','#c4b5fd','#f0abfc','#bae6fd','#60a5fa','#e9d5ff'],
  lifestream:['#22d3ee','#38bdf8','#10b981','#a3e635','#67e8f9','#34d399','#0ea5e9','#bbf7d0'],
  phoenix:['#fb7185','#f97316','#facc15','#ef4444','#fdba74','#e879f9','#f43f5e','#fbbf24'],
  voidstar:['#8b5cf6','#22d3ee','#e879f9','#64748b','#a78bfa','#38bdf8','#f472b6','#94a3b8'],
  twitch:['#9146ff','#b78cff','#00f5d4','#ff75d8','#772ce8','#a970ff','#f0abfc','#22d3ee'],
  streamdeck:['#00f5d4','#9146ff','#ff4ecd','#38bdf8','#facc15','#22c55e','#f97316','#a78bfa'],
  resonance:['#00e5ff','#7c3aed','#4ade80','#f0abfc','#38bdf8','#c084fc','#22d3ee','#a3e635'],
  royal:['#facc15','#a78bfa','#60a5fa','#f472b6','#fbbf24','#818cf8','#fde047','#c084fc'],
  arcade:['#ff2bd6','#00f5ff','#faff00','#39ff14','#ff7a00','#9146ff','#00d4ff','#ff4ecd'],
  glitter1soft:['#dff3fb','#eadcf6','#f7d8e6','#dff6ef','#fff0c9','#e3ecff','#f6e0ff','#d4f5ff'],
  glitter2soft:['#f6dce8','#eee0fb','#dff2ff','#fae8d0','#f8dff4','#e2f6f0','#ffe7ef','#dbe8ff']
};

const $ = (id) => document.getElementById(id);
const els = {
  title:$('titleInput'), subtitle:$('subtitleInput'), source:$('sourceInput'),
  rows:$('rowsEditor'), addRow:$('addRowBtn'),
  chartType:$('chartTypeInput'), theme:$('themeInput'), format:$('formatInput'), palette:$('paletteInput'),
  showValues:$('showValuesInput'), showLegend:$('showLegendInput'), showGrid:$('showGridInput'), transparent:$('transparentInput'),
  sort:$('sortInput'), decimals:$('decimalsInput'), weight:$('weightInput'),
  compareMode:$('compareModeInput'), compareMethod:$('compareMethodInput'),
  previewFrame:$('previewFrame'), canvas:$('chartCanvas'), svg:$('chartSvg'),
  saveStatus:$('saveStatus'), chartStatus:$('chartStatus'), dataStatus:$('dataStatus'),
  exportPng:$('exportPngBtn'), copySvg:$('copySvgBtn'), downloadSvg:$('downloadSvgBtn'),
  save:$('saveBtn'), undo:$('undoBtn'), redo:$('redoBtn'), reset:$('resetBtn'),
  resetModal:$('resetModal'), resetCancel:$('resetCancelBtn'), resetKeep:$('resetKeepBtn'), resetConfirm:$('resetConfirmBtn'),
  toast:$('toastContainer')
};

const DEFAULT_STATE = {
  title:'Titre du graphique',
  subtitle:'Sous-titre',
  source:'petite description',
  chartType:'bar',
  theme:'midnight',
  format:'wide',
  palette:'auto',
  showValues:false,
  showLegend:false,
  showGrid:false,
  transparent:false,
  sort:'none',
  compareMode:false,
  compareMethod:'ratio',
  decimals:0,
  weight:1,
  rows:[
    {label:'A', value:100, color:'#facc15'},
    {label:'B', value:89, color:'#facc15'},
    {label:'C', value:83, color:'#facc15'},
  ]
};
let state = clone(DEFAULT_STATE);
let saveTimer = null;
let historyTimer = null;
let undoStack = [];
let redoStack = [];
let restoring = false;
const MAX_HISTORY = 60;

function clone(value){ return JSON.parse(JSON.stringify(value)); }
function esc(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
function attr(value){ return esc(value); }
function oneOf(value, list, fallback){ return list.includes(value) ? value : fallback; }
function clamp(value, min, max, fallback){
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}
function normalizeColor(value, fallback=''){
  const raw = String(value || '').trim();
  if (/^#[0-9a-fA-F]{6}$/.test(raw)) return raw.toLowerCase();
  return fallback;
}

function hexToRgb(value){
  const hex = normalizeColor(value, '#000000').slice(1);
  return {
    r:parseInt(hex.slice(0,2), 16),
    g:parseInt(hex.slice(2,4), 16),
    b:parseInt(hex.slice(4,6), 16)
  };
}
function rgbToHex(r, g, b){
  const channel = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}
function mixColors(colorA, colorB, amount){
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const t = Math.max(0, Math.min(1, Number(amount)));
  return rgbToHex(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t
  );
}
function brightenColor(color, amount=0.5){ return mixColors(color, '#ffffff', amount); }
function deepenColor(color, amount=0.18){ return mixColors(color, '#000000', amount); }
function normalizeRow(row){
  const input = row && typeof row === 'object' ? row : {};
  return {
    label:String(input.label ?? '').trim(),
    value:clamp(String(input.value ?? '').replace(',', '.'), -999999999, 999999999, 0),
    color:normalizeColor(input.color, '')
  };
}
function normalizeState(raw){
  const input = raw && typeof raw === 'object' ? raw : {};
  const base = clone(DEFAULT_STATE);
  base.title = String(input.title ?? base.title);
  base.subtitle = String(input.subtitle ?? base.subtitle);
  base.source = String(input.source ?? base.source);
  base.chartType = oneOf(input.chartType, CHART_TYPES, base.chartType);
  base.theme = oneOf(input.theme, THEMES, base.theme);
  base.format = oneOf(input.format, Object.keys(FORMATS), base.format);
  base.palette = oneOf(input.palette, ['auto','custom','mono'], base.palette);
  base.showValues = !!input.showValues;
  base.showLegend = !!input.showLegend;
  base.showGrid = input.showGrid !== false;
  base.transparent = !!input.transparent;
  base.sort = oneOf(input.sort, ['none','asc','desc'], base.sort);
  base.compareMode = !!input.compareMode;
  base.compareMethod = oneOf(input.compareMethod, ['ratio','difference','evolution'], base.compareMethod);
  base.decimals = clamp(input.decimals, 0, 2, 0);
  base.weight = clamp(input.weight, 0.7, 1.5, 1);
  if (Array.isArray(input.rows) && input.rows.length) base.rows = input.rows.map(normalizeRow).slice(0, 30);
  return base;
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = normalizeState(JSON.parse(raw));
  }catch{
    state = clone(DEFAULT_STATE);
    toast('Sauvegarde locale illisible : base par défaut chargée.');
  }
}
function save(silent=true){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    els.saveStatus.textContent = 'Sauvegardé';
    if (!silent) toast('Sauvegarde locale effectuée.');
  }catch{
    els.saveStatus.textContent = 'Non sauvegardé';
    toast('Sauvegarde locale impossible.');
  }
}
function scheduleSave(){
  els.saveStatus.textContent = 'Sauvegarde...';
  queueHistory();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => save(true), 180);
}
function toast(message){
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  els.toast.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function snapshot(){ return JSON.stringify(state); }
function initHistory(){ undoStack = [snapshot()]; redoStack = []; updateHistoryButtons(); }
function updateHistoryButtons(){
  els.undo.disabled = undoStack.length <= 1;
  els.redo.disabled = redoStack.length === 0;
}
function pushHistory(){
  if (restoring) return;
  const snap = snapshot();
  if (undoStack[undoStack.length - 1] !== snap) {
    undoStack.push(snap);
    if (undoStack.length > MAX_HISTORY) undoStack.shift();
    redoStack = [];
  }
  updateHistoryButtons();
}
function queueHistory(){
  if (restoring) return;
  clearTimeout(historyTimer);
  historyTimer = setTimeout(pushHistory, 180);
}
function flushHistory(){ clearTimeout(historyTimer); pushHistory(); }
function restoreSnapshot(snap){
  try{
    restoring = true;
    state = normalizeState(JSON.parse(snap));
    renderAll();
    save(true);
  }catch{
    toast('Historique illisible : action annulée.');
  }finally{
    restoring = false;
    updateHistoryButtons();
  }
}
function undo(){
  flushHistory();
  if (undoStack.length <= 1) return;
  redoStack.push(undoStack.pop());
  restoreSnapshot(undoStack[undoStack.length - 1]);
}
function redo(){
  if (!redoStack.length) return;
  const snap = redoStack.pop();
  undoStack.push(snap);
  restoreSnapshot(snap);
}

function comparisonLabel(a, b){
  const left = String(a?.label ?? '').trim();
  const right = String(b?.label ?? '').trim();
  return [left, right].filter(Boolean).join(' / ');
}
function comparisonValue(a, b){
  const av = Number(a?.value ?? 0);
  const bv = Number(b?.value ?? 0);
  if (state.compareMethod === 'difference') return av - bv;
  if (bv === 0) return null;
  if (state.compareMethod === 'evolution') return ((av - bv) / Math.abs(bv)) * 100;
  return (av / bv) * 100;
}
function buildComparisonRows(rows){
  const pairs = [];
  for (let index = 0; index < rows.length - 1; index += 2) {
    const a = rows[index];
    const b = rows[index + 1];
    const value = comparisonValue(a, b);
    if (!Number.isFinite(value)) continue;
    pairs.push({
      label:comparisonLabel(a, b),
      value,
      color:normalizeColor(a.color, normalizeColor(b.color, ''))
    });
  }
  return pairs;
}
function getRows(){
  let rows = state.rows.map(normalizeRow).filter(row => Number.isFinite(row.value));
  if (state.compareMode) rows = buildComparisonRows(rows);
  if (state.sort === 'asc') rows = rows.slice().sort((a,b) => a.value - b.value);
  if (state.sort === 'desc') rows = rows.slice().sort((a,b) => b.value - a.value);
  return rows;
}
function formatValue(value){
  return Number(value).toLocaleString('fr-FR', {
    minimumFractionDigits:Number(state.decimals),
    maximumFractionDigits:Number(state.decimals)
  });
}
function getThemeColors(){
  const styles = getComputedStyle(els.canvas);
  const get = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    text:get('--canvasText','#ffffff'),
    muted:get('--canvasMuted','#b6c2d6'),
    panel:get('--panelCard','#17233a'),
    axis:get('--axis','#7dd3fc'),
    grid:get('--grid','rgba(255,255,255,.14)'),
    accent:get('--accent','#38bdf8'),
    accent2:get('--accent2','#a78bfa')
  };
}
function getAutoThemeColor(index, colors){
  const palette = THEME_PALETTES[state.theme] || AUTO_COLORS;
  return palette[index % palette.length] || colors.accent;
}
function getRowColor(row, index, colors){
  if (state.palette === 'custom' && normalizeColor(row.color)) return normalizeColor(row.color);
  if (state.palette === 'mono') return index % 2 === 0 ? colors.accent : colors.accent2;
  return getAutoThemeColor(index, colors);
}
function chartSize(){ return FORMATS[state.format] || FORMATS.wide; }
function polar(cx, cy, r, angle){ return {x:cx + Math.cos(angle) * r, y:cy + Math.sin(angle) * r}; }
function arcPath(cx, cy, r, start, end){
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y} Z`;
}
function donutPath(cx, cy, r, inner, start, end){
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const c = polar(cx, cy, inner, end);
  const d = polar(cx, cy, inner, start);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${inner} ${inner} 0 ${large} 0 ${d.x} ${d.y} Z`;
}
function line(points, attrs=''){
  return `<polyline points="${points.map(p => `${p.x},${p.y}`).join(' ')}" ${attrs}/>`;
}
function polygon(points, attrs=''){
  return `<polygon points="${points.map(p => `${p.x},${p.y}`).join(' ')}" ${attrs}/>`;
}
function text(x, y, content, attrs=''){
  return `<text x="${x}" y="${y}" ${attrs}>${esc(content)}</text>`;
}
function backgroundMarkup(size, transparent){
  if (transparent) return '';
  const id = `bg-${state.theme}`;
  const bg = {
    midnight:['#121a2b','#081123'], clean:['#f5f7fb','#f5f7fb'], neon:['#170026','#2b0b63'],
    ocean:['#082f49','#0f172a'], forest:['#052e2b','#063b2e'], sunset:['#3b0764','#ea580c'],
    astral:['#070b2c','#211052'], crystal:['#ecfeff','#dbeafe'], lifestream:['#042f3f','#062e2f'],
    phoenix:['#2b0711','#7c2d12'], voidstar:['#050816','#1e1b4b'], twitch:['#12091f','#2d0b59'],
    streamdeck:['#020617','#111827'], resonance:['#001b2e','#1e1b4b'], royal:['#120b2f','#3b0764'],
    arcade:['#070019','#18002e']
  }[state.theme] || ['#121a2b','#081123'];
  if (bg[0] === bg[1]) return `<rect width="${size.w}" height="${size.h}" rx="0" fill="${bg[0]}"/>`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs><rect width="${size.w}" height="${size.h}" rx="0" fill="url(#${id})"/>`;
}
function headerMarkup(size, colors){
  const left = Math.round(size.w * 0.07);
  const titleY = Math.round(size.h * 0.12);
  const subY = titleY + Math.round(size.h * 0.045);
  const fontTitle = Math.max(38, Math.round(size.w * 0.042));
  const fontSub = Math.max(18, Math.round(size.w * 0.016));
  const sourceY = size.h - Math.round(size.h * 0.045);
  return [
    state.title ? text(left, titleY, state.title, `fill="${colors.text}" font-size="${fontTitle}" font-weight="900" font-family="Impact, Arial Black, Arial, sans-serif"`) : '',
    state.subtitle ? text(left, subY, state.subtitle, `fill="${colors.muted}" font-size="${fontSub}" font-weight="800" font-family="system-ui, Arial, sans-serif"`) : '',
    state.source ? text(left, sourceY, state.source, `fill="${colors.muted}" font-size="${Math.max(14, Math.round(size.w * 0.012))}" font-weight="750" font-family="system-ui, Arial, sans-serif"`) : ''
  ].join('');
}
function legendMarkup(rows, size, colors, palette){
  if (!state.showLegend && !['pie','donut'].includes(state.chartType)) return '';
  const x = size.w - Math.round(size.w * 0.24);
  let y = Math.round(size.h * 0.23);
  const itemH = Math.max(24, Math.round(size.h * 0.035));
  const font = Math.max(14, Math.round(size.w * 0.012));
  return `<g aria-label="Légende">${rows.slice(0, 12).map((row, index) => {
    const yy = y + index * itemH;
    const label = row.label.length > 22 ? row.label.slice(0, 21) + '…' : row.label;
    return `<rect x="${x}" y="${yy - font + 2}" width="${font}" height="${font}" rx="4" fill="${palette[index]}"/><text x="${x + font + 10}" y="${yy}" fill="${colors.text}" font-size="${font}" font-weight="750" font-family="system-ui, Arial, sans-serif">${esc(label)} · ${formatValue(row.value)}</text>`;
  }).join('')}</g>`;
}
function scaleInfo(values){
  const minRaw = Math.min(...values, 0);
  const maxRaw = Math.max(...values, 0);
  const span = maxRaw - minRaw || 1;
  const pad = span * 0.08;
  const min = Math.min(0, minRaw - pad);
  const max = Math.max(0, maxRaw + pad);
  return {min, max, span:max - min || 1};
}
function axisAndGrid(x, y, w, h, scale, colors){
  const ticks = 5;
  let out = '';
  if (state.showGrid) {
    for (let i = 0; i <= ticks; i++) {
      const yy = y + h - (i / ticks) * h;
      const value = scale.min + (i / ticks) * scale.span;
      out += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="${colors.grid}" stroke-width="1"/>`;
      out += text(x - 12, yy + 5, formatValue(value), `fill="${colors.muted}" font-size="14" font-weight="700" text-anchor="end" font-family="system-ui, Arial, sans-serif"`);
    }
  }
  const baseY = y + h - ((0 - scale.min) / scale.span) * h;
  out += `<line x1="${x}" y1="${baseY}" x2="${x + w}" y2="${baseY}" stroke="${colors.axis}" stroke-width="2" opacity=".85"/>`;
  out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${colors.axis}" stroke-width="2" opacity=".60"/>`;
  return out;
}
function glitterDefs(){
  return `<defs>
    <filter id="glitter-bar-shadow" x="-22%" y="-10%" width="150%" height="128%" color-interpolation-filters="sRGB">
      <feDropShadow dx="16" dy="16" stdDeviation="3.5" flood-color="#020407" flood-opacity=".72"/>
    </filter>
    <linearGradient id="glitter-side-shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".18"/>
      <stop offset="0.34" stop-color="#ffffff" stop-opacity=".06"/>
      <stop offset="0.72" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".10"/>
    </linearGradient>
    <radialGradient id="glitter-stage-glow" cx="50%" cy="18%" r="88%">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".07"/>
      <stop offset="0.55" stop-color="#ffffff" stop-opacity=".02"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".12"/>
    </radialGradient>
  </defs>`;
}
function roundedReferenceBarPath(x, y, w, h, variant='glitterBar'){
  if (variant === 'glitterBar2') {
    // Glitter 2 : forme inversée demandée.
    // - grand arrondi en haut à gauche ;
    // - grand arrondi en bas à droite ;
    // - les deux autres coins restent presque droits.
    const topLeft = Math.min(h * 0.21, w * 1.08);
    const topRight = Math.min(h * 0.04, w * 0.12, 12);
    const bottomRight = Math.min(h * 0.21, w * 1.08);
    const bottomLeft = Math.min(h * 0.04, w * 0.12, 12);
    return `M ${x + topLeft} ${y}
      L ${x + w - topRight} ${y}
      Q ${x + w} ${y} ${x + w} ${y + topRight}
      L ${x + w} ${y + h - bottomRight}
      Q ${x + w} ${y + h} ${x + w - bottomRight} ${y + h}
      L ${x + bottomLeft} ${y + h}
      Q ${x} ${y + h} ${x} ${y + h - bottomLeft}
      L ${x} ${y + topLeft}
      Q ${x} ${y} ${x + topLeft} ${y}
      Z`;
  }

  // Glitter 1 : forme historique, grand arrondi haut gauche + bas gauche.
  const leftTop = Math.min(h * 0.19, w * 0.98);
  const leftBottom = Math.min(h * 0.19, w * 0.98);
  const rightRadius = Math.min(h * 0.04, w * 0.15, 12);
  return `M ${x + leftTop} ${y}
    L ${x + w - rightRadius} ${y}
    Q ${x + w} ${y} ${x + w} ${y + rightRadius}
    L ${x + w} ${y + h - rightRadius}
    Q ${x + w} ${y + h} ${x + w - rightRadius} ${y + h}
    L ${x + leftBottom} ${y + h}
    Q ${x} ${y + h} ${x} ${y + h - leftBottom}
    L ${x} ${y + leftTop}
    Q ${x} ${y} ${x + leftTop} ${y}
    Z`;
}
function glitterInfoMarkup(size, colors){
  const title = String(state.title || '').trim();
  const subtitle = String(state.subtitle || '').trim();
  const source = String(state.source || '').trim();
  if (!title && !subtitle && !source) return '';

  const left = Math.round(size.w * 0.035);
  const titleY = Math.round(size.h * 0.075);
  const subY = titleY + Math.round(size.h * 0.045);
  const sourceY = subY + Math.round(size.h * 0.038);
  const titleSize = Math.max(28, Math.round(size.w * 0.028));
  const subSize = Math.max(16, Math.round(size.w * 0.014));
  const sourceSize = Math.max(13, Math.round(size.w * 0.011));

  return `<g class="glitterInfo">
    ${title ? text(left, titleY, title, `fill="${colors.text}" font-size="${titleSize}" font-weight="950" font-family="Arial Black, Impact, system-ui, Arial, sans-serif"`) : ''}
    ${subtitle ? text(left, subY, subtitle, `fill="${colors.muted}" font-size="${subSize}" font-weight="850" font-family="system-ui, Arial, sans-serif"`) : ''}
    ${source ? text(left, sourceY, source, `fill="${colors.muted}" font-size="${sourceSize}" font-weight="750" font-family="system-ui, Arial, sans-serif"`) : ''}
  </g>`;
}
function deterministicSparkles(index, x, y, w, h, tone='default'){
  let out = '';
  const count = Math.max(34, Math.round(h / 22));
  for (let i = 0; i < count; i++) {
    const a = (i * 37 + index * 19) % 100;
    const b = (i * 61 + index * 23) % 100;
    const cx = x + (a / 100) * w;
    const cy = y + (b / 100) * h;
    const r = Math.max(0.9, Math.min(2.7, w * (0.008 + ((i + index) % 5) * 0.002)));
    const opacity = 0.28 + (((i * 17 + index * 7) % 44) / 100);
    const color = tone === 'pink' && i % 3 === 0 ? '#ffd6fb' : (i % 4 === 0 ? '#fffbe0' : '#ffffff');
    out += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  }
  out += `<circle cx="${(x + w * 0.26).toFixed(2)}" cy="${(y + h * 0.86).toFixed(2)}" r="${(w * 0.62).toFixed(2)}" fill="#ffffff" opacity=".22"/>`;
  out += `<circle cx="${(x + w * 0.78).toFixed(2)}" cy="${(y + h * 0.18).toFixed(2)}" r="${(w * 0.32).toFixed(2)}" fill="#ffffff" opacity=".07"/>`;
  return out;
}
function glitterBarGradientDef(id, color){
  const top = deepenColor(color, 0.08);
  const middle = color;
  const bottom = brightenColor(color, 0.84);
  const glow = brightenColor(color, 0.52);
  return `<defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/>
      <stop offset="0.38" stop-color="${middle}"/>
      <stop offset="0.78" stop-color="${brightenColor(color, 0.62)}"/>
      <stop offset="1" stop-color="${bottom}"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx="28%" cy="92%" r="78%">
      <stop offset="0" stop-color="${glow}" stop-opacity=".68"/>
      <stop offset="0.55" stop-color="${glow}" stop-opacity=".16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}
function renderGlitterBar(rows, size, colors, palette, variant='glitterBar', forceNoShadow=false){
  const cleanRows = rows.filter(row => Number.isFinite(row.value)).slice(0, 14);
  if (!cleanRows.length) return '';

  const values = cleanRows.map(row => Math.max(0, Number(row.value)));
  const max = Math.max(...values, 1);
  const count = cleanRows.length;
  const wide = size.w >= size.h;
  const hasInfo = !!String(`${state.title}${state.subtitle}${state.source}`).trim();
  const left = Math.round(size.w * (wide ? 0.03 : 0.07));
  const right = Math.round(size.w * (wide ? 0.03 : 0.07));
  const top = Math.round(size.h * (wide ? (hasInfo ? 0.22 : 0.09) : (hasInfo ? 0.20 : 0.11)));
  const bottom = Math.round(size.h * (wide ? 0.16 : 0.15));
  const chartW = size.w - left - right;
  const chartH = size.h - top - bottom;
  const step = chartW / count;
  const weight = clamp(state.weight, 0.7, 1.5, 1);
  const widthFactor = variant === 'glitterBar2' ? 0.62 : 0.58;
  const barW = Math.max(28, Math.min(step * widthFactor * weight, step - 18));
  const valueFont = Math.max(30, Math.round(size.w * (wide ? 0.024 : 0.04)));
  const labelFont = Math.max(15, Math.round(size.w * 0.013));
  const baseY = size.h - bottom;
  let out = glitterDefs();
  out += `<rect width="${size.w}" height="${size.h}" fill="url(#glitter-stage-glow)"/>`;

  cleanRows.forEach((row, index) => {
    const cx = left + step * index + step / 2;
    const value = Math.max(0, Number(row.value));
    const barH = Math.max(12, (value / max) * chartH);
    const x = cx - barW / 2;
    const y = baseY - barH;
    const path = roundedReferenceBarPath(x, y, barW, barH, variant);
    const clipId = `glitter-clip-${variant}-${index}`;
    const gradId = `glitter-fill-${variant}-${index}`;
    const color = palette[index] || colors.accent;
    const shadowDx = Math.max(12, barW * 0.14);
    const shadowDy = Math.max(12, barW * 0.15);
    const labelGap = Math.max(14, Math.min(18, size.h * 0.018));
    const labelY = baseY + labelFont + labelGap;
    const shadowLimitY = labelY - Math.max(10, labelFont * 0.9);
    const shadowTopY = y + shadowDy;
    const shadowBottomY = Math.min(y + shadowDy + barH, shadowLimitY);
    const shadowH = Math.max(12, shadowBottomY - shadowTopY);
    const shadowPath = roundedReferenceBarPath(x + shadowDx, shadowTopY, barW, shadowH, variant);
    const disableShadow = forceNoShadow || ['glitter1soft','glitter2soft'].includes(state.theme);
    const label = row.label.length > 12 ? row.label.slice(0, 11) + '…' : row.label;

    out += `${glitterBarGradientDef(gradId, color)}
    <g class="glitterBarItem">
      ${disableShadow ? '' : `<path d="${shadowPath}" fill="#020407" opacity=".78"/>`}
      <clipPath id="${clipId}"><path d="${path}"/></clipPath>
      <g clip-path="url(#${clipId})">
        <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="url(#${gradId})"/>
        ${deterministicSparkles(index, x, y, barW, barH, color.toLowerCase().includes('e8') || color.toLowerCase().includes('f4') ? 'pink' : 'default')}
        <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="url(#${gradId}-glow)" opacity=".62"/>
        <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="url(#glitter-side-shine)" opacity=".95"/>
      </g>
    </g>`;

    if (state.showValues) {
      const valueY = Math.max(valueFont + 8, y - Math.max(18, valueFont * 0.42));
      out += text(cx, valueY, formatValue(row.value), `fill="${colors.text}" font-size="${valueFont}" font-weight="950" text-anchor="middle" font-family="Arial Black, Impact, system-ui, Arial, sans-serif"`);
    }
    out += text(cx, labelY, label, `fill="${colors.muted}" font-size="${labelFont}" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });

  return `${glitterInfoMarkup(size, colors)}${out}`;
}

function renderBar(rows, size, colors, palette){
  const x = Math.round(size.w * 0.11);
  const y = Math.round(size.h * 0.24);
  const w = Math.round(size.w * (state.showLegend ? 0.58 : 0.80));
  const h = Math.round(size.h * 0.55);
  const values = rows.map(r => r.value);
  const scale = scaleInfo(values);
  const gap = Math.max(10, w * 0.018);
  const barW = Math.max(14, (w - gap * (rows.length - 1)) / Math.max(1, rows.length) * state.weight);
  const step = w / Math.max(1, rows.length);
  const baseY = y + h - ((0 - scale.min) / scale.span) * h;
  let out = axisAndGrid(x, y, w, h, scale, colors);
  rows.forEach((row, index) => {
    const cx = x + step * index + step / 2;
    const targetY = y + h - ((row.value - scale.min) / scale.span) * h;
    const top = Math.min(baseY, targetY);
    const bh = Math.abs(baseY - targetY);
    out += `<rect x="${cx - barW / 2}" y="${top}" width="${barW}" height="${bh}" rx="${Math.min(14, barW / 2)}" fill="${palette[index]}"/>`;
    if (state.showValues) out += text(cx, top - 10, formatValue(row.value), `fill="${colors.text}" font-size="16" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    const label = row.label.length > 12 ? row.label.slice(0, 11) + '…' : row.label;
    out += text(cx, y + h + 34, label, `fill="${colors.muted}" font-size="15" font-weight="750" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderHorizontalBar(rows, size, colors, palette){
  const x = Math.round(size.w * 0.20);
  const y = Math.round(size.h * 0.23);
  const w = Math.round(size.w * (state.showLegend ? 0.52 : 0.68));
  const h = Math.round(size.h * 0.58);
  const max = Math.max(...rows.map(r => Math.abs(r.value)), 1);
  const rowH = h / Math.max(1, rows.length);
  const barH = Math.max(14, rowH * 0.55 * state.weight);
  let out = '';
  if (state.showGrid) {
    for (let i = 0; i <= 5; i++) {
      const xx = x + (i / 5) * w;
      out += `<line x1="${xx}" y1="${y}" x2="${xx}" y2="${y + h}" stroke="${colors.grid}" stroke-width="1"/>`;
    }
  }
  out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${colors.axis}" stroke-width="2" opacity=".70"/>`;
  rows.forEach((row, index) => {
    const yy = y + index * rowH + rowH / 2;
    const bw = Math.abs(row.value) / max * w;
    const label = row.label.length > 18 ? row.label.slice(0, 17) + '…' : row.label;
    out += text(x - 16, yy + 5, label, `fill="${colors.muted}" font-size="16" font-weight="800" text-anchor="end" font-family="system-ui, Arial, sans-serif"`);
    out += `<rect x="${x}" y="${yy - barH / 2}" width="${bw}" height="${barH}" rx="${barH / 2}" fill="${palette[index]}"/>`;
    if (state.showValues) out += text(x + bw + 12, yy + 5, formatValue(row.value), `fill="${colors.text}" font-size="16" font-weight="900" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderLineOrArea(rows, size, colors, palette, area=false){
  const x = Math.round(size.w * 0.11);
  const y = Math.round(size.h * 0.24);
  const w = Math.round(size.w * (state.showLegend ? 0.58 : 0.80));
  const h = Math.round(size.h * 0.55);
  const values = rows.map(r => r.value);
  const scale = scaleInfo(values);
  const points = rows.map((row, index) => ({
    x:x + (rows.length === 1 ? w / 2 : index / (rows.length - 1) * w),
    y:y + h - ((row.value - scale.min) / scale.span) * h,
    row
  }));
  let out = axisAndGrid(x, y, w, h, scale, colors);
  if (area && points.length) {
    const baseY = y + h - ((0 - scale.min) / scale.span) * h;
    const areaPoints = [{x:points[0].x,y:baseY}, ...points, {x:points[points.length - 1].x,y:baseY}];
    out += polygon(areaPoints, `fill="${colors.accent}" opacity=".24"`);
  }
  out += line(points, `fill="none" stroke="${colors.accent}" stroke-width="${Math.max(4, 6 * state.weight)}" stroke-linecap="round" stroke-linejoin="round"`);
  points.forEach((point, index) => {
    out += `<circle cx="${point.x}" cy="${point.y}" r="${Math.max(6, 8 * state.weight)}" fill="${palette[index]}" stroke="${colors.text}" stroke-width="2"/>`;
    if (state.showValues) out += text(point.x, point.y - 16, formatValue(point.row.value), `fill="${colors.text}" font-size="15" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    const label = point.row.label.length > 12 ? point.row.label.slice(0, 11) + '…' : point.row.label;
    out += text(point.x, y + h + 34, label, `fill="${colors.muted}" font-size="14" font-weight="750" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderPieOrDonut(rows, size, colors, palette, donut=false){
  const total = rows.reduce((sum, row) => sum + Math.max(0, Math.abs(row.value)), 0) || 1;
  const cx = Math.round(size.w * (state.showLegend ? 0.39 : 0.50));
  const cy = Math.round(size.h * 0.53);
  const r = Math.round(Math.min(size.w, size.h) * 0.24 * state.weight);
  const inner = donut ? r * 0.56 : 0;
  let start = -Math.PI / 2;
  let out = '';
  rows.forEach((row, index) => {
    const value = Math.max(0, Math.abs(row.value));
    const end = start + (value / total) * Math.PI * 2;
    const path = donut ? donutPath(cx, cy, r, inner, start, end) : arcPath(cx, cy, r, start, end);
    out += `<path d="${path}" fill="${palette[index]}" stroke="${state.transparent ? 'rgba(0,0,0,.25)' : colors.panel}" stroke-width="4"/>`;
    if (state.showValues && value > 0) {
      const mid = (start + end) / 2;
      const labelPos = polar(cx, cy, donut ? (r + inner) / 2 : r * 0.66, mid);
      const pct = Math.round((value / total) * 100);
      out += text(labelPos.x, labelPos.y + 5, `${pct}%`, `fill="#ffffff" font-size="18" font-weight="950" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    }
    start = end;
  });
  if (donut) {
    out += text(cx, cy - 6, 'Total', `fill="${colors.muted}" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    out += text(cx, cy + 28, formatValue(total), `fill="${colors.text}" font-size="34" font-weight="950" text-anchor="middle" font-family="Impact, Arial Black, Arial, sans-serif"`);
  }
  return out;
}
function renderRadar(rows, size, colors, palette){
  const values = rows.map(row => Math.max(0, row.value));
  const max = Math.max(...values, 1);
  const cx = Math.round(size.w * (state.showLegend ? 0.39 : 0.50));
  const cy = Math.round(size.h * 0.54);
  const r = Math.round(Math.min(size.w, size.h) * 0.25 * state.weight);
  const count = rows.length;
  let out = '';
  for (let ring = 1; ring <= 5; ring++) {
    const rr = r * ring / 5;
    const pts = rows.map((row, index) => polar(cx, cy, rr, -Math.PI / 2 + index / count * Math.PI * 2));
    out += polygon(pts, `fill="none" stroke="${colors.grid}" stroke-width="1"`);
  }
  const dataPoints = rows.map((row, index) => polar(cx, cy, r * Math.max(0, row.value) / max, -Math.PI / 2 + index / count * Math.PI * 2));
  rows.forEach((row, index) => {
    const angle = -Math.PI / 2 + index / count * Math.PI * 2;
    const end = polar(cx, cy, r, angle);
    const label = polar(cx, cy, r + 36, angle);
    out += `<line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" stroke="${colors.grid}" stroke-width="1"/>`;
    out += text(label.x, label.y + 5, row.label.length > 12 ? row.label.slice(0, 11) + '…' : row.label, `fill="${colors.muted}" font-size="15" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  out += polygon(dataPoints, `fill="${colors.accent}" opacity=".25" stroke="${colors.accent}" stroke-width="${Math.max(4, 5 * state.weight)}"`);
  dataPoints.forEach((point, index) => {
    out += `<circle cx="${point.x}" cy="${point.y}" r="6" fill="${palette[index]}" stroke="${colors.text}" stroke-width="2"/>`;
  });
  return out;
}
function emptyMarkup(size, colors){
  return `<text x="${size.w / 2}" y="${size.h / 2}" fill="${colors.text}" font-size="34" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif">Ajoute au moins une donnée</text>`;
}
function buildSvgMarkup(){
  const size = chartSize();
  const rows = getRows();
  const colors = getThemeColors();
  const palette = rows.map((row, index) => getRowColor(row, index, colors));
  let body = '';
  if (!rows.length) body = emptyMarkup(size, colors);
  else if (state.chartType === 'bar') body = renderBar(rows, size, colors, palette);
  else if (state.chartType === 'glitterBar') body = renderGlitterBar(rows, size, colors, palette, 'glitterBar');
  else if (state.chartType === 'glitterBarNoShadow') body = renderGlitterBar(rows, size, colors, palette, 'glitterBar', true);
  else if (state.chartType === 'glitterBar2') body = renderGlitterBar(rows, size, colors, palette, 'glitterBar2');
  else if (state.chartType === 'glitterBar2NoShadow') body = renderGlitterBar(rows, size, colors, palette, 'glitterBar2', true);
  else if (state.chartType === 'horizontalBar') body = renderHorizontalBar(rows, size, colors, palette);
  else if (state.chartType === 'line') body = renderLineOrArea(rows, size, colors, palette, false);
  else if (state.chartType === 'area') body = renderLineOrArea(rows, size, colors, palette, true);
  else if (state.chartType === 'pie') body = renderPieOrDonut(rows, size, colors, palette, false);
  else if (state.chartType === 'donut') body = renderPieOrDonut(rows, size, colors, palette, true);
  else if (state.chartType === 'radar') body = renderRadar(rows, size, colors, palette);

  const chrome = ['glitterBar','glitterBarNoShadow','glitterBar2','glitterBar2NoShadow'].includes(state.chartType) ? '' : `${headerMarkup(size, colors)}${legendMarkup(rows, size, colors, palette)}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size.w}" height="${size.h}" viewBox="0 0 ${size.w} ${size.h}" role="img" aria-label="${attr(state.title || 'Graphique')}">
  ${backgroundMarkup(size, state.transparent)}
  ${chrome}
  <g>${body}</g>
</svg>`;
}
function renderSvg(){
  const size = chartSize();
  const markup = buildSvgMarkup().replace(/^<\?xml[^>]*>\s*/, '');
  els.svg.setAttribute('viewBox', `0 0 ${size.w} ${size.h}`);
  els.svg.innerHTML = markup.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}
function renderRowsEditor(){
  els.rows.innerHTML = state.rows.map((row, index) => `
    <div class="dataRow" data-row="${index}">
      <input data-field="label" type="text" value="${attr(row.label)}" aria-label="Libellé ligne ${index + 1}">
      <input data-field="value" type="number" step="0.01" value="${attr(row.value)}" aria-label="Valeur ligne ${index + 1}">
      <input data-field="color" type="color" value="${attr(normalizeColor(row.color, AUTO_COLORS[index % AUTO_COLORS.length]))}" aria-label="Couleur ligne ${index + 1}">
      <button class="rowRemove" type="button" data-remove-row="${index}" aria-label="Supprimer la ligne ${index + 1}">×</button>
    </div>`).join('');
}
function renderControls(){
  els.title.value = state.title;
  els.subtitle.value = state.subtitle;
  els.source.value = state.source;
  els.chartType.value = state.chartType;
  els.theme.value = state.theme;
  els.format.value = state.format;
  els.palette.value = state.palette;
  els.showValues.checked = state.showValues;
  els.showLegend.checked = state.showLegend;
  els.showGrid.checked = state.showGrid;
  els.transparent.checked = state.transparent;
  els.sort.value = state.sort;
  els.compareMode.checked = state.compareMode;
  els.compareMethod.value = state.compareMethod;
  els.decimals.value = String(state.decimals);
  els.weight.value = String(state.weight);
  els.chartStatus.textContent = TYPE_LABELS[state.chartType] || 'Graphique';
  const count = getRows().length;
  els.dataStatus.textContent = `${count} valeur${count > 1 ? 's' : ''}`;
  updateHistoryButtons();
}
function renderCanvasClasses(){
  els.canvas.className = [
    'chartCanvas',
    `theme-${state.theme}`,
    `format-${state.format}`,
    `chart-${state.chartType}`,
    state.transparent ? 'isTransparent' : ''
  ].filter(Boolean).join(' ');
  els.previewFrame.classList.toggle('isChecker', state.transparent);
}
function fitPreview(){
  const frame = els.previewFrame.getBoundingClientRect();
  const size = chartSize();
  const availableW = Math.max(260, frame.width - 28);
  const availableH = Math.max(260, frame.height - 28);
  let w = availableW;
  let h = w * size.h / size.w;
  if (h > availableH) {
    h = availableH;
    w = h * size.w / size.h;
  }
  els.canvas.style.width = `${Math.floor(w)}px`;
  els.canvas.style.height = `${Math.floor(h)}px`;
}
function renderAll(){
  renderCanvasClasses();
  renderControls();
  renderRowsEditor();
  requestAnimationFrame(() => {
    fitPreview();
    renderSvg();
  });
}
function updateFromControls(){
  state.title = els.title.value;
  state.subtitle = els.subtitle.value;
  state.source = els.source.value;
  state.chartType = oneOf(els.chartType.value, CHART_TYPES, 'bar');
  state.theme = oneOf(els.theme.value, THEMES, 'midnight');
  state.format = oneOf(els.format.value, Object.keys(FORMATS), 'wide');
  state.palette = oneOf(els.palette.value, ['auto','custom','mono'], 'auto');
  state.showValues = els.showValues.checked;
  state.showLegend = els.showLegend.checked;
  state.showGrid = els.showGrid.checked;
  state.transparent = els.transparent.checked;
  state.sort = oneOf(els.sort.value, ['none','asc','desc'], 'none');
  state.compareMode = els.compareMode.checked;
  state.compareMethod = oneOf(els.compareMethod.value, ['ratio','difference','evolution'], 'ratio');
  state.decimals = clamp(els.decimals.value, 0, 2, 0);
  state.weight = clamp(els.weight.value, 0.7, 1.5, 1);
  renderCanvasClasses();
  renderControls();
  requestAnimationFrame(() => { fitPreview(); renderSvg(); });
  scheduleSave();
}
function updateRowFromInput(input){
  const rowNode = input.closest('[data-row]');
  if (!rowNode) return;
  const index = Number(rowNode.dataset.row);
  if (!state.rows[index]) return;
  const field = input.dataset.field;
  if (field === 'label') state.rows[index].label = input.value;
  if (field === 'value') state.rows[index].value = clamp(input.value, -999999999, 999999999, 0);
  if (field === 'color') state.rows[index].color = normalizeColor(input.value, AUTO_COLORS[index % AUTO_COLORS.length]);
  renderControls();
  requestAnimationFrame(renderSvg);
  scheduleSave();
}
function addRow(){
  state.rows.push({label:`Donnée ${state.rows.length + 1}`, value:10, color:AUTO_COLORS[state.rows.length % AUTO_COLORS.length]});
  renderAll();
  scheduleSave();
}
function removeRow(index){
  if (state.rows.length <= 1) return toast('Garde au moins une ligne de données.');
  state.rows.splice(index, 1);
  renderAll();
  scheduleSave();
}
function openResetModal(){
  els.resetModal.classList.add('isVisible');
  els.resetModal.setAttribute('aria-hidden','false');
  els.resetConfirm.focus();
}
function closeResetModal(){
  els.resetModal.classList.remove('isVisible');
  els.resetModal.setAttribute('aria-hidden','true');
}
function confirmReset(){
  flushHistory();
  localStorage.removeItem(STORAGE_KEY);
  state = clone(DEFAULT_STATE);
  closeResetModal();
  renderAll();
  save(true);
  pushHistory();
  toast('Graphique réinitialisé.');
}
function getSvgForDownload(){ return buildSvgMarkup(); }
function downloadBlob(content, filename, type){
  const blob = content instanceof Blob ? content : new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 800);
}
function filename(ext){
  const base = (state.title || 'graphique').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'graphique';
  return `${base}.${ext}`;
}
function exportSvg(){
  downloadBlob(getSvgForDownload(), filename('svg'), 'image/svg+xml;charset=utf-8');
}
async function copySvg(){
  const svg = getSvgForDownload();
  try{
    await navigator.clipboard.writeText(svg);
    toast('SVG copié dans le presse-papiers.');
  }catch{
    downloadBlob(svg, filename('svg'), 'image/svg+xml;charset=utf-8');
    toast('Copie impossible : SVG téléchargé à la place.');
  }
}
function exportPng(){
  const size = chartSize();
  const svg = getSvgForDownload();
  const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, size.w, size.h);
    canvas.toBlob((pngBlob) => {
      URL.revokeObjectURL(url);
      if (!pngBlob) return toast('Export PNG impossible.');
      downloadBlob(pngBlob, filename('png'), 'image/png');
      toast('PNG exporté.');
    }, 'image/png');
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    toast('Export PNG impossible : SVG non lisible.');
  };
  img.src = url;
}
function bind(){
  [els.title, els.subtitle, els.source, els.chartType, els.theme, els.format, els.palette, els.showValues, els.showLegend, els.showGrid, els.transparent, els.sort, els.compareMode, els.compareMethod, els.decimals, els.weight]
    .forEach(input => {
      input.addEventListener('input', updateFromControls);
      input.addEventListener('change', updateFromControls);
    });
  els.rows.addEventListener('input', (event) => {
    const input = event.target.closest('input[data-field]');
    if (input) updateRowFromInput(input);
  });
  els.rows.addEventListener('change', (event) => {
    const input = event.target.closest('input[data-field]');
    if (input) updateRowFromInput(input);
  });
  els.rows.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-remove-row]');
    if (btn) removeRow(Number(btn.dataset.removeRow));
  });
  els.addRow.addEventListener('click', addRow);
  els.save.addEventListener('click', () => save(false));
  els.undo.addEventListener('click', undo);
  els.redo.addEventListener('click', redo);
  els.reset.addEventListener('click', openResetModal);
  els.resetCancel.addEventListener('click', closeResetModal);
  els.resetKeep.addEventListener('click', closeResetModal);
  els.resetConfirm.addEventListener('click', confirmReset);
  els.resetModal.addEventListener('click', (event) => { if (event.target === els.resetModal) closeResetModal(); });
  els.exportPng.addEventListener('click', exportPng);
  els.copySvg.addEventListener('click', copySvg);
  els.downloadSvg.addEventListener('click', exportSvg);
  window.addEventListener('resize', fitPreview);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeResetModal(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); undo(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); }
  });
}

load();
bind();
renderAll();
save(true);
initHistory();
