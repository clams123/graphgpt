const STORAGE_KEY = 'graphiquesgpt_v9_1_5_glitter_sans_ombre_types';
const LIBRARY_KEY = `${STORAGE_KEY}_library`;
const THEMES = ['midnight','clean','executive','editorial','graphite','sage','haute','bloom','cyberclear','noir','neon','ocean','forest','sunset','astral','crystal','lifestream','phoenix','voidstar','twitch','streamdeck','resonance','royal','arcade','glitter1soft','glitter2soft'];
const CHART_TYPES = ['bar','glitterBar','glitterBarNoShadow','glitterBar2','glitterBar2NoShadow','horizontalBar','line','linearGraph','area','pie','donut','donutTable','bubble','funnel','radar'];
const FORMATS = {
  wide:{w:1600,h:900,label:'16:9'},
  square:{w:1200,h:1200,label:'Carre'},
  story:{w:1080,h:1350,label:'Vertical'}
};
const FONT_FAMILIES = ['system','display','wuwa','neo','condensed','techno','elegant','editorial','serif','arcade','mono'];
const TYPE_LABELS = {
  bar:'Barres verticales',
  glitterBar:'Barres arrondies glitter 1',
  glitterBarNoShadow:'Barres arrondies glitter 1 sans ombre',
  glitterBar2:'Barres arrondies glitter 2',
  glitterBar2NoShadow:'Barres arrondies glitter 2 sans ombre',
  horizontalBar:'Barres horizontales',
  line:'Courbe',
  linearGraph:'Graphique lineaire',
  area:'Aire',
  pie:'Camembert',
  donut:'Donut',
  donutTable:'Tableau des beignets',
  bubble:'Graphique a bulles',
  funnel:'Diagramme en entonnoir',
  radar:'Radar'
};
const AUTO_COLORS = ['#38bdf8','#a78bfa','#f472b6','#fbbf24','#34d399','#fb7185','#60a5fa','#c084fc','#f97316','#22d3ee'];
const THEME_PALETTES = {
  midnight:['#38bdf8','#d8b4fe','#f472b6','#fbbf24','#34d399','#60a5fa','#fb7185','#22d3ee'],
  clean:['#1d4ed8','#be123c','#0891b2','#b45309','#047857','#6d28d9','#475569','#db2777'],
  executive:['#1e40af','#b45309','#0f766e','#be123c','#4f46e5','#475569','#ca8a04','#0369a1'],
  editorial:['#c2410c','#111827','#0f766e','#b91c1c','#64748b','#a16207','#be123c','#2563eb'],
  graphite:['#f59e0b','#38bdf8','#e11d48','#94a3b8','#22c55e','#a78bfa','#f97316','#14b8a6'],
  sage:['#3f7d58','#d97706','#2563eb','#9f1239','#64748b','#0f766e','#ca8a04','#7c3aed'],
  haute:['#9f1239','#2563eb','#a16207','#7e22ce','#0f766e','#db2777','#475569','#ea580c'],
  bloom:['#e11d48','#059669','#2563eb','#f59e0b','#7c3aed','#0891b2','#be123c','#65a30d'],
  cyberclear:['#0891b2','#7c3aed','#16a34a','#e11d48','#2563eb','#f59e0b','#0f766e','#9333ea'],
  noir:['#d6b76a','#ef4444','#38bdf8','#a3a3a3','#22c55e','#f97316','#a78bfa','#facc15'],
  neon:['#d946ef','#00d4ff','#a3e635','#f97316','#f472b6','#8b5cf6','#06b6d4','#facc15'],
  ocean:['#0ea5e9','#34d399','#38bdf8','#14b8a6','#818cf8','#67e8f9','#2563eb','#fbbf24'],
  forest:['#10b981','#eab308','#84cc16','#22c55e','#38bdf8','#f59e0b','#65a30d','#4ade80'],
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
  showValues:$('showValuesInput'), showLegend:$('showLegendInput'), showGrid:$('showGridInput'), showAxis:$('showAxisInput'), transparent:$('transparentInput'),
  enableAnimations:$('enableAnimationsInput'),
  animationDuration:$('animationDurationInput'), animationDelay:$('animationDelayInput'), animationStagger:$('animationStaggerInput'),
  valuePlacement:$('valuePlacementInput'), horizontalShape:$('horizontalShapeInput'), glitterRoundness:$('glitterRoundnessInput'),
  sort:$('sortInput'), decimals:$('decimalsInput'), weight:$('weightInput'),
  titleScale:$('titleScaleInput'), valueScale:$('valueScaleInput'), fontFamily:$('fontFamilyInput'),
  libraryName:$('libraryNameInput'), libraryList:$('libraryList'), saveGraph:$('saveGraphBtn'), saveTemplate:$('saveTemplateBtn'),
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
  showAxis:true,
  transparent:false,
  enableAnimations:false,
  animationDuration:1,
  animationDelay:1,
  animationStagger:0.12,
  valuePlacement:'outside',
  horizontalShape:'rounded',
  glitterRoundness:1,
  titleScale:1,
  valueScale:1,
  fontFamily:'wuwa',
  fontDefaultUpgraded:true,
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
let library = [];
const MAX_HISTORY = 60;
const MAX_LIBRARY_ITEMS = 60;

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
  base.showAxis = input.showAxis !== false;
  base.transparent = !!input.transparent;
  base.enableAnimations = !!input.enableAnimations;
  base.animationDuration = clamp(input.animationDuration, 0.6, 3, 1);
  base.animationDelay = clamp(input.animationDelay, 0, 3, 1);
  base.animationStagger = clamp(input.animationStagger, 0, 0.35, 0.12);
  base.valuePlacement = oneOf(input.valuePlacement, ['outside','inside'], base.valuePlacement);
  const horizontalShape = ['glitter3','glitter4'].includes(input.horizontalShape) ? 'glitter2' : input.horizontalShape;
  base.horizontalShape = oneOf(horizontalShape, ['rounded','glitter2'], base.horizontalShape);
  base.glitterRoundness = clamp(input.glitterRoundness, 0.5, 3, 1);
  base.titleScale = clamp(input.titleScale, 0.7, 1.25, 1);
  base.valueScale = clamp(input.valueScale, 0.7, 1.35, 1);
  base.fontDefaultUpgraded = true;
  if ((input.fontFamily === 'system' || input.fontFamily == null) && input.fontDefaultUpgraded !== true) {
    base.fontFamily = 'wuwa';
  } else {
    base.fontFamily = oneOf(input.fontFamily, FONT_FAMILIES, base.fontFamily);
  }
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
    toast('Sauvegarde locale illisible : base par defaut chargee.');
  }
}
function save(silent=true){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    els.saveStatus.textContent = 'Sauvegarde';
    if (!silent) toast('Sauvegarde locale effectuee.');
  }catch{
    els.saveStatus.textContent = 'Non sauvegarde';
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
    toast('Historique illisible : action annulee.');
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

function libraryId(){
  return `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function defaultLibraryName(kind){
  const base = String(state.title || '').trim() || (kind === 'template' ? 'Modele' : 'Graph');
  return base.length > 48 ? `${base.slice(0, 45).trimEnd()}...` : base;
}
function normalizeLibraryItem(item){
  const input = item && typeof item === 'object' ? item : {};
  const savedState = normalizeState(input.state || {});
  const kind = oneOf(input.kind, ['graph','template'], 'graph');
  return {
    id:String(input.id || libraryId()),
    kind,
    name:String(input.name || defaultLibraryName(kind)).trim() || defaultLibraryName(kind),
    updatedAt:Number(input.updatedAt) || Date.now(),
    state:savedState
  };
}
function loadLibrary(){
  try{
    const raw = localStorage.getItem(LIBRARY_KEY);
    library = raw ? JSON.parse(raw).map(normalizeLibraryItem).slice(0, MAX_LIBRARY_ITEMS) : [];
  }catch{
    library = [];
    toast('Bibliotheque locale illisible.');
  }
}
function saveLibrary(){
  try{
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }catch{
    toast('Bibliotheque locale impossible a sauvegarder.');
  }
}
function libraryMeta(item){
  const kind = item.kind === 'template' ? 'Modele' : 'Graph';
  const rows = item.state.rows.length;
  const type = TYPE_LABELS[item.state.chartType] || 'Graphique';
  const date = new Date(item.updatedAt).toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'2-digit'});
  return `${kind} - ${type} - ${rows} valeur${rows > 1 ? 's' : ''} - ${date}`;
}
function renderLibrary(){
  if (!els.libraryList) return;
  if (!library.length) {
    els.libraryList.innerHTML = '<div class="libraryEmpty">Aucun graph sauvegarde pour le moment.</div>';
    return;
  }
  els.libraryList.innerHTML = library.map(item => {
    const isTemplate = item.kind === 'template';
    const mainAction = isTemplate ? 'Appliquer' : 'Charger';
    return `<div class="libraryItem" data-library-id="${attr(item.id)}">
      <div class="libraryMeta">
        <strong><span class="libraryType">${isTemplate ? 'MODELE' : 'GRAPH'}</span>${esc(item.name)}</strong>
        <span>${esc(libraryMeta(item))}</span>
      </div>
      <div class="libraryActions">
        <button class="btn btn--soft" type="button" data-library-action="${isTemplate ? 'apply' : 'load'}">${mainAction}</button>
        ${isTemplate ? '' : '<button class="btn btn--ghost" type="button" data-library-action="apply">Style</button>'}
        <button class="btn btn--danger" type="button" data-library-action="delete">Suppr.</button>
      </div>
    </div>`;
  }).join('');
}
function upsertLibraryItem(kind){
  const name = String(els.libraryName.value || '').trim() || defaultLibraryName(kind);
  const now = Date.now();
  const item = {
    id:libraryId(),
    kind,
    name,
    updatedAt:now,
    state:normalizeState(state)
  };
  library = [item, ...library].slice(0, MAX_LIBRARY_ITEMS);
  saveLibrary();
  renderLibrary();
  els.libraryName.value = '';
  toast(kind === 'template' ? 'Modele sauvegarde.' : 'Graph sauvegarde.');
}
function applyTemplate(savedState){
  const keep = {
    title:state.title,
    subtitle:state.subtitle,
    source:state.source,
    rows:clone(state.rows)
  };
  state = normalizeState({
    ...savedState,
    title:keep.title,
    subtitle:keep.subtitle,
    source:keep.source,
    rows:keep.rows
  });
  renderAll();
  save(true);
  pushHistory();
}
function loadLibraryGraph(item){
  state = normalizeState(item.state);
  renderAll();
  save(true);
  pushHistory();
  toast('Graph charge.');
}
function handleLibraryClick(event){
  const button = event.target.closest('[data-library-action]');
  if (!button) return;
  const itemNode = button.closest('[data-library-id]');
  const item = library.find(entry => entry.id === itemNode?.dataset.libraryId);
  if (!item) return;
  const action = button.dataset.libraryAction;
  if (action === 'load') loadLibraryGraph(item);
  if (action === 'apply') {
    applyTemplate(item.state);
    toast('Style applique.');
  }
  if (action === 'delete') {
    library = library.filter(entry => entry.id !== item.id);
    saveLibrary();
    renderLibrary();
    toast('Element supprime.');
  }
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
    accent2:get('--accent2','#a78bfa'),
    surface:get('--surface','rgba(255,255,255,.055)'),
    surfaceStroke:get('--surfaceStroke','rgba(255,255,255,.14)')
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
function fontStack(kind='system'){
  const fonts = {
    system:'Inter, Segoe UI, system-ui, Arial, sans-serif',
    display:'Arial Black, Impact, Inter, system-ui, sans-serif',
    wuwa:'Eurostile, Bank Gothic, Orbitron, Oxanium, Rajdhani, Bahnschrift, Agency FB, Trebuchet MS, system-ui, sans-serif',
    neo:'Rajdhani, Oxanium, Exo, Bahnschrift, Segoe UI, system-ui, sans-serif',
    condensed:'Bahnschrift Condensed, Aptos Narrow, Arial Narrow, Agency FB, Impact, sans-serif',
    techno:'Orbitron, Oxanium, Michroma, Copperplate, Bahnschrift, system-ui, sans-serif',
    elegant:'Cinzel, Trajan Pro, Didot, Bodoni 72, Georgia, serif',
    editorial:'Playfair Display, Georgia, Cambria, Times New Roman, serif',
    serif:'Georgia, Cambria, Times New Roman, serif',
    arcade:'Press Start 2P, Aldrich, Impact, Arial Black, system-ui, sans-serif',
    mono:'Consolas, ui-monospace, SFMono-Regular, monospace'
  };
  return fonts[kind] || fonts.system;
}
function estimateTextWidth(content, fontSize, weight=700){
  const textValue = String(content ?? '');
  let units = 0;
  for (const char of textValue) {
    if (char === ' ') units += 0.34;
    else if ("'.,:;!|".includes(char)) units += 0.24;
    else if ('ilIjtfr'.includes(char)) units += 0.36;
    else if ('MW@#%&'.includes(char)) units += 0.94;
    else if (/[A-Z0-9]/.test(char)) units += 0.68;
    else units += 0.58;
  }
  return units * fontSize * (Number(weight) >= 850 ? 1.08 : 1);
}
function fitFontSize(content, maxFont, minFont, maxWidth, weight=700){
  const width = Math.max(1, Number(maxWidth) || 1);
  const natural = estimateTextWidth(content, maxFont, weight);
  if (natural <= width) return Math.round(maxFont);
  return Math.max(minFont, Math.floor(maxFont * width / natural));
}
function truncateText(content, fontSize, maxWidth, weight=700){
  const textValue = String(content ?? '');
  if (estimateTextWidth(textValue, fontSize, weight) <= maxWidth) return textValue;
  const ellipsis = '...';
  let low = 0;
  let high = textValue.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (estimateTextWidth(textValue.slice(0, mid) + ellipsis, fontSize, weight) <= maxWidth) low = mid;
    else high = mid - 1;
  }
  return `${textValue.slice(0, Math.max(0, low)).trimEnd()}${ellipsis}`;
}
function fittedText(x, y, content, maxWidth, maxFont, minFont, attrs='', weight=700){
  const fontSize = fitFontSize(content, maxFont, minFont, maxWidth, weight);
  const value = fontSize <= minFont ? truncateText(content, fontSize, maxWidth, weight) : content;
  return text(x, y, value, `${attrs} font-size="${fontSize}"`);
}
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
function ringArcPath(cx, cy, r, start, end){
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}
function line(points, attrs=''){
  return `<polyline points="${points.map(p => `${p.x},${p.y}`).join(' ')}" ${attrs}/>`;
}
function polygon(points, attrs=''){
  return `<polygon points="${points.map(p => `${p.x},${p.y}`).join(' ')}" ${attrs}/>`;
}
function smoothPath(points){
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    d += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }
  return d;
}
function text(x, y, content, attrs=''){
  return `<text x="${x}" y="${y}" ${attrs}>${esc(content)}</text>`;
}
function seriesGradientId(index){ return `series-${state.chartType}-${index}`; }
function seriesFill(index){ return `url(#${seriesGradientId(index)})`; }
function seriesDefs(palette, colors){
  const areaTop = brightenColor(colors.accent, 0.34);
  return `<defs>
    ${palette.map((color, index) => `<linearGradient id="${seriesGradientId(index)}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${brightenColor(color, 0.18)}"/>
      <stop offset=".58" stop-color="${color}"/>
      <stop offset="1" stop-color="${deepenColor(color, 0.2)}"/>
    </linearGradient>`).join('')}
    <linearGradient id="line-area-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${areaTop}" stop-opacity=".42"/>
      <stop offset=".78" stop-color="${colors.accent}" stop-opacity=".08"/>
      <stop offset="1" stop-color="${colors.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>`;
}
function plotSurface(x, y, w, h, colors, opacity=1){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${colors.surface}" stroke="${colors.surfaceStroke}" stroke-width="1.2" opacity="${opacity}"/>`;
}
function motionMarkup(){
  if (!state.enableAnimations) return '';
  const duration = clamp(state.animationDuration, 0.6, 3, 1);
  const start = clamp(state.animationDelay, 0, 3, 1);
  return `<style><![CDATA[
    :root{--motion-start:${start.toFixed(2)}s}
    .barAnim{transform-box:fill-box;transform-origin:left center;animation:barGrow ${duration.toFixed(2)}s cubic-bezier(.16,.82,.24,1) both;animation-delay:calc(var(--motion-start) + var(--delay,0s))}
    .vBarAnim{transform-box:fill-box;transform-origin:center bottom;animation:vBarGrow ${duration.toFixed(2)}s cubic-bezier(.16,.82,.24,1) both;animation-delay:calc(var(--motion-start) + var(--delay,0s))}
    .lineAnim{stroke-dasharray:1800;stroke-dashoffset:1800;animation:lineDraw ${(duration * 1.38).toFixed(2)}s ease-out both;animation-delay:calc(var(--motion-start) + var(--delay,0s))}
    .pointAnim{transform-box:fill-box;transform-origin:center;animation:pointPop ${(duration * 0.46).toFixed(2)}s ease-out both;animation-delay:calc(var(--motion-start) + var(--delay,0s))}
    @keyframes barGrow{0%{transform:scaleX(.01);opacity:.18}62%{opacity:1}100%{transform:scaleX(1);opacity:1}}
    @keyframes vBarGrow{0%{transform:scaleY(.01);opacity:.18}62%{opacity:1}100%{transform:scaleY(1);opacity:1}}
    @keyframes lineDraw{to{stroke-dashoffset:0}}
    @keyframes pointPop{from{transform:scale(.25);opacity:0}to{transform:scale(1);opacity:1}}
    @media (prefers-reduced-motion: reduce){.barAnim,.vBarAnim,.lineAnim,.pointAnim{animation:none!important}}
  ]]></style>`;
}
function legendLayout(size){
  const reserve = Math.round(size.w * 0.24);
  const pad = Math.round(size.w * 0.035);
  const font = Math.max(12, Math.round(size.w * 0.011));
  const swatch = Math.max(12, Math.round(font * 0.9));
  const x = size.w - reserve + pad;
  const textX = x + swatch + Math.round(font * 0.7);
  const maxTextW = Math.max(90, size.w - textX - pad);
  return {
    x,
    textX,
    swatch,
    y:Math.round(size.h * 0.23),
    itemH:Math.max(24, Math.round(size.h * 0.035)),
    font,
    maxTextW,
    leftEdge:x - Math.round(size.w * 0.03)
  };
}
function backgroundMarkup(size, transparent){
  if (transparent) return '';
  const id = `bg-${state.theme}`;
  const bg = {
    midnight:{from:'#101827', to:'#050914', wash:[['18%','14%','52%','#38bdf8','.10'],['82%','22%','46%','#d8b4fe','.10']]},
    clean:{from:'#f8fafc', to:'#eef2f7', wash:[['84%','12%','42%','#bfdbfe','.28']]},
    executive:{from:'#f9fafb', to:'#e9eef5', wash:[['82%','14%','44%','#bfdbfe','.28'],['16%','82%','48%','#fde68a','.20']]},
    editorial:{from:'#fbfaf7', to:'#eee9df', wash:[['84%','14%','42%','#fed7aa','.26'],['12%','78%','44%','#ccfbf1','.18']]},
    graphite:{from:'#1d2228', to:'#0c0f13', wash:[['82%','18%','45%','#f59e0b','.13'],['15%','78%','42%','#38bdf8','.10']]},
    sage:{from:'#f6f8f1', to:'#e4ecdf', wash:[['18%','14%','42%','#bbf7d0','.25'],['82%','78%','44%','#fed7aa','.18']]},
    haute:{from:'#fbf7f6', to:'#d9e7ea', wash:[['18%','18%','46%','#fbcfe8','.30'],['84%','72%','44%','#bfdbfe','.24']]},
    bloom:{from:'#fff7fb', to:'#eef4ff', wash:[['18%','15%','44%','#fecdd3','.28'],['82%','74%','46%','#bbf7d0','.22']]},
    cyberclear:{from:'#f7fbff', to:'#eef2ff', wash:[['18%','20%','44%','#a5f3fc','.24'],['82%','72%','46%','#ddd6fe','.22']]},
    noir:{from:'#121212', to:'#030303', wash:[['82%','16%','44%','#d6b76a','.14'],['16%','78%','42%','#ef4444','.08']]},
    neon:{from:'#15051f', to:'#061c26', wash:[['18%','18%','50%','#d946ef','.20'],['82%','76%','44%','#00d4ff','.16']]},
    ocean:{from:'#07384c', to:'#071827', wash:[['82%','16%','48%','#67e8f9','.16']]},
    forest:{from:'#052b2a', to:'#12351f', wash:[['16%','16%','45%','#86efac','.13'],['82%','78%','42%','#facc15','.08']]},
    sunset:{from:'#321238', to:'#c2601d', wash:[['16%','18%','46%','#fb7185','.18'],['82%','22%','44%','#fbbf24','.16']]},
    astral:{from:'#070b2c', to:'#211052', wash:[['18%','12%','50%','#7dd3fc','.20'],['78%','22%','48%','#c084fc','.17']]},
    crystal:{from:'#f8fbff', to:'#e8f7ff', wash:[['82%','16%','48%','#f0abfc','.22'],['16%','76%','46%','#67e8f9','.22']]},
    lifestream:{from:'#042f3f', to:'#062e2f', wash:[['50%','20%','48%','#22d3ee','.18']]},
    phoenix:{from:'#2b0711', to:'#7c2d12', wash:[['78%','18%','45%','#facc15','.18']]},
    voidstar:{from:'#050816', to:'#1e1b4b', wash:[['18%','20%','48%','#8b5cf6','.18']]},
    twitch:{from:'#12091f', to:'#2d0b59', wash:[['20%','18%','48%','#9146ff','.20'],['82%','76%','43%','#00f5d4','.12']]},
    streamdeck:{from:'#020617', to:'#111827', wash:[['80%','12%','43%','#00f5d4','.15']]},
    resonance:{from:'#001b2e', to:'#1e1b4b', wash:[['22%','18%','48%','#00e5ff','.16']]},
    royal:{from:'#15111f', to:'#34204c', wash:[['80%','18%','46%','#facc15','.14']]},
    arcade:{from:'#070019', to:'#18002e', wash:[['15%','15%','46%','#ff2bd6','.17'],['82%','76%','44%','#00f5ff','.16']]},
    glitter1soft:{from:'#0b1730', to:'#081126', wash:[['50%','18%','52%','#dff3fb','.10']]},
    glitter2soft:{from:'#101a36', to:'#0a1227', wash:[['50%','18%','52%','#f6dce8','.10']]}
  }[state.theme] || {from:'#121a2b', to:'#081123', wash:[]};
  const washDefs = (bg.wash || []).map((item, index) => `<radialGradient id="${id}-wash-${index}" cx="${item[0]}" cy="${item[1]}" r="${item[2]}"><stop offset="0" stop-color="${item[3]}" stop-opacity="${item[4]}"/><stop offset="1" stop-color="${item[3]}" stop-opacity="0"/></radialGradient>`).join('');
  const washRects = (bg.wash || []).map((_, index) => `<rect width="${size.w}" height="${size.h}" fill="url(#${id}-wash-${index})"/>`).join('');
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg.from}"/><stop offset="1" stop-color="${bg.to}"/></linearGradient>${washDefs}</defs><rect width="${size.w}" height="${size.h}" rx="0" fill="url(#${id})"/>${washRects}`;
}
function headerMarkup(size, colors){
  const left = Math.round(size.w * 0.07);
  const maxTextW = size.w - left - Math.round(size.w * 0.07);
  const titleY = Math.round(size.h * 0.12);
  const subY = titleY + Math.round(size.h * 0.045);
  const fontTitle = Math.max(28, Math.round(size.w * 0.042 * state.titleScale));
  const fontSub = Math.max(18, Math.round(size.w * 0.016));
  const sourceY = size.h - Math.round(size.h * 0.045);
  const family = fontStack(state.fontFamily);
  return [
    state.title ? fittedText(left, titleY, state.title, maxTextW, fontTitle, 20, `fill="${colors.text}" font-weight="850" font-family="${family}"`, 850) : '',
    state.subtitle ? fittedText(left, subY, state.subtitle, maxTextW, fontSub, 13, `fill="${colors.muted}" font-weight="700" font-family="${family}"`, 700) : '',
    state.source ? fittedText(left, sourceY, state.source, maxTextW, Math.max(14, Math.round(size.w * 0.012)), 11, `fill="${colors.muted}" font-weight="750" font-family="${fontStack('system')}"`, 750) : ''
  ].join('');
}
function legendMarkup(rows, size, colors, palette){
  if (!state.showLegend && !['pie','donut'].includes(state.chartType)) return '';
  const layout = legendLayout(size);
  const family = fontStack(state.fontFamily);
  return `<g aria-label="Legende">${rows.slice(0, 12).map((row, index) => {
    const yy = layout.y + index * layout.itemH;
    const label = truncateText(`${row.label} - ${formatValue(row.value)}`, layout.font, layout.maxTextW, 750);
    return `<rect x="${layout.x}" y="${yy - layout.swatch + 2}" width="${layout.swatch}" height="${layout.swatch}" rx="4" fill="${palette[index]}"/><text x="${layout.textX}" y="${yy}" fill="${colors.text}" font-size="${layout.font}" font-weight="750" font-family="${family}">${esc(label)}</text>`;
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
      out += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5 9" stroke-linecap="round"/>`;
      out += text(x - 12, yy + 5, formatValue(value), `fill="${colors.muted}" font-size="14" font-weight="700" text-anchor="end" font-family="system-ui, Arial, sans-serif"`);
    }
  }
  const baseY = y + h - ((0 - scale.min) / scale.span) * h;
  if (state.showAxis) {
    out += `<line x1="${x}" y1="${baseY}" x2="${x + w}" y2="${baseY}" stroke="${colors.axis}" stroke-width="2" opacity=".82" stroke-linecap="round"/>`;
    out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${colors.axis}" stroke-width="2" opacity=".52" stroke-linecap="round"/>`;
  }
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
  const roundness = clamp(state.glitterRoundness, 0.5, 3, 1);
  if (variant === 'glitterBar2') {
    // Glitter 2: forme inversee demandee.
    // - grand arrondi en haut a gauche ;
    // - grand arrondi en bas a droite ;
    // - les deux autres coins restent presque droits.
    const topLeft = Math.min(h * 0.21 * roundness, w * 1.08);
    const topRight = Math.min(h * 0.04 * roundness, w * 0.12, 18);
    const bottomRight = Math.min(h * 0.21 * roundness, w * 1.08);
    const bottomLeft = Math.min(h * 0.04 * roundness, w * 0.12, 18);
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
  const leftTop = Math.min(h * 0.19 * roundness, w * 0.98);
  const leftBottom = Math.min(h * 0.19 * roundness, w * 0.98);
  const rightRadius = Math.min(h * 0.04 * roundness, w * 0.15, 18);
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
function horizontalGlitterBarPath(x, y, w, h, shape='glitter2'){
  const roundness = clamp(state.glitterRoundness, 0.5, 3, 1);
  const profile = {
    glitter2:{big:0.58, small:0.075}
  }[shape] || {big:0.52, small:0.08};
  const small = Math.min(h * profile.small * Math.sqrt(roundness), h * 0.09, 10);
  const big = Math.min(h * profile.big * roundness, w * 0.34, h * 0.98);
  return `M ${x + big} ${y}
    L ${x + w - small} ${y}
    Q ${x + w} ${y} ${x + w} ${y + small}
    L ${x + w} ${y + h - big}
    Q ${x + w} ${y + h} ${x + w - big} ${y + h}
    L ${x + small} ${y + h}
    Q ${x} ${y + h} ${x} ${y + h - small}
    L ${x} ${y + big}
    Q ${x} ${y} ${x + big} ${y}
    Z`;
}
function glitterInfoMarkup(size, colors){
  const title = String(state.title || '').trim();
  const subtitle = String(state.subtitle || '').trim();
  const source = String(state.source || '').trim();
  if (!title && !subtitle && !source) return '';

  const left = Math.round(size.w * 0.035);
  const maxTextW = size.w - left - Math.round(size.w * 0.04);
  const titleY = Math.round(size.h * 0.075);
  const subY = titleY + Math.round(size.h * 0.045);
  const sourceY = subY + Math.round(size.h * 0.038);
  const titleSize = Math.max(24, Math.round(size.w * 0.028 * state.titleScale));
  const subSize = Math.max(16, Math.round(size.w * 0.014));
  const sourceSize = Math.max(13, Math.round(size.w * 0.011));
  const family = state.fontFamily === 'system' ? fontStack('display') : fontStack(state.fontFamily);

  return `<g class="glitterInfo">
    ${title ? fittedText(left, titleY, title, maxTextW, titleSize, 18, `fill="${colors.text}" font-weight="950" font-family="${family}"`, 950) : ''}
    ${subtitle ? fittedText(left, subY, subtitle, maxTextW, subSize, 12, `fill="${colors.muted}" font-weight="850" font-family="${fontStack('system')}"`, 850) : ''}
    ${source ? fittedText(left, sourceY, source, maxTextW, sourceSize, 10, `fill="${colors.muted}" font-weight="750" font-family="${fontStack('system')}"`, 750) : ''}
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
function itemDelay(index, base=0){
  return (base + index * clamp(state.animationStagger, 0, 0.35, 0.12)).toFixed(2);
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
  const right = Math.round(size.w * (state.showLegend ? (wide ? 0.25 : 0.18) : (wide ? 0.03 : 0.07)));
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
    const label = row.label.length > 12 ? row.label.slice(0, 11) + '...' : row.label;

    out += `${glitterBarGradientDef(gradId, color)}
    <g class="glitterBarItem vBarAnim" style="--delay:${itemDelay(index)}s">
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
  let out = plotSurface(x - 18, y - 18, w + 36, h + 36, colors);
  out += axisAndGrid(x, y, w, h, scale, colors);
  rows.forEach((row, index) => {
    const cx = x + step * index + step / 2;
    const targetY = y + h - ((row.value - scale.min) / scale.span) * h;
    const top = Math.min(baseY, targetY);
    const bh = Math.abs(baseY - targetY);
    const rx = Math.min(18, barW / 2);
    out += `<rect class="vBarAnim" style="--delay:${itemDelay(index)}s" x="${cx - barW / 2}" y="${top}" width="${barW}" height="${bh}" rx="${rx}" fill="${seriesFill(index)}" stroke="${brightenColor(palette[index], 0.36)}" stroke-width="1" opacity=".98"/>`;
    out += `<rect x="${cx - barW / 2 + Math.max(3, barW * 0.08)}" y="${top + 4}" width="${Math.max(2, barW * 0.18)}" height="${Math.max(0, bh - 8)}" rx="${Math.max(1, rx * .55)}" fill="#ffffff" opacity=".13"/>`;
    if (state.showValues) out += text(cx, top - 10, formatValue(row.value), `fill="${colors.text}" font-size="16" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    const label = row.label.length > 12 ? row.label.slice(0, 11) + '...' : row.label;
    out += text(cx, y + h + 34, label, `fill="${colors.muted}" font-size="15" font-weight="750" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderHorizontalBar(rows, size, colors, palette){
  const family = fontStack(state.fontFamily);
  const legend = legendLayout(size);
  const labelFont = Math.max(11, Math.round(size.w * 0.0105));
  const valueFont = Math.max(11, Math.round(size.w * 0.0105 * state.valueScale));
  const sidePad = Math.round(size.w * 0.045);
  const maxLabelTextW = Math.round(size.w * 0.24);
  const labelW = Math.min(
    maxLabelTextW,
    Math.max(Math.round(size.w * 0.10), ...rows.map(row => estimateTextWidth(row.label, labelFont, 800) + 10))
  );
  const maxValueW = state.showValues && state.valuePlacement === 'outside'
    ? Math.max(...rows.map(row => estimateTextWidth(formatValue(row.value), valueFont, 900))) + Math.round(size.w * 0.025)
    : 0;
  const surfaceRightPad = state.showValues && state.valuePlacement === 'outside' ? Math.round(maxValueW) : 20;
  const x = sidePad + Math.round(labelW);
  const y = Math.round(size.h * 0.23);
  const rightLimit = state.showLegend
    ? legend.leftEdge - Math.round(size.w * 0.025)
    : size.w - Math.round(size.w * 0.055);
  const w = Math.max(Math.round(size.w * 0.20), rightLimit - x - surfaceRightPad - 24);
  const h = Math.round(size.h * 0.58);
  const max = Math.max(...rows.map(r => Math.abs(r.value)), 1);
  const rowH = h / Math.max(1, rows.length);
  const barH = Math.max(14, rowH * 0.55 * state.weight);
  let out = plotSurface(x - 4, y - 18, w + surfaceRightPad + 24, h + 36, colors);
  if (state.showGrid) {
    for (let i = 0; i <= 5; i++) {
      const xx = x + (i / 5) * w;
      out += `<line x1="${xx}" y1="${y}" x2="${xx}" y2="${y + h}" stroke="${colors.grid}" stroke-width="1" stroke-dasharray="5 9" stroke-linecap="round"/>`;
    }
  }
  if (state.showAxis) out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${colors.axis}" stroke-width="2" opacity=".64" stroke-linecap="round"/>`;
  rows.forEach((row, index) => {
    const yy = y + index * rowH + rowH / 2;
    const bw = Math.abs(row.value) / max * w;
    const label = truncateText(row.label, labelFont, labelW, 800);
    const barY = yy - barH / 2;
    out += text(x - 14, yy + labelFont * 0.34, label, `fill="${colors.muted}" font-size="${labelFont}" font-weight="800" text-anchor="end" font-family="${family}"`);
    if (state.horizontalShape === 'glitter2') {
      const path = horizontalGlitterBarPath(x, barY, bw, barH, state.horizontalShape);
      const clipId = `horizontal-${state.horizontalShape}-${index}`;
      out += `<clipPath id="${clipId}"><path d="${path}"/></clipPath>
      <path class="barAnim" style="--delay:${itemDelay(index)}s" d="${path}" fill="${seriesFill(index)}" stroke="${brightenColor(palette[index], 0.35)}" stroke-width="1"/>
      <g clip-path="url(#${clipId})">
        <rect x="${x + 5}" y="${yy - barH / 2 + Math.max(3, barH * .12)}" width="${Math.max(0, bw - 10)}" height="${Math.max(2, barH * .18)}" rx="${barH * .09}" fill="#ffffff" opacity=".12"/>
      </g>`;
    } else {
      out += `<rect class="barAnim" style="--delay:${itemDelay(index)}s" x="${x}" y="${barY}" width="${bw}" height="${barH}" rx="${barH / 2}" fill="${seriesFill(index)}" stroke="${brightenColor(palette[index], 0.35)}" stroke-width="1"/>`;
      out += `<rect x="${x + 5}" y="${yy - barH / 2 + Math.max(3, barH * .12)}" width="${Math.max(0, bw - 10)}" height="${Math.max(2, barH * .18)}" rx="${barH * .09}" fill="#ffffff" opacity=".12"/>`;
    }
    if (state.showValues) {
      const valueText = formatValue(row.value);
      if (state.valuePlacement === 'inside' && bw > estimateTextWidth(valueText, valueFont, 900) + 22) {
        out += text(x + bw - 12, yy + valueFont * 0.34, valueText, `fill="#ffffff" font-size="${valueFont}" font-weight="900" text-anchor="end" font-family="${family}"`);
      } else {
        out += text(x + bw + 12, yy + valueFont * 0.34, valueText, `fill="${colors.text}" font-size="${valueFont}" font-weight="900" font-family="${family}"`);
      }
    }
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
  let out = plotSurface(x - 18, y - 18, w + 36, h + 36, colors);
  out += axisAndGrid(x, y, w, h, scale, colors);
  if (area && points.length) {
    const baseY = y + h - ((0 - scale.min) / scale.span) * h;
    const areaPoints = [{x:points[0].x,y:baseY}, ...points, {x:points[points.length - 1].x,y:baseY}];
    out += polygon(areaPoints, `fill="url(#line-area-fill)"`);
  }
  out += line(points, `class="lineAnim" fill="none" stroke="${colors.accent}" stroke-width="${Math.max(4, 6 * state.weight)}" stroke-linecap="round" stroke-linejoin="round" opacity=".28" transform="translate(0 5)"`);
  out += line(points, `class="lineAnim" fill="none" stroke="${colors.accent}" stroke-width="${Math.max(4, 6 * state.weight)}" stroke-linecap="round" stroke-linejoin="round"`);
  points.forEach((point, index) => {
    out += `<circle class="pointAnim" style="--delay:${itemDelay(index, 0.65)}s" cx="${point.x}" cy="${point.y}" r="${Math.max(6, 8 * state.weight)}" fill="${seriesFill(index)}" stroke="${colors.text}" stroke-width="2"/>`;
    if (state.showValues) out += text(point.x, point.y - 16, formatValue(point.row.value), `fill="${colors.text}" font-size="15" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    const label = point.row.label.length > 12 ? point.row.label.slice(0, 11) + '...' : point.row.label;
    out += text(point.x, y + h + 34, label, `fill="${colors.muted}" font-size="14" font-weight="750" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderLinearGraph(rows, size, colors, palette){
  const legend = legendLayout(size);
  const x = Math.round(size.w * 0.08);
  const y = Math.round(size.h * 0.19);
  const baseW = Math.round(size.w * (state.showLegend ? 0.70 : 0.84));
  const w = state.showLegend
    ? Math.max(Math.round(size.w * 0.44), Math.min(baseW, legend.leftEdge - Math.round(size.w * 0.025) - x - 34))
    : baseW;
  const h = Math.round(size.h * 0.62);
  const values = rows.map(r => Number(r.value));
  const scale = scaleInfo(values);
  const toPoint = (value, index, row) => ({
    x:x + (rows.length === 1 ? w / 2 : index / (rows.length - 1) * w),
    y:y + h - ((value - scale.min) / scale.span) * h,
    value,
    row
  });
  const main = rows.map((row, index) => toPoint(Number(row.value), index, row));
  const average = values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
  const soft = rows.map((row, index) => {
    const previous = values[Math.max(0, index - 1)];
    const next = values[Math.min(values.length - 1, index + 1)];
    return toPoint((previous + Number(row.value) + next) / 3, index, row);
  });
  const baseline = rows.map((row, index) => toPoint(average * 0.55 + Number(row.value) * 0.35 + scale.max * 0.10, index, row));
  const baseY = y + h - ((0 - scale.min) / scale.span) * h;
  const mainPath = smoothPath(main);
  const softPath = smoothPath(soft);
  const basePath = smoothPath(baseline);
  let out = `<rect x="${x - 34}" y="${y - 78}" width="${w + 68}" height="${h + 128}" rx="16" fill="${colors.panel}" stroke="${colors.surfaceStroke}" stroke-width="1.2"/>`;
  if (state.title) out += fittedText(x - 18, y - 46, state.title, w + 36, Math.max(16, Math.round(size.w * 0.013)), 12, `fill="${colors.text}" font-weight="850" font-family="${fontStack(state.fontFamily)}"`, 850);
  if (state.subtitle) out += fittedText(x - 18, y - 22, state.subtitle, w + 36, Math.max(12, Math.round(size.w * 0.0095)), 10, `fill="${colors.muted}" font-weight="650" font-family="${fontStack(state.fontFamily)}"`, 650);
  for (let i = 0; i <= 5; i++) {
    const yy = y + h - (i / 5) * h;
    const value = scale.min + (i / 5) * scale.span;
    out += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="${colors.grid}" stroke-width="1"/>`;
    out += text(x - 16, yy + 5, formatValue(value), `fill="${colors.muted}" font-size="12" font-weight="650" text-anchor="end" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
  }
  out += `<line x1="${x}" y1="${baseY}" x2="${x + w}" y2="${baseY}" stroke="${colors.axis}" stroke-width="1.2" opacity=".42"/>`;
  if (main.length) {
    const areaD = `${mainPath} L ${main[main.length - 1].x} ${baseY} L ${main[0].x} ${baseY} Z`;
    out += `<path d="${areaD}" fill="${colors.accent}" opacity=".16"/>`;
    out += `<path class="lineAnim" d="${basePath}" fill="none" stroke="${palette[2] || colors.accent2}" stroke-width="${Math.max(2.5, 3.5 * state.weight)}" stroke-linecap="round" stroke-linejoin="round" opacity=".20"/>`;
    out += `<path class="lineAnim" style="--delay:.12s" d="${softPath}" fill="none" stroke="${palette[1] || colors.accent2}" stroke-width="${Math.max(3, 4.5 * state.weight)}" stroke-linecap="round" stroke-linejoin="round" opacity=".42"/>`;
    out += `<path class="lineAnim" style="--delay:.18s" d="${mainPath}" fill="none" stroke="${palette[0] || colors.accent}" stroke-width="${Math.max(3.5, 5 * state.weight)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  main.forEach((point, index) => {
    const label = point.row.label.length > 9 ? point.row.label.slice(0, 8) + '...' : point.row.label;
    out += text(point.x, y + h + 30, label || String(index + 1), `fill="${colors.muted}" font-size="12" font-weight="700" text-anchor="middle" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
    if (state.showValues) {
      out += `<circle class="pointAnim" style="--delay:${itemDelay(index, 0.78)}s" cx="${point.x}" cy="${point.y}" r="4.5" fill="${palette[0] || colors.accent}" stroke="${colors.panel}" stroke-width="2"/>`;
      out += text(point.x, point.y - 14, formatValue(point.value), `fill="${colors.text}" font-size="12" font-weight="850" text-anchor="middle" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
    }
  });
  if (state.showLegend) {
    const legendX = Math.max(x + w + Math.round(size.w * 0.055), legend.x);
    const legendY = y + Math.round(h * 0.30);
    const labels = ['Serie principale','Tendance lissee','Reference'];
    const legendColors = [palette[0] || colors.accent, palette[1] || colors.accent2, palette[2] || brightenColor(colors.accent, .4)];
    labels.forEach((label, index) => {
      const yy = legendY + index * 36;
      out += `<circle cx="${legendX}" cy="${yy}" r="9" fill="${legendColors[index]}" opacity="${index === 2 ? '.35' : '1'}"/>`;
      out += text(legendX + 22, yy + 5, truncateText(label, 14, size.w - legendX - 42, 700), `fill="${colors.text}" font-size="14" font-weight="700" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
    });
  }
  return out;
}
function renderPieOrDonut(rows, size, colors, palette, donut=false){
  const total = rows.reduce((sum, row) => sum + Math.max(0, Math.abs(row.value)), 0) || 1;
  const cx = Math.round(size.w * (state.showLegend ? 0.39 : 0.50));
  const cy = Math.round(size.h * 0.53);
  const r = Math.round(Math.min(size.w, size.h) * 0.24 * state.weight);
  const inner = donut ? r * 0.56 : 0;
  let start = -Math.PI / 2;
  let out = `<circle cx="${cx}" cy="${cy}" r="${r + 22}" fill="${colors.surface}" stroke="${colors.surfaceStroke}" stroke-width="1.2"/>`;
  rows.forEach((row, index) => {
    const value = Math.max(0, Math.abs(row.value));
    const end = start + (value / total) * Math.PI * 2;
    const path = donut ? donutPath(cx, cy, r, inner, start, end) : arcPath(cx, cy, r, start, end);
    out += `<path d="${path}" fill="${seriesFill(index)}" stroke="${state.transparent ? 'rgba(0,0,0,.25)' : colors.panel}" stroke-width="4"/>`;
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
    out += text(cx, cy + 28, formatValue(total), `fill="${colors.text}" font-size="34" font-weight="900" text-anchor="middle" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
  }
  return out;
}
function renderDonutTable(rows, size, colors, palette){
  const cleanRows = rows.filter(row => Math.abs(row.value) > 0).slice(0, 5);
  if (!cleanRows.length) return emptyMarkup(size, colors);
  const total = cleanRows.reduce((sum, row) => sum + Math.abs(row.value), 0) || 1;
  const wide = size.w >= size.h;
  const cx = Math.round(size.w * (wide ? 0.31 : 0.50));
  const cy = Math.round(size.h * (wide ? 0.53 : 0.45));
  const r = Math.round(Math.min(size.w, size.h) * (wide ? 0.265 : 0.25) * state.weight);
  const stroke = Math.max(42, Math.round(r * 0.34));
  const gap = Math.max(0.035, Math.min(0.07, 0.30 / cleanRows.length));
  const infoX = Math.round(size.w * 0.07);
  const titleY = Math.round(size.h * 0.12);
  const subY = titleY + Math.round(size.h * 0.045);
  const sourceY = size.h - Math.round(size.h * 0.045);
  const titleSize = Math.max(34, Math.round(size.w * 0.032));
  const subSize = Math.max(17, Math.round(size.w * 0.015));
  const sourceSize = Math.max(13, Math.round(size.w * 0.011));
  let start = -Math.PI / 2;
  let out = [
    state.title ? text(infoX, titleY, state.title, `fill="${colors.text}" font-size="${titleSize}" font-weight="850" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`) : '',
    state.subtitle ? text(infoX, subY, state.subtitle, `fill="${colors.muted}" font-size="${subSize}" font-weight="700" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`) : '',
    state.source ? text(infoX, sourceY, state.source, `fill="${colors.muted}" font-size="${sourceSize}" font-weight="750" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`) : ''
  ].join('');
  cleanRows.forEach((row, index) => {
    const value = Math.abs(row.value);
    const end = start + (value / total) * Math.PI * 2;
    const segStart = start + gap;
    const segEnd = Math.max(segStart + 0.01, end - gap);
    out += `<path d="${ringArcPath(cx, cy, r, segStart, segEnd)}" fill="none" stroke="${seriesFill(index)}" stroke-width="${stroke}" stroke-linecap="round"/>`;
    if (state.showValues && !state.showLegend) {
      const mid = (segStart + segEnd) / 2;
      const labelPos = polar(cx, cy, r + stroke * 0.62, mid);
      const pct = Math.round(value / total * 100);
      out += text(labelPos.x, labelPos.y + 5, `${pct}%`, `fill="${colors.text}" font-size="${Math.max(13, Math.round(size.w * 0.011))}" font-weight="900" text-anchor="middle" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
    }
    start = end;
  });

  if (!state.showLegend) return out;
  const legendX = Math.round(size.w * (wide ? 0.64 : 0.18));
  const legendY = Math.round(size.h * (wide ? 0.38 : 0.74));
  const itemH = Math.max(34, Math.round(size.h * 0.045));
  const dot = Math.max(14, Math.round(size.w * 0.012));
  cleanRows.forEach((row, index) => {
    const yy = legendY + index * itemH;
    const pct = Math.round(Math.abs(row.value) / total * 100);
    const label = row.label.length > 28 ? row.label.slice(0, 27) + '...' : row.label;
    out += `<circle cx="${legendX}" cy="${yy}" r="${dot / 2}" fill="${seriesFill(index)}"/>`;
    out += text(legendX + dot + 16, yy + dot * 0.32, label || `Element ${index + 1}`, `fill="${colors.text}" font-size="${Math.max(15, Math.round(size.w * 0.014))}" font-weight="650" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
    if (state.showValues) out += text(legendX + Math.round(size.w * 0.27), yy + dot * 0.32, `${pct}%`, `fill="${colors.muted}" font-size="${Math.max(14, Math.round(size.w * 0.012))}" font-weight="850" text-anchor="end" font-family="Inter, Segoe UI, system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderBubble(rows, size, colors, palette){
  const cleanRows = rows.filter(row => Number.isFinite(row.value)).slice(0, 14);
  if (!cleanRows.length) return emptyMarkup(size, colors);
  const x = Math.round(size.w * 0.10);
  const y = Math.round(size.h * 0.24);
  const w = Math.round(size.w * (state.showLegend ? 0.58 : 0.80));
  const h = Math.round(size.h * 0.58);
  const max = Math.max(...cleanRows.map(row => Math.abs(row.value)), 1);
  const slots = [
    [0.50,0.48,1.00],[0.27,0.42,.74],[0.73,0.42,.70],[0.38,0.72,.58],[0.63,0.72,.54],
    [0.16,0.66,.46],[0.84,0.66,.44],[0.18,0.24,.40],[0.82,0.24,.38],[0.50,0.18,.34],
    [0.31,0.18,.32],[0.69,0.18,.30],[0.08,0.45,.28],[0.92,0.45,.26]
  ];
  let out = plotSurface(x - 18, y - 18, w + 36, h + 36, colors);
  cleanRows.forEach((row, index) => {
    const slot = slots[index % slots.length];
    const radius = Math.max(34, Math.min(132, Math.sqrt(Math.abs(row.value) / max) * 112 * slot[2] * state.weight));
    const cx = x + slot[0] * w;
    const cy = y + slot[1] * h;
    const label = row.label.length > 14 ? row.label.slice(0, 13) + '...' : row.label;
    out += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${seriesFill(index)}" opacity=".88" stroke="${brightenColor(palette[index], .38)}" stroke-width="2"/>`;
    out += `<circle cx="${cx - radius * .28}" cy="${cy - radius * .28}" r="${radius * .28}" fill="#ffffff" opacity=".14"/>`;
    out += text(cx, cy - 4, label || `Element ${index + 1}`, `fill="#ffffff" font-size="${Math.max(13, Math.min(22, radius * .22))}" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    if (state.showValues) out += text(cx, cy + Math.max(16, radius * .24), formatValue(row.value), `fill="#ffffff" font-size="${Math.max(12, Math.min(20, radius * .20))}" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  return out;
}
function renderFunnel(rows, size, colors, palette){
  const cleanRows = rows.filter(row => Number.isFinite(row.value)).slice(0, 8);
  if (!cleanRows.length) return emptyMarkup(size, colors);
  const max = Math.max(...cleanRows.map(row => Math.max(0, Math.abs(row.value))), 1);
  const cx = Math.round(size.w * (state.showLegend ? 0.38 : 0.50));
  const top = Math.round(size.h * 0.24);
  const h = Math.round(size.h * 0.58);
  const maxW = Math.round(size.w * (state.showLegend ? 0.50 : 0.66));
  const stepH = h / cleanRows.length;
  let out = `<rect x="${cx - maxW / 2 - 26}" y="${top - 22}" width="${maxW + 52}" height="${h + 44}" rx="24" fill="${colors.surface}" stroke="${colors.surfaceStroke}" stroke-width="1.2"/>`;
  cleanRows.forEach((row, index) => {
    const value = Math.max(0, Math.abs(row.value));
    const nextValue = index < cleanRows.length - 1 ? Math.max(0, Math.abs(cleanRows[index + 1].value)) : value * 0.72;
    const topW = Math.max(maxW * 0.18, maxW * (value / max));
    const bottomW = Math.max(maxW * 0.14, maxW * (nextValue / max));
    const y1 = top + index * stepH;
    const y2 = y1 + stepH - 7;
    const points = [
      {x:cx - topW / 2, y:y1},
      {x:cx + topW / 2, y:y1},
      {x:cx + bottomW / 2, y:y2},
      {x:cx - bottomW / 2, y:y2}
    ];
    const label = row.label.length > 24 ? row.label.slice(0, 23) + '...' : row.label;
    out += polygon(points, `fill="${seriesFill(index)}" stroke="${brightenColor(palette[index], .34)}" stroke-width="1.2" opacity=".96"`);
    out += text(cx, y1 + stepH * .45, label || `Etape ${index + 1}`, `fill="#ffffff" font-size="${Math.max(15, Math.round(size.w * 0.012))}" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
    if (state.showValues) out += text(cx, y1 + stepH * .68, formatValue(row.value), `fill="#ffffff" font-size="${Math.max(13, Math.round(size.w * 0.010))}" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif" opacity=".88"`);
  });
  return out;
}
function renderRadar(rows, size, colors, palette){
  const values = rows.map(row => Math.max(0, row.value));
  const max = Math.max(...values, 1);
  const cx = Math.round(size.w * (state.showLegend ? 0.39 : 0.50));
  const cy = Math.round(size.h * 0.54);
  const r = Math.round(Math.min(size.w, size.h) * 0.25 * state.weight);
  const count = rows.length;
  let out = `<circle cx="${cx}" cy="${cy}" r="${r + 52}" fill="${colors.surface}" stroke="${colors.surfaceStroke}" stroke-width="1.2"/>`;
  for (let ring = 1; ring <= 5; ring++) {
    const rr = r * ring / 5;
    const pts = rows.map((row, index) => polar(cx, cy, rr, -Math.PI / 2 + index / count * Math.PI * 2));
    out += polygon(pts, `fill="none" stroke="${colors.grid}" stroke-width="1"${ring === 5 ? '' : ' stroke-dasharray="4 8"'} `);
  }
  const dataPoints = rows.map((row, index) => polar(cx, cy, r * Math.max(0, row.value) / max, -Math.PI / 2 + index / count * Math.PI * 2));
  rows.forEach((row, index) => {
    const angle = -Math.PI / 2 + index / count * Math.PI * 2;
    const end = polar(cx, cy, r, angle);
    const label = polar(cx, cy, r + 36, angle);
    out += `<line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" stroke="${colors.grid}" stroke-width="1"/>`;
    out += text(label.x, label.y + 5, row.label.length > 12 ? row.label.slice(0, 11) + '...' : row.label, `fill="${colors.muted}" font-size="15" font-weight="800" text-anchor="middle" font-family="system-ui, Arial, sans-serif"`);
  });
  out += polygon(dataPoints, `fill="${colors.accent}" opacity=".25" stroke="${colors.accent}" stroke-width="${Math.max(4, 5 * state.weight)}"`);
  dataPoints.forEach((point, index) => {
    out += `<circle cx="${point.x}" cy="${point.y}" r="6" fill="${seriesFill(index)}" stroke="${colors.text}" stroke-width="2"/>`;
  });
  return out;
}
function emptyMarkup(size, colors){
  return `<text x="${size.w / 2}" y="${size.h / 2}" fill="${colors.text}" font-size="34" font-weight="900" text-anchor="middle" font-family="system-ui, Arial, sans-serif">Ajoute au moins une donnee</text>`;
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
  else if (state.chartType === 'linearGraph') body = renderLinearGraph(rows, size, colors, palette);
  else if (state.chartType === 'area') body = renderLineOrArea(rows, size, colors, palette, true);
  else if (state.chartType === 'pie') body = renderPieOrDonut(rows, size, colors, palette, false);
  else if (state.chartType === 'donut') body = renderPieOrDonut(rows, size, colors, palette, true);
  else if (state.chartType === 'donutTable') body = renderDonutTable(rows, size, colors, palette);
  else if (state.chartType === 'bubble') body = renderBubble(rows, size, colors, palette);
  else if (state.chartType === 'funnel') body = renderFunnel(rows, size, colors, palette);
  else if (state.chartType === 'radar') body = renderRadar(rows, size, colors, palette);

  const isGlitter = ['glitterBar','glitterBarNoShadow','glitterBar2','glitterBar2NoShadow'].includes(state.chartType);
  const hasCustomChrome = ['donutTable','linearGraph'].includes(state.chartType);
  const chrome = isGlitter ? legendMarkup(rows, size, colors, palette) : `${hasCustomChrome ? '' : headerMarkup(size, colors)}${hasCustomChrome ? '' : legendMarkup(rows, size, colors, palette)}`;
  const defs = isGlitter ? '' : seriesDefs(palette, colors);
  const motion = motionMarkup(colors);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size.w}" height="${size.h}" viewBox="0 0 ${size.w} ${size.h}" role="img" aria-label="${attr(state.title || 'Graphique')}">
  ${backgroundMarkup(size, state.transparent)}
  ${defs}
  ${motion}
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
      <input data-field="label" type="text" value="${attr(row.label)}" aria-label="Libelle ligne ${index + 1}">
      <input data-field="value" type="number" step="0.01" value="${attr(row.value)}" aria-label="Valeur ligne ${index + 1}">
      <input data-field="color" type="color" value="${attr(normalizeColor(row.color, AUTO_COLORS[index % AUTO_COLORS.length]))}" aria-label="Couleur ligne ${index + 1}">
      <button class="rowRemove" type="button" data-remove-row="${index}" aria-label="Supprimer la ligne ${index + 1}">&times;</button>
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
  els.showAxis.checked = state.showAxis;
  els.transparent.checked = state.transparent;
  els.enableAnimations.checked = state.enableAnimations;
  els.animationDuration.value = String(state.animationDuration);
  els.animationDelay.value = String(state.animationDelay);
  els.animationStagger.value = String(state.animationStagger);
  els.valuePlacement.value = state.valuePlacement;
  els.horizontalShape.value = state.horizontalShape;
  els.glitterRoundness.value = String(state.glitterRoundness);
  els.sort.value = state.sort;
  els.compareMode.checked = state.compareMode;
  els.compareMethod.value = state.compareMethod;
  els.decimals.value = String(state.decimals);
  els.weight.value = String(state.weight);
  els.titleScale.value = String(state.titleScale);
  els.valueScale.value = String(state.valueScale);
  els.fontFamily.value = state.fontFamily;
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
  renderLibrary();
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
  state.showAxis = els.showAxis.checked;
  state.transparent = els.transparent.checked;
  state.enableAnimations = els.enableAnimations.checked;
  state.animationDuration = clamp(els.animationDuration.value, 0.6, 3, 1);
  state.animationDelay = clamp(els.animationDelay.value, 0, 3, 1);
  state.animationStagger = clamp(els.animationStagger.value, 0, 0.35, 0.12);
  state.valuePlacement = oneOf(els.valuePlacement.value, ['outside','inside'], 'outside');
  state.horizontalShape = oneOf(els.horizontalShape.value, ['rounded','glitter2'], 'rounded');
  state.glitterRoundness = clamp(els.glitterRoundness.value, 0.5, 3, 1);
  state.sort = oneOf(els.sort.value, ['none','asc','desc'], 'none');
  state.compareMode = els.compareMode.checked;
  state.compareMethod = oneOf(els.compareMethod.value, ['ratio','difference','evolution'], 'ratio');
  state.decimals = clamp(els.decimals.value, 0, 2, 0);
  state.weight = clamp(els.weight.value, 0.7, 1.5, 1);
  state.titleScale = clamp(els.titleScale.value, 0.7, 1.25, 1);
  state.valueScale = clamp(els.valueScale.value, 0.7, 1.35, 1);
  state.fontFamily = oneOf(els.fontFamily.value, FONT_FAMILIES, 'system');
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
  state.rows.push({label:`Donnee ${state.rows.length + 1}`, value:10, color:AUTO_COLORS[state.rows.length % AUTO_COLORS.length]});
  renderAll();
  scheduleSave();
}
function removeRow(index){
  if (state.rows.length <= 1) return toast('Garde au moins une ligne de donnees.');
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
  toast('Graphique reinitialise.');
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
    toast('SVG copie dans le presse-papiers.');
  }catch{
    downloadBlob(svg, filename('svg'), 'image/svg+xml;charset=utf-8');
    toast('Copie impossible : SVG telecharge a la place.');
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
      toast('PNG exporte.');
    }, 'image/png');
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    toast('Export PNG impossible : SVG non lisible.');
  };
  img.src = url;
}
function bind(){
  [els.title, els.subtitle, els.source, els.chartType, els.theme, els.format, els.palette, els.showValues, els.showLegend, els.showGrid, els.showAxis, els.transparent, els.enableAnimations, els.animationDuration, els.animationDelay, els.animationStagger, els.valuePlacement, els.horizontalShape, els.glitterRoundness, els.sort, els.compareMode, els.compareMethod, els.decimals, els.weight, els.titleScale, els.valueScale, els.fontFamily]
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
  els.saveGraph.addEventListener('click', () => upsertLibraryItem('graph'));
  els.saveTemplate.addEventListener('click', () => upsertLibraryItem('template'));
  els.libraryList.addEventListener('click', handleLibraryClick);
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
loadLibrary();
bind();
renderAll();
save(true);
initHistory();
