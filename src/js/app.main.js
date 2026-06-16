const ICONS = {
  text:'<path d="M4 7V5h16v2M9 5v14M15 5v14M7 19h4M13 19h4"/>',
  textarea:'<rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="17" y2="13"/>',
  email:'<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  number:'<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  url:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  password:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  date:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  time:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  select:'<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="8 11 12 15 16 11"/>',
  state:'<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  radio:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  checkboxes:'<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  checkbox:'<rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="8 12 11 15 16 9"/>',
  toggle:'<rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="16" cy="12" r="3" fill="currentColor"/>',
  range:'<line x1="3" y1="12" x2="21" y2="12"/><circle cx="14" cy="12" r="3" fill="currentColor"/>',
  rating:'<polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17 5.5 21 7 14 2 9.3 9 9"/>',
  file:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  color:'<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20"/>',
  heading:'<path d="M6 4v16M18 4v16M6 12h12"/>',
  paragraph:'<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="14" x2="16" y2="14"/><line x1="4" y1="18" x2="13" y2="18"/>',
  divider:'<line x1="3" y1="12" x2="21" y2="12"/>',
  block:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  signature:'<path d="M3 17c2.5-3.5 5-6.5 7-4.5s2 6 4 5 2.5-5 5-5"/><line x1="3" y1="20.5" x2="21" y2="20.5"/>',
};
const FIELD_TYPES = [
  { group:'Text inputs', type:'text',     label:'Short text',  ph:true },
  { group:'Text inputs', type:'textarea', label:'Long text',   ph:true },
  { group:'Text inputs', type:'email',    label:'Email',       ph:true },
  { group:'Text inputs', type:'phone',    label:'Phone',       ph:true },
  { group:'Text inputs', type:'number',   label:'Number',      ph:true },
  { group:'Text inputs', type:'url',      label:'Website / URL',ph:true },
  { group:'Text inputs', type:'password', label:'Password',    ph:true },
  { group:'Date & time', type:'date',     label:'Date' },
  { group:'Date & time', type:'time',     label:'Time' },
  { group:'Date & time', type:'totaltime',label:'Total Time' },
  { group:'Choices',     type:'select',   label:'Dropdown',    opts:true },
  { group:'Choices',     type:'state',    label:'State (searchable)' },
  { group:'Choices',     type:'radio',    label:'Radio group', opts:true },
  { group:'Choices',     type:'checkboxes',label:'Checkboxes', opts:true },
  { group:'Choices',     type:'checkbox', label:'Single checkbox' },
  { group:'Choices',     type:'toggle',   label:'Yes / No toggle' },
  { group:'Choices',     type:'matrix',   label:'Scale' },
  { group:'Advanced',    type:'range',    label:'Slider' },
  { group:'Advanced',    type:'rating',   label:'Star rating' },
  { group:'Advanced',    type:'file',     label:'File upload' },
  { group:'Advanced',    type:'signature',label:'Signature' },
  { group:'Content',     type:'heading',  label:'Heading' },
  { group:'Content',     type:'paragraph',label:'Paragraph' },
  { group:'Content',     type:'divider',  label:'Divider' },
  { group:'Content',     type:'statusbar',label:'Progress bar' },
];
let FORM={id:null,title:'',desc:'',rows:[],weightGroups:[],scoringGroups:[],scoringSections:[],visibilityGroups:[]};
let FORMS=[];
let SELECTED=null;
let MODE='build';
let BLOCKS=[];
let BLOCK_SELECT_MODE=false;   // when true, clicking canvas fields toggles block membership
let BLOCK_SEL=[];              // selected field ids (order resolved by canvas position)
let SAVEBLOCK_FIELDS=null;     // candidate field objects shown in the Save-as-block modal
let SAVEBLOCK_ROW_IDX=null;
let draggedElement=null;
let draggedData=null;
let EXPORT_MODE='json';
// Whether the exported patient-facing HTML form shows the live score panel
// (running totals + severity bands). OFF by default: for clinical screeners
// (PHQ-9/GAD-7) surfacing a real-time severity classification to the
// respondent is usually inappropriate. Builder Preview always shows it; the
// HTML export only shows it when the user explicitly opts in via the toggle.
let EXPORT_SHOW_SCORES=false;

/* ===== User rights state =====
   USERS: directory of all known users (id, name, email, role).
   CURRENT_USER_ID: which user we're currently "logged in as" (the user switcher).
   Roles: 'admin' (full access to everything + can manage users),
          'editor' (can create forms + edit/share forms they own or have edit access to),
          'viewer' (read-only; can only see forms shared to them with view access).
   Per-form sharing is stored on each form as { ownerId, shares: [{userId, access}] }
   where access is 'edit' or 'view'. The owner always has full control. Admins
   bypass per-form checks entirely. */
let USERS=[];
let CURRENT_USER_ID=null;
let SHARE_FORM_ID=null;  // which form the Share modal is currently editing

/* ===== Form groups / search state =====
   GROUPS: { id, name, color, ownerId } — lightweight clusters that forms can
   belong to. A form's groupId is stored on the form itself.
   FILTER_GROUP_ID: which group is currently selected in the Forms Manager
     sidebar. Special values: 'all' (show everything) and 'ungrouped'
     (show only forms with no group).
   FORM_SEARCH: the current search query string, lowercased; '' means no
     filter. Search runs over title, description, owner name, group name,
     and every field label in the form. */
let GROUPS=[];
let FILTER_GROUP_ID='all';
let FORM_SEARCH='';
// Forms Manager list pagination. Page is 1-indexed and reset to 1 whenever the
// filter or search changes so the user never lands on an out-of-range page.
let FORMS_PAGE=1;
const FORMS_PER_PAGE=8;
// Builder multi-page support. Rows carry an optional `page` (1-indexed; absent
// means page 1). BUILDER_PAGE is which page the canvas is currently editing,
// and PREVIEW_PAGE is which page the preview is showing. The underlying
// FORM.rows array stays flat — pages are a view filter — so all row/field
// index, drag, delete, and weight-group logic is unchanged.
let BUILDER_PAGE=1;
let PREVIEW_PAGE=1;
// Which audience the preview simulates: 'clinician' (the internal/user view —
// sees clinician-only fields and the score panel) or 'patient' (what the
// client sees — clinician-only fields and, unless allowed, scores are hidden).
let PREVIEW_VIEW='clinician';
function setPreviewView(v){ PREVIEW_VIEW=(v==='patient')?'patient':'clinician'; if(MODE==='preview') renderPreview(); }
// A field is hidden in the preview when it's patient-only-hidden AND we're
// currently simulating the patient view.
function fieldHiddenInPreview(f){ return fieldHiddenFromPatient(f) && PREVIEW_VIEW==='patient'; }
// Completion progress for the preview — mirrors the exported form's bar so the
// designer sees the same "filled out" behavior. Counts answered, currently
// visible, fillable fields across all visible pages (content fields excluded).
const NON_FILLABLE_TYPES=new Set(['heading','divider','statusbar']); // paragraph is a fillable textarea here
function previewAnswerFilled(f){
  const a=PREVIEW_ANSWERS[f.id];
  if(a==null) return false;
  if(a instanceof Set) return a.size>0;
  if(typeof a==='string') return a.trim()!=='';
  if(typeof a==='boolean') return a===true;
  if(typeof a==='number') return !isNaN(a);
  if(typeof a==='object') return Object.keys(a).length>0;
  return !!a;
}
function previewHasFillable(){
  return FORM.rows.some(r=>(r.fields||[]).some(f=>!NON_FILLABLE_TYPES.has(f.type) && !fieldHiddenInPreview(f)));
}
function previewProgressPct(){
  const visPages=visiblePreviewPages();
  let total=0, done=0;
  FORM.rows.forEach(row=>{
    if(visPages.indexOf(pageOf(row))<0) return;
    if(!evalShowIf(row.showIf)) return;
    (row.fields||[]).forEach(f=>{
      if(NON_FILLABLE_TYPES.has(f.type)) return;
      if(!evalShowIf(f.showIf) || !groupVisible(f) || fieldHiddenInPreview(f)) return;
      total++; if(previewAnswerFilled(f)) done++;
    });
  });
  return total ? Math.round(done/total*100) : 0;
}
// Patch the preview progress bar in place (no full re-render) so it tracks
// completion live as the designer fills fields in.
function updatePreviewProgress(){
  const mount=document.getElementById('preview-mount'); if(!mount) return;
  const fill=mount.querySelector('.pf-progress-fill');
  const ind=mount.querySelector('.pf-page-indicator');
  if(fill || ind){
    const pct=previewProgressPct();
    if(fill) fill.style.width=pct+'%';
    if(ind){
      const vp=visiblePreviewPages(); const vt=vp.length; const vpos=vp.indexOf(PREVIEW_PAGE);
      ind.textContent=(vt>1?('Page '+(vpos+1)+' of '+vt):'');
    }
  }
  // Status-bar FIELDS (there can be several, each with its own calc mode).
  mount.querySelectorAll('.pf-statusbar').forEach(sb=>{
    const f=findFieldById(sb.dataset.fid); if(!f) return;
    const pct=statusBarPct(f);
    const bf=sb.querySelector('.pf-statusbar-fill'); if(bf) bf.style.width=pct+'%';
    const pl=sb.querySelector('.pf-statusbar-pct'); if(pl) pl.textContent=pct+'%';
    sb.setAttribute('aria-valuenow', pct);
  });
}
/* ----- Status-bar field: completion calculation -----
   Default: completion of all fillable fields ABOVE the bar (document order).
   calcPages: page-based — fully-completed pages / total pages.
   calcFieldsPages: blended — (completed pages before this bar's page + the
   bar page's field fraction) / total pages. */
function hasStatusBarField(){ return FORM.rows.some(r=>(r.fields||[]).some(f=>f.type==='statusbar')); }
function statusBarPosition(fieldId){
  for(let r=0;r<FORM.rows.length;r++){
    const fi=FORM.rows[r].fields.findIndex(f=>f.id===fieldId);
    if(fi>=0) return {rowIdx:r, fieldIdx:fi};
  }
  return null;
}
function _pvFieldVisible(f){ return evalShowIf(f.showIf) && groupVisible(f) && !fieldHiddenInPreview(f) && !NON_FILLABLE_TYPES.has(f.type); }
function fieldsAbovePct(barId){
  const pos=statusBarPosition(barId); if(!pos) return 0;
  const visPages=visiblePreviewPages();
  let total=0, done=0;
  for(let r=0;r<=pos.rowIdx;r++){
    const row=FORM.rows[r];
    if(visPages.indexOf(pageOf(row))<0) continue;
    if(!evalShowIf(row.showIf)) continue;
    const lastF=(r===pos.rowIdx)?pos.fieldIdx:row.fields.length;
    for(let fi=0; fi<lastF; fi++){
      const f=row.fields[fi];
      if(!_pvFieldVisible(f)) continue;
      total++; if(previewAnswerFilled(f)) done++;
    }
  }
  return total ? Math.round(done/total*100) : 0;
}
function _pvPageCompletion(pageNum){
  let total=0, done=0;
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==pageNum) return;
    if(!evalShowIf(row.showIf)) return;
    row.fields.forEach(f=>{ if(!_pvFieldVisible(f)) return; total++; if(previewAnswerFilled(f)) done++; });
  });
  return {total,done};
}
function pagesPct(){
  const vp=visiblePreviewPages(); if(!vp.length) return 0;
  let completed=0;
  vp.forEach(p=>{ const c=_pvPageCompletion(p); if(c.total===0 || c.done>=c.total) completed++; });
  return Math.round(completed/vp.length*100);
}
function fieldsAndPagesPct(barId){
  const vp=visiblePreviewPages(); if(!vp.length) return 0;
  const pos=statusBarPosition(barId);
  const barPage = pos ? pageOf(FORM.rows[pos.rowIdx]) : vp[vp.length-1];
  const barIdx = Math.max(0, vp.indexOf(barPage));
  let completed=0;
  for(let i=0;i<barIdx;i++){ const c=_pvPageCompletion(vp[i]); if(c.total===0 || c.done>=c.total) completed++; }
  const cur=_pvPageCompletion(barPage);
  const frac = cur.total>0 ? (cur.done/cur.total) : 1;
  return Math.round(((completed+frac)/vp.length)*100);
}
// Progress-bar field accessors (back-compat: map legacy calcPages/topBottom).
function pbMode(f){ return f.progressMode || (f.calcPages?'allPages':(f.calcFieldsPages?'pageBetween':'aboveForm')); }
function pbPlace(f){ return f.progressPlacement || (f.topBottom?'both':'bottom'); }
function onePagePct(barId){
  const pos=statusBarPosition(barId);
  const barPage = pos ? pageOf(FORM.rows[pos.rowIdx]) : PREVIEW_PAGE;
  const c=_pvPageCompletion(barPage);
  return c.total ? Math.round(c.done/c.total*100) : 0;
}
function statusBarPct(field){
  const m=pbMode(field);
  if(m==='allPages') return previewProgressPct();   // every fillable field, all pages
  if(m==='pageBetween') return onePagePct(field.id); // just this bar's page
  return fieldsAbovePct(field.id);                   // aboveForm (default): fields above the bar
}
function statusBarModeLabel(field){
  const m=pbMode(field);
  if(m==='allPages') return 'all pages';
  if(m==='pageBetween') return 'this page';
  return 'fields above';
}
function previewStatusBarHTML(f){
  const pct=statusBarPct(f);
  return `<div class="pf-statusbar" data-fid="${esc(f.id)}" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(f.label||'Progress')}">
    <div class="pf-statusbar-head"><span class="pf-statusbar-label">${esc(f.label||'Progress')}</span><span class="pf-statusbar-pct">${pct}%</span></div>
    <div class="pf-statusbar-track"><div class="pf-statusbar-fill" style="width:${pct}%"></div></div>
  </div>`;
}
// When true, the canvas renders every page stacked vertically instead of
// filtering to BUILDER_PAGE. Persisted per form (FORM.showAllPages) so each
// form remembers the user's preferred view. Preview is unaffected — it always
// paginates because it simulates what the patient will see.
let SHOW_ALL_PAGES=false;
// In-memory map of preview answers keyed by field.id.
// Format per scoreable field:
//   radio/select: a single option index (number) or null
//   checkboxes:   a Set of selected option indices
// Populated by the preview's change handler so cross-page navigation in a
// multi-page form doesn't reset the running score when a page's inputs
// leave the DOM. Reset on preview entry, form load, and explicit form reset.
let PREVIEW_ANSWERS={};
function resetPreviewAnswers(){ PREVIEW_ANSWERS={}; PREVIEW_POPUP_OPENED={}; try{ popupFormClose(); }catch(e){} }

function uid(prefix){return (prefix||'f')+'_'+Math.random().toString(36).slice(2,11);}

// Field types that stay readable at half-width on a phone (allowed 2-across on mobile).
// Everything else stacks to full width on small screens.
const SHORT_TYPES=new Set(['text','number','date','time','phone','select','range','rating','color']);
// Sensible default column span (out of 12) when a field is first added.
const DEFAULT_SPAN={textarea:12,radio:12,checkboxes:12,select:6,email:6,url:6,file:6,heading:12,paragraph:12,divider:12,signature:12,totaltime:12,statusbar:12,matrix:12};
function defaultSpanFor(type){ return DEFAULT_SPAN[type]||3; }

// US states + DC, shown as "Name (AB)" so the dropdown is searchable by either
// the full name or the two-letter abbreviation. Used by the "State" field type.
const US_STATES=['Alabama (AL)','Alaska (AK)','Arizona (AZ)','Arkansas (AR)','California (CA)','Colorado (CO)','Connecticut (CT)','Delaware (DE)','District of Columbia (DC)','Florida (FL)','Georgia (GA)','Hawaii (HI)','Idaho (ID)','Illinois (IL)','Indiana (IN)','Iowa (IA)','Kansas (KS)','Kentucky (KY)','Louisiana (LA)','Maine (ME)','Maryland (MD)','Massachusetts (MA)','Michigan (MI)','Minnesota (MN)','Mississippi (MS)','Missouri (MO)','Montana (MT)','Nebraska (NE)','Nevada (NV)','New Hampshire (NH)','New Jersey (NJ)','New Mexico (NM)','New York (NY)','North Carolina (NC)','North Dakota (ND)','Ohio (OH)','Oklahoma (OK)','Oregon (OR)','Pennsylvania (PA)','Rhode Island (RI)','South Carolina (SC)','South Dakota (SD)','Tennessee (TN)','Texas (TX)','Utah (UT)','Vermont (VT)','Virginia (VA)','Washington (WA)','West Virginia (WV)','Wisconsin (WI)','Wyoming (WY)'];

function defaultField(type,over){
  const t=type||'text';
  // The "State" palette entry is a dropdown pre-loaded with all US states + DC.
  // It is a real `select` under the hood, so it inherits every select behavior
  // (conditions, prefill, export, the searchable custom dropdown) for free.
  if(t==='state'){
    return defaultField('select', Object.assign({label:'State', options:US_STATES.slice()}, over||{}));
  }
  // Use the friendly type name as the default label (e.g. "Short text",
  // "Email", "Date") so a freshly-dropped field is self-describing on the
  // canvas. The user can still rename via the inspector. Heading and
  // paragraph fields get more useful seed text since their label IS the
  // rendered content.
  const typeDef=FIELD_TYPES.find(f=>f.type===t);
  let defaultLabel = typeDef ? typeDef.label : 'Untitled field';
  if(t==='heading')   defaultLabel='Section heading';
  if(t==='divider')   defaultLabel='Divider';
  const base={id:uid('f'),type:t,label:defaultLabel,span:defaultSpanFor(t)};
  // Paragraph is a long free-text answer box: clear label + placeholder hint.
  if(t==='paragraph'){ base.label='Paragraph'; base.placeholder='Add a paragraph of text…'; }
  // Status bar: a draggable progress/completion indicator. By default it
  // reflects completion of all fields ABOVE it (typical bottom-of-page use).
  // calcPages → page-based; calcFieldsPages → blended fields+pages; topBottom →
  // render at both the top and bottom of its page.
  if(t==='statusbar'){ base.label='Progress'; base.progressMode='aboveForm'; base.progressPlacement='bottom'; }
  if(t==='matrix'){
    base.label='Over the last 2 weeks, how often have you been bothered by the following?';
    base.matrixRows=['Little interest or pleasure in doing things','Feeling down, depressed, or hopeless','Trouble falling/staying asleep, or sleeping too much'];
    base.matrixCols=['Not at all','Several days','More than half the days','Nearly every day'];
    base.matrixColImages=[];
  }
  return Object.assign(base,over||{});
}
function matrixGridHTML(field, mode){
  const rows=Array.isArray(field.matrixRows)?field.matrixRows:[];
  const cols=(Array.isArray(field.matrixCols)?field.matrixCols:[]).slice(0,5);
  const fid=field.id;
  const ans=(mode==='preview' && PREVIEW_ANSWERS[fid] && typeof PREVIEW_ANSWERS[fid]==='object')?PREVIEW_ANSWERS[fid]:null;
  const imgs=Array.isArray(field.matrixColImages)?field.matrixColImages:[];
  const head=`<tr><th class="mx-q"></th>${cols.map((c,ci)=>{const im=imgs[ci];return `<th class="mx-c">${im?`<img class="mx-img" src="${im}" alt="${esc(c)}">`:''}${c?`<span class="mx-c-txt">${esc(c)}</span>`:''}</th>`;}).join('')}</tr>`;
  const body=rows.map((q,ri)=>{
    const cells=cols.map((c,ci)=>{
      const nm=(mode==='card')?'':` name="mx_${fid}_${ri}"`;
      const dis=(mode==='card')?' disabled':'';
      const checked=(ans && Number(ans[ri])===ci)?' checked':'';
      const reqA=(mode==='export' && field.required && ci===0)?' required':'';
      const onch=(mode==='preview')?` onchange="previewMatrixPick('${fid}',${ri},${ci})"`:'';
      const dataA=(mode==='export')?` data-mrow="${ri}" data-opt-idx="${ci}"`:'';
      return `<td class="mx-cell"><input type="radio"${nm}${dataA}${checked}${dis}${reqA}${onch} aria-label="${esc(q)} \u2014 ${esc(c)}"></td>`;
    }).join('');
    return `<tr><td class="mx-q">${esc(q)}</td>${cells}</tr>`;
  }).join('');
  const empty=`<tr><td class="mx-empty" colspan="${cols.length+1}">Add questions and answer choices in the field settings.</td></tr>`;
  return `<div class="matrix-wrap${mode==='card'?' matrix-card':''}"><table class="matrix-tbl"><thead>${head}</thead><tbody>${body||empty}</tbody></table></div>`;
}
function previewMatrixPick(fid,ri,ci){
  if(!PREVIEW_ANSWERS[fid] || typeof PREVIEW_ANSWERS[fid]!=='object') PREVIEW_ANSWERS[fid]={};
  PREVIEW_ANSWERS[fid][ri]=ci;
}
function updateMatrixRows(id,val){
  if(typeof currentFormReadOnly==='function' && currentFormReadOnly()) return;
  const f=findFieldById(id); if(!f) return;
  f.matrixRows=String(val).split('\n').map(x=>x.trim()).filter(Boolean);
  if(typeof saveForm==='function') saveForm();
  if(typeof MODE!=='undefined' && MODE==='preview' && typeof renderPreview==='function') renderPreview();
}
function updateMatrixCols(id,val){
  if(typeof currentFormReadOnly==='function' && currentFormReadOnly()) return;
  const f=findFieldById(id); if(!f) return;
  f.matrixCols=String(val).split('\n').map(x=>x.trim()).filter(Boolean).slice(0,5);
  if(typeof saveForm==='function') saveForm();
  if(typeof MODE!=='undefined' && MODE==='preview' && typeof renderPreview==='function') renderPreview();
}
function setMatrixColImage(fieldId, idx, input){
  if(typeof currentFormReadOnly==='function' && currentFormReadOnly()) return;
  const f=findFieldById(fieldId); if(!f || !input.files || !input.files[0]) return;
  const reader=new FileReader();
  reader.onload=function(e){
    const src=e.target.result;
    const img=new Image();
    img.onload=function(){
      let url=src;
      try{
        const max=200; let w=img.width||max, h=img.height||max;
        if(w>max||h>max){ const r=Math.min(max/w,max/h); w=Math.round(w*r); h=Math.round(h*r); }
        const cv=document.createElement('canvas'); cv.width=w; cv.height=h;
        cv.getContext('2d').drawImage(img,0,0,w,h);
        url=cv.toDataURL('image/png');
      }catch(err){ url=src; }
      if(!Array.isArray(f.matrixColImages)) f.matrixColImages=[];
      f.matrixColImages[idx]=url;
      if(typeof saveForm==='function') saveForm();
      render();
    };
    img.onerror=function(){ if(!Array.isArray(f.matrixColImages)) f.matrixColImages=[]; f.matrixColImages[idx]=src; if(typeof saveForm==='function') saveForm(); render(); };
    img.src=src;
  };
  reader.readAsDataURL(input.files[0]);
}
function clearMatrixColImage(fieldId, idx){
  if(typeof currentFormReadOnly==='function' && currentFormReadOnly()) return;
  const f=findFieldById(fieldId); if(!f) return;
  if(Array.isArray(f.matrixColImages)) f.matrixColImages[idx]='';
  if(typeof saveForm==='function') saveForm();
  render();
}

/* True when a field's label looks like the default label for its type — i.e.
   the user hasn't customized it yet. Used when changing field type to decide
   whether it's safe to swap the label too. We also accept the legacy
   "Untitled field" label so old forms don't get stuck with stale defaults
   the first time a type change happens. */
function isLabelDefault(field){
  if(!field) return false;
  if(field.label==='Untitled field') return true;
  const td=FIELD_TYPES.find(f=>f.type===field.type);
  if(td && field.label===td.label) return true;
  // Content fields have their own custom defaults from defaultField().
  if(field.type==='heading'   && field.label==='Section heading') return true;
  if(field.type==='paragraph' && field.label==='Paragraph') return true;
  if(field.type==='divider'   && field.label==='Divider') return true;
  return false;
}

function renderFieldsTab(){
  let html='';
  let currentGroup='';
  FIELD_TYPES.forEach(f=>{
    if(f.group!==currentGroup){html+=`<div class="pal-group-h">${f.group}</div>`;currentGroup=f.group;}
    html+=`<div class="pal-item" draggable="true" data-type="${f.type}"><div class="pal-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[f.type]}</svg></div><span>${f.label}</span></div>`;
  });
  document.getElementById('left-fields').innerHTML=html;
  document.querySelectorAll('#left-fields .pal-item').forEach(item=>{
    item.addEventListener('dragstart',e=>{
      draggedData={type:'newfield',fieldType:e.currentTarget.dataset.type};
      e.dataTransfer.effectAllowed='copy';
      try{ e.dataTransfer.setData('text/plain', JSON.stringify(draggedData)); }catch(err){}
      e.currentTarget.classList.add('dragging');
    });
    item.addEventListener('dragend',e=>{
      e.currentTarget.classList.remove('dragging');
      setTimeout(()=>{ draggedData=null; },0);
    });
  });
}

function renderBlocksTab(){
  let html=`<button class="btn primary blocks-newbtn" style="width:100%;margin-bottom:10px" onclick="startBlockSelect()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New block from fields</button>`;
  if(BLOCK_SELECT_MODE){ html+=`<div class="hint" style="margin-bottom:10px">Selecting… click fields on the canvas (across any rows), then use the bar at the bottom to save them as a new block or update an existing one. Drag fields to reorder first — blocks save in the canvas order.</div>`; }
  if(BLOCKS.length===0){html+=`<div class="hint">Blocks you save will appear here. Click “New block from fields” and pick fields on the canvas, or use a row’s block icon to save that whole row.</div>`;}
  else{
    BLOCKS.forEach((b,i)=>{
      html+=`<div class="block-card" draggable="true" data-block-idx="${i}">
        <div class="block-card-head">
          <div class="bc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.block}</svg></div>
          <span class="bc-name">${esc(b.name)}</span>
          <button class="bc-del" onclick="deleteBlock(${i})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
        </div>
        <div class="block-card-body">${b.fields.map(f=>`<span class="block-chip">${esc(f.label)}</span>`).join('')}</div>
      </div>`;
    });
  }
  document.getElementById('left-blocks').innerHTML=html;
  document.querySelectorAll('#left-blocks .block-card').forEach(card=>{
    card.addEventListener('dragstart',e=>{
      draggedData={type:'block',blockIdx:parseInt(e.currentTarget.dataset.blockIdx)};
      e.dataTransfer.effectAllowed='copy';
      try{ e.dataTransfer.setData('text/plain', JSON.stringify(draggedData)); }catch(err){}
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend',e=>{
      e.currentTarget.classList.remove('dragging');
      setTimeout(()=>{ draggedData=null; },0);
    });
  });
}

function renderCanvas(){
  // Page tab bar — on single-page forms we hide the lone "Page 1" tab since
  // it adds no value; only the "+ Page" affordance shows. Once a second page
  // is added, both tabs appear automatically.
  const pages=pageCount();
  // Clamp builder page (rows may have moved/deleted since last render).
  if(BUILDER_PAGE>pages) BUILDER_PAGE=pages;
  if(BUILDER_PAGE<1) BUILDER_PAGE=1;
  let html='';
  const _blockOrder = blockSelOrderMap();
  const showTabs = pages>1;
  html+=`<div class="page-tabs${showTabs?'':' single'}">`;
  if(showTabs){
    for(let p=1;p<=pages;p++){
      const count=FORM.rows.filter(r=>pageOf(r)===p).reduce((n,r)=>n+r.fields.length,0);
      const hasRule=!!(FORM.pageRules&&FORM.pageRules[p]);
      html+=`<span class="page-tab-wrap"><button class="page-tab${p===BUILDER_PAGE?' active':''}" onclick="gotoBuilderPage(${p})">Page ${p}<span class="page-tab-count">${count}</span></button><button class="page-tab-rule${hasRule?' active':''}" onclick="openPageViz(${p})" title="${hasRule?'Page shown when '+esc(describeShowIf(FORM.pageRules[p])):'Set a visibility rule for this whole page'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></span>`;
    }
  }
  html+=`<button class="page-tab add" onclick="addBuilderPage()" title="Add a page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Page</button>`;
  html+=`</div>`;

  html+=`<div class="rows${SHOW_ALL_PAGES?' all-pages':''}">`;
  // In single-page view we filter rows to BUILDER_PAGE.
  // In all-pages view we render every row in flat order and inject a page
  // section header above the first row of each page, so the user can see and
  // edit the entire form at once. Whether we're in all-pages mode or not,
  // data-row-idx is the real flat-array index — moveRow/moveField/deleteRow
  // and every drag handler still operate on FORM.rows exactly as before.
  let lastEmittedPage=null;
  // In all-pages mode, render rows grouped by page in NUMERIC page order, not
  // raw flat-array order — otherwise a row whose page tag is out of array order
  // would drag its page section to the wrong place (e.g. "Page 1" at bottom).
  // data-row-idx still uses the REAL flat index so drag/move/delete are intact.
  const _order = FORM.rows.map((_,i)=>i);
  if(SHOW_ALL_PAGES && pages>1){
    _order.sort((a,b)=>{
      const pa=pageOf(FORM.rows[a]), pb=pageOf(FORM.rows[b]);
      if(pa!==pb) return pa-pb;
      return a-b;
    });
  }
  _order.forEach((ridx)=>{
    const row=FORM.rows[ridx];
    const rowPage=pageOf(row);
    if(!SHOW_ALL_PAGES && rowPage!==BUILDER_PAGE) return;
    // Section header: insert above the first row whose page differs from
    // whatever we last emitted. Only meaningful in all-pages mode AND when
    // the form actually has more than one page.
    if(SHOW_ALL_PAGES && pages>1 && rowPage!==lastEmittedPage){
      const fieldCount=FORM.rows.filter(r=>pageOf(r)===rowPage).reduce((n,r)=>n+r.fields.length,0);
      // Use the data-page attribute so gotoBuilderPage can find this section to scroll to.
      html+=`<div class="page-section" data-page="${rowPage}">
        <div class="page-section-h">
          <span class="page-section-name">Page ${rowPage}</span>
          <span class="page-section-count">${fieldCount} field${fieldCount===1?'':'s'}</span>
        </div>
      </div>`;
      lastEmittedPage=rowPage;
    }
    // Inter-row drop gap: drop a field/block here to create a NEW row at this
    // position (above the first row, or between any two rows) without first
    // adding an empty "drop fields here" row.
    html+=`<div class="row-gap" data-insert-idx="${ridx}" data-insert-page="${rowPage}" aria-hidden="true"></div>`;
    html+=`<div class="row${row.showIf?' row-conditional':''}" data-row-idx="${ridx}">
      <div class="row-rail">
        <button class="rr-btn grip" data-row-grip="${ridx}" title="Drag to reorder row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></svg></button>
        <button class="rr-btn" onclick="insertRowBefore(${ridx})" title="Insert row above"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 5 12 19"/><polyline points="5 12 19 12"/></svg></button>
        <button class="rr-btn del" onclick="deleteRow(${ridx})" title="Delete row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
        ${pages>1?`<button class="rr-btn movepage" onclick="promptMoveRowPage(${ridx})" title="Move row to another page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></button>`:''}
        ${ridx>0?`<button class="rr-btn breakpage${isFirstOnPage(ridx)?' active':''}" onclick="toggleBreakBefore(${ridx})" title="${isFirstOnPage(ridx)?'Remove page break (merge with previous page)':'Start a new page here'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v4"/><path d="M18 2v4"/><path d="M6 8h12"/><path d="M6 16h12"/><path d="M6 18v4"/><path d="M18 18v4"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="9" y1="12" x2="11" y2="12"/><line x1="15" y1="12" x2="17" y2="12"/><line x1="21" y1="12" x2="22" y2="12"/></svg></button>`:''}
        <button class="rr-btn viz${row.showIf?' active':''}" onclick="openRowViz(${ridx})" title="${row.showIf?'Row shown when '+esc(describeShowIf(row.showIf)):'Set a visibility rule for this whole row'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
        <button class="rr-btn" onclick="snapFillRow(${ridx})" title="Snap fields to fill the row (resize to 12 columns)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="7" height="12" rx="1"/><rect x="14" y="6" width="7" height="12" rx="1"/></svg></button>
        <button class="rr-btn" onclick="saveRowAsBlock(${ridx})" title="Save as reusable block"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.block}</svg></button>
      </div>
      <div class="row-fields" data-row-idx="${ridx}">${row.showIf?`<div class="row-cond-badge" title="This whole row is shown when ${esc(describeShowIf(row.showIf))}">👁 Row shown when ${esc(describeShowIf(row.showIf))}</div>`:''}`;
    if(row.fields.length===0){
      html+=`<div class="row-empty-hint">Drop fields here</div>`;
    }
    row.fields.forEach((field,fidx)=>{
      const inWeightGroup=FORM.weightGroups.some(g=>g.fieldIds.includes(field.id));
      const weight=fieldWeight(field.id);
      const isSelected=SELECTED&&SELECTED.fieldId===field.id;
      const span=field.span||defaultSpanFor(field.type);
      const _cv=fieldCanvasStyleVars(field);
      const _cvStyle=`--span:${span}`+(_cv.font?`;--form-font:${_cv.font}`:'')+(_cv.size!=null?`;--form-size:${_cv.size}pt`:'')+(_cv.color?`;--form-color:${_cv.color}`:'');
      const shortClass=SHORT_TYPES.has(field.type)?' fld-short':' fld-long';
      const isContentType=field.type==='heading'||field.type==='divider'||field.type==='statusbar';
      // Scoring annotation: a small badge in the corner shows which scoring
      // section the field belongs to (if any) and its max possible points.
      // Anything not in a section renders without the badge.
      const fieldSections = sectionsForField(field.id);
      const fieldMax = fieldSections.length ? fieldMaxScore(field) : 0;
      const secNames = fieldSections.map(s=>s.name).join(', ');
      const badgeLabel = fieldSections.length>1
        ? esc(fieldSections[0].name)+' +'+(fieldSections.length-1)
        : (fieldSections.length?esc(fieldSections[0].name):'');
      const scoreBadge = fieldSections.length
        ? `<div class="field-score-badge" title="${esc(secNames)} (max ${fieldMax} pts)">${badgeLabel} <span class="fsb-max">· max ${fieldMax}</span></div>`
        : '';
      const scoredClass = fieldSections.length ? ' field-scored' : '';
      // Conditional-visibility annotation: a small badge summarizing the rule
      // plus a dashed accent so branched fields are obvious on the canvas.
      // Fields stay fully visible while editing — only Preview/export hide them.
      const condClass = field.showIf ? ' field-conditional' : '';
      const condBadge = field.showIf
        ? `<div class="field-cond-badge" title="Show Fields rule — shown when ${esc(describeShowIf(field.showIf))}"><span class="fcb-tag">Show Fields</span><span class="fcb-rule">👁 ${esc(describeShowIf(field.showIf))}</span></div>`
        : '';
      const keyBadge = field.dataKey
        ? `<div class="field-key-badge" title="Auto-fills across forms via the shared key “${esc(field.dataKey)}”">⇄ ${esc(field.dataKey)}</div>`
        : '';
      const _vg = visGroupForField(field.id);
      const vgroupBadge = _vg
        ? `<div class="field-vgroup-badge" title="Visibility group${_vg.showIf?' — shown when '+esc(describeShowIf(_vg.showIf)):' (no rule set yet)'}">👁 grouped${(_vg.fieldIds||[]).length>1?' ×'+_vg.fieldIds.length:''}</div>`
        : '';
      const accessBadge = field.hidePatient ? `<div class="field-access-badge" title="Clinician-only — hidden from the patient form">🔒 clinician-only</div>` : '';
      const userScopeBadge = field.hideUsers ? `<div class="field-access-badge scoped" title="Hidden from selected roles/users in the internal view">🙈 user-scoped</div>` : '';
      const notifyBadge = fieldHasNotify(field) ? `<div class="field-notify-badge" title="Sends an SMS/Email notification on submission">🔔 notify</div>` : '';
      html+=`<div class="field ${inWeightGroup?'in-weight-group':''}${isSelected?' selected':''}${BLOCK_SELECT_MODE&&BLOCK_SEL.includes(field.id)?' block-sel':''}${_cv.any?' fstyled':''}${shortClass}${scoredClass}${condClass}" style="${_cvStyle}" data-field-id="${field.id}" data-row-idx="${ridx}" data-field-idx="${fidx}" draggable="true" onmousedown="selectFieldOnPointerDown(event,'${field.id}')" onclick="selectField(event,'${field.id}')" oncontextmenu="openFieldContextMenu(event,'${field.id}')">
        ${BLOCK_SELECT_MODE?`<div class="field-block-badge${BLOCK_SEL.includes(field.id)?' on':''}">${_blockOrder[field.id]||''}</div>`:''}
        ${inWeightGroup?`<div class="field-weight-badge">${weight}%</div>`:''}
        ${scoreBadge}
        ${condBadge}
        ${keyBadge}
        ${vgroupBadge}
        ${accessBadge}${userScopeBadge}${notifyBadge}
        ${isContentType||field.type==='checkbox'||field.type==='toggle'?'':`<div class="field-label">${esc(field.label)}${field.required?'<span class="req">*</span>':''}</div>`}`;
      const ph=field.placeholder||'';
      const help=field.help?`<div class="field-help">${esc(field.help)}</div>`:'';
      const lbl=()=>'';
      const req=field.required?' required':'';
      switch(field.type){
        case 'text':html+=`${lbl()}<input type="text" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;break;
        case 'textarea':html+=`${lbl()}<textarea class="field-textarea" placeholder="${esc(ph)}"${req}></textarea>${help}`;break;
        case 'email':html+=`${lbl()}<input type="email" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;break;
        case 'phone':html+=`${lbl()}${field.phoneExt?`<div class="phone-ext-wrap"><input type="tel" class="field-input" placeholder="${esc(ph)}"${req}><input type="text" class="field-input phone-ext-box" placeholder="Ext." disabled></div>`:`<input type="tel" class="field-input" placeholder="${esc(ph)}"${req}>`}${help}`;break;
        case 'number':html+=`${lbl()}<input type="number" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;break;
        case 'url':html+=`${lbl()}<input type="url" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;break;
        case 'password':html+=`${lbl()}<input type="password" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;break;
        case 'date':html+=`${lbl()}<input type="date" class="field-input"${req}>${help}`;break;
        case 'time':html+=`${lbl()}<div class="field-timepicker">${timePicker12HTML('field-time',{disabled:true})}</div>${help}`;break;
        case 'totaltime':html+=`${lbl()}<div class="field-totaltime">
            <div class="field-tt-part"><span class="field-tt-sub">Start Time</span>${timePicker12HTML('field-tt-start',{disabled:true})}</div>
            <div class="field-tt-part"><span class="field-tt-sub">End Time</span>${timePicker12HTML('field-tt-end',{disabled:true})}</div>
            <div class="field-tt-part"><span class="field-tt-sub">Total Time</span><input type="text" class="field-input" readonly placeholder="0h 0m"></div>
          </div>${help}`;break;
        case 'checkbox':html+=`<label class="field-opt"><input type="checkbox"${req}> ${esc(field.label)}${field.required?'<span class="req">*</span>':''}</label>${help}`;break;
        case 'toggle':{
          const tHdr=`<div class="field-label">${esc(field.label)}${field.required?'<span class="req">*</span>':''}</div>`;
          html+=(field.toggleStyle==='checkbox')
            ? `<label class="field-opt"><input type="checkbox"> ${esc(field.label)}</label>${help}`
            : `${tHdr}${toggleSwitchHTML(field)}${help}`;
          break;
        }
        case 'color':html+=`${lbl()}<input type="color" value="#1a8a66" style="height:42px;padding:4px">${help}`;break;
        case 'file':html+=`${lbl()}<input type="file"${req}>${help}`;break;
        case 'range':html+=`${lbl()}<input type="range" min="${field.min||0}" max="${field.max||100}" step="${field.step||1}">${help}`;break;
        case 'select':html+=`${lbl()}<select class="field-select"${req}><option value="" disabled selected>Choose…</option>${(field.options||[]).map(o=>`<option>${esc(o)}</option>`).join('')}</select>${help}`;break;
        case 'radio':html+=`${lbl()}<div class="field-opts${field.optionLayout==='horizontal'?' field-opts-h':''}">${(field.options||[]).map((o,i)=>`<label class="field-opt"><input type="radio" name="${field.id}"${req&&i===0?' required':''}> ${esc(o)}</label>`).join('')}</div>${help}`;break;
        case 'checkboxes':html+=`${lbl()}<div class="field-opts${field.optionLayout==='horizontal'?' field-opts-h':''}">${(field.options||[]).map(o=>`<label class="field-opt"><input type="checkbox"> ${esc(o)}</label>`).join('')}</div>${help}`;break;
        case 'matrix':html+=`${lbl()}${matrixGridHTML(field,'card')}${help}`;break;
        case 'rating':html+=`${lbl()}<div style="font-size:26px;color:var(--caution);letter-spacing:5px;cursor:pointer">${'★'.repeat(field.max||5)}</div>${help}`;break;
        case 'signature':html+=`<div style="border:1px dashed var(--border);border-radius:9px;height:80px;display:flex;align-items:center;justify-content:center;gap:7px;color:var(--text-muted-2);font-size:13px">✍ Signature</div>${help}`;break;
        case 'heading':html+=`<div class="field-content-preview" style="font-family:'Instrument Serif',serif;font-size:20px;color:var(--text-main);line-height:1.2">${esc(field.label)}</div>${help}`;break;
        case 'paragraph':html+=`${lbl()}<textarea class="field-textarea" style="min-height:160px" placeholder="${esc(field.placeholder||'Add a paragraph of text…')}"${req}></textarea>${help}`;break;
        case 'divider':html+=`<div class="field-content-preview" style="padding:6px 0"><div style="height:1px;background:var(--border)"></div></div>`;break;
        case 'statusbar':{
          const mode=statusBarModeLabel(field);
          const tb=(pbMode(field)==='pageBetween')?(' · '+({bottom:'bottom',top:'top',both:'top & bottom'}[pbPlace(field)]||'bottom')):'';
          html+=`<div class="field-statusbar">
            <div class="fsb-head"><span class="fsb-label">${esc(field.label||'Progress')}</span><span class="fsb-mode">▣ ${esc(mode)}${tb}</span></div>
            <div class="fsb-track"><div class="fsb-fill"></div></div>
          </div>`;
          break;
        }
        default:html+=`${lbl()}<input type="text" class="field-input" placeholder="${esc(ph)}"${req}>${help}`;
      }
      html+=`</div>`;
    });
    html+=`</div></div>`;
  });
  // Bottom zone: click to add an empty row, or drop a field to add a row with it
  html+=`<div class="row-add-zone" id="row-add-zone" role="button" tabindex="0" title="Add a new row">
    <span class="raz-text">+ Add row</span>
    <span class="raz-sub">click to add, or drop a field here</span>
  </div>`;
  html+=`</div>`;
  // Bottom save bar — mirrors the toolbar Save; commits the form to the database
  // and takes it out of Draft. Build-only.
  html+=`<div class="canvas-save-bar build-only" id="canvas-save-bar">
    <div class="csb-status is-draft" id="csb-status">Draft — auto-saved locally · not in the database yet</div>
    <button class="btn" id="csb-back" onclick="gotoBuilderPage(${BUILDER_PAGE-1})" ${BUILDER_PAGE<=1?'disabled':''} title="Go to the previous page">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      <span>Back</span>
    </button>
    <button class="btn" id="csb-forward" onclick="gotoBuilderPage(${BUILDER_PAGE+1})" ${BUILDER_PAGE>=pages?'disabled':''} title="Go to the next page">
      <span>Forward</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
    <button class="btn primary" id="dbsave-btn-bottom" onclick="saveFormToDatabase()" title="Save this form to the database (takes it out of Draft and enables delivery)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20 16.5A4.5 4.5 0 0 0 17 8h-1.26A8 8 0 1 0 4 16.25"/></svg>
      <span id="dbsave-label-bottom">Save</span>
    </button>
  </div>`;
  document.getElementById('rows-mount').innerHTML=html;
  document.body.classList.toggle('block-selecting', BLOCK_SELECT_MODE);
  if(typeof updateBlockSelectBar==='function') updateBlockSelectBar();

  // ---- Drag source: existing fields ----
  // Each field <div> is draggable. On dragstart we stash its identity (row+
  // field index AND field id) so drop handlers can locate the source — index
  // for splice, id as a robust backup if the array shifts. The dragging class
  // dims the source so the user can see what they picked up.
  document.querySelectorAll('.field[draggable="true"]').forEach(fld=>{
    fld.addEventListener('dragstart',e=>{
      // In read-only mode the field shouldn't be movable. Prevent the drag
      // from starting at all — better than letting it visually start and
      // then bailing on drop.
      if(document.querySelector('.app').classList.contains('readonly')){
        e.preventDefault();
        return;
      }
      // Prevent native drag from interfering with text-selection inside
      // the field — we want the entire field card to be the drag target.
      // A real drag is starting — cancel the deferred selection render queued
      // by pointer-down so the drag gesture isn't interrupted by a rebuild.
      cancelPendingSelectRender();
      e.stopPropagation();
      const fieldId=fld.dataset.fieldId;
      const sourceRowIdx=parseInt(fld.dataset.rowIdx);
      const sourceFieldIdx=parseInt(fld.dataset.fieldIdx);
      draggedData={type:'fieldmove',fieldId,sourceRowIdx,sourceFieldIdx};
      e.dataTransfer.effectAllowed='move';
      try{ e.dataTransfer.setData('text/plain',JSON.stringify(draggedData)); }catch(err){}
      fld.classList.add('dragging');
    });
    fld.addEventListener('dragend',e=>{
      fld.classList.remove('dragging');
      // Clear any leftover insertion indicators on every field.
      document.querySelectorAll('.field.drop-before,.field.drop-after').forEach(el=>{
        el.classList.remove('drop-before','drop-after');
      });
      setTimeout(()=>{ if(draggedData && draggedData.type==='fieldmove') draggedData=null; },0);
    });
  });

  // ---- Drop targets: rows ----
  document.querySelectorAll('.row-fields').forEach(rf=>{
    rf.addEventListener('dragover',e=>{
      // A row reorder is handled by the .row listener, not here. Bail without
      // preventDefault so the event continues to the row-level handler.
      if(draggedData && draggedData.type==='rowmove') return;
      e.preventDefault();
      // For an existing-field move it's a "move"; for new fields/blocks it's "copy".
      const isMove = draggedData && draggedData.type==='fieldmove';
      e.dataTransfer.dropEffect = isMove ? 'move' : 'copy';
      rf.closest('.row').classList.add('row-target');

      // Position indicator: if hovering over a sibling field, decide
      // whether to insert before (cursor in left half) or after (right half).
      // We update lazily so this is cheap even with many fields.
      const overField = e.target.closest('.field');
      // Clear stale indicators across the whole canvas (cheaper than
      // tracking per-row, and avoids stuck indicators when leaving a row).
      document.querySelectorAll('.field.drop-before,.field.drop-after').forEach(el=>{
        if(el!==overField) el.classList.remove('drop-before','drop-after');
      });
      if(overField && rf.contains(overField)){
        // Don't show the indicator on the field being dragged itself.
        if(!overField.classList.contains('dragging')){
          const rect=overField.getBoundingClientRect();
          const isLeftHalf = (e.clientX - rect.left) < rect.width/2;
          overField.classList.toggle('drop-before', isLeftHalf);
          overField.classList.toggle('drop-after', !isLeftHalf);
        }
      }
    });
    rf.addEventListener('dragleave',e=>{
      // dragleave fires constantly as the cursor crosses child fields, so
      // e.target===rf is unreliable and leaves the highlight stuck. Instead
      // check whether the cursor has actually left the row-fields box.
      const r=rf.getBoundingClientRect();
      if(e.clientX<r.left || e.clientX>=r.right || e.clientY<r.top || e.clientY>=r.bottom){
        rf.closest('.row').classList.remove('row-target');
        rf.querySelectorAll('.field.drop-before,.field.drop-after').forEach(el=>{
          el.classList.remove('drop-before','drop-after');
        });
      }
    });
    rf.addEventListener('drop',e=>{
      // Row reorders are not our concern — let the .row drop handler take it.
      if(draggedData && draggedData.type==='rowmove') return;
      e.preventDefault();
      // This row handled the drop — stop it bubbling to the canvas-wrap
      // fallback, otherwise both handlers fire on a single drop and the
      // second one operates on now-stale source indices. This double-fire
      // is the root cause of the intermittent "drop sometimes misbehaves".
      e.stopPropagation();
      rf.closest('.row').classList.remove('row-target');
      const targetRowIdx=parseInt(rf.dataset.rowIdx);
      let data=draggedData;
      if(!data){
        try{ data=JSON.parse(e.dataTransfer.getData('text/plain')); }catch(err){ data=null; }
      }
      if(!data) return;

      // Compute the insertion index inside the target row. If the user
      // dropped onto an existing field, insert before or after it based on
      // which half they aimed for. Otherwise append at the end.
      let insertAt=FORM.rows[targetRowIdx].fields.length;
      const overField=e.target.closest('.field');
      if(overField && rf.contains(overField) && !overField.classList.contains('dragging')){
        const targetId=overField.dataset.fieldId;
        const idxInRow=FORM.rows[targetRowIdx].fields.findIndex(f=>f.id===targetId);
        if(idxInRow>=0){
          const rect=overField.getBoundingClientRect();
          const isLeftHalf = (e.clientX - rect.left) < rect.width/2;
          insertAt = isLeftHalf ? idxInRow : idxInRow+1;
        }
      }
      // Wipe all stale indicators before re-render
      document.querySelectorAll('.field.drop-before,.field.drop-after').forEach(el=>{
        el.classList.remove('drop-before','drop-after');
      });

      if(data.type==='fieldmove'){
        moveField(data.sourceRowIdx, data.sourceFieldIdx, data.fieldId, targetRowIdx, insertAt);
      } else if(data.type==='newfield'){
        const nf=defaultField(data.fieldType);
        FORM.rows[targetRowIdx].fields.splice(insertAt,0,nf);
        fitRowAroundDrop(targetRowIdx, nf.id);
        SELECTED={fieldId:nf.id};
        render();
      } else if(data.type==='block'){
        const b=BLOCKS[data.blockIdx];
        if(b){
          // Insert all block fields at the chosen position, preserving order.
          // We deep-clone so each instance gets fresh field ids — block fields
          // are reusable templates, not the same field shared across forms.
          const clones=b.fields.map(f=>{ const c=JSON.parse(JSON.stringify(f)); c.id=uid('f'); return c; });
          FORM.rows[targetRowIdx].fields.splice(insertAt,0,...clones);
          // Block fields carry their own template widths; once dropped into a
          // shared row they must auto-size to fit alongside the existing fields
          // (same behavior as dropping a single new field). Without this the
          // dropped block fields kept their original spans and overflowed.
          fitRowAroundDrop(targetRowIdx);
          render();
        }
      }
    });
  });

  // ---- Drop targets: inter-row gaps (create a NEW row at this position) ----
  document.querySelectorAll('.row-gap').forEach(gap=>{
    gap.addEventListener('dragover',e=>{
      // Row reorders are handled by the .row listeners, not here.
      if(!draggedData || draggedData.type==='rowmove') return;
      e.preventDefault();
      e.dataTransfer.dropEffect = (draggedData.type==='fieldmove') ? 'move' : 'copy';
      gap.classList.add('drop-active');
    });
    gap.addEventListener('dragleave',e=>{ gap.classList.remove('drop-active'); });
    gap.addEventListener('drop',e=>{
      if(!draggedData || draggedData.type==='rowmove') return;
      e.preventDefault();
      e.stopPropagation(); // don't let the canvas-wide fallback also fire
      gap.classList.remove('drop-active');
      let data=draggedData;
      if(!data){ try{ data=JSON.parse(e.dataTransfer.getData('text/plain')); }catch(err){ data=null; } }
      if(!data) return;
      const insertIdx=parseInt(gap.dataset.insertIdx,10);
      const page=parseInt(gap.dataset.insertPage,10)||1;
      insertFieldAsNewRow(data, insertIdx, page);
    });
  });

  // ---- Row reordering via the rail grip handle ----
  // Only the grip is the drag source. Rows are NOT draggable by default —
  // otherwise picking up a field would ambiguously start a row drag too. We
  // flip the parent row's draggable flag on while the pointer is held on the
  // grip, and flip it back off on dragend, so the two drag systems never
  // compete.
  document.querySelectorAll('.rr-btn.grip').forEach(grip=>{
    const row=grip.closest('.row');
    if(!row) return;
    grip.addEventListener('mousedown',()=>{ row.setAttribute('draggable','true'); });
    // Note: we intentionally do NOT clear draggable on mouseup — native drags
    // suppress mouseup in several browsers. dragend (below) is the reliable
    // place to disarm. We also disarm on a plain click that never became a
    // drag, via the document mouseup fallback bound once outside this loop.

    row.addEventListener('dragstart',e=>{
      // Guard: only proceed if this drag actually began from the grip. If the
      // row somehow became draggable without the grip (it shouldn't), bail.
      if(document.querySelector('.app').classList.contains('readonly')){
        e.preventDefault(); return;
      }
      // Don't let a field drag bubble up and get treated as a row drag.
      if(e.target.closest('.field')){ return; }
      e.stopPropagation();
      const fromIdx=parseInt(row.dataset.rowIdx);
      draggedData={type:'rowmove',sourceRowIdx:fromIdx};
      e.dataTransfer.effectAllowed='move';
      try{ e.dataTransfer.setData('text/plain',JSON.stringify(draggedData)); }catch(err){}
      row.classList.add('row-dragging');
    });
    row.addEventListener('dragend',()=>{
      row.removeAttribute('draggable');
      row.classList.remove('row-dragging');
      document.querySelectorAll('.row-drop-above,.row-drop-below').forEach(el=>{
        el.classList.remove('row-drop-above','row-drop-below');
      });
      setTimeout(()=>{ if(draggedData && draggedData.type==='rowmove') draggedData=null; },0);
    });
  });

  // One-time global fallback: if the user presses a grip (arming the row as
  // draggable) but releases without ever starting a drag, dragend never fires
  // and the row would stay draggable. Clear any armed rows on the next mouseup.
  // Guarded so renderCanvas()'s repeated calls don't stack listeners.
  if(!window.__rowGripMouseupBound){
    window.__rowGripMouseupBound=true;
    document.addEventListener('mouseup',()=>{
      document.querySelectorAll('.row[draggable="true"]').forEach(r=>{
        if(!r.classList.contains('row-dragging')) r.removeAttribute('draggable');
      });
    });
  }
  // Row-level drop targets: each .row accepts a rowmove and shows an
  // above/below insertion line based on cursor position. Field drags
  // (fieldmove/newfield/block) are ignored here — they're handled by the
  // .row-fields listeners, which sit inside and fire first.
  document.querySelectorAll('.rows > .row').forEach(row=>{
    row.addEventListener('dragover',e=>{
      if(!draggedData || draggedData.type!=='rowmove') return;
      e.preventDefault();
      e.dataTransfer.dropEffect='move';
      const rect=row.getBoundingClientRect();
      const isAbove=(e.clientY-rect.top) < rect.height/2;
      // Clear indicators on other rows.
      document.querySelectorAll('.row-drop-above,.row-drop-below').forEach(el=>{
        if(el!==row) el.classList.remove('row-drop-above','row-drop-below');
      });
      if(row.classList.contains('row-dragging')){
        row.classList.remove('row-drop-above','row-drop-below');
        return;
      }
      row.classList.toggle('row-drop-above', isAbove);
      row.classList.toggle('row-drop-below', !isAbove);
    });
    row.addEventListener('dragleave',e=>{
      const r=row.getBoundingClientRect();
      if(e.clientX<r.left || e.clientX>=r.right || e.clientY<r.top || e.clientY>=r.bottom){
        row.classList.remove('row-drop-above','row-drop-below');
      }
    });
    row.addEventListener('drop',e=>{
      if(!draggedData || draggedData.type!=='rowmove') return;
      e.preventDefault();
      e.stopPropagation();
      const rect=row.getBoundingClientRect();
      const isAbove=(e.clientY-rect.top) < rect.height/2;
      const targetIdx=parseInt(row.dataset.rowIdx);
      row.classList.remove('row-drop-above','row-drop-below');
      // Convert "above/below this row" into an insertion index.
      const insertAt = isAbove ? targetIdx : targetIdx+1;
      moveRow(draggedData.sourceRowIdx, insertAt);
    });
  });

  // Bottom "add new row" zone — click to add empty row, or drop a field/row
  const addZone=document.getElementById('row-add-zone');
  if(addZone){
    addZone.addEventListener('click',e=>{ e.stopPropagation(); addRow(); });
    addZone.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); addRow(); } });
    addZone.addEventListener('dragover',e=>{
      e.preventDefault();
      // Same effectAllowed/dropEffect compatibility rule as the canvas drop —
      // moves (field OR row) need 'move', everything else stays 'copy'.
      const isMove = draggedData && (draggedData.type==='fieldmove' || draggedData.type==='rowmove');
      e.dataTransfer.dropEffect = isMove ? 'move' : 'copy';
      addZone.classList.add('active');
    });
    addZone.addEventListener('dragleave',e=>{ addZone.classList.remove('active'); });
    addZone.addEventListener('drop',e=>{
      e.preventDefault();
      e.stopPropagation();
      addZone.classList.remove('active');
      let data=draggedData;
      if(!data){
        try{ data=JSON.parse(e.dataTransfer.getData('text/plain')); }catch(err){ data=null; }
      }
      if(!data) return;
      // A row dropped onto the bottom zone means "make this the last row".
      if(data.type==='rowmove'){
        moveRow(data.sourceRowIdx, FORM.rows.length);
        return;
      }
      // For a fieldmove: lift the existing field into a brand-new row at the
      // bottom. The same field object is relocated — its id, label, span, and
      // weight-group membership all travel with it untouched.
      if(data.type==='fieldmove'){
        const src=FORM.rows[data.sourceRowIdx];
        if(!src) return;
        // Splice by id (not index) so we don't trip if anything else shifted.
        const fidx=src.fields.findIndex(f=>f.id===data.fieldId);
        if(fidx<0) return;
        const [moved]=src.fields.splice(fidx,1);
        // In all-pages mode the bottom zone sits below the LAST page visually,
        // so a drop there should join the last page. In single-page mode it
        // sits under the current page. Either way: targetAddPage().
        const newRow={id:uid('r'),fields:[moved],page:targetAddPage()};
        FORM.rows.push(newRow);
        render();
        return;
      }
      const newRow={id:uid('r'),fields:[],page:targetAddPage()};
      if(data.type==='newfield'){
        newRow.fields.push(defaultField(data.fieldType));
      } else if(data.type==='block'){
        const b=BLOCKS[data.blockIdx];
        // Fresh ids on each block instantiation so multiple drops of the
        // same block don't collide on field id.
        if(b) b.fields.forEach(f=>{ const c=JSON.parse(JSON.stringify(f)); c.id=uid('f'); newRow.fields.push(c); });
      }
      if(newRow.fields.length){ FORM.rows.push(newRow); render(); }
    });
  }
}

/* Which page a newly-appended row should land on. In single-page mode the
   answer is the page the user is editing (BUILDER_PAGE). In all-pages mode
   the bottom drop zone sits visually under the last page, so a drop or click
   there should extend that last page rather than randomly jumping somewhere. */
function targetAddPage(){
  return SHOW_ALL_PAGES ? pageCount() : BUILDER_PAGE;
}

function addRow(){
  FORM.rows.push({id:uid('r'),fields:[],page:targetAddPage()});
  render();
}

/* A row's page (1-indexed). Rows created before multi-page support, or that
   never had a page assigned, are treated as page 1. */
function pageOf(row){ return row && row.page ? row.page : 1; }

/* How many pages the form currently spans — the max page number used by any
   row, but at least 1. */
function pageCount(){
  let max=1;
  FORM.rows.forEach(r=>{ const p=pageOf(r); if(p>max) max=p; });
  return max;
}

/* Page-level conditional visibility. A page's rule lives in FORM.pageRules
   keyed by page number and uses the same condition shape as field/row rules.
   pageVisiblePreview evaluates it against the current preview answers; a page
   with no rule is always visible. visiblePreviewPages returns the page numbers
   the wizard should actually walk through (never empty — falls back to [1]). */
function pageRuleFor(n){ return (FORM.pageRules||{})[n]; }
function pageVisiblePreview(n){ return evalShowIf(pageRuleFor(n)); }
function visiblePreviewPages(){
  const out=[]; const max=pageCount();
  for(let p=1;p<=max;p++){ if(pageVisiblePreview(p)) out.push(p); }
  return out.length?out:[1];
}
/* Page rules are keyed by ordinal page number, so any operation that renumbers
   pages (adding/removing a break, collapsing empty pages on save) must move the
   rules with their pages. mapFn maps an old page number to its new number, or
   returns null to drop the rule (page no longer exists). */
function remapPageRules(mapFn){
  if(!FORM.pageRules) return;
  const next={};
  Object.keys(FORM.pageRules).forEach(k=>{
    const np=mapFn(Number(k));
    if(np!=null) next[np]=FORM.pageRules[k];
  });
  if(Object.keys(next).length) FORM.pageRules=next; else delete FORM.pageRules;
}

/* Prompt the user for a target page and move the row there. Uses prompt() to
   stay consistent with the lightweight group-creation UX. */
function promptMoveRowPage(ridx){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const max=pageCount();
  const cur=pageOf(FORM.rows[ridx]);
  const ans=prompt(`Move this row to which page? (1–${max+1}, ${max+1} creates a new page)`, String(cur));
  if(ans==null) return;
  const target=parseInt(ans,10);
  if(isNaN(target)||target<1){ toast('Enter a valid page number'); return; }
  setRowPage(ridx, Math.min(target, max+1));
  toast(`Row moved to page ${Math.min(target,max+1)}`);
}

/* Move the builder to a given page (clamped). In single-page-view mode this
   filters the canvas to that page. In all-pages mode, BUILDER_PAGE acts as
   a "current/focused" cursor (used by the bottom drop zone and as the anchor
   normalizePages preserves) and the canvas scrolls to that page's section. */
function gotoBuilderPage(p){
  const max=pageCount();
  BUILDER_PAGE=Math.max(1, Math.min(p, max));
  SELECTED=null;
  if(SHOW_ALL_PAGES){
    // Scroll to the target page section instead of filtering.
    render();
    setTimeout(()=>{
      const section=document.querySelector(`.page-section[data-page="${BUILDER_PAGE}"]`);
      // Guard for environments that lack scrollIntoView or don't accept the
      // options object (older Safari). Falls back to a bare call, then no-op.
      if(section && typeof section.scrollIntoView==='function'){
        try { section.scrollIntoView({behavior:'smooth',block:'start'}); }
        catch(e){ try { section.scrollIntoView(); } catch(_){} }
      }
    }, 30);
  } else {
    render();
  }
}

/* Toggle the canvas between single-page view and all-pages-stacked view.
   For users who can edit the form, the choice is saved on the form
   (FORM.showAllPages) so the form remembers it across sessions. For viewers,
   the toggle still works for their local viewing session but isn't written
   back — read-only really means read-only, including the view preference. */
function toggleShowAllPages(){
  SHOW_ALL_PAGES=!SHOW_ALL_PAGES;
  // Only persist the preference if this user is actually allowed to edit
  // this form. Otherwise it's a session-local view change only.
  if(!currentFormReadOnly()){
    FORM.showAllPages=SHOW_ALL_PAGES;
  }
  updateAllPagesButton();
  SELECTED=null;
  render();
  // After switching INTO all-pages mode, scroll to the page the user was on
  // so they don't lose their place.
  if(SHOW_ALL_PAGES){
    setTimeout(()=>{
      const section=document.querySelector(`.page-section[data-page="${BUILDER_PAGE}"]`);
      if(section && typeof section.scrollIntoView==='function'){
        try { section.scrollIntoView({behavior:'auto',block:'start'}); }
        catch(e){ try { section.scrollIntoView(); } catch(_){} }
      }
    }, 30);
  }
}

/* Update the topbar button's appearance to reflect current SHOW_ALL_PAGES.
   Called from toggleShowAllPages and from loadFormIntoEditor (so opening a
   form with showAllPages=true shows the active state on the button). */
function updateAllPagesButton(){
  const btn=document.getElementById('all-pages-btn');
  const label=document.getElementById('all-pages-label');
  if(!btn) return;
  btn.classList.toggle('active', SHOW_ALL_PAGES);
  if(label) label.textContent=SHOW_ALL_PAGES?'Single page':'All pages';
  btn.title=SHOW_ALL_PAGES?'Show only the current page':'Show every page in one scrolling view';
}

/* Add a new page at the end and switch the builder to it. The page becomes
   "real" as soon as a row is added to it; an empty trailing page is allowed
   while editing and is cleaned up on save/normalize. */
function addBuilderPage(){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  BUILDER_PAGE=pageCount()+1;
  // Seed one empty row on the new page so the canvas isn't blank and the user
  // has an immediate drop target.
  FORM.rows.push({id:uid('r'),fields:[],page:BUILDER_PAGE});
  SELECTED=null;
  render();
}

/* Move a row to a different page (used by the rail "move to page" control).
   We also splice it into the proper position in FORM.rows so rows belonging
   to the same page stay contiguous in the flat array. The renderer relies on
   this contiguity to emit page-section headers correctly in all-pages mode
   and to filter cleanly in single-page mode; without it, rows can appear in
   the wrong place or vanish entirely. */
function setRowPage(ridx, page){
  const row=FORM.rows[ridx];
  if(!row) return;
  row.page=Math.max(1, page);
  relocateRowToMatchPage(ridx);
  render();
}

/* After a row's `page` has changed (or after a row has been physically moved
   to an index where neighbors disagree on page), splice it so it sits at the
   END of its target page's contiguous run. End-of-page is the most predictable
   destination — it mirrors what addRow and insertRowBefore do when appending,
   and it gives the user a stable mental model: "moved to page 3" = "appears
   last on page 3". Returns the row's new index so callers can update other
   bookkeeping if they need to. */
function relocateRowToMatchPage(ridx){
  const row=FORM.rows[ridx];
  if(!row) return ridx;
  const targetPage=pageOf(row);
  // Pluck the row out first; we'll work out where it belongs against the
  // remaining array. Working off the post-splice array avoids the off-by-one
  // dance that bit moveRow before.
  FORM.rows.splice(ridx,1);
  // Find the last position whose existing row is on the target page, and
  // insert immediately after it. If no row is on the target page, fall back
  // to inserting before the first row on a higher page; failing that, append.
  let insertAt=FORM.rows.length; // default: end of form
  let lastSamePage=-1;
  let firstHigherPage=-1;
  for(let i=0;i<FORM.rows.length;i++){
    const p=pageOf(FORM.rows[i]);
    if(p===targetPage) lastSamePage=i;
    if(p>targetPage && firstHigherPage<0) firstHigherPage=i;
  }
  if(lastSamePage>=0)         insertAt=lastSamePage+1;
  else if(firstHigherPage>=0) insertAt=firstHigherPage;
  FORM.rows.splice(insertAt,0,row);
  return insertAt;
}

/* Is the row at `ridx` already the first row of its page in flat-array order?
   "First of page" means either it's the first row overall, or the row
   immediately before it lives on a different page. Used to decide whether
   the break button at that row should add a break or remove the existing one. */
function isFirstOnPage(ridx){
  if(ridx<=0) return true;
  return pageOf(FORM.rows[ridx-1])!==pageOf(FORM.rows[ridx]);
}

/* Toggle a page break BEFORE this row. Two cases:
   1. Row is already first on its page → REMOVE the break (merge this page
      into the previous one). Every row from here through the rest of this
      page shifts up by one page; later pages shift up too.
   2. Row is not first on its page → ADD a break. This row and every row
      after it on the SAME page get bumped to a new page; pages after that
      shift down to make room.
   The flat row order never changes — only `page` numbers move. The builder
   follows the affected row so the user keeps their context. */
function toggleBreakBefore(ridx){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const row=FORM.rows[ridx];
  if(!row) return;
  // Don't allow breaking before the very first row of the whole form —
  // that would leave page 1 empty with no way to recover by clicking again.
  if(ridx===0){ toast('Already at the start of the form'); return; }
  const myPage=pageOf(row);
  if(isFirstOnPage(ridx)){
    // REMOVE break: this row and everything after on this page joins the
    // previous page. Shift this page (and all later pages) up by 1.
    const prevPage=pageOf(FORM.rows[ridx-1]);
    FORM.rows.forEach(r=>{ if(pageOf(r)>=myPage) r.page=pageOf(r)-1; });
    remapPageRules(p=>p>=myPage?p-1:p);
    BUILDER_PAGE=prevPage;
    toast('Page break removed');
  } else {
    // ADD break: this row through the last row on this page become a new
    // page. All pages strictly greater than myPage shift down by 1 first
    // to make room for the new page (myPage+1), then this row's group
    // takes that new number.
    FORM.rows.forEach(r=>{ if(pageOf(r)>myPage) r.page=pageOf(r)+1; });
    remapPageRules(p=>p>myPage?p+1:p);
    // Now bump this row and every subsequent row on the same original page.
    for(let i=ridx;i<FORM.rows.length;i++){
      if(pageOf(FORM.rows[i])===myPage) FORM.rows[i].page=myPage+1;
      else break; // hit the next page already
    }
    BUILDER_PAGE=myPage+1;
    toast('Page break added');
  }
  SELECTED=null;
  render();
}

/* Collapse any gaps in page numbering (e.g. after all rows leave page 2,
   pages 3+ shift down) and drop empty pages so the page count reflects
   reality. A page is considered empty if every row on it has zero fields.
   
   IMPORTANT: We must NOT delete the page the user is currently editing —
   they may have just clicked "+ Page" and be about to drop fields in. That
   page is kept (with its empty row) until the user navigates away or another
   page becomes active. Other empty pages — abandoned exploratory clicks —
   are dropped. Called from saveForm so persisted forms stay tidy. */
function normalizePages(){
  if(FORM.rows.length===0) return;
  // Pages with at least one row that has at least one field are "real".
  const realPages=new Set();
  FORM.rows.forEach(r=>{ if(r.fields && r.fields.length) realPages.add(pageOf(r)); });
  // Always preserve the page the user is currently on (it might be a fresh
  // empty page they just added and are about to fill).
  realPages.add(BUILDER_PAGE);
  // If still nothing real, keep one empty row on page 1.
  if(realPages.size===0){
    FORM.rows=[{id:uid('r'),fields:[],page:1}];
    BUILDER_PAGE=1;
    return;
  }
  // Drop rows that live on a page nobody cares about anymore.
  FORM.rows=FORM.rows.filter(r=>realPages.has(pageOf(r)));
  // Remap surviving pages contiguously 1..n.
  const used=[...realPages].sort((a,b)=>a-b);
  const remap={};
  used.forEach((p,i)=>{ remap[p]=i+1; });
  FORM.rows.forEach(r=>{ r.page=remap[pageOf(r)]; });
  remapPageRules(p=>remap[p]!=null?remap[p]:null);
  // Update BUILDER_PAGE to its remapped position.
  BUILDER_PAGE=remap[BUILDER_PAGE]||1;
}

/* ----- moveField: relocate an existing field within the form -----
   IDENTITY MODEL: The field is the SAME JavaScript object before and after
   the move — same field.id, same field.label, same field.span, same
   placeholder/help/required/options/etc. Nothing is regenerated. This means:
     • Weight groups (which reference field.id) follow the field automatically.
     • Inspector selection (SELECTED.fieldId) stays valid across moves.
     • Width (field.span) is preserved — an "Full"-width textarea stays full
       width when moved to another row.
     • Form/row IDs are also stable — only the field's index inside a row's
       fields array changes (or its containing row.id changes).
   We splice the field out by id (more robust than index in case anything
   shifted between dragstart and drop), then splice it into the destination
   at the requested position. If the source and destination are the same
   array we account for the index shift caused by removal. */
// Auto-fit a field's width to the free space in its row. When a field is added
// to — or moved into — a row that already holds other fields, resize it to
// exactly fill the remaining columns of the 12-col grid: shrink it if it would
// overflow (e.g. a ½ dropped next to three ¼s becomes a ¼), or expand it to
// soak up the leftover space (e.g. a ¼ dropped into a row with lots of room
// grows to fill it). Pure reorders within a row, and drops into an empty row,
// are left alone so the field keeps its chosen/default width.
/* ---- Row width fitting ----
   allocSpans: distribute T columns across fields weighted by their current
   spans — integer result, min 1 each, summing to exactly T. Used by both the
   "Snap to fill row" action (T=12 across all fields) and the on-drop fit
   (T = remaining budget across the fields the user did NOT just drop). */
function allocSpans(weights, T){
  const n=weights.length;
  if(n===0) return [];
  if(T<n) T=n; // guarantee at least 1 column each
  const wsum=weights.reduce((a,b)=>a+b,0)||n;
  let spans=weights.map(w=>Math.max(1, Math.floor(w/wsum*T)));
  let diff=T - spans.reduce((a,b)=>a+b,0);
  // Hand out / claw back the rounding remainder on the largest-weight fields.
  const order=spans.map((_,i)=>i).sort((a,b)=>weights[b]-weights[a]);
  let g=0;
  while(diff>0){ spans[order[g%n]]++; diff--; g++; }
  g=0; let guard=0;
  while(diff<0 && guard++<10000){ const i=order[g%n]; if(spans[i]>1){ spans[i]--; diff++; } g++; }
  return spans.map(s=>Math.min(12,Math.max(1,s)));
}
/* Redistribute ALL of a row's fields so every field is the SAME width and they
   fill the row (sum to 12). Widths are as even as 12 allows — e.g. 2→[6,6],
   3→[4,4,4], 5→[3,3,2,2,2]. This is the manual "Snap to fill row" action. */
function snapRowToFill(rowIdx){
  const row=FORM.rows[rowIdx]; if(!row||!row.fields.length) return;
  if(row.fields.length>12) return; // can't fit >12 fields on one 12-col line
  const spans=allocSpans(row.fields.map(()=>1), 12); // equal weights → even split
  row.fields.forEach((f,i)=>{ f.span=spans[i]; });
}
/* On drop: split the target row evenly so every field is the same width and the
   row fills one line (the requested "split evenly on drop" behavior). A field
   dropped alone into a row keeps its natural width — only shared rows are
   evened out. */
function fitRowAroundDrop(rowIdx, keepId){
  const row=FORM.rows[rowIdx]; if(!row||!row.fields.length) return;
  if(row.fields.length<2) return;  // a lone field keeps its natural width
  if(row.fields.length>12) return; // can't share one 12-col line
  const spans=allocSpans(row.fields.map(()=>1), 12);
  row.fields.forEach((f,i)=>{ f.span=spans[i]; });
}
function snapFillRow(rowIdx){ if(currentFormReadOnly()) return; snapRowToFill(rowIdx); saveForm(); render(); }

/* Create a NEW row at flat array index `insertIdx` (page `page`) containing the
   dragged field/block. Used by the inter-row drop gaps so a field can be placed
   at the top or between rows without first adding an empty row. A fieldmove
   relocates the existing field (leaving its source row in place, matching
   moveField's behavior). */
function insertFieldAsNewRow(data, insertIdx, page){
  if(currentFormReadOnly && currentFormReadOnly()){ if(typeof toast==='function') toast("Read-only — can't modify this form"); return; }
  let fields=[];
  let movedFromRow=null;
  if(data.type==='fieldmove'){
    const src=FORM.rows[data.sourceRowIdx];
    if(!src) return;
    const fidx=src.fields.findIndex(f=>f.id===data.fieldId);
    if(fidx<0) return;
    const [moved]=src.fields.splice(fidx,1);
    fields=[moved];
    movedFromRow=src;
  } else if(data.type==='newfield'){
    fields=[defaultField(data.fieldType)];
  } else if(data.type==='block'){
    const b=BLOCKS[data.blockIdx]; if(!b) return;
    fields=b.fields.map(f=>{ const c=JSON.parse(JSON.stringify(f)); c.id=uid('f'); return c; });
  } else return;
  if(!fields.length) return;
  const idx=Math.max(0, Math.min(insertIdx|0, FORM.rows.length));
  FORM.rows.splice(idx, 0, {id:uid('r'), fields, page:page||1});
  // Drop the original row if moving the field into a new row emptied it, so the
  // gap drop can't leave a phantom empty placeholder behind. By reference, after
  // the insert, so the new row keeps the slot the gap occupied.
  if(movedFromRow && movedFromRow.fields.length===0){
    const si=FORM.rows.indexOf(movedFromRow);
    if(si>=0) FORM.rows.splice(si,1);
  }
  if(fields[0]) SELECTED={fieldId:fields[0].id};
  render();
}

function moveField(sourceRowIdx, sourceFieldIdx, fieldId, targetRowIdx, targetInsertAt){
  if(!FORM.rows[sourceRowIdx] || !FORM.rows[targetRowIdx]) return;
  const sourceRow=FORM.rows[sourceRowIdx];
  // Look up by id first (most reliable), fall back to provided index.
  let srcIdx=sourceRow.fields.findIndex(f=>f.id===fieldId);
  if(srcIdx<0) srcIdx=sourceFieldIdx;
  if(srcIdx<0 || srcIdx>=sourceRow.fields.length) return;

  // No-op: dropping a field exactly where it already lives. We compare BEFORE
  // splicing because the comparison index would otherwise be off-by-one in
  // the same-row case.
  if(sourceRowIdx===targetRowIdx){
    if(targetInsertAt===srcIdx || targetInsertAt===srcIdx+1) return;
  }

  const [field]=sourceRow.fields.splice(srcIdx,1);
  // If moving within the same row to a later position, the removal shifted
  // every index after `srcIdx` left by 1 — including our intended target.
  let insertAt=targetInsertAt;
  if(sourceRowIdx===targetRowIdx && targetInsertAt>srcIdx) insertAt--;
  // Clamp to a valid splice index (defensive — shouldn't fire in practice).
  insertAt=Math.max(0, Math.min(insertAt, FORM.rows[targetRowIdx].fields.length));
  FORM.rows[targetRowIdx].fields.splice(insertAt,0,field);

  // A field moved INTO another row makes that row split evenly (the requested
  // drop behavior). A same-row reorder only changes order — widths there are
  // left untouched, so manually-sized fields survive a reorder.
  if(sourceRowIdx!==targetRowIdx) fitRowAroundDrop(targetRowIdx, field.id);
  // If moving the field out emptied its original row, drop that row (matches
  // deleteFieldById) so the canvas never leaves a phantom empty placeholder
  // row behind. Removed by reference, after fitRowAroundDrop has used the
  // target index, so a source-before-target removal can't desync the target.
  if(sourceRowIdx!==targetRowIdx && sourceRow.fields.length===0){
    const si=FORM.rows.indexOf(sourceRow);
    if(si>=0) FORM.rows.splice(si,1);
  }
  render();
}

/* Status-bar field options. calcPages and calcFieldsPages are alternative
   calculation modes, so turning one on clears the other. */
function setProgressMode(fieldId, mode){
  if(currentFormReadOnly()) return;
  const f=findFieldById(fieldId); if(!f) return;
  f.progressMode=mode;
  // Drop legacy keys so the back-compat accessors don't fight the new model.
  delete f.calcPages; delete f.calcFieldsPages; delete f.topBottom;
  if(mode==='pageBetween' && !f.progressPlacement) f.progressPlacement='bottom';
  saveForm(); render();
}
function setProgressPlacement(fieldId, placement){
  if(currentFormReadOnly()) return;
  const f=findFieldById(fieldId); if(!f) return;
  f.progressPlacement=placement;
  delete f.topBottom;
  saveForm(); render();
}

function renderInspector(){
  // If a custom dropdown inside the inspector is currently open (e.g. the user
  // is choosing a field Type), DON'T rebuild the inspector — doing so would
  // wipe the open menu out from under them (it "flashes" open then vanishes).
  // A stray render() can be triggered by a sibling input's onchange firing on
  // blur as focus moves into the dropdown. Skip the rebuild; the inspector will
  // re-render normally on the next change after the dropdown closes.
  try{
    const insp=document.getElementById('inspector');
    if(insp && insp.querySelector('.cdd.open')) return;
  }catch(e){}
  if(!SELECTED){
    document.getElementById('inspector').classList.remove('open');
    return;
  }
  const field=findFieldById(SELECTED.fieldId);
  if(!field){document.getElementById('inspector').classList.remove('open');return;}
  const inWeightGroup=FORM.weightGroups.findIndex(g=>g.fieldIds.includes(field.id));
  let html=`<h2>${esc(field.label)}</h2>`;
  let adv=''; // Appearance / Field weight / Visibility — collected for the Advanced Options popup
  html+=`<div class="inspector-group">
    <label class="inspector-group-label">Field settings</label>
    <div class="inspector-field">
      <label>Label</label>
      <input type="text" value="${esc(field.label)}" onchange="findFieldById('${field.id}').label=this.value; render()">
    </div>
    <div class="inspector-field">
      <label>Type</label>
      <select class="enhance-dd" onchange="changeFieldType('${field.id}',this.value)">
        ${FIELD_TYPES.map(ft=>`<option value="${ft.type}"${field.type===ft.type?' selected':''}>${ft.label}</option>`).join('')}
      </select>
    </div>
    <div class="inspector-field">
      <label>Width <span style="color:var(--text-muted-2);font-weight:400">(${field.span||defaultSpanFor(field.type)}/12 columns)</span></label>
      <div class="span-presets">
        <button type="button" class="span-preset${(field.span||defaultSpanFor(field.type))===3?' active':''}" onclick="setFieldSpan('${field.id}',3)">¼</button>
        <button type="button" class="span-preset${(field.span||defaultSpanFor(field.type))===4?' active':''}" onclick="setFieldSpan('${field.id}',4)">⅓</button>
        <button type="button" class="span-preset${(field.span||defaultSpanFor(field.type))===6?' active':''}" onclick="setFieldSpan('${field.id}',6)">½</button>
        <button type="button" class="span-preset${(field.span||defaultSpanFor(field.type))===12?' active':''}" onclick="setFieldSpan('${field.id}',12)">Full</button>
      </div>
      <input type="range" min="1" max="12" step="1" value="${field.span||defaultSpanFor(field.type)}" style="width:100%;margin-top:8px;accent-color:var(--green-primary)" oninput="previewFieldSpanLive('${field.id}',parseInt(this.value))" onchange="commitFieldSpanSnapped('${field.id}',parseInt(this.value))">
    </div>`;
  if(field.type==='statusbar'){
    html+=`</div>`; // close the Field settings group
    const _pm=pbMode(field), _pp=pbPlace(field);
    html+=`<div class="inspector-group pb-group">
      <label class="inspector-group-label">Progress Bar</label>
      <p class="acc-hint" style="margin-top:0;margin-bottom:14px">Choose what this bar measures. The bar only appears where you place it — there's no automatic progress bar on the form.</p>
      <label class="pb-opt"><input type="radio" name="pbmode-${field.id}" ${_pm==='aboveForm'?'checked':''} onchange="setProgressMode('${field.id}','aboveForm')"><span>Calculate everything on this form above.</span></label>
      <label class="pb-opt"><input type="radio" name="pbmode-${field.id}" ${_pm==='allPages'?'checked':''} onchange="setProgressMode('${field.id}','allPages')"><span>Calculate everything on all pages.</span></label>
      <label class="pb-opt"><input type="radio" name="pbmode-${field.id}" ${_pm==='pageBetween'?'checked':''} onchange="setProgressMode('${field.id}','pageBetween')"><span>Calculate everything on one page in between progress bars.</span></label>`;
    if(_pm==='pageBetween'){
      html+=`<div class="pb-placement">
        <div class="pb-sublabel">Progress bar placement</div>
        <label class="pb-opt"><input type="radio" name="pbplace-${field.id}" ${_pp==='bottom'?'checked':''} onchange="setProgressPlacement('${field.id}','bottom')"><span>Display progress bar at bottom. <span class="pb-default">(Default)</span></span></label>
        <label class="pb-opt"><input type="radio" name="pbplace-${field.id}" ${_pp==='top'?'checked':''} onchange="setProgressPlacement('${field.id}','top')"><span>Display progress bar at top.</span></label>
        <label class="pb-opt"><input type="radio" name="pbplace-${field.id}" ${_pp==='both'?'checked':''} onchange="setProgressPlacement('${field.id}','both')"><span>Display progress bar at top and bottom.</span></label>
      </div>`;
    }
    html+=`</div>`;
    document.getElementById('inspector').innerHTML=html;
    document.getElementById('inspector').classList.add('open');
    ADV_HTML='';
    try{ enhanceDropdowns(document.getElementById('inspector')); }catch(e){}
    return;
  }
  if((FIELD_TYPES.find(f=>f.type===field.type)?.ph)){
    html+=`<div class="inspector-field">
      <label>Placeholder</label>
      <input type="text" value="${esc(field.placeholder||'')}" onchange="findFieldById('${field.id}').placeholder=this.value||undefined; render()">
    </div>`;
  }
  html+=`<div class="inspector-field">
    <label class="inspector-check"><input type="checkbox" ${field.required?'checked':''} onchange="findFieldById('${field.id}').required=this.checked; render()"> Required</label>
  </div>`;
  // "Show Field" — quick, discoverable toggle on every ruleable field. ON opens
  // the rule editor (and flags the field orange on the canvas); OFF clears it.
  if(!DISPLAY_ONLY_TYPES.has(field.type)){
    html+=`<div class="inspector-field">
      <label class="inspector-check show-field-check"><input type="checkbox" ${field.showIf?'checked':''} onchange="dispToggleFieldRule('${field.id}',this.checked)"> Show Field <span style="font-weight:400;color:var(--text-muted-2)">— only on a condition (flagged orange)</span></label>
      ${field.showIf?`<button class="btn" style="width:100%;margin-top:7px" onclick="openDisplayFields('field:${field.id}')">Edit display rule…</button>`:''}
    </div>`;
  }
  // (Cross-form sharing is now configured via the Autopopulation picker at the
  // bottom of the inspector — see the "⇄ Autopopulation" group below.)
  if(field.type==='matrix'){
    const _mrows=(field.matrixRows||[]).join('\n');
    const _mcols=(field.matrixCols||[]).join('\n');
    html+=`<div class="inspector-field">
      <label>Questions <span style="color:var(--text-muted-2);font-weight:400">(one per line \u2014 listed vertically)</span></label>
      <textarea rows="5" placeholder="Little interest or pleasure in doing things&#10;Feeling down, depressed, or hopeless" oninput="updateMatrixRows('${field.id}', this.value)" onblur="render()">${esc(_mrows)}</textarea>
    </div>
    <div class="inspector-field">
      <label>Answer choices <span style="color:var(--text-muted-2);font-weight:400">(one per line, max 5 \u2014 across the top)</span></label>
      <textarea rows="4" placeholder="Not at all&#10;Several days&#10;More than half the days&#10;Nearly every day" oninput="updateMatrixCols('${field.id}', this.value)" onblur="render()">${esc(_mcols)}</textarea>
      <div class="scoring-hint" style="margin-top:5px">Each question is answered by choosing one column. Extra lines beyond 5 are ignored.</div>
    </div>`;
    const _mimgs=field.matrixColImages||[]; const _mcolsI=(field.matrixCols||[]).slice(0,5);
    html+=`<div class="inspector-field">
      <label>Answer images <span style="color:var(--text-muted-2);font-weight:400">(optional \u2014 add a picture to each choice, e.g. mood faces)</span></label>`;
    if(_mcolsI.length===0){
      html+=`<div class="scoring-hint" style="font-style:italic">Add answer choices above first.</div>`;
    } else {
      html+=`<div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">`;
      _mcolsI.forEach((c,i)=>{
        const im=_mimgs[i];
        html+=`<div style="display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:9px;padding:7px 9px">
          <div style="width:40px;height:40px;flex:none;border-radius:7px;background:#f3f7f5;display:flex;align-items:center;justify-content:center;overflow:hidden">${im?`<img src="${im}" alt="" style="max-width:100%;max-height:100%;object-fit:contain">`:`<span style="color:var(--text-muted-2);font-size:11px">\u2014</span>`}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c||('Choice '+(i+1)))}</div>
            <div style="display:flex;gap:8px;margin-top:4px">
              <label style="font-size:12px;font-weight:600;color:var(--green-primary);cursor:pointer">${im?'Replace':'Upload'} image<input type="file" accept="image/*" style="display:none" onchange="setMatrixColImage('${field.id}',${i},this)"></label>
              ${im?`<button type="button" style="font-size:12px;font-weight:600;color:var(--problem);background:none;border:0;cursor:pointer;padding:0" onclick="clearMatrixColImage('${field.id}',${i})">Remove</button>`:''}
            </div>
          </div>
        </div>`;
      });
      html+=`</div>`;
    }
    html+=`</div>`;
  }
  if((FIELD_TYPES.find(f=>f.type===field.type)?.opts)){
    html+=`<div class="inspector-field">
      <label>Options <span style="color:var(--text-muted-2);font-weight:400">(one per line)</span></label>
      <textarea rows="5" placeholder="Option A&#10;Option B&#10;Option C" oninput="updateFieldOptionsLive('${field.id}', this.value)" onblur="updateFieldOptions('${field.id}', this.value)">${esc((field.options||[]).join('\n'))}</textarea>
    </div>`;
    if(field.type==='radio'||field.type==='checkboxes'){
      const lay = field.optionLayout==='horizontal'?'horizontal':'vertical';
      html+=`<div class="inspector-field">
        <label>Option layout</label>
        <div class="optlay-seg">
          <button type="button" class="optlay-btn${lay==='vertical'?' active':''}" onclick="setOptionLayout('${field.id}','vertical')">↓ Vertical</button>
          <button type="button" class="optlay-btn${lay==='horizontal'?' active':''}" onclick="setOptionLayout('${field.id}','horizontal')">→ Horizontal</button>
        </div>
      </div>`;
    }
    // Per-option score grid + scoring section picker. Only shown for the
    // scoreable types (radio/select/checkboxes). The grid lets the user
    // type a point value next to each option — perfect for PHQ-9 style
    // 0/1/2/3 scoring. Empty entries default to 0 so leaving them blank
    // means "this option contributes nothing".
    if(isScoreable(field)){
      const opts=field.options||[];
      const scores=field.optionScores||[];
      html+=`<div class="inspector-field">
        <label>Option scores <span style="color:var(--text-muted-2);font-weight:400">(point value per choice)</span></label>`;
      if(opts.length===0){
        html+=`<div class="scoring-hint" style="font-style:italic">Add some options above first.</div>`;
      } else {
        html+=`<div class="option-scores">`;
        opts.forEach((o,i)=>{
          const v = (scores[i]!=null && scores[i]!=='') ? scores[i] : 0;
          html+=`<div class="option-score-row">
            <span class="osl">${esc(o)}</span>
            <input type="number" step="any" value="${v}" onchange="setOptionScore('${field.id}',${i},this.value)">
          </div>`;
        });
        html+=`</div>`;
      }
      html+=`<div class="scoring-hint">Max for this question: <strong>${fieldMaxScore(field)}</strong> point${fieldMaxScore(field)===1?'':'s'}.</div>`;
      // Section picker — assign this field to a scoring cluster.
      html+=`<label style="margin-top:10px;display:block">Scoring section</label>`;
      html+=renderFieldSectionPickerHTML(field);
      html+=`</div>`;
    }
  }
  if(field.type==='phone'){
    html+=`<div class="inspector-field">
      <label class="acc-check" style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:600"><input type="checkbox" ${field.phoneExt?'checked':''} onchange="setPhoneExt('${field.id}',this.checked)"> Allow extension (ext.)</label>
      <p class="prefill-hint" style="margin-top:5px;color:var(--text-muted-2)">Adds a small “Ext.” box after the number for business lines.</p>
    </div>`;
  }
  if(field.type==='range'){
    html+=`<div class="inspector-field">
      <label>Min value</label>
      <input type="number" value="${field.min||0}" onchange="findFieldById('${field.id}').min=parseInt(this.value)||0; render()">
    </div>
    <div class="inspector-field">
      <label>Max value</label>
      <input type="number" value="${field.max||100}" onchange="findFieldById('${field.id}').max=parseInt(this.value)||100; render()">
    </div>
    <div class="inspector-field">
      <label>Step</label>
      <input type="number" value="${field.step||1}" onchange="findFieldById('${field.id}').step=parseFloat(this.value)||1; render()">
    </div>`;
  }
  if(field.type==='rating'){
    html+=`<div class="inspector-field">
      <label>Max stars</label>
      <input type="number" value="${field.max||5}" onchange="findFieldById('${field.id}').max=parseInt(this.value)||5; render()">
    </div>`;
  }
  if(field.type==='toggle'){
    const tOn = field.toggleOn!=null?field.toggleOn:'Yes';
    const tOff= field.toggleOff!=null?field.toggleOff:'No';
    const tMatch = TOGGLE_PRESETS.find(p=>p.key!=='other' && p.on===tOn && p.off===tOff);
    const tCustom = !!field.toggleCustom || !tMatch;
    const tKey = tCustom ? 'other' : tMatch.key;
    const tStyle = field.toggleStyle==='checkbox' ? 'checkbox' : 'switch';
    html+=`<div class="inspector-field">
      <label>Display style</label>
      <div class="optlay-seg">
        <button type="button" class="optlay-btn${tStyle==='switch'?' active':''}" onclick="setToggleStyle('${field.id}','switch')">⬤ Switch</button>
        <button type="button" class="optlay-btn${tStyle==='checkbox'?' active':''}" onclick="setToggleStyle('${field.id}','checkbox')">☑ Checkbox</button>
      </div>
    </div>
    <div class="inspector-field">
      <label>Label pair <span style="color:var(--text-muted-2);font-weight:400">(two states)</span></label>
      <select onchange="setTogglePreset('${field.id}',this.value)">
        ${TOGGLE_PRESETS.map(p=>`<option value="${p.key}"${tKey===p.key?' selected':''}>${esc(p.label)}</option>`).join('')}
      </select>
    </div>`;
    if(tCustom){
      html+=`<div class="inspector-field">
        <label>On / Active label</label>
        <input type="text" value="${esc(tOn)}" oninput="setToggleLabel('${field.id}','on',this.value)">
      </div>
      <div class="inspector-field">
        <label>Off / Inactive label</label>
        <input type="text" value="${esc(tOff)}" oninput="setToggleLabel('${field.id}','off',this.value)">
      </div>`;
    }
    const tScores=field.optionScores||[];
    const tOnScore=(tScores[0]!=null&&tScores[0]!=='')?tScores[0]:1;
    const tOffScore=(tScores[1]!=null&&tScores[1]!=='')?tScores[1]:0;
    const tMax=Math.max(Number(tOnScore)||0, Number(tOffScore)||0);
    html+=`<div class="inspector-field">
      <label>Option scores <span style="color:var(--text-muted-2);font-weight:400">(point value per state)</span></label>
      <div class="option-scores">
        <div class="option-score-row"><span class="osl">${esc(tOn)} <span style="color:var(--text-muted-2)">(On)</span></span><input type="number" step="any" value="${tOnScore}" onchange="setOptionScore('${field.id}',0,this.value)"></div>
        <div class="option-score-row"><span class="osl">${esc(tOff)} <span style="color:var(--text-muted-2)">(Off)</span></span><input type="number" step="any" value="${tOffScore}" onchange="setOptionScore('${field.id}',1,this.value)"></div>
      </div>
      <div class="scoring-hint">Max for this question: <strong>${tMax}</strong> point${tMax===1?'':'s'}.</div>
      <label style="margin-top:10px;display:block">Scoring section</label>
      ${renderFieldSectionPickerHTML(field)}
    </div>`;
    html+=`<div class="inspector-field"><div class="scoring-hint">On = <strong>${esc(tOn)}</strong> · Off = <strong>${esc(tOff)}</strong></div></div>`;
  }
  if(field.type==='textarea'||field.type==='paragraph'){
    // Max height multiplier: 1× = base 90px (one-paragraph box), 10× ≈ 900px.
    // The textarea auto-grows as the user types up to this cap, then scrolls
    // internally. step:0.5 gives 1, 1.5, 2 ... matching what the user asked for.
    const mult = Math.max(1, Math.min(10, Number(field.heightMultiplier)||1));
    html+=`<div class="inspector-field">
      <label>Max height <span class="mh-cap" style="color:var(--text-muted-2);font-weight:400">${mult}× — auto-grows up to this cap</span></label>
      <input type="range" min="1" max="10" step="0.5" value="${mult}" style="width:100%;accent-color:var(--green-primary)" oninput="previewFieldHeightLive('${field.id}',parseFloat(this.value))" onchange="commitFieldHeight('${field.id}',parseFloat(this.value))">
    </div>`;
  }
  html+=`<div class="inspector-field">
    <label>Help text</label>
    <textarea onchange="findFieldById('${field.id}').help=this.value||undefined; render()">${esc(field.help||'')}</textarea>
  </div>
  </div>`;
  // Appearance now lives in the Advanced Options popup.
  adv+=`<div class="inspector-field">
    <label>Appearance</label>
    <button type="button" class="btn" style="width:100%" onclick="openFieldStyle('${field.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg> Style this field…</button>
    ${resolveStyleObj(field.style).hasOverrides
      ? `<div class="prefill-hint" style="margin-top:6px">Custom style applied. <button type="button" onclick="clearFieldStyleInline('${field.id}')" style="background:none;border:none;color:var(--problem);cursor:pointer;text-decoration:underline;font:inherit;padding:0">Clear</button></div>`
      : `<div class="prefill-hint" style="margin-top:6px;color:var(--text-muted-2)">Inherits the form style.</div>`}
  </div>`;
  // Mark where the Appearance/Weight/Visibility markup begins so we can lift it
  // out of the inspector and into the Advanced Options popup below.
  const _advStart=html.length;
  
  // Weight section — only meaningful for weightable (non-content) field types.
  if(!NON_WEIGHTABLE_TYPES.has(field.type)){
  html+=`<div class="inspector-divider"></div>`;
  if(inWeightGroup>=0){
    const wg=FORM.weightGroups[inWeightGroup];
    ensureWeightShape(wg);
    // Cumulative is form-wide: sum of EVERY weighted field, across all groups
    // and rows (not just the focused field's group).
    const entries=formWeightedEntries();
    const total=formWeightTotal();
    const over=total>100, exact=total===100;
    html+=`<div class="weight-group-section">
      <label class="inspector-group-label">📊 Field weights</label>
      <p style="font-size:11.5px;color:var(--text-muted);margin:0 0 8px">Every weighted field on the form counts toward one 100% budget. Edit any of them here.</p>
      <div class="wg-members">`;
    entries.forEach(e=>{
      const isCur=e.fieldId===field.id;
      html+=`<div class="wg-member-row${isCur?' current':''}">
        <span class="wg-member-name" title="${esc(e.label)}">${esc(e.label)}${isCur?' <span class="wg-you">(this field)</span>':''}</span>
        <input type="number" min="0" max="100" value="${e.weight}" onchange="setFieldWeight('${e.fieldId}',this.value)">
        <span class="wg-pct">%</span>
      </div>`;
    });
    html+=`</div>
      <div class="wg-total${over?' over':(exact?' exact':'')}">
        <span class="wg-total-label">Cumulative${entries.length>1?` · ${entries.length} fields`:''}</span>
        <span class="wg-total-val">${total}%</span>
      </div>`;
    if(over){
      html+=`<div class="wg-total-msg warn">⚠ Exceeds 100% by ${total-100}. Lower one or more weights.</div>`;
    } else if(exact){
      html+=`<div class="wg-total-msg ok">✓ Weights total exactly 100%.</div>`;
    } else {
      html+=`<div class="wg-total-msg">${100-total}% unallocated across the form.</div>`;
    }
    // Eligible to add: any non-content field not already weighted.
    const inAnyGroup=new Set(FORM.weightGroups.flatMap(g=>g.fieldIds));
    const addable=FORM.rows.flatMap(r=>r.fields).filter(f=>!inAnyGroup.has(f.id)&&!NON_WEIGHTABLE_TYPES.has(f.type));
    if(addable.length){
      html+=`<div class="wg-add-field">
        <select class="enhance-dd" id="wg-add-${wg.id}">
          ${addable.map(f=>`<option value="${f.id}">${esc(f.label||'Untitled')}</option>`).join('')}
        </select>
        <button onclick="addFieldToWeightGroupFromDropdown('${wg.id}')">Add field</button>
      </div>`;
    } else {
      html+=`<div style="font-size:11.5px;color:var(--text-muted-2);margin:6px 0 2px">No other weightable fields to add.</div>`;
    }
    html+=`<button class="remove-group-btn" onclick="removeFieldFromWeightGroup('${field.id}')">Remove this field's weight</button>
    </div>`;
  } else {
    html+=`<div class="inspector-group">
      <label class="inspector-group-label">📊 Field weight</label>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">This field has no weight yet. Add one to include it in the form's weighted score.</p>
      <button class="btn primary" style="width:100%;margin-bottom:8px" onclick="createWeightGroup('${field.id}')">Add a weight</button>
    </div>`;
  }
  } // end weightable-type gate
  
  // Conditional visibility section — works for every field type.
  html+=`<div class="inspector-divider"></div>`;
  {
    const vg = visGroupForField(field.id);
    if(vg){
      const members=(vg.fieldIds||[]).map(id=>findFieldById(id)).filter(Boolean);
      const inAny=new Set((FORM.visibilityGroups||[]).flatMap(g=>g.fieldIds));
      const addable=FORM.rows.flatMap(r=>r.fields).filter(f=>!inAny.has(f.id) && f.type!=='divider');
      html+=`<div class="visgroup-section">
        <label class="inspector-group-label">👁 Visibility group</label>
        <p style="font-size:11.5px;color:var(--text-muted);margin:0 0 9px">These fields show or hide together when the condition below is met.</p>
        <div class="vg-cond-label">Show these fields when…</div>
        ${vg.showIf?`<div class="viz-summary">${esc(describeShowIf(vg.showIf))}</div>`:'<div class="viz-summary none">No rule yet — always shown</div>'}
        <button class="btn" style="width:100%;margin:7px 0 4px" onclick="openDisplayFields('vgroup:${vg.id}')">${vg.showIf?'Edit display rule…':'Add a display rule…'}</button>
        <div class="vg-members">`;
      members.forEach(f=>{ const cur=f.id===field.id;
        html+=`<div class="vg-member-row${cur?' current':''}">
          <span class="vg-member-name" title="${esc(f.label||'Untitled')}">${esc(f.label||'Untitled')}${cur?' <span class="vg-you">(this field)</span>':''}</span>
          <button class="vg-rm" title="Remove from group" onclick="removeFieldFromVisGroup('${f.id}')">✕</button>
        </div>`; });
      html+=`</div>`;
      if(addable.length){
        html+=`<div class="vg-add-field">
          <select class="enhance-dd" id="vg-add-${vg.id}">${addable.map(f=>`<option value="${f.id}">${esc(f.label||'Untitled')}</option>`).join('')}</select>
          <button onclick="addFieldToVisGroupFromDropdown('${vg.id}')">Add field</button>
        </div>`;
      } else {
        html+=`<div style="font-size:11.5px;color:var(--text-muted-2);margin:6px 0 2px">No other fields to add.</div>`;
      }
      html+=`<button class="remove-group-btn" onclick="removeFieldFromVisGroup('${field.id}')">Remove this field from the group</button>
      </div>`;
    } else {
      const _vc=field.showIf; const _summ=_vc?describeShowIf(_vc):'';
      html+=`<div class="inspector-group viz-section">
        <label class="inspector-group-label">👁 Display rules</label>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Show this field only when other answers meet a condition. (Quick toggle: the <strong>Show Field</strong> checkbox in Field settings.)</p>
        ${_vc?`<div class="viz-summary">${esc(_summ)}</div>`:'<div class="viz-summary none">Always shown</div>'}
        <button class="btn" style="width:100%;margin-top:8px" onclick="openDisplayFields('field:${field.id}')">${_vc?'Edit display rule…':'Add a display rule…'}</button>
        <button class="btn" style="width:100%;margin-top:7px" onclick="createVisGroup('${field.id}')">Apply this rule to a group of fields…</button>
        <p style="font-size:11px;color:var(--text-muted-2);margin:6px 0 0">Group fields so they show or hide together on one condition.</p>
      </div>`;
    }
  }

  // Lift the Appearance/Weight/Visibility markup into the Advanced Options popup
  // and leave a single button in the inspector in its place.
  adv += html.slice(_advStart);
  html = html.slice(0, _advStart);
  html += `<button type="button" class="btn adv-options-btn" style="width:100%;margin-top:6px" onclick="openAdvancedOptions('${field.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Advanced Options</button>`;

  // ---- Access & notifications (patient/user visibility + alerts) ----
  {
    const _isContent=(field.type==='heading'||field.type==='divider');
    const sc=field.hideUsersScope||{roles:[],userIds:[]};
    const n=field.notify||{};
    html+=`<div class="inspector-divider"></div>`;
    html+=`<div class="inspector-group"><label class="inspector-group-label">🔒 Access &amp; notifications</label>`;
    html+=`<label class="acc-check"><input type="checkbox" ${field.hidePatient?'checked':''} onchange="setFieldHidePatient('${field.id}',this.checked)"> Hide from patient</label>
      <p class="acc-hint">Clinician-only — left off the patient form and its export.</p>`;
    html+=`<label class="acc-check"><input type="checkbox" ${field.hideUsers?'checked':''} onchange="setFieldHideUsers('${field.id}',this.checked)"> Hide from users</label>`;
    if(field.hideUsers){
      const chips=recipientChips(sc.roles,sc.userIds,false);
      html+=`<div class="acc-scope">
        <div class="acc-chips">${chips.length?chips.map(c=>`<span class="acc-chip">${esc(c)}</span>`).join(''):'<span class="acc-none">Hidden from everyone — pick exceptions below</span>'}</div>
        <button class="btn" style="width:100%" onclick="openRolesUsersPicker('${field.id}','hideUsers')">Choose roles &amp; users…</button>
        <p class="acc-hint">Hidden from these roles/users in the internal (clinician) view.</p>
      </div>`;
    }
    if(!_isContent){
      const rchips=recipientChips(n.roles,n.userIds,false);
      html+=`<div class="acc-sub">Notify on submission</div>
        <div class="acc-row">
          <label class="acc-check inline"><input type="checkbox" ${n.sms?'checked':''} onchange="toggleNotifyChannel('${field.id}','sms',this.checked)"> SMS</label>
          <label class="acc-check inline"><input type="checkbox" ${n.email?'checked':''} onchange="toggleNotifyChannel('${field.id}','email',this.checked)"> Email</label>
        </div>
        <label class="acc-check"><input type="checkbox" ${n.patient?'checked':''} onchange="toggleNotifyPatient('${field.id}',this.checked)"> Notify the patient</label>
        <div class="acc-chips">${rchips.length?rchips.map(c=>`<span class="acc-chip">${esc(c)}</span>`).join(''):'<span class="acc-none">No user/role recipients yet</span>'}</div>
        <button class="btn" style="width:100%" onclick="openRolesUsersPicker('${field.id}','notify')">Choose roles &amp; users to notify…</button>
        <p class="acc-hint">SMS/Email use contact info from the patient submission and each user's profile.${(n.sms||n.email)?'':' <strong>Pick a channel above</strong> to enable delivery.'}</p>`;
    }
    html+=`</div>`;
  }

  // ---- Autopopulation (cross-form value sharing) — at the very bottom ----
  html+=`<div class="inspector-divider"></div>`;
  html+=`<div class="inspector-group">
    <label class="inspector-group-label">⇄ Autopopulation</label>`;
  if(isPrefillable(field)){
    const apl=countAutopopLinks(field);
    html+=`<p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Automatically fill this answer into matching fields on your other forms.</p>
      <button class="btn primary" style="width:100%" onclick="openAutopopModal('${field.id}')">Link fields to autopopulate…</button>`;
    html+=(field.dataKey && apl.count>0)
      ? `<div class="prefill-hint" style="margin-top:8px">⇄ Linked to <strong>${apl.count}</strong> field${apl.count===1?'':'s'} across <strong>${apl.formCount}</strong> form${apl.formCount===1?'':'s'}.</div>`
      : `<div class="prefill-hint" style="margin-top:8px;color:var(--text-muted-2)">Not linked yet.</div>`;
  } else {
    html+=`<p style="font-size:12px;color:var(--text-muted-2);margin-bottom:0">This field type doesn't hold a value, so it can't autopopulate.</p>`;
  }
  html+=`</div>`;

  document.getElementById('inspector').innerHTML=html;
  document.getElementById('inspector').classList.add('open');
  // Stash the advanced-section markup so the popup can always be filled from it.
  // Set BEFORE enhancing the inspector, so a hiccup there can't leave it blank.
  ADV_HTML = adv;
  // Keep the Advanced Options popup in sync while it's open for this field.
  if(ADV_OPEN===field.id){
    const body=document.getElementById('adv-modal-body');
    if(body){ body.innerHTML=adv; try{ enhanceDropdowns(body); }catch(e){} }
    const ttl=document.getElementById('adv-modal-title');
    if(ttl) ttl.textContent='Advanced Options — '+(field.label||'Field');
  }
  try{ enhanceDropdowns(document.getElementById('inspector')); }catch(e){}
}

/* ---- Advanced Options popup ----
   Houses the Appearance, Field weight and Visibility sections so the everyday
   field settings stay short. The body is (re)built by renderInspector while
   ADV_OPEN matches the selected field, so any control inside stays live. */
let ADV_OPEN=null;
let ADV_HTML='';   // last-built advanced-section markup for the selected field
function openAdvancedOptions(fieldId){
  ADV_OPEN=fieldId;
  renderInspector();        // recomputes ADV_HTML for the selected field
  // Fill the popup directly from the stashed markup so it can never open blank,
  // even if something above threw while enhancing the inspector.
  const body=document.getElementById('adv-modal-body');
  if(body){ body.innerHTML=ADV_HTML||''; try{ enhanceDropdowns(body); }catch(e){} }
  const f=SELECTED&&findFieldById(SELECTED.fieldId);
  const ttl=document.getElementById('adv-modal-title');
  if(ttl) ttl.textContent='Advanced Options'+(f?' — '+(f.label||'Field'):'');
  openModal('adv-modal');
}
function closeAdvancedOptions(){
  ADV_OPEN=null;
  closeModal('adv-modal');
}

/* ---- Per-field weights ----
   Each member of a weight group carries its OWN weight, stored in g.weights
   keyed by field id (id-keyed so reordering or adding/removing members can
   never shift a weight onto the wrong field). Older forms stored a single
   g.weight shared by the whole group; ensureWeightShape migrates them in place
   (the legacy value is copied to every member so the displayed numbers don't
   change), and from then on each field is independent. */
function ensureWeightShape(g){
  if(!g) return g;
  if(!g.weights || typeof g.weights!=='object'){
    g.weights={};
    (g.fieldIds||[]).forEach(fid=>{ g.weights[fid]=(g.weight!=null?g.weight:0); });
  } else {
    (g.fieldIds||[]).forEach(fid=>{ if(g.weights[fid]==null) g.weights[fid]=0; });
  }
  // Drop weights for ids no longer in the group.
  Object.keys(g.weights).forEach(k=>{ if(!(g.fieldIds||[]).includes(k)) delete g.weights[k]; });
  delete g.weight; // legacy single weight is fully superseded
  return g;
}
function fieldWeight(fid){
  const g=(FORM.weightGroups||[]).find(x=>(x.fieldIds||[]).includes(fid));
  if(!g) return 0;
  ensureWeightShape(g);
  return Number(g.weights[fid])||0;
}
function setFieldWeight(fid, val){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const g=(FORM.weightGroups||[]).find(x=>(x.fieldIds||[]).includes(fid));
  if(!g) return;
  ensureWeightShape(g);
  let n=parseInt(val,10); if(isNaN(n)) n=0; n=Math.max(0,Math.min(100,n));
  g.weights[fid]=n;
  render();
}
function weightGroupTotal(g){ ensureWeightShape(g); return (g.fieldIds||[]).reduce((s,fid)=>s+(Number(g.weights[fid])||0),0); }

/* Form-wide weighting: every weighted field counts toward ONE 100% budget,
   regardless of which group it sits in or where it is on the form. Entries are
   returned in document order (row then field) so non-sequential weighted
   fields still read top-to-bottom. */
function formWeightedEntries(){
  const wmap=new Map();
  (FORM.weightGroups||[]).forEach(g=>{ ensureWeightShape(g); (g.fieldIds||[]).forEach(fid=>{ wmap.set(fid, Number(g.weights[fid])||0); }); });
  const out=[];
  FORM.rows.forEach(r=>r.fields.forEach(f=>{ if(wmap.has(f.id)) out.push({fieldId:f.id, label:f.label||'Untitled', weight:wmap.get(f.id)}); }));
  return out;
}
function formWeightTotal(){ return formWeightedEntries().reduce((s,e)=>s+e.weight,0); }

function createWeightGroup(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f=findFieldById(fieldId);
  if(!f || NON_WEIGHTABLE_TYPES.has(f.type)){ toast('This field type can\'t be weighted'); return; }
  if((FORM.weightGroups||[]).some(g=>(g.fieldIds||[]).includes(fieldId))){ return; } // already weighted
  const group={id:uid('wg'),fieldIds:[fieldId],weights:{[fieldId]:0}};
  FORM.weightGroups.push(group);
  toast('Weight added. Set its % and add others to share the 100% budget.');
  render();
}

/* Wired to the "Add field" button in the inspector's weight-group section. */
function addFieldToWeightGroupFromDropdown(groupId){
  const sel=document.getElementById('wg-add-'+groupId);
  if(!sel || !sel.value) return;
  addFieldToWeightGroup(sel.value, groupId);
}

/* Add a field to an existing weight group. A field may belong to at most one
   weight group, and content-only fields (heading/paragraph/divider) can't be
   weighted, so both are rejected here. */
function addFieldToWeightGroup(fieldId, groupId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const g=FORM.weightGroups.find(x=>x.id===groupId);
  if(!g) return;
  const f=findFieldById(fieldId);
  if(!f) return;
  if(NON_WEIGHTABLE_TYPES.has(f.type)){ toast('Content fields can\'t be weighted'); return; }
  if(FORM.weightGroups.some(x=>x.fieldIds.includes(fieldId))){ toast('That field is already in a weight group'); return; }
  ensureWeightShape(g);
  g.fieldIds.push(fieldId);
  g.weights[fieldId]=0;
  render();
}

/* Remove a single field from whatever weight group contains it. A weight
   group with fewer than 2 members is meaningless, so if removal drops it
   below 2 we discard the whole group. */
function removeFieldFromWeightGroup(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const gi=FORM.weightGroups.findIndex(g=>g.fieldIds.includes(fieldId));
  if(gi<0) return;
  const g=FORM.weightGroups[gi];
  ensureWeightShape(g);
  g.fieldIds=g.fieldIds.filter(id=>id!==fieldId);
  if(g.weights) delete g.weights[fieldId];
  // Single-field weights are valid now, so only drop a group once it's empty.
  if(g.fieldIds.length===0) FORM.weightGroups.splice(gi,1);
  render();
}

/* Drop any weight-group memberships for field ids that are gone or whose
   field type can't be scored (content-only types). Then discard any group
   left with fewer than 2 members. Safe to call after deletes/type changes. */
const NON_WEIGHTABLE_TYPES=new Set(['heading','paragraph','divider']);
function pruneWeightGroups(){
  if(!FORM.weightGroups) return;
  FORM.weightGroups=FORM.weightGroups.filter(g=>{
    g.fieldIds=g.fieldIds.filter(fid=>{
      const f=findFieldById(fid);
      return f && !NON_WEIGHTABLE_TYPES.has(f.type);
    });
    if(g.weights) Object.keys(g.weights).forEach(k=>{ if(!g.fieldIds.includes(k)) delete g.weights[k]; });
    return g.fieldIds.length>=1; // a single weighted field is valid
  });
}

/* ==================================================================
   SCORING SYSTEM
   ==================================================================
   A scoring section is a named cluster of questions whose answer scores
   are summed together. Designed for clinical screeners like PHQ-9 and GAD-7:
   each radio/checkbox/select option has a point value, the section reports
   a running total in the preview, and optional bands classify the total
   ("Mild", "Moderate", "Severe").

   Data shape on FORM:
     FORM.scoringSections = [
       { id, name, fieldIds: [...], bands: [{ min, max, label, severity }] }
     ]
   - Per-option point values live on each field as field.optionScores, an
     array of numbers aligned to field.options by index. Missing entries
     default to 0 (so a field can be added to a section before its scores
     are set without breaking anything).
   - severity is an optional lowercase tag ('low'|'mild'|'mod'|'high') used
     to color-code the band in the preview. Defaults to 'low'.
*/

// Only these field types can carry per-option scores. Other types (text,
// date, etc.) have no discrete answers to score.
const SCOREABLE_TYPES = new Set(['radio', 'select', 'checkboxes', 'toggle']);
function isScoreable(field){ return field && SCOREABLE_TYPES.has(field.type); }

/* ==================================================================
   CONDITIONAL VISIBILITY (branching / skip logic)
   ==================================================================
   A field OR a whole row can carry a `showIf` rule. When present, the
   field/row only appears once the rule evaluates true. Two rule sources:

     showIf = { type:'field', fieldId, op, value }
       - radio/select controller:  op 'eq' | 'neq', value = option index
       - checkboxes controller:    op 'includes' | 'notincludes', value = idx
       - number/range controller:  op 'gt'|'lt'|'gte'|'lte'|'eq'|'neq', value = num
     showIf = { type:'score', sectionId, op, value }
       - op 'gt'|'lt'|'gte'|'lte'|'eq'|'neq', value = threshold; compares the
         scoring section's running total. This is the "if the score exceeds X,
         reveal more fields" case.

   A field's effective visibility = (its row is visible) AND (its own rule).
   Rules live as plain data on the field/row, so they ride along in the JSON
   schema and are re-implemented verbatim by the standalone HTML export. */
// Field types usable as the *controller* of a field-based rule — those with a
// discrete, machine-evaluable answer.
const CONTROLLER_TYPES = new Set(['radio','select','checkboxes','number','range','rating','text','textarea','email','phone','url','password','date','time','checkbox','toggle']);
// Pure display/content fields — no answer, so they can't carry a show-rule and
// are excluded from the visibility manager.
const DISPLAY_ONLY_TYPES = new Set(['heading','paragraph','divider','statusbar']);
// Sub-families that determine which operators + value box(es) a controller gets.
const NUMERIC_CTRL_TYPES = new Set(['number','range','rating']);
const STRING_CTRL_TYPES  = new Set(['text','textarea','email','phone','url','password','date','time']);
// URL fields accept a bare domain (e.g. "CredifyFast.com") — the scheme is
// optional. Pattern: optional http(s)://, a dotted hostname, optional path.
const URL_INPUT_PATTERN = '(https?://)?[\\w-]+(\\.[\\w-]+)+([/?#].*)?';
const BOOL_CTRL_TYPES    = new Set(['checkbox','toggle']);
const STR_OPS = [
  {v:'seq',l:'is'}, {v:'sneq',l:'is not'},
  {v:'contains',l:'contains'}, {v:'ncontains',l:'does not contain'},
  {v:'filled',l:'is filled in'}, {v:'empty',l:'is empty'}
];
const STR_NOVALUE_OPS = new Set(['filled','empty']); // need no value box
const BOOL_OPS = [ {v:'checked',l:'is checked'}, {v:'unchecked',l:'is not checked'} ];
// Numeric comparison operators, shared by number controllers and score rules.
const NUM_OPS = [
  {v:'gte',l:'≥ (at least)'}, {v:'gt',l:'> (more than)'},
  {v:'lte',l:'≤ (at most)'},  {v:'lt',l:'< (less than)'},
  {v:'eq',l:'= (equals)'},    {v:'neq',l:'≠ (not equal)'},
  {v:'between',l:'is between (from–to)'}, {v:'notbetween',l:'is not between'}
];
// Operators that need a SECOND value box (a range "from this to that").
const RANGE_OPS = new Set(['between','notbetween']);
function cmpNum(a, op, b, b2){
  a=Number(a); b=Number(b);
  if(op==='between'||op==='notbetween'){
    let lo=Number(b), hi=Number(b2); if(lo>hi){ const t=lo; lo=hi; hi=t; }
    const inside = a>=lo && a<=hi;
    return op==='between' ? inside : !inside;
  }
  switch(op){
    case 'gt': return a>b;  case 'lt': return a<b;
    case 'gte':return a>=b; case 'lte':return a<=b;
    case 'eq': return a===b; case 'neq':return a!==b;
  }
  return true;
}
function findRowById(id){ return FORM.rows.find(r=>r.id===id)||null; }

/* Running total of a scoring section from the in-memory preview answers. */
let _sectionTotalGuard={};
function sectionTotal(section){
  if(!section) return 0;
  if(_sectionTotalGuard[section.id]) return 0; // break a self-referential score gate
  _sectionTotalGuard[section.id]=true;
  let t=0;
  (section.fieldIds||[]).forEach(fid=>{
    const f=findFieldById(fid);
    if(f && isScoreable(f) && scoringFieldCounts(section,fid)) t+=scoreForField(f);
  });
  delete _sectionTotalGuard[section.id];
  return t;
}

/* Evaluate a single showIf rule against the current preview state. No rule
   (or a dangling reference) → visible, so a half-configured rule never hides
   content silently. */
/* ---- Cross-form answer bridge (merged from JAY build) ----
   A shared localStorage store ('credify_xform_v1') where every form publishes
   its current answers + section scores on change. Sibling forms read it so a
   visibility rule can evaluate against REAL answers/scores from another form,
   not just "answered / not answered". Same-browser only — true cross-device
   sync still needs a backend. */
function xBridgeReadAll(){ try{ return JSON.parse(localStorage.getItem('credify_xform_v1')||'{}')||{}; }catch(e){ return {}; } }
function evalCrossFormPreview(c){
  const fm=xBridgeReadAll()[c.formId];
  if(c.type==='score'){
    const has=!!(fm&&fm.scores&&fm.scores[c.sectionId]!=null);
    if(c.op==='any'||c.op==='none') return c.op==='any'?has:!has;
    if(!has) return false;
    return cmpNum(Number(fm.scores[c.sectionId])||0, c.op, Number(c.value)||0, Number(c.value2)||0);
  }
  const rec=fm&&fm.fields?fm.fields[c.fieldId]:null;
  const answered=!!(rec&&rec.a);
  if(c.op==='any'||c.op==='none') return c.op==='any'?answered:!answered;
  if(!rec||!answered) return false;
  const type=rec.t, v=rec.v;
  if(type==='checkboxes'){ const set=Array.isArray(v)?v.map(Number):[]; if(Array.isArray(c.value)){ const any=c.value.map(Number).some(x=>set.indexOf(x)>=0); return c.op==='notincludes'?!any:any; } const has=set.indexOf(Number(c.value))>=0; return c.op==='notincludes'?!has:has; }
  if(type==='radio'||type==='select'){ const sel=(v==null)?null:Number(v); if(Array.isArray(c.value)){ const inSet=c.value.map(Number).indexOf(sel)>=0; return c.op==='neq'?!inSet:inSet; } return c.op==='neq'?(sel!==Number(c.value)):(sel===Number(c.value)); }
  if(NUMERIC_CTRL_TYPES.has(type)){ if(v==null||v==='') return false; return cmpNum(Number(v), c.op, Number(c.value)||0, Number(c.value2)||0); }
  if(BOOL_CTRL_TYPES.has(type)){ const on=!!v; return c.op==='unchecked'?!on:on; }
  const s=String(v==null?'':v).replace(/\s+/g,' ').trim(), vv=String(c.value==null?'':c.value).replace(/\s+/g,' ').trim();
  switch(c.op){ case 'seq':return s.toLowerCase()===vv.toLowerCase(); case 'sneq':return s.toLowerCase()!==vv.toLowerCase(); case 'contains':return s.toLowerCase().indexOf(vv.toLowerCase())>=0; case 'ncontains':return s.toLowerCase().indexOf(vv.toLowerCase())<0; case 'filled':return s.trim()!==''; case 'empty':return s.trim()===''; }
  return true;
}
function evalShowIf(cond){
  if(!cond) return true;
  // Conditional Block: a named set of conditions combined with AND ('all') or
  // OR ('any'). Each sub-condition is evaluated by this same function.
  if(cond.block){
    const cs=cond.conditions||[];
    if(!cs.length) return true;
    const ev=c=>{ const r=evalShowIf(c); return (c&&c.neg)?!r:r; };
    const hasConj=cs.some((c,i)=>i>0 && (c.conj==='and'||c.conj==='or'));
    if(!hasConj) return cond.match==='any' ? cs.some(ev) : cs.every(ev);
    let acc=ev(cs[0]);
    for(let i=1;i<cs.length;i++){ acc=(cs[i].conj==='or')?(acc||ev(cs[i])):(acc&&ev(cs[i])); }
    return acc;
  }
  // Cross-form condition: references a field/section on ANOTHER saved form.
  // Evaluate against the shared bridge (real answers), not the local preview.
  if(cond.formId && cond.formId!==(FORM&&FORM.id)){
    return evalCrossFormPreview(cond);
  }
  if(cond.type==='score'){
    const s=(FORM.scoringSections||[]).find(x=>x.id===cond.sectionId);
    if(!s) return true;
    if(cond.op==='any' || cond.op==='none') return cond.op==='any';
    return cmpNum(sectionTotal(s), cond.op, Number(cond.value)||0, Number(cond.value2)||0);
  }
  const f=findFieldById(cond.fieldId);
  if(!f) return true;
  const ans=PREVIEW_ANSWERS[cond.fieldId];
  // "Has any data" / "has no data" — universal across field types.
  if(cond.op==='any' || cond.op==='none'){
    const answered = previewAnswerFilled(f);
    return cond.op==='any' ? answered : !answered;
  }
  if(f.type==='checkboxes'){
    const set = (ans instanceof Set) ? ans : new Set();
    if(Array.isArray(cond.value)){
      const anyHit = cond.value.map(Number).some(v=>set.has(v));
      return cond.op==='notincludes' ? !anyHit : anyHit;
    }
    const has = set.has(Number(cond.value));
    return cond.op==='notincludes' ? !has : has;
  }
  if(f.type==='radio' || f.type==='select'){
    const sel = ans==null ? null : Number(ans);
    // Label-based string operators: match against the SELECTED option's text.
    if(cond.op==='seq'||cond.op==='sneq'||cond.op==='contains'||cond.op==='ncontains'||cond.op==='filled'||cond.op==='empty'){
      const lbl = (sel!=null && f.options && f.options[sel]!=null) ? String(f.options[sel]) : '';
      const s=lbl.replace(/\s+/g,' ').trim().toLowerCase();
      const v=String(cond.value==null?'':cond.value).replace(/\s+/g,' ').trim().toLowerCase();
      switch(cond.op){
        case 'seq':       return s===v;
        case 'sneq':      return s!==v;
        case 'contains':  return s.indexOf(v)>=0;
        case 'ncontains': return s.indexOf(v)<0;
        case 'filled':    return s!=='';
        case 'empty':     return s==='';
      }
    }
    if(Array.isArray(cond.value)){
      const inSet = cond.value.map(Number).indexOf(sel)>=0;
      return cond.op==='neq' ? !inSet : inSet;
    }
    return cond.op==='neq' ? (sel!==Number(cond.value)) : (sel===Number(cond.value));
  }
  if(NUMERIC_CTRL_TYPES.has(f.type)){ // number / range / rating
    if(ans==null || ans==='') return false; // unanswered numeric → rule false
    return cmpNum(Number(ans), cond.op, Number(cond.value)||0, Number(cond.value2)||0);
  }
  if(STRING_CTRL_TYPES.has(f.type)){
    const s=String(ans==null?'':ans).replace(/\s+/g,' ').trim();
    const v=String(cond.value==null?'':cond.value).replace(/\s+/g,' ').trim();
    switch(cond.op){
      case 'seq':       return s.toLowerCase()===v.toLowerCase();
      case 'sneq':      return s.toLowerCase()!==v.toLowerCase();
      case 'contains':  return s.toLowerCase().indexOf(v.toLowerCase())>=0;
      case 'ncontains': return s.toLowerCase().indexOf(v.toLowerCase())<0;
      case 'filled':    return s.trim()!=='';
      case 'empty':     return s.trim()==='';
    }
    return true;
  }
  if(BOOL_CTRL_TYPES.has(f.type)){
    const on=!!ans;
    return cond.op==='unchecked' ? !on : on;
  }
  return true;
}

/* A field is visible only if its containing row is visible AND its own rule
   passes. */
function fieldVisible(field, row){
  if(row && !evalShowIf(row.showIf)) return false;
  return evalShowIf(field.showIf) && groupVisible(field);
}

/* Iteratively prune preview answers of any field that is currently hidden,
   re-evaluating after each pass since hiding a field changes section totals
   which can hide further fields (cascade). Converges fast; capped so a
   pathological cyclic rule can't spin forever. */
function settlePreviewVisibility(){
  for(let iter=0; iter<8; iter++){
    let changed=false;
    FORM.rows.forEach(row=>{
      const rowVis=evalShowIf(row.showIf);
      row.fields.forEach(f=>{
        const vis = rowVis && evalShowIf(f.showIf) && groupVisible(f) && !fieldHiddenInPreview(f);
        if(!vis && PREVIEW_ANSWERS[f.id]!==undefined){
          delete PREVIEW_ANSWERS[f.id];
          changed=true;
        }
      });
    });
    if(!changed) break;
  }
}

/* Default rule when first attaching a field-based condition to a controller. */
function defaultFieldCond(ctrl){
  if(!ctrl) return null;
  if(ctrl.type==='checkboxes') return {type:'field', fieldId:ctrl.id, op:'includes', value:0};
  if(NUMERIC_CTRL_TYPES.has(ctrl.type)) return {type:'field', fieldId:ctrl.id, op:'gte', value:ctrl.type==='rating'?1:0};
  if(STRING_CTRL_TYPES.has(ctrl.type)) return {type:'field', fieldId:ctrl.id, op:'filled', value:''};
  if(BOOL_CTRL_TYPES.has(ctrl.type)) return {type:'field', fieldId:ctrl.id, op:'checked'};
  return {type:'field', fieldId:ctrl.id, op:'eq', value:0}; // radio/select
}

/* Human-readable summary of a rule for badges / tooltips. */
function describeShowIf(c){
  if(!c) return '';
  if(c.block){
    const cs=c.conditions||[];
    if(!cs.length) return c.name||'(no conditions yet)';
    const d1=x=>{ const d=describeShowIf(x); return (x&&x.neg)?`NOT (${d})`:d; };
    const hasConj=cs.some((x,i)=>i>0 && (x.conj==='and'||x.conj==='or'));
    let body;
    if(!hasConj){ const joiner=c.match==='any'?' or ':' and '; body=cs.map(d1).join(joiner); }
    else { body=d1(cs[0]); for(let i=1;i<cs.length;i++){ body+=(cs[i].conj==='or'?' OR ':' AND ')+d1(cs[i]); } }
    return c.name ? `${c.name}: ${body}` : body;
  }
  const rangeTxt=(label)=> c.op==='between' ? `${label} between ${c.value} and ${c.value2}` : `${label} not between ${c.value} and ${c.value2}`;
  if(c.type==='score'){
    const s=(FORM.scoringSections||[]).find(x=>x.id===c.sectionId);
    const name=`${s?s.name:'section'} score`;
    if(c.op==='any') return `${name} has any value`;
    if(RANGE_OPS.has(c.op)) return rangeTxt(name);
    const sym=((NUM_OPS.find(o=>o.v===c.op)||{}).l||c.op).split(' ')[0];
    return `${name} ${sym} ${c.value}`;
  }
  const f=findFieldById(c.fieldId) || (c.formId ? (findFieldAcrossForms(c.fieldId)||{}).field : null);
  const lbl=f?(f.label||'field'):'field';
  if(c.op==='any') return `${lbl} has any answer`;
  if(c.op==='none') return `${lbl} has no answer`;
  if(f && (f.type==='radio'||f.type==='select'||f.type==='checkboxes')){
    const optName=(i)=>{ const o=(f.options||[])[Number(i)]; return o!=null?o:'?'; };
    if(Array.isArray(c.value)){
      const names=c.value.map(optName).map(n=>`“${n}”`).join(', ');
      const verb = (c.op==='neq'||c.op==='notincludes') ? 'is none of' : 'is any of';
      return `${lbl} ${verb} ${names}`;
    }
    const opt=optName(c.value);
    const verb = c.op==='neq'?'is not':c.op==='notincludes'?'excludes':c.op==='includes'?'includes':'is';
    return `${lbl} ${verb} “${opt}”`;
  }
  if(f && STRING_CTRL_TYPES.has(f.type)){
    switch(c.op){
      case 'seq':       return `${lbl} is “${c.value}”`;
      case 'sneq':      return `${lbl} is not “${c.value}”`;
      case 'contains':  return `${lbl} contains “${c.value}”`;
      case 'ncontains': return `${lbl} doesn’t contain “${c.value}”`;
      case 'filled':    return `${lbl} is filled in`;
      case 'empty':     return `${lbl} is empty`;
    }
    return lbl;
  }
  if(f && BOOL_CTRL_TYPES.has(f.type)){
    return c.op==='unchecked' ? `${lbl} is not checked` : `${lbl} is checked`;
  }
  if(RANGE_OPS.has(c.op)) return rangeTxt(lbl);
  const sym=((NUM_OPS.find(o=>o.v===c.op)||{}).l||c.op).split(' ')[0];
  return `${lbl} ${sym} ${c.value}`;
}

/* Candidate controller fields for a field/row target: every CONTROLLER_TYPE
   field except the target field itself (and, for a row target, the fields in
   that same row). */
function controllerCandidates(target){
  const excludeIds=new Set();
  if(target.kind==='field' && target.obj) excludeIds.add(target.obj.id);
  if(target.kind==='row' && target.obj) (target.obj.fields||[]).forEach(f=>excludeIds.add(f.id));
  // For a page rule, don't let it depend on a field that lives on that same
  // page (it would vanish with the page); page rules should key off earlier pages.
  if(target.kind==='page'){ FORM.rows.forEach(r=>{ if(pageOf(r)===target.page) r.fields.forEach(f=>excludeIds.add(f.id)); }); }
  if(target.kind==='vgroup' && target.obj) (target.obj.fieldIds||[]).forEach(fid=>excludeIds.add(fid));
  return FORM.rows.flatMap(r=>r.fields).filter(f=>CONTROLLER_TYPES.has(f.type) && !excludeIds.has(f.id));
}

/* Drop any showIf whose controller field / section has gone away or is no
   longer usable. Keeps the saved form internally consistent. */
function pruneConditions(){
  // True if a condition (or block) still references live controllers; for a
  // block, dead sub-conditions are filtered out in place and the block is kept
  // only while it still has at least one valid condition.
  const condStillValid=(c, selfId)=>{
    if(!c) return false;
    if(c.block){
      c.conditions=(c.conditions||[]).filter(sub=>condStillValid(sub, selfId));
      return c.conditions.length>0;
    }
    if(c.type==='score') return (FORM.scoringSections||[]).some(s=>s.id===c.sectionId);
    const f=findFieldById(c.fieldId);
    if(!f){
      // Cross-form reference: the controller field lives on another form, so it
      // will never be found in THIS form. Keep it as long as the referenced
      // form still exists (prune only genuinely dead refs to deleted forms).
      if(c.formId) return (FORMS||[]).some(x=>x.id===c.formId);
      return false;
    }
    return !!(CONTROLLER_TYPES.has(f.type) && f.id!==selfId);
  };
  const dropIfBad=(holder)=>{
    if(!holder.showIf) return;
    if(!condStillValid(holder.showIf, holder.id)) delete holder.showIf;
  };
  FORM.rows.forEach(row=>{
    dropIfBad(row);
    row.fields.forEach(dropIfBad);
  });
  // Page rules live in FORM.pageRules keyed by page number. Drop rules for
  // pages that no longer exist or whose controller/section vanished.
  if(FORM.pageRules){
    const pages=pageCount();
    Object.keys(FORM.pageRules).forEach(k=>{
      const n=Number(k);
      const c=FORM.pageRules[k];
      if(!(n>=1 && n<=pages) || !condStillValid(c, null)) delete FORM.pageRules[k];
    });
    if(Object.keys(FORM.pageRules).length===0) delete FORM.pageRules;
  }
}

/* ----- Visibility editor (shared by the field inspector, row modal, page modal) -----
   `scope` is a token: "field:<fieldId>", "row:<rowId>", or "page:<pageNumber>". */
function resolveVizTarget(scope){
  const i=scope.indexOf(':');
  const kind=scope.slice(0,i), id=scope.slice(i+1);
  if(kind==='field') return {kind, obj:findFieldById(id)};
  if(kind==='row')   return {kind, obj:findRowById(id)};
  if(kind==='page')  return {kind, page:Number(id), obj:null};
  if(kind==='vgroup') return {kind, obj:(FORM.visibilityGroups||[]).find(g=>g.id===id)||null};
  if(kind==='scfield'){ // scoring per-field condition: id is "<groupId>:<fieldId>"
    const ci=id.indexOf(':'); const gid=id.slice(0,ci), fid=id.slice(ci+1);
    return {kind, obj:(FORM.scoringSections||[]).find(g=>g.id===gid)||null, groupId:gid, fieldId:fid};
  }
  return {kind:null, obj:null};
}
// Unified read/write of a target's condition, so field/row (stored on the
// object) and page (stored in FORM.pageRules) share the same editor code.
function getVizCond(t){
  if(t.kind==='page') return (FORM.pageRules||{})[t.page];
  if(t.kind==='scfield') return (t.obj && t.obj.scoreConds) ? t.obj.scoreConds[t.fieldId] : undefined;
  return t.obj ? t.obj.showIf : undefined;
}
function setVizCond(t, cond){
  if(t.kind==='page'){
    if(cond){ FORM.pageRules=FORM.pageRules||{}; FORM.pageRules[t.page]=cond; }
    else if(FORM.pageRules){ delete FORM.pageRules[t.page]; if(!Object.keys(FORM.pageRules).length) delete FORM.pageRules; }
    return;
  }
  if(!t.obj) return;
  if(t.kind==='scfield'){
    if(cond){ t.obj.scoreConds=t.obj.scoreConds||{}; t.obj.scoreConds[t.fieldId]=cond; }
    else if(t.obj.scoreConds){ delete t.obj.scoreConds[t.fieldId]; if(!Object.keys(t.obj.scoreConds).length) delete t.obj.scoreConds; }
    return;
  }
  if(cond) t.obj.showIf=cond; else delete t.obj.showIf;
}
function vizTargetValid(t){ return t.kind==='page' ? !!t.page : !!t.obj; }

/* ============================================================
   DISPLAY FIELDS — roomy visibility editor (Conditional Blocks)
   ============================================================
   Replaces the cramped inline visibility editor. A target (field / vgroup /
   row / page) is shown when its Conditional Block passes. A block is a named
   set of conditions combined with AND ('all') or OR ('any'). Two framings:
     • "any data"  → each condition just checks the controller HAS an answer.
     • "condition" → each condition is operator + value(s) (option chips for
       choice fields, supporting multi-select = "is any of").
   The same engine (evalShowIf / export evalCond) handles single conditions and
   blocks, so older single-condition rules load seamlessly. */
let DISP_SCOPE=null, DISP_BLOCK=null, DISP_MODE='cond', DISP_SEARCH='', DISP_FROM_MANAGER=false;
let DISP_SCORE_MODE=false;  // true when the editor is gating a scoring field's points (scfield scope)
let DISP_FROM_SCORING=false; // came from the Scoring modal → return there on save/close
let DISP_SHOW=[]; // field IDs to reveal when the condition is met (the "show list")
let DISP_SHOW_ORIG=[]; // show-list as loaded, so de-selected fields get cleared on save
let DISP_PARENT=''; // the parent/controller field this rule is keyed on (its condition is primary)
let DISP_SEARCH_SCOPE='this', DISP_POPUP_SEARCH='';
// Conditions column layout in expanded mode: 'auto' (2 cols at 5+ conditions),
// or a manual override of 1 or 2.
let DISP_COLS='2';  // default the conditions layout to two columns
let DISP_FIELDLAYOUT='right';  // 'right' = operator beside field name (default); 'below' = stacked
/* Every saved form plus the working form, so the editor can search across forms. */
function allFormsForSearch(){
  const list=[]; const seen=new Set();
  if(FORM && FORM.id){ list.push(FORM); seen.add(FORM.id); }
  (FORMS||[]).forEach(f=>{ if(f && f.id && !seen.has(f.id)){ list.push(f); seen.add(f.id); } });
  return list;
}
function fieldTypeNameByType(type){ const t=FIELD_TYPES.find(x=>x.type===type); return t?t.label:(type||'field'); }
/* Controller fields across ALL forms (for "All forms" search). Current-form
   fields are tagged sameForm:true; the target field itself is excluded. */
function allFormControllerCandidates(t){
  const selfId = (t && t.kind==='field' && t.obj) ? t.obj.id : null;
  const out=[];
  allFormsForSearch().forEach(frm=>{
    const sameForm = frm.id===(FORM&&FORM.id);
    (frm.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{
      if(!CONTROLLER_TYPES.has(f.type)) return;
      if(sameForm && f.id===selfId) return;
      out.push({id:f.id, label:f.label, type:f.type, options:f.options||[], formId:frm.id, formTitle:frm.title||'Untitled form', sameForm});
    }));
  });
  return out;
}
function findFieldAcrossForms(fieldId){
  for(const frm of allFormsForSearch()){
    const f=(frm.rows||[]).flatMap(r=>r.fields||[]).find(x=>x.id===fieldId);
    if(f) return {field:f, formId:frm.id, formTitle:frm.title||'Untitled form'};
  }
  return null;
}
function fieldTypeName(f){ const t=FIELD_TYPES.find(x=>x.type===(f&&f.type)); return t?t.label:(f?f.type:'field'); }
function normalizeToBlock(cond){
  if(cond && cond.block) return JSON.parse(JSON.stringify(cond));
  if(cond) return {block:true, name:'', match:'all', conditions:[JSON.parse(JSON.stringify(cond))]};
  return {block:true, name:'', match:'all', conditions:[]};
}
function dispTargetLabel(t){
  if(!t) return '';
  if(t.kind==='field') return t.obj?('“'+(t.obj.label||'Untitled')+'”'):'field';
  if(t.kind==='vgroup'){ const n=(t.obj&&t.obj.fieldIds||[]).length; return 'a group of '+n+' field'+(n===1?'':'s'); }
  if(t.kind==='row') return 'this row';
  if(t.kind==='page') return 'page '+t.page;
  return 'this field';
}
function openDisplayFields(scope){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const t=resolveVizTarget(scope);
  if(!vizTargetValid(t)){ toast('Target not found'); return; }
  DISP_SCOPE=scope;
  DISP_SCORE_MODE=(t.kind==='scfield');
  // Scoring-condition mode: a free condition stack that gates whether a scored
  // field's points count. No parent field, no show-cluster.
  if(t.kind==='scfield'){
    DISP_BLOCK = normalizeToBlock(getVizCond(t));
    DISP_SHOW=[]; DISP_SHOW_ORIG=[]; DISP_PARENT='';
    DISP_SEARCH=''; DISP_COLS='2'; DISP_FIELDLAYOUT='right';
    const box0=document.getElementById('dispfields-modal-box'); if(box0) box0.classList.remove('expanded');
    const eb0=document.getElementById('dispfields-expand-btn'); if(eb0) eb0.textContent='⤢ Expand';
    const h3=document.querySelector('#dispfields-modal-box .modal-head h3'); if(h3) h3.textContent='Scoring condition';
    openModal('dispfields-modal');
    renderDisplayFields();
    return;
  }
  const h3s=document.querySelector('#dispfields-modal-box .modal-head h3'); if(h3s) h3s.textContent='Show Fields';
  // Model: a rule is keyed on a PARENT field (the controller). The parent's
  // condition is primary (conditions[0]); the cluster of fields to SHOW reveal
  // when it's met. Extra conditions (conditions[1+]) are optional.
  if(t.kind==='vgroup' && t.obj){
    DISP_BLOCK = normalizeToBlock(t.obj.showIf);
    DISP_SHOW = (t.obj.fieldIds||[]).slice();
    DISP_PARENT = (DISP_BLOCK.conditions[0] && DISP_BLOCK.conditions[0].fieldId) || '';
  } else if(t.kind==='field' && t.obj){
    const self=t.obj;
    const allF=FORM.rows.flatMap(r=>r.fields);
    if(self.showIf && self.showIf.conditions && self.showIf.conditions.length){
      // Clicked a SHOWN (cluster) field — edit its rule; parent = its controller.
      DISP_BLOCK = normalizeToBlock(self.showIf);
      DISP_PARENT = DISP_BLOCK.conditions[0].fieldId || '';
      const key=JSON.stringify(self.showIf);
      DISP_SHOW = allF.filter(f=>f.showIf && JSON.stringify(f.showIf)===key).map(f=>f.id);
    } else {
      // Clicked a controller / fresh field — IT is the parent. Pull in any
      // existing cluster (fields whose primary condition references it).
      DISP_PARENT = self.id;
      DISP_SHOW = allF.filter(f=>f.showIf && f.showIf.conditions && f.showIf.conditions[0] && f.showIf.conditions[0].fieldId===self.id).map(f=>f.id);
      DISP_BLOCK = DISP_SHOW.length
        ? normalizeToBlock(findFieldById(DISP_SHOW[0]).showIf)
        : {block:true, name:'', match:'all', conditions:[{type:'field', fieldId:self.id, op:'any'}]};
    }
  } else {
    DISP_BLOCK = normalizeToBlock(getVizCond(t));
    DISP_SHOW = [];
    DISP_PARENT = (DISP_BLOCK.conditions[0] && DISP_BLOCK.conditions[0].fieldId) || '';
  }
  // The parent condition must exist and sit at index 0 (so the editor can render
  // it up top with the controller fixed to the parent).
  if(DISP_PARENT){
    const pIdx=DISP_BLOCK.conditions.findIndex(c=>c.type!=='score' && c.fieldId===DISP_PARENT);
    if(pIdx<0){ DISP_BLOCK.conditions.unshift({type:'field', fieldId:DISP_PARENT, op:'any'}); }
    else if(pIdx>0){ const [pc]=DISP_BLOCK.conditions.splice(pIdx,1); DISP_BLOCK.conditions.unshift(pc); }
  }
  // The parent is the controller, never a member of its own show cluster.
  DISP_SHOW = DISP_SHOW.filter(id=>id!==DISP_PARENT);
  DISP_SHOW_ORIG=DISP_SHOW.slice();
  DISP_SEARCH='';
  DISP_COLS='2';
  DISP_FIELDLAYOUT='right';
  // Open collapsed (compact) by default; the user can Expand to the wide,
  // two-column conditions layout.
  const box=document.getElementById('dispfields-modal-box');
  if(box) box.classList.remove('expanded');
  const eb=document.getElementById('dispfields-expand-btn');
  if(eb) eb.textContent='⤢ Expand';
  openModal('dispfields-modal');
  renderDisplayFields();
}
/* Toggle the Display Fields modal between the standard large size and a
   near-fullscreen "expanded" mode that lays all added conditions out in a grid
   so they're visible at once without scrolling. */
function toggleDispExpand(){
  const box=document.getElementById('dispfields-modal-box');
  const eb=document.getElementById('dispfields-expand-btn');
  if(!box) return;
  const on=box.classList.toggle('expanded');
  if(eb) eb.textContent= on ? '⤡ Collapse' : '⤢ Expand';
}
// Universal operators offered for EVERY controller type, on top of the
// type-specific ones below: the simple "answered / not answered" checks.
const ANSWER_OPS = [{v:'any',l:'has any answer'},{v:'none',l:'has no answer'}];
function dispOpSelect(i, c, typeOps){
  const all = ANSWER_OPS.concat(typeOps);
  return `<select class="disp-op enhance-dd" onchange="dispSetOp(${i},this.value)">${all.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}</select>`;
}
function dispValueUI(i, f, c){
  const answerOnly = (c.op==='any'||c.op==='none');
  // Section-score condition (no field): numeric comparison operators.
  if(c.type==='score'){
    const two=RANGE_OPS.has(c.op);
    return dispOpSelect(i,c,NUM_OPS) + (answerOnly?'':`
      <input type="number" class="disp-val" value="${esc(c.value!=null?c.value:'')}" oninput="dispSetVal(${i},this.value)" placeholder="score">
      ${two?`<span class="disp-and">and</span><input type="number" class="disp-val" value="${esc(c.value2!=null?c.value2:'')}" oninput="dispSetVal2(${i},this.value)" placeholder="score">`:''}`);
  }
  if(!f) return '';
  if(f.type==='checkboxes'){
    const opsList=[{v:'includes',l:'includes any of'},{v:'notincludes',l:'includes none of'}];
    const sel = Array.isArray(c.value)?c.value.map(Number):(c.value!=null?[Number(c.value)]:[]);
    const chips=(f.options||[]).map((o,oi)=>`<button type="button" class="disp-opt${sel.indexOf(oi)>=0?' on':''}" onclick="dispToggleOpt(${i},${oi})">${esc(o)}</button>`).join('');
    return dispOpSelect(i,c,opsList) + (answerOnly?'':`
      <div class="disp-opts">${chips||'<span class="disp-noopt">Add options to this field first</span>'}</div>`);
  }
  if(f.type==='radio'||f.type==='select'){
    // Membership ops (pick option chips) PLUS label-text ops (match the chosen
    // option's text): is / is not / contains / does not contain.
    const opsList=[{v:'eq',l:'is any of'},{v:'neq',l:'is none of'},{v:'seq',l:'is'},{v:'sneq',l:'is not'},{v:'contains',l:'contains'},{v:'ncontains',l:'does not contain'}];
    if(answerOnly) return dispOpSelect(i,c,opsList);
    const isTextOp=(c.op==='seq'||c.op==='sneq'||c.op==='contains'||c.op==='ncontains');
    if(isTextOp){
      return dispOpSelect(i,c,opsList) + `
        <input type="text" class="disp-val" value="${esc(c.value!=null&&!Array.isArray(c.value)?c.value:'')}" oninput="dispSetVal(${i},this.value)" placeholder="option text">`;
    }
    const sel = Array.isArray(c.value)?c.value.map(Number):(c.value!=null?[Number(c.value)]:[]);
    const chips=(f.options||[]).map((o,oi)=>`<button type="button" class="disp-opt${sel.indexOf(oi)>=0?' on':''}" onclick="dispToggleOpt(${i},${oi})">${esc(o)}</button>`).join('');
    return dispOpSelect(i,c,opsList) + `
      <div class="disp-opts">${chips||'<span class="disp-noopt">Add options to this field first</span>'}</div>`;
  }
  if(NUMERIC_CTRL_TYPES.has(f.type)){
    const two=RANGE_OPS.has(c.op);
    return dispOpSelect(i,c,NUM_OPS) + (answerOnly?'':`
      <input type="number" class="disp-val" value="${esc(c.value!=null?c.value:'')}" oninput="dispSetVal(${i},this.value)" placeholder="value">
      ${two?`<span class="disp-and">and</span><input type="number" class="disp-val" value="${esc(c.value2!=null?c.value2:'')}" oninput="dispSetVal2(${i},this.value)" placeholder="value">`:''}`);
  }
  if(STRING_CTRL_TYPES.has(f.type)){
    const noVal=answerOnly||STR_NOVALUE_OPS.has(c.op);
    if(noVal) return dispOpSelect(i,c,STR_OPS);
    // Phone fields get a live (555) 123-4567 mask for whole-number matches so
    // the rule value and the masked form input compare like-for-like. For
    // contains/does-not-contain we leave it plain so partial digits still work.
    if(f.type==='phone' && (c.op==='seq'||c.op==='sneq')){
      return dispOpSelect(i,c,STR_OPS) + `
      <input type="tel" inputmode="tel" class="disp-val" maxlength="14" value="${esc(formatUSPhone(c.value!=null?c.value:''))}" oninput="dispSetPhoneVal(${i},this)" placeholder="(555) 123-4567">`;
    }
    return dispOpSelect(i,c,STR_OPS) + `
      <input type="text" class="disp-val" value="${esc(c.value!=null?c.value:'')}" oninput="dispSetVal(${i},this.value)" placeholder="text">`;
  }
  if(BOOL_CTRL_TYPES.has(f.type)){
    return dispOpSelect(i,c,BOOL_OPS);
  }
  return '';
}
/* ----- Scoring-condition editor (reuses the Show Fields condition stack) -----
   Renders a slim editor: a free AND/OR/NOT condition stack (each row targets a
   field's answer or a section score) that gates whether the scored field's
   points count. No parent field, no show-cluster, no notify. */
function dispScoreCondHTML(i,c,ctrlOpts,scoreOpts){
  const isScore = c.type==='score';
  const f = isScore ? null : findFieldById(c.fieldId);
  const selVal = isScore ? ('score:'+c.sectionId) : (c.fieldId||'');
  const ctrlSel=`<select class="disp-cond-field enhance-dd" onchange="dispSetCondField(${i},this.value)">
    <option value="">— choose a field —</option>
    ${ctrlOpts.map(o=>`<option value="${o.id}"${selVal===o.id?' selected':''}>${esc(o.label||'Untitled')}</option>`).join('')}
    ${scoreOpts.length?`<optgroup label="Scores">${scoreOpts.map(sx=>`<option value="score:${sx.id}"${selVal==='score:'+sx.id?' selected':''}>∑ ${esc(sx.name||'Score')}</option>`).join('')}</optgroup>`:''}
  </select>`;
  const opUI = isScore ? dispValueUI(i,null,c) : (f ? dispValueUI(i,f,c) : '<span class="disp-noopt">Pick a field first</span>');
  let conjRow='';
  if(i>0){
    const _logic = c.neg ? 'not' : (c.conj==='or' ? 'or' : 'and');
    conjRow=`<div class="disp-conj-row"><select class="disp-conj enhance-dd" onchange="dispSetLogic(${i},this.value)"><option value="and"${_logic==='and'?' selected':''}>AND</option><option value="or"${_logic==='or'?' selected':''}>OR</option><option value="not"${_logic==='not'?' selected':''}>NOT</option></select></div>`;
  }
  return `<div class="disp-cond-extra">
    ${conjRow}
    <div class="disp-cond disp-cond-row">
      <div class="disp-cond-left">${ctrlSel}</div>
      <div class="disp-cond-right">${opUI}</div>
      <button class="disp-x disp-cond-x" type="button" title="Remove condition" onclick="dispRemoveCond(${i})">✕</button>
    </div>
  </div>`;
}
function renderScoreCondEditor(body){
  const t=resolveVizTarget(DISP_SCOPE);
  const scored = t.fieldId ? findFieldAnyForm(t.fieldId) : null;
  const grp = t.obj;
  const conds=DISP_BLOCK.conditions||[];
  const ctrlOpts=FORM.rows.flatMap(r=>r.fields).filter(f=>CONTROLLER_TYPES.has(f.type));
  const scoreOpts=(FORM.scoringSections||[]);
  let h='';
  h+=`<div class="disp-anchor"><span class="disp-anchor-lbl">Points count when</span><span class="disp-anchor-name">${esc(scored?(scored.label||'Untitled'):'this field')}</span>${scored?`<span class="disp-pill">${esc(fieldTypeName(scored))}</span>`:''}${grp?`<span class="disp-pill">in ${esc(grp.name||'group')}</span>`:''}</div>`;
  h+=`<div class="disp-section disp-section-parent">
    <div class="disp-section-head"><span class="disp-section-title">This field scores only when…</span></div>
    <div class="disp-conds-grid disp-cols-1">
      ${conds.length?conds.map((c,i)=>dispScoreCondHTML(i,c,ctrlOpts,scoreOpts)).join(''):'<div class="disp-empty">No conditions yet — add one below. With none, this field always scores.</div>'}
    </div>
    <button class="btn disp-add-cond" type="button" onclick="dispAddCondition()">+ Add condition</button>
    <p class="disp-cond-help">Stack as many as you need — choose AND / OR / NOT between each (NOT = and-not). Target a field's answer or a score. When the stack is met this field contributes its points; otherwise 0.</p>
  </div>`;
  body.innerHTML=h;
  try{ enhanceDropdowns(body); }catch(e){}
}
function renderDisplayFields(){
  const body=document.getElementById('dispfields-body'); if(!body) return;
  if(DISP_SCORE_MODE){ renderScoreCondEditor(body); return; }
  const t=resolveVizTarget(DISP_SCOPE);
  const conds=DISP_BLOCK.conditions||[];
  const ctrlOpts=FORM.rows.flatMap(r=>r.fields).filter(f=>CONTROLLER_TYPES.has(f.type));
  const scoreOpts=(FORM.scoringSections||[]);
  const parent=DISP_PARENT?findFieldById(DISP_PARENT):null;
  let h='';

  // ===== Anchor + PARENT condition (top) — the parent field is conditional =====
  if(parent){
    h+=`<div class="disp-anchor"><span class="disp-anchor-lbl">Show rule for</span><span class="disp-anchor-name">${esc(parent.label||'Untitled')}</span><span class="disp-pill">${esc(fieldTypeName(parent))}</span></div>`;
  }
  // The parent's own condition lives at conditions[0]; controller is fixed.
  const pc = conds[0];
  if(parent && pc){
    h+=`<div class="disp-section disp-section-parent">
      <div class="disp-section-head"><span class="disp-section-title">When ${esc(parent.label||'this field')}…</span></div>
      <div class="disp-conds-grid disp-cols-1">
        <div class="disp-cond disp-cond-row">
          <div class="disp-cond-left"><span class="disp-cond-name">${esc(parent.label||'Untitled')}</span></div>
          <div class="disp-cond-right">${dispValueUI(0, parent, pc)}</div>
        </div>
        ${conds.map((c,i)=>i>0?dispExtraCondHTML(i,c,ctrlOpts,scoreOpts):'').join('')}
      </div>
      <button class="btn disp-add-cond" type="button" onclick="dispAddCondition()">+ Add condition</button>
      <p class="disp-cond-help">Stack as many as you need — choose AND / OR / NOT between each (NOT = and-not). Target a field or a score.</p>
    </div>`;
  }

  // ===== Show these fields (cluster) — added plain, 99% of the time =====
  h+=`<div class="disp-section">
    <div class="disp-section-head"><span class="disp-section-title">Show these fields</span>${DISP_SHOW.length?`<span class="disp-show-count">${DISP_SHOW.length} selected</span>`:''}</div>`;
  if(DISP_SHOW.length){
    h+=`<div class="disp-show-chips">`;
    DISP_SHOW.forEach(id=>{ const f=findFieldById(id); if(!f) return;
      h+=`<span class="disp-show-chip"><span class="disp-show-chip-name">${esc(f.label||'Untitled')}</span><span class="disp-pill">${esc(fieldTypeName(f))}</span><button onclick="dispRemoveShowField('${id}')" title="Remove">✕</button></span>`;
    });
    h+=`</div>`;
  } else {
    h+=`<div class="disp-empty">No fields chosen yet — pick fields below to add them to this cluster.</div>`;
  }
  const q=DISP_SEARCH.trim().toLowerCase();
  const condIds=conds.map(c=>c.fieldId).filter(Boolean);
  const cands=FORM.rows.flatMap(r=>r.fields).filter(f=>!DISPLAY_ONLY_TYPES.has(f.type) && f.id!==DISP_PARENT && DISP_SHOW.indexOf(f.id)<0 && condIds.indexOf(f.id)<0);
  const matches=cands.filter(f=>!q || (f.label||'').toLowerCase().indexOf(q)>=0 || fieldTypeName(f).toLowerCase().indexOf(q)>=0).slice(0,60);
  h+=`<input type="text" class="disp-search-in" placeholder="Search fields to show…" value="${esc(DISP_SEARCH)}" oninput="dispSearchInput(this.value)">
    <div class="disp-results">`;
  if(!matches.length){ h+=`<div class="disp-empty">No more fields to add.</div>`; }
  else matches.forEach(f=>{
    h+=`<button type="button" class="disp-result" onclick="dispAddShowField('${f.id}')" title="Add this field to the show cluster">
      <span class="disp-result-name">${esc(f.label||'Untitled')}</span>
      <span class="disp-pill">${esc(fieldTypeName(f))}</span>
      <span class="disp-plus">+ add</span>
    </button>`;
  });
  h+=`</div></div>`;

  // ===== Open a form when met (popup) =====
  const of=DISP_BLOCK.openForm;
  h+=`<div class="disp-popup">
    <label class="disp-search-lbl">Open a form when met <span style="font-weight:400;color:var(--text-muted-2)">(opens at 80%, min/max, then return)</span></label>`;
  if(of){
    h+=`<div class="disp-popup-sel"><span class="disp-popup-name">▣ ${esc(of.title||'Selected form')}</span><button class="disp-x" title="Remove" onclick="dispClearPopupForm()">✕</button></div>`;
  } else {
    h+=`<input type="text" class="disp-popup-search" placeholder="Search forms to open…" value="${esc(DISP_POPUP_SEARCH)}" oninput="dispPopupSearch(this.value)">
      <div class="disp-popup-results">${dispPopupFormResults()}</div>`;
  }
  h+=`</div>`;

  // ===== Notifications (notify roles / users / contacts when this rule fires) =====
  const _nn = DISP_BLOCK.notify || {};
  const _nchips = recipientChips(_nn.roles, _nn.userIds, _nn.patient, _nn.clientIds);
  h+=`<div class="disp-section disp-section-notify">
    <div class="disp-section-head"><span class="disp-section-title">Notifications <span class="disp-opt-tag">optional</span></span></div>
    <p class="disp-cond-help">When this rule’s condition is met, notify the people you choose. Leave empty for none.</p>
    <div class="alert-notify">
      <div class="acc-sub">🔔 Notify when this fires</div>
      <div class="acc-row">
        <label class="acc-check inline"><input type="checkbox" ${_nn.sms?'checked':''} onchange="dispSetNotify('sms',this.checked)"> SMS</label>
        <label class="acc-check inline"><input type="checkbox" ${_nn.email?'checked':''} onchange="dispSetNotify('email',this.checked)"> Email</label>
      </div>
      <label class="acc-check"><input type="checkbox" ${_nn.patient?'checked':''} onchange="dispSetNotify('patient',this.checked)"> Notify the patient/contact who submitted</label>
      <div class="acc-chips">${_nchips.length?_nchips.map(c=>`<span class="acc-chip">${esc(c)}</span>`).join(''):'<span class="acc-none">No recipients yet</span>'}</div>
      <button class="btn" style="width:100%" onclick="dispOpenNotifyPicker()">Choose roles, users &amp; contacts…</button>
      ${(_nn.sms||_nn.email)?'':'<p class="acc-hint" style="margin-top:5px">Pick a channel above to enable delivery.</p>'}
    </div>
  </div>`;
  body.innerHTML=h;
  try{ enhanceDropdowns(body); }catch(e){}
}
function dispPopupFormResults(){
  const q=(DISP_POPUP_SEARCH||'').trim().toLowerCase();
  const forms=allFormsForSearch().filter(f=>f.id!==(FORM&&FORM.id) || true) // include current too (a form can open itself? exclude self)
    .filter(f=>f.id!==(FORM&&FORM.id))
    .filter(f=>!q || (f.title||'').toLowerCase().indexOf(q)>=0).slice(0,40);
  if(!forms.length) return `<div class="disp-empty">No other saved forms${q?' match':' yet'}. Use “Add 5 sample forms”.</div>`;
  return forms.map(f=>`<button type="button" class="disp-popup-result" onclick="dispSetPopupForm('${f.id}')">
    <span class="disp-result-name">${esc(f.title||'Untitled form')}</span>
    <span class="disp-pill">${(f.rows||[]).reduce((a,r)=>a+(r.fields||[]).length,0)} fields</span>
    <span class="disp-plus">+ add</span>
  </button>`).join('');
}
function dispSetSearchScope(s){ DISP_SEARCH_SCOPE=s; DISP_SEARCH=''; renderDisplayFields(); }
function dispPopupSearch(v){ DISP_POPUP_SEARCH=v; const box=document.querySelector('.disp-popup-results'); if(box) box.innerHTML=dispPopupFormResults(); }
function dispSetPopupForm(id){ const f=(FORMS||[]).find(x=>x.id===id)||(FORM&&FORM.id===id?FORM:null); if(!f) return; DISP_BLOCK.openForm={id:f.id, title:f.title||'Untitled form'}; DISP_POPUP_SEARCH=''; renderDisplayFields(); }
function dispClearPopupForm(){ delete DISP_BLOCK.openForm; renderDisplayFields(); }

/* ----- Popup-on-condition (preview) ----- */
let PREVIEW_POPUP_OPENED={};
function collectOpenFormRules(){
  const out=[]; const seen=new Set();
  const add=(key,cond)=>{ const sig=JSON.stringify(cond&&cond.openForm)+'|'+JSON.stringify(cond&&cond.conditions); if(seen.has(sig)) return; seen.add(sig); out.push({key:sig, cond}); };
  (FORM.rows||[]).forEach(row=>{
    if(row.showIf&&row.showIf.openForm) add('row:'+row.id, row.showIf);
    (row.fields||[]).forEach(f=>{ if(f.showIf&&f.showIf.openForm) add('field:'+f.id, f.showIf); });
  });
  (FORM.visibilityGroups||[]).forEach(g=>{ if(g.showIf&&g.showIf.openForm) add('vgroup:'+g.id, g.showIf); });
  if(FORM.pageRules) Object.keys(FORM.pageRules).forEach(p=>{ const c=FORM.pageRules[p]; if(c&&c.openForm) add('page:'+p, c); });
  return out;
}
function checkPreviewPopups(){
  collectOpenFormRules().forEach(r=>{
    const met=evalShowIf(r.cond);
    if(met && !PREVIEW_POPUP_OPENED[r.key]){ PREVIEW_POPUP_OPENED[r.key]=true; openPopupForm(r.cond.openForm.id, r.cond.openForm.title); }
    else if(!met){ PREVIEW_POPUP_OPENED[r.key]=false; }
  });
}
function openPopupForm(formId, title){
  const f=(FORMS||[]).find(x=>x.id===formId)||((FORM&&FORM.id===formId)?FORM:null);
  const modal=document.getElementById('popupform-modal'); if(!modal) return;
  if(!f){ toast('Linked form not found'); return; }
  const ttl=modal.querySelector('.popupform-title'); if(ttl) ttl.textContent=(title||f.title||'Form');
  const frame=document.getElementById('popupform-frame');
  if(frame){ try{ frame.srcdoc=buildHTMLForFormObj(JSON.parse(JSON.stringify(f))); }catch(e){ frame.srcdoc='<p style="font:14px sans-serif;padding:24px">Could not render this form.</p>'; } }
  modal.classList.remove('popup-min','popup-full'); modal.classList.add('open');
}
function popupFormToggleMin(){ const m=document.getElementById('popupform-modal'); m.classList.toggle('popup-min'); m.classList.remove('popup-full'); }
function popupFormMax(){ const m=document.getElementById('popupform-modal'); m.classList.toggle('popup-full'); m.classList.remove('popup-min'); }
function popupFormClose(){ const m=document.getElementById('popupform-modal'); m.classList.remove('open','popup-min','popup-full'); const fr=document.getElementById('popupform-frame'); if(fr) fr.removeAttribute('srcdoc'); }
function dispSetMode(mode){
  DISP_MODE=mode;
  (DISP_BLOCK.conditions||[]).forEach(c=>{
    const f=findFieldById(c.fieldId);
    if(mode==='any'){ c.op='any'; delete c.value; delete c.value2; }
    else {
      const def=f?defaultFieldCond(f):null;
      if(def){ c.op=def.op; if('value' in def) c.value=def.value; else delete c.value; delete c.value2;
        if(f&&['radio','select','checkboxes'].includes(f.type)) c.value=[Number(def.value)||0];
      }
    }
  });
  renderDisplayFields();
}
function dispSeedSamplesAndRefresh(){
  if(typeof seedRichSampleForms==='function') seedRichSampleForms();
  // Re-render the popup so the newly-added forms' fields show in the search.
  renderDisplayFields();
}
function dispSetCols(mode){ DISP_COLS=mode; renderDisplayFields(); }
function dispSetFieldLayout(mode){ DISP_FIELDLAYOUT=(mode==='below')?'below':'right'; renderDisplayFields(); }
function dispSetMatch(m){ DISP_BLOCK.match=m; renderDisplayFields(); }
function dispSetName(v){ DISP_BLOCK.name=v; }
function dispEnsureNotify(){ if(!DISP_BLOCK.notify||typeof DISP_BLOCK.notify!=='object') DISP_BLOCK.notify={sms:false,email:false,patient:false,roles:[],userIds:[],clientIds:[]}; const n=DISP_BLOCK.notify; ['roles','userIds','clientIds'].forEach(k=>{ if(!Array.isArray(n[k])) n[k]=[]; }); return n; }
function dispNotifyHasAny(n){ return !!(n && (n.sms||n.email||n.patient||(n.roles&&n.roles.length)||(n.userIds&&n.userIds.length)||(n.clientIds&&n.clientIds.length))); }
function dispSetNotify(prop,on){ if(currentFormReadOnly())return; dispEnsureNotify()[prop]=!!on; renderDisplayFields(); }
function dispOpenNotifyPicker(){ if(currentFormReadOnly())return; openRecipientPicker({ title:'Notify which roles, users & contacts?', sub:'These recipients are notified when this rule fires.', sink:dispEnsureNotify(), includeClients:true, onApply:()=>{ renderDisplayFields(); } }); }
function dispSearchInput(v){ DISP_SEARCH=v; renderDisplayFields(); const inp=document.querySelector('.disp-search-in'); if(inp){ inp.focus(); try{ inp.setSelectionRange(inp.value.length,inp.value.length); }catch(e){} } }
function dispScrollToBlock(){
  // After adding a condition (the user is usually scrolled down at the field
  // search), bring the conditions block at the top back into view.
  try{ const mb=document.querySelector('#dispfields-modal .modal-body'); if(mb) mb.scrollTo({top:0,behavior:'smooth'}); }catch(e){
    try{ const mb=document.querySelector('#dispfields-modal .modal-body'); if(mb) mb.scrollTop=0; }catch(_){}
  }
}
// === Trigger condition helpers ===
// Pick which field drives a condition row (the controller). Reset operator/value
// since the field type — and therefore the valid operators — may change.
function dispSetCondField(i, val){
  const c=DISP_BLOCK.conditions[i]; if(!c) return;
  const _conj=c.conj, _neg=c.neg; // preserve the AND/OR/NOT join when retargeting
  if(val && val.indexOf('score:')===0){
    const secId=val.slice(6);
    const sec=(FORM.scoringSections||[]).find(s=>s.id===secId);
    DISP_BLOCK.conditions[i]={type:'score', sectionId:secId, op:'gte', value:0, label:(sec&&sec.name)||'Total score'};
  } else {
    DISP_BLOCK.conditions[i]={type:'field', fieldId:val, op:'any'};
  }
  if(_conj!=null) DISP_BLOCK.conditions[i].conj=_conj;
  if(_neg!=null) DISP_BLOCK.conditions[i].neg=_neg;
  renderDisplayFields();
}
function dispAddCondition(){
  DISP_BLOCK.conditions.push({type:'field', fieldId:'', op:'any', conj:'and'});
  renderDisplayFields();
  dispScrollToBlock();
}
// === Show-list helpers === these add fields to SHOW (plain show, no condition
// of their own — they all reveal together when the trigger above is met).
function dispAddShowField(fieldId){
  if(DISP_SHOW.indexOf(fieldId)<0) DISP_SHOW.push(fieldId);
  DISP_SEARCH='';
  renderDisplayFields();
}
function dispRemoveShowField(fieldId){
  DISP_SHOW=DISP_SHOW.filter(x=>x!==fieldId);
  renderDisplayFields();
}
/* Add a cross-form (or local) SCORE section as a visibility condition.
   Merged from JAY build. Reachable once the search surfaces score sections;
   safe to keep regardless so saved score-conditions round-trip. */
function dispAddScoreCond(sectionId, formId, formTitle, sectionName){
  // Multiple conditions on the same section are allowed (e.g. score between two
  // thresholds), so no dedupe here.
  const cond = {type:'score', sectionId, op:'gte', value:0, formId, formTitle:formTitle||'', label:sectionName||'Total score', conj:'and'};
  DISP_BLOCK.conditions.push(cond);
  DISP_SEARCH='';
  renderDisplayFields();
  dispScrollToBlock();
}
function dispRemoveCond(i){ DISP_BLOCK.conditions.splice(i,1); renderDisplayFields(); }
function dispSetConj(i,conj){ const c=DISP_BLOCK.conditions[i]; if(c){ c.conj=(conj==='or'?'or':'and'); renderDisplayFields(); } }
function dispToggleNeg(i){ const c=DISP_BLOCK.conditions[i]; if(c){ c.neg=!c.neg; renderDisplayFields(); } }
// Single AND/OR/NOT selector. "NOT" => join with AND and negate this condition
// ("AND NOT"). conj/neg remain orthogonal in the model; this sets both at once.
function dispSetLogic(i,val){ const c=DISP_BLOCK.conditions[i]; if(!c) return; if(val==='not'){ c.conj='and'; c.neg=true; } else { c.conj=(val==='or'?'or':'and'); c.neg=false; } renderDisplayFields(); }
function dispExtraCondHTML(i,c,ctrlOpts,scoreOpts){
  const isScore = c.type==='score';
  const f = isScore ? null : findFieldById(c.fieldId);
  const selVal = isScore ? ('score:'+c.sectionId) : (c.fieldId||'');
  const ctrlSel=`<select class="disp-cond-field enhance-dd" onchange="dispSetCondField(${i},this.value)">
    <option value="">— choose a field —</option>
    ${ctrlOpts.map(o=>`<option value="${o.id}"${selVal===o.id?' selected':''}>${esc(o.label||'Untitled')}</option>`).join('')}
    ${scoreOpts.length?`<optgroup label="Scores">${scoreOpts.map(sx=>`<option value="score:${sx.id}"${selVal==='score:'+sx.id?' selected':''}>∑ ${esc(sx.name||'Score')}</option>`).join('')}</optgroup>`:''}
  </select>`;
  const opUI = isScore ? dispValueUI(i,null,c) : (f ? dispValueUI(i,f,c) : '<span class="disp-noopt">Pick a field first</span>');
  // AND / OR / NOT in one dropdown. "NOT" means "AND NOT" — joins with AND and
  // negates this condition. Stored as conj ('and'|'or') + neg (bool), unchanged.
  const _logic = c.neg ? 'not' : (c.conj==='or' ? 'or' : 'and');
  const conj=`<select class="disp-conj enhance-dd" onchange="dispSetLogic(${i},this.value)"><option value="and"${_logic==='and'?' selected':''}>AND</option><option value="or"${_logic==='or'?' selected':''}>OR</option><option value="not"${_logic==='not'?' selected':''}>NOT</option></select>`;
  return `<div class="disp-cond-extra">
    <div class="disp-conj-row">${conj}</div>
    <div class="disp-cond disp-cond-row">
      <div class="disp-cond-left">${ctrlSel}</div>
      <div class="disp-cond-right">${opUI}</div>
      <button class="disp-x disp-cond-x" type="button" title="Remove condition" onclick="dispRemoveCond(${i})">✕</button>
    </div>
  </div>`;
}
function dispSetOp(i,op){
  const c=DISP_BLOCK.conditions[i]; if(!c) return; const f=findFieldById(c.fieldId);
  c.op=op;
  const choiceTextOp=(op==='seq'||op==='sneq'||op==='contains'||op==='ncontains');
  if(op==='any'||op==='none'){ delete c.value; delete c.value2; }
  else if(f&&['radio','select'].includes(f.type)&&choiceTextOp){ if(Array.isArray(c.value)) delete c.value; } // chip → label-text mode
  else if(f&&['radio','select','checkboxes'].includes(f.type)){ if(!Array.isArray(c.value)) c.value=(c.value!=null?[Number(c.value)]:[]); }
  else if(STR_NOVALUE_OPS.has(op)){ delete c.value; }
  if(!RANGE_OPS.has(op)) delete c.value2;
  renderDisplayFields();
}
function dispSetVal(i,v){ const c=DISP_BLOCK.conditions[i]; if(c) c.value=v; }
function dispSetPhoneVal(i,el){ try{ el.value=formatUSPhone(el.value); }catch(e){} const c=DISP_BLOCK.conditions[i]; if(c) c.value=el.value; }
function dispSetVal2(i,v){ const c=DISP_BLOCK.conditions[i]; if(c) c.value2=v; }
function dispToggleOpt(i,oi){
  const c=DISP_BLOCK.conditions[i]; if(!c) return;
  let arr=Array.isArray(c.value)?c.value.map(Number):(c.value!=null?[Number(c.value)]:[]);
  const at=arr.indexOf(oi);
  if(at>=0) arr.splice(at,1); else arr.push(oi);
  c.value=arr;
  renderDisplayFields();
}
function persistDispBlock(){
  const t=resolveVizTarget(DISP_SCOPE);
  // Build the trigger block. Coerce numeric strings; drop incomplete rows
  // (no controller chosen). Cross-form refs are no longer added here.
  const conds=(DISP_BLOCK.conditions||[]).filter(c=>{
    if(c.type==='score'){
      if(c.op==='any'||c.op==='none') return true;
      c.value=Number(c.value)||0; if(RANGE_OPS.has(c.op)) c.value2=Number(c.value2)||0; return true;
    }
    const f=findFieldById(c.fieldId); if(!f) return false;
    if(c.op==='any'||c.op==='none') return true;
    if(['radio','select','checkboxes'].includes(f.type)) return Array.isArray(c.value)&&c.value.length>0;
    if(NUMERIC_CTRL_TYPES.has(f.type)){ c.value=Number(c.value)||0; if(RANGE_OPS.has(c.op)) c.value2=Number(c.value2)||0; return true; }
    return true;
  });
  let block=null;
  if(conds.length){
    block={block:true, name:DISP_BLOCK.name||'', match:DISP_BLOCK.match==='any'?'any':'all', conditions:conds};
    if(DISP_BLOCK.openForm && DISP_BLOCK.openForm.id) block.openForm={id:DISP_BLOCK.openForm.id, title:DISP_BLOCK.openForm.title||''};
    if(DISP_BLOCK.notify && dispNotifyHasAny(DISP_BLOCK.notify)) block.notify=JSON.parse(JSON.stringify(DISP_BLOCK.notify));
  }
  if(t.kind==='scfield'){
    // Scoring-condition mode: write the gate onto the group (scoreConds[fieldId]).
    setVizCond(t, block ? {block:true, match:block.match, conditions:block.conditions} : null);
    saveForm(); try{ renderScoringModal(); }catch(e){} try{ render(); }catch(e){} try{ renderPreviewIfNeeded(); }catch(e){}
    return;
  }
  if(t.kind==='vgroup' && t.obj){
    t.obj.fieldIds=DISP_SHOW.slice();
    t.obj.showIf=block;
  } else {
    // Field scope: stamp the trigger onto every field in the show-list. Fields
    // that were in the list when we opened but have since been removed get their
    // rule cleared. No valid trigger OR no show-fields → everything is cleared
    // (a field with no rule is always shown).
    DISP_SHOW_ORIG.forEach(id=>{ if(DISP_SHOW.indexOf(id)<0){ const f=findFieldById(id); if(f) f.showIf=null; } });
    DISP_SHOW.forEach(id=>{ const f=findFieldById(id); if(f) f.showIf = block ? JSON.parse(JSON.stringify(block)) : null; });
  }
  DISP_SHOW_ORIG=DISP_SHOW.slice();
  saveForm(); render();
}
// "Save" — persist the rule but keep the editor open so the user can keep
// refining or add more conditions (no work lost if they later hit ✕).
function dispSave(){ persistDispBlock(); try{toast('Rule saved');}catch(e){} renderDisplayFields(); }
// "Save & Close" (and the ✕) — persist then close; reopen the manager if we came
// from it. Closing always saves now, so the ✕ never throws away work.
function dispDone(){
  persistDispBlock();
  closeModal('dispfields-modal');
  if(DISP_FROM_SCORING){ DISP_FROM_SCORING=false; DISP_SCORE_MODE=false; openModal('scoring-modal'); try{renderScoringModal();}catch(e){} return; }
  if(DISP_FROM_MANAGER){ DISP_FROM_MANAGER=false; openModal('dispmgr-modal'); renderDisplayManager(); }
}
function dispClearRule(){
  const t=resolveVizTarget(DISP_SCOPE);
  if(t.kind==='scfield'){ setVizCond(t, null); closeModal('dispfields-modal'); saveForm(); try{render();}catch(e){} if(DISP_FROM_SCORING){ DISP_FROM_SCORING=false; DISP_SCORE_MODE=false; openModal('scoring-modal'); try{renderScoringModal();}catch(e){} } return; }
  if(t.kind==='vgroup' && t.obj){ t.obj.showIf=null; }
  else {
    const ids=DISP_SHOW_ORIG.length?DISP_SHOW_ORIG:DISP_SHOW;
    ids.forEach(id=>{ const f=findFieldById(id); if(f) f.showIf=null; });
  }
  closeModal('dispfields-modal'); saveForm(); render();
  if(DISP_FROM_MANAGER){ DISP_FROM_MANAGER=false; openModal('dispmgr-modal'); renderDisplayManager(); }
}
/* Inspector "Show Field" checkbox: ON (no rule yet) opens the editor to set the
   condition; OFF clears the rule so the field is always shown again. */
function dispToggleFieldRule(fieldId, on){
  const f=findFieldById(fieldId); if(!f) return;
  if(on){
    if(!f.showIf) openDisplayFields('field:'+fieldId);
  } else if(f.showIf){
    const t=resolveVizTarget('field:'+fieldId);
    setVizCond(t, null); saveForm(); render();
  }
}
/* ---- Toolbar "Display Fields" manager: edit any field's rule from one place ---- */
let _dispSamplesAutoSeeded=false;
function openDisplayManager(){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  // First time the visibility manager is opened in this session, seed the 5
  // sample forms so there's realistic cross-form data to explore right away.
  // Only seeds if they don't already exist; runs once per session.
  if(!_dispSamplesAutoSeeded){
    _dispSamplesAutoSeeded=true;
    const haveSamples=(typeof FORMS!=='undefined') && FORMS.some(f=>f.sampleRich);
    if(!haveSamples && typeof seedRichSampleForms==='function' && canCreateForms()){
      seedRichSampleForms();
    }
  }
  openModal('dispmgr-modal'); DISP_MGR_VIEW='fields'; DISP_MGR_SEARCH=''; renderDisplayManager();
}
let DISP_MGR_VIEW='fields'; // 'fields' (default) | 'show'
let DISP_MGR_SEARCH='';
function dispSetMgrView(v){ DISP_MGR_VIEW=(v==='show')?'show':'fields'; renderDisplayManager(); }
function dispMgrSearch(v){ DISP_MGR_SEARCH=v; renderDisplayManager(); const si=document.getElementById('dispmgr-search-input'); if(si){ si.focus(); const val=si.value; si.value=''; si.value=val; } }
function dispMgrClearSearch(){ DISP_MGR_SEARCH=''; renderDisplayManager(); const si=document.getElementById('dispmgr-search-input'); if(si) si.focus(); }
function renderDisplayManager(){
  const body=document.getElementById('dispmgr-body'); if(!body) return;
  // Exclude pure display/content fields (headings, paragraphs, dividers, status
  // bars) — they have no answer, so a show-rule doesn't apply to them.
  const all=FORM.rows.flatMap(r=>r.fields).filter(f=>!DISPLAY_ONLY_TYPES.has(f.type));
  const COLORS=['#1a8a66','#3157a8','#b45309','#7c3aed','#be123c','#0e7490','#a16207','#9333ea','#15803d','#c2410c'];
  // Group into RULES. A rule = one trigger condition. Fields that carry the
  // exact same per-field rule collapse into a single rule (so "First Name is Jay"
  // showing 5 fields is ONE numbered rule listing all 5). A visibility group is
  // likewise one rule.
  const rules=[]; const ruleByKey={}; const seenG=new Set();
  all.forEach(f=>{
    const g=visGroupForField(f.id);
    if(g){
      if(seenG.has(g.id)) return; seenG.add(g.id);
      if(!g.showIf) return;
      rules.push({key:'vg:'+g.id, cond:g.showIf, scope:'vgroup:'+g.id, isGroup:true,
        fields:(g.fieldIds||[]).map(id=>findFieldById(id)).filter(Boolean)});
      return;
    }
    if(!f.showIf) return;
    const key=JSON.stringify(f.showIf);
    if(ruleByKey[key]){ ruleByKey[key].fields.push(f); return; }
    const r={key, cond:f.showIf, scope:'field:'+f.id, isGroup:false, fields:[f]};
    ruleByKey[key]=r; rules.push(r);
  });
  rules.forEach((r,i)=>{ r.num=i+1; r.color='#1a8a66'; }); // configured rules → green stripe; unconfigured fields get no stripe
  const ruleOfField={}; rules.forEach(r=>r.fields.forEach(ff=>{ if(ff&&!ruleOfField[ff.id]) ruleOfField[ff.id]=r; }));
  const ruleCount=rules.length;

  // Step toggle — Fields (set rules) vs Show Fields (the configured rules).
  let h=`<div class="dispmgr-toggle">
    <button class="${DISP_MGR_VIEW==='fields'?'on':''}" onclick="dispSetMgrView('fields')">Fields</button>
    <button class="${DISP_MGR_VIEW==='show'?'on':''}" onclick="dispSetMgrView('show')">Show Fields${ruleCount?` (${ruleCount})`:''}</button>
  </div>`;
  // Form-level "Add display rule" pill removed (06-10-26): visibility is managed
  // per-field via "Set rule", so the whole-form display-rule control is no longer
  // surfaced here. (formRulePillHTML/openFormRules remain defined but unused.)
  h+=`<div class="forms-search dispmgr-search${DISP_MGR_SEARCH?' has-value':''}" id="dispmgr-search">
    <svg class="fs-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="dispmgr-search-input" placeholder="Search fields by name…" value="${esc(DISP_MGR_SEARCH)}" oninput="dispMgrSearch(this.value)">
    <button class="fs-clr" onclick="dispMgrClearSearch()" title="Clear search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>`;
  if(!all.length){ body.innerHTML=h+'<p class="disp-empty">No fields that can take a show rule yet.</p>'; return; }

  if(DISP_MGR_VIEW==='fields'){
    // Step 1 — every field. Click "Set rule" to configure; "Edit" if it has one.
    const mq=(DISP_MGR_SEARCH||'').trim().toLowerCase();
    let rowsHTML=''; let shownCount=0;
    const renderedG=new Set();
    all.forEach(f=>{
      const g=visGroupForField(f.id);
      let scope, rule;
      if(g){
        if(renderedG.has(g.id)) return; renderedG.add(g.id);
        scope='vgroup:'+g.id; rule=rules.find(r=>r.scope===scope);
        if(mq){ const gf=(g.fieldIds||[]).map(id=>findFieldById(id)).filter(Boolean); if(!gf.some(x=>(x.label||'').toLowerCase().includes(mq))) return; }
      } else {
        scope='field:'+f.id; rule=ruleOfField[f.id];
        if(mq && !(f.label||'').toLowerCase().includes(mq)) return;
      }
      shownCount++;
      const cond=rule?rule.cond:null;
      rowsHTML+=`<div class="dispmgr-row plain${rule?' has-rule':''}"${rule?` style="--stripe:${rule.color}"`:''}>
        <div class="dispmgr-info">
          ${rule?`<span class="dispmgr-chip" style="--stripe:${rule.color}">#${rule.num}</span>`:''}
          <span class="dispmgr-name">${esc(f.label||'Untitled')}</span>
          <span class="disp-pill">${esc(fieldTypeName(f))}</span>
        </div>
        <div class="dispmgr-rule${rule?'':' none'}">${rule?('Shown when '+esc(describeShowIf(cond))):'Always shown'}</div>
        <button class="btn build-only${rule?' primary':''}" onclick="dispEditFromManager('${scope}')">${rule?'Edit':'Set rule'}</button>
      </div>`;
    });
    h+= shownCount ? ('<div class="dispmgr-list">'+rowsHTML+'</div>') : ('<p class="disp-empty">No fields match “'+esc(DISP_MGR_SEARCH)+'”.</p>');
  } else {
    // "Show Fields" — one numbered row per rule: condition first, then EVERY
    // field that rule reveals, each on its own ↳ Shows line.
    if(!rules.length){
      h+='<p class="disp-empty">No show-rules yet. Switch to <strong>Fields</strong> and click “Set rule” on a field.</p>';
    } else {
      const mq2=(DISP_MGR_SEARCH||'').trim().toLowerCase();
      const _rf=rules.slice().sort((a,b)=>a.num-b.num).filter(r=>{ if(!mq2) return true; const d=(describeShowIf(r.cond)||'').toLowerCase(); return d.includes(mq2) || (r.fields||[]).some(ff=>ff&&(ff.label||'').toLowerCase().includes(mq2)); });
      if(!_rf.length){ h+='<p class="disp-empty">No rules match “'+esc(DISP_MGR_SEARCH)+'”.</p>'; }
      else {
      h+='<div class="dispmgr-list">';
      _rf.forEach(r=>{
        const shows=(r.fields||[]).map(ff=>`<div class="dispmgr-shows">\u21B3 Shows: <strong>${esc(ff.label||'Untitled')}</strong> <span class="disp-pill">${esc(fieldTypeName(ff))}</span></div>`).join('')
          || `<div class="dispmgr-shows">\u21B3 Shows: <em>no fields yet</em></div>`;
        const opensForm=(r.cond && r.cond.openForm)?`<div class="dispmgr-shows dispmgr-opens">\u21B3 Opens form: <strong>${esc(r.cond.openForm.title||'a form')}</strong></div>`:'';
        h+=`<div class="dispmgr-row rule" style="--stripe:${r.color}">
          <div class="dispmgr-num">${r.num}</div>
          <div class="dispmgr-main">
            <div class="dispmgr-when">${esc(describeShowIf(r.cond))}</div>
            ${shows}${opensForm}
          </div>
          ${dispNotifyHasAny(r.cond&&r.cond.notify)?`<button type="button" class="dispmgr-bell" title="Notifications configured — click to see who's notified" aria-label="Notifications configured" onclick="dispToggleNotifyPop(event,'${r.scope}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>`:''}
          <button class="btn build-only" onclick="dispEditFromManager('${r.scope}')">Edit</button>
        </div>`;
      });
      h+='</div>';
      }
    }
  }
  body.innerHTML=h;
}
function dispEditFromManager(scope){ DISP_FROM_MANAGER=true; closeModal('dispmgr-modal'); openDisplayFields(scope); }

/* ----- Rule notifications popover (Show Fields manager) -----
   The bell on a rule row opens a small popover summarizing who is notified and
   by what methods. Notify lives on the rule's showIf block (cond.notify),
   resolved live from the scope so it always reflects the saved rule. */
function dispRuleNotify(scope){ try{ const t=resolveVizTarget(scope); const c=t&&getVizCond(t); return (c&&c.notify)||null; }catch(e){ return null; } }
function dispNotifyMethods(n){ const m=[]; if(n&&n.sms) m.push('SMS'); if(n&&n.email) m.push('Email'); return m; }
function dispNotifyPopHTML(n){
  const methods=dispNotifyMethods(n);
  const recips=recipientChips(n&&n.roles, n&&n.userIds, n&&n.patient, n&&n.clientIds);
  let h=`<div class="notify-pop-head">🔔 Who gets notified</div>`;
  h+=`<div class="notify-pop-sec"><span class="notify-pop-lbl">Methods</span>`;
  h+= methods.length ? methods.map(m=>`<span class="notify-pop-chip method">${m}</span>`).join('') : `<span class="notify-pop-none">No channel selected</span>`;
  h+=`</div>`;
  h+=`<div class="notify-pop-sec"><span class="notify-pop-lbl">Recipients</span>`;
  h+= recips.length ? recips.map(r=>`<span class="notify-pop-chip">${esc(r)}</span>`).join('') : `<span class="notify-pop-none">No recipients yet</span>`;
  h+=`</div>`;
  return h;
}
function dispToggleNotifyPop(ev, scope){
  if(ev){ ev.stopPropagation(); ev.preventDefault(); }
  const pop=document.getElementById('notify-pop'); if(!pop) return;
  // Clicking the same bell again closes it.
  if(pop.classList.contains('open') && pop.getAttribute('data-scope')===scope){ dispCloseNotifyPop(); return; }
  const n=dispRuleNotify(scope);
  if(!n){ dispCloseNotifyPop(); return; }
  pop.innerHTML=dispNotifyPopHTML(n);
  pop.setAttribute('data-scope', scope);
  pop.style.maxWidth='280px';
  pop.classList.add('open'); pop.style.display='block';
  const anchor=(ev&&ev.currentTarget)||null;
  const rect=anchor?anchor.getBoundingClientRect():{right:window.innerWidth/2,bottom:window.innerHeight/2,top:window.innerHeight/2,left:window.innerWidth/2};
  const pw=pop.offsetWidth, ph=pop.offsetHeight;
  let left=rect.right-pw; if(left<10) left=10; if(left+pw>window.innerWidth-10) left=window.innerWidth-10-pw;
  let top=rect.bottom+6; if(top+ph>window.innerHeight-10){ top=rect.top-ph-6; if(top<10) top=10; }
  pop.style.left=left+'px'; pop.style.top=top+'px';
}
function dispCloseNotifyPop(){ const pop=document.getElementById('notify-pop'); if(pop){ pop.classList.remove('open'); pop.style.display='none'; pop.removeAttribute('data-scope'); } }
document.addEventListener('click', function(e){
  const pop=document.getElementById('notify-pop'); if(!pop||!pop.classList.contains('open')) return;
  if(pop.contains(e.target)) return;
  if(e.target.closest && e.target.closest('.dispmgr-bell')) return;
  dispCloseNotifyPop();
});
document.addEventListener('keydown', function(e){ if(e.key==='Escape') dispCloseNotifyPop(); });
window.addEventListener('scroll', dispCloseNotifyPop, true);

/* ==================================================================
   FIELD VISIBILITY GROUPS  (authored in the inspector, like weights)
   ==================================================================
   Click a field → its Visibility section. Set ONE show/hide condition (field
   answer is/is not, number > < = …, or section score). "Apply this rule to a
   group of fields" attaches more fields so they all show/hide together on that
   one condition — the same way weights group fields under one 100% budget.
   A field belongs to at most one visibility group; a grouped field is governed
   solely by its group's condition (its own field.showIf is cleared on join).
     FORM.visibilityGroups = [{ id, fieldIds:[...], showIf:{...}|null }] */
function ensureVisGroupsInit(){ if(!Array.isArray(FORM.visibilityGroups)) FORM.visibilityGroups=[]; return FORM.visibilityGroups; }
function visGroupForField(fieldId){ return (FORM.visibilityGroups||[]).find(g=>(g.fieldIds||[]).includes(fieldId))||null; }
/* Wipe every Show Fields rule on the current form — per-field showIf rules and
   visibility groups — so all fields return to "Always shown." Handy for testing
   from a clean slate. Undoable (saveForm records history). */
function clearAllShowFieldsRules(){
  if(currentFormReadOnly && currentFormReadOnly()){ toast('Read-only — can\u2019t modify this form'); return; }
  let n=0;
  (FORM.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.showIf) n++; }));
  (FORM.visibilityGroups||[]).forEach(g=>{ if(g.showIf) n++; });
  if(n===0){ toast('No Show Fields rules to clear'); return; }
  if(!confirm('Remove all '+n+' Show Fields rule'+(n===1?'':'s')+' on this form? Every field goes back to \u201cAlways shown.\u201d You can undo with Ctrl/Cmd+Z.')) return;
  (FORM.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.showIf) delete f.showIf; }));
  FORM.visibilityGroups=[];
  saveForm();
  render();
  const m=document.getElementById('dispmgr-modal');
  if(m && m.classList.contains('open')) renderDisplayManager();
  toast('Cleared '+n+' Show Fields rule'+(n===1?'':'s'));
}
/* A field's group passes when it has no group, or the group's rule evaluates
   true (a group with no rule yet is always visible). */
function groupVisible(field){ const g=field&&visGroupForField(field.id); return g ? evalShowIf(g.showIf) : true; }
/* Promote the selected field into a NEW visibility group, carrying its current
   per-field rule (if any) as the group's shared condition. */
function createVisGroup(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f=findFieldById(fieldId); if(!f) return;
  ensureVisGroupsInit();
  if(visGroupForField(fieldId)) return; // already grouped
  FORM.visibilityGroups.push({id:uid('vg'), fieldIds:[fieldId], showIf: f.showIf || null});
  if(f.showIf) delete f.showIf; // the group's condition now governs this field
  toast('Grouped. Set the condition, then add fields to share it.');
  render();
}
function addFieldToVisGroupFromDropdown(groupId){
  const sel=document.getElementById('vg-add-'+groupId);
  if(!sel || !sel.value) return;
  addFieldToVisGroup(sel.value, groupId);
}
/* Add a field to an existing visibility group (one group per field). Its own
   per-field rule is cleared — the group condition governs it now. */
function addFieldToVisGroup(fieldId, groupId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ensureVisGroupsInit();
  const g=FORM.visibilityGroups.find(x=>x.id===groupId); if(!g) return;
  const f=findFieldById(fieldId); if(!f) return;
  if(FORM.visibilityGroups.some(x=>(x.fieldIds||[]).includes(fieldId))){ toast('That field is already in a visibility group'); return; }
  g.fieldIds.push(fieldId);
  if(f.showIf) delete f.showIf;
  render();
}
/* Remove a field from its visibility group; drop the group once it empties. */
function removeFieldFromVisGroup(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ensureVisGroupsInit();
  const gi=FORM.visibilityGroups.findIndex(g=>(g.fieldIds||[]).includes(fieldId));
  if(gi<0) return;
  const g=FORM.visibilityGroups[gi];
  g.fieldIds=g.fieldIds.filter(id=>id!==fieldId);
  if(g.fieldIds.length===0) FORM.visibilityGroups.splice(gi,1);
  render();
}
/* Drop dangling members, empty groups, and stale/self-referential conditions.
   Called from saveForm so the persisted snapshot stays consistent. */
function pruneVisGroups(){
  if(!Array.isArray(FORM.visibilityGroups)) return;
  FORM.visibilityGroups.forEach(g=>{
    g.fieldIds=(g.fieldIds||[]).filter(fid=>!!findFieldById(fid));
    const c=g.showIf; if(!c) return;
    let bad=false;
    if(c.type==='score') bad=!(FORM.scoringSections||[]).some(s=>s.id===c.sectionId);
    else { const f=findFieldById(c.fieldId); bad = !f || !CONTROLLER_TYPES.has(f.type) || g.fieldIds.includes(c.fieldId); }
    if(bad) delete g.showIf;
  });
  FORM.visibilityGroups=FORM.visibilityGroups.filter(g=>(g.fieldIds||[]).length>0);
}
function vizEditorHTML(scope){
  const t=resolveVizTarget(scope);
  if(!vizTargetValid(t)) return '';
  const c=getVizCond(t);
  const cands=controllerCandidates(t);
  const secs=FORM.scoringSections||[];
  // ONE picker: "Always" + every controllable field + every section score.
  // Choosing a field/section immediately reveals the operator (= < > …) row.
  // A cross-form condition (c.formId set) references a field that lives on
  // ANOTHER form, so it won't appear in this form's option list. Surface it as
  // its own selected option so the picker reflects the active choice.
  const isXForm = !!(c && c.formId && c.type!=='score');
  let h=`<select class="enhance-dd" onchange="vizSetSource('${scope}',this.value)">
      <option value="always"${!c?' selected':''}>Always visible (no condition)</option>`;
  if(isXForm){
    const xf=findFieldAcrossForms(c.fieldId);
    const xlbl = xf ? `${esc(xf.formTitle)} → “${esc(xf.field.label||'Untitled')}”` : 'another form (field removed)';
    h+=`<option value="xform" selected>On ${xlbl} …</option>`;
  }
  if(cands.length){
    h+=cands.map(f=>`<option value="f:${f.id}"${(c&&!c.formId&&c.type!=='score'&&c.fieldId===f.id)?' selected':''}>When answer to “${esc(f.label||'Untitled')}” …</option>`).join('');
  }
  if(secs.length){
    h+=secs.map(s=>`<option value="s:${s.id}"${(c&&c.type==='score'&&c.sectionId===s.id)?' selected':''}>When score of “${esc(s.name||'Section')}” …</option>`).join('');
  }
  h+=`</select>`;
  if(c && c.type!=='score'){
    // Resolve the controller from THIS form, or across all forms for a
    // cross-form reference, so the operator/value row renders either way.
    const ctrl = c.formId ? ((findFieldAcrossForms(c.fieldId)||{}).field || null) : findFieldById(c.fieldId);
    h+= ctrl ? vizOpValueHTML(scope, c, ctrl) : `<div class="viz-warn">That field is no longer available — pick another.</div>`;
  } else if(c && c.type==='score'){
    const isR = RANGE_OPS.has(c.op);
    const boxes = isR
      ? `<input type="number" step="any" value="${c.value!=null?c.value:0}" onchange="vizSetValue('${scope}',this.value)" title="From">
         <span class="viz-and">and</span>
         <input type="number" step="any" value="${c.value2!=null?c.value2:0}" onchange="vizSetValue2('${scope}',this.value)" title="To">`
      : `<input type="number" step="any" value="${c.value!=null?c.value:0}" onchange="vizSetValue('${scope}',this.value)">`;
    h+=`<div class="viz-op-row${isR?' viz-op-row-range':''}">
        <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
          ${NUM_OPS.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
        </select>
        ${boxes}
      </div>
      <div class="viz-note">Reveals when this section's running total meets the rule.</div>`;
  } else if(!cands.length && !secs.length){
    h+=`<div class="viz-note" style="margin-top:6px">Add a choice/number field or a scoring section to branch on — or search another form below.</div>`;
  }
  h+=xformPickerHTML(scope, t);
  return h;
}
/* ----- Cross-form ("Show Forms") condition picker -----
   Search any OTHER form, then pick one of its fields to gate this row/page on.
   Produces a standard field condition tagged with the source form's id; the
   existing cross-form runtime (evalCrossForm / xBridge) evaluates it. Filtering
   toggles row display in place (no re-render) so the search box keeps focus. */
function xformPickerHTML(scope, t){
  const cands=allFormControllerCandidates(t).filter(f=>!f.sameForm); // other forms only
  if(!cands.length){
    return `<div class="xviz-wrap"><div class="xviz-head">Branch on another form</div>
      <div class="viz-note" style="margin-top:4px">No other forms with branchable fields yet. Create another form (with a choice / number / text field) to gate this on its answers.</div></div>`;
  }
  const byForm={};
  cands.forEach(f=>{ (byForm[f.formId]=byForm[f.formId]||{title:f.formTitle,items:[]}).items.push(f); });
  let rows='';
  Object.keys(byForm).forEach(fid=>{
    const g=byForm[fid];
    const grpText=esc(String(g.title||'').toLowerCase());
    rows+=`<div class="xviz-form-grp" data-grp-text="${grpText}"><div class="xviz-form-title">${esc(g.title||'Untitled form')}</div>`;
    g.items.forEach(f=>{
      const txt=esc((String(g.title||'')+' '+String(f.label||'')+' '+fieldTypeNameByType(f.type)).toLowerCase());
      rows+=`<button type="button" class="xviz-field" data-text="${txt}" onclick="vizPickCrossForm('${scope}','${fid}','${f.id}')">
        <span class="xviz-field-label">${esc(f.label||'Untitled')}</span>
        <span class="xviz-field-type">${esc(fieldTypeNameByType(f.type))}</span>
      </button>`;
    });
    rows+=`</div>`;
  });
  return `<div class="xviz-wrap">
    <div class="xviz-head">Branch on another form</div>
    <input type="text" class="xviz-search" placeholder="Search forms &amp; fields…" oninput="xvizFilter(this)">
    <div class="xviz-results">${rows}</div>
  </div>`;
}
function xvizFilter(input){
  const q=String(input.value||'').trim().toLowerCase();
  const wrap=input.parentNode && input.parentNode.querySelector('.xviz-results');
  if(!wrap) return;
  wrap.querySelectorAll('.xviz-form-grp').forEach(grp=>{
    let anyVisible=false;
    const grpHit=(grp.getAttribute('data-grp-text')||'').indexOf(q)>=0;
    grp.querySelectorAll('.xviz-field').forEach(btn=>{
      const hit = !q || grpHit || (btn.getAttribute('data-text')||'').indexOf(q)>=0;
      btn.style.display = hit ? '' : 'none';
      if(hit) anyVisible=true;
    });
    grp.style.display = anyVisible ? '' : 'none';
  });
}
function vizPickCrossForm(scope, formId, fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const t=resolveVizTarget(scope); if(!vizTargetValid(t)) return;
  const xf=findFieldAcrossForms(fieldId);
  if(!xf || !xf.field){ toast('That field is no longer available'); return; }
  const cond=defaultFieldCond(xf.field);
  if(!cond){ toast('That field type can\'t be used as a condition'); return; }
  cond.formId=formId;            // tag as cross-form → evaluated against the other form's answers
  setVizCond(t, cond);
  saveForm();
  render(); renderRowVizModal(scope);
}
function vizOpValueHTML(scope, c, ctrl){
  if(!ctrl) return `<div class="viz-warn">Controller field is missing.</div>`;
  if(ctrl.type==='checkboxes'){
    const ops=[{v:'includes',l:'includes'},{v:'notincludes',l:'does not include'}];
    return `<div class="viz-op-row">
      <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
        ${ops.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
      </select>
      <select class="enhance-dd" onchange="vizSetValue('${scope}',this.value)">
        ${(ctrl.options||[]).map((o,i)=>`<option value="${i}"${Number(c.value)===i?' selected':''}>${esc(o)}</option>`).join('')}
      </select>
    </div>`;
  }
  if(ctrl.type==='radio' || ctrl.type==='select'){
    const ops=[{v:'eq',l:'is'},{v:'neq',l:'is not'}];
    return `<div class="viz-op-row">
      <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
        ${ops.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
      </select>
      <select class="enhance-dd" onchange="vizSetValue('${scope}',this.value)">
        ${(ctrl.options||[]).map((o,i)=>`<option value="${i}"${Number(c.value)===i?' selected':''}>${esc(o)}</option>`).join('')}
      </select>
    </div>`;
  }
  if(STRING_CTRL_TYPES.has(ctrl.type)){
    const noVal = STR_NOVALUE_OPS.has(c.op);
    const valBox = noVal ? '' : `<input type="text" class="viz-val-text" value="${esc(c.value!=null?c.value:'')}" placeholder="text…" onchange="vizSetText('${scope}',this.value)">`;
    return `<div class="viz-op-row">
      <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
        ${STR_OPS.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
      </select>
      ${valBox}
    </div>`;
  }
  if(BOOL_CTRL_TYPES.has(ctrl.type)){
    return `<div class="viz-op-row">
      <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
        ${BOOL_OPS.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
      </select>
    </div>`;
  }
  // number / range / rating
  const isRange = RANGE_OPS.has(c.op);
  const valBoxes = isRange
    ? `<input type="number" step="any" value="${c.value!=null?c.value:0}" onchange="vizSetValue('${scope}',this.value)" title="From">
       <span class="viz-and">and</span>
       <input type="number" step="any" value="${c.value2!=null?c.value2:0}" onchange="vizSetValue2('${scope}',this.value)" title="To">`
    : `<input type="number" step="any" value="${c.value!=null?c.value:0}" onchange="vizSetValue('${scope}',this.value)">`;
  return `<div class="viz-op-row${isRange?' viz-op-row-range':''}">
    <select class="enhance-dd" onchange="vizSetOp('${scope}',this.value)">
      ${NUM_OPS.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}
    </select>
    ${valBoxes}
  </div>`;
}
/* Combined source picker: raw is 'always' | 'f:<fieldId>' | 's:<sectionId>'.
   Choosing a field/section sets a default condition so the operator row shows
   immediately. */
function vizSetSource(scope, raw){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const t=resolveVizTarget(scope); if(!vizTargetValid(t)) return;
  if(raw==='xform'){ return; } // synthetic label for an active cross-form rule — no-op
  if(raw==='always'){ setVizCond(t, null); }
  else if(raw.slice(0,2)==='f:'){ const f=findFieldById(raw.slice(2)); if(f) setVizCond(t, defaultFieldCond(f)); }
  else if(raw.slice(0,2)==='s:'){ setVizCond(t, {type:'score', sectionId:raw.slice(2), op:'gte', value:1}); }
  render(); renderRowVizModal(scope);
}
function vizSetMode(scope, mode){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const t=resolveVizTarget(scope); if(!vizTargetValid(t)) return;
  if(mode==='always'){ setVizCond(t,null); }
  else if(mode==='field'){
    const ctrl=controllerCandidates(t)[0];
    if(!ctrl){ render(); renderRowVizModal(scope); return; }
    setVizCond(t, defaultFieldCond(ctrl));
  } else if(mode==='score'){
    const s=(FORM.scoringSections||[]).find(x=>(x.fieldIds||[]).length>0) || (FORM.scoringSections||[])[0];
    if(!s){ render(); renderRowVizModal(scope); return; }
    setVizCond(t, {type:'score', sectionId:s.id, op:'gte', value:1});
  }
  render(); renderRowVizModal(scope);
}
function vizSetController(scope, fieldId){
  if(currentFormReadOnly()) return;
  const t=resolveVizTarget(scope); if(!vizTargetValid(t)) return;
  const ctrl=findFieldById(fieldId); if(!ctrl) return;
  setVizCond(t, defaultFieldCond(ctrl)); // new controller → reset op/value
  render(); renderRowVizModal(scope);
}
function vizSetSection(scope, sectionId){ vizPatch(scope,{sectionId}); }
function vizSetOp(scope, op){
  const patch={op};
  if(RANGE_OPS.has(op)){
    const t=resolveVizTarget(scope); const c=t&&getVizCond(t);
    if(c && c.value2==null) patch.value2 = (Number(c.value)||0); // seed the "to" box
  }
  vizSetOp_apply(scope, patch);
}
function vizSetOp_apply(scope, patch){ vizPatch(scope, patch); }
function vizSetValue(scope, value){ const n=Number(value); vizPatch(scope,{value:isNaN(n)?0:n}); }
function vizSetValue2(scope, value){ const n=Number(value); vizPatch(scope,{value2:isNaN(n)?0:n}); }
function vizSetText(scope, value){ vizPatch(scope,{value:String(value==null?'':value)}); }
function vizPatch(scope, patch){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const t=resolveVizTarget(scope); if(!vizTargetValid(t)) return;
  const c=getVizCond(t); if(!c) return;
  Object.assign(c, patch);
  setVizCond(t, c);
  render(); renderRowVizModal(scope);
}

/* Row/page visibility modal (neither has an inspector, so they share one). */
let ROWVIZ_SCOPE=null;
function openRowViz(ridx){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const row=FORM.rows[ridx]; if(!row) return;
  ROWVIZ_SCOPE='row:'+row.id;
  openModal('rowviz-modal');
  renderRowVizModal(ROWVIZ_SCOPE);
}
function openPageViz(pageNum){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ROWVIZ_SCOPE='page:'+pageNum;
  openModal('rowviz-modal');
  renderRowVizModal(ROWVIZ_SCOPE);
}
function renderRowVizModal(scope){
  const overlay=document.getElementById('rowviz-modal');
  if(!overlay || !overlay.classList.contains('open')) return;
  if(scope && scope!==ROWVIZ_SCOPE) return;
  const mount=document.getElementById('rowviz-body');
  if(!mount || !ROWVIZ_SCOPE) return;
  const isPage=ROWVIZ_SCOPE.indexOf('page:')===0;
  const label=isPage?'👁 Show this page when…':'👁 Show this row when…';
  mount.innerHTML=`<label class="inspector-group-label" style="margin-bottom:6px;display:block">${label}</label>${vizEditorHTML(ROWVIZ_SCOPE)}`;
  enhanceDropdowns(mount);
}

/* ==================================================================
   CROSS-FORM AUTO-POPULATION (shared data keys / prefill)
   ==================================================================
   Any value-bearing field can carry a `dataKey` — a canonical slug like
   `first_name` or `mrn`. Fields that share a key share a value: filling one
   form writes the value to a shared profile, and opening another form with a
   field of the same key auto-populates it. This avoids re-keying demographics
   (name, DOB, insurance, MRN…) across intake / consent / assessment forms.

   Storage: a single localStorage object under SHARED_PROFILE_KEY mapping
   key -> value. Values are stored portably: a string for text/number/date,
   the chosen option's *text* for select/radio, an array of texts for
   checkboxes, and a boolean for single checkbox/toggle. The standalone HTML
   export uses the same scheme, so two deployed forms on the same origin carry
   data over with no backend — and it also reads URL query params (?first_name=…)
   for deep-link prefill plus a window.CredifyPrefill() hook for portals. */
const SHARED_PROFILE_KEY='credify_prefill_v1';
// Types that can hold a prefillable value. Content + file/color/rating/password
// are intentionally excluded (no portable value, or unsafe to round-trip).
const PREFILLABLE_TYPES=new Set(['text','textarea','email','phone','number','url','date','time','select','radio','checkboxes','checkbox','toggle','range']);
function isPrefillable(field){ return field && PREFILLABLE_TYPES.has(field.type); }
// Suggested canonical keys (behavioral-health demographics). Free text is also
// allowed; the datalist just speeds up consistent naming across forms.
const COMMON_PREFILL_KEYS=['first_name','last_name','full_name','preferred_name','date_of_birth','email','phone','address','city','state','zip','mrn','insurance_provider','insurance_id','member_id','group_number','emergency_contact','emergency_phone','referring_provider','primary_care_provider','pronouns','gender','sex','preferred_language','marital_status','employer'];
// Normalize a user-typed key into a safe slug (also valid as a URL param name).
function slugifyKey(s){
  return String(s||'').trim().toLowerCase()
    .replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').slice(0,60);
}
function setFieldDataKey(fieldId, raw){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f=findFieldById(fieldId); if(!f) return;
  const k=slugifyKey(raw);
  if(k) f.dataKey=k; else delete f.dataKey;
  render();
}

/* ====================== Autopopulation (cross-form linking) ======================
   Friendly layer over the shared-key engine. The user picks a target form and
   clicks its fields to link them to the field currently being edited. "Linking"
   means giving the target field the SAME dataKey as the source field, so the
   existing prefill runtime carries the value across forms. The runtime and the
   live-preview prefill are unchanged — this only manages keys for the user. */
var AUTOPOP={ fieldId:null, srcFormId:null, selFormId:null, search:'', fieldSearch:'', pendingDir:null };
var AUTOPOP_MGR={ search:'' };
var AUTOPOP_ALL_SEARCH='';

function autopopEditableForms(){ return FORMS.filter(f=>canEditForm(f)); }
function autopopGetForm(id){ if(FORM && id===FORM.id) return FORM; return FORMS.find(f=>f.id===id)||null; }
function autopopFieldsOf(form){ const out=[]; if(form)(form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>out.push(f))); return out; }
function autopopSourceField(){ return findFieldById(AUTOPOP.fieldId); }

// Count fields (across every form, excluding the source field itself) that
// share the source field's key — i.e. the fields this one autopopulates.
function countAutopopLinks(field){
  if(!field || !field.dataKey) return {count:0, formCount:0};
  let count=0; const forms=new Set();
  const scan=form=>(form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.id!==field.id && f.dataKey===field.dataKey){ count++; forms.add(form.id); } }));
  if(FORM) scan(FORM);
  FORMS.forEach(f=>{ if(!FORM || f.id!==FORM.id) scan(f); });
  return {count:count, formCount:forms.size};
}

// Stable, human-readable key for a field that doesn't have one yet. Uses the
// label slug; if that exact slug is already used by a different field (which
// would create an accidental link), a short suffix keeps it unique.
function autopopGenKey(field){
  let base=slugifyKey(field.label||'')||'field';
  const used=new Set();
  const scan=form=>(form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.id!==field.id && f.dataKey) used.add(f.dataKey); }));
  if(FORM) scan(FORM);
  FORMS.forEach(f=>{ if(!FORM || f.id!==FORM.id) scan(f); });
  if(!used.has(base)) return base;
  return base+'_'+String(field.id).slice(-4);
}

function autopopEnsureSourceKey(){
  saveForm();
  const f=autopopSourceField(); if(!f) return null;
  if(!f.dataKey){ f.dataKey=autopopGenKey(f); saveForm(); }
  return f.dataKey;
}

// ===== Autopopulation overview (form-level at-a-glance) =====
// Lists this form's fields and, for each, where its answer autopopulates to on
// other forms (fields that share the same dataKey). Click a field to open the
// per-field picker. Surfaced from the toolbar button left of "Show Fields".
function autopopLinkTargets(field){
  const out=[]; if(!field || !field.dataKey) return out;
  const scan=form=>(form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.id!==field.id && f.dataKey===field.dataKey){ out.push({formTitle:(form.title&&form.title.trim()?form.title:'Untitled form'), fieldLabel:(f.label||'Untitled')}); } }));
  if(FORM) scan(FORM);
  FORMS.forEach(f=>{ if(!FORM || f.id!==FORM.id) scan(f); });
  return out;
}
function openAutopopManager(){
  if(!FORM){ toast('Open a form first'); return; }
  AUTOPOP_MGR={ search:'' };
  const si=document.getElementById('autopop-mgr-search-input'); if(si) si.value='';
  const w=document.getElementById('autopop-mgr-search'); if(w) w.classList.remove('has-value');
  const ab=document.getElementById('autopop-all-btn'); if(ab) ab.style.display=(typeof isAdmin==='function' && isAdmin())?'':'none';
  autopopRenderManager();
  openModal('autopop-manager-modal');
}
function autopopMgrSearch(v){
  AUTOPOP_MGR.search=(v||'').toLowerCase();
  const w=document.getElementById('autopop-mgr-search'); if(w) w.classList.toggle('has-value', !!AUTOPOP_MGR.search);
  autopopRenderManager();
}
function autopopMgrClearSearch(){ const si=document.getElementById('autopop-mgr-search-input'); if(si) si.value=''; autopopMgrSearch(''); }
function autopopManagerOpenField(fieldId){ openAutopopModal(fieldId); }
// ===== Admin: ALL autopopulated fields across every form (at-a-glance) =====
// Groups all fields that share a dataKey. The "parent" (source) is the field
// whose label slug generated the key; each other field is Two-Way (no
// prefillOverwrite) or Overwrite (receive-only).
function autopopAllGroups(){
  const byKey={};
  const add=form=>(form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.dataKey){ (byKey[f.dataKey]=byKey[f.dataKey]||[]).push({form:form, field:f}); } }));
  if(FORM) add(FORM);
  (typeof FORMS!=='undefined'?FORMS:[]).forEach(f=>{ if(!FORM || f.id!==FORM.id) add(f); });
  const groups=[];
  Object.keys(byKey).forEach(key=>{
    const members=byKey[key]; if(members.length<2) return; // 2+ fields = an actual link
    let pi=members.findIndex(m=>slugifyKey(m.field.label||'')===key);
    if(pi<0){ const base=key.replace(/_[a-z0-9]{4}$/,''); pi=members.findIndex(m=>slugifyKey(m.field.label||'')===base); }
    if(pi<0){ pi=members.findIndex(m=>!m.field.prefillOverwrite); if(pi<0) pi=0; }
    groups.push({key:key, members:members, parentIdx:pi});
  });
  groups.sort((a,b)=>{ const an=(a.members[a.parentIdx].field.label||'').toLowerCase(), bn=(b.members[b.parentIdx].field.label||'').toLowerCase(); return an<bn?-1:(an>bn?1:0); });
  return groups;
}
function autopopRenderAllReport(){
  const body=document.getElementById('autopop-all-body'); if(!body) return;
  const sub=document.getElementById('autopop-all-sub');
  const groups=autopopAllGroups();
  const fieldCount=groups.reduce((a,g)=>a+g.members.length,0);
  const q=(AUTOPOP_ALL_SEARCH||'').trim().toLowerCase();
  const shown = q ? groups.filter(g=> (g.key||'').toLowerCase().includes(q) || g.members.some(m=> ((m.form&&m.form.title)||'').toLowerCase().includes(q) || ((m.field&&m.field.label)||'').toLowerCase().includes(q))) : groups;
  if(sub) sub.innerHTML = groups.length
    ? `${groups.length} autopopulation group${groups.length>1?'s':''} across your forms · ${fieldCount} linked fields. The <strong>parent</strong> is the source field; the rest are <strong>Two-Way</strong> (sync both ways) or <strong>Overwrite</strong> (receive-only). Switch a field's direction or unlink it right here.`
    : 'Nothing is autopopulated yet.';
  if(!groups.length){ body.innerHTML='<div class="autopop-mgr-empty">No autopopulated fields yet. Link fields from the Autopopulation overview and they will appear here.</div>'; return; }
  const rowFor=(m,isParent)=>{
    const over=!!m.field.prefillOverwrite;
    const fname=esc(m.form.title&&m.form.title.trim()?m.form.title:'Untitled form');
    const flabel=esc(m.field.label||'Untitled');
    const editable=(typeof canEditForm!=='function')||canEditForm(m.form);
    const fid=m.field.id, formId=m.form.id;
    const dir = isParent
      ? `<span class="apall-badge two">Two-Way</span>`
      : (editable
          ? `<span class="apall-dir" role="group" aria-label="Sync direction">
               <button type="button" class="apall-dir-btn${over?'':' on'}" onclick="autopopAllSetDir('${formId}','${fid}',false)" title="Two-Way — values sync both directions">Two-Way</button>
               <button type="button" class="apall-dir-btn${over?' on':''}" onclick="autopopAllSetDir('${formId}','${fid}',true)" title="Overwrite — receive-only; the source overwrites this field">Overwrite</button>
             </span>`
          : `<span class="apall-badge ${over?'over':'two'}">${over?'Overwrite':'Two-Way'}</span>`);
    const unlink = editable
      ? `<button type="button" class="apall-unlink" title="Unlink this field from autopopulation" onclick="autopopAllUnlink('${formId}','${fid}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a4 4 0 0 0-5.66-5.66l-1.71 1.72"/><path d="M5.17 11.75l-1.72 1.71a4 4 0 0 0 5.66 5.66l1.71-1.72"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/><line x1="16" y1="22" x2="16" y2="19"/><line x1="22" y1="16" x2="19" y2="16"/></svg></button>`
      : '';
    return `<div class="apall-row${isParent?' apall-parent':''}">
      <span class="apall-form">${fname}</span>
      <span class="apall-arrow">›</span>
      <span class="apall-field">${flabel}</span>
      <span class="apall-badges">${isParent?'<span class="apall-badge parent">Parent</span>':''}${dir}${unlink}</span>
    </div>`;
  };
  if(!shown.length){ body.innerHTML='<div class="autopop-mgr-empty">No fields or forms match \u201c'+esc(AUTOPOP_ALL_SEARCH)+'\u201d.</div>'; return; }
  body.innerHTML=shown.map(g=>{
    const p=g.members[g.parentIdx];
    let rows=rowFor(p,true);
    g.members.forEach((m,i)=>{ if(i!==g.parentIdx) rows+=rowFor(m,false); });
    const links=g.members.length-1;
    return `<div class="apall-group">
      <div class="apall-group-head"><span class="apall-key">${esc(p.field.label||g.key)}</span><span class="apall-count">${g.members.length} fields · ${links} link${links>1?'s':''}</span></div>
      ${rows}
    </div>`;
  }).join('');
}
function openAutopopAllReport(){
  if(typeof isAdmin==='function' && !isAdmin()){ toast('Admins only'); return; }
  AUTOPOP_ALL_SEARCH='';
  const si=document.getElementById('autopop-all-search-input'); if(si) si.value='';
  const w=document.getElementById('autopop-all-search'); if(w) w.classList.remove('has-value');
  autopopRenderAllReport();
  openModal('autopop-all-modal');
}
/* Edit directly from the All-autopopulated-fields report (no digging per form). */
function autopopAllSetDir(formId, fieldId, overwrite){
  autopopApplyDir(formId, fieldId, overwrite); // handles current-vs-other form + edit-access + persist + toast
  autopopRenderAllReport();
}
function autopopAllUnlink(formId, fieldId){
  const form=autopopGetForm(formId); if(!form) return;
  const tgt=autopopFindField(formId, fieldId); if(!tgt) return;
  if(!(FORM && formId===FORM.id) && !canEditForm(form)){ toast('No edit access to that form'); return; }
  delete tgt.dataKey; delete tgt.prefillOverwrite;
  if(FORM && formId===FORM.id) saveForm(); else persistForms();
  autopopRenderAllReport(); try{ autopopRenderAll(); }catch(e){} try{ render(); }catch(e){}
  toast('Unlinked from autopopulation');
}
function autopopAllSearch(v){ AUTOPOP_ALL_SEARCH=v||''; const w=document.getElementById('autopop-all-search'); if(w) w.classList.toggle('has-value', !!AUTOPOP_ALL_SEARCH.trim()); autopopRenderAllReport(); }
function autopopAllClearSearch(){ AUTOPOP_ALL_SEARCH=''; const si=document.getElementById('autopop-all-search-input'); if(si) si.value=''; const w=document.getElementById('autopop-all-search'); if(w) w.classList.remove('has-value'); autopopRenderAllReport(); if(si) si.focus(); }
function autopopRenderManager(){
  const list=document.getElementById('autopop-mgr-list'); if(!list) return;
  const intro=document.getElementById('autopop-mgr-intro');
  const fields=autopopFieldsOf(FORM).filter(f=>!DISPLAY_ONLY_TYPES.has(f.type));
  let linkedFields=0, totalTargets=0;
  fields.forEach(f=>{ const c=countAutopopLinks(f); if(c.count>0){ linkedFields++; totalTargets+=c.count; } });
  if(intro){
    const ft=esc(FORM.title&&FORM.title.trim()?FORM.title:'this form');
    intro.innerHTML = linkedFields
      ? `On <strong>${ft}</strong>, ${linkedFields} field${linkedFields>1?'s':''} autopopulate ${totalTargets} field${totalTargets>1?'s':''} on your other forms. Click any field to change where its answer carries over.`
      : `Pick a field on <strong>${ft}</strong> to choose where its answer should autopopulate on your other forms. Linked fields then stay in sync automatically.`;
  }
  const q=(AUTOPOP_MGR&&AUTOPOP_MGR.search)||'';
  const shown=fields.filter(f=> !q || (f.label||'').toLowerCase().includes(q) || (f.dataKey||'').toLowerCase().includes(q));
  if(!shown.length){ list.innerHTML='<div class="autopop-mgr-empty">'+(fields.length?'No fields match your search.':'This form has no fillable fields yet.')+'</div>'; return; }
  list.innerHTML=shown.map(f=>{
    const c=countAutopopLinks(f); const linked=c.count>0;
    const targets=autopopLinkTargets(f);
    const tgt = linked
      ? `<div class="autopop-mgr-targets">${targets.slice(0,5).map(t=>`<span class="autopop-mgr-tgt"><span class="amt-form">${esc(t.formTitle)}</span><span class="amt-sep">·</span><span class="amt-field">${esc(t.fieldLabel)}</span></span>`).join('')}${targets.length>5?`<span class="autopop-mgr-more">+${targets.length-5} more</span>`:''}</div>`
      : `<div class="autopop-mgr-none">Not linked yet — click to set up</div>`;
    return `<button type="button" class="autopop-mgr-row${linked?' linked':''}" onclick="autopopManagerOpenField('${f.id}')">
      <div class="autopop-mgr-main">
        <span class="autopop-mgr-name">${esc(f.label||'Untitled')}</span>
        <span class="disp-pill">${esc(fieldTypeName(f))}</span>
        ${linked?`<span class="autopop-mgr-badge">→ ${c.count} field${c.count>1?'s':''} · ${c.formCount} form${c.formCount>1?'s':''}</span>`:'<span class="autopop-mgr-cta">Link…</span>'}
      </div>
      ${tgt}
    </button>`;
  }).join('');
}
function openAutopopModal(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  AUTOPOP.fieldId=fieldId; AUTOPOP.srcFormId=FORM.id; AUTOPOP.search=''; AUTOPOP.fieldSearch=''; AUTOPOP.pendingDir=null;
  const ddc=document.getElementById('autopop-dir-confirm'); if(ddc) ddc.classList.remove('open');
  const key=autopopEnsureSourceKey();
  if(!key){ toast('Select a field first'); return; }
  const others=autopopEditableForms().filter(f=>f.id!==FORM.id);
  AUTOPOP.selFormId = '__ALL__'; // default to the cross-form view
  void others;
  const si=document.getElementById('autopop-search-input'); if(si) si.value='';
  const w=document.getElementById('autopop-search'); if(w) w.classList.remove('has-value');
  const fi=document.getElementById('autopop-field-search-input'); if(fi) fi.value='';
  const fw=document.getElementById('autopop-field-search'); if(fw) fw.classList.remove('has-value');
  autopopRenderAll();
  openModal('autopop-modal');
}

function autopopSearch(v){ AUTOPOP.search=(v||'').toLowerCase(); const w=document.getElementById('autopop-search'); if(w) w.classList.toggle('has-value', !!AUTOPOP.search); autopopRenderForms(); }
function autopopClearSearch(){ const si=document.getElementById('autopop-search-input'); if(si) si.value=''; autopopSearch(''); }

function autopopRenderAll(){ autopopRenderSrcbar(); autopopRenderForms(); autopopRenderFields(); const mm=document.getElementById('autopop-manager-modal'); if(mm&&mm.classList.contains('open')) autopopRenderManager(); }

function autopopRenderSrcbar(){
  const el=document.getElementById('autopop-srcbar'); if(!el) return;
  const f=autopopSourceField(); if(!f){ el.innerHTML=''; return; }
  const apl=countAutopopLinks(f);
  el.innerHTML=`Linking <strong>${esc(f.label||'(untitled)')}</strong> <span class="autopop-field-type">${esc(f.type)}</span> &middot; key <code>${esc(f.dataKey||'')}</code> &middot; <span class="afi-linked">${apl.count} linked</span>`;
}

function autopopRenderForms(){
  const el=document.getElementById('autopop-formlist'); if(!el) return;
  const src=autopopSourceField();
  const totalLinked = src ? countAutopopLinks(src).count : 0;
  let forms=autopopEditableForms();
  if(AUTOPOP.search){ forms=forms.filter(f=>(((f.title||'')+' '+(f.desc||'')).toLowerCase().indexOf(AUTOPOP.search)>=0)); }
  let h=`<div class="autopop-form-item autopop-allforms${AUTOPOP.selFormId==='__ALL__'?' active':''}" onclick="autopopSelectForm('__ALL__')">
    <div class="afi-title">⌕ All forms</div>
    <div class="afi-meta">find the same field everywhere${totalLinked?` &middot; <span class="afi-linked">${totalLinked} linked</span>`:''}</div>
  </div>`;
  if(!forms.length){ el.innerHTML=h+`<div class="autopop-empty" style="padding:20px 10px">No matching forms.</div>`; return; }
  h+=forms.map(f=>{
    const fields=autopopFieldsOf(autopopGetForm(f.id));
    const sameType=fields.filter(x=>isPrefillable(x) && src && x.type===src.type && !(f.id===FORM.id && x.id===src.id));
    const linked=(src&&src.dataKey) ? sameType.filter(x=>x.dataKey===src.dataKey).length : 0;
    const isCur=FORM&&f.id===FORM.id;
    const cnt=sameType.length;
    return `<div class="autopop-form-item${f.id===AUTOPOP.selFormId?' active':''}" onclick="autopopSelectForm('${f.id}')">
      <div class="afi-title">${esc(f.title||'Untitled form')}${isCur?' <span class="afi-tag">current</span>':''}</div>
      <div class="afi-meta">${cnt} ${src?esc(src.type)+' ':''}field${cnt===1?'':'s'}${linked?` &middot; <span class="afi-linked">${linked} linked</span>`:''}</div>
    </div>`;
  }).join('');
  el.innerHTML=h;
}

function autopopSelectForm(id){ AUTOPOP.selFormId=id; AUTOPOP.fieldSearch=''; const fi=document.getElementById('autopop-field-search-input'); if(fi) fi.value=''; const fw=document.getElementById('autopop-field-search'); if(fw) fw.classList.remove('has-value'); autopopRenderForms(); autopopRenderFields(); }

function autopopRenderFields(){
  const el=document.getElementById('autopop-fieldlist'); if(!el) return;
  const src=autopopSourceField();
  if(!src){ el.innerHTML=`<div class="autopop-empty">Select a field first.</div>`; return; }
  const allMode = AUTOPOP.selFormId==='__ALL__';
  const fi=document.getElementById('autopop-field-search-input');
  if(fi) fi.placeholder = allMode ? ('Search '+src.type+' fields across all forms…') : 'Search fields on this form…';
  // Gather candidate {form, field} pairs — same type only, excluding the source field itself.
  let cands=[];
  if(allMode){
    autopopEditableForms().forEach(function(fm){
      const live=autopopGetForm(fm.id);
      autopopFieldsOf(live).forEach(function(f){ if(isPrefillable(f) && f.type===src.type && !(live.id===FORM.id && f.id===src.id)) cands.push({form:live, field:f}); });
    });
    cands.sort(function(a,b){ var la=(a.field.label||'').toLowerCase(), lb=(b.field.label||'').toLowerCase(); if(la<lb)return -1; if(la>lb)return 1; return (a.form.title||'').localeCompare(b.form.title||''); });
  } else {
    const form=autopopGetForm(AUTOPOP.selFormId);
    if(!form){ el.innerHTML=`<div class="autopop-empty">Select a form on the left.</div>`; return; }
    autopopFieldsOf(form).forEach(function(f){ if(isPrefillable(f) && f.type===src.type && !(form.id===FORM.id && f.id===src.id)) cands.push({form:form, field:f}); });
  }
  const total=cands.length;
  const q=AUTOPOP.fieldSearch;
  if(q) cands=cands.filter(function(c){ return (c.field.label||'').toLowerCase().indexOf(q)>=0 || (allMode && (c.form.title||'').toLowerCase().indexOf(q)>=0); });
  let h='';
  if(allMode){ h+=`<div class="autopop-fields-h">All ${esc(src.type)} fields across your forms</div>`; }
  else { const form=autopopGetForm(AUTOPOP.selFormId); h+=`<div class="autopop-fields-h">${esc(src.type)} fields in &ldquo;${esc(form.title||'Untitled form')}&rdquo;</div>`; }
  h+=`<div class="autopop-rule-note">Links connect fields of the <strong>same type</strong> — only <strong>${esc(src.type)}</strong> fields are shown.</div>`;
  if(!cands.length){ el.innerHTML=h+`<div class="autopop-empty">${total?'No fields match your search.':(allMode?'No '+esc(src.type)+' fields on your other forms.':'No '+esc(src.type)+' fields on this form to link.')}</div>`; return; }
  h+=cands.map(function(c){
    const f=c.field, form=c.form;
    const linked = src.dataKey && f.dataKey===src.dataKey;
    const elsewhere = !linked && !!f.dataKey;
    const over = linked && !!f.prefillOverwrite;
    const dir = linked ? `<span class="autopop-dir" onclick="event.stopPropagation()">
        <button type="button" class="autopop-dir-btn${over?'':' active'}" title="Two-way sync — both fields share the value" onclick="event.stopPropagation();autopopSetDir('${form.id}','${f.id}','two')">↔ Two-way</button>
        <button type="button" class="autopop-dir-btn${over?' active':''}" title="One-way — the source overwrites this field" onclick="event.stopPropagation();autopopSetDir('${form.id}','${f.id}','over')">→ Overwrite</button>
      </span>` : '';
    return `<div class="autopop-field-row${linked?' linked':''}" onclick="autopopToggle('${form.id}','${f.id}')">
      <span class="autopop-field-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      <span class="autopop-field-label">${esc(f.label||'(untitled)')}${allMode?`<span class="autopop-field-form">${esc(form.title||'Untitled form')}${form.id===FORM.id?' &middot; current':''}</span>`:''}</span>
      ${dir}
      ${elsewhere?`<span class="autopop-field-elsewhere" title="Already linked to another field group (key “${esc(f.dataKey)}”). Linking here will move it to this one.">in use</span>`:''}
      <span class="autopop-field-type">${esc(f.type)}</span>
    </div>`;
  }).join('');
  el.innerHTML=h;
}
function autopopFieldSearch(v){ AUTOPOP.fieldSearch=(v||'').toLowerCase(); const w=document.getElementById('autopop-field-search'); if(w) w.classList.toggle('has-value', !!AUTOPOP.fieldSearch); autopopRenderFields(); }
function autopopFieldClearSearch(){ const fi=document.getElementById('autopop-field-search-input'); if(fi) fi.value=''; autopopFieldSearch(''); }

function autopopToggle(formId, fieldId){
  const src=autopopSourceField(); if(!src) return;
  const key = src.dataKey || autopopEnsureSourceKey(); if(!key) return;
  const form=autopopGetForm(formId); if(!form) return;
  let tgt=null; (form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.id===fieldId) tgt=f; }));
  if(!tgt) return;
  if(tgt.type!==src.type){ toast('Autopopulation links fields of the same type'); return; }
  const wasLinked = tgt.dataKey===key;
  if(FORM && formId===FORM.id){
    const ff=findFieldById(fieldId); if(ff){ if(wasLinked){ delete ff.dataKey; delete ff.prefillOverwrite; } else ff.dataKey=key; }
    saveForm();
  } else {
    if(!canEditForm(form)){ toast('No edit access to that form'); return; }
    if(wasLinked){ delete tgt.dataKey; delete tgt.prefillOverwrite; } else tgt.dataKey=key;
    persistForms();
  }
  autopopRenderAll();
  render(); // refresh the canvas badge + the inspector's "linked" summary
}
// ---- Link direction (two-way ↔ vs source-overwrites →) ----
// A destination marked prefillOverwrite is "receive-only": it is overwritten by
// the source's shared value but never writes its own value back. The source
// field stays the authority. Choosing overwrite requires confirmation.
function autopopFindField(formId, fieldId){
  const form=autopopGetForm(formId); if(!form) return null;
  let tgt=null; (form.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{ if(f.id===fieldId) tgt=f; }));
  return tgt;
}
function autopopSetDir(formId, fieldId, dir){
  const src=autopopSourceField(); if(!src || !src.dataKey) return;
  const tgt=autopopFindField(formId, fieldId);
  if(!tgt || tgt.dataKey!==src.dataKey) return; // only linked fields have a direction
  if(dir==='over'){
    if(tgt.prefillOverwrite) return; // already one-way
    AUTOPOP.pendingDir={ formId, fieldId };
    const el=document.getElementById('autopop-dir-confirm-text');
    if(el) el.innerHTML = `Make this a <strong>one-way</strong> link? &ldquo;${esc(src.label||src.type)}&rdquo; will <strong>overwrite</strong> &ldquo;${esc(tgt.label||'(untitled)')}&rdquo; whenever the source changes, and that field&rsquo;s own value will no longer flow back. Any existing data in &ldquo;${esc(tgt.label||'(untitled)')}&rdquo; will be replaced.`;
    openModal('autopop-dir-confirm');
  } else {
    autopopApplyDir(formId, fieldId, false);
  }
}
function autopopConfirmDir(){
  const p=AUTOPOP.pendingDir; AUTOPOP.pendingDir=null; closeModal('autopop-dir-confirm');
  if(p) autopopApplyDir(p.formId, p.fieldId, true);
}
function autopopCancelDir(){ AUTOPOP.pendingDir=null; closeModal('autopop-dir-confirm'); }
function autopopApplyDir(formId, fieldId, overwrite){
  const form=autopopGetForm(formId); if(!form) return;
  const apply=(f)=>{ if(!f) return; if(overwrite) f.prefillOverwrite=true; else delete f.prefillOverwrite; };
  if(FORM && formId===FORM.id){ apply(findFieldById(fieldId)); saveForm(); }
  else { if(!canEditForm(form)){ toast('No edit access to that form'); return; } apply(autopopFindField(formId, fieldId)); persistForms(); }
  autopopRenderAll(); render();
  toast(overwrite ? 'One-way — source overwrites this field' : 'Two-way sync restored');
}

/* ---- Seed demo forms for testing autopopulation ----
   Two "Source" and two "Destination" forms, each containing one of EVERY field
   type. Inserted only if missing (by stable id) so they persist across reloads
   and stay around "going forward"; if the user deletes one it is re-seeded on
   the next load. Fields start unlinked so the picker can be exercised fresh. */
function autopopSeedFieldSet(){
  const choice=['Option A','Option B','Option C'];
  const defs=[
    ['text'],['textarea'],['email'],['phone'],['number'],['url'],['password'],
    ['date'],['time'],
    ['select',choice],['radio',choice],['checkboxes',choice],['checkbox'],['toggle'],
    ['range'],['rating'],['file'],['signature'],
    ['heading'],['paragraph'],['divider']
  ];
  const fields=defs.map(function(d){ const f=defaultField(d[0]); if(d[1]) f.options=d[1].slice(); return f; });
  // Randomize order (Fisher–Yates) so fields are NOT positionally aligned across forms.
  for(var i=fields.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=fields[i]; fields[i]=fields[j]; fields[j]=t; }
  // Vary widths; content/large types stay full-width.
  const full={heading:1,paragraph:1,divider:1,textarea:1,signature:1,file:1};
  const spans=[3,4,6,12,4,6];
  fields.forEach(function(f){ f.span = full[f.type] ? 12 : spans[Math.floor(Math.random()*spans.length)]; });
  return fields;
}
// Pack fields into rows of <=12 columns; full-width fields get their own row.
function autopopPackRows(fields){
  const rows=[]; var cur=null, sum=0;
  fields.forEach(function(f){
    var sp=Math.max(1,Math.min(12, f.span||12));
    if(sp>=12){ rows.push({id:uid('r'), fields:[f]}); cur=null; sum=0; return; }
    if(!cur || sum+sp>12){ cur={id:uid('r'), fields:[]}; rows.push(cur); sum=0; }
    cur.fields.push(f); sum+=sp;
  });
  return rows;
}
function seedAutopopTestForms(){
  if(typeof FORMS==='undefined' || !Array.isArray(FORMS)) return;
  const SEED_VERSION=2; // bump to regenerate fixtures (now: randomized order + varied widths)
  const owner=((typeof USERS!=='undefined' && (USERS.find(function(u){return u.role==='admin';})||USERS[0]))||{}).id || CURRENT_USER_ID;
  const seeds=[
    {id:'form_ap_src_1', title:'Autopopulation Source 1'},
    {id:'form_ap_src_2', title:'Autopopulation Source 2'},
    {id:'form_ap_dst_1', title:'Autopopulation Destination 1'},
    {id:'form_ap_dst_2', title:'Autopopulation Destination 2'}
  ];
  let changed=false;
  seeds.forEach(function(s){
    const existing=FORMS.find(function(f){return f.id===s.id;});
    if(existing && (existing.seedVersion||0)>=SEED_VERSION) return; // up to date — leave alone (preserves edits/links)
    const formObj={ id:s.id, title:s.title,
      desc:'',
      ownerId:(existing&&existing.ownerId)||owner, shares:(existing&&existing.shares)||[], scoringGroups:[],scoringSections:[], weightGroups:[],
      rows:autopopPackRows(autopopSeedFieldSet()), seedVersion:SEED_VERSION,
      createdAt:(existing&&existing.createdAt)||Date.now(), updatedAt:Date.now() };
    const idx=FORMS.findIndex(function(f){return f.id===s.id;});
    if(idx>=0) FORMS[idx]=formObj; else FORMS.push(formObj);
    changed=true;
  });
  // One-time cleanup: drop the old auto-generated fixture description from any
  // forms that were already seeded with it — non-destructive (fields, rows,
  // autopopulation links and other edits are untouched).
  FORMS.forEach(function(f){
    if(f && f.desc==='Test fixture — every field type, randomized order and widths, for exercising autopopulation.'){ f.desc=''; changed=true; }
  });
  if(changed) persistForms();
}

/* ----- Shared profile store (app side) ----- */
function loadSharedProfile(){
  try{ return JSON.parse(localStorage.getItem(SHARED_PROFILE_KEY)||'{}')||{}; }
  catch(e){ return {}; }
}
function saveSharedProfileValue(key, value){
  if(!key) return;
  let p; try{ p=JSON.parse(localStorage.getItem(SHARED_PROFILE_KEY)||'{}')||{}; }catch(e){ p={}; }
  if(value==null || value==='' || (Array.isArray(value)&&value.length===0)) delete p[key];
  else p[key]=value;
  try{ localStorage.setItem(SHARED_PROFILE_KEY, JSON.stringify(p)); }catch(e){}
}

/* Read a field's current shared value from the live preview state (used to
   write back to the shared profile when a keyed field changes). */
function previewSharedValue(field){
  if(field.type==='select'||field.type==='radio'){
    const idx=PREVIEW_ANSWERS[field.id];
    if(idx==null) return null;
    return (field.options||[])[Number(idx)] ?? null;
  }
  if(field.type==='checkboxes'){
    const set=PREVIEW_ANSWERS[field.id];
    if(!(set instanceof Set)) return null;
    return [...set].sort((a,b)=>a-b).map(i=>(field.options||[])[i]).filter(v=>v!=null);
  }
  // text-ish / number / date / toggle: read straight from the DOM control.
  const m=document.getElementById('preview-mount'); if(!m) return null;
  const wrap=m.querySelector(`.pf-field[data-field-id="${field.id}"]`); if(!wrap) return null;
  if(field.type==='checkbox'||field.type==='toggle'){
    const cb=wrap.querySelector('input[type=checkbox]'); return cb?!!cb.checked:null;
  }
  const ctrl=wrap.querySelector('input,textarea'); return ctrl?ctrl.value:null;
}

/* Prefill the freshly rendered preview from the shared profile, then mirror
   choice answers into PREVIEW_ANSWERS so scoring + conditions see them. Runs
   before visibility settles so a prefilled controller can reveal its branch. */
/* Seed demo answers into the preview for fields that carry a sampleValue
   (used by the sample forms so number/text/radio/checkbox fields show real
   data instead of empty inputs). Mirrors applyPrefillToPreview's per-type
   handling. Real shared-profile prefill still wins (runs first). */
function applySampleValuesToPreview(){
  const m=document.getElementById('preview-mount'); if(!m) return;
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==PREVIEW_PAGE) return;
    row.fields.forEach(f=>{
      if(f.sampleValue===undefined || f.sampleValue===null) return;
      if(PREVIEW_ANSWERS[f.id]!==undefined) return; // don't overwrite real prefill
      const val=f.sampleValue;
      const wrap=m.querySelector(`.pf-field[data-field-id="${f.id}"]`); if(!wrap) return;
      if(f.type==='select'){
        const idx=(f.options||[]).findIndex(o=>String(o)===String(val));
        if(idx>=0){ const sel=wrap.querySelector('select'); if(sel){ sel.value=String(idx); PREVIEW_ANSWERS[f.id]=idx; syncCddForSelect(sel); } }
      } else if(f.type==='radio'){
        const idx=(f.options||[]).findIndex(o=>String(o)===String(val));
        if(idx>=0){ const r=wrap.querySelector(`input[type=radio][data-opt-idx="${idx}"]`); if(r){ r.checked=true; PREVIEW_ANSWERS[f.id]=idx; } }
      } else if(f.type==='checkboxes'){
        const arr=Array.isArray(val)?val:[val];
        const set=new Set();
        arr.forEach(v=>{ const idx=(f.options||[]).findIndex(o=>String(o)===String(v)); if(idx>=0){ set.add(idx); const cb=wrap.querySelector(`input[type=checkbox][data-opt-idx="${idx}"]`); if(cb) cb.checked=true; } });
        if(set.size) PREVIEW_ANSWERS[f.id]=set;
      } else if(f.type==='checkbox'||f.type==='toggle'){
        const cb=wrap.querySelector('input[type=checkbox]'); const _on=(val===true||val==='true'); if(cb) cb.checked=_on; PREVIEW_ANSWERS[f.id]=_on;
      } else if(f.type==='rating'){
        const n=Number(val)||0; const star=wrap.querySelector(`[data-star="${n}"]`); PREVIEW_ANSWERS[f.id]=n;
        // rating UI repaints from PREVIEW_ANSWERS via updatePreviewScores/visibility
      } else {
        const ctrl=wrap.querySelector('input,textarea');
        if(ctrl){ ctrl.value=val; if(f.type==='number'||f.type==='range'){ const nn=Number(val); PREVIEW_ANSWERS[f.id]=isNaN(nn)?null:nn; } }
      }
    });
  });
}

function applyPrefillToPreview(){
  const m=document.getElementById('preview-mount'); if(!m) return;
  const profile=loadSharedProfile();
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==PREVIEW_PAGE) return;
    row.fields.forEach(f=>{
      if(!f.dataKey || !isPrefillable(f)) return;
      if(!(f.dataKey in profile)) return;
      const val=profile[f.dataKey];
      const wrap=m.querySelector(`.pf-field[data-field-id="${f.id}"]`); if(!wrap) return;
      if(f.type==='select'){
        const idx=(f.options||[]).findIndex(o=>String(o)===String(val));
        if(idx>=0){ const sel=wrap.querySelector('select'); if(sel){ sel.value=String(idx); PREVIEW_ANSWERS[f.id]=idx; syncCddForSelect(sel); } }
      } else if(f.type==='radio'){
        const idx=(f.options||[]).findIndex(o=>String(o)===String(val));
        if(idx>=0){ const r=wrap.querySelector(`input[type=radio][data-opt-idx="${idx}"]`); if(r){ r.checked=true; PREVIEW_ANSWERS[f.id]=idx; } }
      } else if(f.type==='checkboxes'){
        const arr=Array.isArray(val)?val:[val];
        const set=new Set();
        arr.forEach(v=>{ const idx=(f.options||[]).findIndex(o=>String(o)===String(v)); if(idx>=0){ set.add(idx); const cb=wrap.querySelector(`input[type=checkbox][data-opt-idx="${idx}"]`); if(cb) cb.checked=true; } });
        if(set.size) PREVIEW_ANSWERS[f.id]=set;
      } else if(f.type==='checkbox'||f.type==='toggle'){
        const cb=wrap.querySelector('input[type=checkbox]'); const _on=(val===true||val==='true'); if(cb) cb.checked=_on; PREVIEW_ANSWERS[f.id]=_on;
      } else {
        const ctrl=wrap.querySelector('input,textarea');
        if(ctrl){ ctrl.value=val; if(f.type==='number'||f.type==='range'){ const n=Number(val); PREVIEW_ANSWERS[f.id]=isNaN(n)?null:n; } }
      }
    });
  });
}

/* ==================================================================
   FORM-LEVEL DISPLAY RULES (conditional whole-form showing)
   ==================================================================
   Whole forms are sequenced/routed by the backend, so the builder's job is to
   author each form's "show this form when…" condition and emit it in the JSON
   schema. Conditions are expressed over SHARED DATA KEYS — the cross-form
   currency from the prefill system — so the backend can evaluate them against
   the patient's accumulated answers. Multiple conditions combine with ALL/ANY.

     FORM.showIf = { match:'all'|'any', conditions:[ {key, op, value} ] }
     op ∈ = ≠ > < ≥ ≤   (same primitive as field/row rules)

   No rule (or no conditions) = always show. */
const FORM_RULE_OPS=[{v:'eq',l:'is (equals)'},{v:'neq',l:'is not'},{v:'contains',l:'contains'},{v:'ncontains',l:'does not contain'},{v:'gt',l:'greater than'},{v:'gte',l:'at least (≥)'},{v:'lt',l:'less than'},{v:'lte',l:'at most (≤)'},{v:'between',l:'is between'},{v:'notbetween',l:'is not between'},{v:'filled',l:'is filled in'},{v:'empty',l:'has no answer'}];
const FORM_RULE_NOVALUE=new Set(['filled','empty']);
const FORM_RULE_RANGE=new Set(['between','notbetween']);
/* One place that turns an authored condition into the schema object emitted to the backend. */
function formRuleCondSchema(c){
  if(FORM_RULE_NOVALUE.has(c.op)) return {key:c.key, op:c.op};
  if(FORM_RULE_RANGE.has(c.op)) return {key:c.key, op:c.op, value:c.value, value2:c.value2||''};
  return {key:c.key, op:c.op, value:c.value};
}

// Every shared data key defined anywhere in the collection — used to suggest
// keys when authoring a form rule (so you can branch on another form's field).
function allDataKeysInUse(){
  const set=new Set();
  const collect=(f)=>{
    (f.rows||[]).forEach(r=>(r.fields||[]).forEach(fl=>{ if(fl.dataKey) set.add(fl.dataKey); }));
    (f.scoringSections||[]).forEach(s=>{ if(s.scoreKey) set.add(s.scoreKey); });
  };
  (typeof FORMS!=='undefined'?FORMS:[]).forEach(collect);
  collect(FORM);
  return [...set].sort();
}

/* Pure evaluation of a form's display rule against a flat {key:value} map.
   Mirrors exactly what the schema asks the backend to implement, and powers
   the what-if tester. No rule -> always show. Numeric compare when both sides
   parse as numbers, else string compare for =/≠. */
function evalFormShowIf(rule, values){
  if(!rule || !rule.conditions || !rule.conditions.length) return true;
  values=values||{};
  const test=(c)=>{
    const have=values[c.key];
    if(have===undefined || have===null || have===''){
      return c.op==='neq'; // missing value only satisfies "not equal"
    }
    const an=Number(have), bn=Number(c.value);
    const numeric=(String(c.value).trim()!=='' && !isNaN(an) && !isNaN(bn));
    switch(c.op){
      case 'eq':  return numeric ? an===bn : String(have)===String(c.value);
      case 'neq': return numeric ? an!==bn : String(have)!==String(c.value);
      case 'gt':  return numeric ? an>bn : String(have)>String(c.value);
      case 'lt':  return numeric ? an<bn : String(have)<String(c.value);
      case 'gte': return numeric ? an>=bn : String(have)>=String(c.value);
      case 'lte': return numeric ? an<=bn : String(have)<=String(c.value);
    }
    return true;
  };
  return rule.match==='any' ? rule.conditions.some(test) : rule.conditions.every(test);
}

// Short human summary of a form rule for the indicator pill.
function summarizeFormRule(rule){
  if(!rule||!rule.conditions||!rule.conditions.length) return '';
  const parts=rule.conditions.map(c=>{
    const opl=(FORM_RULE_OPS.find(o=>o.v===c.op)||{}).l||c.op;
    if(FORM_RULE_NOVALUE.has(c.op)) return `${c.key||'?'} ${opl}`;
    if(FORM_RULE_RANGE.has(c.op)) return `${c.key||'?'} ${opl} ${c.value!==''&&c.value!=null?c.value:'?'}–${c.value2!==''&&c.value2!=null?c.value2:'?'}`;
    return `${c.key||'?'} ${opl} ${c.value!==''&&c.value!=null?c.value:'?'}`;
  });
  return parts.join(rule.match==='any'?' OR ':' AND ');
}

function ensureFormShowIf(){ if(!FORM.showIf) FORM.showIf={match:'all', conditions:[]}; return FORM.showIf; }
function openFormRules(){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  openModal('formrule-modal');
  renderFormRuleModal();
}
function formRuleAddCond(){ if(currentFormReadOnly()) return; ensureFormShowIf().conditions.push({key:'', op:'eq', value:''}); persistFormRules(); }
function formRuleRemoveCond(i){
  if(currentFormReadOnly()) return;
  const r=FORM.showIf; if(!r) return;
  r.conditions.splice(i,1);
  if(!r.conditions.length) delete FORM.showIf;
  persistFormRules();
}
function formRuleSetMatch(m){ if(currentFormReadOnly()) return; ensureFormShowIf().match=(m==='any'?'any':'all'); persistFormRules(); }
function formRuleSetField(i, prop, val){
  if(currentFormReadOnly()) return;
  const r=FORM.showIf; if(!r||!r.conditions[i]) return;
  if(prop==='key') r.conditions[i].key=slugifyKey(val);
  else r.conditions[i][prop]=val;
  persistFormRules();
}
function persistFormRules(){ saveForm(); renderFormRuleModal(); renderFormRuleBar();
  const dm=document.getElementById('dispmgr-modal'); if(dm && dm.classList.contains('open')) renderDisplayManager(); }

/* The form-level display rule moved OFF the form head (06-09-26) — it now lives
   only inside the Show Fields manager, next to the field rules it belongs with.
   renderFormRuleBar stays as a safe no-op for any stale callers; the pill HTML
   is produced by formRulePillHTML() and injected by renderDisplayManager. */
function renderFormRuleBar(){
  const bar=document.getElementById('form-rule-bar'); if(!bar) return; // element removed — no-op
}
function formRulePillHTML(){
  if(currentFormReadOnly()) return '';
  const rule=FORM.showIf;
  if(rule && rule.conditions && rule.conditions.length){
    return `<button class="form-rule-pill active" onclick="openFormRules()" title="Edit when this form is shown">🔀 This form shows when ${esc(summarizeFormRule(rule))}</button>`;
  }
  return `<button class="form-rule-pill" onclick="openFormRules()" title="Add a condition that controls whether your backend shows this whole form">🔀 Add display rule</button>`;
}
function renderFormRuleModal(){
  const overlay=document.getElementById('formrule-modal');
  if(!overlay || !overlay.classList.contains('open')) return;
  const body=document.getElementById('formrule-body'); if(!body) return;
  const rule=FORM.showIf;
  const conds=(rule && rule.conditions)||[];
  const keys=allDataKeysInUse();
  let h=`<p class="formrule-intro">Your backend shows this form only when these conditions pass, evaluated against the patient's shared data (the keys you set on fields, across all forms). Leave empty to always show.</p>`;
  if(conds.length>1){
    h+=`<div class="formrule-match">Match
      <select class="enhance-dd" onchange="formRuleSetMatch(this.value)">
        <option value="all"${rule.match!=='any'?' selected':''}>ALL conditions</option>
        <option value="any"${rule.match==='any'?' selected':''}>ANY condition</option>
      </select></div>`;
  }
  conds.forEach((c,i)=>{
    h+=`<div class="formrule-row">
      <input list="formrule-keys" type="text" value="${esc(c.key)}" placeholder="data key" onchange="formRuleSetField(${i},'key',this.value)">
      <select class="enhance-dd" onchange="formRuleSetField(${i},'op',this.value)">${FORM_RULE_OPS.map(o=>`<option value="${o.v}"${c.op===o.v?' selected':''}>${o.l}</option>`).join('')}</select>
      ${FORM_RULE_NOVALUE.has(c.op) ? `<span class="formrule-novalue">no value needed</span>` : (FORM_RULE_RANGE.has(c.op) ? `<input type="text" value="${esc(c.value)}" placeholder="from" onchange="formRuleSetField(${i},'value',this.value)"><span class="formrule-and">and</span><input type="text" value="${esc(c.value2||'')}" placeholder="to" onchange="formRuleSetField(${i},'value2',this.value)">` : `<input type="text" value="${esc(c.value)}" placeholder="value" onchange="formRuleSetField(${i},'value',this.value)">`)}
      <button class="formrule-del" onclick="formRuleRemoveCond(${i})" title="Remove condition">✕</button>
    </div>`;
  });
  h+=`<datalist id="formrule-keys">${keys.map(k=>`<option value="${esc(k)}"></option>`).join('')}</datalist>`;
  h+=`<button class="btn" style="margin-top:10px" onclick="formRuleAddCond()">+ Add condition</button>`;
  if(conds.length){
    h+=`<div class="formrule-summary"><span>Schema emits:</span><code>${esc(JSON.stringify({match:rule.match==='any'?'any':'all',conditions:conds.map(formRuleCondSchema)}))}</code></div>`;
  }
  body.innerHTML=h;
  enhanceDropdowns(body);
}

/* Scoring "sections" are now called scoring GROUPS. To rename the data key
   without rewriting the ~80 existing references (conditions, reports and alerts
   all read FORM.scoringSections / item.sectionId), scoringGroups is the new
   canonical key and scoringSections is kept as a synonym pointing at the SAME
   array. Every scoring mutator calls ensureScoringInit() first, which re-points
   both names at one shared array — so edits through either name stay in lockstep
   and old saved forms (which only have scoringSections) migrate transparently. */
function ensureScoringInit(){
  var arr = FORM.scoringGroups || FORM.scoringSections || [];
  FORM.scoringGroups = arr;
  FORM.scoringSections = arr;   // synonym → same reference
}

/* Find the scoring section a field belongs to (or null). A field can only
   live in one section — assigning to a new section automatically removes it
   from any other. Keeps the mental model simple ("which cluster is this
   in?") and avoids double-counting on the running total. */
function sectionForField(fieldId){
  ensureScoringInit();
  return FORM.scoringSections.find(s=>s.fieldIds.includes(fieldId)) || null;
}

/* The maximum points a field can contribute = the highest score across its
   options. (For checkboxes the user could conceivably tick more than one,
   but treating "max possible" as the single highest value keeps screener
   semantics correct — PHQ-9 picks ONE response per question.) */
function fieldMaxScore(field){
  if(!isScoreable(field)) return 0;
  const scores=field.optionScores||[];
  let max=0;
  scores.forEach(s=>{ const n=Number(s)||0; if(n>max) max=n; });
  // Cover the case where the field has more options than scores entered:
  // those options contribute 0, which is already the floor.
  return max;
}

/* Per-section ceiling = sum of each member field's max score. Used by the
   preview to show "12 / 27" style totals. */
function sectionMaxScore(section){
  ensureScoringInit();
  let total=0;
  (section.fieldIds||[]).forEach(fid=>{
    const f=findFieldById(fid);
    if(f) total += fieldMaxScore(f);
  });
  return total;
}

/* Create a fresh scoring section. Newly-created sections start with no
   members and one example band the user can edit or delete. */
function createScoringSection(count){
  ensureScoringInit();
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  let n=parseInt(count,10); if(!(n>=1)) n=1; if(n>20) n=20;
  // Suggest a name the user can type over rather than start from blank.
  // Number from the highest existing "Scoring group N" (not array length), so
  // deleting groups never makes the next suggestion collide with a survivor.
  let base=0;
  FORM.scoringSections.forEach(s=>{
    const m=/^Scoring group (\d+)$/.exec(s.name||'');
    if(m){ const v=parseInt(m[1],10); if(v>base) base=v; }
  });
  let firstNewId=null;
  for(let k=0;k<n;k++){
    const section={
      id:uid('sect'),
      name:`Scoring group ${base+1+k}`,
      fieldIds:[],
      bands:[]
    };
    FORM.scoringSections.push(section);
    if(k===0) firstNewId=section.id;
  }
  // If a search filter is active, the new "Scoring group N" almost certainly
  // wouldn't match it — it would render nowhere and the button would look
  // dead. Clear the search so the new group is always visible and focusable.
  resetScoringSearch();
  render();
  renderScoringModal();
  scoringFocusGroup(firstNewId); // move focus down to the new group(s) so the user doesn't get lost
  if(n>1) toast(n+' scoring groups added');
}
// Scroll the just-created group into view and focus its name field.
function scoringFocusGroup(id){
  if(!id) return;
  requestAnimationFrame(function(){
    const mount=document.getElementById('scoring-sections-list'); if(!mount) return;
    const el=mount.querySelector('[data-section-id="'+id+'"]'); if(!el) return;
    try{ el.scrollIntoView({behavior:'smooth', block:'start'}); }catch(e){ el.scrollIntoView(); }
    const inp=el.querySelector('.scoring-name-input');
    if(inp){ try{ inp.focus(); if(inp.select) inp.select(); }catch(e){} }
  });
}
// "Add multiple": read the count box next to the button.
function createScoringSectionMulti(){
  const inp=document.getElementById('scoring-multi-n');
  let n=parseInt(inp&&inp.value,10); if(!(n>=2)) n=2; if(n>20) n=20;
  if(inp) inp.value=n; // reflect the clamp (2–20) so the box never lies about what happened
  createScoringSection(n);
}
// Hide + empty the saved-groups search (panel, input, query, button state).
// Shared by modal-open, the Find toggle, and group creation.
function resetScoringSearch(){
  const p=document.getElementById('scoring-search-panel'); if(p) p.style.display='none';
  const btn=document.getElementById('scoring-find-btn'); if(btn) btn.classList.remove('active');
  const si=document.getElementById('scoring-group-search'); if(si) si.value='';
  SCORING_GROUP_QUERY='';
}
// Header "Find a group" button: reveal/hide the saved-groups search.
function toggleScoringSearch(){
  const p=document.getElementById('scoring-search-panel'); if(!p) return;
  const showing=p.style.display!=='none';
  const btn=document.getElementById('scoring-find-btn');
  if(showing){
    const hadQuery=!!SCORING_GROUP_QUERY;
    resetScoringSearch();
    if(hadQuery) renderScoringModal();
  } else {
    p.style.display='';
    if(btn) btn.classList.add('active');
    const si=document.getElementById('scoring-group-search'); if(si){ try{ si.focus(); }catch(e){} }
  }
}

function deleteScoringSection(sectionId){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s) return;
  // Confirm only when there are members — deleting an empty section is
  // a safe undo of "I made this by accident".
  if(s.fieldIds.length>0 && !confirm(`Delete scoring section "${s.name}"? Fields stay; only the grouping is removed.`)) return;
  // Mutate the shared array in place (splice, not filter-reassign) so the
  // scoringGroups/scoringSections alias keeps pointing at one array.
  for(var _i=FORM.scoringGroups.length-1;_i>=0;_i--){ if(FORM.scoringGroups[_i].id===sectionId) FORM.scoringGroups.splice(_i,1); }
  render();
  renderScoringModal();
  toast('Group deleted');
}

function renameScoringSection(sectionId, name){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s) return;
  s.name=name.trim()||s.name; // never let it go blank
  render();
}

/* Publish a section's running total under a shared data key (e.g. phq9_total)
   so form-level display rules and the backend can branch on the score. The
   total is written into the shared profile (preview + export) and emitted in
   the schema. Empty clears it. */
function setSectionScoreKey(sectionId, raw){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s) return;
  const k=slugifyKey(raw);
  if(k) s.scoreKey=k; else delete s.scoreKey;
  render();
}

/* Assign a field to a section, removing it from any other section first. */
function setFieldSection(fieldId, sectionId){
  ensureScoringInit();
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f=findFieldById(fieldId);
  if(!f){ return; }
  if(!isScoreable(f)){ toast('Only radio, dropdown, checkbox-list, or toggle fields can be scored'); return; }
  if(f.type==='toggle' && (!f.optionScores || !f.optionScores.length)) f.optionScores=[1,0];
  // Strip from all sections first — a field belongs to at most one section.
  FORM.scoringSections.forEach(s=>{
    s.fieldIds=s.fieldIds.filter(id=>id!==fieldId);
  });
  if(sectionId){
    const target=FORM.scoringSections.find(s=>s.id===sectionId);
    if(target && !target.fieldIds.includes(fieldId)) target.fieldIds.push(fieldId);
  }
  render();
  renderScoringModal(); // if the modal is open, refresh its rows
}

/* ── Multi-section membership ────────────────────────────────────────────────
   A field may belong to MORE THAN ONE scoring section (e.g. a PSC-17 item
   counts toward both the Total and its subscale). These additive helpers add /
   remove a field for ONE section without disturbing its other memberships.
   sectionsForField returns every section a field is in. (setFieldSection above
   keeps its exclusive "move" semantics for any caller that still wants it.) */
function addFieldToSection(fieldId, sectionId){
  ensureScoringInit();
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f=findFieldAnyForm(fieldId);
  if(!f) return;
  if(!isScoreable(f)){ toast('Only radio, dropdown, checkbox-list, or toggle fields can be scored'); return; }
  if(f.type==='toggle' && (!f.optionScores || !f.optionScores.length)) f.optionScores=[1,0];
  const target=FORM.scoringSections.find(s=>s.id===sectionId);
  if(target && !target.fieldIds.includes(fieldId)) target.fieldIds.push(fieldId);
  render();
  renderScoringModal();
}
function removeFieldFromSection(fieldId, sectionId){
  ensureScoringInit();
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(s) s.fieldIds=s.fieldIds.filter(id=>id!==fieldId);
  render();
  renderScoringModal();
}
function sectionsForField(fieldId){
  ensureScoringInit();
  return FORM.scoringSections.filter(s=>(s.fieldIds||[]).includes(fieldId));
}

/* Update a single option's score value. Called from the inspector's
   per-option score grid. Bounds are intentionally generous (no negative
   limit) since some screeners use reverse-scored items. */
function setOptionScore(fieldId, optionIdx, score){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId);
  if(!f) return;
  if(!f.optionScores) f.optionScores=[];
  // Grow the array if needed so the index lines up with options[].
  while(f.optionScores.length<=optionIdx) f.optionScores.push(0);
  const n=Number(score);
  f.optionScores[optionIdx]=isNaN(n)?0:n;
  render();
}

/* Update a field's options list, then re-sync its optionScores array so
   indexes stay aligned. Truncating options shouldn't leave orphaned scores
   contributing to fieldMaxScore; growing options should leave new entries
   defaulted to 0 (so a newly-added option is non-scoring until set). */
/* Live (per-keystroke) options update. Updates the model immediately so the
   change is never lost if the user clicks Preview without blurring the textarea
   first — the root cause of "dropdown options don't show in preview." Does NOT
   re-render the builder canvas (that would steal focus mid-type); refreshes the
   live Preview if open. Full canvas render + score-array sync runs on blur via
   updateFieldOptions. */
function updateFieldOptionsLive(fieldId, rawText){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId);
  if(!f) return;
  f.options=rawText.split('\n').map(s=>s.trim()).filter(s=>s);
  if(!f.optionScores) f.optionScores=[];
  if(f.optionScores.length>f.options.length) f.optionScores.length=f.options.length;
  while(f.optionScores.length<f.options.length) f.optionScores.push(0);
  if(typeof saveForm==='function') saveForm();
  if(typeof MODE!=='undefined' && MODE==='preview' && typeof renderPreview==='function') renderPreview();
}

function updateFieldOptions(fieldId, rawText){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId);
  if(!f) return;
  const newOpts=rawText.split('\n').map(s=>s.trim()).filter(s=>s);
  f.options=newOpts;
  if(!f.optionScores) f.optionScores=[];
  // Truncate or pad to match the new length.
  if(f.optionScores.length>newOpts.length) f.optionScores.length=newOpts.length;
  while(f.optionScores.length<newOpts.length) f.optionScores.push(0);
  render();
}
/* Option direction for radio/checkbox groups: vertical (default, stacked) or
   horizontal (inline, wrapping). Stored only when horizontal so vertical stays
   the clean default. */
/* ---- Yes/No toggle: switch rendering + label-pair configuration ---- */
const TOGGLE_PRESETS=[
  {key:'yesno',         on:'Yes',    off:'No',       label:'Yes / No'},
  {key:'truefalse',     on:'True',   off:'False',    label:'True / False'},
  {key:'openclosed',    on:'Open',   off:'Closed',   label:'Open / Closed'},
  {key:'activeinactive',on:'Active', off:'Inactive', label:'Active / Inactive'},
  {key:'readunread',    on:'Read',   off:'Unread',   label:'Read / Unread'},
  {key:'other',                                       label:'Other (Custom)'}
];
function toggleSwitchHTML(field, checked){
  const on=esc(field.toggleOn!=null?field.toggleOn:'Yes');
  const off=esc(field.toggleOff!=null?field.toggleOff:'No');
  // A <label> wrapper (not <span>) so a click ANYWHERE on the control — track,
  // thumb, or either side label — toggles the checkbox. With a span, the
  // visible track paints on top of the (absolutely-positioned) checkbox, so
  // clicking the track never reached it and the toggle appeared dead.
  return `<label class="swt-wrap"><input type="checkbox" class="swt-input"${checked?' checked':''}><span class="swt-side swt-off">${off}</span><span class="swt-track"><span class="swt-thumb"></span></span><span class="swt-side swt-on">${on}</span></label>`;
}
function setPhoneExt(fieldId,on){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId); if(!f||f.type!=='phone') return;
  if(on) f.phoneExt=true; else delete f.phoneExt;
  saveForm(); render(); renderInspector();
}
function setToggleStyle(fieldId,style){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId); if(!f||f.type!=='toggle') return;
  if(style==='checkbox') f.toggleStyle='checkbox'; else delete f.toggleStyle;
  saveForm(); render(); renderInspector();
}
function setTogglePreset(fieldId,key){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId); if(!f||f.type!=='toggle') return;
  if(key==='other'){
    f.toggleCustom=true;
    if(f.toggleOn==null) f.toggleOn='On';
    if(f.toggleOff==null) f.toggleOff='Off';
  } else {
    const p=TOGGLE_PRESETS.find(x=>x.key===key);
    if(p){ f.toggleOn=p.on; f.toggleOff=p.off; }
    delete f.toggleCustom;
  }
  saveForm(); render(); renderInspector();
}
function setToggleLabel(fieldId,which,val){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId); if(!f||f.type!=='toggle') return;
  val=(val||'').trim();
  if(which==='on') f.toggleOn=val||'On'; else f.toggleOff=val||'Off';
  f.toggleCustom=true;
  saveForm(); render();
}
function setOptionLayout(fieldId, layout){
  if(currentFormReadOnly()){ return; }
  const f=findFieldById(fieldId);
  if(!f || (f.type!=='radio' && f.type!=='checkboxes')) return;
  if(layout==='horizontal') f.optionLayout='horizontal'; else delete f.optionLayout;
  saveForm();
  render();
}
function addBand(sectionId){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s) return;
  if(!s.bands) s.bands=[];
  // Seed with sensible defaults that the user will typically adjust.
  s.bands.push({min:0, max:4, label:'Minimal', severity:'low'});
  render();
  renderScoringModal();
}
function updateBand(sectionId, bandIdx, prop, value){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s || !s.bands || !s.bands[bandIdx]) return;
  if(prop==='min' || prop==='max'){
    const n=Number(value);
    s.bands[bandIdx][prop]=isNaN(n)?0:n;
  } else {
    s.bands[bandIdx][prop]=value;
  }
  // Don't render() here — the input is still focused. The next blur/render
  // cycle will pick up the change. But re-render the preview lazily so the
  // user sees live updates when they tab away from the input.
  renderPreviewIfNeeded();
}
// Severity-band color: presets map to a severity level; a "Custom…" choice (or
// using the color picker) stores an explicit hex in b.color that overrides the
// preset everywhere (modal swatch, preview card, exported score card).
const BAND_PRESET_HEX={low:'#1a8a66',mild:'#d97706',mod:'#ea580c',high:'#c0392b'};
function setBandColorChoice(sectionId, bandIdx, value){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s||!s.bands||!s.bands[bandIdx]) return;
  const b=s.bands[bandIdx];
  if(value==='custom'){
    if(!(b.color&&/^#[0-9a-fA-F]{6}$/.test(b.color))) b.color=BAND_PRESET_HEX[b.severity]||'#1a8a66';
  } else { b.severity=value; delete b.color; }
  saveForm(); render(); renderScoringModal(); renderPreviewIfNeeded();
}
function setBandCustomColor(sectionId, bandIdx, hex){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s||!s.bands||!s.bands[bandIdx]) return;
  if(/^#[0-9a-fA-F]{6}$/.test(hex)) s.bands[bandIdx].color=hex;
  saveForm(); render(); renderScoringModal(); renderPreviewIfNeeded();
}
function clearBandCustomColor(sectionId, bandIdx){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s||!s.bands||!s.bands[bandIdx]) return;
  delete s.bands[bandIdx].color;
  saveForm(); render(); renderScoringModal(); renderPreviewIfNeeded();
}
function deleteBand(sectionId, bandIdx){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s || !s.bands) return;
  s.bands.splice(bandIdx,1);
  render();
  renderScoringModal();
}
function setSectionAlert(sectionId, prop, value){
  ensureScoringInit();
  const s=FORM.scoringSections.find(x=>x.id===sectionId);
  if(!s) return;
  if(!s.alert) s.alert={on:false,min:0,msg:''};
  if(prop==='on'){ s.alert.on=!!value; render(); renderScoringModal(); }
  else if(prop==='min'){ const n=Number(value); s.alert.min=isNaN(n)?0:n; renderPreviewIfNeeded(); }
  else { s.alert[prop]=value; renderPreviewIfNeeded(); }
}

/* Decide which band a given score falls into. Bands are inclusive of min
   AND max — a score of exactly 5 matches both 0..5 and 5..9 if the user
   sets them that way, in which case we pick the FIRST match (top-down
   priority gives the user predictable layering). */
function bandForScore(section, score){
  if(!section || !section.bands) return null;
  for(const b of section.bands){
    if(score >= (Number(b.min)||0) && score <= (Number(b.max)||0)){
      return b;
    }
  }
  return null;
}

/* Strip out any field ids from scoring sections that no longer exist (e.g.
   the user deleted the field) or that aren't scoreable anymore (e.g. type
   was changed to plain text). Called from saveForm so the persisted state
   stays self-consistent. */
function pruneScoringSections(){
  ensureScoringInit();
  FORM.scoringSections.forEach(s=>{
    s.fieldIds=(s.fieldIds||[]).filter(fid=>{
      // Resolve across ALL forms — a scoring group may reference fields that
      // live on other forms, which findFieldById (current form only) can't see.
      const f=findFieldAnyForm(fid);
      return f && isScoreable(f);
    });
  });
}

/* ----- UI: scoring modal ----- */
function openScoringModal(){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ensureScoringInit();
  resetScoringSearch(); // start unfiltered; search lives behind the header "Find a group" button
  renderScoringModal();
  openModal('scoring-modal');
}

/* ============================================================
   CRITICAL-ITEM ALERTS — fire on a specific answer, regardless of total.
   Stored on section.alert.critical = [{fieldId, options:[idx], msg}].
   ============================================================ */
function answerHitsOptions(ans, options){
  if(!options || !options.length) return false;
  if(ans instanceof Set){ for(var i=0;i<options.length;i++){ if(ans.has(Number(options[i]))) return true; } return false; }
  if(ans==null) return false;
  return options.map(Number).indexOf(Number(ans))>=0;
}
/* Returns the message to show for a section's alert (critical items take
   priority over the total threshold), or '' if nothing should fire. */
function previewAlertMsg(section, total){
  const al=section.alert; if(!al) return '';
  const crit=al.critical||[];
  for(let i=0;i<crit.length;i++){
    const c=crit[i]; if(!c||!c.fieldId) continue;
    const _cf=findFieldById(c.fieldId);
    let _hit;
    if(_cf && _cf.type==='toggle'){ const _idx=(PREVIEW_ANSWERS[c.fieldId]===true)?0:1; _hit=(c.options||[]).map(Number).indexOf(_idx)>=0; }
    else { _hit=answerHitsOptions(PREVIEW_ANSWERS[c.fieldId], c.options); }
    if(_hit) return c.msg || 'Critical item flagged \u2014 review immediately.';
  }
  if(al.on && (Number(al.min)||0)>0 && total>=Number(al.min)) return al.msg || 'Elevated risk \u2014 flag for clinician review.';
  return '';
}
function ensureAlert(s){ if(!s.alert) s.alert={on:false,min:0,msg:'',critical:[]}; if(!s.alert.critical) s.alert.critical=[]; return s.alert; }
function addCriticalItem(sectionId){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; ensureAlert(s).critical.push({fieldId:'',options:[],msg:''}); renderScoringModal(); }
function removeCriticalItem(sectionId,i){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s||!s.alert||!s.alert.critical) return; s.alert.critical.splice(i,1); renderScoringModal(); renderPreviewIfNeeded(); }
function setCriticalField(sectionId,i,fid){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const a=ensureAlert(s); if(a.critical[i]){ a.critical[i].fieldId=fid; a.critical[i].options=[]; } renderScoringModal(); renderPreviewIfNeeded(); }
function toggleCriticalOption(sectionId,i,optIdx,on){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const c=ensureAlert(s).critical[i]; if(!c) return; c.options=c.options||[]; const pos=c.options.map(Number).indexOf(Number(optIdx)); if(on){ if(pos<0) c.options.push(Number(optIdx)); } else if(pos>=0){ c.options.splice(pos,1); } renderPreviewIfNeeded(); }
function setCriticalMsg(sectionId,i,msg){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const a=ensureAlert(s); if(a.critical[i]) a.critical[i].msg=msg; renderPreviewIfNeeded(); }

/* ---- "Notify when this fires" — recipients for a Risk alert or Critical item.
   Stored as alert.notify / criticalItem.notify = {sms,email,patient,roles,userIds,clientIds}.
   Delivery is performed by the connected CRM; the builder owns the config. ---- */
function ensureAlertNotify(s){ const a=ensureAlert(s); if(!a.notify||typeof a.notify!=='object') a.notify={sms:false,email:false,patient:false,roles:[],userIds:[],clientIds:[]}; const n=a.notify; ['roles','userIds','clientIds'].forEach(k=>{ if(!Array.isArray(n[k])) n[k]=[]; }); return n; }
function ensureCritNotify(s,i){ const a=ensureAlert(s); const c=a.critical[i]; if(!c) return null; if(!c.notify||typeof c.notify!=='object') c.notify={sms:false,email:false,patient:false,roles:[],userIds:[],clientIds:[]}; const n=c.notify; ['roles','userIds','clientIds'].forEach(k=>{ if(!Array.isArray(n[k])) n[k]=[]; }); return n; }
function setAlertNotify(sectionId,prop,value){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const n=ensureAlertNotify(s); n[prop]=!!value; saveForm(); renderScoringModal(); renderPreviewIfNeeded(); }
function setCritNotify(sectionId,i,prop,value){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const n=ensureCritNotify(s,i); if(!n) return; n[prop]=!!value; saveForm(); renderScoringModal(); renderPreviewIfNeeded(); }
function openAlertNotifyPicker(sectionId){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; openRecipientPicker({ title:'Notify which roles, users & contacts?', sub:'These recipients are notified when the risk threshold is met.', sink:ensureAlertNotify(s), includeClients:true, onApply:()=>{ saveForm(); renderScoringModal(); renderPreviewIfNeeded(); } }); }
function openCritNotifyPicker(sectionId,i){ const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return; const n=ensureCritNotify(s,i); if(!n) return; openRecipientPicker({ title:'Notify which roles, users & contacts?', sub:'These recipients are notified when this critical answer is given.', sink:n, includeClients:true, onApply:()=>{ saveForm(); renderScoringModal(); renderPreviewIfNeeded(); } }); }
/* Compact recipients block shared by the Risk alert and each Critical item. */
function alertNotifyHTML(s, kind, idx){
  const n = kind==='crit' ? ((s.alert&&s.alert.critical[idx]&&s.alert.critical[idx].notify)||{}) : ((s.alert&&s.alert.notify)||{});
  const chips=recipientChips(n.roles,n.userIds,n.patient,n.clientIds);
  const chCall = kind==='crit' ? `setCritNotify('${s.id}',${idx},` : `setAlertNotify('${s.id}',`;
  const pick = kind==='crit' ? `openCritNotifyPicker('${s.id}',${idx})` : `openAlertNotifyPicker('${s.id}')`;
  return `<div class="alert-notify">
    <div class="acc-sub">🔔 Notify when this fires</div>
    <div class="acc-row">
      <label class="acc-check inline"><input type="checkbox" ${n.sms?'checked':''} onchange="${chCall}'sms',this.checked)"> SMS</label>
      <label class="acc-check inline"><input type="checkbox" ${n.email?'checked':''} onchange="${chCall}'email',this.checked)"> Email</label>
    </div>
    <label class="acc-check"><input type="checkbox" ${n.patient?'checked':''} onchange="${chCall}'patient',this.checked)"> Notify the patient/contact who submitted</label>
    <div class="acc-chips">${chips.length?chips.map(c=>`<span class="acc-chip">${esc(c)}</span>`).join(''):'<span class="acc-none">No recipients yet</span>'}</div>
    <button class="btn" style="width:100%" onclick="${pick}">Choose roles, users &amp; contacts…</button>
    ${(n.sms||n.email)?'':'<p class="acc-hint" style="margin-top:5px">Pick a channel above to enable delivery.</p>'}
  </div>`;
}
function criticalItemsHTML(s){
  const al=s.alert||{}; const crit=al.critical||[];
  const fieldOpts=(fid)=>s.fieldIds.map(id=>{const f=findFieldById(id);return f?`<option value="${id}"${id===fid?' selected':''}>${esc(f.label||id)}</option>`:'';}).join('');
  let h=`<div class="ssc-subhead" style="margin-top:13px">Critical-item notifications <span style="font-weight:400;color:var(--text-muted)">(fire on a specific answer, regardless of total)</span></div>`;
  crit.forEach((c,i)=>{
    const f=findFieldById(c.fieldId);
    let opts;
    if(f && f.type==='toggle'){
      const _tog=[[0,(f.toggleOn!=null?f.toggleOn:'Yes')+' (On)'],[1,(f.toggleOff!=null?f.toggleOff:'No')+' (Off)']];
      opts=_tog.map(([oi,lbl])=>`<label style="display:inline-flex;align-items:center;gap:4px;font-size:11.5px;margin:0 9px 4px 0"><input type="checkbox" ${(c.options||[]).map(Number).indexOf(oi)>=0?'checked':''} onchange="toggleCriticalOption('${s.id}',${i},${oi},this.checked)"> ${esc(lbl)}</label>`).join('');
    } else if(f && f.options){
      opts=f.options.map((o,oi)=>`<label style="display:inline-flex;align-items:center;gap:4px;font-size:11.5px;margin:0 9px 4px 0"><input type="checkbox" ${(c.options||[]).map(Number).indexOf(oi)>=0?'checked':''} onchange="toggleCriticalOption('${s.id}',${i},${oi},this.checked)"> ${esc(o)}</label>`).join('');
    } else {
      opts='<span style="font-size:11.5px;color:var(--text-muted)">Choose a scored question first.</span>';
    }
    h+=`<div style="border:1px solid var(--border);border-radius:8px;padding:9px;margin-top:6px">
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px">
        <select class="enhance-dd" style="flex:1;font-size:12px;padding:5px 7px;border:1px solid var(--border);border-radius:6px" onchange="setCriticalField('${s.id}',${i},this.value)"><option value="">— Question —</option>${fieldOpts(c.fieldId)}</select>
        <button class="btn" style="padding:4px 9px;font-size:11.5px" onclick="removeCriticalItem('${s.id}',${i})">Remove</button>
      </div>
      <div style="margin-bottom:6px">Fire when answered: ${opts}</div>
      <input type="text" value="${esc(c.msg||'')}" placeholder="Notification message (e.g. Item positive — assess risk now)" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font:inherit;font-size:12px" onchange="setCriticalMsg('${s.id}',${i},this.value)">
      ${alertNotifyHTML(s,'crit',i)}
    </div>`;
  });
  h+=`<button class="btn" style="margin-top:7px;font-size:12px" onclick="addCriticalItem('${s.id}')">+ Add critical item</button>`;
  return h;
}

/* ============================================================
   VALIDATED-INSTRUMENT LIBRARY — one-click insert of standard
   screeners (items, point values, severity bands, alerts prewired).
   ============================================================ */
const _SC_PHQ={options:['Not at all','Several days','More than half the days','Nearly every day'],scores:[0,1,2,3]};
const _SC_PCL={options:['Not at all','A little bit','Moderately','Quite a bit','Extremely'],scores:[0,1,2,3,4]};
const _SC_YN={options:['Yes','No'],scores:[1,0]};
const _SC_FREQ={options:['Never','Less than monthly','Monthly','Weekly','Daily or almost daily'],scores:[0,1,2,3,4]};
const INSTRUMENTS=[
  {key:'phq9',name:'PHQ-9',desc:'Depression severity · 9 items · 0–27',scale:_SC_PHQ,stem:'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
   items:['Little interest or pleasure in doing things','Feeling down, depressed, or hopeless','Trouble falling or staying asleep, or sleeping too much','Feeling tired or having little energy','Poor appetite or overeating','Feeling bad about yourself — or that you are a failure or have let yourself or your family down','Trouble concentrating on things, such as reading the newspaper or watching television','Moving or speaking so slowly that other people could have noticed; or being so fidgety or restless that you have been moving around a lot more than usual','Thoughts that you would be better off dead, or of hurting yourself in some way'],
   bands:[{min:0,max:4,label:'Minimal',severity:'low'},{min:5,max:9,label:'Mild',severity:'mild'},{min:10,max:14,label:'Moderate',severity:'mod'},{min:15,max:19,label:'Moderately severe',severity:'high'},{min:20,max:27,label:'Severe',severity:'high'}],
   critical:[{itemIndex:8,options:[1,2,3],msg:'PHQ-9 item 9 positive (thoughts of self-harm) — assess suicide risk now.'}]},
  {key:'gad7',name:'GAD-7',desc:'Anxiety severity · 7 items · 0–21',scale:_SC_PHQ,stem:'Over the last 2 weeks, how often have you been bothered by the following problems?',
   items:['Feeling nervous, anxious, or on edge','Not being able to stop or control worrying','Worrying too much about different things','Trouble relaxing','Being so restless that it is hard to sit still','Becoming easily annoyed or irritable','Feeling afraid, as if something awful might happen'],
   bands:[{min:0,max:4,label:'Minimal',severity:'low'},{min:5,max:9,label:'Mild',severity:'mild'},{min:10,max:14,label:'Moderate',severity:'mod'},{min:15,max:21,label:'Severe',severity:'high'}]},
  {key:'pcl5',name:'PCL-5',desc:'PTSD symptoms · 20 items · 0–80',scale:_SC_PCL,stem:'Below is a list of problems that people sometimes have in response to a very stressful experience. Please read each problem carefully, then indicate how much you have been bothered by that problem in the past month.',
   items:['Repeated, disturbing, and unwanted memories of the stressful experience','Repeated, disturbing dreams of the stressful experience','Suddenly feeling or acting as if the stressful experience were actually happening again','Feeling very upset when something reminded you of the stressful experience','Having strong physical reactions when something reminded you of the stressful experience','Avoiding memories, thoughts, or feelings related to the stressful experience','Avoiding external reminders of the stressful experience','Trouble remembering important parts of the stressful experience','Having strong negative beliefs about yourself, other people, or the world','Blaming yourself or someone else for the stressful experience or what happened after it','Having strong negative feelings such as fear, horror, anger, guilt, or shame','Loss of interest in activities that you used to enjoy','Feeling distant or cut off from other people','Trouble experiencing positive feelings','Irritable behavior, angry outbursts, or acting aggressively','Taking too many risks or doing things that could cause you harm','Being superalert or watchful or on guard','Feeling jumpy or easily startled','Having difficulty concentrating','Trouble falling or staying asleep'],
   bands:[{min:0,max:30,label:'Below provisional threshold',severity:'low'},{min:31,max:80,label:'Probable PTSD',severity:'high'}]},
  {key:'audit',name:'AUDIT',desc:'Alcohol use disorder · 10 items · 0–40',stem:'Because alcohol use can affect your health and can interfere with certain medications and treatments, it is important that we ask some questions about your use of alcohol. Please answer as honestly as you can.',
   items:[
    {q:'How often do you have a drink containing alcohol?',options:['Never','Monthly or less','2–4 times a month','2–3 times a week','4 or more times a week'],scores:[0,1,2,3,4]},
    {q:'How many drinks containing alcohol do you have on a typical day when you are drinking?',options:['1 or 2','3 or 4','5 or 6','7 to 9','10 or more'],scores:[0,1,2,3,4]},
    {q:'How often do you have six or more drinks on one occasion?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'How often during the last year have you found that you were not able to stop drinking once you had started?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'How often during the last year have you failed to do what was normally expected of you because of drinking?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'How often during the last year have you had a feeling of guilt or remorse after drinking?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'How often during the last year have you been unable to remember what happened the night before because of your drinking?',options:_SC_FREQ.options,scores:_SC_FREQ.scores},
    {q:'Have you or someone else been injured because of your drinking?',options:['No','Yes, but not in the last year','Yes, during the last year'],scores:[0,2,4]},
    {q:'Has a relative, friend, doctor, or other health worker been concerned about your drinking or suggested you cut down?',options:['No','Yes, but not in the last year','Yes, during the last year'],scores:[0,2,4]}
   ],
   bands:[{min:0,max:7,label:'Low risk',severity:'low'},{min:8,max:15,label:'Hazardous',severity:'mild'},{min:16,max:19,label:'Harmful',severity:'mod'},{min:20,max:40,label:'Possible dependence',severity:'high'}]},
  {key:'dast10',name:'DAST-10',desc:'Drug use · 10 items · 0–10',scale:_SC_YN,stem:'The following questions concern information about your involvement with drugs, not including alcoholic beverages, during the past 12 months. Please answer every question by selecting Yes or No.',
   items:['Have you used drugs other than those required for medical reasons?','Do you abuse more than one drug at a time?',{q:'Are you always able to stop using drugs when you want to?',options:['Yes','No'],scores:[0,1]},'Have you had blackouts or flashbacks as a result of drug use?','Do you ever feel bad or guilty about your drug use?','Does your spouse (or parents) ever complain about your involvement with drugs?','Have you neglected your family because of your use of drugs?','Have you engaged in illegal activities in order to obtain drugs?','Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?','Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions, bleeding)?'],
   bands:[{min:0,max:0,label:'No problems reported',severity:'low'},{min:1,max:2,label:'Low level',severity:'mild'},{min:3,max:5,label:'Moderate level',severity:'mod'},{min:6,max:8,label:'Substantial level',severity:'high'},{min:9,max:10,label:'Severe level',severity:'high'}]},
  {key:'cssrs',name:'C-SSRS (Screener)',desc:'Suicide risk · 6 items · item-flagged',scale:_SC_YN,stem:'Please answer each of the following questions honestly.',
   items:['Have you wished you were dead or wished you could go to sleep and not wake up?','Have you actually had any thoughts of killing yourself?','Have you been thinking about how you might do this?','Have you had these thoughts and had some intention of acting on them?','Have you started to work out or worked out the details of how to kill yourself, and did you intend to carry out this plan?','Have you ever done anything, started to do anything, or prepared to do anything to end your life?'],
   bands:[{min:0,max:0,label:'No items endorsed',severity:'low'},{min:1,max:6,label:'Positive screen — assess risk',severity:'high'}],
   critical:[
     {itemIndex:3,options:[0],msg:'C-SSRS: active ideation with some intent (item 4 “Yes”) — initiate suicide-safety protocol now.'},
     {itemIndex:4,options:[0],msg:'C-SSRS: ideation with plan and intent (item 5 “Yes”) — high acute risk; do not leave the patient alone.'},
     {itemIndex:5,options:[0],msg:'C-SSRS: suicidal behavior reported (item 6 “Yes”) — escalate immediately.'}
   ]}
];

/* ============================================================
   COMPOSITE TEMPLATE INSERT — supports any field type (headings,
   text, date, select, checkboxes, paragraph, signature, scored
   radios, etc.). Used by intake/assessment/consent templates and
   by the newer screeners that need lead-in or sub-section content.
   ============================================================ */
function insertCompositeTemplate(inst){
  ensureScoringInit();
  const page=(typeof BUILDER_PAGE!=='undefined')?BUILDER_PAGE:1;
  const scoredIds=[];
  (inst.rows||[]).forEach(function(rowSpec){
    const fields=rowSpec.map(function(spec){
      const type=spec.type||'text';
      const f=defaultField(type,{label:(spec.label!=null?spec.label:''),span:(spec.span||defaultSpanFor(type)),required:!!spec.required});
      if(spec.ph!=null) f.placeholder=spec.ph;
      if(spec.help!=null) f.help=spec.help;
      if(spec.options) f.options=spec.options.slice();
      if(spec.optionScores) f.optionScores=spec.optionScores.slice();
      if(spec.optionLayout) f.optionLayout=spec.optionLayout;
      if(spec.min!=null) f.min=spec.min;
      if(spec.max!=null) f.max=spec.max;
      if(spec.scored) scoredIds.push(f.id);
      return f;
    });
    FORM.rows.push({id:uid('r'),page:page,fields:fields});
  });
  if(inst.score && scoredIds.length){
    const sc=inst.score;
    const section={id:uid('sect'),name:sc.name||inst.name,fieldIds:scoredIds,bands:(sc.bands||[]).map(function(b){return Object.assign({},b);})};
    if(sc.alert || sc.critical){
      section.alert={on:sc.alert?true:false,min:sc.alert?(Number(sc.alert.min)||0):0,msg:sc.alert?(sc.alert.msg||''):'',critical:[]};
      (sc.critical||[]).forEach(function(c){const fid=scoredIds[c.itemIndex];if(fid)section.alert.critical.push({fieldId:fid,options:(c.options||[]).slice(),msg:c.msg||''});});
    }
    FORM.scoringSections.push(section);
  }
  if(typeof render==='function') render();
  if(typeof renderScoringModal==='function') renderScoringModal();
  if(typeof renderPreviewIfNeeded==='function') renderPreviewIfNeeded();
  if(typeof closeModal==='function') closeModal('instruments-modal');
  if(typeof toast==='function') toast((inst.name||'Template')+' inserted — '+FORM.rows.length+' rows');
}

/* Reusable consent/signature blocks (kept editable after insert). */
const _YN=[`Yes`,`No`];

INSTRUMENTS.push(
  /* ===================== SCREENERS ===================== */
  {key:`ace`,name:`ACE Questionnaire`,group:`screener`,desc:`Adverse Childhood Experiences · 10 yes/no items · 0–10 · free/public domain`,
   rows:[
    [{type:`heading`,label:`Adverse Childhood Experiences (ACE) Questionnaire`}],
    [{type:`paragraph`,label:`The following questions are about events that happened during your childhood. Your answers help us understand experiences that can affect health and wellbeing. While you were growing up, during your first 18 years of life:`}],
    [{type:`radio`,label:`Did a parent or other adult in the household often swear at you, insult you, put you down, or humiliate you — or act in a way that made you afraid you might be physically hurt?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did a parent or other adult in the household often push, grab, slap, or throw something at you — or ever hit you so hard that you had marks or were injured?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did an adult or person at least 5 years older than you ever touch or fondle you in a sexual way, have you touch their body sexually, or attempt/have oral, anal, or vaginal sex with you?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did you often feel that no one in your family loved you or thought you were important — or that your family did not look out for, feel close to, or support each other?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did you often feel that you did not have enough to eat, had to wear dirty clothes, and had no one to protect you — or that your parents were too drunk or high to care for you or take you to the doctor?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Were your parents ever separated or divorced?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Was a parent or caregiver often physically hurt (pushed, grabbed, slapped, kicked, bitten, hit, or threatened with a weapon) by another adult?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did you live with anyone who was a problem drinker or alcoholic, or who used street drugs?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Was a household member depressed or mentally ill, or did a household member attempt suicide?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`radio`,label:`Did a household member go to prison?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,required:true,scored:true}],
    [{type:`paragraph`,label:`Each "Yes" = 1 point (total 0–10). A higher score is associated with greater risk for health and behavioral concerns. Public domain (Felitti, Anda, et al., CDC–Kaiser ACE Study).`}]
   ],
   score:{name:`ACE Score`,bands:[{min:0,max:0,label:`No ACEs reported`,severity:`low`},{min:1,max:3,label:`1–3 ACEs`,severity:`mild`},{min:4,max:10,label:`4+ ACEs — elevated risk`,severity:`high`}],alert:{min:4,msg:`ACE score ≥4 — elevated risk; consider trauma-informed assessment and supports.`}}},

  {key:`pcptsd5`,name:`PC-PTSD-5`,group:`screener`,desc:`PTSD screen (primary care) · 5 yes/no items · 0–5 · positive ≥3 · public domain (VA)`,
   rows:[
    [{type:`heading`,label:`Primary Care PTSD Screen for DSM-5 (PC-PTSD-5)`}],
    [{type:`paragraph`,label:`Sometimes things happen to people that are unusually or especially frightening, horrible, or traumatic — for example: a serious accident or fire; a physical or sexual assault or abuse; an earthquake or flood; a war; seeing someone be killed or seriously injured; or having a loved one die through homicide or suicide.`}],
    [{type:`radio`,label:`Have you ever experienced this kind of event?`,options:_YN,optionLayout:`horizontal`,required:true,help:`If "No," you may stop here (score 0). If "Yes," please answer the 5 questions below about the past month.`}],
    [{type:`radio`,label:`In the past month, have you had nightmares about the event(s) or thought about the event(s) when you did not want to?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`In the past month, have you tried hard not to think about the event(s) or gone out of your way to avoid situations that reminded you of the event(s)?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`In the past month, have you been constantly on guard, watchful, or easily startled?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`In the past month, have you felt numb or detached from people, activities, or your surroundings?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`In the past month, have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`paragraph`,label:`Score = number of "Yes" answers to the 5 symptom items (0–5). A score of 3 or more is a positive screen for probable PTSD and warrants fuller assessment (e.g., PCL-5). Public domain (VA National Center for PTSD).`}]
   ],
   score:{name:`PC-PTSD-5 Score`,bands:[{min:0,max:2,label:`Negative screen`,severity:`low`},{min:3,max:5,label:`Positive screen — probable PTSD`,severity:`high`}],alert:{min:3,msg:`PC-PTSD-5 ≥3 — positive screen for probable PTSD; conduct fuller assessment and assess safety.`}}},

  {key:`crafft`,name:`CRAFFT 2.1`,group:`screener`,desc:`Adolescent substance use · Part A (use) + 6 yes/no (Part B) · positive ≥2`,
   rows:[
    [{type:`heading`,label:`CRAFFT 2.1 — Adolescent Substance Use Screen`}],
    [{type:`paragraph`,label:`During the PAST 12 MONTHS, on how many days did you... (enter a number; put 0 if none)`}],
    [{type:`number`,label:`Drink more than a few sips of beer, wine, or any drink containing alcohol?`,min:0,help:`# of days`}],
    [{type:`number`,label:`Use any marijuana (weed, oil, wax, vaping, or edibles) or "synthetic marijuana" (such as "K2" or "Spice")?`,min:0,help:`# of days`}],
    [{type:`number`,label:`Use anything else to get high (other illegal drugs, prescription or over-the-counter medications, or things you sniff, huff, vape, or inject)?`,min:0,help:`# of days`}],
    [{type:`paragraph`,label:`Part B — please answer Yes or No. (If all Part A answers were 0, answer only the first "CAR" question below.)`}],
    [{type:`radio`,label:`C — Have you ever ridden in a CAR driven by someone (including yourself) who was "high" or had been using alcohol or drugs?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`R — Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`A — Do you ever use alcohol or drugs while you are by yourself, or ALONE?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`F — Do you ever FORGET things you did while using alcohol or drugs?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`F — Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`radio`,label:`T — Have you ever gotten into TROUBLE while you were using alcohol or drugs?`,options:_YN,optionScores:[1,0],optionLayout:`horizontal`,scored:true}],
    [{type:`paragraph`,label:`Score = "Yes" answers in Part B (0–6). A total of 2 or higher is a positive screen indicating a need for further assessment. © John R. Knight, MD, Boston Children's Hospital, 2018. Reproduced with permission. Keep all items in their original order without changes; submit your reproduction to crafft@childrens.harvard.edu. Responses may be protected under 42 CFR Part 2.`}]
   ],
   score:{name:`CRAFFT Score (Part B)`,bands:[{min:0,max:1,label:`Lower risk`,severity:`low`},{min:2,max:6,label:`High risk — assessment indicated`,severity:`high`}],alert:{min:2,msg:`CRAFFT ≥2 — high risk for a substance use disorder; conduct further assessment.`}}},

  {key:`psc17`,name:`PSC-17 (Pediatric Symptom Checklist)`,group:`screener`,desc:`Child psychosocial screen · caregiver-rated · 17 items · 0–34 · Total ≥15; Internalizing ≥5, Attention ≥7, Externalizing ≥7`,
   rows:[
    [{type:`heading`,label:`Pediatric Symptom Checklist-17 (PSC-17)`}],
    [{type:`paragraph`,label:`Please mark how often each statement describes your child. Caregiver-completed; appropriate for children roughly ages 4–15.`}],
    [{type:`radio`,label:`Fidgety, unable to sit still`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`att`}],
    [{type:`radio`,label:`Feels sad, unhappy`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`int`}],
    [{type:`radio`,label:`Daydreams too much`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`att`}],
    [{type:`radio`,label:`Refuses to share`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Does not understand other people's feelings`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Feels hopeless`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`int`}],
    [{type:`radio`,label:`Has trouble concentrating`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`att`}],
    [{type:`radio`,label:`Fights with other children`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Is down on himself or herself`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`int`}],
    [{type:`radio`,label:`Blames others for his or her troubles`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Seems to be having less fun`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`int`}],
    [{type:`radio`,label:`Does not listen to rules`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Acts as if driven by a motor`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`att`}],
    [{type:`radio`,label:`Teases others`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Worries a lot`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`int`}],
    [{type:`radio`,label:`Takes things that do not belong to him or her`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`ext`}],
    [{type:`radio`,label:`Distracted easily`,options:[`Never`,`Sometimes`,`Often`],optionScores:[0,1,2],optionLayout:`horizontal`,scored:true,sub:`att`}],
    [{type:`paragraph`,label:`Scoring: Never=0, Sometimes=1, Often=2. Total ≥15 suggests significant difficulties needing further assessment. Subscale cutoffs: Internalizing ≥5, Attention ≥7, Externalizing ≥7. A positive score is a signal for further evaluation, not a diagnosis. ©1988 M. Jellinek & J.M. Murphy, Massachusetts General Hospital; PSC-17 subscales by W. Gardner et al. (1999).`}]
   ],
   scores:[
    {name:`PSC-17 Total`,all:true,scoreKey:`psc17_total`,bands:[{min:0,max:14,label:`Below cutoff`,severity:`low`},{min:15,max:34,label:`At risk — further assessment`,severity:`high`}],alert:{min:15,msg:`PSC-17 total ≥15 — positive screen; arrange comprehensive psychosocial assessment.`}},
    {name:`Internalizing`,sub:`int`,scoreKey:`psc17_internalizing`,bands:[{min:0,max:4,label:`Below cutoff`,severity:`low`},{min:5,max:10,label:`Elevated`,severity:`high`}],alert:{min:5,msg:`PSC-17 Internalizing ≥5 — possible anxiety/depression; consider further assessment.`}},
    {name:`Attention`,sub:`att`,scoreKey:`psc17_attention`,bands:[{min:0,max:6,label:`Below cutoff`,severity:`low`},{min:7,max:10,label:`Elevated`,severity:`high`}],alert:{min:7,msg:`PSC-17 Attention ≥7 — possible attention problems; consider further assessment.`}},
    {name:`Externalizing`,sub:`ext`,scoreKey:`psc17_externalizing`,bands:[{min:0,max:6,label:`Below cutoff`,severity:`low`},{min:7,max:14,label:`Elevated`,severity:`high`}],alert:{min:7,msg:`PSC-17 Externalizing ≥7 — possible conduct problems; consider further assessment.`}}
   ]},

  /* ===================== INTAKE / ASSESSMENT / CONSENT TEMPLATES ===================== */
  {key:`intake`,name:`Onboarding Packet / Patient Intake`,group:`template`,desc:`Demographics, contact, insurance, emergency contact, medications + 5 bundled core consents`,
   rows:[
    [{type:`heading`,label:`Patient Intake & Onboarding Packet`}],
    [{type:`paragraph`,label:`Welcome to [Agency Name]. Please complete the information below. Fields marked * are required. You can ask a staff member for help at any time.`}],
    [{type:`heading`,label:`Patient Information`}],
    [{type:`text`,label:`First name`,span:6,required:true},{type:`text`,label:`Last name`,span:6,required:true}],
    [{type:`text`,label:`Preferred name`,span:6},{type:`date`,label:`Date of birth`,span:6,required:true}],
    [{type:`select`,label:`Sex assigned at birth`,options:[`Female`,`Male`,`Intersex`,`Prefer not to say`],span:6},{type:`text`,label:`Gender identity`,span:6}],
    [{type:`text`,label:`Pronouns`,span:6},{type:`text`,label:`Preferred language`,span:6}],
    [{type:`text`,label:`Race / ethnicity (optional)`,span:12}],
    [{type:`heading`,label:`Contact Information`}],
    [{type:`text`,label:`Street address`,span:12}],
    [{type:`text`,label:`City`,span:4},{type:`text`,label:`State`,span:4},{type:`text`,label:`ZIP`,span:4}],
    [{type:`phone`,label:`Mobile phone`,span:6,required:true},{type:`email`,label:`Email`,span:6}],
    [{type:`select`,label:`Preferred contact method`,options:[`Phone call`,`Text message`,`Email`],span:6},{type:`radio`,label:`OK to leave a voicemail?`,options:_YN,optionLayout:`horizontal`,span:6}],
    [{type:`heading`,label:`Emergency Contact`}],
    [{type:`text`,label:`Emergency contact name`,span:6,required:true},{type:`text`,label:`Relationship to you`,span:6}],
    [{type:`phone`,label:`Emergency contact phone`,span:6,required:true}],
    [{type:`heading`,label:`Insurance`}],
    [{type:`text`,label:`Insurance carrier`,span:6},{type:`text`,label:`Member ID`,span:6}],
    [{type:`text`,label:`Group number`,span:6},{type:`text`,label:`Policy subscriber name`,span:6}],
    [{type:`date`,label:`Subscriber date of birth`,span:6}],
    [{type:`heading`,label:`Current Medications & Allergies`}],
    [{type:`textarea`,label:`Current medications and dosages (include over-the-counter and supplements)`}],
    [{type:`textarea`,label:`Allergies (medications, foods, other)`}],
    [{type:`textarea`,label:`Current treating providers (name, specialty, contact)`}],
    [{type:`heading`,label:`Consent for Treatment`}],
    [{type:`paragraph`,label:`I voluntarily consent to receive mental health and/or substance use assessment and treatment from [Agency Name] and its clinicians. I understand that treatment may include assessment, counseling, and coordination of care; that results cannot be guaranteed; and that I may ask questions or withdraw consent at any time, subject to applicable law.`}],
    [{type:`checkbox`,label:`I have read and consent to treatment.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`heading`,label:`Telehealth Informed Consent`}],
    [{type:`paragraph`,label:`I consent to receive services via telehealth (live video/phone). I understand the benefits and risks, including possible technical limitations and privacy considerations; that I may stop telehealth at any time; and that in an emergency I should call 911 or the 988 Suicide & Crisis Lifeline. [Agency Name] will tell me about alternatives if telehealth is not appropriate.`}],
    [{type:`checkbox`,label:`I have read and consent to telehealth services.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`heading`,label:`Notice of Privacy Practices (HIPAA) — Acknowledgment`}],
    [{type:`paragraph`,label:`I acknowledge that I have been offered a copy of [Agency Name]'s Notice of Privacy Practices, which describes how my health information may be used and disclosed and my rights regarding that information.`}],
    [{type:`checkbox`,label:`I acknowledge receipt of the Notice of Privacy Practices.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`heading`,label:`Authorization to Disclose Information (ROI)`}],
    [{type:`paragraph`,label:`I authorize [Agency Name] to use or disclose my health information as described below. This authorization is voluntary; I may revoke it in writing at any time (except for actions already taken).`}],
    [{type:`text`,label:`Disclose to (name / organization)`,span:6},{type:`text`,label:`Phone / address`,span:6}],
    [{type:`checkboxes`,label:`Information to disclose`,options:[`Assessment / intake`,`Treatment notes`,`Medications`,`Discharge / aftercare summary`,`Other (specify in purpose)`]}],
    [{type:`text`,label:`Purpose of disclosure`,span:8},{type:`date`,label:`This authorization expires on`,span:4}],
    [{type:`checkbox`,label:`I authorize the disclosure described above.`}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6},{type:`date`,label:`Date`,span:6}],
    [{type:`heading`,label:`42 CFR Part 2 Consent (Substance Use Records)`}],
    [{type:`paragraph`,label:`Some of my records may be protected by federal confidentiality rules (42 CFR Part 2), which generally prohibit disclosure of substance use disorder records without my specific written consent. A general medical release is not sufficient. I authorize the specific disclosure below and understand I may revoke it in writing (except for actions already taken).`}],
    [{type:`text`,label:`Disclose Part 2 records to (name / organization)`,span:6},{type:`text`,label:`Amount / kind of information`,span:6}],
    [{type:`text`,label:`Purpose of disclosure`,span:8},{type:`date`,label:`Expires on (date or event)`,span:4}],
    [{type:`checkbox`,label:`I consent to the disclosure of Part 2-protected records described above.`}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6},{type:`date`,label:`Date`,span:6}],
    [{type:`paragraph`,label:`Note for [Agency Name]: these consent texts are editable starting points and should be reviewed by your compliance officer or legal counsel before use.`}]
   ]},

  {key:`biopsych`,name:`Biopsychosocial Assessment (Patient Self-Report)`,group:`template`,desc:`Patient-completed history: presenting concerns, MH/SUD, medical, family, social, strengths, goals`,
   rows:[
    [{type:`heading`,label:`Biopsychosocial Self-Report`}],
    [{type:`paragraph`,label:`Please share as much as you are comfortable with. Your answers help your clinician understand your needs. You can skip anything you would rather discuss in person.`}],
    [{type:`heading`,label:`Presenting Concerns`}],
    [{type:`textarea`,label:`What brings you in today? What would you like help with?`}],
    [{type:`text`,label:`When did these concerns begin?`,span:6},{type:`select`,label:`How would you rate their current impact?`,options:[`Mild`,`Moderate`,`Severe`],span:6}],
    [{type:`textarea`,label:`How are these concerns affecting your daily life (work, school, relationships, sleep)?`}],
    [{type:`heading`,label:`Mental Health History`}],
    [{type:`radio`,label:`Have you received mental health treatment before?`,options:_YN,optionLayout:`horizontal`,span:12}],
    [{type:`textarea`,label:`If yes, please describe (when, where, what helped or did not)`}],
    [{type:`radio`,label:`Any prior psychiatric hospitalizations?`,options:_YN,optionLayout:`horizontal`,span:12}],
    [{type:`textarea`,label:`Any current or past mental health diagnoses you are aware of`}],
    [{type:`heading`,label:`Safety`}],
    [{type:`radio`,label:`Are you currently having thoughts of harming yourself or others?`,options:_YN,optionLayout:`horizontal`,span:12,help:`If yes, please tell a staff member now. If you are in crisis, call or text 988.`}],
    [{type:`heading`,label:`Substance Use`}],
    [{type:`radio`,label:`Do you currently use alcohol, tobacco/nicotine, or other drugs?`,options:_YN,optionLayout:`horizontal`,span:12}],
    [{type:`textarea`,label:`If yes, please describe what you use, how often, and when you last used`}],
    [{type:`heading`,label:`Medical History`}],
    [{type:`textarea`,label:`Current medical conditions`}],
    [{type:`textarea`,label:`Current medications and dosages`}],
    [{type:`text`,label:`Allergies`,span:6},{type:`text`,label:`Primary care provider`,span:6}],
    [{type:`heading`,label:`Family History`}],
    [{type:`textarea`,label:`Any family history of mental health or substance use concerns?`}],
    [{type:`heading`,label:`Social & Developmental`}],
    [{type:`text`,label:`Who do you currently live with?`,span:6},{type:`select`,label:`Relationship status`,options:[`Single`,`Partnered`,`Married`,`Separated`,`Divorced`,`Widowed`],span:6}],
    [{type:`text`,label:`Children / dependents`,span:6},{type:`select`,label:`Employment status`,options:[`Employed full-time`,`Employed part-time`,`Student`,`Unemployed`,`Retired`,`Unable to work`],span:6}],
    [{type:`select`,label:`Highest level of education`,options:[`Some school`,`High school / GED`,`Some college`,`College degree`,`Graduate degree`],span:6},{type:`radio`,label:`Any current or past legal issues?`,options:_YN,optionLayout:`horizontal`,span:6}],
    [{type:`radio`,label:`Have you served in the military?`,options:_YN,optionLayout:`horizontal`,span:6},{type:`text`,label:`Religious / spiritual beliefs important to your care (optional)`,span:6}],
    [{type:`heading`,label:`Strengths & Goals`}],
    [{type:`textarea`,label:`What are your strengths, supports, and things that help you cope?`}],
    [{type:`textarea`,label:`What are your goals for treatment?`}],
    [{type:`paragraph`,label:`Note for [Agency Name]: mental status exam, risk formulation, diagnosis, and clinical summary are completed by the clinician; add those as a separate clinician-facing section if desired.`}]
   ]},

  {key:`consent_treatment`,name:`Informed Consent for Treatment`,group:`template`,desc:`Standalone consent-to-treat with signature`,
   rows:[
    [{type:`heading`,label:`Informed Consent for Treatment`}],
    [{type:`paragraph`,label:`I voluntarily consent to receive mental health and/or substance use assessment and treatment from [Agency Name] and its clinicians. I understand the nature and purpose of services, potential benefits and risks, and reasonable alternatives. I understand outcomes cannot be guaranteed, that I may ask questions at any time, and that I may withdraw consent subject to applicable law.`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of birth`,span:6}],
    [{type:`checkbox`,label:`I have read, understand, and consent to treatment.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`text`,label:`Clinician / witness name`,span:6},{type:`signature`,label:`Clinician / witness signature`,span:6}],
    [{type:`paragraph`,label:`Note for [Agency Name]: review with legal counsel before use.`}]
   ]},

  {key:`consent_telehealth`,name:`Telehealth Informed Consent`,group:`template`,desc:`Standalone telehealth consent with signature`,
   rows:[
    [{type:`heading`,label:`Telehealth Informed Consent`}],
    [{type:`paragraph`,label:`I consent to receive services from [Agency Name] via telehealth (live video and/or phone). I understand the benefits (such as convenience and access) and risks (such as technical disruptions and privacy limitations); that the same confidentiality protections apply as for in-person care; that I may stop telehealth at any time; and that in an emergency I should call 911 or the 988 Suicide & Crisis Lifeline. My clinician will discuss alternatives if telehealth is not clinically appropriate.`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`text`,label:`Location during telehealth sessions`,span:6}],
    [{type:`checkbox`,label:`I have read, understand, and consent to telehealth services.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`paragraph`,label:`Note for [Agency Name]: confirm your state's telehealth consent requirements with legal counsel.`}]
   ]},

  {key:`hipaa_npp`,name:`HIPAA Notice of Privacy Practices — Acknowledgment`,group:`template`,desc:`Standalone NPP acknowledgment`,
   rows:[
    [{type:`heading`,label:`Acknowledgment of Notice of Privacy Practices`}],
    [{type:`paragraph`,label:`I acknowledge that [Agency Name] has provided or offered me a copy of its Notice of Privacy Practices, which describes how my protected health information may be used and disclosed and my rights with respect to that information. I understand the Notice may be updated and that a current copy is available on request.`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of birth`,span:6}],
    [{type:`checkbox`,label:`I acknowledge receipt of the Notice of Privacy Practices.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`text`,label:`If unable to obtain acknowledgment, staff describe good-faith effort:`,span:12}]
   ]},

  {key:`roi`,name:`Authorization to Disclose Information (ROI)`,group:`template`,desc:`Standalone HIPAA release of information`,
   rows:[
    [{type:`heading`,label:`Authorization to Use or Disclose Health Information`}],
    [{type:`paragraph`,label:`I authorize [Agency Name] to use or disclose my health information as described below. I understand this authorization is voluntary, that I may refuse to sign, and that I may revoke it in writing at any time except to the extent action has already been taken. Information disclosed may be re-disclosed by the recipient and may no longer be protected.`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of birth`,span:6}],
    [{type:`text`,label:`Disclose to (name / organization)`,span:6},{type:`text`,label:`Recipient phone / address`,span:6}],
    [{type:`checkboxes`,label:`Information to be disclosed`,options:[`Assessment / intake`,`Treatment notes`,`Medications`,`Lab / screening results`,`Discharge / aftercare summary`,`Other (specify below)`]}],
    [{type:`text`,label:`Purpose of disclosure`,span:8},{type:`date`,label:`Authorization expires on`,span:4}],
    [{type:`checkbox`,label:`I authorize the disclosure described above.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`paragraph`,label:`Note: substance use disorder records protected by 42 CFR Part 2 require the separate Part 2 consent.`}]
   ]},

  {key:`part2_consent`,name:`42 CFR Part 2 Consent (SUD Records)`,group:`template`,desc:`Standalone substance-use confidentiality consent`,
   rows:[
    [{type:`heading`,label:`Consent for Disclosure of Substance Use Disorder Records (42 CFR Part 2)`}],
    [{type:`paragraph`,label:`My substance use disorder records are protected under federal regulations (42 CFR Part 2) and generally cannot be disclosed without my specific written consent. A general authorization for the release of medical information is NOT sufficient. By signing below, I authorize the specific disclosure described. I may revoke this consent in writing at any time except to the extent action has already been taken.`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of birth`,span:6}],
    [{type:`text`,label:`Disclose to (name / organization)`,span:6},{type:`text`,label:`Amount and kind of information to disclose`,span:6}],
    [{type:`text`,label:`Purpose / need for the disclosure`,span:8},{type:`text`,label:`Expires on (date, event, or condition)`,span:4}],
    [{type:`paragraph`,label:`Prohibition on re-disclosure: This information has been disclosed from records protected by federal confidentiality rules (42 CFR Part 2). The rules prohibit further disclosure unless permitted by the patient's written consent or otherwise allowed by 42 CFR Part 2.`}],
    [{type:`checkbox`,label:`I consent to the disclosure of my Part 2-protected records as described above.`,required:true}],
    [{type:`signature`,label:`Patient / guardian signature`,span:6,required:true},{type:`date`,label:`Date`,span:6,required:true}],
    [{type:`paragraph`,label:`Note for [Agency Name]: 42 CFR Part 2 was revised to align more closely with HIPAA; confirm current requirements with your compliance officer or counsel.`}]
   ]},

  {key:`safety_plan`,name:`Safety Plan (Stanley-Brown)`,group:`template`,desc:`Collaborative 6-step suicide-prevention safety plan · pairs with C-SSRS`,
   rows:[
    [{type:`heading`,label:`Safety Plan`}],
    [{type:`paragraph`,label:`A safety plan is a list of steps and supports to use when you notice warning signs. Complete it together with your clinician and keep it somewhere easy to reach.`}],
    [{type:`heading`,label:`Step 1 — Warning signs`}],
    [{type:`textarea`,label:`Thoughts, feelings, situations, or behaviors that tell me a crisis may be developing`}],
    [{type:`heading`,label:`Step 2 — Internal coping strategies`}],
    [{type:`textarea`,label:`Things I can do on my own to take my mind off problems (without contacting another person)`}],
    [{type:`heading`,label:`Step 3 — People and places that provide distraction`}],
    [{type:`textarea`,label:`People I enjoy or healthy places I can go to take my mind off things (name + how to reach)`}],
    [{type:`heading`,label:`Step 4 — People I can ask for help`}],
    [{type:`textarea`,label:`People in my life I can reach out to for support (name + contact)`}],
    [{type:`heading`,label:`Step 5 — Professionals and agencies I can contact during a crisis`}],
    [{type:`textarea`,label:`Clinician, on-call, or local services (name + contact)`}],
    [{type:`paragraph`,label:`24/7 crisis support: call or text 988 (Suicide & Crisis Lifeline), or call 911 in an emergency.`}],
    [{type:`heading`,label:`Step 6 — Making the environment safe`}],
    [{type:`textarea`,label:`Steps I will take to make my environment safer`}],
    [{type:`text`,label:`The one thing most important to me and worth living for`,span:12}],
    [{type:`signature`,label:`Patient signature`,span:4},{type:`signature`,label:`Clinician signature`,span:4},{type:`date`,label:`Date`,span:4}],
    [{type:`paragraph`,label:`Safety Planning Intervention © Barbara Stanley & Gregory K. Brown. Free for individual clinical use with attribution.`}]
   ]}
);

/* ===== Phase 2: clinician documentation templates ===== */
INSTRUMENTS.push(
  {key:`psych_eval`,name:`Psychiatric Evaluation`,group:`clinical`,desc:`Clinician-completed initial psychiatric evaluation with MSE, risk, diagnosis, and plan`,
   rows:[
    [{type:`heading`,label:`Psychiatric Evaluation`}],
    [{type:`paragraph`,label:`Clinician-completed. [Agency Name]`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of birth`,span:6}],
    [{type:`date`,label:`Date of evaluation`,span:6},{type:`text`,label:`Evaluator (name, credentials)`,span:6}],
    [{type:`text`,label:`Referral source / reason for referral`,span:12}],
    [{type:`heading`,label:`Presenting Concerns`}],
    [{type:`textarea`,label:`Chief complaint (in the patient's words)`}],
    [{type:`textarea`,label:`History of present illness`}],
    [{type:`heading`,label:`History`}],
    [{type:`textarea`,label:`Past psychiatric history (diagnoses, hospitalizations, prior treatment, prior medications and response)`}],
    [{type:`textarea`,label:`Substance use history`}],
    [{type:`textarea`,label:`Medical history`}],
    [{type:`textarea`,label:`Current medications and dosages`}],
    [{type:`text`,label:`Allergies`,span:6},{type:`text`,label:`Primary care provider`,span:6}],
    [{type:`textarea`,label:`Family psychiatric history`}],
    [{type:`textarea`,label:`Social / developmental / occupational history`}],
    [{type:`heading`,label:`Mental Status Examination`}],
    [{type:`text`,label:`Appearance`,span:6},{type:`text`,label:`Behavior / psychomotor`,span:6}],
    [{type:`text`,label:`Speech`,span:6},{type:`text`,label:`Mood (stated)`,span:6}],
    [{type:`select`,label:`Affect`,options:[`Euthymic`,`Depressed`,`Anxious`,`Irritable`,`Labile`,`Blunted`,`Flat`,`Other`],span:6},{type:`select`,label:`Thought process`,options:[`Linear / goal-directed`,`Circumstantial`,`Tangential`,`Loose associations`,`Flight of ideas`,`Other`],span:6}],
    [{type:`textarea`,label:`Thought content (including any suicidal/homicidal ideation, delusions, obsessions)`}],
    [{type:`text`,label:`Perception (hallucinations?)`,span:6},{type:`text`,label:`Cognition / orientation`,span:6}],
    [{type:`select`,label:`Insight`,options:[`Good`,`Fair`,`Limited`,`Poor`],span:6},{type:`select`,label:`Judgment`,options:[`Good`,`Fair`,`Limited`,`Poor`],span:6}],
    [{type:`heading`,label:`Risk Assessment`}],
    [{type:`textarea`,label:`Suicide/self-harm and violence risk (ideation, intent, plan, protective factors). Pair with C-SSRS and a Safety Plan as indicated.`}],
    [{type:`heading`,label:`Assessment & Plan`}],
    [{type:`textarea`,label:`Diagnostic impression (DSM-5-TR)`}],
    [{type:`textarea`,label:`Clinical formulation`}],
    [{type:`textarea`,label:`Treatment recommendations / plan`}],
    [{type:`textarea`,label:`Medications prescribed (name, dose, frequency, rationale)`}],
    [{type:`text`,label:`Follow-up`,span:6},{type:`date`,label:`Next appointment`,span:6}],
    [{type:`signature`,label:`Evaluator signature`,span:8},{type:`date`,label:`Date`,span:4}]
   ]},

  {key:`med_mgmt`,name:`Medication Management Note`,group:`clinical`,desc:`Clinician-completed med-check / pharmacologic follow-up note`,
   rows:[
    [{type:`heading`,label:`Medication Management Note`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date of visit`,span:6}],
    [{type:`text`,label:`Provider (name, credentials)`,span:8},{type:`select`,label:`Visit type`,options:[`In person`,`Telehealth`],span:4}],
    [{type:`textarea`,label:`Interval history / response since last visit`}],
    [{type:`textarea`,label:`Current medications and dosages`}],
    [{type:`select`,label:`Adherence`,options:[`Good`,`Partial`,`Poor`],span:6},{type:`text`,label:`If partial/poor, barriers`,span:6}],
    [{type:`textarea`,label:`Side effects reported`}],
    [{type:`textarea`,label:`Target symptoms and current response`}],
    [{type:`heading`,label:`Brief Status & Risk`}],
    [{type:`text`,label:`Mood / affect`,span:6},{type:`text`,label:`Thought content`,span:6}],
    [{type:`radio`,label:`Suicidal or homicidal ideation present today?`,options:[`No`,`Yes`],optionLayout:`horizontal`,span:12,help:`If yes, complete a Crisis Risk Assessment and Safety Plan.`}],
    [{type:`textarea`,label:`Labs / monitoring (e.g., metabolic panel, medication levels) — results and orders`}],
    [{type:`heading`,label:`Assessment & Plan`}],
    [{type:`textarea`,label:`Assessment`}],
    [{type:`textarea`,label:`Plan — medication changes (start / continue / adjust / discontinue) with rationale`}],
    [{type:`date`,label:`Next appointment`,span:6}],
    [{type:`signature`,label:`Provider signature`,span:8},{type:`date`,label:`Date`,span:4}]
   ]},

  {key:`group_note`,name:`Group Progress Note`,group:`clinical`,desc:`Per-client note documenting participation in a therapy group session`,
   rows:[
    [{type:`heading`,label:`Group Progress Note`}],
    [{type:`text`,label:`Client name`,span:6},{type:`date`,label:`Date`,span:6}],
    [{type:`text`,label:`Group name / type`,span:6},{type:`text`,label:`Session #`,span:3},{type:`text`,label:`Participants present`,span:3}],
    [{type:`text`,label:`Start time`,span:4},{type:`text`,label:`End time`,span:4},{type:`text`,label:`Facilitator(s)`,span:4}],
    [{type:`textarea`,label:`Topic / curriculum focus and group interventions (modality)`}],
    [{type:`textarea`,label:`This client's participation and engagement`}],
    [{type:`text`,label:`Client presentation / mood`,span:12}],
    [{type:`textarea`,label:`Progress toward treatment plan goals`}],
    [{type:`radio`,label:`Any risk or safety concern noted?`,options:[`No`,`Yes`],optionLayout:`horizontal`,span:12,help:`If yes, document below and complete a Crisis Risk Assessment.`}],
    [{type:`textarea`,label:`Plan / focus for next session`}],
    [{type:`signature`,label:`Facilitator signature`,span:8},{type:`date`,label:`Date`,span:4}]
   ]},

  {key:`crisis_assessment`,name:`Crisis Risk Assessment`,group:`clinical`,desc:`Clinician-completed suicide/violence risk assessment with risk level and disposition`,
   rows:[
    [{type:`heading`,label:`Crisis Risk Assessment`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`text`,label:`Date / time`,span:6}],
    [{type:`text`,label:`Clinician (name, credentials)`,span:12}],
    [{type:`textarea`,label:`Reason for assessment / precipitating event`}],
    [{type:`heading`,label:`Suicide Risk`}],
    [{type:`select`,label:`Suicidal ideation`,options:[`None reported`,`Passive`,`Active without plan`,`Active with plan`],span:6},{type:`select`,label:`Intent`,options:[`None`,`Ambivalent`,`Present`],span:6}],
    [{type:`textarea`,label:`Details (onset, frequency, plan, access to means, prior attempts) — assess and document per protocol`}],
    [{type:`heading`,label:`Violence / Other Risk`}],
    [{type:`select`,label:`Homicidal / violence ideation`,options:[`None reported`,`Present`],span:6},{type:`text`,label:`If present, target / details`,span:6}],
    [{type:`heading`,label:`Risk & Protective Factors`}],
    [{type:`checkboxes`,label:`Risk factors present`,options:[`Prior suicide attempt`,`Recent loss or stressor`,`Active substance use`,`Hopelessness`,`Access to lethal means`,`Social isolation`,`Recent discharge from higher level of care`,`Command hallucinations`]}],
    [{type:`checkboxes`,label:`Protective factors`,options:[`Reasons for living`,`Social support`,`Engaged in treatment`,`Future orientation`,`Help-seeking`,`Responsibility to others / dependents`]}],
    [{type:`textarea`,label:`Mental status / clinical presentation`}],
    [{type:`textarea`,label:`Collateral information`}],
    [{type:`heading`,label:`Determination & Disposition`}],
    [{type:`select`,label:`Overall risk level`,options:[`Low`,`Moderate`,`High`,`Imminent`],span:6},{type:`toggle`,label:`Safety plan completed with patient?`,span:6}],
    [{type:`textarea`,label:`Interventions and disposition (e.g., outpatient with safety plan, increased level of care, emergency evaluation)`}],
    [{type:`checkboxes`,label:`Crisis resources provided`,options:[`988 Suicide & Crisis Lifeline`,`Local crisis line`,`Emergency department / 911`,`Warm handoff to provider`]}],
    [{type:`textarea`,label:`Follow-up plan`}],
    [{type:`date`,label:`Next contact`,span:6}],
    [{type:`signature`,label:`Clinician signature`,span:8},{type:`date`,label:`Date`,span:4}]
   ]},

  {key:`loc_disposition`,name:`Level of Care / Disposition`,group:`clinical`,desc:`Documents the recommended level of care and which licensed tool informed it (wrapper — not the licensed instrument)`,
   rows:[
    [{type:`heading`,label:`Level of Care / Disposition`}],
    [{type:`text`,label:`Patient name`,span:6},{type:`date`,label:`Date`,span:6}],
    [{type:`text`,label:`Clinician (name, credentials)`,span:12}],
    [{type:`textarea`,label:`Clinical summary / presenting needs`}],
    [{type:`textarea`,label:`Functional impairment summary`}],
    [{type:`heading`,label:`Determination`}],
    [{type:`select`,label:`Tool used to inform level of care`,options:[`ASAM Criteria`,`LOCUS`,`CALOCUS-CASII`,`CANS`,`ANSA`,`Clinical judgment`,`Other`],span:6},{type:`text`,label:`Score / result from that tool`,span:6,help:`Enter the score/level from your licensed copy of the tool. This note does not reproduce the tool itself.`}],
    [{type:`select`,label:`Recommended level of care`,options:[`Outpatient`,`Intensive outpatient (IOP)`,`Partial hospitalization (PHP)`,`Residential`,`Inpatient`,`Withdrawal management / detox`,`Crisis stabilization`]}],
    [{type:`select`,label:`ASAM level (if SUD)`,options:[`N/A`,`0.5 — Early intervention`,`1.0 — Outpatient`,`2.1 — Intensive outpatient`,`2.5 — Partial hospitalization`,`3.1 — Low-intensity residential`,`3.3 — High-intensity residential (population-specific)`,`3.5 — High-intensity residential`,`3.7 — Medically monitored inpatient`,`4.0 — Medically managed inpatient`]}],
    [{type:`textarea`,label:`Rationale for recommended level`}],
    [{type:`textarea`,label:`Barriers / alternative if the recommended level is unavailable`}],
    [{type:`toggle`,label:`Patient agrees with the recommendation?`,span:6}],
    [{type:`textarea`,label:`Disposition / referral and next steps`}],
    [{type:`signature`,label:`Clinician signature`,span:8},{type:`date`,label:`Date`,span:4}],
    [{type:`paragraph`,label:`Note for [Agency Name]: ASAM, LOCUS, CALOCUS-CASII, CANS, and ANSA are proprietary and require their own license/certification. This note documents the determination; it does not reproduce those instruments.`}]
   ]}
);

/* ============================================================
   EDITABLE SYSTEM FORMS — an edited built-in becomes a normal,
   re-editable form tagged sysOverrideKey:<key>. It replaces the
   built-in in the System Forms list, stays fully editable, and is
   hidden from My Forms. (It's a real form, so save/load just work.)
   ============================================================ */
function _formHasCritical(f){ return (f.scoringSections||[]).some(function(s){return s.alert&&s.alert.critical&&s.alert.critical.length;}); }
function _formHasThreshold(f){ return (f.scoringSections||[]).some(function(s){return s.alert&&s.alert.on;}); }
function sysOverrideForms(){ return (typeof FORMS!=='undefined'?FORMS:[]).filter(function(f){return f && f.sysOverrideKey;}); }

/* Build a complete, editable form from a built-in instrument — legacy
   (items/scale) OR composite (rows). The legacy branch includes the
   instruction stem as a heading so none of the original wording is lost. */
function buildFormFromInstrument(inst){
  const f={id:uid('form'),title:inst.name||'System form',desc:inst.desc||'',rows:[],weightGroups:[],scoringGroups:[],scoringSections:[],ownerId:CURRENT_USER_ID,shares:[],showAllPages:false,sysOverrideKey:inst.key,sysGroup:(inst.group||'screener'),updatedAt:Date.now()};
  const page=1;
  if(inst.rows){
    const scoredIds=[];
    const subOf={};   // fieldId -> subscale tag (for inst.scores grouping)
    inst.rows.forEach(function(rowSpec){
      const fields=rowSpec.map(function(spec){
        const type=spec.type||'text';
        const fld=defaultField(type,{label:(spec.label!=null?spec.label:''),span:(spec.span||defaultSpanFor(type)),required:!!spec.required});
        if(spec.ph!=null) fld.placeholder=spec.ph;
        if(spec.help!=null) fld.help=spec.help;
        if(spec.options) fld.options=spec.options.slice();
        if(spec.optionScores) fld.optionScores=spec.optionScores.slice();
        if(spec.optionLayout) fld.optionLayout=spec.optionLayout;
        if(spec.min!=null) fld.min=spec.min;
        if(spec.max!=null) fld.max=spec.max;
        if(spec.scored){ scoredIds.push(fld.id); if(spec.sub) subOf[fld.id]=spec.sub; }
        return fld;
      });
      f.rows.push({id:uid('r'),page:page,fields:fields});
    });
    // Helper: turn one section spec into a scoringSection. `all:true` (or no
    // sub/fields) covers every scored item; `sub:'tag'` selects items whose
    // spec carried that sub tag; `fieldIndexes:[...]` selects by scored order.
    const mkSection=function(sc){
      let ids;
      if(sc.all || (!sc.sub && !sc.fieldIndexes)) ids=scoredIds.slice();
      else if(sc.sub) ids=scoredIds.filter(function(id){return subOf[id]===sc.sub;});
      else ids=(sc.fieldIndexes||[]).map(function(i){return scoredIds[i];}).filter(Boolean);
      const section={id:uid('sect'),name:sc.name||inst.name,fieldIds:ids,bands:(sc.bands||[]).map(function(b){return Object.assign({},b);})};
      if(sc.scoreKey) section.scoreKey=sc.scoreKey;
      if(sc.alert||sc.critical){
        section.alert={on:sc.alert?true:false,min:sc.alert?(Number(sc.alert.min)||0):0,msg:sc.alert?(sc.alert.msg||''):'',critical:[]};
        (sc.critical||[]).forEach(function(c){var fid=scoredIds[c.itemIndex];if(fid)section.alert.critical.push({fieldId:fid,options:(c.options||[]).slice(),msg:c.msg||''});});
      }
      return section;
    };
    // inst.scores (array) → multiple sections (e.g. a Total + subscales, where
    // each item belongs to BOTH its subscale and the Total). inst.score
    // (single, legacy) → one section. Subscale sections naturally share fields
    // with the Total — multi-section membership is supported throughout.
    if(Array.isArray(inst.scores) && scoredIds.length){
      inst.scores.forEach(function(sc){ const sec=mkSection(sc); if(sec.fieldIds.length) f.scoringSections.push(sec); });
    } else if(inst.score && scoredIds.length){
      f.scoringSections.push(mkSection(inst.score));
    }
  } else {
    // Every screener gets a title heading, and (if defined) a standard
    // instruction stem paragraph beneath it — matching the published form,
    // instead of opening cold on question 1.
    f.rows.push({id:uid('r'),page:page,fields:[defaultField('heading',{label:inst.name})]});
    if(inst.stem){ f.rows.push({id:uid('r'),page:page,fields:[defaultField('paragraph',{label:inst.stem})]}); }
    else if(inst.intro){ f.rows.push({id:uid('r'),page:page,fields:[defaultField('paragraph',{label:inst.intro})]}); }
    const ids=[];
    (inst.items||[]).forEach(function(it){
      const q=(typeof it==='string')?it:it.q;
      const options=(typeof it==='string')?inst.scale.options.slice():(it.options||inst.scale.options).slice();
      const scores=(typeof it==='string')?inst.scale.scores.slice():(it.scores||inst.scale.scores).slice();
      const fld=defaultField('radio',{label:q,options:options,optionScores:scores,span:12,required:true});
      ids.push(fld.id);
      f.rows.push({id:uid('r'),page:page,fields:[fld]});
    });
    if(inst.impact){ f.rows.push({id:uid('r'),page:page,fields:[defaultField('radio',{label:inst.impact.q,options:(inst.impact.options||[]).slice(),span:12,required:false})]}); }
    const section={id:uid('sect'),name:inst.name,fieldIds:ids,bands:(inst.bands||[]).map(function(b){return Object.assign({},b);})};
    if(inst.alert||inst.critical){
      section.alert={on:inst.alert?true:false,min:inst.alert?Number(inst.alert.min)||0:0,msg:inst.alert?inst.alert.msg||'':'',critical:[]};
      (inst.critical||[]).forEach(function(c){var fid=ids[c.itemIndex];if(fid)section.alert.critical.push({fieldId:fid,options:(c.options||[]).slice(),msg:c.msg||''});});
    }
    f.scoringSections.push(section);
  }
  if(!f.rows.length) f.rows.push({id:uid('r'),fields:[]});
  return f;
}

/* System Forms list: built-ins, with any edited copy replacing its built-in,
   plus custom system forms appended. */
function effectiveInstruments(){
  const ov={}; sysOverrideForms().forEach(function(f){ if(f.sysOverrideKey) ov[f.sysOverrideKey]=f; });
  const out=[];
  INSTRUMENTS.forEach(function(b){
    const o=ov[b.key];
    if(o){
      out.push({key:b.key, name:o.title||b.name, desc:o.desc||b.desc||'', group:(o.sysGroup||b.group||'screener'), _formId:o.id, _edited:true, hasCritical:_formHasCritical(o), hasThreshold:_formHasThreshold(o)});
      delete ov[b.key];
    } else {
      out.push({key:b.key, name:b.name, desc:b.desc||'', group:(b.group||'screener'),
        hasCritical: !!(b.critical&&b.critical.length) || !!(b.score&&b.score.critical&&b.score.critical.length),
        hasThreshold: !!b.alert || !!(b.score&&b.score.alert)});
    }
  });
  Object.keys(ov).forEach(function(k){ var o=ov[k]; out.push({key:o.id, name:o.title||'Custom system form', desc:o.desc||'', group:(o.sysGroup||'screener'), _formId:o.id, _custom:true, hasCritical:_formHasCritical(o), hasThreshold:_formHasThreshold(o)}); });
  return out;
}

/* Insert a system form (edited/custom) by cloning its content with fresh ids. */
function insertSystemForm(src){
  ensureScoringInit();
  const page=(typeof BUILDER_PAGE!=='undefined')?BUILDER_PAGE:1;
  const idMap={};
  (src.rows||[]).forEach(function(r){
    const fields=(r.fields||[]).map(function(of){ var nf=JSON.parse(JSON.stringify(of)); var old=nf.id; nf.id=uid('f'); if(old) idMap[old]=nf.id; return nf; });
    FORM.rows.push({id:uid('r'),page:page,fields:fields});
  });
  (src.scoringSections||[]).forEach(function(s){
    var ns=JSON.parse(JSON.stringify(s)); ns.id=uid('sect');
    ns.fieldIds=(ns.fieldIds||[]).map(function(id){return idMap[id];}).filter(Boolean);
    if(ns.alert&&ns.alert.critical){ ns.alert.critical=ns.alert.critical.map(function(c){c.fieldId=idMap[c.fieldId];return c;}).filter(function(c){return c.fieldId;}); }
    FORM.scoringSections.push(ns);
  });
  if(typeof render==='function') render();
  if(typeof renderScoringModal==='function') renderScoringModal();
  if(typeof renderPreviewIfNeeded==='function') renderPreviewIfNeeded();
  if(typeof closeModal==='function') closeModal('instruments-modal');
  if(typeof toast==='function') toast((src.title||'System form')+' inserted \u2014 '+(src.rows||[]).length+' rows');
}

/* Edit a System Form: edited/custom -> open it; built-in -> materialize an
   editable copy (tagged sysOverrideKey) that replaces it, then open it. */
function editInstrument(key){
  if(typeof canCreateForms==='function' && !canCreateForms()){ toast("Viewers can't edit forms"); return; }
  let f=(typeof FORMS!=='undefined'?FORMS:[]).find(function(x){return x && x.sysOverrideKey && (x.sysOverrideKey===key || x.id===key);});
  if(!f){
    const inst=INSTRUMENTS.find(function(x){return x.key===key;}); if(!inst) return;
    f=buildFormFromInstrument(inst);
    FORMS.push(f); if(typeof persistForms==='function') persistForms();
  }
  if(typeof closeModal==='function'){ closeModal('instruments-modal'); closeModal('forms-modal'); }
  loadFormIntoEditor(f.id);
  if(typeof toast==='function') toast('Editing '+(f.title||'system form')+" \u2014 changes replace it in System Forms and autosave.");
}

function insertInstrument(key){
  if(currentFormReadOnly && currentFormReadOnly()){ toast('Read-only — can\u2019t modify this form'); return; }
  var _ovf=(typeof FORMS!=='undefined'?FORMS:[]).find(function(f){return f && f.sysOverrideKey && (f.sysOverrideKey===key || f.id===key);});
  if(_ovf){ insertSystemForm(_ovf); return; }
  const inst=INSTRUMENTS.find(x=>x.key===key); if(!inst) return;
  if(inst.rows){ insertCompositeTemplate(inst); return; }
  ensureScoringInit();
  const page=(typeof BUILDER_PAGE!=='undefined')?BUILDER_PAGE:1;
  const ids=[];
  if(inst.intro){ FORM.rows.push({id:uid('r'),page:page,fields:[defaultField('heading',{label:inst.name,help:inst.intro})]}); }
  inst.items.forEach(it=>{
    const q=(typeof it==='string')?it:it.q;
    const options=(typeof it==='string')?inst.scale.options.slice():(it.options||inst.scale.options).slice();
    const scores =(typeof it==='string')?inst.scale.scores.slice():(it.scores||inst.scale.scores).slice();
    const fld=defaultField('radio',{label:q,options:options,optionScores:scores,span:12,required:true});
    ids.push(fld.id);
    FORM.rows.push({id:uid('r'),page:page,fields:[fld]});
  });
  const section={id:uid('sect'),name:inst.name,fieldIds:ids,bands:(inst.bands||[]).map(b=>Object.assign({},b))};
  if(inst.alert || inst.critical){
    section.alert={on:inst.alert?true:false,min:inst.alert?Number(inst.alert.min)||0:0,msg:inst.alert?inst.alert.msg||'':'',critical:[]};
    (inst.critical||[]).forEach(c=>{ const fid=ids[c.itemIndex]; if(fid) section.alert.critical.push({fieldId:fid,options:(c.options||[]).slice(),msg:c.msg||''}); });
  }
  FORM.scoringSections.push(section);
  render(); renderScoringModal(); renderPreviewIfNeeded();
  closeModal('instruments-modal');
  toast(inst.name+' inserted — '+inst.items.length+' items + scoring');
}
function renderInstruments(){
  const m=document.getElementById('instruments-list'); if(!m) return;
  function card(i){
    const flags=[];
    if(i.hasCritical) flags.push('<span style="font-size:10.5px;font-weight:600;color:#a02016;background:#fdedeb;border:1px solid #f5b6ae;border-radius:999px;padding:2px 8px">\u26a0 critical-item alert</span>');
    if(i.hasThreshold) flags.push('<span style="font-size:10.5px;font-weight:600;color:#a02016;background:#fdedeb;border:1px solid #f5b6ae;border-radius:999px;padding:2px 8px">\u26a0 threshold alert</span>');
    const tag = i._edited ? ' <span style="font-size:10px;color:#0f7a52;font-weight:600">\u00b7 edited</span>' : (i._custom ? ' <span style="font-size:10px;color:#0f7a52;font-weight:600">\u00b7 custom</span>' : '');
    return '<div style="display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:9px">'
      +'<div style="flex:1;min-width:0">'
      +'<div style="font-weight:600;font-size:14px;color:var(--text-main)">'+esc(i.name)+tag+'</div>'
      +'<div style="font-size:12px;color:var(--text-muted);margin-top:2px">'+esc(i.desc||'')+'</div>'
      +(flags.length?'<div style="margin-top:6px">'+flags.join(' ')+'</div>':'')
      +'</div>'
      +'<button class="btn" style="flex:none" onclick="editInstrument(\''+i.key+'\')">Edit</button>'
      +'<button class="btn primary" style="flex:none" onclick="insertInstrument(\''+i.key+'\')">Insert</button>'
      +'</div>';
  }
  function header(t,sub){
    return '<div style="margin:2px 0 10px"><div style="font-family:\'Instrument Serif\',serif;font-size:18px;color:var(--text-main);line-height:1.1">'+esc(t)+'</div>'
      +(sub?'<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">'+esc(sub)+'</div>':'')+'</div>';
  }
  const _all=effectiveInstruments();
  const screeners=_all.filter(function(i){return (i.group||'screener')==='screener';});
  const templates=_all.filter(function(i){return i.group==='template';});
  const clinical=_all.filter(function(i){return i.group==='clinical';});
  let html='';
  html+=header('Screening forms','Scored — items, point values, severity bands, and alerts come prewired.');
  html+=screeners.map(card).join('');
  if(templates.length){
    html+='<div style="height:14px"></div>';
    html+=header('Intake & assessment templates','Unscored — multi-field forms (demographics, consents, assessments) the patient fills out.');
    html+=templates.map(card).join('');
  }
  if(clinical.length){
    html+='<div style="height:14px"></div>';
    html+=header('Clinical documentation','Clinician-completed notes — psychiatric eval, med management, group, crisis, disposition (not patient-facing).');
    html+=clinical.map(card).join('');
  }
  m.innerHTML=html;
}
function openInstruments(){
  if(currentFormReadOnly && currentFormReadOnly()){ toast('Read-only — can\u2019t modify this form'); return; }
  renderInstruments();
  openModal('instruments-modal');
}

let SCORING_SEARCH={};
/* Per scoring-group source form. groupId -> formId. Lets a scoring group pull
   fields from ANY form (Forms→Fields picker), not just the current one. */
let SCORING_FORM={};
function scoringSourceFormId(groupId){
  if(SCORING_FORM[groupId]) return SCORING_FORM[groupId];
  return (FORM && FORM.id) || '';
}
function scoringFormById(id){
  if(FORM && FORM.id===id) return FORM;
  return (typeof FORMS!=='undefined'?FORMS:[]).find(f=>f.id===id) || FORM;
}
/* Resolve a field id across the CURRENT form first, then every other form, so a
   scoring group can reference fields living on other forms. */
function findFieldAnyForm(id){
  let f=findFieldById(id); if(f) return f;
  const forms=(typeof FORMS!=='undefined'?FORMS:[]);
  for(const form of forms){ for(const row of (form.rows||[])){ for(const fld of (row.fields||[])){ if(fld.id===id) return fld; } } }
  return null;
}
function toggleScoringExpand(){
  const box=document.getElementById('scoring-modal-box');
  const eb=document.getElementById('scoring-expand-btn');
  if(!box) return;
  const on=box.classList.toggle('expanded');
  if(eb) eb.textContent = on ? '\u2921 Collapse' : '\u2922 Expand';
}
function scoringEligibleFields(section){
  const all=[];
  const srcForm=scoringFormById(scoringSourceFormId(section.id));
  (srcForm.rows||[]).forEach(r=>r.fields.forEach(f=>{ if(isScoreable(f)) all.push(f); }));
  return all.filter(f=>!section.fieldIds.includes(f.id));
}
function scoringResultsHTML(sectionId){
  const s=FORM.scoringSections.find(x=>x.id===sectionId); if(!s) return '';
  const q=(SCORING_SEARCH[sectionId]||'').trim().toLowerCase();
  const elig=scoringEligibleFields(s).filter(f=>!q || (f.label||'').toLowerCase().indexOf(q)>=0 || fieldTypeName(f).toLowerCase().indexOf(q)>=0).slice(0,60);
  if(!elig.length) return `<div class="disp-empty">${q?'No matching fields.':'All scoreable fields are already in this section.'}</div>`;
  return elig.map(f=>{
    const owners=sectionsForField(f.id).filter(o=>o.id!==sectionId);
    const tag=owners.length?`<span class="disp-pill" title="Also scored in another section">also: ${esc(owners.map(o=>o.name).join(', '))}</span>`:'';
    return `<button type="button" class="disp-result" onclick="addFieldToSection('${f.id}','${sectionId}')" title="Add this question to the section">
      <span class="disp-result-name">${esc(f.label||'Untitled')}</span>
      <span class="disp-pill">${esc(fieldTypeName(f))}</span>${tag}
      <span class="disp-plus">+ add</span>
    </button>`;
  }).join('');
}
function scoringSearchInput(sectionId, v){
  SCORING_SEARCH[sectionId]=v;
  const box=document.getElementById('scoring-results-'+sectionId);
  if(box) box.innerHTML=scoringResultsHTML(sectionId);
}
/* Pick which form a scoring group draws its fields from (Forms→Fields). */
function scoringSetSourceForm(sectionId, formId){
  SCORING_FORM[sectionId]=formId;
  SCORING_SEARCH[sectionId]='';
  renderScoringModal();
}
/* Filter the visible scoring groups by name. Empty = show all. Searches the
   current form's groups; groups can reference fields from any form. */
let SCORING_GROUP_QUERY='';
function scoringGroupSearch(v){
  SCORING_GROUP_QUERY=(v||'').trim().toLowerCase();
  renderScoringModal();
}
/* Scoring groups on every OTHER form whose name matches the query, for the
   "From other forms" block under the search. Read-only peek — copying is the
   only mutation, and it only ever touches the CURRENT form. */
function scoringCrossFormMatches(q){
  const out=[];
  if(!q) return out;
  const selfId=FORM&&FORM.id;
  (typeof FORMS!=='undefined'?FORMS:[]).forEach(f=>{
    if(!f || f.id===selfId) return;
    const sects=f.scoringGroups||f.scoringSections||[];
    sects.forEach(s=>{
      if(((s&&s.name)||'').toLowerCase().indexOf(q)>=0) out.push({formId:f.id, formTitle:f.title||'Untitled form', section:s});
    });
  });
  return out;
}
/* "Copy into this form": deep-clone a scoring group from another form onto the
   current one under a fresh id. The clone keeps its fieldIds verbatim — the
   whole scoring pipeline (members, weights, conditions, prune, preview, export)
   already resolves field ids across forms via findFieldAnyForm, so the copied
   group scores the source form's fields exactly like the original. Bands,
   weights, caps, scoreKey, scoreConds and notifications all come along. The
   source form is untouched. */
function copyScoringSectionInto(formId, sectionId){
  ensureScoringInit();
  if(currentFormReadOnly()){ toast('Read-only \u2014 can\'t modify this form'); return; }
  const src=(typeof FORMS!=='undefined'?FORMS:[]).find(f=>f.id===formId);
  const sects=src?(src.scoringGroups||src.scoringSections||[]):[];
  const s=sects.find(x=>x&&x.id===sectionId);
  if(!s){ toast('Could not find that scoring group'); renderScoringModal(); return; }
  let copy=null;
  try{ copy=JSON.parse(JSON.stringify(s)); }catch(e){}
  if(!copy){ toast('Could not copy that scoring group'); return; }
  copy.id=uid('sect');
  FORM.scoringSections.push(copy);
  // Point the copy's "Form" picker at the source form so its add-field search
  // lists the form the members actually live on.
  SCORING_FORM[copy.id]=formId;
  render();
  renderScoringModal(); // search stays active: the copy appears under "this form" and more can be copied
  scoringFocusGroup(copy.id);
  toast('Copied \u201C'+(s.name||'Untitled group')+'\u201D into this form');
}
function scoringCalcMode(){ return (FORM && FORM.scoringCalcMode==='num') ? 'num' : 'pct'; }
function setScoringCalcMode(mode){ if(!FORM) return; FORM.scoringCalcMode=(mode==='num')?'num':'pct'; render(); renderScoringModal(); }
function ensureScoringWeights(s){ if(!s.weights||typeof s.weights!=='object') s.weights={}; return s.weights; }
function scoringFieldVal(s, fid){ const w=ensureScoringWeights(s); const v=Number(w[fid]); return isNaN(v)?0:v; }
function scoringCap(s){ return scoringCalcMode()==='num' ? (Number(s.groupTotal)||0) : 100; }
function allocatedPts(s){ return (s.fieldIds||[]).reduce((acc,fid)=>acc+scoringFieldVal(s,fid),0); }
function clampScoringSum(s, editedFid){ const cap=scoringCap(s); if(cap<=0) return; const alloc=allocatedPts(s); if(alloc<=cap) return; if(editedFid!=null){ const w=ensureScoringWeights(s); w[editedFid]=Math.max(0, scoringFieldVal(s,editedFid)-(alloc-cap)); } }
function setFieldVal(sid, fid, v){ const s=FORM.scoringSections.find(x=>x.id===sid); if(!s) return; ensureScoringWeights(s); s.weights[fid]=Math.max(0,Number(v)||0); clampScoringSum(s,fid); render(); renderScoringModal(); }
/* Conditional scoring: a field in a scoring group can carry a gate (a stackable
   AND/OR/NOT condition, same builder as Show Fields) stored at
   group.scoreConds[fieldId]. When the gate fails the field contributes 0. */
function scoringFieldCond(section, fieldId){ const c=section&&section.scoreConds&&section.scoreConds[fieldId]; return (c&&c.conditions&&c.conditions.length)?c:null; }
function scoringFieldHasCond(section, fieldId){ return !!scoringFieldCond(section, fieldId); }
function scoringFieldCounts(section, fieldId){ const c=scoringFieldCond(section, fieldId); if(!c) return true; try{ return !!evalShowIf(c); }catch(e){ return true; } }
/* Open the shared condition editor in scoring mode for a (group, field). */
function openScoreCondition(groupId, fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  DISP_FROM_SCORING=true; DISP_FROM_MANAGER=false;
  closeModal('scoring-modal');
  openDisplayFields('scfield:'+groupId+':'+fieldId);
}
function setGroupCap(sid, v){ const s=FORM.scoringSections.find(x=>x.id===sid); if(!s) return; s.groupTotal=Math.max(0,Number(v)||0); ensureScoringWeights(s); (s.fieldIds||[]).forEach(fid=>{ if(scoringFieldVal(s,fid)>s.groupTotal) s.weights[fid]=s.groupTotal; }); render(); renderScoringModal(); }
function renderScoringModal(){
  const mount=document.getElementById('scoring-sections-list');
  if(!mount) return;
  ensureScoringInit();
  const sections=FORM.scoringSections;
  // Only short-circuit to the "no groups yet" teaching state when no search is
  // active — with a query typed, fall through so cross-form matches can render
  // even on a form that has zero groups of its own.
  if(sections.length===0 && !(typeof SCORING_GROUP_QUERY!=='undefined' && SCORING_GROUP_QUERY)){
    mount.innerHTML=`<div class="disp-empty" style="padding:22px;text-align:center;line-height:1.6">No scoring groups yet. Click <strong>+ New scoring group</strong> below to create one, then pick a form and add questions, setting per-option point values from each question's inspector.</div>`;
    return;
  }
  const mode=scoringCalcMode();
  let html=`<div class="scoring-calcmode"><span class="scoring-calcmode-lbl">Calculate by</span><label class="scoring-radio"><input type="radio" name="scoring-calcmode" ${mode==='pct'?'checked':''} onchange="setScoringCalcMode('pct')"> % (percent)</label><label class="scoring-radio"><input type="radio" name="scoring-calcmode" ${mode==='num'?'checked':''} onchange="setScoringCalcMode('num')"> Numeric value</label></div>`;
  const _gq=(typeof SCORING_GROUP_QUERY!=='undefined'?SCORING_GROUP_QUERY:'');
  const visibleSections = _gq ? sections.filter(s=>(s.name||'').toLowerCase().indexOf(_gq)>=0) : sections;
  const xMatches = _gq ? scoringCrossFormMatches(_gq) : [];
  if(_gq && !visibleSections.length){
    html+= xMatches.length
      ? `<div class="disp-empty" style="padding:14px;text-align:center">No scoring groups on this form match \u201C${esc(_gq)}\u201D \u2014 matches from other forms are listed below.</div>`
      : `<div class="disp-empty" style="padding:18px;text-align:center">No scoring groups match \u201C${esc(_gq)}\u201D on this or any other form.</div>`;
  }
  visibleSections.forEach(s=>{
    const max=sectionMaxScore(s);
    const memberFields=s.fieldIds.map(fid=>findFieldAnyForm(fid)).filter(Boolean);
    html+=`<div class="scoring-block" data-section-id="${s.id}">
      <div class="disp-anchor">
        <span class="disp-anchor-lbl">Scoring group</span>
        <input class="scoring-name-input" value="${esc(s.name||'')}" placeholder="Untitled group" onchange="renameScoringSection('${s.id}', this.value)">
        <span class="disp-pill">${memberFields.length} field${memberFields.length===1?'':'s'} \u00B7 ${allocatedPts(s)}${mode==='pct'?'%':''} / ${scoringCap(s)}${mode==='pct'?'%':' pts'}</span>
        <button class="disp-x" title="Delete group" onclick="deleteScoringSection('${s.id}')">\u2715</button>
      </div>`;

    html+=`<div class="disp-section">
      <div class="disp-section-head"><span class="disp-section-title">Fields in this section</span>${memberFields.length?`<span class="disp-show-count">${memberFields.length} selected</span>`:''}</div>`;
    if(memberFields.length){
      const _cap=scoringCap(s); const _alloc=allocatedPts(s); const _over=_alloc>_cap;
      html+=`<div class="scoring-fields">`;
      memberFields.forEach(f=>{
        const val=scoringFieldVal(s,f.id);
        const _hasCond=scoringFieldHasCond(s,f.id);
        const _condSum=_hasCond?esc(describeShowIf(s.scoreConds[f.id])):'';
        html+=`<div class="scoring-field-row">
          <span class="scoring-field-name">${esc(f.label||'Untitled')}</span>
          <span class="disp-pill">${esc(fieldTypeName(f))}</span>
          <span class="scoring-wctl">
            <input type="number" min="0" class="scoring-wnum" value="${val}" onchange="setFieldVal('${s.id}','${f.id}',this.value)">
            <span class="scoring-unit">${mode==='pct'?'%':'pts'}</span>
          </span>
          <button class="scf-cond${_hasCond?' on':''}" title="${_hasCond?'Conditional — these points only count when the rule is met. Click to edit.':'Add a condition so these points only count when it is met'}" onclick="openScoreCondition('${s.id}','${f.id}')">${_hasCond?'\u2713 Conditional':'+ Condition'}</button>
          <button class="scf-rm" title="Remove from this section" onclick="removeFieldFromSection('${f.id}','${s.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          ${_hasCond?`<div class="scf-cond-sum">Counts when: ${_condSum}</div>`:''}
        </div>`;
      });
      html+=`</div>`;
      if(mode==='num'){
        html+=`<div class="scoring-total-row">
          <label>Group total shall not exceed <input type="number" min="0" class="scoring-grouptotal" value="${Number(s.groupTotal)||0}" onchange="setGroupCap('${s.id}',this.value)"></label>
          <span class="scoring-alloc${_over?' over':''}">Allocated ${_alloc} / ${_cap}</span>
        </div>`;
      } else {
        html+=`<div class="scoring-total-row">
          <span class="scoring-alloc${_over?' over':''}">Allocated ${_alloc}% / 100%</span>
        </div>`;
      }
    } else {
      html+=`<div class="disp-empty">No fields yet \u2014 search below and click a field to add it.</div>`;
    }
    html+=`<div class="scoring-formpick-row">
        <label class="scoring-formpick-lbl">Form</label>
        <select class="scoring-formpick enhance-dd" onchange="scoringSetSourceForm('${s.id}', this.value)">
          ${(typeof FORMS!=='undefined'?FORMS:[]).map(f=>`<option value="${f.id}"${scoringSourceFormId(s.id)===f.id?' selected':''}>${esc(f.title||'Untitled form')}${f.id===(FORM&&FORM.id)?' (current)':''}</option>`).join('')}
        </select>
      </div>
      <input type="text" class="disp-search-in" placeholder="Search fields to add\u2026" value="${esc(SCORING_SEARCH[s.id]||'')}" oninput="scoringSearchInput('${s.id}', this.value)">
      <div class="disp-results" id="scoring-results-${s.id}">${scoringResultsHTML(s.id)}</div>
      <p class="disp-cond-help">Pick a form above, then add its radio, dropdown, checkbox-list and single-checkbox/toggle fields. Set each option's points in the field's inspector.</p>
    </div>`;

    html+=`<div class="disp-section">
      <div class="disp-section-head"><span class="disp-section-title">Publish total as shared key <span class="disp-opt-tag">optional</span></span></div>
      <input type="text" class="disp-search-in" style="margin-bottom:6px" value="${esc(s.scoreKey||'')}" placeholder="e.g. phq9_total" onchange="setSectionScoreKey('${s.id}', this.value)">
      <p class="disp-cond-help">Lets other forms and the backend branch on this score.</p>
    </div>`;

    html+=`<div class="disp-section">
      <div class="disp-section-head"><span class="disp-section-title">Severity bands <span class="disp-opt-tag">optional</span></span></div>`;
    if(s.bands && s.bands.length){
      html+=`<div class="bands-list">`;
      const _presetHex={low:'#1a8a66',mild:'#d97706',mod:'#ea580c',high:'#c0392b'};
      s.bands.forEach((b,i)=>{
        const _effHex=(b.color&&/^#[0-9a-fA-F]{6}$/.test(b.color))?b.color:(_presetHex[b.severity]||'#1a8a66');
        const _isCustom=!!(b.color&&/^#[0-9a-fA-F]{6}$/.test(b.color));
        html+=`<div class="band-row">
          <input type="number" value="${Number(b.min)||0}" title="Min total" onchange="updateBand('${s.id}',${i},'min',this.value); render()">
          <input type="number" value="${Number(b.max)||0}" title="Max total" onchange="updateBand('${s.id}',${i},'max',this.value); render()">
          <input type="text" value="${esc(b.label||'')}" placeholder="Label (e.g. Mild)" onchange="updateBand('${s.id}',${i},'label',this.value); render()">
          <button class="band-rm" title="Remove band" onclick="deleteBand('${s.id}',${i})">\u2715</button>
        </div>
        <div style="grid-column:1/-1;display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted);margin:-1px 0 7px;padding-left:2px">
          <span>Color:</span>
          <select class="enhance-dd" style="font-size:11px;padding:3px 6px;border:1px solid var(--border);border-radius:5px" onchange="setBandColorChoice('${s.id}',${i},this.value)">
            <option value="low"${(!_isCustom&&(b.severity||'low')==='low')?' selected':''}>Green (low)</option>
            <option value="mild"${(!_isCustom&&b.severity==='mild')?' selected':''}>Yellow (mild)</option>
            <option value="mod"${(!_isCustom&&b.severity==='mod')?' selected':''}>Orange (moderate)</option>
            <option value="high"${(!_isCustom&&b.severity==='high')?' selected':''}>Red (high)</option>
            <option value="custom"${_isCustom?' selected':''}>Custom\u2026</option>
          </select>
          <input type="color" value="${_effHex}" title="Pick a custom color" style="width:30px;height:24px;border:1px solid var(--border);border-radius:5px;padding:1px;cursor:pointer;background:#fff" onchange="setBandCustomColor('${s.id}',${i},this.value)">
          <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:13px;height:13px;border-radius:3px;border:1px solid rgba(0,0,0,.12);background:${_effHex}"></span>${_isCustom?`<button class="band-rm" title="Clear custom color" style="font-size:11px;width:auto;padding:0 6px;height:auto" onclick="clearBandCustomColor('${s.id}',${i})">reset</button>`:''}</span>
        </div>`;
      });
      html+=`</div>`;
    } else {
      html+=`<div class="disp-empty">No bands yet \u2014 add ranges like 5\u20139 = Mild to classify and color the total.</div>`;
    }
    html+=`<button class="add-band-btn" onclick="addBand('${s.id}')">+ Add band</button>
    </div>`;

    html+=`<div class="disp-section disp-section-cond">
      <div class="disp-section-head"><span class="disp-section-title">Risk notification <span class="disp-opt-tag">optional</span></span></div>
      <label class="scoring-alert-row"><input type="checkbox" ${s.alert&&s.alert.on?'checked':''} onchange="setSectionAlert('${s.id}','on',this.checked)"> Flag for clinician review when total \u2265 <input type="number" class="scoring-alert-min" value="${s.alert&&s.alert.min!=null?Number(s.alert.min):''}" onchange="setSectionAlert('${s.id}','min',this.value)"></label>
      <input type="text" class="disp-search-in" style="margin-top:8px;margin-bottom:6px" value="${esc((s.alert&&s.alert.msg)||'')}" placeholder="Notification message (e.g. Elevated risk \u2014 review before session)" onchange="setSectionAlert('${s.id}','msg',this.value)">`;
    if(s.alert&&s.alert.on) html+=alertNotifyHTML(s,'section',null);
    html+=criticalItemsHTML(s);
    html+=`</div>`;

    html+=`</div>`;
  });
  if(_gq && xMatches.length){
    html+=`<div class="scoring-xform-divider"><span>From other forms</span></div>`;
    xMatches.forEach(m=>{
      const nf=(m.section.fieldIds||[]).length, nb=(m.section.bands||[]).length;
      html+=`<div class="scoring-xform-row">
        <span class="scoring-xform-name" title="${esc(m.section.name||'Untitled group')}">${esc(m.section.name||'Untitled group')}</span>
        <span class="scoring-xform-form">${esc(m.formTitle)}</span>
        <span class="disp-pill">${nf} field${nf===1?'':'s'}${nb?` \u00B7 ${nb} band${nb===1?'':'s'}`:''}</span>
        <button class="btn scoring-xform-copy" onclick="copyScoringSectionInto('${m.formId}','${m.section.id}')">Copy into this form</button>
      </div>`;
    });
  }
  mount.innerHTML=html;
  enhanceDropdowns(mount);
}

/* Wired to the "Add" button next to each section's add-field dropdown. */
function addFieldToSectionFromDropdown(sectionId){
  const sel=document.getElementById('add-to-'+sectionId);
  if(!sel || !sel.value) return;
  addFieldToSection(sel.value, sectionId);
}

/* Section-picker shown in the field inspector. Quick way to assign or
   change the field's section without leaving the inspector. */
function renderFieldSectionPickerHTML(field){
  ensureScoringInit();
  if(!isScoreable(field)) return '';
  const sections=FORM.scoringSections;
  const mine=new Set(sectionsForField(field.id).map(s=>s.id));
  let inner;
  if(!sections.length){
    inner=`<div style="font-size:12px;color:var(--text-muted-2);padding:2px 0 4px">No scoring sections yet.</div>`;
  } else {
    // A field can be a member of several sections at once (e.g. a Total plus a
    // subscale), so each section is an independent checkbox rather than a
    // single-choice dropdown.
    inner=sections.map(s=>`<label style="display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--text-main);padding:3px 0;cursor:pointer"><input type="checkbox" ${mine.has(s.id)?'checked':''} onchange="this.checked?addFieldToSection('${field.id}','${s.id}'):removeFieldFromSection('${field.id}','${s.id}')"> ${esc(s.name)}</label>`).join('');
  }
  return `<div class="section-pick" style="display:block">
    ${inner}
    <button class="new-section-btn" style="margin-top:6px" onclick="createSectionAndAssign('${field.id}')">+ New section</button>
  </div>`;
}

/* "+ New" button next to the inspector section picker. Creates a fresh
   section AND assigns the current field to it in one step. */
function createSectionAndAssign(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  ensureScoringInit();
  const n=FORM.scoringSections.length+1;
  const section={
    id:uid('sect'),
    name:`Scoring section ${n}`,
    fieldIds:[fieldId],
    bands:[]
  };
  FORM.scoringSections.push(section);
  // Additive: the field keeps any existing section memberships (a field can be
  // in several sections at once), so we no longer strip it from the others.
  render();
  renderScoringModal();
  toast('New scoring section created. Edit it via the Scoring button.');
}

function findFieldById(id){
  for(let row of FORM.rows) for(let field of row.fields) if(field.id===id) return field;
  return null;
}

function selectField(e,fieldId){
  e.stopPropagation();
  if(BLOCK_SELECT_MODE){
    const i=BLOCK_SEL.indexOf(fieldId);
    if(i>=0) BLOCK_SEL.splice(i,1); else BLOCK_SEL.push(fieldId);
    renderCanvas(); updateBlockSelectBar();
    return;
  }
  // Pointer-down (selectFieldOnPointerDown) already selects on mousedown for a
  // snappier single-click switch; if this click is just the tail of that same
  // gesture, the field is already selected — don't render again.
  if(SELECTED && SELECTED.fieldId===fieldId) return;
  SELECTED={fieldId};render();
}

/* Pointer-down selection. Fires on mousedown — BEFORE a focused inspector
   input (e.g. the Label box) loses focus and runs its onchange→render(), which
   would otherwise rebuild the canvas and destroy the element being clicked,
   swallowing the click and forcing a second one. By committing the selection on
   pointer-down we register the new field first, so even when that blur-driven
   render() runs, it rebuilds with the right field already selected.
   Guards: ignore in block-select mode (handled on click), and ignore when the
   field is already selected so dragging it to reorder isn't interrupted by a
   re-render. */
let PENDING_SELECT_RENDER=null;
function cancelPendingSelectRender(){ if(PENDING_SELECT_RENDER){ clearTimeout(PENDING_SELECT_RENDER); PENDING_SELECT_RENDER=null; } }
function selectFieldOnPointerDown(e,fieldId){
  if(BLOCK_SELECT_MODE) return;            // toggle handled by onclick
  if(e.button!==undefined && e.button!==0) return; // left button only
  if(SELECTED && SELECTED.fieldId===fieldId) return; // already selected → allow drag
  // Commit any focused inspector input's value before we tear the DOM down,
  // so edits aren't lost when its onchange would have fired on blur.
  const ae=document.activeElement;
  if(ae && ae.closest && ae.closest('#inspector') && typeof ae.blur==='function'){
    ae.blur();
  }
  SELECTED={fieldId};
  // Defer the render to the next frame. If this pointer-down is actually the
  // start of a drag (dragstart fires synchronously, before this timer), the
  // dragstart handler cancels the pending render so the drag isn't disrupted.
  // Otherwise the render runs, opening the inspector for the newly clicked
  // field — all from a SINGLE click, even mid-edit of another field.
  clearTimeout(PENDING_SELECT_RENDER);
  PENDING_SELECT_RENDER=setTimeout(()=>{ PENDING_SELECT_RENDER=null; render(); },0);
}

function changeFieldType(fieldId,newType){
  const f=findFieldById(fieldId);
  if(!f) return; // field may have been removed since the inspector rendered
  // If the label is still the default for the old type, auto-swap it to the
  // new type's default. Preserves user-customized labels untouched.
  const labelWasDefault=isLabelDefault(f);
  // radio / dropdown / checkbox-list all share the same options[] + optionScores[]
  // shape, so converting between them must PRESERVE the user's choices and points
  // (previously every swap wiped them — silent data loss on a common edit). Going
  // to or from a non-option type still drops them, since they wouldn't apply.
  const OPTION_BASED_TYPES = new Set(['radio','select','checkboxes']);
  const keepOptions = OPTION_BASED_TYPES.has(f.type) && OPTION_BASED_TYPES.has(newType);
  const savedOptions = keepOptions && Array.isArray(f.options) ? f.options.slice() : null;
  const savedScores  = keepOptions && Array.isArray(f.optionScores) ? f.optionScores.slice() : null;
  f.type=newType;
  // Drop only type-SPECIFIC props that don't carry over to a different type.
  // `required` and `help` are type-agnostic user intent, so they survive a
  // type change (previously they were wiped on every swap — data loss).
  delete f.placeholder;
  delete f.options;
  delete f.min;
  delete f.max;
  delete f.step;
  if(labelWasDefault){
    const nd=defaultField(newType);
    f.label=nd.label;
  }
  f.span=defaultSpanFor(newType);
  // Changing to a content-only type (heading/paragraph/divider) makes the
  // field non-scoreable — drop it from any weight group it was in.
  pruneWeightGroups();
  // Likewise drop the field from any scoring section if the new type can't
  // carry per-option scores (e.g. text, date). And reset optionScores so a
  // future change back to a scoreable type doesn't resurrect stale values
  // tied to the old options array.
  delete f.optionScores;
  // Restore preserved options/scores for option↔option conversions so the
  // field stays intact (and stays in its scoring section, since these types
  // remain scoreable) instead of being pruned for having no options.
  if(savedOptions){ f.options=savedOptions; if(savedScores) f.optionScores=savedScores; }
  pruneScoringSections();
  if(SELECTED && SELECTED.fieldId===fieldId && NON_WEIGHTABLE_TYPES.has(newType)){
    // keep selection; inspector will just show the non-grouped state
  }
  render();
}

/* ===== Field-level access (patient / user visibility) & notifications =====
   Optional per-field config:
     field.hidePatient                          – omit from the patient form/export
     field.hideUsers + field.hideUsersScope     – hide in the internal (clinician)
                                                   view from {roles:[], userIds:[]}
     field.notify {sms,email,patient,roles:[],userIds:[]} – who to alert + how
   Enforcement of user-visibility and delivery of SMS/Email are handled by the
   connected CRM/backend, which resolves phone/email from the patient submission
   and from user profiles. The builder owns the configuration and ships it in the
   exported form's data blob. */
const ROLES_KEY='credify_roles_v1';
/* Permission catalog — the toggles available per role (display order). */
const PERM_DEFS=[
  {k:'manageUsers', l:'Manage users & roles', d:'Add, edit and remove users; create and edit roles'},
  {k:'createForms', l:'Create forms',          d:'Start new forms (and use Clear)'},
  {k:'editAllForms',l:'Edit all forms',         d:'Full edit access to every form, not only their own/shared'},
  {k:'viewAllForms',l:'View all forms',         d:'Read-only access to every form, even if not shared with them'},
  {k:'shareForms',  l:'Share forms',            d:'Create patient links and share forms they can edit'},
  {k:'exportForms', l:'Export forms',           d:'Export to PDF, HTML or JSON'}
];
const PERM_KEYS=PERM_DEFS.map(p=>p.k);
function blankPerms(){ const o={}; PERM_KEYS.forEach(k=>o[k]=false); return o; }
function fullPerms(){ const o={}; PERM_KEYS.forEach(k=>o[k]=true); return o; }
function defaultRolesSeed(){
  return [
    {v:'admin', l:'Admin',  builtin:true, perms:fullPerms()},
    {v:'editor',l:'Editor', builtin:true, perms:{manageUsers:false,createForms:true, editAllForms:false,viewAllForms:false,shareForms:true, exportForms:true}},
    {v:'viewer',l:'Viewer', builtin:true, perms:{manageUsers:false,createForms:false,editAllForms:false,viewAllForms:false,shareForms:false,exportForms:true}}
  ];
}
function normalizeRole(r){
  if(!r||typeof r!=='object') return null;
  return {v:String(r.v), l:String(r.l||r.v), builtin:!!r.builtin, perms:Object.assign(blankPerms(), (r.perms&&typeof r.perms==='object')?r.perms:{})};
}
function loadRolesOrSeed(){
  try{
    const raw=localStorage.getItem(ROLES_KEY);
    if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)&&a.length){
      const out=a.map(normalizeRole).filter(Boolean);
      // The three built-ins must always exist (re-add any a save dropped).
      defaultRolesSeed().forEach(def=>{ if(!out.some(r=>r.v===def.v)) out.push(def); });
      return out;
    } }
  }catch(e){}
  const seed=defaultRolesSeed();
  try{ localStorage.setItem(ROLES_KEY, JSON.stringify(seed)); }catch(e){}
  return seed;
}
let ROLE_DEFS = loadRolesOrSeed();
function persistRoles(){ try{ localStorage.setItem(ROLES_KEY, JSON.stringify(ROLE_DEFS)); }catch(e){} }
function roleDef(v){ return ROLE_DEFS.find(r=>r.v===v) || null; }
function roleLabel(v){ const r=roleDef(v); return r?r.l:v; }
function roleOptionsHTML(sel){ return ROLE_DEFS.map(r=>`<option value="${esc(r.v)}"${r.v===sel?' selected':''}>${esc(r.l)}</option>`).join(''); }
function hasPerm(k){ const u=currentUser(); const r=u?roleDef(u.role):null; return !!(r&&r.perms&&r.perms[k]); }
/* How many users currently hold a role that can manage users — used to stop
   the team from ever locking itself out of user/role management. */
function managersCount(list){ return (list||USERS).filter(u=>{const r=roleDef(u.role); return !!(r&&r.perms&&r.perms.manageUsers);}).length; }
function ensureFieldScope(f){ if(!f.hideUsersScope||typeof f.hideUsersScope!=='object') f.hideUsersScope={roles:[],userIds:[]}; if(!Array.isArray(f.hideUsersScope.roles)) f.hideUsersScope.roles=[]; if(!Array.isArray(f.hideUsersScope.userIds)) f.hideUsersScope.userIds=[]; return f.hideUsersScope; }
function ensureFieldNotify(f){ if(!f.notify||typeof f.notify!=='object') f.notify={sms:false,email:false,patient:false,roles:[],userIds:[]}; const n=f.notify; if(!Array.isArray(n.roles)) n.roles=[]; if(!Array.isArray(n.userIds)) n.userIds=[]; return n; }
function fieldHiddenFromPatient(f){ return !!(f && f.hidePatient); }
function fieldUserScoped(f){ return !!(f && f.hideUsers); }
function fieldHasNotify(f){ const n=f&&f.notify; return !!(n && (n.sms||n.email) && (n.patient || (n.roles&&n.roles.length) || (n.userIds&&n.userIds.length))); }
function recipientChips(roles,userIds,patient,clientIds){
  const parts=[];
  if(patient) parts.push('Patient');
  (roles||[]).forEach(r=>parts.push(roleLabel(r)));
  (userIds||[]).forEach(id=>{ const u=USERS.find(x=>x.id===id); if(u) parts.push(u.name); });
  (clientIds||[]).forEach(id=>{ const c=CLIENTS.find(x=>x.id===id); if(c) parts.push(c.name); });
  return parts;
}
function setFieldHidePatient(fieldId,on){ if(currentFormReadOnly())return; const f=findFieldById(fieldId); if(!f)return; if(on) f.hidePatient=true; else delete f.hidePatient; saveForm(); render(); }
function setFieldHideUsers(fieldId,on){ if(currentFormReadOnly())return; const f=findFieldById(fieldId); if(!f)return; if(on){ f.hideUsers=true; ensureFieldScope(f); } else { delete f.hideUsers; } saveForm(); render(); }
function toggleNotifyChannel(fieldId,ch,on){ if(currentFormReadOnly())return; if(ch!=='sms'&&ch!=='email')return; const f=findFieldById(fieldId); if(!f)return; ensureFieldNotify(f)[ch]=!!on; saveForm(); render(); }
function toggleNotifyPatient(fieldId,on){ if(currentFormReadOnly())return; const f=findFieldById(fieldId); if(!f)return; ensureFieldNotify(f).patient=!!on; saveForm(); render(); }

/* Roles/Users picker — a small searchable modal reused by both the "hide from
   users" scope and the notification recipients. State lives in RU_PICKER. */
let RU_PICKER=null;
/* Generic recipient picker. `sink` is the object whose roles/userIds/clientIds
   arrays are written on Apply (a field's notify/scope, or an alert's notify).
   includeClients adds the Contacts section (used for notifications only). */
function openRecipientPicker(opts){
  if(currentFormReadOnly()) return;
  const sink=opts.sink||{};
  RU_PICKER={ sink, includeClients:!!opts.includeClients, onApply:opts.onApply||null,
    roles:new Set(sink.roles||[]), userIds:new Set(sink.userIds||[]), clientIds:new Set(sink.clientIds||[]), q:'' };
  const ttl=document.getElementById('ru-picker-title'); if(ttl) ttl.textContent=opts.title||'Choose recipients';
  const sub=document.getElementById('ru-picker-sub'); if(sub) sub.textContent=opts.sub||'';
  const s=document.getElementById('ru-search'); if(s){ s.value=''; s.placeholder=opts.includeClients?'Search roles, users, or contacts…':'Search users by name or email…'; }
  openModal('ru-picker-modal');
  renderRUList();
}
function openRolesUsersPicker(fieldId,target){
  const f=findFieldById(fieldId); if(!f) return;
  const notify = target==='notify';
  openRecipientPicker({
    title: notify ? 'Notify which roles, users & contacts?' : 'Hide from which roles & users?',
    sub: notify ? 'Selected recipients get an alert via the channels you chose.' : 'This field is hidden from the selected roles/users in the internal view.',
    sink: notify ? ensureFieldNotify(f) : ensureFieldScope(f),
    includeClients: notify,
    onApply: ()=>{ saveForm(); render(); }
  });
}
function renderRUList(){
  if(!RU_PICKER) return;
  const q=(document.getElementById('ru-search')||{value:''}).value.trim().toLowerCase();
  RU_PICKER.q=q;
  const roles=CLINICAL_ROLES.filter(r=>!q || r.toLowerCase().includes(q));
  let html='<div class="ru-sec-h">Disciplines / roles</div>';
  if(!CLINICAL_ROLES.length) html+='<div class="ru-empty">No disciplines yet — add them in Manage Users.</div>';
  else if(!roles.length) html+='<div class="ru-empty">No disciplines match.</div>';
  roles.forEach(r=>{
    const i=CLINICAL_ROLES.indexOf(r);
    const on=RU_PICKER.roles.has(r);
    html+=`<label class="ru-row"><input type="checkbox" ${on?'checked':''} onchange="ruToggleRoleIdx(${i},this.checked)"> <span class="ru-name">${esc(r)}</span><span class="ru-tag">discipline</span></label>`;
  });
  const users=USERS.filter(u=>!q || (u.name||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q) || (Array.isArray(u.tags)&&u.tags.some(t=>t.toLowerCase().includes(q))));
  html+='<div class="ru-sec-h">Users</div>';
  if(!users.length){ html+='<div class="ru-empty">No users match.</div>'; }
  users.forEach(u=>{
    const on=RU_PICKER.userIds.has(u.id);
    const tagStr=(Array.isArray(u.tags)&&u.tags.length)?u.tags.join(', '):'';
    html+=`<label class="ru-row"><input type="checkbox" ${on?'checked':''} onchange="ruToggleUser('${u.id}',this.checked)"> <span class="ru-avatar">${esc(initialsFor(u.name))}</span><span class="ru-name">${esc(u.name)}<span class="ru-email">${esc(u.email||'')}${tagStr?' · '+esc(tagStr):''}</span></span><span class="role-badge ${u.role}">${u.role}</span></label>`;
  });
  if(RU_PICKER.includeClients){
    const clients=CLIENTS.filter(c=>!q || (c.name||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q) || (c.mrn||'').toLowerCase().includes(q));
    html+='<div class="ru-sec-h">Contacts</div>';
    if(!CLIENTS.length){ html+='<div class="ru-empty">No contacts yet — add them in the Contact Directory.</div>'; }
    else if(!clients.length){ html+='<div class="ru-empty">No contacts match.</div>'; }
    clients.forEach(c=>{
      const on=RU_PICKER.clientIds.has(c.id);
      html+=`<label class="ru-row"><input type="checkbox" ${on?'checked':''} onchange="ruToggleClient('${c.id}',this.checked)"> <span class="ru-avatar">${esc(initialsFor(c.name))}</span><span class="ru-name">${esc(c.name)}<span class="ru-email">${esc(c.email||'')}${c.mrn?' · '+esc(c.mrn):''}</span></span><span class="ru-tag">contact</span></label>`;
    });
  }
  const mount=document.getElementById('ru-list'); if(mount) mount.innerHTML=html;
}
function ruToggleRoleIdx(i,on){ const r=CLINICAL_ROLES[i]; if(r) ruToggleRole(r,on); }
function ruToggleRole(v,on){ if(!RU_PICKER)return; if(on)RU_PICKER.roles.add(v); else RU_PICKER.roles.delete(v); }
function ruToggleUser(id,on){ if(!RU_PICKER)return; if(on)RU_PICKER.userIds.add(id); else RU_PICKER.userIds.delete(id); }
function ruToggleClient(id,on){ if(!RU_PICKER)return; if(on)RU_PICKER.clientIds.add(id); else RU_PICKER.clientIds.delete(id); }
function ruConfirm(){
  if(!RU_PICKER){ closeModal('ru-picker-modal'); return; }
  if(currentFormReadOnly()){ RU_PICKER=null; closeModal('ru-picker-modal'); return; }
  const sink=RU_PICKER.sink;
  if(sink){
    const validRoles=new Set(CLINICAL_ROLES);
    sink.roles=Array.from(RU_PICKER.roles).filter(r=>validRoles.has(r));
    sink.userIds=Array.from(RU_PICKER.userIds).filter(id=>USERS.some(u=>u.id===id));
    if(RU_PICKER.includeClients) sink.clientIds=Array.from(RU_PICKER.clientIds).filter(id=>CLIENTS.some(c=>c.id===id));
  }
  const cb=RU_PICKER.onApply;
  RU_PICKER=null;
  closeModal('ru-picker-modal');
  if(typeof cb==='function') cb();
}

/* Drop empty access/notify config so it doesn't bloat storage or the export. */
function pruneFieldMeta(){
  FORM.rows.forEach(r=>r.fields.forEach(f=>{
    if(f.hideUsersScope && !f.hideUsers) delete f.hideUsersScope;
    if(f.hideUsersScope){ const s=f.hideUsersScope; if(!(s.roles&&s.roles.length)&&!(s.userIds&&s.userIds.length) && !f.hideUsers) delete f.hideUsersScope; }
    if(f.notify){ const n=f.notify; const empty=!n.sms&&!n.email&&!n.patient&&!(n.roles&&n.roles.length)&&!(n.userIds&&n.userIds.length); if(empty) delete f.notify; }
  }));
}

/* ----- Field search (builder finder) -----
   Highlights matching fields on the canvas and dims the rest, scrolling to the
   first hit. Pure view-layer — never affects the form data or the export. */
function setFieldSpan(fieldId,span){
  const f=findFieldById(fieldId);
  if(!f) return;
  f.span=Math.min(12,Math.max(1,span|0));
  render();
}

/* Smooth width dragging: update the field's grid span live via CSS as the
   slider moves (no full re-render, so it glides), without committing odd
   in-between values to the model yet. */
function previewFieldSpanLive(fieldId, span){
  span=Math.min(12,Math.max(1,span|0));
  document.querySelectorAll('.field[data-field-id="'+CSS.escape(fieldId)+'"]').forEach(el=>{
    el.style.setProperty('--span', span);
  });
}
/* On release, snap to the nearest preset (¼=3, ⅓=4, ½=6, Full=12). */
function commitFieldSpanSnapped(fieldId, span){
  const presets=[3,4,6,12];
  let best=presets[0], bd=Infinity;
  presets.forEach(p=>{ const d=Math.abs(p-span); if(d<bd){ bd=d; best=p; } });
  setFieldSpan(fieldId, best);
}
/* Smooth height dragging for textarea/paragraph fields. */
function previewFieldHeightLive(fieldId, mult){
  mult=Math.max(1,Math.min(10,Number(mult)||1));
  const cap=Math.round(90*mult);
  document.querySelectorAll('.field[data-field-id="'+CSS.escape(fieldId)+'"] textarea').forEach(ta=>{
    ta.style.maxHeight=cap+'px';
    ta.style.minHeight=Math.min(cap,90)+'px';
  });
  const cap2=document.querySelector('.inspector-field label .mh-cap');
  if(cap2) cap2.textContent=mult+'× — auto-grows up to this cap';
}
function commitFieldHeight(fieldId, mult){
  const f=findFieldById(fieldId);
  if(!f) return;
  f.heightMultiplier=Math.max(1,Math.min(10,Number(mult)||1));
  render();
}

/* Drag auto-scroll: native HTML5 drags don't scroll a container at the edges.
   A document-level dragover (non-passive, preventDefault while one of OUR drags
   is active) marks the whole document as a valid drag surface so dragover keeps
   firing at the edges; a rAF loop then scrolls continuously while the pointer
   sits in the edge band, even if held still, until dragend/drop. */
let __dragScrollBound=false;
let __dragScrollY=null, __dragScrollRAF=null;
function ensureDragAutoScroll(){
  if(__dragScrollBound) return; __dragScrollBound=true;
  const EDGE=80, MAXV=24;
  function scroller(){ return document.getElementById('canvas-wrap') || document.getElementById('preview-wrap'); }
  function tick(){
    if(__dragScrollY==null){ __dragScrollRAF=null; return; }
    const sc=scroller();
    if(sc){
      const r=sc.getBoundingClientRect(), y=__dragScrollY; let dv=0;
      if(y < r.top+EDGE)         dv = -MAXV * Math.min(1,(r.top+EDGE - y)/EDGE);
      else if(y > r.bottom-EDGE) dv =  MAXV * Math.min(1,(y - (r.bottom-EDGE))/EDGE);
      if(dv!==0) sc.scrollTop += dv;
    }
    __dragScrollRAF=requestAnimationFrame(tick);
  }
  function start(){ if(__dragScrollRAF==null) __dragScrollRAF=requestAnimationFrame(tick); }
  function stop(){ __dragScrollY=null; if(__dragScrollRAF!=null){ cancelAnimationFrame(__dragScrollRAF); __dragScrollRAF=null; } }
  document.addEventListener('dragover',function(e){
    if(!draggedData) return;
    e.preventDefault();
    __dragScrollY=e.clientY;
    start();
  }, false);
  document.addEventListener('dragend', stop, true);
  document.addEventListener('drop',    stop, true);
}

function insertRowBefore(ridx){
  // Inherit the page of the row we're inserting before so the new row lands
  // on the same page it's visually adjacent to.
  const page=FORM.rows[ridx]?pageOf(FORM.rows[ridx]):BUILDER_PAGE;
  FORM.rows.splice(ridx,0,{id:uid('r'),fields:[],page});
  render();
}

/* Relocate a whole row. Rows carry their fields (and therefore their
   weight-group membership, which references field ids) with them, so no
   weight-group bookkeeping is needed — only the row order changes. We splice
   by index; the caller passes the destination index in PRE-removal terms and
   we adjust for the leftward shift when moving a row downward, mirroring the
   same off-by-one handling moveField() uses.

   Cross-page drags (only possible in all-pages mode, where every row is
   visible at once) used to leave the row tagged with its old page even after
   landing between rows of a different page, producing interleaved page
   sections. We now adopt the destination's page from whichever neighbor
   ended up adjacent — preferring the row immediately above, falling back to
   the row immediately below, and finally to BUILDER_PAGE if the row is alone.
   Then relocateRowToMatchPage normalises position so the rest of the flat
   array stays contiguous per page. */
function moveRow(fromIdx, toIdx){
  if(fromIdx===toIdx) return;
  if(!FORM.rows[fromIdx]) return;
  const maxIdx=FORM.rows.length;
  toIdx=Math.max(0, Math.min(toIdx, maxIdx));
  const [row]=FORM.rows.splice(fromIdx,1);
  // Removing an earlier row shifts everything after it left by one.
  let insertAt=toIdx;
  if(toIdx>fromIdx) insertAt--;
  insertAt=Math.max(0, Math.min(insertAt, FORM.rows.length));
  FORM.rows.splice(insertAt,0,row);
  // Inherit the page of an adjacent row. Prefer the row above (typical
  // "drop below this row" intent); fall back to the row below; finally
  // BUILDER_PAGE if the row is the only one in the form.
  const above=FORM.rows[insertAt-1];
  const below=FORM.rows[insertAt+1];
  const inheritedPage = above ? pageOf(above)
                      : below ? pageOf(below)
                      : BUILDER_PAGE;
  if(pageOf(row)!==inheritedPage){
    row.page=inheritedPage;
    // The row is now correctly placed AND correctly tagged. No further
    // shuffling needed — its neighbors share its page by construction.
  }
  render();
}

function deleteRow(ridx){
  const row=FORM.rows[ridx];
  const fidsToRemove=new Set(row.fields.map(f=>f.id));
  FORM.rows.splice(ridx,1);
  // Prune weight-group memberships for the removed fields; pruneWeightGroups
  // also discards any group that drops below 2 members (a 1-field weight
  // group is meaningless).
  pruneWeightGroups();
  // Strip removed fields from any scoring section so the next preview total
  // doesn't reference ghosts.
  pruneScoringSections();
  if(SELECTED&&fidsToRemove.has(SELECTED.fieldId)) SELECTED=null;
  render();
}

/* Delete a SINGLE field (by id), leaving the other fields in its row intact —
   this is what the right-click context menu uses. Contrast with deleteRow,
   which removes the whole row and every field on it. If the deleted field was
   the only one in its row, the now-empty row is removed too. Cleanup mirrors
   deleteRow: prune weight-group + scoring-section memberships that referenced
   the removed field, and clear the selection if it pointed at it. */
function deleteFieldById(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  let removed=false;
  for(let ri=0; ri<FORM.rows.length; ri++){
    const fi=FORM.rows[ri].fields.findIndex(f=>f.id===fieldId);
    if(fi!==-1){
      FORM.rows[ri].fields.splice(fi,1);
      // Drop the row entirely if deleting that field emptied it.
      if(FORM.rows[ri].fields.length===0) FORM.rows.splice(ri,1);
      removed=true;
      break;
    }
  }
  if(!removed) return; // field already gone (e.g., deleted via another path)
  pruneWeightGroups();
  pruneScoringSections();
  if(SELECTED && SELECTED.fieldId===fieldId) SELECTED=null;
  render();
  toast('Field deleted');
}

/* ─── Field right-click context menu ────────────────────────────────────────
   A small menu, anchored at the cursor, for acting on one specific field.
   #field-ctx-menu is a single shared element; we stash the target field id on
   CTX_MENU_FIELD_ID while it's open. Outside-click, right-click elsewhere,
   scroll, resize, Escape, or choosing an item all dismiss it (wired once at
   boot in the listeners below). */
let CTX_MENU_FIELD_ID=null;

function openFieldContextMenu(e, fieldId){
  e.preventDefault();   // suppress the browser's native context menu
  e.stopPropagation();
  // Nothing to delete on a read-only form — fall back to no menu.
  if(currentFormReadOnly()) return;
  const menu=document.getElementById('field-ctx-menu');
  if(!menu) return;
  CTX_MENU_FIELD_ID=fieldId;
  // Also select the field so the highlight makes the menu's target obvious
  // and the inspector reflects it. render() rebuilds the canvas but leaves
  // #field-ctx-menu (it lives outside the canvas) untouched.
  SELECTED={fieldId};
  render();
  // Show first so we can measure it, then clamp within the viewport.
  menu.classList.add('open');
  menu.setAttribute('aria-hidden','false');
  const mw=menu.offsetWidth, mh=menu.offsetHeight;
  let x=e.clientX, y=e.clientY;
  if(x+mw > window.innerWidth-8)  x=window.innerWidth-mw-8;
  if(y+mh > window.innerHeight-8) y=window.innerHeight-mh-8;
  menu.style.left=Math.max(8,x)+'px';
  menu.style.top =Math.max(8,y)+'px';
}

function closeFieldContextMenu(){
  const menu=document.getElementById('field-ctx-menu');
  if(menu){ menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); }
  CTX_MENU_FIELD_ID=null;
}

function contextMenuDeleteField(){
  const id=CTX_MENU_FIELD_ID;
  closeFieldContextMenu();
  if(id) deleteFieldById(id);
}

function openSaveBlockModal(fieldObjs){
  SAVEBLOCK_FIELDS = fieldObjs.slice();
  let html='';
  SAVEBLOCK_FIELDS.forEach((f)=>{
    html+=`<label class="save-block-fieldrow"><input type="checkbox" checked> ${esc(f.label||'Untitled')}</label>`;
  });
  document.getElementById('saveblock-fields').innerHTML=html;
  document.getElementById('saveblock-name').value='';
  openModal('saveblock-modal');
}

function saveRowAsBlock(ridx){
  openSaveBlockModal(FORM.rows[ridx].fields);
}

function confirmSaveBlock(){
  const checks=document.querySelectorAll('#saveblock-fields input[type=checkbox]');
  const src=SAVEBLOCK_FIELDS||[];
  const fields=Array.from(checks).map((c,i)=>c.checked?JSON.parse(JSON.stringify(src[i])):null).filter(Boolean);
  if(fields.length===0){toast('Select at least one field');return;}
  const name=document.getElementById('saveblock-name').value.trim();
  if(!name){toast('Block name required');return;}
  BLOCKS.push({id:uid('b'),name,fields});
  saveBlocks();closeModal('saveblock-modal');
  SAVEBLOCK_FIELDS=null;
  exitBlockSelect();      // also re-renders the Blocks tab
  toast('Block saved!');
}

function deleteBlock(idx){
  const b=BLOCKS[idx];
  if(b && !confirm('Delete the block “'+(b.name||'Untitled')+'”? This cannot be undone.')) return;
  BLOCKS.splice(idx,1);
  saveBlocks();renderBlocksTab();
}

/* ---- Build a block from fields selected across the canvas ----
   Mirrors the Weights workflow: pick fields on one or more rows, then cluster
   them. Order follows the fields' current canvas position, so reorganizing on
   the canvas before saving fixes a block's order. */
function blockSelOrderMap(){
  const m={}; let n=0;
  if(!BLOCK_SELECT_MODE) return m;
  FORM.rows.forEach(r=>r.fields.forEach(f=>{ if(BLOCK_SEL.includes(f.id)) m[f.id]=++n; }));
  return m;
}
function selectedFieldsInCanvasOrder(){
  const out=[];
  FORM.rows.forEach(r=>r.fields.forEach(f=>{ if(BLOCK_SEL.includes(f.id)) out.push(f); }));
  return out;
}
function startBlockSelect(){
  setLeftTab('blocks');
  BLOCK_SELECT_MODE=true; BLOCK_SEL=[]; SELECTED=null;
  document.getElementById('inspector').classList.remove('open');
  renderCanvas(); renderBlocksTab();
  document.body.classList.add('block-selecting');
  updateBlockSelectBar();
  toast('Click fields across rows to add them to a block');
}
function exitBlockSelect(){
  BLOCK_SELECT_MODE=false; BLOCK_SEL=[];
  document.body.classList.remove('block-selecting');
  renderCanvas(); renderBlocksTab(); updateBlockSelectBar();
}
function cancelBlockSelect(){ exitBlockSelect(); }
function clearBlockSel(){ BLOCK_SEL=[]; renderCanvas(); updateBlockSelectBar(); }
function saveSelectionAsBlock(){
  const fields=selectedFieldsInCanvasOrder();
  if(!fields.length){ toast('Select at least one field first'); return; }
  openSaveBlockModal(fields);
}
function updateBlockFromSelection(blockId){
  const idx=BLOCKS.findIndex(b=>b.id===blockId);
  if(idx<0) return;
  const fields=selectedFieldsInCanvasOrder().map(f=>JSON.parse(JSON.stringify(f)));
  if(!fields.length){ toast('Select at least one field first'); return; }
  const nm=BLOCKS[idx].name;
  BLOCKS[idx].fields=fields;
  saveBlocks();
  exitBlockSelect();
  toast('Updated “'+nm+'” to the current order');
}
function updateBlockSelectBar(){
  const bar=document.getElementById('block-select-bar');
  if(!bar) return;
  if(!BLOCK_SELECT_MODE){ bar.classList.remove('show'); bar.innerHTML=''; return; }
  // Drop any ids whose field was deleted while selecting, so the count is honest.
  BLOCK_SEL = BLOCK_SEL.filter(id=>!!findFieldById(id));
  const n=BLOCK_SEL.length;
  const opts=BLOCKS.map(b=>`<option value="${b.id}">${esc(b.name)}</option>`).join('');
  bar.innerHTML=`<span class="bsb-count">${n} field${n===1?'':'s'} selected</span>
    <button class="btn primary" ${n?'':'disabled'} onclick="saveSelectionAsBlock()">Save as new block</button>
    <select id="bsb-update-sel" ${n&&BLOCKS.length?'':'disabled'}>
      <option value="" disabled selected>Update existing block…</option>${opts}
    </select>
    <button class="btn" ${n?'':'disabled'} onclick="clearBlockSel()">Clear</button>
    <button class="btn" onclick="cancelBlockSelect()">Done</button>`;
  bar.classList.add('show');
  const sel=document.getElementById('bsb-update-sel');
  if(sel){ sel.onchange=function(){ const v=sel.value; sel.selectedIndex=0; if(v) updateBlockFromSelection(v); }; }
}

function setLeftTab(tab){
  document.querySelectorAll('.left-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.getElementById('left-fields').style.display=(tab==='fields')?'block':'none';
  document.getElementById('left-blocks').style.display=(tab==='blocks')?'block':'none';
}

function signPadHTML(id, required){
  return `<div class="sign-pad" data-field-id="${id}"${required?' data-required="1"':''} style="border:1px solid var(--border,#dde8e3);border-radius:10px;background:#fff;padding:6px 6px 2px">`
    +`<canvas class="sign-canvas" width="640" height="150" style="display:block;width:100%;height:150px;touch-action:none;cursor:crosshair;border-bottom:1px dashed var(--border,#dde8e3);border-radius:6px"></canvas>`
    +`<input type="hidden" class="sign-val" name="${id}">`
    +`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 2px 4px;font-size:12px;color:var(--text-muted,#8aaa9a)">`
    +`<span class="sign-hint">Sign above with mouse or finger</span>`
    +`<button type="button" class="sign-clear" style="font:600 12px Sora,system-ui,sans-serif;color:#0a3d2b;background:#edfaf4;border:1px solid #d4f4e8;border-radius:999px;padding:5px 12px;cursor:pointer">Clear</button>`
    +`</div></div>`;
}
function previewControl(f){
  const ph=f.placeholder||'';
  const help=f.help?`<div class="pf-help">${esc(f.help)}</div>`:'';
  const lbl=()=>`<label class="pf-field-label">${esc(f.label)}${f.required?'<span class="req">*</span>':''}</label>`;
  const req=f.required?' required':'';
  switch(f.type){
    case 'text':      return `${lbl()}<input type="text" placeholder="${esc(ph)}" spellcheck="true"${req}>${help}`;
    case 'textarea': {
      // Auto-growing textarea capped by the field's height multiplier.
      // Default cap is the base 90px; multiplier 1..10 lets the builder
      // raise the cap up to 10× for long-form answers. The runtime
      // auto-grow listener (attached on the preview mount) resizes the
      // textarea on input up to this cap, then it scrolls internally.
      const mult = Math.max(1, Math.min(10, Number(f.heightMultiplier)||1));
      const baseMin = 90;
      const cap = Math.round(baseMin * mult);
      return `${lbl()}<textarea placeholder="${esc(ph)}" spellcheck="true" data-autogrow="1" style="min-height:${baseMin}px;max-height:${cap}px;overflow-y:auto"${req}></textarea>${help}`;
    }
    case 'email':     return `${lbl()}<input type="email" placeholder="${esc(ph)}" spellcheck="true"${req}>${help}`;
    case 'phone': {
      const fa=PREVIEW_ANSWERS[f.id];
      let mainVal='', extVal='';
      if(typeof fa==='string'){ const parts=fa.split(/\s*x/i); mainVal=(parts[0]||'').trim(); extVal=(parts[1]||'').trim(); }
      const main=`<input type="tel" inputmode="tel" data-phone-mask pattern="\\(\\d{3}\\) \\d{3}-\\d{4}" placeholder="${esc(ph||'(555) 123-4567')}" maxlength="14" spellcheck="false" class="pf-phone-main"${mainVal?` value="${esc(mainVal)}"`:''}${req}>`;
      if(f.phoneExt){
        return `${lbl()}<div class="pf-phone-ext">${main}<input type="text" inputmode="numeric" class="pf-phone-ext-in" data-phone-ext placeholder="Ext." maxlength="6" aria-label="Extension"${extVal?` value="${esc(extVal)}"`:''}></div>${help}`;
      }
      return `${lbl()}${main}${help}`;
    }
    case 'number':    return `${lbl()}<input type="number" placeholder="${esc(ph)}" spellcheck="false"${req}>${help}`;
    case 'url':       return `${lbl()}<input type="text" inputmode="url" placeholder="${esc(ph)}" pattern="${URL_INPUT_PATTERN}" title="Enter a website like example.com — https:// is optional" spellcheck="true"${req}>${help}`;
    case 'password':  return `${lbl()}<input type="password" placeholder="${esc(ph)}" spellcheck="false"${req}>${help}`;
    case 'date':      return `${lbl()}<input type="date"${req}>${help}`;
    case 'time':      { const tv=PREVIEW_ANSWERS[f.id]||''; return `${lbl()}<div class="pf-timepicker">${timePicker12HTML('pf-time',{required:f.required,value:tv})}</div>${help}`; }
    case 'totaltime': { const tta=PREVIEW_ANSWERS[f.id]||{}; return `${lbl()}<div class="pf-totaltime" data-field-id="${esc(f.id)}"${f.required?' data-required="1"':''}>
        <div class="pf-tt-part"><span class="pf-tt-sub">Start Time</span>${timePicker12HTML('pf-tt-start',{required:f.required,value:tta.start||''})}</div>
        <div class="pf-tt-part"><span class="pf-tt-sub">End Time</span>${timePicker12HTML('pf-tt-end',{required:f.required,value:tta.end||''})}</div>
        <div class="pf-tt-part"><span class="pf-tt-sub">Total Time</span><input type="text" class="pf-tt-total" readonly tabindex="-1" placeholder="0h 0m"></div>
      </div>${help}`; }
    case 'color':     return `${lbl()}<input type="color" value="#1a8a66" style="height:42px;padding:4px">${help}`;
    case 'statusbar': return previewStatusBarHTML(f);
    case 'file':      return `${lbl()}<input type="file"${req}>${help}`;
    case 'range': {
      const min=Number(f.min)||0, max=(f.max!=null?Number(f.max):100), step=(Number(f.step)||1);
      // Restore a persisted answer; otherwise start the thumb at the native
      // midpoint. We snap to the step grid and round to the step's precision so
      // the number shown always equals where the thumb actually lands.
      const saved=PREVIEW_ANSWERS[f.id];
      let val=(saved!=null && isFinite(Number(saved))) ? Number(saved) : (min+(max-min)/2);
      if(step>0) val=min+Math.round((val-min)/step)*step;
      val=Math.min(max,Math.max(min,val));
      const dec=(String(step).split('.')[1]||'').length;
      val=Number(val.toFixed(dec));
      return `${lbl()}<div class="pf-range-wrap"><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" oninput="this.parentNode.querySelector('.pf-range-val').textContent=this.value"><output class="pf-range-val">${esc(String(val))}</output></div>${help}`;
    }
    case 'select': {
      // Reflect the persisted answer (if any) so multi-page nav doesn't lose
      // the selection. We render the placeholder option as selected only when
      // PREVIEW_ANSWERS has no entry; otherwise the matching option carries
      // the `selected` attribute. The custom enhanced dropdown reads from
      // the native <select>'s selectedIndex on init, so this is enough.
      const ans=PREVIEW_ANSWERS[f.id];
      const sel=(idx)=>(ans!=null && Number(ans)===idx)?' selected':'';
      const placeholderSel=(ans==null)?' selected':'';
      return `${lbl()}<select class="enhance-dd" data-field-id="${f.id}"${req}><option value="" disabled${placeholderSel}>Choose…</option>${(f.options||[]).map((o,i)=>`<option value="${i}"${sel(i)}>${esc(o)}</option>`).join('')}</select>${help}`;
    }
    case 'radio': {
      const ans=PREVIEW_ANSWERS[f.id];
      const chk=(i)=>(ans!=null && Number(ans)===i)?' checked':'';
      return `${lbl()}<div class="pf-opts${f.optionLayout==='horizontal'?' pf-opts-h':''}" data-field-id="${f.id}">${(f.options||[]).map((o,i)=>`<label class="pf-opt"><input type="radio" name="${f.id}" data-opt-idx="${i}"${chk(i)}${req&&i===0?' required':''}> ${esc(o)}</label>`).join('')}</div>${help}`;
    }
    case 'checkboxes': {
      const ans=PREVIEW_ANSWERS[f.id];
      const chk=(i)=>(ans instanceof Set && ans.has(i))?' checked':'';
      return `${lbl()}<div class="pf-opts${f.optionLayout==='horizontal'?' pf-opts-h':''}" data-field-id="${f.id}">${(f.options||[]).map((o,i)=>`<label class="pf-opt"><input type="checkbox" data-opt-idx="${i}"${chk(i)}> ${esc(o)}</label>`).join('')}</div>${help}`;
    }
    case 'matrix':    return `${lbl()}${matrixGridHTML(f,'preview')}${help}`;
    case 'checkbox':  return `<label class="pf-opt"><input type="checkbox"${req}> ${esc(f.label)}${f.required?'<span class="req">*</span>':''}</label>${help}`;
    case 'toggle':    return (f.toggleStyle==='checkbox')
      ? `<label class="pf-opt"><input type="checkbox"${PREVIEW_ANSWERS[f.id]?' checked':''}> ${esc(f.label)}</label>${help}`
      : `${lbl()}${toggleSwitchHTML(f, !!PREVIEW_ANSWERS[f.id])}${help}`;
    case 'rating': {
      const max=Math.max(1, Math.min(10, Number(f.max)||5));
      const cur=Number(PREVIEW_ANSWERS[f.id])||0;
      return `${lbl()}<div class="pf-rating" data-max="${max}">${Array.from({length:max},(_,i)=>`<span class="pf-star${i<cur?' on':''}" data-v="${i+1}" role="button" aria-label="${i+1} of ${max}">★</span>`).join('')}</div>${help}`;
    }
    case 'signature': return `${lbl()}${signPadHTML(f.id, f.required)}${help}`;
    case 'heading':   return `<div class="pf-heading">${esc(f.label)}</div>`;
    case 'paragraph': {
      const pph=f.placeholder||'Add a paragraph of text…';
      const pmult=Math.max(1,Math.min(10,Number(f.heightMultiplier)||1));
      const pcap=Math.round(220*pmult);
      return `${lbl()}<textarea placeholder="${esc(pph)}" spellcheck="true" data-autogrow="1" style="min-height:200px;max-height:${pcap}px;overflow-y:auto"${req}></textarea>${help}`;
    }
    case 'divider':   return `<div class="pf-divider"></div>`;
    default:          return `${lbl()}<input type="text" placeholder="${esc(ph)}" spellcheck="true"${req}>${help}`;
  }
}

function renderPreview(){
  ensureScoringInit();
  const m=document.getElementById('preview-mount');
  const pages=pageCount();
  if(PREVIEW_PAGE>pages) PREVIEW_PAGE=pages;
  if(PREVIEW_PAGE<1) PREVIEW_PAGE=1;
  let html=`<div class="pf-viewbar" role="group" aria-label="Preview audience">
    <span class="pf-viewbar-label">Viewing as</span>
    <div class="pf-viewseg">
      <button type="button" class="pf-viewopt${PREVIEW_VIEW==='clinician'?' on':''}" onclick="setPreviewView('clinician')">Clinician / User</button>
      <button type="button" class="pf-viewopt${PREVIEW_VIEW==='patient'?' on':''}" onclick="setPreviewView('patient')">Patient / Contact</button>
    </div>
    <span class="pf-viewbar-note">${PREVIEW_VIEW==='patient'?'Clinician-only fields'+(EXPORT_SHOW_SCORES?'':' &amp; scores')+' hidden':'Showing everything, incl. clinician-only fields &amp; scores'}</span>
  </div>`;
  html+=`<h1>${esc(FORM.title||'Untitled form')}</h1>`;
  if(FORM.desc) html+=`<div class="pf-desc">${esc(FORM.desc)}</div>`;
  if(FORM.rows.length===0) html+=`<div class="pf-para">No fields yet. Switch to Build to add some.</div>`;
  // Resolve which pages are actually visible right now (page rules can skip a
  // whole section), and snap the current page onto a visible one.
  const visPages=visiblePreviewPages();
  if(visPages.indexOf(PREVIEW_PAGE)<0){ PREVIEW_PAGE = visPages.find(p=>p>=PREVIEW_PAGE) || visPages[visPages.length-1]; }
  const vpos=visPages.indexOf(PREVIEW_PAGE);
  const visTotal=visPages.length;
  // No automatic progress bar — a progress bar appears ONLY if the designer adds
  // a Progress Bar field. Multi-page forms still get a lightweight page indicator
  // for orientation (no completion %).
  if(visTotal>1){
    html+=`<div class="pf-page-indicator">Page ${vpos+1} of ${visTotal}</div>`;
  }
  // Progress-bar fields set to "top" or "top & bottom" render a copy at the top
  // of the current page (their inline placement acts as the bottom anchor).
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==PREVIEW_PAGE || !evalShowIf(row.showIf)) return;
    row.fields.forEach(f=>{ if(f.type==='statusbar' && pbMode(f)==='pageBetween' && (pbPlace(f)==='top'||pbPlace(f)==='both')) html+=`<div class="pf-statusbar-top">${previewStatusBarHTML(f)}</div>`; });
  });
  html+=`<div class="pf-rows">`;
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==PREVIEW_PAGE) return; // show only the current preview page
    const rowHidden=!evalShowIf(row.showIf);
    html+=`<div class="pf-row${rowHidden?' cond-hidden':''}" data-row-id="${row.id}">${row.fields.map(f=>{const span=f.span||defaultSpanFor(f.type);const sc=SHORT_TYPES.has(f.type)?' pf-short':'';const of=(f.type==='checkbox'||(f.type==='toggle'&&f.toggleStyle==='checkbox'))?' pf-optfield':'';const topOnlySB=(f.type==='statusbar'&&pbMode(f)==='pageBetween'&&pbPlace(f)==='top');const fh=(rowHidden||!evalShowIf(f.showIf)||!groupVisible(f)||fieldHiddenInPreview(f)||topOnlySB)?' cond-hidden':'';return `<div class="pf-field${sc}${of}${fh}" data-field-id="${f.id}" style="--span:${span}">${previewControl(f)}</div>`;}).join('')}</div>`;
  });
  html+=`</div>`;
  // Score panel — show one card per scoring section that contains at least
  // one field. The card updates live as the user fills the form. We render
  // a placeholder here and let updatePreviewScores() compute the actual
  // numbers after the DOM is in place (it reads the rendered inputs).
  const sectionsWithFields=FORM.scoringSections.filter(s=>s.fieldIds.length>0);
  // Scores show in the clinician view always; in the patient view only when the
  // form is configured to surface them to respondents (EXPORT_SHOW_SCORES).
  const scoresVisible = PREVIEW_VIEW==='clinician' || EXPORT_SHOW_SCORES;
  // Safety alerts (risk/critical banners) must reach the patient even when the
  // numeric score is hidden — mirror the export, which surfaces alert banners
  // regardless of the cosmetic "show scores" toggle.
  const anyAlert = sectionsWithFields.some(s=> s.alert && ((s.alert.on && (Number(s.alert.min)||0)>0) || (s.alert.critical||[]).some(c=>c&&c.fieldId&&(c.options||[]).length)) );
  const showScorePanel = sectionsWithFields.length>0 && (scoresVisible || anyAlert);
  if(showScorePanel){
    html+=`<div class="pf-score-panel${scoresVisible?'':' alerts-only'}" id="pf-score-panel">`;
    if(scoresVisible) html+=`<div class="pf-score-panel-h">Score</div>`;
    sectionsWithFields.forEach(s=>{
      if(scoresVisible){
        html+=`<div class="pf-score-card" data-section-id="${s.id}">
          <div class="pfsc-name">${esc(s.name)}</div>
          <div class="pfsc-band" data-role="band" style="display:none"></div>
          <div class="pfsc-total" data-role="total">0<span class="pfsc-max"> / ${sectionMaxScore(s)}</span></div>
        </div>`;
      }
      html+=`<div class="pf-score-alert" data-section-id="${s.id}" style="display:none"></div>`;
    });
    html+=`</div>`;
  }
  if(FORM.rows.length){
    if(visTotal>1){
      // Multi-page: Back / Next walk only visible pages; Submit on the last.
      const prevP=visPages[vpos-1], nextP=visPages[vpos+1];
      html+=`<div class="pf-page-nav">
        <button class="btn" type="button" ${vpos<=0?'disabled':''} onclick="gotoPreviewPage(${prevP||1})">← Back</button>
        ${nextP==null
          ? `<button class="btn primary" type="button" onclick="validatePreviewAndSubmit()">Submit</button>`
          : `<button class="btn primary" type="button" onclick="gotoPreviewPage(${nextP})">Next →</button>`}
      </div>`;
    } else {
      html+=`<div class="pf-submit"><button class="btn primary" type="button" onclick="validatePreviewAndSubmit()">Submit</button></div>`;
    }
  }
  m.innerHTML=html;
  // Apply form-level style overrides (font/size/color) as inline CSS vars
  // on the preview-form root. No-op when FORM.style has no overrides, so
  // forms with no custom style keep the Credify default look.
  applyFormStyleToPreview(m);
  enhanceDropdowns(m);
  markPlaceholderSelects(m);
  // Wire up live scoring AFTER the DOM is mounted. We attach a single
  // delegated change listener on the preview mount so radios, checkboxes,
  // and selects all flow through one handler. Initial paint also runs so
  // the cards show a sensible 0 instead of being blank.
  attachPreviewScoring(m);
  // Auto-populate keyed fields from the shared profile, then resolve branch
  // visibility (a prefilled controller can reveal a branch) and paint scores.
  applyPrefillToPreview();
  applySampleValuesToPreview();
  settlePreviewVisibility();
  applyPreviewVisibilityDOM();
  updatePreviewScores(); updatePreviewProgress();
}

/* Wire up live scoring on the preview. Uses event delegation so we only
   attach one listener regardless of how many fields exist. We bind here
   each time the preview renders; since renderPreview replaces the mount's
   innerHTML, any prior listeners on inner elements are already gone, so
   we don't have to manage cleanup. */
function attachPreviewScoring(mount){
  if(!mount) return;
  // Capture every value change inside the preview into PREVIEW_ANSWERS so
  // answers persist across page navigation in multi-page forms. addEventListener
  // de-dupes on same fn reference, so re-attaching across renders is safe.
  mount.addEventListener('change', onPreviewAnswerChange);
  mount.addEventListener('change', onPreviewSelectPlaceholder);
  mount.addEventListener('focusout', onPreviewFieldBlur);      // field-level validation as you go
  mount.addEventListener('input', onPreviewFieldLiveClear);    // clear red the moment it's valid
  mount.addEventListener('change', onPreviewFieldLiveClear);
  mount.addEventListener('input', onPreviewAnswerChange); // live text/number conditions
  mount.addEventListener('click', onPreviewRatingClick);  // interactive star ratings
  mount.addEventListener('mousedown', onPreviewRadioMousedown); // deselect radios by clicking the label
  // Auto-grow textareas marked [data-autogrow]. On every input event we
  // reset height to 'auto' (so the textarea can shrink when the user deletes
  // text) and then set it to scrollHeight clamped by the CSS max-height,
  // giving us "grow until the cap, then scroll internally" behavior. Using
  // event delegation means one listener handles every textarea regardless
  // of how many the form has, and re-attaching is a no-op (same fn ref).
  mount.addEventListener('input', onPreviewAutoGrowInput);
  // Live US phone masking: format digits as (555) 123-4567 while typing.
  mount.addEventListener('input', onPreviewPhoneInput);
  // Wheel passthrough: a focused number/range input would otherwise swallow the
  // mouse wheel to change its own value, making the preview feel un-scrollable
  // while a field is active. Blurring it on wheel lets the scroll fall through
  // to the page. Passive (no preventDefault) so the scroll itself proceeds.
  mount.addEventListener('wheel', onPreviewWheelPassthrough, {passive:true});
  // Live Total Time: recompute Start→End duration when either changes.
  mount.addEventListener('input', onPreviewTotalTimeInput);
  mount.addEventListener('change', onPreviewTotalTimeInput);
  // Initial pass so any pre-filled textareas start at the right height
  // instead of jumping after the first keystroke.
  mount.querySelectorAll('textarea[data-autogrow]').forEach(autoGrowTextarea);
  // Format any prefilled phone values on first paint.
  mount.querySelectorAll('input[type="tel"][data-phone-mask]').forEach(function(inp){
    if(inp.value) inp.value=formatUSPhone(inp.value);
  });
  // Compute totals for any prefilled Total Time fields on first paint.
  mount.querySelectorAll('.pf-totaltime').forEach(function(box){
    const tot=box.querySelector('.pf-tt-total');
    if(tot) tot.value=computeTotalTime(readPicker12(box,'pf-tt-start'), readPicker12(box,'pf-tt-end'));
  });
  // Wire up the popup time pickers (hours/minutes/AM-PM panels).
  ttPickerInit(mount);
  wireSignPads(mount);
}

/* ---- 12-hour AM/PM time picker (used by Total Time) ----
   Native <input type=time> follows the OS locale, so to GUARANTEE AM/PM we
   render three <select>s: hour 1–12, minute 00–59, and AM/PM. Internally we
   always work in a 24h "HH:MM" string so the duration math is unambiguous. */

// Build the option lists once.
const TT_HOURS = Array.from({length:12},(_,i)=>i+1);            // 1..12
const TT_MINUTES = Array.from({length:60},(_,i)=>i);           // 0..59

/* Markup for one popup 12-hour time picker. Structure:
     .tt-picker
       <input type=hidden .tt-val>          ← canonical 24h "HH:MM" value
       <button .tt-trigger>                  ← shows the chosen time / "Select time"
       .tt-pop                               ← popup panel (hidden until open)
         .tt-col.tt-hours   (1–12 buttons)
         .tt-col.tt-mins    (00–59 buttons)
         .tt-ampm           (AM / PM toggle)
   `cls` is a class prefix so the three views can scope queries/styling.
   A single shared controller (ttPickerInit / the export's copy) wires clicks.
   The hidden input is the source of truth, so reading stays trivial. */
function timePicker12HTML(cls, opts){
  opts=opts||{};
  const disabled=opts.disabled?' disabled':'';
  const req=opts.required?' required':'';
  const valAttr=opts.value?` value="${esc(opts.value)}"`:'';
  const hoursBtns=TT_HOURS.map(h=>`<button type="button" class="tt-opt tt-h" data-h="${h}">${h}</button>`).join('');
  const minsBtns=TT_MINUTES.map(m=>`<button type="button" class="tt-opt tt-m" data-m="${m}">${String(m).padStart(2,'0')}</button>`).join('');
  return `<span class="tt-picker" data-tt>
    <input type="hidden" class="${cls}-val tt-val"${req}${valAttr}>
    <button type="button" class="tt-trigger"${disabled} aria-haspopup="dialog" aria-expanded="false"><span class="tt-trigger-label">Select time</span><span class="tt-trigger-caret">▾</span></button>
    <div class="tt-pop" role="dialog" aria-label="Choose time" hidden>
      <div class="tt-ampm"><button type="button" class="tt-ap-btn" data-ap="AM">AM</button><button type="button" class="tt-ap-btn" data-ap="PM">PM</button></div>
      <div class="tt-pop-cols">
        <div class="tt-col tt-hours"><div class="tt-col-cap">Hour</div><div class="tt-opts">${hoursBtns}</div></div>
        <div class="tt-col tt-mins"><div class="tt-col-cap">Min</div><div class="tt-opts">${minsBtns}</div></div>
      </div>
    </div>
  </span>`;
}

/* Read a picker (scoped to a container + class prefix) into a 24h "HH:MM"
   string, or '' if not set. The popup writes the canonical value into the
   hidden .tt-val input, so reading is just that input's value. */
function readPicker12(container, cls){
  if(!container) return '';
  const el=container.querySelector('.'+cls+'-val');
  return el ? (el.value||'') : '';
}

/* Format a 24h "HH:MM" string as a friendly "h:MM AM/PM". '' stays ''. */
function format12(hhmm){
  if(!hhmm) return '';
  const p=String(hhmm).split(':'); if(p.length<2) return '';
  let h=parseInt(p[0],10), m=parseInt(p[1],10);
  if(isNaN(h)||isNaN(m)) return '';
  const ap=h>=12?'PM':'AM';
  let h12=h%12; if(h12===0) h12=12;
  return h12+':'+String(m).padStart(2,'0')+' '+ap;
}

/* Wire up every popup time picker inside `root` (default document). Idempotent:
   each .tt-picker is wired once (guarded by __ttWired). The hidden .tt-val
   input holds the canonical 24h value; selecting hour+minute+AM/PM commits it,
   updates the trigger label, and dispatches a bubbling 'change' on the hidden
   input so Total Time recomputes through the existing listener. */
function ttPickerInit(root){
  (root||document).querySelectorAll('.tt-picker[data-tt]').forEach(function(pk){
    if(pk.__ttWired) return; pk.__ttWired=true;
    const val=pk.querySelector('.tt-val');
    const trigger=pk.querySelector('.tt-trigger');
    const pop=pk.querySelector('.tt-pop');
    const label=pk.querySelector('.tt-trigger-label');
    if(!val||!trigger||!pop) return;
    // Pending selection state (mirrors the committed value while choosing).
    let pend={h:null,m:null,ap:null};

    function fmt12(hhmm){
      if(!hhmm) return '';
      const p=String(hhmm).split(':'); let h=parseInt(p[0],10), m=parseInt(p[1],10);
      if(isNaN(h)||isNaN(m)) return '';
      const ap=h>=12?'PM':'AM'; let h12=h%12; if(h12===0) h12=12;
      return h12+':'+String(m).padStart(2,'0')+' '+ap;
    }
    // Seed pending state from any existing committed value.
    function seedFromVal(){
      pend={h:null,m:null,ap:null};
      if(val.value){
        const p=val.value.split(':'); let h=parseInt(p[0],10), m=parseInt(p[1],10);
        if(!isNaN(h)&&!isNaN(m)){ pend.ap=h>=12?'PM':'AM'; let h12=h%12; if(h12===0) h12=12; pend.h=h12; pend.m=m; }
      }
      paintActive();
    }
    function paintActive(){
      pk.querySelectorAll('.tt-h').forEach(b=>b.classList.toggle('sel', pend.h!=null && parseInt(b.dataset.h,10)===pend.h));
      pk.querySelectorAll('.tt-m').forEach(b=>b.classList.toggle('sel', pend.m!=null && parseInt(b.dataset.m,10)===pend.m));
      pk.querySelectorAll('.tt-ap-btn').forEach(b=>b.classList.toggle('sel', pend.ap && b.dataset.ap===pend.ap));
    }
    function refreshLabel(){
      label.textContent = val.value ? fmt12(val.value) : 'Select time';
      pk.classList.toggle('tt-has-val', !!val.value);
    }
    function commitIfComplete(){
      if(pend.h!=null && pend.m!=null && pend.ap){
        let h=pend.h%12; if(pend.ap==='PM') h+=12;       // 12→0, PM+12
        val.value=String(h).padStart(2,'0')+':'+String(pend.m).padStart(2,'0');
        refreshLabel();
        val.dispatchEvent(new Event('change',{bubbles:true}));
        close();
      }
    }
    function open(){
      // Close any other open picker first.
      document.querySelectorAll('.tt-picker.tt-open').forEach(o=>{ if(o!==pk){ o.classList.remove('tt-open'); const pp=o.querySelector('.tt-pop'); if(pp) pp.hidden=true; const tg=o.querySelector('.tt-trigger'); if(tg) tg.setAttribute('aria-expanded','false'); } });
      seedFromVal();
      pop.hidden=false; pk.classList.add('tt-open'); trigger.setAttribute('aria-expanded','true');
      // Decide up vs down from where the trigger sits in the viewport: open
      // downward by default, but flip above when the popup won't fit below and
      // there's more room above. Cap the height to the chosen side so a tall
      // popup is never clipped off-screen (it scrolls instead).
      pop.classList.remove('tt-pop-up','tt-pop-right');
      pop.style.maxHeight=''; pop.style.overflowY='';
      const margin=8;
      const tr=trigger.getBoundingClientRect();
      const popH=pop.offsetHeight;
      const roomBelow=window.innerHeight-tr.bottom-margin;
      const roomAbove=tr.top-margin;
      const flipUp = popH>roomBelow && roomAbove>roomBelow;
      if(flipUp) pop.classList.add('tt-pop-up');
      const room=flipUp?roomAbove:roomBelow;
      if(popH>room){ pop.style.maxHeight=Math.max(room,160)+'px'; pop.style.overflowY='auto'; }
      // Right-align the popup if its right edge would run off the viewport.
      const pr=pop.getBoundingClientRect();
      if(pr.right>window.innerWidth-4){
        pop.classList.add('tt-pop-right');
      }
    }
    function close(){ pop.hidden=true; pk.classList.remove('tt-open'); trigger.setAttribute('aria-expanded','false'); }

    trigger.addEventListener('click',function(e){ e.stopPropagation(); if(trigger.disabled) return; if(pk.classList.contains('tt-open')) close(); else open(); });
    pop.addEventListener('click',function(e){
      const b=e.target.closest('button'); if(!b) return;
      e.stopPropagation();
      if(b.classList.contains('tt-h')){ pend.h=parseInt(b.dataset.h,10); }
      else if(b.classList.contains('tt-m')){ pend.m=parseInt(b.dataset.m,10); }
      else if(b.classList.contains('tt-ap-btn')){ pend.ap=b.dataset.ap; }
      paintActive();
      commitIfComplete();
    });
    refreshLabel();
  });
  // One document-level outside-click closer (guarded so we bind once).
  if(!document.__ttOutsideBound){
    document.__ttOutsideBound=true;
    document.addEventListener('click',function(e){
      if(e.target.closest && e.target.closest('.tt-picker')) return;
      document.querySelectorAll('.tt-picker.tt-open').forEach(o=>{ o.classList.remove('tt-open'); const pp=o.querySelector('.tt-pop'); if(pp) pp.hidden=true; const tg=o.querySelector('.tt-trigger'); if(tg) tg.setAttribute('aria-expanded','false'); });
    });
  }
}

/* Compute the duration between two 24h "HH:MM" time strings and format it as
   "Xh Ym". If end is earlier than or equal to start, we assume the interval
   crosses midnight and add 24h (e.g. 23:00 → 01:00 = 2h 0m). Returns '' when
   either time is missing. */
function computeTotalTime(start, end){
  if(!start || !end) return '';
  const ps=String(start).split(':'), pe=String(end).split(':');
  if(ps.length<2 || pe.length<2) return '';
  const sMin=(parseInt(ps[0],10)||0)*60 + (parseInt(ps[1],10)||0);
  const eMin=(parseInt(pe[0],10)||0)*60 + (parseInt(pe[1],10)||0);
  let diff=eMin-sMin;
  if(diff<0) diff+=24*60;        // crosses midnight
  const h=Math.floor(diff/60), m=diff%60;
  return h+'h '+m+'m';
}

/* Format a string of digits into US phone format: (555) 123-4567.
   Non-digits are stripped and the number is capped at 10 digits, formatting
   progressively so partial input reads naturally as the user types. */
function formatUSPhone(raw){
  const d=String(raw||'').replace(/\D/g,'').slice(0,10);
  if(d.length===0) return '';
  if(d.length<4) return '('+d;
  if(d.length<7) return '('+d.slice(0,3)+') '+d.slice(3);
  return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);
}

/* Input handler that live-masks phone fields in the preview. */
function onPreviewPhoneInput(e){
  const t=e.target;
  if(t && t.tagName==='INPUT' && t.type==='tel' && t.hasAttribute('data-phone-mask')){
    const formatted=formatUSPhone(t.value);
    if(t.value!==formatted){ t.value=formatted; }
  }
}

/* Recompute a Total Time field's duration when a picker commits a new value. */
function onPreviewTotalTimeInput(e){
  const t=e.target;
  if(!t || !t.classList) return;
  if(!t.classList.contains('pf-tt-start-val') && !t.classList.contains('pf-tt-end-val')) return;
  const box=t.closest('.pf-totaltime'); if(!box) return;
  const tot=box.querySelector('.pf-tt-total');
  if(tot) tot.value=computeTotalTime(readPicker12(box,'pf-tt-start'), readPicker12(box,'pf-tt-end'));
}

/* Preview Submit: run native HTML5 validation (required, email format, phone
   pattern) on the currently VISIBLE inputs, mirroring how the exported form
   validates on real submit. Hidden (conditionally-removed) fields are skipped
   so a hidden required field can't block submission — same as the export,
   which disables hidden inputs. Only when everything is valid do we show the
   "preview only" confirmation. */
function previewValidationMsg(el){
  const v=el.validity||{};
  if(v.valueMissing) return 'This field is required';
  if(v.typeMismatch) return el.type==='email'?'Enter a valid email address':(el.type==='url'?'Enter a valid URL':'Enter a valid value');
  if(v.patternMismatch) return 'Enter a valid format (e.g. (555) 123-4567)';
  if(v.tooShort||v.tooLong) return 'Check the length of this entry';
  if(v.rangeUnderflow||v.rangeOverflow||v.stepMismatch||v.badInput) return 'Enter a valid number';
  return 'Please check this field';
}
/* Validity of one preview field wrapper. Returns {ok, focusEl, msg}. Mirrors the
   exported form. Conditionally-hidden fields are always valid (skipped). */
function previewFieldValidity(pf){
  if(!pf || pf.classList.contains('cond-hidden')) return {ok:true};
  const sign=pf.querySelector('.sign-pad[data-required]');
  if(sign){ const sv=sign.querySelector('.sign-val'); if(!sv||!sv.value) return {ok:false, focusEl:sign.querySelector('canvas')||sign, msg:'Signature required'}; }
  const tt=pf.querySelector('.pf-totaltime[data-required]');
  if(tt){ if(!readPicker12(tt,'pf-tt-start')||!readPicker12(tt,'pf-tt-end')) return {ok:false, focusEl:tt.querySelector('.tt-trigger')||tt, msg:'Select both a start and end time'}; }
  const ctrls=pf.querySelectorAll('input,select,textarea');
  for(let i=0;i<ctrls.length;i++){
    const el=ctrls[i];
    if(el.disabled || el.type==='hidden') continue;
    if(typeof el.checkValidity==='function' && !el.checkValidity()){
      let fe=el;
      if(el.tagName==='SELECT' && el.classList.contains('has-cdd')){ const b=el.parentNode.querySelector('.cdd .cdd-btn'); if(b) fe=b; }
      return {ok:false, focusEl:fe, msg:previewValidationMsg(el)};
    }
  }
  return {ok:true};
}
function setPreviewFieldInvalid(pf,msg){
  pf.classList.add('pf-invalid');
  let e=pf.querySelector(':scope > .pf-field-error');
  if(!e){ e=document.createElement('div'); e.className='pf-field-error'; pf.appendChild(e); }
  e.textContent=msg||'Please check this field';
}
function clearPreviewFieldInvalid(pf){
  pf.classList.remove('pf-invalid');
  const e=pf.querySelector(':scope > .pf-field-error'); if(e) e.remove();
}
/* Field-level validation as the user moves through the form (on blur), and a
   live clear as soon as a previously-flagged field becomes valid again. */
// After a failed preview submit we enter "fix-up" mode: completing one flagged
// field jumps focus to the next still-missing one. Reset once all are filled.
let PREVIEW_SUBMIT_ATTEMPTED=false;
function onPreviewFieldBlur(e){ const pf=e.target&&e.target.closest&&e.target.closest('.pf-field'); if(pf){ const r=previewFieldValidity(pf); if(r.ok) clearPreviewFieldInvalid(pf); else setPreviewFieldInvalid(pf,r.msg); } }
function onPreviewFieldLiveClear(e){
  const pf=e.target&&e.target.closest&&e.target.closest('.pf-field');
  if(!pf) return;
  if(pf.classList.contains('pf-invalid')){
    const r=previewFieldValidity(pf);
    if(r.ok) clearPreviewFieldInvalid(pf); else setPreviewFieldInvalid(pf,r.msg);
  }
  // On commit, if this field was flagged at submit (persistent marker) and is now
  // valid, drop the marker and advance to the next still-missing field. The marker
  // is separate from the red class, so the live red-clear on input (every keystroke)
  // doesn't suppress the jump, and only genuinely-missed fields trigger it.
  if(e.type==='change' && PREVIEW_SUBMIT_ATTEMPTED && pf.getAttribute('data-cw-missed')==='1' && previewFieldValidity(pf).ok){
    pf.removeAttribute('data-cw-missed');
    jumpToNextPreviewInvalid();
  }
}
// Focus + scroll the next still-invalid required field, top → down. Skips
// hidden fields (conditional or off-page). Clears fix-up mode when none remain.
function jumpToNextPreviewInvalid(){
  const m=document.getElementById('preview-mount'); if(!m) return;
  const fields=m.querySelectorAll('.pf-field');
  for(let i=0;i<fields.length;i++){
    if(fields[i].offsetParent===null) continue;
    const r=previewFieldValidity(fields[i]);
    if(!r.ok){
      const fe=r.focusEl||fields[i];
      try{ fe.focus({preventScroll:true}); }catch(_){ try{ fe.focus(); }catch(__){} }
      if(fe.scrollIntoView) fe.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
  }
  PREVIEW_SUBMIT_ATTEMPTED=false;
}
function validatePreviewAndSubmit(){
  const m=document.getElementById('preview-mount');
  if(!m) return;
  // Sweep every field on the page in document order (top → right → down).
  let first=null;
  const fields=Array.prototype.slice.call(m.querySelectorAll('.pf-field'));
  fields.forEach(function(pf){
    const r=previewFieldValidity(pf);
    if(r.ok){ clearPreviewFieldInvalid(pf); pf.removeAttribute('data-cw-missed'); }
    else { setPreviewFieldInvalid(pf, r.msg); pf.setAttribute('data-cw-missed','1'); if(!first) first=r.focusEl||pf; }
  });
  PREVIEW_SUBMIT_ATTEMPTED=!!first; // enter fix-up mode if anything was missed
  if(first){
    try{ first.focus({preventScroll:true}); }catch(_){ try{ first.focus(); }catch(__){} }
    if(first.scrollIntoView) first.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }
  alert('Preview only — no data is sent. (All fields valid.)');
}
function wireSignPads(root){
  (root||document).querySelectorAll('.sign-pad').forEach(function(pad){
    if(pad.__wired) return; pad.__wired=true;
    var canvas=pad.querySelector('.sign-canvas'); if(!canvas) return;
    var hidden=pad.querySelector('.sign-val');
    var fid=pad.getAttribute('data-field-id');
    var ctx=canvas.getContext('2d'); if(!ctx) return;
    ctx.lineWidth=2.2; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0d1f18';
    var drawing=false,last=null,dirty=false;
    function pos(e){ var r=canvas.getBoundingClientRect(); var t=(e.touches&&e.touches[0])||e; return {x:(t.clientX-r.left)*(canvas.width/(r.width||1)), y:(t.clientY-r.top)*(canvas.height/(r.height||1))}; }
    function store(){ var d=dirty?canvas.toDataURL('image/png'):''; if(hidden) hidden.value=d; if(fid){ if(d) PREVIEW_ANSWERS[fid]=d; else delete PREVIEW_ANSWERS[fid]; } }
    function down(e){ e.preventDefault(); drawing=true; last=pos(e); }
    function move(e){ if(!drawing) return; e.preventDefault(); var pt=pos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(pt.x,pt.y); ctx.stroke(); last=pt; dirty=true; }
    function up(){ if(drawing){ drawing=false; store(); } }
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    canvas.addEventListener('touchstart',down,{passive:false}); canvas.addEventListener('touchmove',move,{passive:false}); canvas.addEventListener('touchend',up);
    var clr=pad.querySelector('.sign-clear'); if(clr) clr.addEventListener('click',function(){ ctx.clearRect(0,0,canvas.width,canvas.height); dirty=false; store(); });
    var prev=fid?PREVIEW_ANSWERS[fid]:null;
    if(typeof prev==='string' && prev.indexOf('data:image')===0){ var img=new Image(); img.onload=function(){ try{ctx.drawImage(img,0,0,canvas.width,canvas.height);}catch(e){} }; img.src=prev; dirty=true; if(hidden) hidden.value=prev; }
  });
}
function onPreviewWheelPassthrough(e){
  // If the wheel is over a focused number/range input, blur it so the browser
  // scrolls the page instead of nudging the field's value.
  const t=e.target;
  if(t && (t.type==='number' || t.type==='range') && document.activeElement===t){
    t.blur();
  }
}
function onPreviewAutoGrowInput(e){
  const t=e.target;
  if(t && t.tagName==='TEXTAREA' && t.dataset.autogrow) autoGrowTextarea(t);
}
function autoGrowTextarea(el){
  el.style.height='auto';
  const cap=parseFloat(getComputedStyle(el).maxHeight)||Infinity;
  el.style.height=Math.min(el.scrollHeight, cap)+'px';
}

/* On every change inside the preview, work out which scoreable field the
   event affected and record the user's selection in PREVIEW_ANSWERS. Then
   recompute the score panel. We walk up from the target to find the field
   wrapper (radio inputs use `name`; select/checkboxes have an explicit
   data-field-id on the wrapper element). */
function onPreviewAnswerChange(e){
  const t=e.target;
  if(!t) return;
  let fieldId=null;
  if(t.type==='radio' && t.name){
    fieldId=t.name;
  } else {
    const wrap=t.closest('[data-field-id]');
    if(wrap) fieldId=wrap.dataset.fieldId;
  }
  const field=fieldId?findFieldById(fieldId):null;
  if(field){
    // Record the new value into PREVIEW_ANSWERS for scoreable + numeric
    // controller types (numeric values drive number/range-based showIf rules).
    if(field.type==='radio'){
      const idx=parseInt(t.dataset.optIdx, 10);
      PREVIEW_ANSWERS[fieldId]=isNaN(idx)?null:idx;
    } else if(field.type==='select'){
      const idx=parseInt(t.value, 10);
      PREVIEW_ANSWERS[fieldId]=isNaN(idx)?null:idx;
    } else if(field.type==='checkboxes'){
      const idx=parseInt(t.dataset.optIdx, 10);
      if(!isNaN(idx)){
        let set=PREVIEW_ANSWERS[fieldId];
        if(!(set instanceof Set)) set=new Set();
        if(t.checked) set.add(idx); else set.delete(idx);
        PREVIEW_ANSWERS[fieldId]=set;
      }
    } else if(field.type==='number' || field.type==='range'){
      const n=Number(t.value);
      PREVIEW_ANSWERS[fieldId]=(t.value===''||isNaN(n))?null:n;
    } else if(field.type==='phone' && field.phoneExt){
      const wrap=t.closest('[data-field-id]');
      const main=wrap?wrap.querySelector('.pf-phone-main'):null;
      const ext=wrap?wrap.querySelector('.pf-phone-ext-in'):null;
      const mv=main?String(main.value||'').trim():'';
      const xv=ext?String(ext.value||'').trim():'';
      PREVIEW_ANSWERS[fieldId]= mv ? (xv?mv+' x'+xv:mv) : (xv?'x'+xv:null);
    } else if(STRING_CTRL_TYPES.has(field.type)){
      PREVIEW_ANSWERS[fieldId]=t.value;
    } else if(BOOL_CTRL_TYPES.has(field.type)){
      PREVIEW_ANSWERS[fieldId]=!!t.checked;
    } else if(field.type==='totaltime'){
      // Persist both legs so multi-page nav / re-render restores the picker.
      const box=t.closest('.pf-totaltime');
      const st=box?readPicker12(box,'pf-tt-start'):'';
      const en=box?readPicker12(box,'pf-tt-end'):'';
      PREVIEW_ANSWERS[fieldId]=(st||en)?{start:st,end:en}:null;
    }
  }
  // Any change can flip a branch: settle hidden answers, repaint visibility,
  // then recompute the score panel.
  settlePreviewVisibility();
  applyPreviewVisibilityDOM();
  updatePreviewScores(); updatePreviewProgress();
  checkPreviewPopups();
  // Persist keyed fields to the shared profile so other forms auto-populate.
  // One-way "overwrite" destinations receive the source value but never write
  // their own back, so the source stays authoritative.
  if(field && field.dataKey && !field.prefillOverwrite && e.type!=='input'){
    saveSharedProfileValue(field.dataKey, previewSharedValue(field));
  }
}
/* Radio deselect: clicking the LABEL of an already-selected radio clears it
   (radios normally can't be unselected). If a user instead jabs the radio
   circle itself a couple of times trying to clear it, surface a one-line tip
   pointing them at the label. */
let RADIO_TIP_COUNT={};
function onPreviewRadioMousedown(e){
  const lab=e.target.closest && e.target.closest('.pf-opt'); if(!lab) return;
  const input=lab.querySelector('input[type=radio]'); if(!input) return;
  const wrap=lab.closest('[data-field-id]'); if(!wrap) return;
  const fid=wrap.getAttribute('data-field-id');
  const wasChecked=input.checked;
  const clickedCircle=(e.target===input);
  if(wasChecked && !clickedCircle){
    e.preventDefault();
    input.checked=false;
    PREVIEW_ANSWERS[fid]=null;
    RADIO_TIP_COUNT[fid]=0; hideRadioTip();
    settlePreviewVisibility(); applyPreviewVisibilityDOM(); updatePreviewScores(); updatePreviewProgress();
  } else if(wasChecked && clickedCircle){
    RADIO_TIP_COUNT[fid]=(RADIO_TIP_COUNT[fid]||0)+1;
    if(RADIO_TIP_COUNT[fid]>=2) showRadioTip(lab);
  } else {
    RADIO_TIP_COUNT[fid]=0; hideRadioTip();
  }
}
function showRadioTip(anchor){
  hideRadioTip();
  const tip=document.createElement('div');
  tip.className='radio-deselect-tip'; tip.id='radio-deselect-tip';
  tip.textContent='To deselect your option, click on the label.';
  document.body.appendChild(tip);
  try{ const r=anchor.getBoundingClientRect(); tip.style.left=Math.round(r.right+10)+'px'; tip.style.top=Math.round(r.top)+'px'; }catch(e){}
  clearTimeout(showRadioTip._t); showRadioTip._t=setTimeout(hideRadioTip, 4500);
}
function hideRadioTip(){ const t=document.getElementById('radio-deselect-tip'); if(t) t.remove(); }

/* Interactive star rating in the preview: click a star to set 1..max, click
   the same star again to clear. Drives rating-based visibility + scoring. */
function onPreviewRatingClick(e){
  const star=e.target && e.target.closest && e.target.closest('.pf-star'); if(!star) return;
  const wrap=star.closest('.pf-field[data-field-id]'); if(!wrap) return;
  const fid=wrap.dataset.fieldId; const v=Number(star.dataset.v)||0;
  const cur=Number(PREVIEW_ANSWERS[fid])||0;
  const nv=(cur===v)?0:v;
  if(nv) PREVIEW_ANSWERS[fid]=nv; else delete PREVIEW_ANSWERS[fid];
  wrap.querySelectorAll('.pf-star').forEach((s,i)=>s.classList.toggle('on', i<nv));
  settlePreviewVisibility(); applyPreviewVisibilityDOM(); updatePreviewScores(); updatePreviewProgress();
}

/* Sync the styled dropdown twin to its native <select> after we change the
   select programmatically (the twin normally refreshes on a user 'change'). */
function syncCddForSelect(sel){
  const cdd=sel.parentNode && sel.parentNode.querySelector('.cdd');
  if(!cdd) return;
  const val=cdd.querySelector('.cdd-val');
  if(!val) return;
  const opt=sel.options[sel.selectedIndex];
  const ph=!opt||opt.disabled||opt.value==='';
  val.textContent=opt?opt.textContent:'';
  val.className='cdd-val'+(ph?' placeholder':'');
}
/* Clear every control inside a field wrapper (used when a branch hides it, so
   re-showing it later starts blank and its score drops to 0). */
function resetPreviewFieldDOM(wrapEl){
  wrapEl.querySelectorAll('input').forEach(i=>{
    if(i.type==='checkbox'||i.type==='radio') i.checked=false;
    else if(i.type!=='button'&&i.type!=='submit') i.value='';
  });
  wrapEl.querySelectorAll('textarea').forEach(t=>{ t.value=''; });
  wrapEl.querySelectorAll('select').forEach(s=>{ s.selectedIndex=0; syncCddForSelect(s); });
}
/* Toggle .cond-hidden on preview rows/fields to match the current rules,
   resetting a field's inputs the moment it transitions to hidden. */
function applyPreviewVisibilityDOM(){
  const m=document.getElementById('preview-mount');
  if(!m) return;
  FORM.rows.forEach(row=>{
    if(pageOf(row)!==PREVIEW_PAGE) return;
    const rowVis=evalShowIf(row.showIf);
    const rowEl=m.querySelector(`.pf-row[data-row-id="${row.id}"]`);
    if(rowEl) rowEl.classList.toggle('cond-hidden', !rowVis);
    row.fields.forEach(f=>{
      const fEl=m.querySelector(`.pf-field[data-field-id="${f.id}"]`);
      if(!fEl) return;
      const isTopOnlySB = f.type==='statusbar' && pbMode(f)==='pageBetween' && pbPlace(f)==='top';
      const vis = rowVis && evalShowIf(f.showIf) && groupVisible(f) && !fieldHiddenInPreview(f) && !isTopOnlySB;
      const wasHidden=fEl.classList.contains('cond-hidden');
      fEl.classList.toggle('cond-hidden', !vis);
      if(!vis && !wasHidden) resetPreviewFieldDOM(fEl);
    });
  });
  markLastVisiblePreviewRow();
}

/* The row separator (light gray line) is drawn as a bottom border on every
   .pf-row, then removed from the LAST VISIBLE row so the page doesn't end on a
   dangling line. Because conditional rules can hide the structurally-last row,
   we can't use CSS :last-of-type — we mark the last non-hidden row explicitly
   and re-mark whenever visibility changes. */
function markLastVisiblePreviewRow(){
  const m=document.getElementById('preview-mount');
  if(!m) return;
  const rows=[...m.querySelectorAll('.pf-row')];
  let last=null;
  rows.forEach(r=>{
    r.classList.remove('pf-row-last-visible');
    if(!r.classList.contains('cond-hidden')) last=r;
  });
  if(last) last.classList.add('pf-row-last-visible');
}

/* Walk every scoring section, compute its current total from PREVIEW_ANSWERS,
   and update each score card in place. Pulls answers from the in-memory
   map (not the DOM), so values are preserved across page changes when the
   relevant input is no longer mounted. */
function updatePreviewScores(){
  ensureScoringInit();
  const panel=document.getElementById('pf-score-panel');
  if(!panel) return;
  FORM.scoringSections.forEach(section=>{
    if(section.fieldIds.length===0) return;
    let total=0;
    section.fieldIds.forEach(fid=>{
      const f=findFieldById(fid);
      if(!f || !isScoreable(f)) return;
      if(!scoringFieldCounts(section,fid)) return; // conditional scoring: gate not met → 0
      total += scoreForField(f);
    });
    // If this section publishes its total as a shared key, push it into the
    // shared profile so other forms / the what-if tester can branch on it.
    if(section.scoreKey) saveSharedProfileValue(section.scoreKey, total);
    // Apply to card (cards are absent in the patient view's alerts-only panel)
    const card=panel.querySelector(`.pf-score-card[data-section-id="${section.id}"]`);
    if(card){
      const totalEl=card.querySelector('[data-role="total"]');
      if(totalEl){
        const max=sectionMaxScore(section);
        totalEl.innerHTML = total + `<span class="pfsc-max"> / ${max}</span>`;
      }
      // Band classification + color
      const band=bandForScore(section, total);
      const bandEl=card.querySelector('[data-role="band"]');
      card.classList.remove('severity-low','severity-mild','severity-mod','severity-high');
      card.style.background=''; card.style.borderColor='';
      if(band){
        bandEl.style.display='';
        bandEl.textContent=band.label||'';
        if(band.color && /^#[0-9a-fA-F]{6}$/.test(band.color)){
          card.style.background=band.color+'14';
          card.style.borderColor=band.color+'66';
          bandEl.style.color=band.color;
        } else {
          bandEl.style.color='';
          card.classList.add('severity-'+(band.severity||'low'));
        }
      } else {
        bandEl.style.display='none';
        bandEl.textContent='';
        bandEl.style.color='';
        card.classList.add('severity-low');
      }
    }
    const alertEl=panel.querySelector(`.pf-score-alert[data-section-id="${section.id}"]`);
    if(alertEl){
      const _amsg=previewAlertMsg(section, total);
      if(_amsg){
        alertEl.style.cssText='display:flex;align-items:center;gap:8px;margin-top:-2px;margin-bottom:2px;padding:10px 13px;background:#fdedeb;border:1px solid #f5b6ae;border-radius:9px;color:#a02016;font-size:12.5px;font-weight:600;line-height:1.35';
        alertEl.innerHTML='<span style="font-size:15px">⚠</span><span>'+esc(_amsg)+'</span>';
      } else { alertEl.style.display='none'; alertEl.innerHTML=''; }
    }
  });
}

/* Compute the score contributed by a single field from PREVIEW_ANSWERS.
   This survives page navigation: the DOM may not currently contain this
   field (it lives on a different page) but the in-memory answer is still
   available, so multi-page totals are correct.
   For radio/select: a single option index → its score.
   For checkboxes: sum of every checked option's score. */
function scoreForField(field){
  if(!isScoreable(field)) return 0;
  const scores=field.optionScores||[];
  const ans=PREVIEW_ANSWERS[field.id];
  if(field.type==='toggle'){
    // Binary: optionScores[0]=On, [1]=Off. Untouched toggle counts as Off.
    return ans ? (Number(scores[0])||0) : (Number(scores[1])||0);
  }
  if(ans==null) return 0;
  if(field.type==='radio' || field.type==='select'){
    const idx=Number(ans);
    if(isNaN(idx)) return 0;
    return Number(scores[idx])||0;
  }
  if(field.type==='checkboxes'){
    // ans is a Set of selected option indices.
    if(!(ans instanceof Set)) return 0;
    let sum=0;
    ans.forEach(idx=>{ sum += Number(scores[idx])||0; });
    return sum;
  }
  return 0;
}

/* When a field's options are edited or its scoring config changes (option
   scores updated, type changed away from scoreable), any prior answer
   stored in PREVIEW_ANSWERS may now point to a stale option index. We don't
   try to remap — we just drop it. Called from render() so any structural
   change resets the in-memory answer for the affected field. */
function prunePreviewAnswers(){
  if(!PREVIEW_ANSWERS) return;
  Object.keys(PREVIEW_ANSWERS).forEach(fid=>{
    const f=findFieldById(fid);
    if(!f){ delete PREVIEW_ANSWERS[fid]; return; }
    // Numeric controllers (number/range) aren't scoreable but their raw value
    // drives showIf rules, so keep them as-is.
    if(f.type==='number' || f.type==='range') return;
    if(!isScoreable(f)){ delete PREVIEW_ANSWERS[fid]; return; }
    const ans=PREVIEW_ANSWERS[fid];
    if(f.type==='toggle'){
      // Toggle answers are booleans (on/off), not option indices — keep valid booleans.
      if(typeof ans!=='boolean') delete PREVIEW_ANSWERS[fid];
      return;
    }
    const optsLen=(f.options||[]).length;
    if(f.type==='checkboxes'){
      if(!(ans instanceof Set)){ delete PREVIEW_ANSWERS[fid]; return; }
      // Drop any selection pointing past the current option count.
      [...ans].forEach(idx=>{ if(idx>=optsLen) ans.delete(idx); });
    } else {
      const idx=Number(ans);
      if(isNaN(idx) || idx<0 || idx>=optsLen) delete PREVIEW_ANSWERS[fid];
    }
  });
}


/* Minimal CSS.escape polyfill — older Safari lacks CSS.escape. The field
   ids we generate are alphanumeric + underscore so identity-escape is safe. */
function cssEscape(s){
  if(typeof CSS!=='undefined' && CSS.escape) return CSS.escape(s);
  return String(s).replace(/[^a-zA-Z0-9_-]/g, c=>'\\'+c);
}

/* Navigate the preview between pages (clamped). */
function gotoPreviewPage(p){
  const max=pageCount();
  p=Math.max(1, Math.min(p, max));
  // Snap onto a visible page (page rules may have skipped the target).
  const vis=visiblePreviewPages();
  if(vis.indexOf(p)<0) p = vis.find(x=>x>=p) || vis[vis.length-1];
  PREVIEW_PAGE=p;
  renderPreview();
  const w=document.getElementById('preview-wrap');
  if(w) w.scrollTop=0;
}

function renderPreviewIfNeeded(){ if(MODE==='preview') renderPreview(); }
function setMode(m){
  MODE=m;
  document.querySelectorAll('#mode-seg button').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));
  document.getElementById('canvas-wrap').style.display=(m==='build')?'flex':'none';
  document.querySelector('.leftpanel').style.display=(m==='build')?'flex':'none';
  document.getElementById('inspector').style.display=(m==='build')?'block':'none';
  document.getElementById('preview-wrap').style.display=(m==='preview')?'flex':'none';
  var _hist=document.getElementById('tb-history'); if(_hist) _hist.style.display=(m==='build')?'flex':'none';
  if(m==='preview'){ PREVIEW_PAGE=1; renderPreview(); }
  scheduleReflow();
}

function render(){ 
  ensureDragAutoScroll();
  if(FORM.rows.length===0){
    BUILDER_PAGE=1;
    FORM.rows=[{id:uid('r'),fields:[],page:1}];
  }
  // Drop preview answers that no longer apply (field deleted, type changed
  // away from scoreable, option scores reduced past a recorded selection).
  prunePreviewAnswers();
  // Drop conditional rules whose controller field / section disappeared.
  pruneConditions();
  // Reflect the form-level display rule indicator in the header.
  renderFormRuleBar();
  renderCanvas(); 
  renderInspector(); 
  renderPreviewIfNeeded(); 
  saveForm(); 
  applyRoleUI();
  if(typeof updateDraftBadge==='function') updateDraftBadge();
}
function clearForm(){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  if((FORM.rows.some(r=>r.fields.length)||FORM.title||FORM.desc) && !confirm('Clear the whole form?'))return;
  FORM.title='';
  FORM.desc='';
  FORM.rows=[];
  FORM.weightGroups=[];
  FORM.scoringGroups=[];
  FORM.scoringSections=FORM.scoringGroups;
  resetPreviewAnswers();
  SELECTED=null;
  document.getElementById('form-title').value='';
  document.getElementById('form-desc').value='';
  render();
}

function buildSchema(){
  return {
    title:FORM.title,
    description:FORM.desc,
    // Form-level display rule: the backend shows this whole form only when the
    // rule passes, evaluated against the patient's shared data keys. Omitted
    // when no rule is set (form always shown).
    ...((FORM.showIf && FORM.showIf.conditions && FORM.showIf.conditions.length) ? {showIf:{
      match: FORM.showIf.match==='any'?'any':'all',
      conditions: FORM.showIf.conditions.map(formRuleCondSchema)
    }} : {}),
    weightGroups:FORM.weightGroups.map(wg=>{
      ensureWeightShape(wg);
      return {
        id:wg.id,
        fieldIds:wg.fieldIds,
        fieldLabels:wg.fieldIds.map(id=>findFieldById(id)?.label||'Unknown'),
        // Per-field weight (percentage) keyed by field id, plus the running total.
        weights:wg.fieldIds.reduce((o,id)=>{ o[id]=Number(wg.weights[id])||0; return o; },{}),
        weightTotal:weightGroupTotal(wg)
      };
    }),
    // Scoring config so a backend/data scientist gets the same scoring the
    // HTML export ships: per-section field membership, computed max, and bands.
    scoringSections:(FORM.scoringSections||[]).map(s=>({
      id:s.id,
      name:s.name,
      fieldIds:s.fieldIds,
      max:sectionMaxScore(s),
      // When set, the backend should publish this section's running total under
      // this shared key so form-level rules (here and on other forms) can use it.
      ...(s.scoreKey?{scoreKey:s.scoreKey}:{}),
      bands:(s.bands||[]).map(b=>({
        min:Number(b.min)||0, max:Number(b.max)||0,
        label:b.label||'', severity:b.severity||'low', color:b.color||''
      }))
    })),
    rows:FORM.rows.map(r=>({
      // include page so the backend / data scientist sees the wizard structure
      page:r.page||1,
      columns:r.fields.length,
      // Row-level conditional visibility (branch rule for the whole row).
      ...(r.showIf?{showIf:r.showIf}:{}),
      fields:r.fields.map(f=>{
        const o={id:f.id,type:f.type,label:f.label,span:f.span||defaultSpanFor(f.type)};
        if(f.placeholder)o.placeholder=f.placeholder;
        if(f.help)o.help=f.help;
        if(f.required)o.required=true;
        if(f.options)o.options=f.options;
        // Per-option point values for scoreable fields (radio/select/checkboxes).
        if(isScoreable(f) && f.optionScores && f.optionScores.length) o.optionScores=f.optionScores;
        if(f.type==='range'){o.min=f.min;o.max=f.max;o.step=f.step;}
        if(f.type==='rating')o.max=f.max;
        if(f.type==='toggle'){ o.toggleOn=(f.toggleOn!=null?f.toggleOn:'Yes'); o.toggleOff=(f.toggleOff!=null?f.toggleOff:'No'); if(f.toggleStyle) o.toggleStyle=f.toggleStyle; }
        // Field-level conditional visibility (branch rule for this field).
        if(f.showIf) o.showIf=f.showIf;
        // Cross-form shared key for auto-population.
        if(f.dataKey) o.dataKey=f.dataKey;
        return o;
      })
    }))
  };
}

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

/* ---- Share & collect (tokenized delivery) ---- */
function shEsc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function copyText(t){ try{ navigator.clipboard.writeText(t); }catch(e){ var ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); }catch(_){ } document.body.removeChild(ta); } }
function copyShare(id){ var el=document.getElementById(id); copyText(el.value||el.textContent); toast('Copied'); }
function shareApi(path, opts){
  opts=opts||{}; opts.credentials='same-origin';
  opts.headers=Object.assign({'Content-Type':'application/json'}, opts.headers||{});
  return fetch(path, opts).then(function(r){ return r.json().then(function(j){ if(!r.ok) throw new Error(j.error||('HTTP '+r.status)); return j; }); });
}
var _qrLoading=false;
function renderQR(url){
  var box=document.getElementById('share-qr'); if(!box) return;
  function draw(){ try{ box.innerHTML=''; new window.QRCode(box,{text:url,width:140,height:140,correctLevel:window.QRCode.CorrectLevel.M}); }catch(e){ box.textContent='QR unavailable'; } }
  if(window.QRCode){ draw(); return; }
  if(_qrLoading) return; _qrLoading=true;
  var s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  s.onload=function(){ draw(); };
  s.onerror=function(){ box.textContent='QR offline'; };
  document.head.appendChild(s);
}
function renderShareLink(token){
  var url=window.location.origin+'/f/'+token;
  document.getElementById('share-url').value=url;
  document.getElementById('share-embed').value='<iframe src="'+url+'" width="100%" height="800" style="border:0;max-width:680px" title="Credify form"></iframe>';
  renderQR(url);
}
function openCollectModal(scrollToQR){
  if(!FORM || !FORM.id || !FORM.rows || !FORM.rows.length){ toast('Add at least one field first'); return; }
  if(typeof isFormDraft==='function' && isFormDraft(FORM)){ toast('This form is a Draft — Save it before delivering to patients'); return; }
  openModal('collect-modal');
  document.getElementById('share-main').style.display='none';
  var st=document.getElementById('share-status'); st.textContent='Preparing your share link…';
  var html=''; try{ html=buildHTMLForm(); }catch(e){ html=''; }
  // After the link area is shown, optionally scroll the QR into view.
  function revealQR(){ if(scrollToQR){ try{ var q=document.getElementById('share-qr'); if(q&&q.scrollIntoView) q.scrollIntoView({behavior:'smooth',block:'center'}); }catch(e){} } }
  shareApi('/api/forms/'+encodeURIComponent(FORM.id)+'/links',{method:'POST',body:JSON.stringify({kind:'public',html:html})})
    .then(function(res){ st.textContent=''; document.getElementById('share-main').style.display=''; renderShareLink(res.token); loadShareLinks(); revealQR(); })
    .catch(function(e){
      // Offline / standalone file (no Credify server): still show a QR sample so
      // the user can see what patients receive. Uses a local preview token.
      var offline=/Failed to fetch|NetworkError|not found|TypeError/i.test(e.message||'');
      if(offline){
        st.innerHTML='<span style="color:var(--caution)">Preview mode — this device isn\u2019t connected to the Credify server, so this is a sample QR. On the live app it encodes the real patient link.</span>';
        document.getElementById('share-main').style.display='';
        var sampleUrl=window.location.origin+'/f/'+encodeURIComponent(FORM.id)+'-preview';
        document.getElementById('share-url').value=sampleUrl;
        document.getElementById('share-embed').value='<iframe src="'+sampleUrl+'" width="100%" height="800" style="border:0;max-width:680px" title="Credify form"></iframe>';
        renderQR(sampleUrl);
        revealQR();
      } else {
        st.textContent='Could not create a link: '+e.message;
      }
    });
}
function createPatientLink(){
  var label=document.getElementById('share-label').value.trim();
  var exp=parseInt(document.getElementById('share-exp').value,10);
  var body={kind:'single',label:label||null}; if(!isNaN(exp)&&exp>0) body.expiresInDays=exp;
  shareApi('/api/forms/'+encodeURIComponent(FORM.id)+'/links',{method:'POST',body:JSON.stringify(body)})
    .then(function(){ document.getElementById('share-label').value=''; document.getElementById('share-exp').value=''; toast('Patient link created'); loadShareLinks(); })
    .catch(function(e){ toast(e.message); });
}
function loadShareLinks(){
  shareApi('/api/forms/'+encodeURIComponent(FORM.id)+'/links').then(function(res){
    var rows=(res.links||[]).filter(function(l){ return l.kind==='single'; });
    var box=document.getElementById('share-links');
    if(!rows.length){ box.innerHTML='<div style="font-size:12.5px;color:var(--text-muted)">No patient links yet.</div>'; return; }
    box.innerHTML=rows.map(function(l){
      var url=window.location.origin+'/f/'+l.token;
      var used=(l.status==='used'?'used':(l.status==='revoked'?'revoked':(l.status==='expired'?'expired':'active')));
      var meta=[used, (l.expires_at?('expires '+new Date(l.expires_at).toLocaleDateString()):'')].filter(Boolean).join(' · ');
      return '<div style="display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--border)">'
        +'<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600">'+shEsc(l.label||'Patient link')+'</div>'
        +'<div style="font-size:11px;color:var(--text-muted)">'+shEsc(meta)+'</div></div>'
        +(used==='active' ? ('<button class="btn ghost" type="button" data-copy="'+shEsc(url)+'">Copy</button><button class="btn ghost" type="button" data-revoke="'+shEsc(l.id)+'">Revoke</button>') : '')
        +'</div>';
    }).join('');
    Array.prototype.forEach.call(box.querySelectorAll('[data-copy]'),function(b){ b.onclick=function(){ copyText(b.getAttribute('data-copy')); toast('Link copied'); }; });
    Array.prototype.forEach.call(box.querySelectorAll('[data-revoke]'),function(b){ b.onclick=function(){ shareApi('/api/links/'+b.getAttribute('data-revoke')+'/revoke',{method:'POST'}).then(function(){ toast('Link revoked'); loadShareLinks(); }).catch(function(e){ toast(e.message); }); }; });
  }).catch(function(){});
}

/* ============================================================
   FORM-LEVEL STYLE — default font / size / color
   ============================================================
   FORM.style is a plain object with three optional keys:
     { font: 'sora'|'system'|'sans'|'serif'|'mono'|'instrument',
       size: 14 (points, 10..24),
       color: '#0d1f18' }
   When any key is missing the field falls back to the Credify default
   for that property. An entirely-empty style object (or no FORM.style at
   all) means "use Credify defaults" and adds no overrides.

   We keep the values minimal in storage so old forms without style still
   open correctly — backwards-compatibility was non-negotiable here.
*/
const FONT_STACKS = {
  sora:        "'Sora', system-ui, sans-serif",
  system:      "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  sans:        "Arial, Helvetica, sans-serif",
  serif:       "Georgia, 'Times New Roman', Times, serif",
  mono:        "ui-monospace, Menlo, Consolas, monospace",
  instrument:  "'Instrument Serif', Georgia, serif",
};
const FONT_LABELS = {
  sora:'Sora', system:'System (default)', sans:'Sans-serif', serif:'Serif',
  mono:'Monospace', instrument:'Instrument Serif',
};
// Credify defaults applied to a form's output when it hasn't overridden font/size.
const STYLE_DEFAULT_FONT = 'system';
const STYLE_DEFAULT_SIZE = 11; // points
const FORM_COLOR_SWATCHES = [
  {hex:'#0d1f18', name:'Ink (default)'},
  {hex:'#0a3d2b', name:'Deep green'},
  {hex:'#1a8a66', name:'Brand green'},
  {hex:'#527060', name:'Muted'},
  {hex:'#0e7490', name:'Blue'},
  {hex:'#c0392b', name:'Red'},
  {hex:'#d97706', name:'Amber'},
  {hex:'#000000', name:'Black'},
];

function ensureFormStyleInit(){
  if(!FORM.style || typeof FORM.style !== 'object') FORM.style = {};
}

/* Resolve to concrete CSS values, falling back to Credify defaults for any
   missing keys. Returned object is what we apply to .preview-form via CSS
   vars; same shape is used by the exporter. */
/* Resolve ANY style object (FORM.style or a field's field.style) to concrete
   CSS values, falling back to nothing for missing keys. Per-field styles use
   the exact same shape as the form style, so one resolver serves both. */
function resolveStyleObj(s){
  s = s || {};
  const fontKey = s.font && FONT_STACKS[s.font] ? s.font : null;
  const size = (typeof s.size === 'number' && s.size >= 8 && s.size <= 32) ? s.size : null;
  const color = (typeof s.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(s.color)) ? s.color : null;
  return {
    fontKey,
    fontFamily: fontKey ? FONT_STACKS[fontKey] : null,
    size,
    color,
    hasOverrides: !!(fontKey || size || color),
  };
}
function resolveFormStyle(){
  const r = resolveStyleObj(FORM && FORM.style);
  // Apply the Credify defaults for anything the form hasn't overridden, so the
  // form's baseline output is System / 11pt. (hasOverrides still reflects only
  // real user overrides, so inspector hints and pruning stay accurate.)
  if(!r.fontKey){ r.fontKey = STYLE_DEFAULT_FONT; r.fontFamily = FONT_STACKS[STYLE_DEFAULT_FONT]; }
  if(r.size == null){ r.size = STYLE_DEFAULT_SIZE; }
  return r;
}

/* The effective font/size/color a field should show ON THE BUILDER CANVAS,
   considering only REAL overrides (field over form) — not the System/11
   baseline. Returns nulls when nothing is overridden so the canvas keeps its
   compact default; when something is set, the canvas reflects it (WYSIWYG),
   including option labels. */
function fieldCanvasStyleVars(field){
  const ff = resolveStyleObj(field && field.style);
  const fm = resolveStyleObj(FORM && FORM.style);
  const font  = ff.fontFamily || fm.fontFamily || null;
  const size  = (ff.size != null) ? ff.size : (fm.size != null ? fm.size : null);
  const color = ff.color || fm.color || null;
  return { font, size, color, any: !!(font || size != null || color) };
}

/* ===== Style scope =====
   The style modal can target either the whole form (FORM.style) or a single
   field (field.style). STYLE_SCOPE tracks which. fieldId is the field the modal
   would style in field mode (set from the inspector entry point, or the
   currently-selected field). currentStyleObj() returns the object the modal
   reads/writes, creating field.style lazily. A field's style overrides the
   form style per-property; unset keys inherit the form (and then the Credify
   default). */
var STYLE_SCOPE = { mode:'form', fieldId:null };
function styleScopeField(){ return STYLE_SCOPE.fieldId ? findFieldById(STYLE_SCOPE.fieldId) : null; }
function currentStyleObj(){
  if(STYLE_SCOPE.mode === 'field'){
    const f = styleScopeField();
    if(f){ if(!f.style || typeof f.style !== 'object') f.style = {}; return f.style; }
    STYLE_SCOPE.mode = 'form'; // field vanished — fall back to form scope
  }
  ensureFormStyleInit();
  return FORM.style;
}
/* Value to DISPLAY in the modal for a property. In field scope, an unset key
   shows the inherited form value so the controls reflect what the field
   currently looks like; writing still targets the field. */
function styleDisplayVal(key){
  const scoped = currentStyleObj();
  if(scoped[key] != null) return scoped[key];
  if(STYLE_SCOPE.mode === 'field'){ const fs = FORM.style || {}; if(fs[key] != null) return fs[key]; }
  return null;
}
/* Does any field carry its own style override? (drives the .styled class when
   the form itself has no override but a field does). */
function anyFieldStyled(){
  return (FORM.rows||[]).some(r => (r.fields||[]).some(f => resolveStyleObj(f.style).hasOverrides));
}
function clearFieldStyleInline(fieldId){
  if(currentFormReadOnly()){ toast('Read-only — can\'t modify this form'); return; }
  const f = findFieldById(fieldId); if(!f) return;
  delete f.style;
  saveForm(); render();
  toast('Field style cleared — inherits the form');
}
/* Drop style objects that carry no real override (e.g. an empty {} left behind
   when the user opens field-style and cancels). Keeps the saved JSON tidy and
   prevents stray style:{} from shipping in exports. Safe: resolveStyleObj
   treats a missing/empty object as "no override" everywhere. */
function pruneStyles(){
  if(FORM.style && !resolveStyleObj(FORM.style).hasOverrides) delete FORM.style;
  (FORM.rows||[]).forEach(r=>(r.fields||[]).forEach(f=>{
    if(f.style && !resolveStyleObj(f.style).hasOverrides) delete f.style;
  }));
}

function openFormStyle(){
  if(currentFormReadOnly && currentFormReadOnly()){ toast && toast("Read-only — can't modify this form"); return; }
  ensureFormStyleInit();
  // Open in form scope. Carry the selected field (if any) as the field-scope
  // target so the user can flip to "Just this field" without reselecting.
  STYLE_SCOPE = { mode:'form', fieldId:(SELECTED && SELECTED.fieldId) ? SELECTED.fieldId : null };
  renderFormStyleModal();
  openModal('form-style-modal');
}

/* Entry point from the field inspector — opens the same modal already scoped
   to this field. */
function openFieldStyle(fieldId){
  if(currentFormReadOnly && currentFormReadOnly()){ toast && toast("Read-only — can't modify this form"); return; }
  const f = findFieldById(fieldId);
  if(!f){ toast && toast('Select a field first'); return; }
  if(!f.style || typeof f.style !== 'object') f.style = {};
  STYLE_SCOPE = { mode:'field', fieldId:fieldId };
  renderFormStyleModal();
  openModal('form-style-modal');
}

/* Toggle the modal between form-wide and single-field scope. Field scope needs
   a target field; if none is set we adopt the currently-selected field, else
   we tell the user to pick one. */
function setStyleScope(mode){
  if(mode === 'field'){
    if(!STYLE_SCOPE.fieldId && SELECTED && SELECTED.fieldId) STYLE_SCOPE.fieldId = SELECTED.fieldId;
    if(!STYLE_SCOPE.fieldId || !findFieldById(STYLE_SCOPE.fieldId)){
      toast && toast('Select a field on the canvas first');
      return;
    }
    const f = findFieldById(STYLE_SCOPE.fieldId);
    if(f && (!f.style || typeof f.style !== 'object')) f.style = {};
    STYLE_SCOPE.mode = 'field';
  } else {
    STYLE_SCOPE.mode = 'form';
  }
  renderFormStyleModal();
}

function renderFormStyleModal(){
  const body = document.getElementById('form-style-body');
  if(!body) return;
  // Dynamic title reflects the active scope.
  const titleEl = document.querySelector('#form-style-modal .modal-head h3');
  if(titleEl) titleEl.textContent = (STYLE_SCOPE.mode === 'field') ? 'Field style' : 'Form style';
  const resetBtn = document.querySelector('#form-style-modal .fs-reset');
  if(resetBtn) resetBtn.textContent = (STYLE_SCOPE.mode === 'field') ? 'Reset this field' : 'Reset to Credify default';
  const tgt = styleScopeField();
  const tgtLabel = tgt ? (tgt.label || 'this field') : null;
  // Display values are scope-aware: in field scope an unset property shows the
  // inherited form value so the controls reflect the field's current look.
  const dvFont = styleDisplayVal('font');
  const dvSize = styleDisplayVal('size');
  const dvColor = styleDisplayVal('color');
  const currentFontKey = dvFont || STYLE_DEFAULT_FONT;     // default visual is System
  const currentSize = (typeof dvSize === 'number') ? dvSize : STYLE_DEFAULT_SIZE;
  const currentColor = (typeof dvColor === 'string') ? dvColor : '#0d1f18';

  let html = '';
  // ---- Scope picker: apply to all fields, or just this one ----
  html += `<div class="fs-section fs-scope">
    <div class="modal-field"><label>Apply to</label></div>
    <div class="fs-scope-seg">
      <button type="button" class="fs-scope-btn${STYLE_SCOPE.mode==='field'?' active':''}"${tgt?'':' disabled'} onclick="setStyleScope('field')">Just this field${tgtLabel?` · ${esc(tgtLabel)}`:''}</button>
      <button type="button" class="fs-scope-btn${STYLE_SCOPE.mode==='form'?' active':''}" onclick="setStyleScope('form')">All fields</button>
    </div>
    ${tgt
      ? (STYLE_SCOPE.mode==='field'
          ? `<div class="fs-scope-note">Styling only <strong>${esc(tgtLabel)}</strong>. Unset options inherit the form style.</div>`
          : `<div class="fs-scope-note">Styling the whole form. Switch to “Just this field” to override <strong>${esc(tgtLabel)}</strong> alone.</div>`)
      : `<div class="fs-scope-note">Select a field on the canvas to style it on its own.</div>`}
  </div>`;

  // ---- Font family ----
  html += `<div class="fs-section">
    <div class="modal-field"><label>Font family</label></div>
    <div class="fs-fonts">`;
  Object.keys(FONT_STACKS).forEach(key=>{
    const active = (key===currentFontKey);
    html += `<button type="button" class="fs-font${active?' active':''}" data-fs-font="${key}" onclick="setFormStyle('font','${key}')">
      <span class="fs-font-name">${esc(FONT_LABELS[key])}</span>
      <span class="fs-font-sample" style="font-family:${FONT_STACKS[key]}">The quick brown fox</span>
    </button>`;
  });
  html += `</div></div>`;

  // ---- Font size (pt) ----
  html += `<div class="fs-section">
    <div class="modal-field"><label>Font size (pt)</label></div>
    <div class="fs-size-row">
      <input type="number" id="fs-size-num" min="10" max="24" step="0.5" value="${currentSize}" oninput="setFormStyle('size', parseFloat(this.value)||${STYLE_DEFAULT_SIZE})">
      <input type="range" id="fs-size-range" min="10" max="24" step="0.5" value="${currentSize}" oninput="document.getElementById('fs-size-num').value=this.value; setFormStyle('size', parseFloat(this.value)||${STYLE_DEFAULT_SIZE})">
      <span class="fs-size-suffix">pt</span>
    </div>
  </div>`;

  // ---- Color (presets + picker) ----
  html += `<div class="fs-section">
    <div class="modal-field"><label>Text color</label></div>
    <div class="fs-swatches">`;
  FORM_COLOR_SWATCHES.forEach(sw=>{
    const active = (currentColor.toLowerCase() === sw.hex.toLowerCase());
    html += `<button type="button" class="fs-swatch${active?' active':''}" data-fs-color="${sw.hex}" title="${esc(sw.name)}" style="background:${sw.hex}" onclick="setFormStyle('color','${sw.hex}')"></button>`;
  });
  html += `</div>
    <div class="fs-color-row">
      <input type="color" id="fs-color-picker" value="${currentColor}" oninput="setFormStyle('color', this.value)">
      <input type="text" id="fs-color-hex" value="${currentColor.toUpperCase()}" maxlength="7" placeholder="#000000" oninput="onFormStyleHexInput(this.value)">
    </div>
  </div>`;

  body.innerHTML = html;
}

function onFormStyleHexInput(val){
  // Only commit if it parses as a 6-digit hex; ignore intermediate typing.
  if(/^#[0-9a-fA-F]{6}$/.test(val)) setFormStyle('color', val);
}

/* Single entrypoint for any style change. Updates FORM.style, saves, refreshes
   the preview if visible, and updates the modal's active-chip / active-swatch
   states in-place WITHOUT re-rendering the whole modal — that would otherwise
   destroy the live input the user is interacting with (hex field, slider, or
   native color picker), causing focus loss and broken drag tracking. */
function setFormStyle(key, value){
  // Target the scoped object: FORM.style in form scope, field.style in field scope.
  const target = currentStyleObj();
  // Validate at the setter so invalid values never make it into storage.
  // Each branch either commits a sanitized value or deletes the key.
  let committed = null; // what actually got stored, for downstream use
  if(value == null || value === ''){
    delete target[key];
  } else if(key === 'font'){
    if(FONT_STACKS[value]) { target.font = value; committed = value; }
    // Unknown font: silently ignore. Don't wipe a previously-valid value.
  } else if(key === 'size'){
    const n = Number(value);
    if(Number.isFinite(n) && n >= 10 && n <= 24) { target.size = n; committed = n; }
    // Bad size: leave existing value untouched rather than store nonsense.
  } else if(key === 'color'){
    const v = String(value).toLowerCase();
    if(/^#[0-9a-f]{6}$/.test(v)) { target.color = v; committed = v; }
    // Bad color: ignore.
  } else {
    target[key] = value;
    committed = value;
  }
  if(typeof saveForm === 'function') saveForm();
  // In-place update of the modal so chip/swatch active states track without
  // blowing away inputs.
  if(document.getElementById('form-style-modal').classList.contains('open')) syncFormStyleActive();
  // Live preview update.
  if(MODE === 'preview' && typeof renderPreview === 'function') renderPreview();
  return committed;
}

/* Update just the active visual states inside the modal — no innerHTML rewrites.
   Touches chip/swatch classes + the color picker's value (which is OK to set
   from JS; doesn't close the open picker dialog the way a re-render would). */
function syncFormStyleActive(){
  const dvFont = styleDisplayVal('font');
  const dvSize = styleDisplayVal('size');
  const dvColor = styleDisplayVal('color');
  const currentFontKey = dvFont || 'sora';
  const currentColor = (typeof dvColor === 'string') ? dvColor.toLowerCase() : '#0d1f18';
  document.querySelectorAll('#form-style-body .fs-font').forEach(el=>{
    el.classList.toggle('active', el.dataset.fsFont === currentFontKey);
  });
  document.querySelectorAll('#form-style-body .fs-swatch').forEach(el=>{
    el.classList.toggle('active', (el.dataset.fsColor||'').toLowerCase() === currentColor);
  });
  // Keep the color picker + hex input in sync only if they don't currently
  // have focus — never overwrite what the user is actively editing.
  const picker = document.getElementById('fs-color-picker');
  if(picker && document.activeElement !== picker) picker.value = currentColor;
  const hex = document.getElementById('fs-color-hex');
  if(hex && document.activeElement !== hex) hex.value = currentColor.toUpperCase();
  // Size: keep number + range in sync if user isn't editing them.
  const sizeNum = document.getElementById('fs-size-num');
  const sizeRange = document.getElementById('fs-size-range');
  const cur = (typeof dvSize === 'number') ? dvSize : 14;
  if(sizeNum && document.activeElement !== sizeNum) sizeNum.value = cur;
  if(sizeRange && document.activeElement !== sizeRange) sizeRange.value = cur;
}

function resetFormStyle(){
  if(STYLE_SCOPE.mode === 'field'){
    const f = styleScopeField();
    if(f) delete f.style;
    toast && toast('Field style reset — now inherits the form');
  } else {
    FORM.style = {};
    toast && toast('Form style reset to Credify default');
  }
  if(typeof saveForm === 'function') saveForm();
  renderFormStyleModal();
  if(MODE === 'preview' && typeof renderPreview === 'function') renderPreview();
}

/* Apply resolved style to a .preview-form element by setting the CSS vars
   inline + toggling the .styled class. Used by renderPreview after innerHTML. */
function applyFormStyleToPreview(el){
  if(!el) return;
  const r = resolveFormStyle();   // always carries font + size (Credify defaults)
  // Always treat the preview as styled: the baseline default (System/11) now
  // differs from the raw CSS, so the form-level vars must always be present.
  el.classList.add('styled');
  if(r.fontFamily) el.style.setProperty('--form-font', r.fontFamily); else el.style.removeProperty('--form-font');
  if(r.size != null) el.style.setProperty('--form-size', r.size + 'pt'); else el.style.removeProperty('--form-size');
  if(r.color) el.style.setProperty('--form-color', r.color); else el.style.removeProperty('--form-color');
  // Per-field overrides: set only the properties the field overrides on its
  // own .pf-field element, so unset properties keep inheriting the form/root.
  (FORM.rows||[]).forEach(row=>(row.fields||[]).forEach(f=>{
    const fe = el.querySelector('.pf-field[data-field-id="'+f.id+'"]');
    if(!fe) return;
    const rf = resolveStyleObj(f.style);
    if(rf.fontFamily) fe.style.setProperty('--form-font', rf.fontFamily); else fe.style.removeProperty('--form-font');
    if(rf.size != null) fe.style.setProperty('--form-size', rf.size + 'pt'); else fe.style.removeProperty('--form-size');
    if(rf.color) fe.style.setProperty('--form-color', rf.color); else fe.style.removeProperty('--form-color');
  }));
}

function setExportMode(mode){
  EXPORT_MODE=mode;
}

function switchExportTab(tab){
  EXPORT_MODE=tab;
  document.getElementById('export-json-tab').classList.toggle('active',tab==='json');
  document.getElementById('export-html-tab').classList.toggle('active',tab==='html');
  document.getElementById('export-json').style.display=(tab==='json')?'block':'none';
  document.getElementById('export-html').style.display=(tab==='html')?'block':'none';
  // Regenerate the content for whichever tab is now showing. Without this,
  // switching tabs inside the modal would reveal an empty/stale pane (and
  // Copy/Download would then export nothing).
  if(tab==='json') document.getElementById('export-json').textContent=JSON.stringify(buildSchema(),null,2);
  else document.getElementById('export-html').value=buildHTMLForm();
  // The score-panel toggle only makes sense on the HTML tab AND only when the
  // form actually defines scoring sections — otherwise it's a no-op control.
  const scoresRow=document.getElementById('export-scores-row');
  if(scoresRow){
    const hasScoring=(FORM.scoringSections||[]).some(s=>(s.fieldIds||[]).length>0);
    scoresRow.style.display=(tab==='html'&&hasScoring)?'flex':'none';
    const cb=document.getElementById('export-scores-toggle');
    if(cb) cb.checked=EXPORT_SHOW_SCORES;
  }
}

function toggleExportScores(on){
  EXPORT_SHOW_SCORES=!!on;
  const ta=document.getElementById('export-html');
  if(ta) ta.value=buildHTMLForm();
}

function exportStatusBarHTML(field){
  const mode = pbMode(field); // aboveForm | allPages | pageBetween
  return `<div class="status-bar" data-statusbar data-calc="${mode}" data-place="${pbPlace(field)}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(field.label||'Progress')}">`
    +`<div class="status-bar-head"><span class="status-bar-label">${esc(field.label||'Progress')}</span><span class="status-bar-pct">0%</span></div>`
    +`<div class="status-bar-track"><div class="status-bar-fill" style="width:0%"></div></div>`
    +`</div>`;
}

let POPUP_EMBED_DEPTH=0;
/* Build a standalone export for ANY form object by briefly swapping the global
   FORM. Used to render a linked "popup" form inside an iframe (preview) or to
   embed it in an export. Depth-guarded so a linked form's own popup links
   don't recurse. */
function buildHTMLForFormObj(formObj){
  const saved=FORM;
  POPUP_EMBED_DEPTH++;
  try{ FORM=formObj; return buildHTMLForm(); }
  finally{ FORM=saved; POPUP_EMBED_DEPTH--; }
}
/* All distinct openForm form-ids referenced by any rule on the current form. */
function collectPopupFormIds(){
  const ids=new Set();
  const scan=c=>{ if(c&&c.openForm&&c.openForm.id) ids.add(c.openForm.id); };
  (FORM.rows||[]).forEach(row=>{ scan(row.showIf); (row.fields||[]).forEach(f=>scan(f.showIf)); });
  (FORM.visibilityGroups||[]).forEach(g=>scan(g.showIf));
  if(FORM.pageRules) Object.keys(FORM.pageRules).forEach(p=>scan(FORM.pageRules[p]));
  return Array.from(ids);
}

/* True when some OTHER saved form has a cross-form condition that reads THIS
   form (matched by id). Such a "data-source" form must emit its runtime so it
   publishes its answers to the shared bridge — otherwise the sibling's rule can
   never see them (this is the field-value analog of always emitting for scored
   forms). Walks the full rule tree incl. nested block conditions, field/row
   showIf, visibility groups, and page rules. Privacy-preserving: a standalone
   form nobody reads still emits nothing and publishes nothing. */
function formIsCrossFormSource(){
  const targetId = FORM && FORM.id;
  if(!targetId || typeof FORMS==='undefined' || !Array.isArray(FORMS)) return false;
  let hit=false;
  const walk=c=>{ if(!c||hit) return;
    if(c.block){ (c.conditions||[]).forEach(walk); return; }
    if(c.formId && c.formId===targetId) hit=true;
  };
  for(let i=0;i<FORMS.length && !hit;i++){
    const o=FORMS[i]; if(!o || o.id===targetId) continue;
    (o.rows||[]).forEach(row=>{ walk(row.showIf); (row.fields||[]).forEach(f=>walk(f.showIf)); });
    (o.visibilityGroups||[]).forEach(g=>walk(g.showIf));
    if(o.pageRules) Object.keys(o.pageRules).forEach(p=>walk(o.pageRules[p]));
  }
  return hit;
}

function buildHTMLForm(){
  // popupMap maps a linked-form id -> base64 of its standalone export, used by
  // the "open a form when met" 80% popup. Hoisted to function scope so the
  // closing-injection (before </body>) can see it even though it's populated
  // inside the emitLogic block below.
  let popupMap={};
  let html=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(FORM.title||'Form')}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;background:linear-gradient(180deg,#f6faf8 0%,#eaf1ed 100%);min-height:100vh;padding:40px 20px}
.form-container{max-width:1040px;margin:0 auto;background:#fff;padding:40px 44px;border-radius:18px;border:1px solid #e2ebe6;box-shadow:0 1px 2px rgba(13,31,24,.04),0 24px 48px -24px rgba(13,31,24,.20)}
@media(max-width:680px){body{padding:16px}.form-container{padding:24px 20px;border-radius:14px}}
h1{font-size:28px;margin-bottom:8px;color:#0d1f18}
.form-desc{color:#666;font-size:14px;margin-bottom:24px;line-height:1.5}
.form-row{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #ececec}
/* Plain forms (no logic runtime) rely on :last-of-type. Forms WITH conditional
   logic additionally get an explicit .is-last-visible marker from the runtime,
   which correctly skips rows hidden by rules. Both simply remove the border. */
.form-row:last-of-type,.form-row.is-last-visible{border-bottom:none;padding-bottom:0}
.form-field{grid-column:span var(--span,3);min-width:0}
/* Conditional-visibility: branched rows/fields are hidden until their rule
   passes. Their inner controls are also disabled by the logic runtime so they
   never block validation or appear in submitted data while hidden. */
.cond-hidden{display:none!important}
.form-field label{display:block;font-weight:600;font-size:13px;margin-bottom:6px;color:#0d1f18}
.form-field label .req{color:#c92a2a;font-weight:700}
.form-field input[type=text],.form-field input[type=email],.form-field input[type=tel],.form-field input[type=number],.form-field input[type=date],.form-field input[type=time],.form-field input[type=url],.form-field input[type=password],.form-field select,.form-field textarea{width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;font-family:inherit;font-size:16px}
.form-field input:focus,.form-field select:focus,.form-field textarea:focus{outline:none;border-color:#1a8a66;box-shadow:0 0 0 3px rgba(26,138,102,.1)}
.form-field.invalid input,.form-field.invalid select,.form-field.invalid textarea,.form-field.invalid .cdd-btn,.form-field.invalid .tt-trigger,.form-field.invalid .sign-pad{border-color:#c92a2a!important;box-shadow:0 0 0 3px rgba(201,42,42,.15)!important}
.form-field.invalid > label,.form-field.invalid label:first-of-type{color:#c92a2a}
.field-error{color:#c92a2a;font-size:12px;font-weight:600;margin-top:5px}
.form-field textarea{resize:vertical;min-height:100px}
.form-field .help{font-size:12px;color:#666;margin-top:4px}
.form-field .opts{display:flex;flex-direction:column;gap:4px;margin-top:6px}
.matrix-wrap{overflow-x:auto;margin-top:6px;border:1px solid #e6e9ee;border-radius:10px}
.matrix-tbl{border-collapse:collapse;width:100%;font-size:13px}
.matrix-tbl th,.matrix-tbl td{padding:9px 10px;text-align:center;border-bottom:1px solid #eef1f4}
.matrix-tbl tbody tr:last-child td{border-bottom:0}
.matrix-tbl thead th{font-weight:600;color:#3a4a42;background:#f3f7f5;vertical-align:bottom}
.matrix-tbl th.mx-q,.matrix-tbl td.mx-q{text-align:left;min-width:210px;color:#1f2a24;font-weight:500}
.matrix-tbl th.mx-c{font-size:12px;line-height:1.25;min-width:84px}
.matrix-tbl tbody tr:nth-child(even){background:#fafbfc}
.matrix-tbl td.mx-cell input{width:18px;height:18px;cursor:pointer;accent-color:#1a8a66;margin:0}
.matrix-tbl .mx-empty{color:#8a97a0;font-style:italic;text-align:center;padding:16px 10px}
.matrix-card .matrix-tbl td.mx-cell input{cursor:default;pointer-events:none}
.matrix-tbl .mx-img{display:block;width:46px;height:46px;object-fit:contain;margin:0 auto 5px}
.matrix-tbl th.mx-c .mx-c-txt{display:block;font-size:12px;line-height:1.25}
.form-field .opts.opts-h{flex-direction:row;flex-wrap:wrap;gap:6px 24px}
.totaltime{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.tt-part{display:flex;flex-direction:column;gap:4px;min-width:0}
.totaltime .tt-picker{display:block;width:100%}
.totaltime .tt-trigger{display:flex;width:100%;min-width:0}
.time-field{display:block}
.time-field .tt-picker{display:block}
.time-field .tt-trigger{display:flex;width:100%;min-width:0}
.totaltime .tt-trigger-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tt-sub{font-size:11px;font-weight:600;color:#666;letter-spacing:.02em}
.tt-total{background:#f5f5f5;color:#555;font-weight:600}
.tt-picker{position:relative;display:inline-block}
.tt-trigger{display:inline-flex;align-items:center;justify-content:space-between;gap:8px;min-width:150px;padding:10px 12px;border:1px solid #ddd;border-radius:4px;background:#fff;font-family:inherit;font-size:15px;cursor:pointer}
.tt-trigger:disabled{opacity:.6;cursor:default}
.tt-picker:not(.tt-has-val) .tt-trigger-label{color:#999}
.tt-trigger-caret{color:#888;font-size:11px}
.tt-pop{position:absolute;top:calc(100% + 5px);left:0;z-index:50;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.16);padding:10px;width:max-content}
.tt-pop.tt-pop-up{top:auto;bottom:calc(100% + 5px)}
.tt-pop.tt-pop-right{left:auto;right:0}
.tt-pop-cols{display:flex;gap:14px}
.tt-col{display:flex;flex-direction:column}
.tt-col-cap{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#999;margin-bottom:6px;text-align:center}
.tt-col .tt-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.tt-mins .tt-opts{grid-template-columns:repeat(6,1fr)}
.tt-opt{padding:8px 0;min-width:36px;border:1px solid transparent;border-radius:6px;background:#f5f5f5;color:#222;font-family:inherit;font-size:14px;cursor:pointer;text-align:center}
.tt-opt:hover{background:#e8f5ef;color:#1a8a66}
.tt-opt.sel{background:#1a8a66;color:#fff;font-weight:600}
.tt-ampm{display:flex;gap:6px;margin:0 0 10px}
.tt-ap-btn{flex:1;padding:9px 0;border:1px solid #ddd;border-radius:6px;background:#fff;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer}
.tt-ampm .tt-ap-btn:first-child:not(.sel){border-color:#0a3d2b;background:#0a3d2b;color:#fff}
.tt-ap-btn.sel{background:#1a8a66;border-color:#1a8a66;color:#fff}
@media(max-width:560px){.totaltime{grid-template-columns:1fr}}
.form-field .opt{display:flex;align-items:center;font-size:15px;padding:5px 0;line-height:1.2}
.form-field .opt input{width:18px;height:18px;margin:0 7px 0 0;flex:0 0 auto;accent-color:#1a8a66}
/* Checkbox / toggle fields put their label inline next to the box and have no
   header line. To keep them vertically aligned with sibling fields in the same
   row (whose label header pushes their input down ~22px), offset the box+label
   by the same amount and lay them out as a centered row. */
.form-field.optfield{padding-top:22px}
.form-field.optfield label{display:flex;align-items:center;font-weight:600;font-size:15px;margin-bottom:0;color:#0d1f18;line-height:1.2}
.form-field.optfield label input[type=checkbox]{width:18px;height:18px;margin:0 8px 0 0;flex:0 0 auto;accent-color:#1a8a66}
/* When a checkbox/toggle is the only field in its row, there is nothing to
   align to, so drop the offset. (Single-field rows = the field spans 12.) */
.form-row > .form-field.optfield:only-child{padding-top:0}
.weight-badge{display:inline-block;background:#0e7490;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:3px;margin-left:8px}
.form-submit{margin-top:24px;display:flex;justify-content:flex-end}
.btn{padding:12px 24px;background:#1a8a66;color:#fff;border:none;border-radius:4px;font-weight:600;cursor:pointer;font-size:16px}
.btn:hover{background:#0a3d2b}
/* Tablet: short fields go half-width, long fields full */
@media(max-width:820px){
  .form-container{padding:24px}
  .form-field{grid-column:span 12}
  .form-field.short{grid-column:span 6}
}
/* Phone: stack everything */
@media(max-width:520px){
  body{padding:10px}
  .form-container{padding:18px}
  .form-field,.form-field.short{grid-column:span 12}
}
/* Multi-page wizard styles (only active when the form has >1 page) */
.page-step{display:none;border:none;padding:0;margin:0}
.page-step.active{display:block}
/* Print / PDF: show every page, drop wizard chrome so the whole form prints. */
@media print{
  html,body{background:#fff!important}
  .page-step{display:block!important;break-inside:avoid}
  .page-nav,#prev-btn,#next-btn,#submit-btn,.page-indicator,.page-progress{display:none!important}
  .cond-hidden{display:none!important}
}
.page-indicator{font-size:12px;font-weight:600;color:#666;letter-spacing:.04em;text-transform:uppercase;margin-bottom:14px}
.page-progress{margin:0 0 6px;background:#f0f3f1;border-radius:999px;height:6px;overflow:hidden}
.page-progress-fill{height:100%;background:#1a8a66;border-radius:999px;transition:width .25s ease}
.status-bar{margin:0 0 16px}
.status-bar-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px}
.status-bar-label{font-size:13px;font-weight:600;color:#0d1f18}
.status-bar-pct{font-size:12px;font-weight:700;color:#1a8a66}
.status-bar-track{height:8px;background:#f0f3f1;border-radius:999px;overflow:hidden}
.status-bar-fill{height:100%;background:#1a8a66;border-radius:999px;transition:width .25s ease;min-width:0}
.page-nav{display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-top:24px;padding-top:18px;border-top:1px solid #ddd}
.page-nav .btn[disabled]{opacity:.35;cursor:not-allowed}
.btn-secondary{padding:12px 24px;background:#fff;color:#333;border:1px solid #ddd;border-radius:4px;font-weight:600;cursor:pointer;font-size:16px}
.btn-secondary:hover:not([disabled]){border-color:#1a8a66;color:#1a8a66}
/* Score panel — only emitted when the form has scoring sections. The panel
   floats inside the form so it's visible across pages in the wizard. */
.score-panel{margin-top:24px;padding-top:18px;border-top:1px solid #ddd;display:flex;flex-direction:column;gap:10px}
.score-panel-h{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#666;margin-bottom:2px}
.score-card{padding:13px 15px;background:#eaf6f1;border:1px solid #d3eadf;border-radius:6px;display:flex;align-items:center;gap:14px}
.score-card .sc-name{font-size:14px;font-weight:600;color:#0d1f18;flex:1;min-width:0}
.score-card .sc-total{font-size:22px;font-weight:700;color:#0a3d2b;line-height:1;white-space:nowrap}
.score-card .sc-total .sc-max{font-size:13px;font-weight:500;color:#666;margin-left:3px}.score-card .sc-band{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:3px 9px;border-radius:999px;background:#fff;color:#0a3d2b;border:1px solid #d3eadf;white-space:nowrap;display:none}
.score-card .sc-band.show{display:inline-flex}
.score-card.sev-low{background:#eaf6f1;border-color:#d3eadf}
.score-card.sev-low .sc-band{color:#0a3d2b;border-color:#d3eadf}
.score-card.sev-mild{background:#fff8eb;border-color:#fde4a3}
.score-card.sev-mild .sc-total,.score-card.sev-mild .sc-band{color:#a06400}
.score-card.sev-mild .sc-band{border-color:#fde4a3}
.score-card.sev-mod{background:#fef0e0;border-color:#fbcc99}
.score-card.sev-mod .sc-total,.score-card.sev-mod .sc-band{color:#9a4a00}
.score-card.sev-mod .sc-band{border-color:#fbcc99}
.score-card.sev-high{background:#fdedeb;border-color:#f5b6ae}
.score-card.sev-high .sc-total,.score-card.sev-high .sc-band{color:#a02016}
.score-card.sev-high .sc-band{border-color:#f5b6ae}
/* Modern dropdown on desktop only; phones/tablets keep the native picker */
@media (hover:hover) and (pointer:fine){
  .form-field select{
    -webkit-appearance:none;-moz-appearance:none;appearance:none;
    background-image:url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat:no-repeat;
    background-position:right 12px center;
    padding-right:38px;
    cursor:pointer;
  }
  .form-field select:hover{border-color:#1a8a66}
  .form-field select:focus{
    background-image:url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231a8a66' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  }
}
/* Custom dropdown widget — desktop only; native select on touch devices */
.cdd{display:none}
@media (hover:hover) and (pointer:fine){
  select.has-cdd{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;clip:rect(0 0 0 0);overflow:hidden}
  .cdd{display:block;position:relative;width:100%}
  .cdd-btn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;font-family:inherit;font-size:16px;text-align:left;background:#fff;color:#333;border:1px solid #ddd;border-radius:4px;padding:10px 12px;cursor:pointer;transition:border-color .12s,box-shadow .12s}
  .cdd-btn:hover{border-color:#1a8a66}
  .cdd.open .cdd-btn{border-color:#1a8a66;box-shadow:0 0 0 3px rgba(26,138,102,.1)}
  .cdd-val{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cdd-val.placeholder{color:#999}
  .cdd-chev{flex-shrink:0;width:16px;height:16px;color:#666;transition:transform .15s}
  .cdd.open .cdd-chev{transform:rotate(180deg);color:#1a8a66}
  .cdd-menu{position:absolute;top:calc(100% + 5px);left:0;right:0;z-index:50;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 16px 48px rgba(0,0,0,.18);padding:5px;max-height:280px;overflow-y:auto;opacity:0;transform:translateY(-4px);pointer-events:none;transition:opacity .13s ease,transform .13s ease}
  .cdd.open .cdd-menu{opacity:1;transform:translateY(0);pointer-events:auto}
  .cdd-search-wrap{position:sticky;top:0;background:#fff;padding:1px 1px 5px;margin-bottom:3px;z-index:1}
  .cdd-search{width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font:inherit;font-size:15px;color:#333;outline:none}
  .cdd-search:focus{border-color:#1a8a66;box-shadow:0 0 0 3px rgba(26,138,102,.1)}
  .cdd-opt{padding:10px 12px;border-radius:5px;font-size:15px;color:#333;cursor:pointer;display:flex;align-items:center;transition:background .1s}
  .cdd-opt:hover,.cdd-opt.active{background:#edfaf4}
  .cdd-opt.selected{font-weight:600;color:#1a8a66}
  .cdd-opt.selected:after{content:'✓';margin-left:auto}
}
/* ===== Form-level style overrides (font/size/color) =====
   When the builder sets FORM.style, the .form-container below carries inline
   CSS variables (--form-font, --form-size, --form-color). The selectors here
   override the default inputs/labels rules above by name so the variables
   actually win the cascade. */
.form-container.styled,
.form-container.styled h1,
.form-container.styled .form-desc,
.form-container.styled .form-field label,
.form-container.styled .form-field input,
.form-container.styled .form-field select,
.form-container.styled .form-field textarea,
.form-container.styled .form-field .opt,
.form-container.styled .form-field .cdd-btn,
.form-container.styled .form-field .cdd-opt,
.form-container.styled .form-field .tt-trigger,
.form-container.styled .form-field .swt-side,
.form-container.styled .form-field .help,
.form-container.styled .page-indicator{
  font-family: var(--form-font, inherit);
  color: var(--form-color, inherit);
}
.form-container.styled .form-field label,
.form-container.styled .form-field input,
.form-container.styled .form-field select,
.form-container.styled .form-field textarea,
.form-container.styled .form-field .opt,
.form-container.styled .form-field .cdd-btn,
.form-container.styled .form-field .cdd-opt,
.form-container.styled .form-field .tt-trigger,
.form-container.styled .form-field .swt-side,
.form-container.styled .form-field .help,
.form-container.styled .form-desc{
  font-size: var(--form-size, inherit);
}
.swt-wrap{position:relative;display:inline-flex !important;align-items:center;flex-wrap:nowrap;gap:14px;cursor:pointer;user-select:none;margin:6px 0 2px !important;font-weight:400 !important;width:auto;white-space:nowrap}
.swt-input{position:absolute;left:0;top:0;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}
.swt-track{position:relative;width:46px;height:26px;border-radius:999px;background:#d6dcd9;transition:background .18s;flex:none}
.swt-thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .18s}
.swt-input:checked ~ .swt-track{background:#1a8a66}
.swt-input:checked ~ .swt-track .swt-thumb{transform:translateX(20px)}
.swt-side{font-size:14px;color:#9aa6a0;transition:color .15s}
.swt-input ~ .swt-side.swt-off{color:#111;font-weight:600}
.swt-input:checked ~ .swt-side.swt-off{color:#9aa6a0;font-weight:400}
.swt-input:checked ~ .swt-side.swt-on{color:#111;font-weight:600}
.radio-deselect-tip{position:fixed;z-index:99999;background:#0d1f18;color:#fff;font-size:12px;font-weight:500;padding:7px 11px;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.22);pointer-events:none;max-width:220px;line-height:1.35}
.phone-ext{display:flex;gap:8px;align-items:stretch}
.phone-ext .cw-phone-main{flex:1;min-width:0}
.cw-phone-ext{flex:0 0 84px;width:84px;text-align:center}
</style>
</head>
<body>
<div class="form-container styled"${(function(){const r=resolveFormStyle();let s=' style="';if(r.fontFamily) s+=`--form-font:${r.fontFamily};`;if(r.size!=null) s+=`--form-size:${r.size}pt;`;if(r.color) s+=`--form-color:${r.color};`;return s+'"';})()}>
<h1>${esc(FORM.title||'Untitled form')}</h1>`;
  if(FORM.desc) html+=`<div class="form-desc">${esc(FORM.desc)}</div>`;
  // Group rows by page so multi-page builder forms export as a wizard. Single
  // page forms render exactly as before (one fieldset, no navigation, identical
  // visual output). Pages are renumbered contiguously so any gaps in the
  // builder's numbering don't surface to the patient.
  const pagesInForm=[...new Set(FORM.rows.map(r=>r.page||1))].sort((a,b)=>a-b);
  const totalExportPages=pagesInForm.length||1;
  const multiPage=totalExportPages>1;
  // A progress bar is worth showing only when the form actually has fields to
  // fill (not a content-only page). Patient-hidden fields never render, so they
  // don't count toward completion.
  const hasFillableExport = FORM.rows.some(r=>(r.fields||[]).some(f=>!['heading','divider','statusbar'].includes(f.type) && !fieldHiddenFromPatient(f)));
  // When the form has its own status-bar field(s), they replace the automatic
  // top progress bar.
  const hasStatusBar = FORM.rows.some(r=>(r.fields||[]).some(f=>f.type==='statusbar'));
  html+=`<form id="credify-form" novalidate${multiPage?' data-multipage="1"':''}>`;
  // No automatic progress bar — only Progress Bar fields render one. Multi-page
  // forms keep a lightweight page indicator for orientation (no completion %).
  if(multiPage){
    html+=`<div class="page-indicator" id="page-indicator">Page 1 of ${totalExportPages}</div>`;
  }
  for(let pageIdx=1; pageIdx<=totalExportPages; pageIdx++){
    const origPage = pagesInForm[pageIdx-1] || 1;
    html+=`<fieldset class="page-step${pageIdx===1?' active':''}" data-step="${pageIdx}" data-cpage="${origPage}">`;
    // Progress Bar fields set to "top" / "top & bottom" render an extra copy at
    // the top of the page (their inline placement acts as the bottom anchor).
    FORM.rows.filter(r=>(r.page||1)===origPage).forEach(r=>(r.fields||[]).forEach(f=>{
      if(f.type==='statusbar' && pbMode(f)==='pageBetween' && (pbPlace(f)==='top'||pbPlace(f)==='both')) html+=exportStatusBarHTML(f);
    }));
    FORM.rows.forEach(row=>{
      if((row.page||1)!==origPage) return;
      html+=`<div class="form-row" data-crow="${row.id}">`;
      row.fields.forEach(field=>{
        if(fieldHiddenFromPatient(field)) return; // clinician-only — never rendered on the patient-facing form
        // Note: weight-group % is internal scoring metadata and is deliberately
        // NOT rendered on the patient-facing form (it would leak config and
        // confuse respondents). It still ships in the JSON schema export.
        const ph=field.placeholder?field.placeholder:'';
        const help=field.help?`<div class="help">${esc(field.help)}</div>`:'';
        const req=field.required?' required':'';
        const reqStar=field.required?'<span class="req">*</span>':'';
        const span=field.span||({textarea:12,radio:12,checkboxes:12,select:6,email:6,url:6,file:6,heading:12,paragraph:12,divider:12}[field.type]||3);
        const isShort=['text','number','date','time','phone','select','range','rating','color'].includes(field.type);
        const isOptField=field.type==='checkbox'||(field.type==='toggle'&&field.toggleStyle==='checkbox');
        const topOnlySB=(field.type==='statusbar'&&pbMode(field)==='pageBetween'&&pbPlace(field)==='top');
        const rfStyle=resolveStyleObj(field.style);
        let fStyleVars='';
        if(rfStyle.fontFamily) fStyleVars+=`--form-font:${rfStyle.fontFamily};`;
        if(rfStyle.size!=null) fStyleVars+=`--form-size:${rfStyle.size}pt;`;
        if(rfStyle.color) fStyleVars+=`--form-color:${rfStyle.color};`;
        html+=`<div class="form-field${isShort?' short':''}${isOptField?' optfield':''}${topOnlySB?' cond-hidden':''}" data-cfield="${field.id}"${field.dataKey?` data-key="${esc(field.dataKey)}"`:''} style="--span:${span};${fStyleVars}">`;
        switch(field.type){
          case 'heading':
            html+=`<h2 style="font-size:18px;margin:16px 0 12px;color:#0d1f18">${esc(field.label)}</h2>`;
            break;
          case 'paragraph': {
            const pmult=Math.max(1,Math.min(10,Number(field.heightMultiplier)||1));
            const pcap=Math.round(220*pmult);
            html+=`<label>${esc(field.label)}${reqStar}</label><textarea placeholder="${esc(ph||'Add a paragraph of text…')}" spellcheck="true" data-autogrow="1" style="min-height:200px;max-height:${pcap}px;overflow-y:auto"${req}></textarea>${help}`;
            break;
          }
          case 'divider':
            html+=`<hr style="border:none;border-top:1px solid #ddd;margin:16px 0">`;
            break;
          case 'statusbar':
            if(!topOnlySB) html+=exportStatusBarHTML(field);
            break;
          case 'checkbox':
            html+=`<label><input type="checkbox"${req}> ${esc(field.label)}${reqStar}</label>${help}`;
            break;
          case 'toggle':
            html+=(field.toggleStyle==='checkbox')
              ? `<label><input type="checkbox"> ${esc(field.label)}</label>${help}`
              : `<label>${esc(field.label)}${reqStar}</label>${toggleSwitchHTML(field)}${help}`;
            break;
          case 'totaltime':
            html+=`<label>${esc(field.label)}${reqStar}</label>
              <div class="totaltime" data-cfield-tt="${field.id}"${field.required?' data-required="1"':''}>
                <div class="tt-part"><span class="tt-sub">Start Time</span>${timePicker12HTML('tt-start',{required:field.required})}</div>
                <div class="tt-part"><span class="tt-sub">End Time</span>${timePicker12HTML('tt-end',{required:field.required})}</div>
                <div class="tt-part"><span class="tt-sub">Total Time</span><input type="text" class="tt-total" readonly tabindex="-1" placeholder="0h 0m"></div>
              </div>${help}`;
            break;
          default:
            html+=`<label>${esc(field.label)}${reqStar}</label>`;
            if(field.type==='time'){
              html+=`<div class="time-field"${field.required?' data-required="1"':''}>${timePicker12HTML('time',{required:field.required})}</div>`;
            } else if(field.type==='url'){
              html+=`<input type="text" inputmode="url" placeholder="${esc(ph)}" pattern="${URL_INPUT_PATTERN}" title="Enter a website like example.com — https:// is optional" spellcheck="true"${req}>`;
            } else if(field.type==='text'||field.type==='email'||field.type==='phone'||field.type==='number'||field.type==='password'||field.type==='date'){
              const type=field.type==='phone'?'tel':field.type;
              // Spell-check on text-ish inputs where user is typing prose / addresses;
              // off on phone / number / password where it would be noisy or unsafe.
              const sc=(field.type==='text'||field.type==='email')?' spellcheck="true"':' spellcheck="false"';
              if(field.type==='phone'){
                var phMain=`<input type="tel" inputmode="tel" data-phone-mask pattern="\\(\\d{3}\\) \\d{3}-\\d{4}" maxlength="14" placeholder="${esc(ph||'(555) 123-4567')}" spellcheck="false" class="cw-phone-main"${req}>`;
                html+=field.phoneExt
                  ? `<div class="phone-ext">${phMain}<input type="text" inputmode="numeric" class="cw-phone-ext" placeholder="Ext." maxlength="6" aria-label="Extension"></div>`
                  : phMain;
              } else {
                html+=`<input type="${type}" placeholder="${esc(ph)}"${sc}${req}>`;
              }
            } else if(field.type==='textarea'){
              const mult = Math.max(1, Math.min(10, Number(field.heightMultiplier)||1));
              const cap = Math.round(90 * mult);
              html+=`<textarea placeholder="${esc(ph)}" spellcheck="true" data-autogrow="1" style="min-height:90px;max-height:${cap}px;overflow-y:auto"${req}></textarea>`;
            } else if(field.type==='select'){
              html+=`<select class="enhance-dd" data-field-id="${field.id}"${req}><option value="" disabled selected>Choose…</option>${(field.options||[]).map((o,i)=>`<option value="${i}">${esc(o)}</option>`).join('')}</select>`;
            } else if(field.type==='radio'){
              html+=`<div class="opts${field.optionLayout==='horizontal'?' opts-h':''}" data-field-id="${field.id}">${(field.options||[]).map((o,i)=>`<label class="opt"><input type="radio" name="${field.id}" data-opt-idx="${i}"${req&&i===0?' required':''}> ${esc(o)}</label>`).join('')}</div>`;
            } else if(field.type==='checkboxes'){
              html+=`<div class="opts${field.optionLayout==='horizontal'?' opts-h':''}" data-field-id="${field.id}">${(field.options||[]).map((o,i)=>`<label class="opt"><input type="checkbox" data-opt-idx="${i}"> ${esc(o)}</label>`).join('')}</div>`;
            } else if(field.type==='matrix'){
              html+=matrixGridHTML(field,'export');
            } else if(field.type==='range'){
              // Standalone export: render the slider with a live value pill so
              // a responder sees the current number while dragging. Inline
              // styles + inline oninput keep it self-contained (no dependency
              // on the export CSS or runtime scripts). The initial value is the
              // step-aligned midpoint so the number matches the thumb position.
              const rgMin=Number(field.min)||0, rgMax=(field.max!=null?Number(field.max):100), rgStep=(Number(field.step)||1);
              let rgVal=rgMin+(rgMax-rgMin)/2;
              if(rgStep>0) rgVal=rgMin+Math.round((rgVal-rgMin)/rgStep)*rgStep;
              rgVal=Math.min(rgMax,Math.max(rgMin,rgVal));
              const rgDec=(String(rgStep).split('.')[1]||'').length;
              rgVal=Number(rgVal.toFixed(rgDec));
              html+=`<div style="display:flex;align-items:center;gap:12px"><input type="range" min="${rgMin}" max="${rgMax}" step="${rgStep}" value="${rgVal}" style="flex:1;min-width:0;accent-color:#1a8a66" oninput="this.parentNode.querySelector('.range-val').textContent=this.value"><output class="range-val" style="flex-shrink:0;min-width:2.5ch;text-align:center;font-weight:600;color:#1a8a66;background:#edfaf4;border:1px solid #d4f4e8;border-radius:999px;padding:3px 11px">${rgVal}</output></div>`;
            } else if(field.type==='rating'){
              const rmax=Math.max(1, Math.min(10, Number(field.max)||5));
              html+=`<div class="rating" data-rating style="font-size:24px;letter-spacing:4px;cursor:pointer">${Array.from({length:rmax},(_,i)=>`<span class="star" data-v="${i+1}" style="cursor:pointer;color:#cbd5d0">★</span>`).join('')}<input type="hidden" class="rating-val"></div>`;
            } else if(field.type==='file'){
              html+=`<input type="file"${req}>`;
            } else if(field.type==='color'){
              html+=`<input type="color" value="#1a8a66" style="height:42px;padding:4px;cursor:pointer">`;
            } else if(field.type==='signature'){
              html+=signPadHTML(field.id, field.required);
            }
            html+=help;
        }
        html+=`</div>`;
      });
      html+=`</div>`;
    });
    html+=`</fieldset>`;
  }
  // Build the score panel markup (only when this form actually has scoring
  // sections with at least one member). The panel sits inside the form,
  // before the nav/submit, so it's reachable from every page in a wizard.
  // We compute the live total in a runtime script appended below.
  const scoringSections=(FORM.scoringSections||[]).filter(s=>(s.fieldIds||[]).length>0);
  const _anyAlertPanel = scoringSections.some(s=> s.alert && ((s.alert.on && (Number(s.alert.min)||0)>0) || (s.alert.critical||[]).some(c=>c&&c.fieldId&&(c.options||[]).length)) );
  if((EXPORT_SHOW_SCORES || _anyAlertPanel) && scoringSections.length>0){
    // When scores are shown, render the full panel. When they're hidden but a
    // section has a risk/critical alert, still render an invisible panel that
    // holds only the alert banners — a safety flag must never depend on the
    // cosmetic "show scores" toggle, and the raw score stays hidden.
    const _panelStyle = EXPORT_SHOW_SCORES ? '' : ' style="border:0;padding:0;margin:0"';
    html+=`<div class="score-panel" id="score-panel"${_panelStyle}>`;
    if(EXPORT_SHOW_SCORES) html+=`<div class="score-panel-h">Score</div>`;
    scoringSections.forEach(s=>{
      if(EXPORT_SHOW_SCORES){
        // Compute max here at build time — bands and max ceiling are static.
        let max=0;
        s.fieldIds.forEach(fid=>{
          const f=FORM.rows.flatMap(r=>r.fields).find(x=>x.id===fid);
          if(!f) return;
          const scores=f.optionScores||[];
          let m=0; scores.forEach(v=>{ const n=Number(v)||0; if(n>m) m=n; });
          max += m;
        });
        html+=`<div class="score-card sev-low" data-section-id="${s.id}">
          <div class="sc-name">${esc(s.name||'Section')}</div>
          <div class="sc-band" data-role="band"></div>
          <div class="sc-total" data-role="total">0<span class="sc-max"> / ${max}</span></div>
        </div>`;
      }
      html+=`<div class="score-alert" data-section-id="${s.id}" style="display:none"></div>`;
    });
    html+=`</div>`;
  }
  // Wizard nav for multi-page; plain submit for single-page.
  if(multiPage){
    html+=`<div class="page-nav">
      <button type="button" class="btn-secondary" id="prev-btn" disabled>← Back</button>
      <button type="button" class="btn" id="next-btn">Next →</button>
      <button type="submit" class="btn" id="submit-btn" style="display:none">Submit</button>
    </div>
</form>
</div>`;
    // Wizard JS — emitted only for multi-page. Pages are CSS-hidden, not
    // removed, so HTML5 required-field validation on final submit sees every
    // field on every page. Next blocks if the current page has invalid fields.
    html+=`
<script>
(function(){
  var form=document.getElementById('credify-form');
  if(!form) return;
  var steps=Array.prototype.slice.call(form.querySelectorAll('.page-step'));
  var ind=document.getElementById('page-indicator');
  var fill=document.getElementById('page-progress-fill');
  var prev=document.getElementById('prev-btn');
  var next=document.getElementById('next-btn');
  var submit=document.getElementById('submit-btn');
  var i=0;
  // A page may be skipped by a page-level rule — the logic runtime marks it
  // .cond-hidden. Navigation walks only visible pages.
  function hiddenStep(idx){ return !steps[idx] || steps[idx].classList.contains('cond-hidden'); }
  function firstVisible(){ for(var k=0;k<steps.length;k++){ if(!hiddenStep(k)) return k; } return 0; }
  function nextVisible(from){ for(var k=from+1;k<steps.length;k++){ if(!hiddenStep(k)) return k; } return -1; }
  function prevVisible(from){ for(var k=from-1;k>=0;k--){ if(!hiddenStep(k)) return k; } return -1; }
  function visCount(){ var c=0; for(var k=0;k<steps.length;k++){ if(!hiddenStep(k)) c++; } return c; }
  function visPos(idx){ var c=0; for(var k=0;k<=idx;k++){ if(!hiddenStep(k)) c++; } return c; }
  // Completion progress: count answered, currently-visible, fillable fields
  // across every visible page (the whole form), so the bar reflects how much
  // has actually been filled out — not merely which page you're on.
  function ffFillable(ff){ return !!ff.querySelector('input,textarea,select'); }
  function ffFilled(ff){
    if(ff.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')) return true;
    var cs=ff.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select');
    for(var k=0;k<cs.length;k++){ var c=cs[k]; if(c.disabled) continue; if((c.value||'').trim()!=='') return true; }
    return false;
  }
  function computeProgress(){
    var total=0, done=0;
    for(var s=0;s<steps.length;s++){
      if(hiddenStep(s)) continue;
      var fields=steps[s].querySelectorAll('.form-field[data-cfield]');
      for(var k=0;k<fields.length;k++){
        var ff=fields[k];
        if(ff.classList.contains('cond-hidden')) continue;
        if(!ffFillable(ff)) continue;
        total++; if(ffFilled(ff)) done++;
      }
    }
    return total? Math.round(done/total*100) : 0;
  }
  function updateProgress(){
    var pos=visPos(i), total=visCount()||1, pct=computeProgress();
    if(ind) ind.textContent='Page '+pos+' of '+total;
    if(fill) fill.style.width=pct+'%';
    if(window.__cwUpdateBars) window.__cwUpdateBars(); // refresh status-bar fields on page change
  }
  function show(n){
    if(n<0||n>=steps.length) return;
    i=n;
    steps.forEach(function(s,idx){ s.classList.toggle('active', idx===i); });
    updateProgress();
    prev.disabled=(prevVisible(i)<0);
    var isLast=(nextVisible(i)<0);
    next.style.display=isLast?'none':'';
    submit.style.display=isLast?'':'none';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function validateCurrent(){
    // Custom validation (red outlines + focus), falling back to native if the
    // validation script hasn't loaded for any reason.
    if(typeof window.__cwValidate==='function'){
      var bad=window.__cwValidate(steps[i]);
      if(bad){ try{bad.focus({preventScroll:true});}catch(_){try{bad.focus();}catch(__){}} if(bad.scrollIntoView) bad.scrollIntoView({behavior:'smooth',block:'center'}); return false; }
      return true;
    }
    var inputs=steps[i].querySelectorAll('input,select,textarea');
    for(var j=0;j<inputs.length;j++){
      if(!inputs[j].disabled && !inputs[j].checkValidity()){
        inputs[j].reportValidity();
        return false;
      }
    }
    return true;
  }
  // Let the validation script jump the wizard to the page holding a given field.
  window.__cwGotoStepOf=function(el){ var st=el&&el.closest?el.closest('.page-step'):null; if(!st) return; var idx=steps.indexOf(st); if(idx>=0) show(idx); };
  prev.addEventListener('click',function(){ var p=prevVisible(i); if(p>=0) show(p); });
  next.addEventListener('click',function(){ var nx=nextVisible(i); if(nx>=0 && validateCurrent()) show(nx); });
  // Live completion updates as the respondent fills fields in.
  form.addEventListener('input',updateProgress);
  form.addEventListener('change',updateProgress);
  // Re-anchor when page-visibility changes (the logic runtime calls this after
  // recomputing conditions): if the current page got hidden, jump to the
  // nearest visible one; otherwise just refresh the progress labels.
  window.__cwReanchor=function(){
    if(hiddenStep(i)){ var v=nextVisible(i); if(v<0) v=prevVisible(i); if(v<0) v=firstVisible(); show(v); }
    else show(i);
  };
  show(firstVisible());
})();
<\/script>`;
  } else {
    html+=`<div class="form-submit"><button type="submit" class="btn">Submit</button></div>
</form>
</div>`;
    if(hasFillableExport){
      html+=`
<script>
(function(){
  var form=document.getElementById('credify-form'); if(!form) return;
  var fill=document.getElementById('page-progress-fill');
  var ind=document.getElementById('page-indicator');
  if(!fill && !ind) return;
  // Completion progress for a single-page form: answered, visible, fillable
  // fields over the total, updated live as the respondent fills it out.
  function ffFillable(ff){ return !!ff.querySelector('input,textarea,select'); }
  function ffFilled(ff){
    if(ff.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')) return true;
    var cs=ff.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select');
    for(var k=0;k<cs.length;k++){ var c=cs[k]; if(c.disabled) continue; if((c.value||'').trim()!=='') return true; }
    return false;
  }
  function computeProgress(){
    var fs=form.querySelectorAll('.form-field[data-cfield]'); var total=0, done=0;
    for(var k=0;k<fs.length;k++){ var ff=fs[k]; if(ff.classList.contains('cond-hidden')) continue; if(!ffFillable(ff)) continue; total++; if(ffFilled(ff)) done++; }
    return total? Math.round(done/total*100) : 0;
  }
  function updateProgress(){ var pct=computeProgress(); if(fill) fill.style.width=pct+'%'; if(ind) ind.textContent=pct+'% complete'; }
  form.addEventListener('input',updateProgress);
  form.addEventListener('change',updateProgress);
  updateProgress();
})();
<\/script>`;
    }
  }
  // Status-bar field runtime: compute each bar's completion per its calc mode
  // (fields above / pages / fields+pages) and update live + on page changes.
  if(hasStatusBar){
    html+=`
<script>
(function(){
  var form=document.getElementById('credify-form'); if(!form) return;
  var bars=Array.prototype.slice.call(form.querySelectorAll('.status-bar[data-statusbar]'));
  if(!bars.length) return;
  var steps=Array.prototype.slice.call(form.querySelectorAll('.page-step'));
  var allFields=Array.prototype.slice.call(form.querySelectorAll('.form-field[data-cfield]'));
  function stepHidden(st){ return !st || st.classList.contains('cond-hidden'); }
  function ffFillable(ff){ return !!ff.querySelector('input,textarea,select'); }
  function ffFilled(ff){
    if(ff.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')) return true;
    var cs=ff.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select');
    for(var k=0;k<cs.length;k++){ var c=cs[k]; if(c.disabled) continue; if((c.value||'').trim()!=='') return true; }
    return false;
  }
  function fieldCountable(ff){
    if(ff.classList.contains('cond-hidden')) return false;
    var st=ff.closest('.page-step'); if(st && stepHidden(st)) return false;
    return ffFillable(ff);
  }
  function wholeForm(){
    var total=0, done=0;
    for(var k=0;k<allFields.length;k++){ var ff=allFields[k]; if(!fieldCountable(ff)) continue; total++; if(ffFilled(ff)) done++; }
    return total? Math.round(done/total*100):0;
  }
  function aboveBar(bar){
    var total=0, done=0;
    for(var k=0;k<allFields.length;k++){ var ff=allFields[k]; if(!fieldCountable(ff)) continue;
      if(!(bar.compareDocumentPosition(ff) & Node.DOCUMENT_POSITION_PRECEDING)) continue; // only fields above the bar
      total++; if(ffFilled(ff)) done++; }
    return total? Math.round(done/total*100):0;
  }
  function visSteps(){ return steps.filter(function(s){return !stepHidden(s);}); }
  function stepCompletion(st){
    var fs=st.querySelectorAll('.form-field[data-cfield]'), total=0, done=0;
    for(var k=0;k<fs.length;k++){ var ff=fs[k]; if(ff.classList.contains('cond-hidden'))continue; if(!ffFillable(ff))continue; total++; if(ffFilled(ff))done++; }
    return {total:total,done:done};
  }
  function pagesPct(){
    var vs=visSteps(); if(!vs.length) return 0; var c=0;
    vs.forEach(function(st){ var x=stepCompletion(st); if(x.total===0||x.done>=x.total) c++; });
    return Math.round(c/vs.length*100);
  }
  function fieldsAndPages(bar){
    var vs=visSteps(); if(!vs.length) return 0;
    var bi=vs.indexOf(bar.closest('.page-step')); if(bi<0) bi=vs.length-1;
    var completed=0;
    for(var i=0;i<bi;i++){ var x=stepCompletion(vs[i]); if(x.total===0||x.done>=x.total) completed++; }
    var cur=stepCompletion(vs[bi]); var frac=cur.total>0?(cur.done/cur.total):1;
    return Math.round(((completed+frac)/vs.length)*100);
  }
  function onePage(bar){
    var st=bar.closest('.page-step'); if(!st) return wholeForm();
    var c=stepCompletion(st); return c.total? Math.round(c.done/c.total*100):0;
  }
  function pctFor(bar){
    var calc=bar.getAttribute('data-calc');
    if(calc==='allPages') return wholeForm();
    if(calc==='pageBetween') return onePage(bar);
    return aboveBar(bar); // aboveForm (default)
  }
  function updateBars(){
    bars.forEach(function(bar){
      var pct=pctFor(bar);
      var fill=bar.querySelector('.status-bar-fill'); if(fill) fill.style.width=pct+'%';
      var pl=bar.querySelector('.status-bar-pct'); if(pl) pl.textContent=pct+'%';
      bar.setAttribute('aria-valuenow', pct);
    });
  }
  form.addEventListener('input', updateBars);
  form.addEventListener('change', updateBars);
  window.__cwUpdateBars=updateBars; // wizard calls this on page change
  updateBars();
})();
<\/script>`;
  }
  // Dropdown-enhancement script — runs for both single and multi-page exports.
  html+=`
<script>
(function(){
  var CHEV='<svg class="cdd-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  if(!window.matchMedia || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  function enhance(sel){
    sel.classList.add('has-cdd');
    var wrap=document.createElement('div'); wrap.className='cdd';
    var btn=document.createElement('button'); btn.type='button'; btn.className='cdd-btn';
    var val=document.createElement('span'); val.className='cdd-val'; btn.appendChild(val);
    btn.insertAdjacentHTML('beforeend',CHEV);
    var menu=document.createElement('div'); menu.className='cdd-menu';
    wrap.appendChild(btn); wrap.appendChild(menu);
    sel.parentNode.insertBefore(wrap, sel.nextSibling);
    function refresh(){
      var opt=sel.options[sel.selectedIndex];
      var ph=!opt||opt.disabled||opt.value==='';
      val.textContent=opt?opt.textContent:'';
      val.className='cdd-val'+(ph?' placeholder':'');
    }
    function build(){
      menu.innerHTML='';
      var many=sel.options.length>8, optsBox=menu, searchIn=null;
      if(many){
        var sw=document.createElement('div'); sw.className='cdd-search-wrap';
        searchIn=document.createElement('input'); searchIn.type='text'; searchIn.className='cdd-search'; searchIn.placeholder='Type to search\u2026'; searchIn.autocomplete='off';
        searchIn.addEventListener('click',function(e){ e.stopPropagation(); });
        searchIn.addEventListener('keydown',function(e){ e.stopPropagation(); if(e.key==='Escape'){ wrap.classList.remove('open'); menu.style.cssText=''; btn.focus(); } });
        sw.appendChild(searchIn); menu.appendChild(sw);
        optsBox=document.createElement('div'); optsBox.className='cdd-opts'; menu.appendChild(optsBox);
      }
      for(var i=0;i<sel.options.length;i++){(function(i){
        var opt=sel.options[i];
        if(opt.disabled && opt.value==='') return;
        var o=document.createElement('div');
        o.className='cdd-opt'+(i===sel.selectedIndex?' selected':'');
        o.textContent=opt.textContent;
        o.addEventListener('click',function(e){
          e.stopPropagation();
          sel.selectedIndex=i;
          sel.dispatchEvent(new Event('change',{bubbles:true}));
          refresh(); wrap.classList.remove('open'); menu.style.cssText='';
        });
        optsBox.appendChild(o);
      })(i);}
      if(searchIn){
        searchIn.addEventListener('input',function(){
          var q=this.value.toLowerCase().trim(), opts=optsBox.querySelectorAll('.cdd-opt');
          for(var k=0;k<opts.length;k++){ opts[k].style.display=(!q||opts[k].textContent.toLowerCase().indexOf(q)>=0)?'':'none'; }
        });
        setTimeout(function(){ try{ searchIn.focus(); }catch(e){} },20);
      }
    }
    function positionMenu(){
      var r=btn.getBoundingClientRect();
      var gap=5, pad=8, cap=280, vh=window.innerHeight;
      var below=vh-r.bottom-pad, above=r.top-pad, natural=menu.scrollHeight;
      var up = below < Math.min(cap,natural) && above > below;
      var space = up ? above : below;
      menu.style.position='fixed';
      menu.style.left=r.left+'px';
      menu.style.width=r.width+'px';
      menu.style.right='auto';
      menu.style.maxHeight=Math.max(96, Math.min(cap, space))+'px';
      if(up){ menu.style.top='auto'; menu.style.bottom=(vh-r.top+gap)+'px'; }
      else  { menu.style.bottom='auto'; menu.style.top=(r.bottom+gap)+'px'; }
    }
    function openMenu(){ build(); wrap.classList.add('open'); positionMenu(); }
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var opening=!wrap.classList.contains('open');
      document.querySelectorAll('.cdd.open').forEach(function(o){o.classList.remove('open'); var mm=o.querySelector('.cdd-menu'); if(mm) mm.style.cssText='';});
      if(opening){ openMenu(); }
    });
    btn.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'){ e.preventDefault(); openMenu(); }
      else if(e.key==='Escape'){ wrap.classList.remove('open'); menu.style.cssText=''; }
    });
    sel.addEventListener('change',refresh);
    refresh();
  }
  document.querySelectorAll('select.enhance-dd').forEach(enhance);
  function closeAllCdds(){ document.querySelectorAll('.cdd.open').forEach(function(o){ o.classList.remove('open'); var mm=o.querySelector('.cdd-menu'); if(mm) mm.style.cssText=''; }); }
  document.addEventListener('click',closeAllCdds);
  // Close on scroll so a fixed-position menu never detaches — and so an open
  // dropdown never traps the wheel; the page scrolls normally. Scrolls inside
  // the menu's own list are ignored.
  document.addEventListener('scroll',function(e){ if(e.target&&e.target.closest&&e.target.closest('.cdd-menu')) return; closeAllCdds(); }, true);
  window.addEventListener('resize',closeAllCdds);
  // Wheel passthrough: a focused number/range field would otherwise eat the
  // wheel to change its value; blur it so the page scrolls instead.
  document.addEventListener('wheel',function(e){ var t=e.target; if(t&&(t.type==='number'||t.type==='range')&&document.activeElement===t) t.blur(); },{passive:true});
})();
<\/script>`;
  // ===== Logic runtime (scoring panel + conditional visibility) =====
  // Emitted when the form either shows a score panel OR has any conditional
  // (showIf) rules. It reads the live DOM, computes section totals, evaluates
  // every field/row rule, and shows/hides branches. Hidden branches also get
  // their inner controls DISABLED (and cleared) so they (a) never block HTML5
  // required-validation on submit and (b) never appear in submitted FormData
  // while hidden — and so their score contribution drops to 0.
  const scoringExportData=(FORM.scoringSections||[]).filter(s=>(s.fieldIds||[]).length>0);
  // Gather conditional rules from rows + fields.
  const condRules=[];
  FORM.rows.forEach(r=>{
    if(r.showIf) condRules.push({kind:'row', id:r.id, cond:r.showIf});
    r.fields.forEach(f=>{ if(f.showIf) condRules.push({kind:'field', id:f.id, cond:f.showIf}); });
  });
  // Page-level rules (skip a whole page/section). Keyed by page number, which
  // we tag on each fieldset as data-cpage.
  if(FORM.pageRules){
    Object.keys(FORM.pageRules).forEach(k=>{ condRules.push({kind:'page', id:String(k), cond:FORM.pageRules[k]}); });
  }
  // Visibility groups → one rule per group, applied to every member field.
  (FORM.visibilityGroups||[]).forEach(g=>{
    if(g.showIf && (g.fieldIds||[]).length) condRules.push({kind:'vgroup', fieldIds:(g.fieldIds||[]).slice(), cond:g.showIf});
  });
  const showPanel = EXPORT_SHOW_SCORES && scoringExportData.length>0;
  const anyScoreKey = scoringExportData.some(s=>s.scoreKey);
  const anyAlert = scoringExportData.some(s=> s.alert && ((s.alert.on && (Number(s.alert.min)||0)>0) || (s.alert.critical||[]).some(c=>c&&c.fieldId&&(c.options||[]).length)) );
  // Field-level access + notification config, shipped for the connected CRM /
  // backend to enforce user-visibility and deliver SMS/Email (resolving contact
  // info from the patient submission and user profiles). Patient-hidden fields
  // are NOT rendered above, but their meta still rides along here.
  const fieldMeta={};
  FORM.rows.forEach(r=>r.fields.forEach(f=>{
    const m={};
    if(f.hidePatient) m.hidePatient=true;
    if(f.hideUsers){ const s=f.hideUsersScope||{}; m.hideUsers=true; m.hideFrom={roles:(s.roles||[]).slice(), userIds:(s.userIds||[]).slice()}; }
    if(fieldHasNotify(f)){ const n=f.notify; m.notify={sms:!!n.sms, email:!!n.email, patient:!!n.patient, roles:(n.roles||[]).slice(), userIds:(n.userIds||[]).slice()}; }
    if(Object.keys(m).length){ m.label=f.label||''; fieldMeta[f.id]=m; }
  }));
  const anyFieldMeta=Object.keys(fieldMeta).length>0;
  // scoringExportData presence is included so a scored form always emits the
  // runtime and publishes its section scores to the cross-form bridge, even when
  // its own scores aren't shown and it has no conditions of its own.
  // isCrossFormSource does the same for a form whose ANSWERS (not scores) are
  // read by a sibling form — without it, a plain data-source form never
  // publishes and the sibling's cross-form rule silently never fires.
  const isCrossFormSource = formIsCrossFormSource();
  const emitLogic = showPanel || condRules.length>0 || anyScoreKey || anyAlert || anyFieldMeta || scoringExportData.length>0 || isCrossFormSource;
  if(emitLogic){
    // Per-field option scores for every section member (needed for totals,
    // which score-threshold rules rely on even when the panel is hidden).
    const referencedFieldIds=new Set();
    scoringExportData.forEach(s=>s.fieldIds.forEach(id=>referencedFieldIds.add(id)));
    // Critical-item alerts can reference a field that isn't itself a score
    // contributor; make sure its type/scores still ship so the runtime can read
    // its answer (otherwise the alert would silently never fire).
    scoringExportData.forEach(s=>((s.alert&&s.alert.critical)||[]).forEach(c=>{ if(c&&c.fieldId) referencedFieldIds.add(c.fieldId); }));
    const fieldScores={};
    FORM.rows.forEach(r=>r.fields.forEach(f=>{
      if(referencedFieldIds.has(f.id)) fieldScores[f.id]={type:f.type, scores:f.optionScores||[]};
    }));
    // Controller field types for field-based rules (so the runtime knows how
    // to read each controller's DOM value).
    const ctrlTypes={};
    const allFieldsFlat=FORM.rows.flatMap(x=>x.fields);
    const collectCtrl=(c)=>{
      if(!c) return;
      if(c.block){ (c.conditions||[]).forEach(collectCtrl); return; }
      // Any non-block, non-score condition is a field condition. The UI always
      // sets type:'field', but match evalCond's own logic (which keys purely off
      // fieldId) so a cond that omits the type can't silently drop its
      // controller from ctrlTypes. Cross-form refs carry a fieldId too but won't
      // be in this form's fields, so they're naturally excluded (fail-open).
      if(c.type!=='score' && c.fieldId){ const f=allFieldsFlat.find(x=>x.id===c.fieldId); if(f) ctrlTypes[f.id]=f.type; }
    };
    condRules.forEach(r=>collectCtrl(r.cond));
    // Conditional scoring: a group field's points can be gated by a condition
    // stack. Make sure those controllers ship in ctrlTypes so the runtime can
    // read their answers when deciding whether the points count.
    scoringExportData.forEach(s=>{ if(s.scoreConds) Object.keys(s.scoreConds).forEach(fid=>collectCtrl(s.scoreConds[fid])); });
    const sectionsForRuntime=scoringExportData.map(s=>{
      let max=0;
      s.fieldIds.forEach(fid=>{
        const f=fieldScores[fid]; if(!f) return;
        let m=0; (f.scores||[]).forEach(v=>{ const n=Number(v)||0; if(n>m) m=n; });
        max+=m;
      });
      const _al=s.alert||{};
      const _crit=(_al.critical||[]).filter(c=>c&&c.fieldId&&(c.options||[]).length).map(c=>({fieldId:c.fieldId,options:(c.options||[]).map(Number),msg:c.msg||''}));
      const _hasTotal=!!(_al.on&&(Number(_al.min)||0)>0);
      const _alertObj=(_hasTotal||_crit.length)?{alert:Object.assign({},_hasTotal?{min:Number(_al.min)||0,msg:_al.msg||''}:{},_crit.length?{critical:_crit}:{})}:{};
      // Conditional scoring: ship the per-field gate blocks the runtime evaluates.
      const _conds={}; if(s.scoreConds){ (s.fieldIds||[]).forEach(fid=>{ const c=s.scoreConds[fid]; if(c&&c.conditions&&c.conditions.length) _conds[fid]=c; }); }
      const _condObj=Object.keys(_conds).length?{conds:_conds}:{};
      return {id:s.id, fieldIds:s.fieldIds, max, ...(s.scoreKey?{scoreKey:s.scoreKey}:{}), ..._alertObj, ..._condObj, bands:(s.bands||[]).map(b=>({
        min:Number(b.min)||0, max:Number(b.max)||0,
        label:b.label||'', severity:b.severity||'low', color:b.color||''
      }))};
    });
    // Embed any forms referenced by an "open a form when met" rule, so the
    // export can show them in an 80% popup. Only at top level (depth 0) — a
    // nested popup form doesn't re-embed its own links.
    const popupMapLocal={};
    if(POPUP_EMBED_DEPTH===0){
      const b64e=(s)=>{ try{ return (typeof btoa!=='undefined') ? btoa(unescape(encodeURIComponent(s))) : Buffer.from(s,'utf8').toString('base64'); }catch(e){ return ''; } };
      collectPopupFormIds().forEach(id=>{
        const lf=(FORMS||[]).find(x=>x.id===id);
        if(lf){ try{ const enc=b64e(buildHTMLForFormObj(JSON.parse(JSON.stringify(lf)))); if(enc) popupMapLocal[id]=enc; }catch(e){} }
      });
    }
    popupMap=popupMapLocal;
    // Cross-form bridge (merged from JAY): list of fillable fields this form
    // publishes to the shared store so sibling forms can read real answers.
    const bridgeFields = FORM.rows.flatMap(r=>r.fields)
      .filter(f=>!NON_FILLABLE_TYPES.has(f.type))
      .map(f=>({id:f.id, t:f.type}));
    // Option labels for radio/select controllers, so the runtime can evaluate
    // label-based string operators (is / is not / contains) on a choice answer.
    const optLabels={};
    FORM.rows.forEach(r=>r.fields.forEach(f=>{ if(f.type==='radio'||f.type==='select') optLabels[f.id]=(f.options||[]).map(o=>String(o)); }));
    const blob=JSON.stringify({
      sections:sectionsForRuntime, fields:fieldScores, fieldMeta, optLabels,
      ctrlTypes, rules:condRules, showPanel, showAlerts:anyAlert, profileKey:SHARED_PROFILE_KEY,
      popupForms:popupMap,
      formId:FORM.id||'', formTitle:FORM.title||'', bridgeFields
    }).replace(/<\/script>/gi, '<\\/script>');
    html+=`
<script>
(function(){
  var DATA=${blob};
  function esc(s){
    if(typeof CSS!=='undefined' && CSS.escape) return CSS.escape(s);
    return String(s).replace(/[^a-zA-Z0-9_-]/g, function(c){return '\\\\'+c;});
  }
  function cmp(a,op,b,b2){
    a=Number(a); b=Number(b);
    if(op==='between'||op==='notbetween'){
      var lo=Number(b), hi=Number(b2); if(lo>hi){ var t=lo; lo=hi; hi=t; }
      var inside=a>=lo&&a<=hi; return op==='between'?inside:!inside;
    }
    switch(op){case 'gt':return a>b;case 'lt':return a<b;case 'gte':return a>=b;
      case 'lte':return a<=b;case 'eq':return a===b;case 'neq':return a!==b;}
    return true;
  }
  function scoreField(fid){
    var meta=DATA.fields[fid]; if(!meta) return 0;
    var scores=meta.scores||[];
    if(meta.type==='radio'){
      var r=document.querySelector('input[type=radio][name="'+esc(fid)+'"]:checked');
      if(!r||r.disabled) return 0;
      return Number(scores[parseInt(r.getAttribute('data-opt-idx'),10)])||0;
    }
    if(meta.type==='select'){
      var sel=document.querySelector('select[data-field-id="'+esc(fid)+'"]');
      if(!sel||sel.disabled) return 0;
      var i=parseInt(sel.value,10);
      return isNaN(i)?0:(Number(scores[i])||0);
    }
    if(meta.type==='checkboxes'){
      var sum=0;
      var checks=document.querySelectorAll('[data-field-id="'+esc(fid)+'"] input[type=checkbox]:checked');
      Array.prototype.forEach.call(checks,function(c){
        if(c.disabled) return;
        sum+=Number(scores[parseInt(c.getAttribute('data-opt-idx'),10)])||0;
      });
      return sum;
    }
    if(meta.type==='toggle'){
      var tcb=document.querySelector('[data-cfield="'+esc(fid)+'"] input[type=checkbox]');
      if(!tcb||tcb.disabled) return 0;
      return tcb.checked ? (Number(scores[0])||0) : (Number(scores[1])||0);
    }
    return 0;
  }
  function sectionById(id){ for(var i=0;i<DATA.sections.length;i++){ if(DATA.sections[i].id===id) return DATA.sections[i]; } return null; }
  var _scoreGuard={};
  function sectionScore(s){ if(!s) return 0; if(_scoreGuard[s.id]) return 0; _scoreGuard[s.id]=true; var t=0; (s.fieldIds||[]).forEach(function(fid){ if(s.conds&&s.conds[fid]&&!evalCond(s.conds[fid])) return; t+=scoreField(fid); }); delete _scoreGuard[s.id]; return t; }
  function fieldAnswered(fid,type){
    if(type==='checkboxes') return !!document.querySelector('[data-field-id="'+esc(fid)+'"] input[type=checkbox]:checked:not([disabled])');
    if(type==='radio') return !!document.querySelector('input[type=radio][name="'+esc(fid)+'"]:checked:not([disabled])');
    if(type==='select'){ var s=document.querySelector('select[data-field-id="'+esc(fid)+'"]'); return !!(s && !s.disabled && s.value!==''); }
    if(type==='checkbox'||type==='toggle'){ var cb=document.querySelector('[data-cfield="'+esc(fid)+'"] input[type=checkbox]'); return !!(cb && !cb.disabled && cb.checked); }
    var el=document.querySelector('[data-cfield="'+esc(fid)+'"] input, [data-cfield="'+esc(fid)+'"] textarea'); return !!(el && !el.disabled && String(el.value||'').replace(/^\\s+|\\s+$/g,'')!=='');
  }
  // ===== Cross-form bridge (merged from JAY): same-browser value/score sharing
  // via localStorage. Each form publishes its live answers + section scores
  // under its formId; a sibling form reads them to evaluate cross-form
  // conditions for real. Same-origin/browser only.
  var XKEY='credify_xform_v1';
  var SELF_ID=DATA.formId||'';
  function xreadAll(){ try{ return JSON.parse(localStorage.getItem(XKEY)||'{}')||{}; }catch(e){ return {}; } }
  function xFieldVal(fid,type){
    if(type==='select'){ var s=document.querySelector('select[data-field-id="'+esc(fid)+'"]'); return (s&&!s.disabled&&s.value!=='')?Number(s.value):null; }
    if(type==='radio'){ var r=document.querySelector('input[type=radio][name="'+esc(fid)+'"]:checked'); return (r&&!r.disabled)?Number(r.getAttribute('data-opt-idx')):null; }
    if(type==='checkboxes'){ var out=[]; Array.prototype.forEach.call(document.querySelectorAll('[data-field-id="'+esc(fid)+'"] input[type=checkbox]:checked'),function(c){ if(!c.disabled) out.push(Number(c.getAttribute('data-opt-idx'))); }); return out; }
    if(type==='checkbox'||type==='toggle'){ var cb=document.querySelector('[data-cfield="'+esc(fid)+'"] input[type=checkbox]'); return (cb&&!cb.disabled)?!!cb.checked:null; }
    var ee=document.querySelector('[data-cfield="'+esc(fid)+'"] input, [data-cfield="'+esc(fid)+'"] textarea'); return (ee&&!ee.disabled)?ee.value:null;
  }
  function publishBridge(){
    if(!SELF_ID) return;
    var all=xreadAll(); var fields={};
    (DATA.bridgeFields||[]).forEach(function(bf){ fields[bf.id]={t:bf.t, a:fieldAnswered(bf.id,bf.t), v:xFieldVal(bf.id,bf.t)}; });
    var scores={}; (DATA.sections||[]).forEach(function(s){ scores[s.id]=sectionScore(s); });
    all[SELF_ID]={title:DATA.formTitle||'', fields:fields, scores:scores, ts:Date.now()};
    try{ localStorage.setItem(XKEY, JSON.stringify(all)); }catch(e){}
  }
  function cmpFieldVal(type, v, c){
    if(type==='checkboxes'){ var set=Array.isArray(v)?v.map(Number):[]; if(Array.isArray(c.value)){ var any=c.value.map(Number).some(function(x){return set.indexOf(x)>=0;}); return c.op==='notincludes'?!any:any; } var has=set.indexOf(Number(c.value))>=0; return c.op==='notincludes'?!has:has; }
    if(type==='radio'||type==='select'){ var sel=(v==null)?null:Number(v);
      if(c.op==='seq'||c.op==='sneq'||c.op==='contains'||c.op==='ncontains'||c.op==='filled'||c.op==='empty'){
        var labs=(DATA.optLabels&&DATA.optLabels[c.fieldId])||[];
        var ls=String((sel!=null&&labs[sel]!=null)?labs[sel]:'').replace(/\\s+/g,' ').trim().toLowerCase();
        var lv=String(c.value==null?'':c.value).replace(/\\s+/g,' ').trim().toLowerCase();
        switch(c.op){ case 'seq':return ls===lv; case 'sneq':return ls!==lv; case 'contains':return ls.indexOf(lv)>=0; case 'ncontains':return ls.indexOf(lv)<0; case 'filled':return ls!==''; case 'empty':return ls===''; }
      }
      if(Array.isArray(c.value)){ var inSet=c.value.map(Number).indexOf(sel)>=0; return c.op==='neq'?!inSet:inSet; } return c.op==='neq'?(sel!==Number(c.value)):(sel===Number(c.value)); }
    if(type==='number'||type==='range'||type==='rating'){ if(v==null||v==='') return false; return cmp(Number(v), c.op, Number(c.value)||0, Number(c.value2)||0); }
    if(type==='checkbox'||type==='toggle'){ var on=!!v; return c.op==='unchecked'?!on:on; }
    var s=String(v==null?'':v).replace(/\\s+/g,' ').trim(), vv=String(c.value==null?'':c.value).replace(/\\s+/g,' ').trim();
    switch(c.op){ case 'seq':return s.toLowerCase()===vv.toLowerCase(); case 'sneq':return s.toLowerCase()!==vv.toLowerCase(); case 'contains':return s.toLowerCase().indexOf(vv.toLowerCase())>=0; case 'ncontains':return s.toLowerCase().indexOf(vv.toLowerCase())<0; case 'filled':return s.trim()!==''; case 'empty':return s.trim()===''; }
    return true;
  }
  function evalCrossForm(c){
    var fm=xreadAll()[c.formId];
    if(c.type==='score'){
      var has=!!(fm&&fm.scores&&fm.scores[c.sectionId]!=null);
      if(c.op==='any'||c.op==='none') return c.op==='any'?has:!has;
      if(!has) return false;
      return cmp(Number(fm.scores[c.sectionId])||0, c.op, Number(c.value)||0, Number(c.value2)||0);
    }
    var rec=fm&&fm.fields?fm.fields[c.fieldId]:null;
    var answered=!!(rec&&rec.a);
    if(c.op==='any'||c.op==='none') return c.op==='any'?answered:!answered;
    if(!rec||!answered) return false;
    return cmpFieldVal(rec.t, rec.v, c);
  }
  function cmpChoiceLabel(c, sel){
    var labs=(DATA.optLabels&&DATA.optLabels[c.fieldId])||[];
    var s=String((sel!=null&&labs[sel]!=null)?labs[sel]:'').replace(/\\s+/g,' ').trim().toLowerCase();
    var v=String(c.value==null?'':c.value).replace(/\\s+/g,' ').trim().toLowerCase();
    switch(c.op){ case 'seq':return s===v; case 'sneq':return s!==v; case 'contains':return s.indexOf(v)>=0; case 'ncontains':return s.indexOf(v)<0; case 'filled':return s!==''; case 'empty':return s===''; }
    return true;
  }
  function evalCond(c){
    if(!c) return true;
    if(c.block){ var cs=c.conditions||[]; if(!cs.length) return true; var ev=function(x){ var r=evalCond(x); return (x&&x.neg)?!r:r; }; var hasConj=cs.some(function(x,i){return i>0&&(x.conj==='and'||x.conj==='or');}); if(!hasConj) return c.match==='any'?cs.some(ev):cs.every(ev); var acc=ev(cs[0]); for(var i=1;i<cs.length;i++){ acc=(cs[i].conj==='or')?(acc||ev(cs[i])):(acc&&ev(cs[i])); } return acc; }
    if(c.formId && c.formId!==SELF_ID){ return evalCrossForm(c); }
    if(c.type==='score'){ if(c.op==='any'||c.op==='none') return c.op==='any'; var s=sectionById(c.sectionId); if(!s) return true; return cmp(sectionScore(s), c.op, Number(c.value)||0, Number(c.value2)||0); }
    var type=DATA.ctrlTypes[c.fieldId]; if(!type) return true;
    if(c.op==='any'||c.op==='none'){ var answered=fieldAnswered(c.fieldId,type); return c.op==='any'?answered:!answered; }
    if(type==='checkboxes'){
      var vals=Array.isArray(c.value)?c.value.map(Number):[Number(c.value)];
      var anyHit=vals.some(function(v){ var box=document.querySelector('[data-field-id="'+esc(c.fieldId)+'"] input[type=checkbox][data-opt-idx="'+v+'"]'); return !!(box && box.checked && !box.disabled); });
      return c.op==='notincludes' ? !anyHit : anyHit;
    }
    if(type==='radio'){
      var r=document.querySelector('input[type=radio][name="'+esc(c.fieldId)+'"]:checked');
      var sel=(r&&!r.disabled)?parseInt(r.getAttribute('data-opt-idx'),10):null;
      if(c.op==='seq'||c.op==='sneq'||c.op==='contains'||c.op==='ncontains'||c.op==='filled'||c.op==='empty') return cmpChoiceLabel(c, sel);
      if(Array.isArray(c.value)){ var inSet=c.value.map(Number).indexOf(sel)>=0; return c.op==='neq'?!inSet:inSet; }
      return c.op==='neq' ? (sel!==Number(c.value)) : (sel===Number(c.value));
    }
    if(type==='select'){
      var s2=document.querySelector('select[data-field-id="'+esc(c.fieldId)+'"]');
      var v=(s2&&!s2.disabled)?parseInt(s2.value,10):NaN;
      var sv=isNaN(v)?null:v;
      if(c.op==='seq'||c.op==='sneq'||c.op==='contains'||c.op==='ncontains'||c.op==='filled'||c.op==='empty') return cmpChoiceLabel(c, sv);
      if(Array.isArray(c.value)){ var inSet2=c.value.map(Number).indexOf(sv)>=0; return c.op==='neq'?!inSet2:inSet2; }
      return c.op==='neq' ? (sv!==Number(c.value)) : (sv===Number(c.value));
    }
    if(type==='number'||type==='range'||type==='rating'){
      var inp=document.querySelector('[data-cfield="'+esc(c.fieldId)+'"] input');
      if(!inp||inp.disabled||inp.value===''||isNaN(Number(inp.value))) return false;
      return cmp(Number(inp.value), c.op, Number(c.value)||0, Number(c.value2)||0);
    }
    if(type==='text'||type==='textarea'||type==='email'||type==='phone'||type==='url'||type==='password'||type==='date'||type==='time'){
      var se=document.querySelector('[data-cfield="'+esc(c.fieldId)+'"] input, [data-cfield="'+esc(c.fieldId)+'"] textarea');
      var sv=(se&&!se.disabled)?String(se.value||'').replace(/\\s+/g,' ').trim():'';
      var cv=String(c.value==null?'':c.value).replace(/\\s+/g,' ').trim();
      switch(c.op){
        case 'seq': return sv.toLowerCase()===cv.toLowerCase();
        case 'sneq': return sv.toLowerCase()!==cv.toLowerCase();
        case 'contains': return sv.toLowerCase().indexOf(cv.toLowerCase())>=0;
        case 'ncontains': return sv.toLowerCase().indexOf(cv.toLowerCase())<0;
        case 'filled': return sv.replace(/^\s+|\s+$/g,'')!=='';
        case 'empty': return sv.replace(/^\s+|\s+$/g,'')==='';
      }
      return true;
    }
    if(type==='checkbox'||type==='toggle'){
      var cb=document.querySelector('[data-cfield="'+esc(c.fieldId)+'"] input[type=checkbox]');
      var on=!!(cb&&cb.checked&&!cb.disabled);
      return c.op==='unchecked' ? !on : on;
    }
    return true;
  }
  function syncCdd(sel){
    var cdd=sel.parentNode && sel.parentNode.querySelector('.cdd'); if(!cdd) return;
    var val=cdd.querySelector('.cdd-val'); if(!val) return;
    var opt=sel.options[sel.selectedIndex];
    var ph=!opt||opt.disabled||opt.value==='';
    val.textContent=opt?opt.textContent:''; val.className='cdd-val'+(ph?' placeholder':'');
  }
  function setHidden(el, hidden){
    if(!el) return;
    el.classList.toggle('cond-hidden', hidden);
    var ctrls=el.querySelectorAll('input,select,textarea');
    Array.prototype.forEach.call(ctrls,function(c){
      c.disabled=hidden;
      if(hidden){
        if(c.type==='checkbox'||c.type==='radio') c.checked=false;
        else if(c.tagName==='SELECT'){ c.selectedIndex=0; syncCdd(c); }
        else if(c.type!=='button'&&c.type!=='submit') c.value='';
      }
    });
  }
  function applyConditionsOnce(){
    // Pages first (wholesale hide/disable of a whole section), then rows, then
    // fields. Rows/fields also inherit hidden state from an ancestor page/row,
    // so a shown rule never re-enables something inside a hidden container.
    DATA.rules.forEach(function(r){
      if(r.kind!=='page') return;
      setHidden(document.querySelector('[data-cpage="'+esc(r.id)+'"]'), !evalCond(r.cond));
    });
    DATA.rules.forEach(function(r){
      if(r.kind!=='row') return;
      var el=document.querySelector('[data-crow="'+esc(r.id)+'"]'); if(!el) return;
      var pageEl=el.closest('[data-cpage]');
      var pageHidden=pageEl && pageEl.classList.contains('cond-hidden');
      setHidden(el, !evalCond(r.cond) || pageHidden);
    });
    DATA.rules.forEach(function(r){
      if(r.kind!=='field') return;
      var el=document.querySelector('[data-cfield="'+esc(r.id)+'"]'); if(!el) return;
      var rowEl=el.closest('[data-crow]');
      var pageEl=el.closest('[data-cpage]');
      var ancestorHidden=(rowEl && rowEl.classList.contains('cond-hidden')) || (pageEl && pageEl.classList.contains('cond-hidden'));
      setHidden(el, !evalCond(r.cond) || ancestorHidden);
    });
    // Visibility groups: hide every member when the group rule fails. OR with
    // the member's already-hidden state (ancestor) so a group rule never
    // re-shows something a container hid.
    DATA.rules.forEach(function(r){
      if(r.kind!=='vgroup') return;
      var ok=evalCond(r.cond);
      (r.fieldIds||[]).forEach(function(fid){
        var el=document.querySelector('[data-cfield="'+esc(fid)+'"]'); if(!el) return;
        var rowEl=el.closest('[data-crow]');
        var pageEl=el.closest('[data-cpage]');
        var ancestorHidden=(rowEl && rowEl.classList.contains('cond-hidden')) || (pageEl && pageEl.classList.contains('cond-hidden'));
        setHidden(el, !ok || ancestorHidden);
      });
    });
  }
  function applyConditions(){
    if(!DATA.rules.length){ markLastVisibleRows(); return; }
    // A few settle passes: hiding a controller can change a downstream score
    // or answer that hides further branches. Converges quickly.
    for(var p=0;p<5;p++) applyConditionsOnce();
    markLastVisibleRows();
  }
  // Remove the row-separator border from the last VISIBLE row of each page so
  // a page never ends on a dangling gray line — even when conditional rules
  // hide the structurally-last row. Recomputed after every conditions pass.
  function markLastVisibleRows(){
    var pages=document.querySelectorAll('.page-step');
    Array.prototype.forEach.call(pages, function(pg){
      var rows=pg.querySelectorAll('.form-row');
      var last=null;
      Array.prototype.forEach.call(rows, function(r){
        r.classList.remove('is-last-visible');
        if(!r.classList.contains('cond-hidden')) last=r;
      });
      if(last) last.classList.add('is-last-visible');
    });
  }
  function bandFor(section, score){
    for(var i=0;i<section.bands.length;i++){ var b=section.bands[i]; if(score>=b.min && score<=b.max) return b; }
    return null;
  }
  function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function answerHits(fieldId, options){
    if(!options||!options.length) return false;
    var type=DATA.ctrlTypes[fieldId]; if(!type && DATA.fields && DATA.fields[fieldId]) type=DATA.fields[fieldId].type;
    if(type==='checkboxes'){ for(var k=0;k<options.length;k++){ var b=document.querySelector('[data-field-id="'+esc(fieldId)+'"] input[type=checkbox][data-opt-idx="'+Number(options[k])+'"]'); if(b&&b.checked&&!b.disabled) return true; } return false; }
    if(type==='radio'){ var r=document.querySelector('input[type=radio][name="'+esc(fieldId)+'"]:checked'); var sel=(r&&!r.disabled)?parseInt(r.getAttribute('data-opt-idx'),10):null; return sel!=null && options.map(Number).indexOf(sel)>=0; }
    if(type==='select'){ var s2=document.querySelector('select[data-field-id="'+esc(fieldId)+'"]'); var v=(s2&&!s2.disabled)?parseInt(s2.value,10):NaN; return !isNaN(v) && options.map(Number).indexOf(v)>=0; }
    if(type==='toggle'){ var tcb=document.querySelector('[data-cfield="'+esc(fieldId)+'"] input[type=checkbox]'); var ton=!!(tcb&&tcb.checked&&!tcb.disabled); var tidx=ton?0:1; return options.map(Number).indexOf(tidx)>=0; }
    return false;
  }
  function alertMsgFor(section, total){
    var al=section.alert; if(!al) return '';
    var crit=al.critical||[];
    for(var i=0;i<crit.length;i++){ if(crit[i]&&crit[i].fieldId&&answerHits(crit[i].fieldId, crit[i].options)) return crit[i].msg||'Critical item flagged \u2014 review immediately.'; }
    if((Number(al.min)||0)>0 && total>=Number(al.min)) return al.msg||'Elevated risk \u2014 flag for clinician review.';
    return '';
  }
  function updatePanel(){
    if(!DATA.showPanel && !DATA.showAlerts) return;
    var panel=document.getElementById('score-panel'); if(!panel) return;
    DATA.sections.forEach(function(section){
      var total=sectionScore(section);
      if(DATA.showPanel){
        var card=panel.querySelector('.score-card[data-section-id="'+esc(section.id)+'"]');
        if(card){
          var totalEl=card.querySelector('[data-role="total"]');
          if(totalEl) totalEl.innerHTML = total + '<span class="sc-max"> / '+section.max+'</span>';
          var bandEl=card.querySelector('[data-role="band"]');
          var band=bandFor(section, total);
          card.classList.remove('sev-low','sev-mild','sev-mod','sev-high');
          card.style.background=''; card.style.borderColor='';
          if(band){ bandEl.textContent=band.label; bandEl.classList.add('show');
            if(band.color && /^#[0-9a-fA-F]{6}$/.test(band.color)){ card.style.background=band.color+'14'; card.style.borderColor=band.color+'66'; bandEl.style.color=band.color; }
            else { bandEl.style.color=''; card.classList.add('sev-'+(band.severity||'low')); } }
          else { bandEl.textContent=''; bandEl.classList.remove('show'); bandEl.style.color=''; card.classList.add('sev-low'); }
        }
      }
      var alertEl=panel.querySelector('.score-alert[data-section-id="'+esc(section.id)+'"]');
      if(alertEl){
        var _amsg=alertMsgFor(section, total);
        if(_amsg){
          alertEl.style.cssText='display:flex;align-items:center;gap:8px;margin-top:6px;padding:10px 13px;background:#fdedeb;border:1px solid #f5b6ae;border-radius:9px;color:#a02016;font-size:13px;font-weight:600;line-height:1.35';
          alertEl.innerHTML='<span style="font-size:15px">\u26A0</span><span>'+escH(_amsg)+'</span>';
        } else { alertEl.style.display='none'; alertEl.innerHTML=''; }
      }
    });
  }
  function publishScores(){
    if(!DATA.profileKey) return;
    var anyKey=false;
    for(var i=0;i<DATA.sections.length;i++){ if(DATA.sections[i].scoreKey){ anyKey=true; break; } }
    if(!anyKey) return;
    var p; try{ p=JSON.parse(localStorage.getItem(DATA.profileKey)||'{}')||{}; }catch(e){ p={}; }
    DATA.sections.forEach(function(section){
      if(!section.scoreKey) return;
      p[section.scoreKey]=sectionScore(section);
    });
    try{ localStorage.setItem(DATA.profileKey, JSON.stringify(p)); }catch(e){}
  }
  // Popup-on-condition: open a linked form (embedded as base64) in an 80%
  // overlay when a rule with openForm becomes true.
  var POPUP_OPENED={};
  function cwOpenPopupForm(id,title){
    var modal=document.getElementById('cw-popupform'); if(!modal) return;
    var enc=DATA.popupForms&&DATA.popupForms[id]; if(!enc) return;
    var ttl=modal.querySelector('.popupform-title'); if(ttl) ttl.textContent=title||'Form';
    var fr=document.getElementById('cw-popupform-frame');
    if(fr){ var htmlStr=''; try{ htmlStr=decodeURIComponent(escape(atob(enc))); }catch(e){ try{ htmlStr=atob(enc); }catch(e2){ htmlStr=''; } } fr.srcdoc=htmlStr; }
    modal.classList.remove('popup-min','popup-full'); modal.classList.add('open');
  }
  function checkPopups(){
    if(!DATA.popupForms) return;
    var seen={};
    DATA.rules.forEach(function(r){
      if(!r.cond||!r.cond.openForm) return;
      var sig=JSON.stringify(r.cond.openForm)+'|'+JSON.stringify(r.cond.conditions);
      if(seen[sig]) return; seen[sig]=1;
      var met=evalCond(r.cond);
      var k='of:'+sig;
      if(met && !POPUP_OPENED[k]){ POPUP_OPENED[k]=true; cwOpenPopupForm(r.cond.openForm.id, r.cond.openForm.title); }
      else if(!met){ POPUP_OPENED[k]=false; }
    });
  }
  document.addEventListener('click', function(e){
    var b=e.target.closest && e.target.closest('[data-popup-act]'); if(!b) return;
    var m=document.getElementById('cw-popupform'); if(!m) return;
    var act=b.getAttribute('data-popup-act');
    if(act==='min'){ m.classList.toggle('popup-min'); m.classList.remove('popup-full'); }
    else if(act==='max'){ m.classList.toggle('popup-full'); m.classList.remove('popup-min'); }
    else if(act==='close'){ m.classList.remove('open','popup-min','popup-full'); var fr=document.getElementById('cw-popupform-frame'); if(fr) fr.removeAttribute('srcdoc'); }
  });
  function update(){ applyConditions(); updatePanel(); publishScores(); publishBridge(); checkPopups(); if(window.__cwReanchor) window.__cwReanchor(); }
  document.addEventListener('change', update);
  document.addEventListener('input', update);
  // When a sibling form updates the shared bridge, re-evaluate our conditions so
  // cross-form rules react in real time (same browser, multiple open forms).
  window.addEventListener('storage', function(e){ if(e && e.key===XKEY){ applyConditions(); checkPopups(); } });
  update();
})();
<\/script>`;
  }
  // Submit handler — runs for both single-page and wizard exports. Without
  // this the form has no action/handler, so clicking Submit did a native GET
  // submit that reloaded the page and discarded every answer with no feedback.
  // This is a front-end placeholder confirmation: it validates, then swaps the
  // form for a thank-you panel. Wire the fetch() POST to your endpoint where
  // indicated to actually capture responses.
  html+=`
<script>
(function(){
  var form=document.getElementById('credify-form');
  if(!form) return;
  // Live US phone masking: format digits as (555) 123-4567 as the user types.
  // Mirrors the in-app preview so what the builder sees matches the export.
  function fmtPhone(raw){
    var d=String(raw||'').replace(/\\D/g,'').slice(0,10);
    if(d.length===0) return '';
    if(d.length<4) return '('+d;
    if(d.length<7) return '('+d.slice(0,3)+') '+d.slice(3);
    return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);
  }
  Array.prototype.forEach.call(form.querySelectorAll('input[type="tel"][data-phone-mask]'),function(inp){
    if(inp.value) inp.value=fmtPhone(inp.value);
    inp.addEventListener('input',function(){ var f=fmtPhone(inp.value); if(inp.value!==f) inp.value=f; });
  });
  // ---- Popup 12-hour time pickers + live Total Time ----
  function ttFmtLabel(hhmm){
    if(!hhmm) return '';
    var p=String(hhmm).split(':'); var h=parseInt(p[0],10), m=parseInt(p[1],10);
    if(isNaN(h)||isNaN(m)) return '';
    var ap=h>=12?'PM':'AM'; var h12=h%12; if(h12===0) h12=12;
    return h12+':'+String(m).padStart(2,'0')+' '+ap;
  }
  function ttMinutes(hhmm){
    if(!hhmm) return '';
    var p=String(hhmm).split(':'); var h=parseInt(p[0],10), m=parseInt(p[1],10);
    if(isNaN(h)||isNaN(m)) return '';
    return h*60+m;
  }
  function ttFmt(startMin, endMin){
    if(startMin===''||endMin==='') return '';
    var diff=endMin-startMin; if(diff<0) diff+=1440;
    return Math.floor(diff/60)+'h '+(diff%60)+'m';
  }
  // Wire each popup picker (mirrors the in-app ttPickerInit).
  Array.prototype.forEach.call(form.querySelectorAll('.tt-picker'),function(pk){
    var val=pk.querySelector('.tt-val'), trigger=pk.querySelector('.tt-trigger'),
        pop=pk.querySelector('.tt-pop'), label=pk.querySelector('.tt-trigger-label');
    if(!val||!trigger||!pop) return;
    var pend={h:null,m:null,ap:null};
    function paint(){
      Array.prototype.forEach.call(pk.querySelectorAll('.tt-h'),function(b){ b.classList.toggle('sel', pend.h!=null && parseInt(b.getAttribute('data-h'),10)===pend.h); });
      Array.prototype.forEach.call(pk.querySelectorAll('.tt-m'),function(b){ b.classList.toggle('sel', pend.m!=null && parseInt(b.getAttribute('data-m'),10)===pend.m); });
      Array.prototype.forEach.call(pk.querySelectorAll('.tt-ap-btn'),function(b){ b.classList.toggle('sel', pend.ap && b.getAttribute('data-ap')===pend.ap); });
    }
    function seed(){
      pend={h:null,m:null,ap:null};
      if(val.value){ var p=val.value.split(':'); var h=parseInt(p[0],10), m=parseInt(p[1],10); if(!isNaN(h)&&!isNaN(m)){ pend.ap=h>=12?'PM':'AM'; var h12=h%12; if(h12===0) h12=12; pend.h=h12; pend.m=m; } }
      paint();
    }
    function refresh(){ label.textContent=val.value?ttFmtLabel(val.value):'Select time'; pk.classList.toggle('tt-has-val',!!val.value); }
    function commit(){ if(pend.h!=null&&pend.m!=null&&pend.ap){ var h=pend.h%12; if(pend.ap==='PM') h+=12; val.value=String(h).padStart(2,'0')+':'+String(pend.m).padStart(2,'0'); refresh(); val.dispatchEvent(new Event('change',{bubbles:true})); closeP(); } }
    function openP(){ Array.prototype.forEach.call(document.querySelectorAll('.tt-picker.tt-open'),function(o){ if(o!==pk){ o.classList.remove('tt-open'); var pp=o.querySelector('.tt-pop'); if(pp) pp.hidden=true; } }); seed(); pop.hidden=false; pk.classList.add('tt-open'); trigger.setAttribute('aria-expanded','true'); pop.classList.remove('tt-pop-up','tt-pop-right'); pop.style.maxHeight=''; pop.style.overflowY=''; var margin=8, tr=trigger.getBoundingClientRect(), popH=pop.offsetHeight, roomBelow=window.innerHeight-tr.bottom-margin, roomAbove=tr.top-margin, flipUp=popH>roomBelow && roomAbove>roomBelow; if(flipUp) pop.classList.add('tt-pop-up'); var room=flipUp?roomAbove:roomBelow; if(popH>room){ pop.style.maxHeight=Math.max(room,160)+'px'; pop.style.overflowY='auto'; } var pr=pop.getBoundingClientRect(); if(pr.right>window.innerWidth-4){ pop.classList.add('tt-pop-right'); } }
    function closeP(){ pop.hidden=true; pk.classList.remove('tt-open'); trigger.setAttribute('aria-expanded','false'); }
    trigger.addEventListener('click',function(e){ e.stopPropagation(); if(trigger.disabled) return; if(pk.classList.contains('tt-open')) closeP(); else openP(); });
    pop.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; e.stopPropagation();
      if(b.classList.contains('tt-h')) pend.h=parseInt(b.getAttribute('data-h'),10);
      else if(b.classList.contains('tt-m')) pend.m=parseInt(b.getAttribute('data-m'),10);
      else if(b.classList.contains('tt-ap-btn')) pend.ap=b.getAttribute('data-ap');
      paint(); commit();
    });
    refresh();
  });
  document.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('.tt-picker')) return; Array.prototype.forEach.call(document.querySelectorAll('.tt-picker.tt-open'),function(o){ o.classList.remove('tt-open'); var pp=o.querySelector('.tt-pop'); if(pp) pp.hidden=true; }); });
  // Radio deselect: click the label of a selected radio to clear it; jabbing the
  // circle itself twice surfaces a tip pointing at the label.
  (function(){
    var tipCount={};
    function hideTip(){ var t=document.getElementById('radio-deselect-tip'); if(t&&t.parentNode) t.parentNode.removeChild(t); }
    function showTip(anchor){ hideTip(); var tip=document.createElement('div'); tip.id='radio-deselect-tip'; tip.className='radio-deselect-tip'; tip.textContent='To deselect your option, click on the label.'; document.body.appendChild(tip); try{ var r=anchor.getBoundingClientRect(); tip.style.left=Math.round(r.right+10)+'px'; tip.style.top=Math.round(r.top)+'px'; }catch(e){} clearTimeout(showTip._t); showTip._t=setTimeout(hideTip,4500); }
    document.addEventListener('mousedown', function(e){
      var lab=e.target.closest && e.target.closest('.opt'); if(!lab) return;
      var input=lab.querySelector('input[type=radio]'); if(!input||input.disabled) return;
      var fid=input.name; var clickedCircle=(e.target===input); var wasChecked=input.checked;
      if(wasChecked && !clickedCircle){ e.preventDefault(); input.checked=false; tipCount[fid]=0; hideTip(); input.dispatchEvent(new Event('change',{bubbles:true})); }
      else if(wasChecked && clickedCircle){ tipCount[fid]=(tipCount[fid]||0)+1; if(tipCount[fid]>=2) showTip(lab); }
      else { tipCount[fid]=0; hideTip(); }
    });
  })();
  // Recompute totals when a picker commits.
  Array.prototype.forEach.call(form.querySelectorAll('.totaltime'),function(box){
    var tot=box.querySelector('.tt-total');
    function recompute(){ if(tot) tot.value=ttFmt(ttMinutes(box.querySelector('.tt-start-val')?box.querySelector('.tt-start-val').value:''), ttMinutes(box.querySelector('.tt-end-val')?box.querySelector('.tt-end-val').value:'')); }
    Array.prototype.forEach.call(box.querySelectorAll('.tt-val'),function(v){ v.addEventListener('change',recompute); });
    recompute();
  });
  var FORM_CLIENT_ID=${JSON.stringify(FORM.id||'')};
  var FIELDS=${JSON.stringify(FORM.rows.flatMap(r=>r.fields).map(f=>({id:f.id,type:f.type})))};
  function ce(s){ if(typeof CSS!=='undefined'&&CSS.escape) return CSS.escape(s); return String(s).replace(/[^a-zA-Z0-9_-]/g,function(c){return '\\\\'+c;}); }
  // Read each field's answer as an option INDEX (radio/select), array of
  // indices (checkboxes), boolean (checkbox/toggle), or raw value. The server
  // re-scores from these and decides which alerts fire — never trusting flags
  // computed in the browser.
  function collectAnswers(){
    var out={};
    FIELDS.forEach(function(f){
      var fid=f.id, type=f.type, wrap=document.querySelector('[data-cfield="'+ce(fid)+'"]');
      if(type==='radio'){ var r=document.querySelector('input[type=radio][name="'+ce(fid)+'"]:checked'); if(r){ var i=parseInt(r.getAttribute('data-opt-idx'),10); if(!isNaN(i)) out[fid]=i; } }
      else if(type==='select'){ var s=document.querySelector('select[data-field-id="'+ce(fid)+'"]'); if(s&&s.value!==''){ var v=parseInt(s.value,10); if(!isNaN(v)) out[fid]=v; } }
      else if(type==='checkboxes'){ var arr=[]; Array.prototype.forEach.call(document.querySelectorAll('[data-field-id="'+ce(fid)+'"] input[type=checkbox]:checked'),function(c){ var k=parseInt(c.getAttribute('data-opt-idx'),10); if(!isNaN(k)) arr.push(k); }); if(arr.length) out[fid]=arr; }
      else if(type==='matrix'){ var mrows={}, many=false; if(wrap){ Array.prototype.forEach.call(wrap.querySelectorAll('input[type=radio][data-mrow]:checked'),function(r){ var ri=parseInt(r.getAttribute('data-mrow'),10), ci=parseInt(r.getAttribute('data-opt-idx'),10); if(!isNaN(ri)&&!isNaN(ci)){ mrows[ri]=ci; many=true; } }); } if(many) out[fid]=mrows; }
      else if(type==='checkbox'||type==='toggle'){ var cb=wrap&&wrap.querySelector('input[type=checkbox]'); if(cb) out[fid]=!!cb.checked; }
      else if(type==='signature'){ var sv=wrap&&wrap.querySelector('.sign-val'); if(sv&&sv.value) out[fid]='[signed]'; }
      else if(type==='totaltime'){ var ttb=wrap&&wrap.querySelector('.totaltime'); if(ttb){ var sv=ttb.querySelector('.tt-start-val'), ev=ttb.querySelector('.tt-end-val'), to=ttb.querySelector('.tt-total'); var v={start:sv?sv.value:'', end:ev?ev.value:'', total:to?to.value:''}; if(v.start||v.end) out[fid]=v; } }
      else if(type==='heading'||type==='divider'){ /* no value */ }
      else if(type==='phone'){ var mn=wrap&&(wrap.querySelector('.cw-phone-main')||wrap.querySelector('input[type=tel]')); var ex=wrap&&wrap.querySelector('.cw-phone-ext'); var mv=mn?String(mn.value||'').trim():''; var xv=ex?String(ex.value||'').trim():''; var comb=mv?(xv?mv+' x'+xv:mv):''; if(comb) out[fid]=comb; }
      else { var el=wrap&&wrap.querySelector('input,textarea'); if(el&&el.value!=='') out[fid]=el.value; }
    });
    return out;
  }
  function done(){
    var container=document.querySelector('.form-container');
    if(container){ container.innerHTML='<h1>Thank you</h1>'+'<div class="form-desc">Your response has been recorded.</div>'; window.scrollTo({top:0,behavior:'smooth'}); }
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // Custom validation: red outlines + field-level + focus-walk in document
    // order (top → right → down). Falls back to native if the runtime is absent.
    if(typeof window.__cwValidate==='function'){
      var bad=window.__cwValidate(form);
      if(bad){
        if(typeof window.__cwGotoStepOf==='function') window.__cwGotoStepOf(bad);
        try{ bad.focus({preventScroll:true}); }catch(_){ try{ bad.focus(); }catch(__){} }
        if(bad.scrollIntoView) bad.scrollIntoView({behavior:'smooth',block:'center'});
        return;
      }
    } else {
      if(!form.checkValidity()){ form.reportValidity(); return; }
    }
    // POST answers to the Credify app (override target via window.CREDIFY_SUBMIT_URL).
    // Fire-and-forget: the patient sees the thank-you regardless of network result.
    var url=(typeof window!=='undefined'&&window.CREDIFY_SUBMIT_URL)?window.CREDIFY_SUBMIT_URL:'/api/public/submissions';
    try{
      fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({formClientId:FORM_CLIENT_ID,answers:collectAnswers()})}).catch(function(){});
    }catch(_){}
    done();
  });
})();
<\/script>`;
  html+=`
<script>
(function(){
  var pads=document.querySelectorAll('.sign-pad');
  for(var i=0;i<pads.length;i++) wire(pads[i]);
  function wire(pad){
    var canvas=pad.querySelector('.sign-canvas'); if(!canvas) return;
    var hidden=pad.querySelector('.sign-val');
    var ctx=canvas.getContext('2d'); if(!ctx) return;
    ctx.lineWidth=2.2; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0d1f18';
    var drawing=false,last=null,dirty=false;
    function pos(e){ var r=canvas.getBoundingClientRect(); var t=(e.touches&&e.touches[0])||e; return {x:(t.clientX-r.left)*(canvas.width/(r.width||1)), y:(t.clientY-r.top)*(canvas.height/(r.height||1))}; }
    function store(){ if(hidden) hidden.value=dirty?canvas.toDataURL('image/png'):''; }
    function down(e){ e.preventDefault(); pad.style.borderColor=''; var h=pad.querySelector('.sign-hint'); if(h&&h.textContent==='Signature required'){ h.textContent='Sign above with mouse or finger'; h.style.color=''; } drawing=true; last=pos(e); }
    function move(e){ if(!drawing) return; e.preventDefault(); var pt=pos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(pt.x,pt.y); ctx.stroke(); last=pt; dirty=true; }
    function up(){ if(drawing){ drawing=false; store(); } }
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    canvas.addEventListener('touchstart',down,{passive:false}); canvas.addEventListener('touchmove',move,{passive:false}); canvas.addEventListener('touchend',up);
    var clr=pad.querySelector('.sign-clear'); if(clr) clr.addEventListener('click',function(){ ctx.clearRect(0,0,canvas.width,canvas.height); dirty=false; store(); });
  }
})();
<\/script>`;
  html+=`
<script>
// Auto-grow any textareas marked [data-autogrow].
// the textarea can shrink when text is deleted, then set height to scrollHeight
// clamped by the inline max-height — so it grows up to the builder-set cap,
// then scrolls internally.
(function(){
  function autoGrow(el){
    el.style.height='auto';
    var cap=parseFloat(getComputedStyle(el).maxHeight)||Infinity;
    el.style.height=Math.min(el.scrollHeight, cap)+'px';
  }
  document.addEventListener('input', function(e){
    if(e.target && e.target.tagName==='TEXTAREA' && e.target.dataset.autogrow) autoGrow(e.target);
  });
  // Initial pass for any prefilled textareas.
  Array.prototype.forEach.call(document.querySelectorAll('textarea[data-autogrow]'), autoGrow);
})();
<\/script>`;

  // ===== Cross-form auto-population runtime =====
  // Emitted when any field carries a shared `dataKey`. On load it fills keyed
  // fields from (1) the shared localStorage profile, (2) URL query params
  // (?first_name=…), then (3) a window.CREDIFY_PREFILL object — later sources
  // win. It writes values back on change + submit so the next form prefills.
  // window.CredifyPrefill({...}) lets a portal push values after load.
  const prefillFields={}, prefillOptions={};
  FORM.rows.forEach(r=>r.fields.forEach(f=>{
    if(f.dataKey && PREFILLABLE_TYPES.has(f.type)){
      prefillFields[f.id]={key:f.dataKey, type:f.type};
      if(f.prefillOverwrite) prefillFields[f.id].recv=true; // one-way: overwritten by source, never writes back
      if(f.type==='select'||f.type==='radio'||f.type==='checkboxes') prefillOptions[f.id]=(f.options||[]).map(o=>String(o));
    }
  }));
  if(Object.keys(prefillFields).length>0){
    const pblob=JSON.stringify({key:SHARED_PROFILE_KEY, fields:prefillFields, options:prefillOptions}).replace(/<\/script>/gi,'<\\/script>');
    html+=`
<script>
(function(){
  var CFG=${pblob};
  var SK=CFG.key, F=CFG.fields, OPT=CFG.options||{};
  function esc(s){ if(typeof CSS!=='undefined'&&CSS.escape) return CSS.escape(s); return String(s).replace(/[^a-zA-Z0-9_-]/g,function(c){return '\\\\'+c;}); }
  function loadP(){ try{ return JSON.parse(localStorage.getItem(SK)||'{}')||{}; }catch(e){ return {}; } }
  function saveP(k,v){ if(!k) return; var p; try{ p=JSON.parse(localStorage.getItem(SK)||'{}')||{}; }catch(e){ p={}; }
    if(v==null||v===''||(Array.isArray(v)&&!v.length)) delete p[k]; else p[k]=v;
    try{ localStorage.setItem(SK, JSON.stringify(p)); }catch(e){} }
  function syncCdd(sel){ var cdd=sel.parentNode&&sel.parentNode.querySelector('.cdd'); if(!cdd) return; var val=cdd.querySelector('.cdd-val'); if(!val) return; var opt=sel.options[sel.selectedIndex]; var ph=!opt||opt.disabled||opt.value===''; val.textContent=opt?opt.textContent:''; val.className='cdd-val'+(ph?' placeholder':''); }
  function wrapOf(fid){ return document.querySelector('[data-cfield="'+esc(fid)+'"]'); }
  function setVal(fid,val){
    var meta=F[fid]; if(!meta) return; var type=meta.type; var wrap=wrapOf(fid); if(!wrap) return;
    if(type==='select'){ var opts=OPT[fid]||[]; var i=opts.indexOf(String(val)); if(i<0) return; var sel=wrap.querySelector('select'); if(sel){ sel.value=String(i); syncCdd(sel);} }
    else if(type==='radio'){ var opts=OPT[fid]||[]; var i=opts.indexOf(String(val)); if(i<0) return; var r=wrap.querySelector('input[type=radio][data-opt-idx="'+i+'"]'); if(r) r.checked=true; }
    else if(type==='checkboxes'){ var arr=Array.isArray(val)?val:[val]; var opts=OPT[fid]||[]; arr.forEach(function(v){ var i=opts.indexOf(String(v)); if(i>=0){ var cb=wrap.querySelector('input[type=checkbox][data-opt-idx="'+i+'"]'); if(cb) cb.checked=true; } }); }
    else if(type==='checkbox'||type==='toggle'){ var cb=wrap.querySelector('input[type=checkbox]'); if(cb) cb.checked=(val===true||val==='true'); }
    else { var c=wrap.querySelector('input,textarea'); if(c){ c.value=val; } }
  }
  function readVal(fid){
    var meta=F[fid]; if(!meta) return null; var type=meta.type; var wrap=wrapOf(fid); if(!wrap) return null;
    if(type==='select'){ var sel=wrap.querySelector('select'); if(!sel) return null; var i=parseInt(sel.value,10); var opts=OPT[fid]||[]; return isNaN(i)?null:(opts[i]==null?null:opts[i]); }
    if(type==='radio'){ var r=wrap.querySelector('input[type=radio]:checked'); if(!r) return null; var i=parseInt(r.getAttribute('data-opt-idx'),10); var opts=OPT[fid]||[]; return opts[i]==null?null:opts[i]; }
    if(type==='checkboxes'){ var opts=OPT[fid]||[]; var out=[]; Array.prototype.forEach.call(wrap.querySelectorAll('input[type=checkbox]:checked'),function(c){ var i=parseInt(c.getAttribute('data-opt-idx'),10); if(opts[i]!=null) out.push(opts[i]); }); return out; }
    if(type==='checkbox'||type==='toggle'){ var cb=wrap.querySelector('input[type=checkbox]'); return cb?!!cb.checked:null; }
    var c=wrap.querySelector('input,textarea'); return c?c.value:null;
  }
  function applyPrefill(values){
    if(!values) return; var touched=[];
    for(var fid in F){ var k=F[fid].key; if(values[k]!==undefined && values[k]!==null){ setVal(fid, values[k]); touched.push(fid); } }
    // One round of events (after all values are set) so conditional visibility
    // and scoring recompute against the fully prefilled state.
    touched.forEach(function(fid){ var wrap=wrapOf(fid); if(!wrap) return;
      Array.prototype.forEach.call(wrap.querySelectorAll('input,select,textarea'),function(c){
        c.dispatchEvent(new Event('input',{bubbles:true}));
        c.dispatchEvent(new Event('change',{bubbles:true}));
      });
    });
  }
  // Build the initial value set: shared profile, then URL params, then a
  // pre-set global — later sources override earlier ones.
  var initial=loadP();
  try{ var qs=new URLSearchParams(location.search); qs.forEach(function(v,k){ initial[k]=v; }); }catch(e){}
  if(window.CREDIFY_PREFILL && typeof window.CREDIFY_PREFILL==='object'){ for(var k in window.CREDIFY_PREFILL) initial[k]=window.CREDIFY_PREFILL[k]; }
  applyPrefill(initial);
  // Persist keyed values back to the shared profile on commit + on submit.
  document.addEventListener('change', function(e){
    var t=e.target; if(!t) return; var fid=null;
    if(t.type==='radio'&&t.name){ fid=t.name; } else if(t.closest){ var w=t.closest('[data-cfield]'); if(w) fid=w.getAttribute('data-cfield'); }
    if(fid && F[fid] && !F[fid].recv) saveP(F[fid].key, readVal(fid));
  });
  var form=document.getElementById('credify-form');
  if(form) form.addEventListener('submit', function(){ for(var fid in F){ if(!F[fid].recv) saveP(F[fid].key, readVal(fid)); } }, true);
  // Portal / backend hook: CredifyPrefill({first_name:'Jay', ...}) after load.
  window.CredifyPrefill=function(obj){ applyPrefill(obj||{}); };
})();
<\/script>`;
  }

  html+=`
<script>
(function(){
  document.addEventListener('click', function(e){
    var s=e.target && e.target.closest && e.target.closest('.rating .star'); if(!s) return;
    var box=s.closest('.rating'); if(!box) return;
    var inp=box.querySelector('.rating-val'); if(!inp) return;
    var v=Number(s.getAttribute('data-v'))||0;
    var cur=Number(inp.value)||0; var nv=(cur===v)?0:v;
    inp.value=nv||'';
    var stars=box.querySelectorAll('.star');
    for(var i=0;i<stars.length;i++){ stars[i].style.color=(i<nv)?'#d97706':'#cbd5d0'; }
    inp.dispatchEvent(new Event('change',{bubbles:true}));
  });
})();
<\/script>`;

  // ---- Validation runtime: red outlines + field-level + submit focus-walk ----
  html+=`
<script>
(function(){
  var form=document.getElementById('credify-form');
  if(!form) return;
  // After a failed submit we enter fix-up mode: completing one flagged field
  // jumps to the next still-missing one. Cleared once nothing is missing.
  var attempted=false;
  function fieldOf(el){ return el&&el.closest?el.closest('.form-field'):null; }
  function visible(c){ return !(c.closest && c.closest('.cond-hidden')); }
  function msgFor(el){
    var v=el.validity||{};
    if(v.valueMissing) return 'This field is required';
    if(v.typeMismatch) return el.type==='email'?'Enter a valid email address':(el.type==='url'?'Enter a valid URL':'Enter a valid value');
    if(v.patternMismatch) return 'Enter a valid format (e.g. (555) 123-4567)';
    if(v.rangeUnderflow||v.rangeOverflow||v.stepMismatch||v.badInput) return 'Enter a valid number';
    return 'Please check this field';
  }
  function checkField(c){
    if(!visible(c)) return {ok:true};
    var sign=c.querySelector('.sign-pad[data-required]');
    if(sign){ var sv=sign.querySelector('.sign-val'); if(!sv||!sv.value) return {ok:false, focusEl:c.querySelector('canvas')||sign, msg:'Signature required'}; }
    var tt=c.querySelector('.totaltime[data-required]');
    if(tt){ var allset=true, ps=tt.querySelectorAll('.tt-picker'); for(var p=0;p<ps.length;p++){ var h=ps[p].querySelector('input[type=hidden]'); if(!h||!h.value) allset=false; } if(!allset) return {ok:false, focusEl:tt.querySelector('.tt-trigger')||tt, msg:'Select both a start and end time'}; }
    var tf=c.querySelector('.time-field[data-required]');
    if(tf){ var th=tf.querySelector('input[type=hidden]'); if(!th||!th.value) return {ok:false, focusEl:tf.querySelector('.tt-trigger')||tf, msg:'Select a time'}; }
    var ctrls=c.querySelectorAll('input,select,textarea');
    for(var i=0;i<ctrls.length;i++){
      var el=ctrls[i];
      if(el.disabled||el.type==='hidden') continue;
      if(typeof el.checkValidity==='function' && !el.checkValidity()){
        var fe=el;
        if(el.tagName==='SELECT' && el.classList.contains('has-cdd')){ var b=el.parentNode.querySelector('.cdd .cdd-btn'); if(b) fe=b; }
        return {ok:false, focusEl:fe, msg:msgFor(el)};
      }
    }
    return {ok:true};
  }
  function setInvalid(c,msg){ c.classList.add('invalid'); var e=c.querySelector(':scope > .field-error'); if(!e){ e=document.createElement('div'); e.className='field-error'; c.appendChild(e); } e.textContent=msg||'Please check this field'; }
  function clearInvalid(c){ c.classList.remove('invalid'); var e=c.querySelector(':scope > .field-error'); if(e&&e.parentNode) e.parentNode.removeChild(e); }
  function validateField(c){ var r=checkField(c); if(r.ok) clearInvalid(c); else setInvalid(c,r.msg); return r.ok; }
  // Field-level: validate on blur; clear/refresh the instant it becomes valid.
  form.addEventListener('blur', function(ev){ var c=fieldOf(ev.target); if(c) validateField(c); }, true);
  form.addEventListener('input', function(ev){ var c=fieldOf(ev.target); if(c&&c.classList.contains('invalid')) validateField(c); });
  form.addEventListener('change', function(ev){ var c=fieldOf(ev.target); if(!c) return; var miss=c.getAttribute('data-cw-missed')==='1'; if(c.classList.contains('invalid')||miss) validateField(c); if(attempted && miss && checkField(c).ok){ c.removeAttribute('data-cw-missed'); jumpToNextInvalid(); } });
  // Focus + scroll the next still-invalid field, top → down. Skips hidden
  // fields (conditional or off-page). Clears fix-up mode when none remain.
  function jumpToNextInvalid(){
    var fields=form.querySelectorAll('.form-field');
    for(var i=0;i<fields.length;i++){
      if(fields[i].offsetParent===null) continue;
      var r=checkField(fields[i]);
      if(!r.ok){ var fe=r.focusEl||fields[i]; try{ fe.focus({preventScroll:true}); }catch(_){ try{ fe.focus(); }catch(__){} } if(fe.scrollIntoView) fe.scrollIntoView({behavior:'smooth',block:'center'}); return; }
    }
    attempted=false;
  }
  // Sweep a scope (a page, or the whole form): mark every invalid field red and
  // return the first invalid control in document order (top → right → down).
  window.__cwValidate=function(scope){
    var fields=(scope||form).querySelectorAll('.form-field'), first=null;
    for(var i=0;i<fields.length;i++){ var r=checkField(fields[i]); if(r.ok){ clearInvalid(fields[i]); fields[i].removeAttribute('data-cw-missed'); } else { setInvalid(fields[i], r.msg); fields[i].setAttribute('data-cw-missed','1'); if(!first) first=r.focusEl||fields[i]; } }
    attempted=!!first;
    return first;
  };
})();
<\/script>`;
  if(Object.keys(popupMap).length){
    html+=`
<style>
#cw-popupform{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(13,31,24,.45)}
#cw-popupform.open{display:flex}
#cw-popupform .popupform-panel{width:80vw;height:80vh;max-width:1100px;background:#fff;border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden;transition:width .15s,height .15s}
#cw-popupform.popup-full .popupform-panel{width:96vw;height:94vh;max-width:none}
#cw-popupform.popup-min{align-items:flex-end;justify-content:flex-end;background:transparent;pointer-events:none}
#cw-popupform.popup-min .popupform-panel{width:340px;height:auto;pointer-events:auto;margin:0 18px 18px 0}
#cw-popupform.popup-min .popupform-body{display:none}
#cw-popupform .popupform-head{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #dde8e3;background:#f4f7f5;flex-shrink:0}
#cw-popupform .popupform-title{font-weight:700;font-size:14px;color:#0d1f18;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#cw-popupform .popupform-btn{border:1px solid #dde8e3;background:#fff;border-radius:7px;height:30px;min-width:30px;padding:0 9px;cursor:pointer;font:inherit;font-size:13px;font-weight:700;color:#527060;display:inline-flex;align-items:center;justify-content:center}
#cw-popupform .popupform-btn.return{color:#1a8a66;border-color:#22a87e}
#cw-popupform .popupform-body{flex:1;min-height:0;background:#fff}
#cw-popupform-frame{width:100%;height:100%;border:0;display:block}
</style>
<div id="cw-popupform"><div class="popupform-panel"><div class="popupform-head"><span class="popupform-title">Form</span><button class="popupform-btn" data-popup-act="min" title="Minimize / restore">\u2014</button><button class="popupform-btn" data-popup-act="max" title="Maximize / restore">\u25A2</button><button class="popupform-btn return" data-popup-act="close" title="Return to the original form">Return \u2715</button></div><div class="popupform-body"><iframe id="cw-popupform-frame" title="Linked form"></iframe></div></div></div>`;
  }
  html+=`
</body>
</html>`;
  return html;
}

function openExport(){
  switchExportTab(EXPORT_MODE==='html'?'html':'json');
  openModal('export-modal');
}

function copyExport(){
  const content=EXPORT_MODE==='json'?document.getElementById('export-json').textContent:document.getElementById('export-html').value;
  navigator.clipboard?.writeText(content).then(()=>toast('Copied to clipboard')).catch(()=>toast('Copy failed'));
}

/* ===== Cross-Form Test Bench (merged from JAY build) =====
   Exports the current form + every form it references (popup targets and
   cross-form field/score conditions) as ONE standalone page. Each form runs in
   its own iframe but they all share the localStorage bridge, so filling a field
   or building a score in one panel makes cross-form conditions in another react
   live — a same-browser proof of the cross-form feature. */
function buildFormExportAtTop(formObj){
  const saved=FORM, savedDepth=(typeof POPUP_EMBED_DEPTH!=='undefined'?POPUP_EMBED_DEPTH:0);
  POPUP_EMBED_DEPTH=0;
  try{ FORM=formObj; return buildHTMLForm(); }
  finally{ FORM=saved; POPUP_EMBED_DEPTH=savedDepth; }
}
function gatherBenchFormIds(){
  const ids=[]; const seen=new Set();
  const add=id=>{ if(id && !seen.has(id)){ seen.add(id); ids.push(id); } };
  add(FORM.id);
  collectPopupFormIds().forEach(add);
  const scan=c=>{ if(!c) return; if(c.block){ (c.conditions||[]).forEach(scan); return; } if(c.formId && c.formId!==FORM.id) add(c.formId); };
  (FORM.rows||[]).forEach(r=>{ scan(r.showIf); (r.fields||[]).forEach(f=>scan(f.showIf)); });
  (FORM.visibilityGroups||[]).forEach(g=>scan(g.showIf));
  if(FORM.pageRules) Object.keys(FORM.pageRules).forEach(p=>scan(FORM.pageRules[p]));
  if(ids.length<2){ (FORMS||[]).forEach(f=>{ if(ids.length<5) add(f.id); }); }
  return ids;
}
function exportCrossFormBench(){
  if(!FORM || !FORM.id){ toast('Open a form first'); return; }
  const ids=gatherBenchFormIds();
  const forms=ids.map(id=>(FORM.id===id?FORM:(FORMS||[]).find(x=>x.id===id))).filter(Boolean);
  if(!forms.length){ toast('Nothing to put in the bench'); return; }
  const panels=forms.map(f=>{
    let srcdoc='';
    try{ srcdoc=buildFormExportAtTop(JSON.parse(JSON.stringify(f))); }catch(e){ srcdoc='<p style="font:14px sans-serif;padding:24px">Could not render this form.</p>'; }
    const enc=srcdoc.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    return `<section class="bench-panel">
      <header class="bench-panel-head"><span class="bench-dot"></span>${esc(f.title||'Untitled form')}</header>
      <iframe class="bench-frame" data-form="${esc(f.id)}" srcdoc="${enc}"></iframe>
    </section>`;
  }).join('');
  const page=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cross-Form Test Bench — ${esc(FORM.title||'Credify')}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box} html,body{margin:0}
  body{font-family:'Sora',system-ui,sans-serif;background:#f4f7f5;color:#0d1f18;-webkit-font-smoothing:antialiased}
  .bench-top{background:#0a3d2b;color:#fff;padding:20px 28px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
  .bench-top h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:30px;margin:0;letter-spacing:.2px}
  .bench-pill{font-size:11px;text-transform:uppercase;letter-spacing:.12em;background:rgba(255,255,255,.14);padding:5px 11px;border-radius:999px}
  .bench-sub{flex:1 1 100%;color:#bfe3d3;font-size:13.5px;line-height:1.5;margin-top:2px;max-width:80ch}
  .bench-actions{display:flex;gap:10px;margin-left:auto}
  .bench-btn{font-family:'Sora';font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,.32);background:transparent;color:#fff;padding:8px 14px;border-radius:9px;cursor:pointer;transition:.15s}
  .bench-btn:hover{background:rgba(255,255,255,.12)}
  .bench-btn.solid{background:#22a87e;border-color:#22a87e}
  .bench-btn.solid:hover{background:#3dbd94}
  .bench-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:18px;padding:22px 28px}
  .bench-panel{background:#fff;border:1px solid #dde8e3;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(10,61,43,.05)}
  .bench-panel-head{font-weight:600;font-size:14px;padding:13px 16px;border-bottom:1px solid #dde8e3;display:flex;align-items:center;gap:9px;background:#edfaf4;color:#0a3d2b}
  .bench-dot{width:8px;height:8px;border-radius:50%;background:#22a87e;flex:none}
  .bench-frame{width:100%;height:78vh;border:0;background:#fff}
  .bench-note{padding:0 28px 26px;color:#527060;font-size:12.5px;line-height:1.6;max-width:90ch}
  @media(max-width:820px){ .bench-frame{height:70vh} }
</style></head>
<body>
  <div class="bench-top">
    <h1>Cross-Form Test Bench</h1>
    <span class="bench-pill">Credify</span>
    <div class="bench-actions">
      <button class="bench-btn" onclick="reloadFrames()">Reload forms</button>
      <button class="bench-btn solid" onclick="clearShared()">Clear shared data</button>
    </div>
    <p class="bench-sub">These forms share one in-browser data bridge (localStorage). Fill a field or build up a score in one form and any cross-form condition or score threshold on another reacts live — no server involved. This works because all panels run on the same origin in this single file.</p>
  </div>
  <div class="bench-grid">${panels}</div>
  <p class="bench-note">Bridge key: <code>credify_xform_v1</code>. Each form publishes its answers and section scores on every change; siblings re-evaluate when the shared store updates. “Clear shared data” wipes the bridge and reloads every panel to its empty baseline. Cross-device sharing still needs a real backend — this bench is the same-browser proof.</p>
  <script>
    function clearShared(){ try{ localStorage.removeItem('credify_xform_v1'); }catch(e){} reloadFrames(); }
    function reloadFrames(){ Array.prototype.forEach.call(document.querySelectorAll('.bench-frame'), function(fr){ var s=fr.getAttribute('srcdoc'); fr.removeAttribute('srcdoc'); void fr.offsetWidth; fr.setAttribute('srcdoc', s); }); }
  <\/script>
</body></html>`;
  return page;
}
function downloadCrossFormBench(){
  let content;
  try{ content=exportCrossFormBench(); }catch(e){ toast('Could not build the bench'); return; }
  if(!content) return;
  const base=(FORM&&FORM.title?FORM.title:'form').replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'')||'form';
  const filename='CrossForm_TestBench_'+base+'_SUPPORT.html';
  const blob=new Blob([content],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
  toast('Downloaded: '+filename);
}

/* ============================================================
   AUTOPOPULATION TEST BENCH
   ============================================================
   A standalone HTML page for verifying autopopulation end-to-end in a real
   browser, with full visibility. Two exported forms run side by side in
   same-origin iframes sharing the real prefill store (credify_prefill_v1).
   The bench watches that store (storage events + a poll fallback), shows a
   live key→value inspector and a timestamped change log, and pushes every
   change straight into both panes via the export runtime's CredifyPrefill()
   hook — so typing in the parent visibly fills the child WITHOUT a reload.
   (In production the child prefills when it loads; the live push is a bench
   aid so propagation is observable the moment it happens.) */
function autopopBenchCandidates(){
  // Forms that carry at least one keyed (prefillable) field — the only forms
  // autopopulation can do anything with.
  const out=[];
  (FORMS||[]).forEach(f=>{
    const keys=[];
    (f.rows||[]).forEach(r=>(r.fields||[]).forEach(fl=>{ if(fl.dataKey && isPrefillable(fl)) keys.push(fl.dataKey); }));
    if(keys.length) out.push({form:f, keys:[...new Set(keys)]});
  });
  return out;
}
function buildAutopopBench(){
  const cands=autopopBenchCandidates();
  if(cands.length<2) return null; // caller toasts guidance
  const capped=cands.slice(0,8); // keep the file size sane
  // Default pair = the two forms sharing the most keys (ties -> first found).
  let bestA=0,bestB=1,bestN=-1;
  for(let i=0;i<capped.length;i++) for(let j=i+1;j<capped.length;j++){
    const shared=capped[i].keys.filter(k=>capped[j].keys.includes(k)).length;
    if(shared>bestN){ bestN=shared; bestA=i; bestB=j; }
  }
  const DOCS={}, METAS={};
  capped.forEach(c=>{
    let doc='';
    try{ doc=buildFormExportAtTop(JSON.parse(JSON.stringify(c.form))); }
    catch(e){ doc='<p style="font:14px sans-serif;padding:24px">Could not render this form.</p>'; }
    DOCS[c.form.id]=doc;
    METAS[c.form.id]={title:c.form.title||'Untitled form', keys:c.keys};
  });
  const blob=JSON.stringify({docs:DOCS, metas:METAS, order:capped.map(c=>c.form.id),
    initial:[capped[bestA].form.id, capped[bestB].form.id], pkey:SHARED_PROFILE_KEY})
    .replace(/<\/script>/gi,'<\\/script>');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Autopopulation Test Bench — Credify</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box} html,body{margin:0}
  body{font-family:'Sora',system-ui,sans-serif;background:#f4f7f5;color:#0d1f18;-webkit-font-smoothing:antialiased}
  .bench-top{background:#0a3d2b;color:#fff;padding:20px 28px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .bench-top h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:30px;margin:0}
  .bench-pill{font-size:11px;text-transform:uppercase;letter-spacing:.12em;background:rgba(255,255,255,.14);padding:5px 11px;border-radius:999px}
  .bench-actions{display:flex;gap:10px;margin-left:auto;align-items:center}
  .bench-btn{font-family:'Sora';font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,.32);background:transparent;color:#fff;padding:8px 14px;border-radius:9px;cursor:pointer}
  .bench-btn:hover{background:rgba(255,255,255,.12)}
  .bench-btn.solid{background:#22a87e;border-color:#22a87e}
  .bench-btn.solid:hover{background:#3dbd94}
  .bench-live{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:#bfe3d3;cursor:pointer;user-select:none}
  .bench-sub{flex:1 1 100%;color:#bfe3d3;font-size:13.5px;line-height:1.5;margin-top:2px;max-width:90ch}
  .bench-shared{margin:16px 28px 0;padding:11px 16px;border-radius:11px;font-size:13px;line-height:1.6;border:1px solid #dde8e3;background:#edfaf4;color:#0a3d2b}
  .bench-shared.warn{background:#fef6e7;border-color:#f0ddb8;color:#8a5a06}
  .bench-shared code{background:#fff;border:1px solid #dde8e3;border-radius:5px;padding:1px 7px;font-size:12px;margin:0 2px}
  .bench-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:18px 28px}
  @media(max-width:980px){ .bench-grid{grid-template-columns:1fr} }
  .bench-panel{background:#fff;border:1px solid #dde8e3;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(10,61,43,.05)}
  .bench-panel-head{padding:11px 14px;border-bottom:1px solid #dde8e3;display:flex;align-items:center;gap:10px;background:#edfaf4}
  .bench-role{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#fff;background:#1a8a66;border-radius:5px;padding:3px 8px;flex:none}
  .bench-panel-head select{flex:1;min-width:0;font:600 13.5px 'Sora';color:#0a3d2b;border:1px solid #cfe2d8;border-radius:8px;padding:7px 10px;background:#fff}
  .bench-keys{font-size:11px;color:#527060;white-space:nowrap}
  .bench-frame{width:100%;height:62vh;border:0;background:#fff}
  .bench-bottom{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 28px 26px}
  @media(max-width:980px){ .bench-bottom{grid-template-columns:1fr} }
  .bench-box{background:#fff;border:1px solid #dde8e3;border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
  .bench-box-head{font-weight:600;font-size:13.5px;padding:11px 16px;border-bottom:1px solid #dde8e3;background:#edfaf4;color:#0a3d2b;display:flex;align-items:center;gap:8px}
  .bench-box-body{padding:6px 0;max-height:260px;overflow:auto;font-size:12.5px}
  .pr-row{display:flex;gap:12px;padding:7px 16px;border-bottom:1px solid #f0f5f2;align-items:baseline}
  .pr-row:last-child{border-bottom:0}
  .pr-row.hot{background:#edfaf4}
  .pr-key{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:#0a3d2b;flex:0 0 42%;overflow-wrap:anywhere}
  .pr-val{color:#27433a;overflow-wrap:anywhere}
  .pr-empty,.log-empty{padding:18px 16px;color:#8aaa9a}
  .log-row{padding:6px 16px;border-bottom:1px solid #f0f5f2;line-height:1.5}
  .log-row:last-child{border-bottom:0}
  .log-t{font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:#8aaa9a;margin-right:8px}
  .log-k{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:#0a3d2b}
  .log-arrow{color:#8aaa9a;margin:0 5px}
  .log-v{color:#1a8a66;font-weight:600;overflow-wrap:anywhere}
  .log-v.cleared{color:#c0392b}
</style></head>
<body>
  <div class="bench-top">
    <h1>Autopopulation Test Bench</h1>
    <span class="bench-pill">Credify</span>
    <div class="bench-actions">
      <label class="bench-live"><input type="checkbox" id="live-cb" checked> Live push into open forms</label>
      <button class="bench-btn" onclick="reloadFrames()">Reload forms</button>
      <button class="bench-btn solid" onclick="clearShared()">Clear shared answers</button>
    </div>
    <p class="bench-sub">Both panes are real exported forms sharing the real autopopulation store in this browser. Fill a linked field in one pane, then click anywhere outside it (autopopulation commits when a field loses focus) — the value lands in the store, appears in the inspector and log below, and is pushed live into the other pane. Untick "Live push" to test production behavior instead: the value then only appears in the other form when that form (re)loads.</p>
  </div>
  <div class="bench-shared" id="shared-ribbon"></div>
  <div class="bench-grid">
    <section class="bench-panel">
      <div class="bench-panel-head"><span class="bench-role">Pane A</span><select id="pick-a" onchange="setPane('a',this.value)"></select><span class="bench-keys" id="keys-a"></span></div>
      <iframe class="bench-frame" id="frame-a"></iframe>
    </section>
    <section class="bench-panel">
      <div class="bench-panel-head"><span class="bench-role">Pane B</span><select id="pick-b" onchange="setPane('b',this.value)"></select><span class="bench-keys" id="keys-b"></span></div>
      <iframe class="bench-frame" id="frame-b"></iframe>
    </section>
  </div>
  <div class="bench-bottom">
    <div class="bench-box">
      <div class="bench-box-head">Shared answer store <span style="font-weight:400;color:#527060">(live)</span></div>
      <div class="bench-box-body" id="profile-table"><div class="pr-empty">Nothing stored yet — fill a linked field in either pane.</div></div>
    </div>
    <div class="bench-box">
      <div class="bench-box-head">Change log</div>
      <div class="bench-box-body" id="change-log"><div class="log-empty">Waiting for the first autopopulation write…</div></div>
    </div>
  </div>
  <script id="bench-data" type="application/json">${blob}<\/script>
  <script>
  (function(){
    var DATA=JSON.parse(document.getElementById('bench-data').textContent);
    var PKEY=DATA.pkey, PANES={a:DATA.initial[0], b:DATA.initial[1]};
    var last=read(), hot={};
    function read(){ try{ return localStorage.getItem(PKEY)||'{}'; }catch(e){ return '{}'; } }
    function parse(s){ try{ return JSON.parse(s)||{}; }catch(e){ return {}; } }
    function el(id){ return document.getElementById(id); }
    function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    function fmtVal(v){ if(Array.isArray(v)) return v.join(', '); if(v===true) return 'checked'; if(v===false) return 'unchecked'; return String(v); }
    function fillPickers(){
      ['a','b'].forEach(function(p){
        var sel=el('pick-'+p); sel.innerHTML='';
        DATA.order.forEach(function(id){
          var o=document.createElement('option'); o.value=id; o.textContent=DATA.metas[id].title; if(PANES[p]===id) o.selected=true; sel.appendChild(o);
        });
      });
    }
    function setPane(p,id){ PANES[p]=id; el('frame-'+p).srcdoc=DATA.docs[id];
      el('keys-'+p).textContent=DATA.metas[id].keys.length+' linked field key'+(DATA.metas[id].keys.length===1?'':'s');
      ribbon(); }
    window.setPane=setPane;
    function ribbon(){
      var ka=DATA.metas[PANES.a].keys, kb=DATA.metas[PANES.b].keys;
      var shared=ka.filter(function(k){ return kb.indexOf(k)>=0; });
      var r=el('shared-ribbon');
      if(shared.length){ r.className='bench-shared'; r.innerHTML='These two forms share <strong>'+shared.length+'</strong> autopopulation key'+(shared.length===1?'':'s')+': '+shared.map(function(k){ return '<code>'+escH(k)+'</code>'; }).join(' ')+' — fill any of these in one pane and watch it land in the other.'; }
      else { r.className='bench-shared warn'; r.innerHTML='\u26A0 These two forms don\u2019t share any autopopulation keys, so nothing will carry over between them. Pick a different pair, or link fields between them in the builder first.'; }
    }
    function renderProfile(){
      var p=parse(read()), keys=Object.keys(p).sort(), t=el('profile-table');
      if(!keys.length){ t.innerHTML='<div class="pr-empty">Nothing stored yet \u2014 fill a linked field in either pane.</div>'; return; }
      t.innerHTML=keys.map(function(k){ return '<div class="pr-row'+(hot[k]?' hot':'')+'"><span class="pr-key">'+escH(k)+'</span><span class="pr-val">'+escH(fmtVal(p[k]))+'</span></div>'; }).join('');
    }
    var logEmpty=true;
    function log(k,v,cleared){
      var box=el('change-log'); if(logEmpty){ box.innerHTML=''; logEmpty=false; }
      var d=new Date(), t=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+':'+('0'+d.getSeconds()).slice(-2);
      var row=document.createElement('div'); row.className='log-row';
      row.innerHTML='<span class="log-t">'+t+'</span><span class="log-k">'+escH(k)+'</span><span class="log-arrow">\u2192</span><span class="log-v'+(cleared?' cleared':'')+'">'+(cleared?'(cleared)':escH(fmtVal(v)))+'</span>';
      box.insertBefore(row, box.firstChild);
      while(box.children.length>60) box.removeChild(box.lastChild);
    }
    function pushLive(diff){
      if(!el('live-cb').checked) return;
      ['a','b'].forEach(function(p){
        var fr=el('frame-'+p);
        try{ if(fr.contentWindow && typeof fr.contentWindow.CredifyPrefill==='function') fr.contentWindow.CredifyPrefill(diff); }catch(e){}
      });
    }
    function check(){
      var cur=read(); if(cur===last) return;
      var oldP=parse(last), newP=parse(cur); last=cur; hot={};
      var diff={}, touched=false;
      Object.keys(newP).forEach(function(k){ if(JSON.stringify(newP[k])!==JSON.stringify(oldP[k])){ diff[k]=newP[k]; hot[k]=1; touched=true; log(k,newP[k],false); } });
      Object.keys(oldP).forEach(function(k){ if(!(k in newP)){ hot[k]=1; touched=true; log(k,null,true); } });
      renderProfile();
      if(touched && Object.keys(diff).length) pushLive(diff);
    }
    window.addEventListener('storage', function(e){ if(!e || !e.key || e.key===PKEY) check(); });
    setInterval(check, 600); // belt-and-braces: storage events can be flaky on file://
    window.clearShared=function(){ try{ localStorage.removeItem(PKEY); }catch(e){} last=read(); hot={}; renderProfile(); log('\u2014 all keys \u2014',null,true); reloadFrames(); };
    window.reloadFrames=function(){ setPane('a',PANES.a); setPane('b',PANES.b); };
    fillPickers(); setPane('a',PANES.a); setPane('b',PANES.b); renderProfile();
  })();
  <\/script>
</body></html>`;
}
function downloadAutopopBench(){
  let content=null;
  try{ content=buildAutopopBench(); }catch(e){ toast('Could not build the test bench'); return; }
  if(!content){ toast('Need at least 2 forms with linked (keyed) fields \u2014 set up an autopopulation link first'); return; }
  const filename='Autopop_TestBench_SUPPORT.html';
  const blob=new Blob([content],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
  toast('Downloaded: '+filename);
}

function downloadExport(){
  const content=EXPORT_MODE==='json'?document.getElementById('export-json').textContent:document.getElementById('export-html').value;
  const ext=EXPORT_MODE==='json'?'json':'html';
  const filename=exportFilename(ext);
  const type=EXPORT_MODE==='json'?'application/json':'text/html';
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=filename;
  a.click();
  URL.revokeObjectURL(url);
  toast('Downloaded: '+filename);
}

/* Build an export filename of the form FORM_BUILDER_{Name}.{ext}. The form
   title is sanitized to a filesystem-safe token: spaces/punctuation collapse
   to single underscores, leading/trailing underscores trimmed. Falls back to
   "Untitled" when the form has no title. */
function exportFilename(ext){
  const raw=(FORM&&FORM.title?FORM.title:'Untitled');
  let name=raw.trim()
    .replace(/[^\w\s-]/g,'')   // drop punctuation other than word chars/space/hyphen
    .replace(/[\s-]+/g,'_')    // collapse whitespace & hyphens to single underscore
    .replace(/^_+|_+$/g,'');   // trim leading/trailing underscores
  if(!name) name='Untitled';
  return `FORM_BUILDER_${name}_SUPPORT.${ext}`;
}

/* ---- Unified export entry point ----
   One "Export" button (default PDF) with a caret dropdown for PDF / JSON / HTML. */
function exportAs(kind){
  closeTopMenus();
  if(kind==='json'){ setExportMode('json'); openExport(); return; }
  if(kind==='html'){ setExportMode('html'); openExport(); return; }
  exportPDF();
}
/* PDF export: render the standalone form into a new window and open the print
   dialog so the user can "Save as PDF". The exported form's print stylesheet
   expands every page and hides the wizard nav, so the whole form prints. */
function exportPDF(){
  const html=buildHTMLForm();
  const win=window.open('', '_blank');
  if(!win){ toast('Allow pop-ups to export as PDF'); return; }
  win.document.open();
  win.document.write(html);
  win.document.close();
  const fire=()=>{ try{ win.focus(); win.print(); }catch(e){} };
  // Give fonts/layout a beat to settle before printing.
  if(win.document.readyState==='complete') setTimeout(fire,400);
  else win.addEventListener('load',()=>setTimeout(fire,400));
  toast('Opening print dialog — choose “Save as PDF”.');
}
function toggleExportMenu(e){
  if(e) e.stopPropagation();
  const m=document.getElementById('export-menu');
  const open=m.classList.contains('open');
  closeTopMenus();
  if(!open) m.classList.add('open');
}
function toggleToolbarOverflow(e){
  if(e) e.stopPropagation();
  const m=document.getElementById('tb-more-menu');
  const open=m.classList.contains('open');
  closeTopMenus();
  if(!open) m.classList.add('open');
}
function closeTopMenus(){
  document.getElementById('export-menu')?.classList.remove('open');
  document.getElementById('tb-more-menu')?.classList.remove('open');
}

/* ---- Responsive toolbar ----
   Shortcuts live in #tb-tools and stay on one line. When the toolbar would
   overflow, trailing buttons are moved into the ⋮ overflow menu (last-first)
   until everything fits; the ⋮ button appears only when something was moved. */
let _reflowPending=false;
function reflowToolbar(){
  const topbar=document.querySelector('.topbar');
  const tools=document.getElementById('tb-tools');
  const more=document.getElementById('tb-more');
  const menu=document.getElementById('tb-more-menu');
  if(!topbar||!tools||!more||!menu) return;
  // Return any parked buttons to the toolbar first, in original order.
  while(menu.firstChild) tools.appendChild(menu.firstChild);
  more.hidden=true;
  // No layout info (e.g. tests / hidden) → leave everything inline.
  if(!topbar.clientWidth) return;
  const overflowing=()=>topbar.scrollWidth>topbar.clientWidth+1;
  let guard=0;
  while(overflowing() && guard<50){
    // Move the last *visible* tool button into the menu (prepend to keep order).
    const visible=Array.from(tools.children).filter(b=>b.offsetParent!==null);
    const victim=visible[visible.length-1];
    if(!victim) break;
    more.hidden=false; // reveal so width is accounted for as we measure
    menu.insertBefore(victim, menu.firstChild);
    guard++;
  }
  if(!menu.children.length) more.hidden=true;
}
function scheduleReflow(){
  if(_reflowPending) return;
  _reflowPending=true;
  requestAnimationFrame(()=>{ _reflowPending=false; reflowToolbar(); });
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ---- Custom dropdown controller (desktop only) ----
   For each <select> with class "enhance-dd", build a styled twin widget. The
   native select stays in the DOM (hidden on desktop via .has-cdd, fully visible
   on touch) and remains the source of truth — we write back to it and dispatch
   'change' so all existing onchange handlers keep working untouched. */
const CDD_CHEV='<svg class="cdd-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
let cddOutsideBound=false;
/* When a dropdown opens, focusing its internal search box can make the browser
   auto-scroll an overflow:auto ancestor (e.g. the inspector panel). That scroll
   would otherwise hit the global scroll-to-close handler and slam the menu shut
   ~instantly ("opens for half a second then disappears"). We record the open
   time and let the scroll handler ignore closes within a brief grace window. */
let cddJustOpenedAt=0;
/* Rebuild a single select's custom twin. Needed when a select's OPTIONS are
   repopulated after it was already enhanced (e.g. the share-user picker), or
   when its value is set programmatically on modal reopen — the twin's label
   and menu are otherwise built once and won't reflect later changes. */
function reEnhanceDropdown(sel){
  if(!sel) return;
  sel.classList.remove('has-cdd');
  const twin = sel.parentNode && sel.parentNode.querySelector('.cdd');
  if(twin) twin.remove();
  enhanceDropdowns(sel.parentNode || document);
}

function enhanceDropdowns(scope){
  // Only build widgets on fine-pointer (desktop) devices; touch keeps native.
  if(!window.matchMedia || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  (scope||document).querySelectorAll('select.enhance-dd:not(.has-cdd)').forEach(sel=>{
    sel.classList.add('has-cdd');
    const variant=sel.classList.contains('field-select')||sel.closest('.inspector-field')?'cdd-inspector':'';
    const wrap=document.createElement('div');
    wrap.className='cdd '+variant;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='cdd-btn';
    if(sel.disabled) btn.disabled=true; // mirror a disabled native select
    const valSpan=document.createElement('span');
    valSpan.className='cdd-val';
    btn.appendChild(valSpan);
    btn.insertAdjacentHTML('beforeend',CDD_CHEV);
    const menu=document.createElement('div');
    menu.className='cdd-menu';
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    sel.parentNode.insertBefore(wrap,sel.nextSibling);

    function refreshLabel(){
      const opt=sel.options[sel.selectedIndex];
      const isPlaceholder=!opt || (opt.disabled) || opt.value==='';
      valSpan.textContent=opt?opt.textContent:'';
      valSpan.classList.toggle('placeholder',!!isPlaceholder);
    }
    function buildMenu(){
      menu.innerHTML='';
      const many=sel.options.length>8; let optsBox=menu, searchIn=null;
      if(many){
        const sw=document.createElement('div'); sw.className='cdd-search-wrap';
        searchIn=document.createElement('input'); searchIn.type='text'; searchIn.className='cdd-search'; searchIn.placeholder='Type to search\u2026'; searchIn.autocomplete='off';
        searchIn.addEventListener('click',e=>e.stopPropagation());
        searchIn.addEventListener('keydown',e=>{ e.stopPropagation(); if(e.key==='Escape'){ close(); btn.focus(); } });
        sw.appendChild(searchIn); menu.appendChild(sw);
        optsBox=document.createElement('div'); optsBox.className='cdd-opts'; menu.appendChild(optsBox);
      }
      Array.from(sel.options).forEach((opt,i)=>{
        if(opt.disabled && opt.value==='') return; // skip the "Choose…" placeholder row
        const o=document.createElement('div');
        o.className='cdd-opt'+(i===sel.selectedIndex?' selected':'');
        o.textContent=opt.textContent;
        o.addEventListener('click',e=>{
          e.stopPropagation();
          sel.selectedIndex=i;
          sel.dispatchEvent(new Event('change',{bubbles:true}));
          refreshLabel();
          close();
        });
        optsBox.appendChild(o);
      });
      if(searchIn){
        searchIn.addEventListener('input',function(){
          const q=this.value.toLowerCase().trim(), opts=optsBox.querySelectorAll('.cdd-opt');
          opts.forEach(o=>{ o.style.display=(!q||o.textContent.toLowerCase().indexOf(q)>=0)?'':'none'; });
        });
        setTimeout(()=>{ try{ searchIn.focus(); }catch(e){} },20);
      }
    }
    // Anchor the open menu to the viewport (position:fixed) so it can never be
    // clipped by a scrollable ancestor (the preview pane, inspector, modals all
    // use overflow:auto). We flip the menu above the button when there's more
    // room up top, and clamp its height to the available space — so options are
    // always fully visible and reachable, even near the screen edge.
    function positionMenu(){
      const r=btn.getBoundingClientRect();
      const gap=5, pad=8, cap=280, widthCap=360;
      const vh=window.innerHeight, vw=window.innerWidth;
      const below=vh-r.bottom-pad, above=r.top-pad;
      const natural=menu.scrollHeight; // full content height, ignoring max-height
      const up = below < Math.min(cap,natural) && above > below;
      const space = up ? above : below;
      menu.style.position='fixed';
      menu.style.left=r.left+'px';
      menu.style.width=r.width+'px';
      menu.style.right='auto';
      menu.style.maxHeight=Math.max(96, Math.min(cap, space))+'px';
      // Width: at least the button's width, but allowed to grow to fit the
      // widest option so narrow triggers (e.g. a role column in a table) don't
      // clip labels to a single letter. Measure content with the width
      // constraint lifted, then clamp to a cap and to the viewport.
      menu.style.width='auto';
      menu.style.maxWidth=widthCap+'px';
      const contentW=menu.scrollWidth;
      let w=Math.min(widthCap, Math.max(r.width, contentW));
      // Keep the menu on-screen: if it would overflow the right edge, shift left.
      let left=r.left;
      if(left+w > vw-pad) left=Math.max(pad, vw-pad-w);
      if(w > vw-2*pad){ w=vw-2*pad; left=pad; }
      menu.style.width=w+'px';
      menu.style.left=left+'px';
      if(up){ menu.style.top='auto'; menu.style.bottom=(vh-r.top+gap)+'px'; }
      else  { menu.style.bottom='auto'; menu.style.top=(r.bottom+gap)+'px'; }
    }
    function open(){ buildMenu(); wrap.classList.add('open'); positionMenu(); cddJustOpenedAt=Date.now(); }
    function close(){ wrap.classList.remove('open'); menu.style.cssText=''; }
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      if(sel.disabled) return; // disabled select → inert custom button
      // close any other open dropdowns (and clear their inline positioning)
      document.querySelectorAll('.cdd.open').forEach(o=>{ if(o!==wrap){ o.classList.remove('open'); const mm=o.querySelector('.cdd-menu'); if(mm) mm.style.cssText=''; } });
      wrap.classList.contains('open')?close():open();
    });
    // keyboard: open on Enter/Space/Down, close on Esc
    btn.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'){ e.preventDefault(); open(); }
      else if(e.key==='Escape'){ close(); }
    });
    refreshLabel();
    // keep label in sync if the select is changed elsewhere
    sel.addEventListener('change',refreshLabel);
  });
  if(!cddOutsideBound){
    const closeAllCdds=()=>{ document.querySelectorAll('.cdd.open').forEach(o=>{ o.classList.remove('open'); const mm=o.querySelector('.cdd-menu'); if(mm) mm.style.cssText=''; }); };
    document.addEventListener('click',closeAllCdds);
    // A fixed-position menu detaches from its button when the page scrolls, so
    // we close the dropdown on scroll. This also means an open dropdown never
    // traps the mouse wheel — scrolling the preview just works, even while a
    // field is "active". Scrolls inside the menu's own option list are ignored.
    document.addEventListener('scroll',e=>{
      if(e.target&&e.target.closest&&e.target.closest('.cdd-menu')) return;
      // Ignore the auto-scroll the browser fires when we focus the menu's search
      // box right after opening — that scroll isn't a user navigating away.
      if(Date.now()-cddJustOpenedAt < 350) return;
      closeAllCdds();
    }, true);
    window.addEventListener('resize',closeAllCdds);
    cddOutsideBound=true;
  }
}

/* Grey out a preview <select> while it's showing its "Choose…" placeholder, so
   a native (non-enhanced, e.g. touch) dropdown matches the muted color used for
   text-input placeholders. The custom .cdd widget already handles this itself. */
function markPlaceholderSelects(scope){
  (scope||document).querySelectorAll('.pf-field select').forEach(sel=>{
    const opt=sel.options[sel.selectedIndex];
    const isPlaceholder=!opt || opt.disabled || opt.value==='';
    sel.classList.toggle('is-placeholder', !!isPlaceholder);
  });
}
function onPreviewSelectPlaceholder(e){
  const sel=e.target;
  if(sel && sel.tagName==='SELECT'){
    const opt=sel.options[sel.selectedIndex];
    sel.classList.toggle('is-placeholder', !opt || opt.disabled || opt.value==='');
  }
}

let toastT;
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>el.classList.remove('show'),2200);
}

document.getElementById('canvas-wrap').addEventListener('click',e=>{ if(e.target.closest('.field'))return; if(SELECTED){SELECTED=null;render();} });

// Canvas-wide drop fallback: if a field is dropped anywhere in the build area
// that isn't a specific row, append it to the last row (creating one if needed).
const canvasWrap=document.getElementById('canvas-wrap');
canvasWrap.addEventListener('dragover',e=>{
  e.preventDefault();
  // dropEffect MUST be compatible with effectAllowed set on dragstart, or
  // the drop will be silently cancelled by the browser. Field-moves use
  // effectAllowed='move'; everything else uses 'copy'. This handler is the
  // top-of-bubbling target, so whatever it sets here is the final value.
  const isMove = draggedData && (draggedData.type==='fieldmove' || draggedData.type==='rowmove');
  e.dataTransfer.dropEffect = isMove ? 'move' : 'copy';
});
canvasWrap.addEventListener('drop',e=>{
  // If the drop already landed on a .row-fields, that handler dealt with it.
  if(e.target.closest('.row-fields')) return;
  // A row reorder dropped outside any row: decide top vs bottom by where the
  // cursor is relative to the existing rows. Dropping ABOVE the first row
  // (e.g. in the canvas padding or near the form header) means "move to top";
  // dropping below the last row means "move to end". Without this, a drop
  // above the first row wrongly fell through to "append at end".
  if(draggedData && draggedData.type==='rowmove'){
    e.preventDefault();
    if(!e.target.closest('.row')){
      const firstRow=document.querySelector('.rows > .row');
      if(firstRow){
        const fr=firstRow.getBoundingClientRect();
        if(e.clientY < fr.top + fr.height/2){
          moveRow(draggedData.sourceRowIdx, 0);          // above first row → top
        } else {
          moveRow(draggedData.sourceRowIdx, FORM.rows.length); // otherwise → end
        }
      } else {
        moveRow(draggedData.sourceRowIdx, FORM.rows.length);
      }
    }
    return;
  }
  e.preventDefault();
  let data=draggedData;
  if(!data){
    try{ data=JSON.parse(e.dataTransfer.getData('text/plain')); }catch(err){ data=null; }
  }
  if(!data) return;
  // An EXISTING field dropped in empty canvas space has no valid target — leave
  // it exactly where it was instead of dumping it at the bottom. (New fields and
  // blocks from the palette have no "original position", so they still append
  // below — that's how you add them.)
  if(data.type==='fieldmove'){
    if(typeof toast==='function') toast('Drop on a row or an insertion line to move a field');
    return;
  }
  if(FORM.rows.length===0) FORM.rows=[{id:uid('r'),fields:[]}];
  // Find the last row that's currently *visible* — in all-pages mode that's
  // simply the last row overall; in single-page mode that's the last row on
  // BUILDER_PAGE. Falling through to a non-visible row would make the drop
  // appear to vanish.
  let ridx=-1;
  for(let i=FORM.rows.length-1;i>=0;i--){
    if(SHOW_ALL_PAGES || pageOf(FORM.rows[i])===BUILDER_PAGE){ ridx=i; break; }
  }
  // If nothing is visible (e.g. current page has no rows yet), seed one.
  if(ridx<0){
    FORM.rows.push({id:uid('r'),fields:[],page:targetAddPage()});
    ridx=FORM.rows.length-1;
  }
  if(data.type==='newfield'){
    const nf=defaultField(data.fieldType);
    FORM.rows[ridx].fields.push(nf);
    fitRowAroundDrop(ridx, nf.id);
    render();
  } else if(data.type==='block'){
    const b=BLOCKS[data.blockIdx];
    if(b){ b.fields.forEach(f=>{ const c=JSON.parse(JSON.stringify(f)); c.id=uid('f'); FORM.rows[ridx].fields.push(c); }); render(); }
  }
});

/* =====================================================================
   USER RIGHTS SYSTEM
   ===================================================================== */

const USERS_KEY='credify_users_v1';
const CURRENT_USER_KEY='credify_current_user_v1';

/* ----- Persistence ----- */
function loadUsers(){
  try{ const raw=localStorage.getItem(USERS_KEY); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)&&a.length) return a; } }catch(e){}
  return null;
}
function persistUsers(){ try{ localStorage.setItem(USERS_KEY, JSON.stringify(USERS)); }catch(e){} }
function persistCurrentUser(){ try{ localStorage.setItem(CURRENT_USER_KEY, CURRENT_USER_ID||''); }catch(e){} }

/* Seed an initial roster if none exists. Putting the admin first means
   first-load users land in admin mode and can immediately try everything. */
function seedDefaultUsers(){
  USERS=[
    {id:uid('u'),name:'Alex Admin',email:'alex@credify.dev',phone:'(619) 555-0101',role:'admin'},
    {id:uid('u'),name:'Erin Editor',email:'erin@credify.dev',phone:'(619) 555-0102',role:'editor'},
    {id:uid('u'),name:'Sam Editor',email:'sam@credify.dev',phone:'(619) 555-0103',role:'editor'},
    {id:uid('u'),name:'Vera Viewer',email:'vera@credify.dev',phone:'(619) 555-0104',role:'viewer'},
  ];
  persistUsers();
}

/* ----- Client directory -----
   A managed roster of clients/patients (name, email, phone, DOB, MRN). Like the
   user roster, the builder owns this list and the connected CRM resolves the
   actual SMS/Email delivery. Clients can be picked as notification recipients. */
const CLIENTS_KEY='credify_clients_v1';
let CLIENTS=[];
function loadClients(){
  try{ const raw=localStorage.getItem(CLIENTS_KEY); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)&&a.length){
    a.forEach(c=>{ if(c && !c.notify) c.notify='email'; }); // default delivery config
    return a;
  } } }catch(e){}
  return null;
}
function persistClients(){ try{ localStorage.setItem(CLIENTS_KEY, JSON.stringify(CLIENTS)); }catch(e){} }
function seedDefaultClients(){
  CLIENTS=[
    {id:uid('cl'),name:'Jordan Rivera',email:'jordan.rivera@example.com',phone:'(619) 555-0210',dob:'1990-03-14',mrn:'CL-1001',notify:'email'},
    {id:uid('cl'),name:'Maya Chen',email:'maya.chen@example.com',phone:'(619) 555-0211',dob:'1985-07-22',mrn:'CL-1002',notify:'sms'},
    {id:uid('cl'),name:'Liam O\u2019Connor',email:'liam.oconnor@example.com',phone:'(619) 555-0212',dob:'1978-11-02',mrn:'CL-1003',notify:'both'},
    {id:uid('cl'),name:'Sofia Martinez',email:'sofia.martinez@example.com',phone:'(619) 555-0213',dob:'1995-01-30',mrn:'CL-1004',notify:'email'},
    {id:uid('cl'),name:'Noah Patel',email:'noah.patel@example.com',phone:'(619) 555-0214',dob:'2001-09-18',mrn:'CL-1005',notify:'sms'},
  ];
  persistClients();
}
function openClientsModal(){
  if(isViewer()){ toast('Viewers cannot manage contacts'); return; }
  renderClientsList();
  ['client-first','client-last','client-email','client-phone','client-mobile','client-dob','client-mrn'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  enhanceDropdowns(document.getElementById('clients-modal'));
  openModal('clients-modal');
}
function addClient(){
  const g=id=>(document.getElementById(id)||{value:''}).value.trim();
  const first=g('client-first'), last=g('client-last');
  const name=(first+' '+last).trim(); if(!name){ toast('Name required'); return; }
  const email=g('client-email');
  const phone=formatPhoneLoose(g('client-phone'));
  const mobile=formatPhoneLoose(g('client-mobile'));
  const dob=g('client-dob'), mrn=g('client-mrn');
  if(email && CLIENTS.some(c=>(c.email||'').toLowerCase()===email.toLowerCase())){ toast('That email is already in use'); return; }
  const notify=g('client-notify')||'email';
  const rec={id:uid('cl'),name,firstName:first,lastName:last,email,dob,mrn,notify};
  if(phone) rec.phone=phone;
  if(mobile) rec.mobile=mobile;
  CLIENTS.push(rec);
  persistClients(); renderClientsList();
  ['client-first','client-last','client-email','client-phone','client-mobile','client-dob','client-mrn'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  const nsel=document.getElementById('client-notify'); if(nsel) nsel.value='email';
  toast('Contact added');
}
function changeContactNotify(id,val){
  const c=CLIENTS.find(x=>x.id===id); if(!c) return;
  c.notify=(val==='sms'||val==='both')?val:'email';
  persistClients(); renderClientsList();
  // "Their configuration" channel labels in an open Share window depend on this.
  const sm=document.getElementById('share-modal'); if(sm && sm.classList.contains('open')) renderShareList();
  toast('Delivery configuration updated');
}
function deleteClient(id){
  if(isViewer()) return;
  CLIENTS=CLIENTS.filter(c=>c.id!==id); persistClients(); renderClientsList();
}
function changeClientPhone(id,val){ const c=CLIENTS.find(x=>x.id===id); if(!c) return; c.phone=formatPhoneLoose(val); persistClients(); }
function renderClientsList(){
  const mount=document.getElementById('clients-list'); if(!mount) return;
  let html='';
  if(!CLIENTS.length){ html='<div class="acc-none" style="padding:8px 2px">No contacts yet — add one above.</div>'; }
  CLIENTS.forEach(c=>{
    const meta=[c.dob?('DOB '+esc(c.dob)):'', c.mrn?esc(c.mrn):''].filter(Boolean).join(' · ');
    html+=`<div class="user-row">
      <div class="user-avatar lg">${esc(initialsFor(c.name))}</div>
      <div class="user-row-info">
        <div class="user-row-name">${esc(c.name)} ${meta?`<span class="self-tag" style="background:var(--mint-pale);color:var(--green-primary)">${meta}</span>`:''}</div>
        ${contactDetailGrid(c)}
      </div>
      <div class="user-row-actions">
        <select class="enhance-dd" title="How this contact receives shared forms" onchange="changeContactNotify('${c.id}',this.value)">
          <option value="email"${(c.notify||'email')==='email'?' selected':''}>Email</option>
          <option value="sms"${c.notify==='sms'?' selected':''}>SMS</option>
          <option value="both"${c.notify==='both'?' selected':''}>Email + SMS</option>
        </select>
        <button class="del" title="Delete contact" onclick="deleteClient('${c.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>`;
  });
  mount.innerHTML=html;
  enhanceDropdowns(mount);
}

/* ----- Clinical roles / disciplines -----
   Separate from the permission role (admin/editor/viewer). These are program /
   discipline tags (SUD, Psychotherapy, …) that get assigned to users and used
   to show/hide individual fields to the right disciplines. Enforcement of who
   actually sees a field happens in the connected CRM using these tags. */
const CLINICAL_ROLES_KEY='credify_clinical_roles_v1';
let CLINICAL_ROLES=[];
function loadClinicalRoles(){
  try{ const raw=localStorage.getItem(CLINICAL_ROLES_KEY); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)) return a; } }catch(e){}
  return null;
}
function persistClinicalRoles(){ try{ localStorage.setItem(CLINICAL_ROLES_KEY, JSON.stringify(CLINICAL_ROLES)); }catch(e){} }
function seedClinicalRoles(){ CLINICAL_ROLES=['SUD','Psychotherapy','Case Management','Psychiatry','Intake']; persistClinicalRoles(); }
function addClinicalRole(name){
  const v=String(name||'').trim();
  if(!v){ toast('Discipline name required'); return; }
  if(CLINICAL_ROLES.some(r=>r.toLowerCase()===v.toLowerCase())){ toast('That discipline already exists'); return; }
  CLINICAL_ROLES.push(v); persistClinicalRoles(); renderUsersList(); toast('Discipline added');
}
function removeClinicalRole(name){
  CLINICAL_ROLES=CLINICAL_ROLES.filter(r=>r!==name);
  persistClinicalRoles();
  // Strip the deleted discipline from users and from every field's scope/notify.
  USERS.forEach(u=>{ if(Array.isArray(u.tags)) u.tags=u.tags.filter(t=>t!==name); }); persistUsers();
  const stripRole=(f)=>{ if(!f) return; (f.rows||[]).forEach(r=>(r.fields||[]).forEach(fld=>{
    if(fld.hideUsersScope&&Array.isArray(fld.hideUsersScope.roles)) fld.hideUsersScope.roles=fld.hideUsersScope.roles.filter(x=>x!==name);
    if(fld.notify&&Array.isArray(fld.notify.roles)) fld.notify.roles=fld.notify.roles.filter(x=>x!==name);
  })); };
  FORMS.forEach(stripRole); stripRole(FORM); persistForms();
  renderUsersList(); if(typeof render==='function'&&FORM&&FORM.id) render();
}
function toggleUserTag(userId, role, on){
  const u=USERS.find(x=>x.id===userId); if(!u) return;
  if(!Array.isArray(u.tags)) u.tags=[];
  if(on){ if(u.tags.indexOf(role)<0) u.tags.push(role); }
  else { u.tags=u.tags.filter(t=>t!==role); }
  persistUsers(); renderUsersList();
}

/* ----- Current-user helpers ----- */
function currentUser(){ return USERS.find(u=>u.id===CURRENT_USER_ID) || USERS[0]; }
function isAdmin(){ const u=currentUser(); return !!u && u.role==='admin'; }
function isViewer(){ const u=currentUser(); return !!u && u.role==='viewer'; }

/* Build the avatar initials from a name ("Alex Admin" -> "AA"). */
function initialsFor(name){
  if(!name) return '?';
  const parts=name.trim().split(/\s+/);
  return (parts[0][0]||'')+(parts[1]?parts[1][0]:'');
}

/* ----- Permission checks =====
   These are the only things the rest of the UI needs to know. A form's
   permissions are derived from:
     - current user role (admin bypasses everything)
     - form.ownerId (owner has full control)
     - form.shares array entries that match the current user
*/
function getAccess(form){
  // Returns 'admin' | 'owner' | 'edit' | 'view' | null
  if(!form) return null;
  if(isAdmin()) return 'admin';
  const uid=CURRENT_USER_ID;
  if(form.ownerId===uid) return 'owner';
  const share=(form.shares||[]).find(s=>s.userId===uid);
  if(share) return share.access; // 'edit' or 'view'
  // Role share: the form was shared with this user's role (06-09-26).
  const me=currentUser();
  const rshare=me && (form.roleShares||[]).find(r=>r.role===me.role);
  if(rshare) return rshare.access;
  if(hasPerm('viewAllForms')) return 'view';
  return null;
}
function canViewForm(form){ return getAccess(form)!==null; }
function canEditForm(form){ const a=getAccess(form); return a==='admin'||a==='owner'||a==='edit'; }
function canDeleteForm(form){ const a=getAccess(form); return a==='admin'||a==='owner'; }
function canShareForm(form){ const a=getAccess(form); return a==='admin'||a==='owner'; }
function canCreateForms(){ return !isViewer(); } // admins + editors can make new forms

/* True iff the currently-open form is read-only for the active user.
   Used to flip the whole app into a locked-down state. */
function currentFormReadOnly(){
  if(!FORM||!FORM.id) return false;
  // Match against the persisted form because FORM in memory may be a fresh
  // shell that hasn't been saved (e.g. brand-new form being created).
  const saved=FORMS.find(f=>f.id===FORM.id) || FORM;
  return !canEditForm(saved);
}

/* ----- Topbar user switcher ----- */
function renderUserChip(){
  const u=currentUser();
  if(!u) return;
  document.getElementById('user-chip-avatar').textContent=initialsFor(u.name);
  document.getElementById('user-chip-name').textContent=u.name;
  document.getElementById('user-chip-role').textContent=u.role;
}

function renderUserMenu(){
  const u=currentUser();
  const menu=document.getElementById('user-menu');
  let html=`<div class="user-menu-h">Switch user</div>`;
  USERS.forEach(usr=>{
    const active=usr.id===CURRENT_USER_ID;
    html+=`<div class="user-menu-item${active?' active':''}" onclick="switchUser('${usr.id}')">
      <div class="user-avatar sm">${esc(initialsFor(usr.name))}</div>
      <div class="um-info">
        <span class="um-name">${esc(usr.name)}</span>
        <span class="um-role">${esc(usr.role)}</span>
      </div>
      ${active?'<span class="um-check">✓</span>':''}
    </div>`;
  });
  // Admins get a "Manage users" entry in the same menu — keeps the entry point
  // discoverable without cluttering the topbar for non-admins.
  if(isAdmin()){
    html+=`<div class="user-menu-divider"></div>`;
    html+=`<div class="user-menu-action" onclick="closeUserMenu();openUsersModal()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      Manage users…
    </div>`;
  }
  // Client directory — available to anyone who can edit (admin/editor).
  if(!isViewer()){
    if(!isAdmin()) html+=`<div class="user-menu-divider"></div>`;
    html+=`<div class="user-menu-action" onclick="closeUserMenu();openClientsModal()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
      Contact directory…
    </div>`;
  }
  menu.innerHTML=html;
}

function toggleUserMenu(e){
  if(e) e.stopPropagation();
  const sw=document.getElementById('user-switcher');
  const opening=!sw.classList.contains('open');
  document.querySelectorAll('.user-switcher.open').forEach(s=>s.classList.remove('open'));
  if(opening){ renderUserMenu(); sw.classList.add('open'); }
}
function closeUserMenu(){ document.getElementById('user-switcher').classList.remove('open'); }

function switchUser(id){
  if(!USERS.find(u=>u.id===id)) return;
  CURRENT_USER_ID=id;
  persistCurrentUser();
  closeUserMenu();
  renderUserChip();
  // Decide what to open as this new user. Cases:
  //   1. Current form is in FORMS and they can view it → reload it (so their
  //      view preference is applied and previous user's session state cleared)
  //   2. Current form is in FORMS but they can't view it → pick a visible
  //      form, or scaffold/empty-state
  //   3. Current form isn't even in FORMS (unsaved scratch) → pick a visible
  //      form, or scaffold/empty-state
  const cur=FORMS.find(f=>f.id===FORM.id);
  if(cur && canViewForm(cur)){
    loadFormIntoEditor(cur.id, true);
  } else {
    const visible=FORMS.filter(canViewForm).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(visible.length){ loadFormIntoEditor(visible[0].id, true); }
    else if(canCreateForms()){ scaffoldEmptyForm(); }
    else { showNoAccessState(); }
  }
  applyRoleUI();
  toast('Switched to '+currentUser().name);
}

/* Replaces newForm() when we want to set up a blank form WITHOUT saving it
   (so viewers don't pollute the collection). The form is only persisted once
   the user actually types something — saveForm() handles the upsert. */
function scaffoldEmptyForm(){
  FORM={id:uid('form'),title:'',desc:'',rows:[{id:uid('r'),fields:[]}],weightGroups:[],scoringGroups:[],scoringSections:[],ownerId:CURRENT_USER_ID,shares:[],showAllPages:false,updatedAt:Date.now()};
  SHOW_ALL_PAGES=false;
  SELECTED=null;
  document.getElementById('form-title').value='';
  document.getElementById('form-desc').value='';
  updateAllPagesButton();
  setMode('build');
  render();
}

/* When a viewer has no forms shared to them, show a friendly empty state
   rather than a broken-looking editor. */
function showNoAccessState(){
  FORM={id:null,title:'',desc:'',rows:[],weightGroups:[],scoringGroups:[],scoringSections:[]};
  document.getElementById('form-title').value='';
  document.getElementById('form-desc').value='';
  document.getElementById('rows-mount').innerHTML=
    `<div style="text-align:center;color:var(--text-muted-2);padding:60px 20px">
       <div style="font-size:15px;font-weight:600;color:var(--text-muted);margin-bottom:6px">No forms available</div>
       <div style="font-size:13px">No one has shared a form with you yet. Ask an editor or admin to share one.</div>
     </div>`;
  applyRoleUI();
}

/* ----- Apply role/access UI state =====
   Single source of truth for what's hidden/disabled based on the current
   user's role and the currently-open form's access level. Called whenever
   roles, users, or forms change. */
function applyRoleUI(){
  const newBtn=document.getElementById('new-btn');
  const clearBtn=document.getElementById('clear-btn');
  // Viewers can't make new forms — hide both creation entry points.
  const canMake=canCreateForms();
  if(newBtn) newBtn.style.display=canMake?'':'none';
  if(clearBtn) clearBtn.style.display=canMake?'':'none';
  // Export entry point follows the exportForms permission.
  const expDD=document.getElementById('export-dd');
  if(expDD) expDD.style.display=hasPerm('exportForms')?'':'none';

  // Toggle the read-only banner + locked-down body class. The class hides the
  // left panel, inspector, row rails, and add-row zone via CSS so the form is
  // visible but uneditable.
  const app=document.querySelector('.app');
  const ro=currentFormReadOnly();
  app.classList.toggle('readonly', ro);
  const bannerMount=document.getElementById('readonly-banner-mount');
  if(ro && FORM.id){
    const saved=FORMS.find(f=>f.id===FORM.id)||FORM;
    const ownerName=USERS.find(u=>u.id===saved.ownerId)?.name||'someone';
    bannerMount.innerHTML=
      `<div class="readonly-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Read-only — <span class="ro-name">${esc(saved.title||'Untitled form')}</span> was shared with you by ${esc(ownerName)}</span>
      </div>`;
  } else {
    bannerMount.innerHTML='';
  }
}

/* ----- Users modal (admin only) ----- */
function openUsersModal(){
  if(!isAdmin()){ toast('Admins only'); return; }
  renderUsersList();
  ['invite-first','invite-last','invite-email','invite-phone','invite-mobile'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  const r=document.getElementById('invite-role'); if(r){ r.value='editor'; reEnhanceDropdown(r); }
  openModal('users-modal');
}

function renderUsersList(){
  const mount=document.getElementById('users-list');
  // Entry point to the Roles & Permissions manager.
  let html=`<div class="users-toolbar">
    <button class="btn" onclick="openRolesModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Roles &amp; permissions</button>
  </div>`;
  // Disciplines / clinical-role manager — define the disciplines (SUD,
  // Psychotherapy, …) that can be assigned to users and used to scope fields.
  html+=`<div class="disc-mgr">
    <div class="disc-mgr-h">Disciplines</div>
    <div class="disc-chips">
      ${CLINICAL_ROLES.length?CLINICAL_ROLES.map((r,i)=>`<span class="disc-chip">${esc(r)}<button class="disc-x" title="Remove discipline" onclick="removeClinicalRole(${JSON.stringify(r).replace(/"/g,'&quot;')})">✕</button></span>`).join(''):'<span class="acc-none">No disciplines yet.</span>'}
    </div>
    <div class="disc-add">
      <input type="text" id="new-discipline" placeholder="Add a discipline (e.g. SUD, Psychotherapy)" onkeydown="if(event.key==='Enter'){addClinicalRole(this.value);this.value='';}">
      <button class="btn" onclick="var el=document.getElementById('new-discipline');addClinicalRole(el.value);el.value='';">+ Add</button>
    </div>
  </div>`;
  USERS.forEach(u=>{
    const isSelf=u.id===CURRENT_USER_ID;
    const tags=Array.isArray(u.tags)?u.tags:[];
    const n=(u.notify&&typeof u.notify==='object')?u.notify:{};
    const tagChips = CLINICAL_ROLES.length
      ? `<div class="user-tags">${CLINICAL_ROLES.map(r=>{const on=tags.indexOf(r)>=0;return `<button class="utag${on?' on':''}" onclick="toggleUserTag('${u.id}',${JSON.stringify(r).replace(/"/g,'&quot;')},${on?'false':'true'})">${esc(r)}</button>`;}).join('')}</div>`
      : '';
    // Build role <select> separately so it doesn't break on quotes in names.
    // Disabling the role editor for the current user prevents you from
    // accidentally demoting yourself out of the admin role you're using.
    html+=`<div class="user-row">
      <div class="user-avatar lg">${esc(initialsFor(u.name))}</div>
      <div class="user-row-info">
        <div class="user-row-name">
          ${esc(u.name)}
          <span class="role-badge ${u.role}">${u.role}</span>
          ${isSelf?'<span class="self-tag">YOU</span>':''}
        </div>
        ${userDetailGrid(u)}
        <div class="user-notify">
          <span class="un-l">Notification methods</span>
          <label class="un-cb"><input type="checkbox" ${n.sms?'checked':''} onchange="toggleUserNotify('${u.id}','sms',this.checked)"> SMS</label>
          <label class="un-cb"><input type="checkbox" ${n.email?'checked':''} onchange="toggleUserNotify('${u.id}','email',this.checked)"> Email</label>
          <label class="un-cb"><input type="checkbox" ${n.ai?'checked':''} onchange="toggleUserNotify('${u.id}','ai',this.checked)"> AI</label>
        </div>
        ${tagChips}
      </div>
      <div class="user-row-actions">
        <select class="enhance-dd" onchange="changeUserRole('${u.id}',this.value)" ${isSelf?'disabled title="Cannot change your own role"':''}>
          <option value="viewer"${u.role==='viewer'?' selected':''}>Viewer</option>
          <option value="editor"${u.role==='editor'?' selected':''}>Editor</option>
          <option value="admin"${u.role==='admin'?' selected':''}>Admin</option>
        </select>
        <button class="del" title="Delete user" onclick="deleteUser('${u.id}')" ${isSelf?'disabled':''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>`;
  });
  mount.innerHTML=html;
  enhanceDropdowns(mount);
}

function inviteUser(){
  const g=id=>(document.getElementById(id)||{value:''}).value.trim();
  const first=g('invite-first'), last=g('invite-last');
  const name=(first+' '+last).trim();
  const email=g('invite-email');
  const phone=formatPhoneLoose(g('invite-phone'));
  const mobile=formatPhoneLoose(g('invite-mobile'));
  const role=document.getElementById('invite-role').value;
  if(!name){ toast('Name required'); return; }
  if(!email){ toast('Email required'); return; }
  // Prevent adding the same email twice — it's the closest thing we have to a
  // primary identifier across an invite/edit lifecycle.
  if(USERS.some(u=>u.email.toLowerCase()===email.toLowerCase())){ toast('That email is already in use'); return; }
  const rec={id:uid('u'),name,firstName:first,lastName:last,email,role,active:true};
  if(phone) rec.phone=phone;
  if(mobile) rec.mobile=mobile;
  USERS.push(rec);
  persistUsers();
  renderUsersList();
  renderUserMenu(); // keep switcher menu fresh if it's open later
  ['invite-first','invite-last','invite-email','invite-phone','invite-mobile'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  document.getElementById('invite-role').value='editor';
  toast('User invited');
}

/* Loose phone formatter for the roster — formats 10 US digits as
   "(555) 123-4567", otherwise keeps whatever digits were entered. Contact
   resolution for SMS happens in the backend; this is just a tidy display. */
function formatPhoneLoose(v){
  let d=String(v||'').replace(/\D/g,'');
  if(d.length===11 && d[0]==='1') d=d.slice(1);   // drop US/CA country code
  if(d.length>10) return '+'+d;                    // keep true international as +digits
  if(d.length===0) return '';
  if(d.length<4) return d;
  if(d.length<7) return '('+d.slice(0,3)+') '+d.slice(3);
  return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);
}
function changeUserPhone(userId,raw){
  const u=USERS.find(x=>x.id===userId);
  if(!u) return;
  const p=formatPhoneLoose(raw);
  if(p) u.phone=p; else delete u.phone;
  persistUsers();
  renderUsersList();
}
// Per-user notification channel preferences (how this person is reached when
// they're a notify recipient): SMS, Email, AI. Stored on u.notify.
function toggleUserNotify(userId, channel, on){
  const u=USERS.find(x=>x.id===userId); if(!u) return;
  if(!u.notify||typeof u.notify!=='object') u.notify={};
  u.notify[channel]=!!on;
  persistUsers();
  renderUsersList();
}
// Free-form contact details (office phone, title). Phone fields get loose
// formatting; everything else is stored trimmed (blank clears the field).
function changeUserContact(userId, prop, raw){
  const u=USERS.find(x=>x.id===userId); if(!u) return;
  let v=String(raw||'').trim();
  if(prop==='officePhone') v=formatPhoneLoose(raw)||'';
  if(v) u[prop]=v; else delete u[prop];
  persistUsers();
  renderUsersList();
}

/* ---- Extended profile fields (shared by Users + Contacts) ----
   Time zones use real IANA names; languages are common clinic options. */
const PROFILE_TIME_ZONES=['America/Los_Angeles','America/Denver','America/Phoenix','America/Chicago','America/New_York','America/Anchorage','Pacific/Honolulu','America/Puerto_Rico','UTC','Europe/London','Europe/Paris','Asia/Manila','Asia/Kolkata','Australia/Sydney'];
const PROFILE_LANGUAGES=['English','Spanish','Vietnamese','Tagalog','Mandarin','Cantonese','Korean','Russian','Ukrainian','Arabic','French','Portuguese','Hindi'];
function tzOptions(sel){ return '<option value="">—</option>'+PROFILE_TIME_ZONES.map(t=>`<option value="${esc(t)}"${t===sel?' selected':''}>${esc(t)}</option>`).join(''); }
function langOptions(sel){ return '<option value="">—</option>'+PROFILE_LANGUAGES.map(t=>`<option value="${esc(t)}"${t===sel?' selected':''}>${esc(t)}</option>`).join(''); }
// Apply one profile field to an entity. Phones are loosely formatted; first/last
// keep the display `name` in sync; blank clears the field (except booleans).
function applyProfileField(obj, prop, raw, isCheckbox){
  if(isCheckbox){ obj[prop]=!!raw; return; }
  let v=String(raw==null?'':raw).trim();
  if(prop==='phone'||prop==='mobile'||prop==='officePhone') v=formatPhoneLoose(raw)||'';
  if(v) obj[prop]=v; else delete obj[prop];
  if(prop==='firstName'||prop==='lastName'){
    const full=(((obj.firstName||'')+' '+(obj.lastName||'')).trim());
    if(full) obj.name=full;
  }
}
function setUserField(userId, prop, raw, isCheckbox){
  const u=USERS.find(x=>x.id===userId); if(!u) return;
  applyProfileField(u, prop, raw, isCheckbox);
  persistUsers(); renderUsersList(); if(typeof renderUserMenu==='function') renderUserMenu();
}
function setContactField(id, prop, raw, isCheckbox){
  const c=CLIENTS.find(x=>x.id===id); if(!c) return;
  applyProfileField(c, prop, raw, isCheckbox);
  persistClients(); renderClientsList();
}
// Reusable labeled inputs for the detail grids.
function pfText(setter, id, prop, val, ph, type){ return `<label class="ucf"><span class="ucf-l">${ph.label}</span><input type="${type||'text'}" value="${esc(val||'')}" placeholder="${esc(ph.ph||'')}" onchange="${setter}('${id}','${prop}',this.value)"></label>`; }
function pfSelect(setter, id, prop, optsHtml, label){ return `<label class="ucf"><span class="ucf-l">${label}</span><select class="enhance-dd" onchange="${setter}('${id}','${prop}',this.value)">${optsHtml}</select></label>`; }
// Full detail grid for a USER profile.
function userDetailGrid(u){
  const T=(prop,label,ph,type)=>pfText('setUserField',u.id,prop,u[prop],{label,ph},type);
  return `<div class="user-contact">
    ${T('firstName','First name','First','text')}
    ${T('lastName','Last name','Last','text')}
    ${T('preferredName','Preferred name (optional)','Goes by…','text')}
    ${T('email','Email','name@org.com','email')}
    ${T('phone','Phone number','(619) 555-0100','tel')}
    ${T('mobile','Mobile number','(619) 555-0142','tel')}
    ${T('title','Title (optional)','e.g. Clinical Supervisor','text')}
    ${T('company','Company name (optional)','Organization','text')}
    ${T('division','Division','e.g. Outpatient','text')}
    ${T('employeeNumber','Employee number','EMP-0001','text')}
    ${T('costCenter','Cost center','CC-100','text')}
    ${pfSelect('setUserField',u.id,'timeZone',tzOptions(u.timeZone||''),'Time zone')}
    ${pfSelect('setUserField',u.id,'language',langOptions(u.language||''),'Language')}
    <label class="ucf ucf-toggle"><span class="ucf-l">Active</span><span class="un-cb"><input type="checkbox" ${(u.active!==false)?'checked':''} onchange="setUserField('${u.id}','active',this.checked,true)"> Can log in</span></label>
  </div>`;
}
// Full detail grid for a CONTACT profile (external — no login/role/HR fields).
function contactDetailGrid(c){
  const T=(prop,label,ph,type)=>pfText('setContactField',c.id,prop,c[prop],{label,ph},type);
  return `<div class="user-contact">
    ${T('firstName','First name','First','text')}
    ${T('lastName','Last name','Last','text')}
    ${T('preferredName','Preferred name (optional)','Goes by…','text')}
    ${T('email','Email','name@example.com','email')}
    ${T('phone','Phone number','(619) 555-0210','tel')}
    ${T('mobile','Mobile number','(619) 555-0211','tel')}
    ${T('title','Title (optional)','e.g. Guardian','text')}
    ${T('company','Company name (optional)','Organization','text')}
    ${T('dob','Date of birth','','date')}
    ${T('mrn','MRN / ID','optional','text')}
    ${pfSelect('setContactField',c.id,'timeZone',tzOptions(c.timeZone||''),'Time zone')}
    ${pfSelect('setContactField',c.id,'language',langOptions(c.language||''),'Language')}
  </div>`;
}

function changeUserName(userId,raw){
  const u=USERS.find(x=>x.id===userId);
  if(!u) return;
  const name=String(raw||'').trim();
  if(!name){ toast('Name can\'t be empty'); renderUsersList(); return; }
  u.name=name;
  persistUsers();
  if(userId===CURRENT_USER_ID) renderUserChip();
  renderUserMenu();
  renderUsersList();
}

function changeUserEmail(userId,raw){
  const u=USERS.find(x=>x.id===userId);
  if(!u) return;
  const email=String(raw||'').trim();
  if(!email){ toast('Email can\'t be empty'); renderUsersList(); return; }
  if(USERS.some(x=>x.id!==userId && (x.email||'').toLowerCase()===email.toLowerCase())){ toast('That email is already in use'); renderUsersList(); return; }
  u.email=email;
  persistUsers();
  renderUsersList();
}

function changeUserRole(userId,newRole){
  const u=USERS.find(x=>x.id===userId);
  if(!u) return;
  // Don't let an admin demote themselves and lock the team out of admin tools.
  if(u.id===CURRENT_USER_ID && newRole!=='admin'){ toast('You can\'t demote yourself'); renderUsersList(); return; }
  u.role=newRole;
  // Never let the change strip the team of its last user-manager (this also
  // stops you from demoting yourself out of the only managing role).
  if(managersCount()<1){ u.role=prev; toast('At least one user must keep a role that can manage users'); renderUsersList(); return; }
  persistUsers();
  if(userId===CURRENT_USER_ID){ renderUserChip(); renderUserMenu(); applyRoleUI(); }
  renderUsersList();
}

function deleteUser(userId){
  const u=USERS.find(x=>x.id===userId);
  if(!u) return;
  if(u.id===CURRENT_USER_ID){ toast('You can\'t delete yourself'); return; }
  // Block deleting the last admin so the team can never be locked out.
  const admins=USERS.filter(x=>x.role==='admin');
  if(u.role==='admin' && admins.length<=1){ toast('Can\'t delete the only admin'); return; }
  if(!confirm('Delete '+u.name+'? Any forms they own will be reassigned to you.')) return;
  // Hand off ownership of their forms to the current admin, and strip them
  // from share lists AND from every field's notify/visibility config so no
  // dangling user reference is left behind. This keeps form data alive.
  const stripFromForm=(f)=>{
    if(!f) return;
    if(f.ownerId===userId) f.ownerId=CURRENT_USER_ID;
    if(f.shares) f.shares=f.shares.filter(s=>s.userId!==userId);
    (f.rows||[]).forEach(r=>(r.fields||[]).forEach(fld=>{
      if(fld.hideUsersScope && Array.isArray(fld.hideUsersScope.userIds))
        fld.hideUsersScope.userIds=fld.hideUsersScope.userIds.filter(id=>id!==userId);
      if(fld.notify && Array.isArray(fld.notify.userIds))
        fld.notify.userIds=fld.notify.userIds.filter(id=>id!==userId);
    }));
  };
  FORMS.forEach(stripFromForm);
  stripFromForm(FORM); // the in-memory editor copy is separate from FORMS
  persistForms();
  USERS=USERS.filter(x=>x.id!==userId);
  persistUsers();
  renderUsersList();
  if(typeof render==='function' && FORM && FORM.id) render();
  toast('User deleted');
}

/* ----- Roles & Permissions manager ----- */
function openRolesModal(){
  if(!hasPerm('manageUsers')){ toast('You don\'t have permission to manage roles'); return; }
  renderRolesList();
  const el=document.getElementById('new-role-name'); if(el) el.value='';
  openModal('roles-modal');
}

function renderRolesList(){
  const mount=document.getElementById('roles-list'); if(!mount) return;
  let html='';
  ROLE_DEFS.forEach(r=>{
    const assigned=USERS.filter(u=>u.role===r.v).length;
    const head = r.builtin
      ? `<span class="role-name-static">${esc(r.l)}</span><span class="role-builtin">built-in</span>`
      : `<input class="role-name-input" value="${esc(r.l)}" onchange="renameRole('${r.v}',this.value)">`;
    const delBtn = r.builtin ? '' :
      `<button class="role-del" title="Delete role" onclick="deleteRole('${r.v}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`;
    const perms=PERM_DEFS.map(p=>{
      const on=!!(r.perms&&r.perms[p.k]);
      return `<label class="perm-row"><input type="checkbox" ${on?'checked':''} onchange="toggleRolePerm('${r.v}','${p.k}',this.checked)"><span class="perm-text"><span class="perm-l">${esc(p.l)}</span><span class="perm-d">${esc(p.d)}</span></span></label>`;
    }).join('');
    html+=`<div class="role-card">
      <div class="role-card-head">${head}<span class="role-assigned">${assigned} user${assigned===1?'':'s'}</span>${delBtn}</div>
      <div class="role-perms">${perms}</div>
    </div>`;
  });
  mount.innerHTML=html;
}

function addRole(name){
  if(!hasPerm('manageUsers')){ toast('Not allowed'); return; }
  name=String(name||'').trim();
  if(!name){ toast('Role name required'); return; }
  if(ROLE_DEFS.some(r=>r.l.toLowerCase()===name.toLowerCase())){ toast('A role with that name already exists'); return; }
  // New custom roles start as a sensible "editor-lite": can make and share forms.
  ROLE_DEFS.push({v:'role_'+uid('r'), l:name, builtin:false, perms:{manageUsers:false,createForms:true,editAllForms:false,viewAllForms:false,shareForms:true,exportForms:true}});
  persistRoles();
  renderRolesList();
  toast('Role added');
}

function renameRole(v,name){
  const r=roleDef(v); if(!r) return;
  name=String(name||'').trim();
  if(!name){ toast('Role name required'); renderRolesList(); return; }
  if(ROLE_DEFS.some(x=>x!==r && x.l.toLowerCase()===name.toLowerCase())){ toast('A role with that name already exists'); renderRolesList(); return; }
  r.l=name;
  persistRoles();
  renderRolesList();
  renderUserChip(); renderUserMenu();
  if(document.getElementById('users-modal') && document.getElementById('users-modal').classList.contains('open')) renderUsersList();
}

function deleteRole(v){
  const r=roleDef(v); if(!r) return;
  if(r.builtin){ toast('Built-in roles can\'t be deleted'); return; }
  const assigned=USERS.filter(u=>u.role===v).length;
  if(assigned){ toast('Reassign the '+assigned+' user'+(assigned===1?'':'s')+' with this role first'); return; }
  if(!confirm('Delete the role “'+r.l+'”?')) return;
  ROLE_DEFS=ROLE_DEFS.filter(x=>x.v!==v);
  persistRoles();
  renderRolesList();
  toast('Role deleted');
}

function toggleRolePerm(v,k,on){
  const r=roleDef(v); if(!r||!r.perms) return;
  if(k==='manageUsers' && !on){
    r.perms.manageUsers=false;
    if(managersCount()<1){ r.perms.manageUsers=true; toast('At least one role in use must keep “Manage users & roles”'); renderRolesList(); return; }
  } else {
    r.perms[k]=!!on;
  }
  persistRoles();
  renderRolesList();
  // The active user's own capabilities may have just changed.
  renderUserChip(); renderUserMenu(); applyRoleUI();
  if(typeof render==='function' && FORM && FORM.id) render();
}

/* ----- Share modal ----- */
function openShareModal(formId){
  const f=FORMS.find(x=>x.id===formId);
  if(!f){ toast('Form not found'); return; }
  if(!canShareForm(f)){ toast('Only the owner or an admin can share this form'); return; }
  SHARE_FORM_ID=formId;
  const title=f.title&&f.title.trim()?f.title:'Untitled form';
  const ownerName=USERS.find(u=>u.id===f.ownerId)?.name||'Unknown';
  const n=countFields(f);
  document.getElementById('share-target').innerHTML=
    `<div class="share-target-title">${esc(title)}</div>
     <div class="share-target-meta">${n} field${n===1?'':'s'} · Owned by ${esc(ownerName)}</div>`;
  ensureShareShape(f);
  shareSetTab('users');
  renderShareList();
  refreshShareUserPicker();
  refreshShareRolePicker();
  refreshShareContactPicker();
  enhanceDropdowns(document.getElementById('share-modal'));
  openModal('share-modal');
}

/* ===== Share to Roles / Users / Contacts (06-09-26) =====
   Three audiences, one window:
   - USERS    (internal)  — access on this form + a notification queued to that
                            user's dashboard.
   - ROLES    (internal)  — every user holding the role gets access; one
                            dashboard notification is queued per member.
   - CONTACTS (external)  — the form is delivered to the contact via their
                            configured channel ("Their configuration" resolves
                            to the contact's notify preference), or forced
                            Email / SMS. Contacts never get builder access.
   Internal notifications and external deliveries are queued to localStorage
   (SHARE_NOTIF_KEY) — the connected dashboard/CRM drains that queue and does
   the actual rendering / SMS / email send, exactly like risk-alert delivery. */
const SHARE_NOTIF_KEY='credify_share_notifications_v1';
function queueShareNotification(rec){
  try{
    const a=JSON.parse(localStorage.getItem(SHARE_NOTIF_KEY)||'[]');
    a.push(Object.assign({id:uid('ntf'),ts:Date.now(),byUserId:CURRENT_USER_ID},rec));
    localStorage.setItem(SHARE_NOTIF_KEY, JSON.stringify(a));
  }catch(e){}
}
function ensureShareShape(f){
  if(!f) return f;
  if(!Array.isArray(f.shares)) f.shares=[];
  if(!Array.isArray(f.roleShares)) f.roleShares=[];
  if(!Array.isArray(f.contactShares)) f.contactShares=[];
  return f;
}
let SHARE_TAB='users';
function shareSetTab(t){
  SHARE_TAB=(t==='roles'||t==='contacts')?t:'users';
  const tabs=document.getElementById('share-tabs');
  if(tabs) tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.tab===SHARE_TAB));
  const rows={users:'share-add-users',roles:'share-add-roles',contacts:'share-add-contacts'};
  Object.keys(rows).forEach(k=>{ const el=document.getElementById(rows[k]); if(el) el.style.display=(k===SHARE_TAB)?'':'none'; });
  const hints={
    users:'Internal — the user gets access and a notification on their dashboard.',
    roles:'Internal — every user with this role gets access and a notification on their dashboard.',
    contacts:'External — the contact receives the form via their configuration, email, or SMS. Contacts never get builder access.'
  };
  const h=document.getElementById('share-tab-hint'); if(h) h.textContent=hints[SHARE_TAB];
}
function roleMemberCount(v){ return USERS.filter(u=>u.role===v).length; }
function contactChannel(c, via){
  // Resolve the effective delivery channel for a contact share.
  const pref=(via && via!=='config') ? via : (c && c.notify) || 'email';
  return pref==='both' ? 'email+sms' : pref;
}
function contactChannelLabel(c, via){
  const ch=contactChannel(c,via);
  const bits=[];
  if(ch.indexOf('email')>=0) bits.push('Email'+(c&&c.email?' · '+c.email:''));
  if(ch.indexOf('sms')>=0) bits.push('SMS'+(c&&c.phone?' · '+c.phone:''));
  const head=(!via||via==='config')?'Their configuration → ':'';
  return head+bits.join(' + ');
}
function refreshShareRolePicker(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const taken=new Set(f.roleShares.map(r=>r.role));
  const available=ROLE_DEFS.filter(r=>!taken.has(r.v));
  const sel=document.getElementById('share-role-pick'); if(!sel) return;
  if(!available.length){
    sel.innerHTML=`<option disabled selected>No more roles to add</option>`; sel.disabled=true;
  } else {
    sel.innerHTML=available.map(r=>`<option value="${esc(r.v)}">${esc(r.l)} — ${roleMemberCount(r.v)} user${roleMemberCount(r.v)===1?'':'s'}</option>`).join('');
    sel.disabled=false;
  }
  reEnhanceDropdown(sel);
}
function refreshShareContactPicker(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const taken=new Set(f.contactShares.map(c=>c.clientId));
  const available=CLIENTS.filter(c=>!taken.has(c.id));
  const sel=document.getElementById('share-contact-pick'); if(!sel) return;
  if(!CLIENTS.length){
    sel.innerHTML=`<option disabled selected>No contacts yet — add them in the Contact Directory</option>`; sel.disabled=true;
  } else if(!available.length){
    sel.innerHTML=`<option disabled selected>No more contacts to add</option>`; sel.disabled=true;
  } else {
    sel.innerHTML=available.map(c=>`<option value="${c.id}">${esc(c.name)}${c.mrn?' — '+esc(c.mrn):''}</option>`).join('');
    sel.disabled=false;
  }
  reEnhanceDropdown(sel);
}
function addRoleShare(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const role=document.getElementById('share-role-pick').value;
  const access=document.getElementById('share-role-access-pick').value;
  if(!role){ toast('Pick a role'); return; }
  if(f.roleShares.some(r=>r.role===role)){ toast('Already shared with that role'); return; }
  f.roleShares.push({role,access});
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.roleShares=JSON.parse(JSON.stringify(f.roleShares));
  const members=USERS.filter(u=>u.role===role);
  members.forEach(u=>queueShareNotification({kind:'role',formId:f.id,formTitle:f.title||'Untitled form',role,userId:u.id,access,channel:'dashboard'}));
  persistForms();
  renderShareList(); refreshShareRolePicker(); renderFormsList();
  if(FORM.id===f.id){ applyRoleUI(); render(); }
  toast('Shared with '+roleLabel(role)+' — '+members.length+' dashboard notification'+(members.length===1?'':'s')+' queued');
}
function changeRoleShareAccess(role,newAccess){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const r=f.roleShares.find(x=>x.role===role); if(!r) return;
  r.access=newAccess; f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.roleShares=JSON.parse(JSON.stringify(f.roleShares));
  persistForms(); renderFormsList();
  if(FORM.id===f.id){ applyRoleUI(); render(); }
  toast('Access updated');
}
function removeRoleShare(role){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  f.roleShares=f.roleShares.filter(x=>x.role!==role);
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.roleShares=JSON.parse(JSON.stringify(f.roleShares));
  persistForms();
  renderShareList(); refreshShareRolePicker(); renderFormsList();
  // If removing the role share kicked the current user off the open form, move them off.
  if(FORM.id===f.id && !canViewForm(f)){
    const visible=FORMS.filter(canViewForm).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(visible.length) loadFormIntoEditor(visible[0].id, true);
    else if(canCreateForms()) scaffoldEmptyForm();
    else showNoAccessState();
  } else if(FORM.id===f.id){ applyRoleUI(); render(); }
  toast('Role access removed');
}
function addContactShare(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const clientId=document.getElementById('share-contact-pick').value;
  const via=document.getElementById('share-contact-via').value||'config';
  if(!clientId){ toast('Pick a contact'); return; }
  if(f.contactShares.some(x=>x.clientId===clientId)){ toast('Already shared with that contact'); return; }
  const c=CLIENTS.find(x=>x.id===clientId); if(!c){ toast('Contact not found'); return; }
  f.contactShares.push({clientId,via});
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.contactShares=JSON.parse(JSON.stringify(f.contactShares));
  queueShareNotification({kind:'contact',formId:f.id,formTitle:f.title||'Untitled form',clientId,channel:contactChannel(c,via)});
  persistForms();
  renderShareList(); refreshShareContactPicker(); renderFormsList();
  toast('Queued for '+c.name+' via '+contactChannelLabel(c,via).replace('Their configuration → ',''));
}
function changeContactShareVia(clientId,via){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  const cs=f.contactShares.find(x=>x.clientId===clientId); if(!cs) return;
  cs.via=via; f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.contactShares=JSON.parse(JSON.stringify(f.contactShares));
  persistForms(); renderShareList();
  toast('Delivery channel updated');
}
function removeContactShare(clientId){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID); if(!f) return;
  ensureShareShape(f);
  f.contactShares=f.contactShares.filter(x=>x.clientId!==clientId);
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.contactShares=JSON.parse(JSON.stringify(f.contactShares));
  persistForms();
  renderShareList(); refreshShareContactPicker(); renderFormsList();
}
/* Share the form currently open in the editor (form-head Share button). */
function shareCurrentForm(){
  if(!FORM || !FORM.id){ toast('Nothing to share yet'); return; }
  // Make sure the form exists in FORMS (a brand-new unsaved form does not).
  if(!FORMS.find(f=>f.id===FORM.id)) saveForm();
  const f=FORMS.find(x=>x.id===FORM.id);
  if(!f){ toast('Save the form first'); return; }
  openShareModal(f.id);
}
function shareTotalCount(f){
  return ((f.shares||[]).length)+((f.roleShares||[]).length)+((f.contactShares||[]).length);
}

function renderShareList(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID);
  if(!f) return;
  const mount=document.getElementById('share-list');
  // Owner is always shown at the top with an "Owner" badge — it's a useful
  // reminder of who set things up, and clarifies why the row isn't editable.
  let html='';
  const owner=USERS.find(u=>u.id===f.ownerId);
  if(owner){
    html+=`<div class="share-row">
      <div class="user-avatar sm">${esc(initialsFor(owner.name))}</div>
      <div class="share-row-info">
        <div class="share-row-name">${esc(owner.name)} <span class="access-badge owner">Owner</span></div>
        <div class="share-row-email">${esc(owner.email||'')}</div>
      </div>
    </div>`;
  }
  // Role shares — each row is a role; every user holding it has the access.
  (f.roleShares||[]).forEach(r=>{
    const cnt=roleMemberCount(r.role);
    html+=`<div class="share-row">
      <div class="user-avatar sm" style="background:#f3e8ff;color:#7c3aed">${esc((roleLabel(r.role)||'?').slice(0,2).toUpperCase())}</div>
      <div class="share-row-info">
        <div class="share-row-name">${esc(roleLabel(r.role))} <span class="access-badge role">Role</span></div>
        <div class="share-row-email">${cnt} user${cnt===1?'':'s'} · dashboard notification</div>
      </div>
      <div class="share-row-actions">
        <select class="enhance-dd" onchange="changeRoleShareAccess('${esc(r.role)}',this.value)">
          <option value="view"${r.access==='view'?' selected':''}>Can view</option>
          <option value="edit"${r.access==='edit'?' selected':''}>Can edit</option>
        </select>
        <button title="Remove role access" onclick="removeRoleShare('${esc(r.role)}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
  });
  (f.shares||[]).forEach(s=>{
    const u=USERS.find(x=>x.id===s.userId);
    if(!u) return; // user was deleted — skip
    html+=`<div class="share-row">
      <div class="user-avatar sm">${esc(initialsFor(u.name))}</div>
      <div class="share-row-info">
        <div class="share-row-name">${esc(u.name)}</div>
        <div class="share-row-email">${esc(u.email||'')}</div>
      </div>
      <div class="share-row-actions">
        <select class="enhance-dd" onchange="changeShareAccess('${s.userId}',this.value)">
          <option value="view"${s.access==='view'?' selected':''}>Can view</option>
          <option value="edit"${s.access==='edit'?' selected':''}>Can edit</option>
        </select>
        <button title="Remove access" onclick="removeShare('${s.userId}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
  });
  // Contact shares — external delivery, no builder access.
  (f.contactShares||[]).forEach(cs=>{
    const c=CLIENTS.find(x=>x.id===cs.clientId);
    if(!c) return; // contact was deleted — skip
    html+=`<div class="share-row">
      <div class="user-avatar sm" style="background:var(--blue-soft);color:var(--blue)">${esc(initialsFor(c.name))}</div>
      <div class="share-row-info">
        <div class="share-row-name">${esc(c.name)} <span class="access-badge contact">Contact</span></div>
        <div class="share-row-email">${esc(contactChannelLabel(c,cs.via))}</div>
      </div>
      <div class="share-row-actions">
        <select class="enhance-dd" onchange="changeContactShareVia('${cs.clientId}',this.value)">
          <option value="config"${(!cs.via||cs.via==='config')?' selected':''}>Their configuration</option>
          <option value="email"${cs.via==='email'?' selected':''}>Email</option>
          <option value="sms"${cs.via==='sms'?' selected':''}>SMS</option>
        </select>
        <button title="Stop sharing with this contact" onclick="removeContactShare('${cs.clientId}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>`;
  });
  if(!shareTotalCount(f) && !owner){
    html=`<div class="share-empty">Not shared with anyone yet.</div>`;
  }
  mount.innerHTML=html;
  enhanceDropdowns(mount);
}

/* The picker only lists users who aren't the owner and aren't already shared
   in — anything else would be a no-op or a confusing duplicate. */
function refreshShareUserPicker(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID);
  if(!f) return;
  const taken=new Set([f.ownerId, ...(f.shares||[]).map(s=>s.userId)]);
  const available=USERS.filter(u=>!taken.has(u.id));
  const sel=document.getElementById('share-user-pick');
  if(!available.length){
    sel.innerHTML=`<option disabled selected>No more users to add</option>`;
    sel.disabled=true;
  } else {
    sel.innerHTML=available.map(u=>`<option value="${u.id}">${esc(u.name)} — ${esc(u.role)}</option>`).join('');
    sel.disabled=false;
  }
  reEnhanceDropdown(sel);
}

function addShare(){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID);
  if(!f) return;
  const userId=document.getElementById('share-user-pick').value;
  const access=document.getElementById('share-access-pick').value;
  if(!userId){ toast('Pick a user'); return; }
  if(!f.shares) f.shares=[];
  if(f.shares.some(s=>s.userId===userId)){ toast('Already shared'); return; }
  f.shares.push({userId,access});
  f.updatedAt=Date.now();
  // Keep the open form's in-memory copy in sync, or the next render()/saveForm()
  // would overwrite this share with the stale working copy.
  if(FORM.id===f.id) FORM.shares=JSON.parse(JSON.stringify(f.shares));
  const _u=USERS.find(x=>x.id===userId);
  queueShareNotification({kind:'user',formId:f.id,formTitle:f.title||'Untitled form',userId,access,channel:'dashboard'});
  persistForms();
  renderShareList();
  refreshShareUserPicker();
  renderFormsList();
  toast('Access granted — dashboard notification queued'+(_u?' for '+_u.name:''));
}

function changeShareAccess(userId,newAccess){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID);
  if(!f) return;
  const s=(f.shares||[]).find(s=>s.userId===userId);
  if(!s) return;
  s.access=newAccess;
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.shares=JSON.parse(JSON.stringify(f.shares));
  persistForms();
  renderFormsList();
  // If the share we just edited is the current user on the currently-open
  // form, we need to re-apply the UI so read-only state flips correctly.
  if(FORM.id===f.id) { applyRoleUI(); render(); }
  toast('Access updated');
}

function removeShare(userId){
  const f=FORMS.find(x=>x.id===SHARE_FORM_ID);
  if(!f) return;
  f.shares=(f.shares||[]).filter(s=>s.userId!==userId);
  f.updatedAt=Date.now();
  if(FORM.id===f.id) FORM.shares=JSON.parse(JSON.stringify(f.shares));
  persistForms();
  renderShareList();
  refreshShareUserPicker();
  renderFormsList();
  // If we just kicked out the current user from a form they're looking at, move them off.
  if(FORM.id===f.id && !canViewForm(f)){
    const visible=FORMS.filter(canViewForm).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(visible.length) loadFormIntoEditor(visible[0].id, true);
    else if(canCreateForms()) scaffoldEmptyForm();
    else showNoAccessState();
  } else if(FORM.id===f.id) {
    applyRoleUI(); render();
  }
  toast('Access removed');
}

/* Close the user menu when clicking anywhere else. */
document.addEventListener('click',e=>{
  if(!e.target.closest('.user-switcher')) closeUserMenu();
  // Close the export / toolbar-overflow menus when clicking outside them.
  if(!e.target.closest('#export-dd')) document.getElementById('export-menu')?.classList.remove('open');
  if(!e.target.closest('.tb-more-wrap')) document.getElementById('tb-more-menu')?.classList.remove('open');
});
window.addEventListener('resize', scheduleReflow);

/* =====================================================================
   FORM GROUPS + SEARCH
   ===================================================================== */

const GROUPS_KEY='credify_groups_v1';

/* Predefined color palette for groups — keeping it small avoids "what color
   should this be" decision fatigue, and the swatches stay distinguishable. */
const GROUP_COLORS=['#1a8a66','#0e7490','#7c3aed','#d97706','#c0392b','#db2777','#475569','#0d9488'];

/* ----- Persistence ----- */
function loadGroups(){
  try{ const raw=localStorage.getItem(GROUPS_KEY); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)) return a; } }catch(e){}
  return null;
}
function persistGroups(){ try{ localStorage.setItem(GROUPS_KEY, JSON.stringify(GROUPS)); }catch(e){} }

/* Look up a group object, or null. Used a lot — kept tiny on purpose. */
function findGroup(id){ return id ? GROUPS.find(g=>g.id===id) || null : null; }

/* How many forms (that the current user can see) live in this group?
   Used for the count badges in the sidebar. */
function groupFormCount(groupId){
  return FORMS.filter(f=>{
    if(!canViewForm(f)) return false;
    if(groupId==='all') return true;
    if(groupId==='ungrouped') return !f.groupId;
    return f.groupId===groupId;
  }).length;
}

/* ----- Group CRUD ----- */
function createGroup(name, color){
  name=(name||'').trim();
  if(!name){ toast('Group name required'); return null; }
  // Don't let duplicates pile up — case-insensitive match against existing names.
  if(GROUPS.some(g=>g.name.toLowerCase()===name.toLowerCase())){ toast('A group with that name already exists'); return null; }
  const g={id:uid('grp'),name,color:color||GROUP_COLORS[GROUPS.length%GROUP_COLORS.length],ownerId:CURRENT_USER_ID};
  GROUPS.push(g);
  persistGroups();
  return g;
}

function renameGroup(groupId){
  const g=findGroup(groupId);
  if(!g) return;
  const next=prompt('Rename group', g.name);
  if(next==null) return;
  const trimmed=next.trim();
  if(!trimmed){ toast('Group name required'); return; }
  if(GROUPS.some(x=>x.id!==g.id && x.name.toLowerCase()===trimmed.toLowerCase())){ toast('That name is already in use'); return; }
  g.name=trimmed;
  persistGroups();
  renderFormsListAll();
  toast('Group renamed');
}

/* Deleting a group only removes the cluster, NOT the forms. Forms that were
   in the group become ungrouped. This matches the user's mental model:
   groups are organizational, not containers. */
function deleteGroup(groupId){
  const g=findGroup(groupId);
  if(!g) return;
  const affected=FORMS.filter(f=>f.groupId===g.id).length;
  const msg=affected
    ? `Delete group "${g.name}"? ${affected} form${affected===1?'':'s'} will become ungrouped (the forms themselves stay).`
    : `Delete group "${g.name}"?`;
  if(!confirm(msg)) return;
  FORMS.forEach(f=>{ if(f.groupId===g.id) delete f.groupId; });
  persistForms();
  GROUPS=GROUPS.filter(x=>x.id!==g.id);
  persistGroups();
  // If we just deleted the active filter, fall back to "All forms".
  if(FILTER_GROUP_ID===g.id) FILTER_GROUP_ID='all';
  renderFormsListAll();
  toast('Group deleted');
}

/* Prompt-driven group creation from the sidebar "+" button. Uses prompt()
   for simplicity — a modal would be overkill for one-field input. */
function promptCreateGroup(){
  const name=prompt('New group name');
  if(name==null) return;
  const g=createGroup(name);
  if(g){
    FILTER_GROUP_ID=g.id; // auto-select the new group
    renderFormsListAll();
    toast('Group created');
  }
}

/* ----- Group assignment on a form ----- */
function setFormGroup(formId, groupId){
  const f=FORMS.find(x=>x.id===formId);
  if(!f){ toast('Form not found'); return; }
  // Editing a form's group counts as editing the form, so respect edit perms.
  if(!canEditForm(f)){ toast('You don\'t have permission to change this form\'s group'); return; }
  if(groupId){ f.groupId=groupId; } else { delete f.groupId; }
  f.updatedAt=Date.now();
  // If the currently-open form is the one we just regrouped, keep its in-memory
  // copy in sync — otherwise the next render() would resurrect the old value.
  if(FORM.id===f.id){ if(groupId) FORM.groupId=groupId; else delete FORM.groupId; }
  persistForms();
  renderFormsListAll();
}

/* ----- Search =====
   Build a flat searchable string per form once, then substring-match. With a
   few thousand forms this stays well under a millisecond per keystroke.
   Returns { matches: boolean, where: string|null } so the list can show
   *why* a form matched (e.g. "Field: Email"). */
function matchForm(f, query){
  if(!query) return {matches:true, where:null};
  const q=query.toLowerCase();

  const title=(f.title||'').toLowerCase();
  if(title.includes(q)) return {matches:true, where:'title'};

  const desc=(f.desc||'').toLowerCase();
  if(desc.includes(q)) return {matches:true, where:'description'};

  // Owner name — useful when scanning "find every form by X".
  const owner=USERS.find(u=>u.id===f.ownerId);
  if(owner && owner.name.toLowerCase().includes(q)) return {matches:true, where:'owner: '+owner.name};

  // Group name — useful for "find everything in the onboarding cluster".
  const grp=findGroup(f.groupId);
  if(grp && grp.name.toLowerCase().includes(q)) return {matches:true, where:'group: '+grp.name};

  // Field labels — the most useful long-tail match (e.g. searching "phone"
  // finds every form that has a phone field).
  for(const row of (f.rows||[])){
    for(const fld of (row.fields||[])){
      const lbl=(fld.label||'').toLowerCase();
      if(lbl.includes(q)) return {matches:true, where:'field: '+fld.label};
    }
  }
  return {matches:false, where:null};
}

/* Highlight matches inside a string (already escaped before we wrap with
   the span — esc() is called before highlightHit()). Safe-by-construction. */
function highlightHit(text, query){
  if(!query) return text;
  const idx=text.toLowerCase().indexOf(query.toLowerCase());
  if(idx<0) return text;
  const end=idx+query.length;
  return text.slice(0,idx)+'<span class="search-hit">'+text.slice(idx,end)+'</span>'+text.slice(end);
}

/* Debounce so we don't re-render the list on every keystroke if someone is
   typing fast. 90ms feels instant but lets the typer get ahead of the work. */
let searchT;
function onSearchInput(value){
  FORM_SEARCH=value;
  FORMS_PAGE=1;
  const wrap=document.getElementById('forms-search');
  if(wrap) wrap.classList.toggle('has-value', !!value);
  clearTimeout(searchT);
  searchT=setTimeout(()=>renderFormsList(), 90);
}
function clearSearch(){
  FORM_SEARCH='';
  FORMS_PAGE=1;
  const input=document.getElementById('forms-search-input');
  if(input) input.value='';
  const wrap=document.getElementById('forms-search');
  if(wrap) wrap.classList.remove('has-value');
  renderFormsList();
  input?.focus();
}

/* ----- Sidebar (groups navigation) ----- */
function renderGroupsSidebar(){
  const mount=document.getElementById('forms-mgr-sidebar');
  if(!mount) return;
  // Standard items first ("All" + "Ungrouped"), then user-defined groups.
  let html=`<div class="forms-mgr-sidebar-h"><span>Browse</span></div>`;
  html+=groupEntryHTML('all', 'All forms', '#1a8a66', false);
  html+=groupEntryHTML('ungrouped', 'Ungrouped', '#8aaa9a', false);
  html+=`<div class="forms-mgr-sidebar-h" style="margin-top:8px">
    <span>Groups</span>
    <button class="add-grp-btn" title="New group" onclick="promptCreateGroup()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>`;
  if(GROUPS.length===0){
    html+=`<div style="font-size:11.5px;color:var(--text-muted-2);padding:6px 9px;line-height:1.5">No groups yet. Create one to cluster forms.</div>`;
  } else {
    // Stable alphabetical order makes groups easy to scan.
    [...GROUPS].sort((a,b)=>a.name.localeCompare(b.name)).forEach(g=>{
      html+=groupEntryHTML(g.id, g.name, g.color, true);
    });
  }
  mount.innerHTML=html;
  bindSidebarDnD();
}

function groupEntryHTML(id, name, color, hasActions){
  const active=FILTER_GROUP_ID===id;
  const count=groupFormCount(id);
  // The whole row is a click target; the inline action buttons appear on
  // hover and stop click propagation so they don't switch the filter too.
  const actions=hasActions
    ? `<div class="grp-actions">
        <button title="Rename" onclick="event.stopPropagation();renameGroup('${id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="del" title="Delete group" onclick="event.stopPropagation();deleteGroup('${id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>`
    : '';
  return `<div class="grp-entry${active?' active':''}" data-grp-id="${id}" onclick="selectGroupFilter('${id}')">
    <span class="grp-dot" style="background:${esc(color)}"></span>
    <span class="grp-name">${esc(name)}</span>
    <span class="grp-count">${count}</span>
    ${actions}
  </div>`;
}

function selectGroupFilter(id){
  FILTER_GROUP_ID=id;
  FORMS_PAGE=1;
  // The sidebar needs a re-render too because the "active" marker moves.
  renderGroupsSidebar();
  renderFormsList();
}

/* Drag-and-drop: form rows are draggable, group sidebar entries are drop
   targets. We use the existing `draggedData` global to pass the form id. */
function bindSidebarDnD(){
  document.querySelectorAll('.grp-entry').forEach(entry=>{
    const gid=entry.dataset.grpId;
    entry.addEventListener('dragover',e=>{
      // Only highlight if a form is being dragged in (not a palette item).
      if(!draggedData || draggedData.type!=='form') return;
      e.preventDefault();
      e.dataTransfer.dropEffect='move';
      entry.classList.add('drag-target');
    });
    entry.addEventListener('dragleave',e=>{
      if(e.target===entry) entry.classList.remove('drag-target');
    });
    entry.addEventListener('drop',e=>{
      e.preventDefault();
      entry.classList.remove('drag-target');
      if(!draggedData || draggedData.type!=='form') return;
      // "All forms" isn't a real bucket — dropping there is a no-op (the
      // form is already in "all"). "Ungrouped" clears the form's group.
      const targetGroup = (gid==='all') ? draggedData.previousGroupId
                        : (gid==='ungrouped') ? null
                        : gid;
      // No-op if it's already in the target group
      const f=FORMS.find(x=>x.id===draggedData.formId);
      if(!f) return;
      if((f.groupId||null)===(targetGroup||null)) return;
      setFormGroup(draggedData.formId, targetGroup);
      const groupName = gid==='all' ? 'All forms'
                      : gid==='ungrouped' ? 'Ungrouped'
                      : findGroup(gid)?.name || 'group';
      toast('Moved to '+groupName);
    });
  });
}

/* ----- Group picker popover (the little chip on each form row) -----
   Clicking the chip opens a tiny dropdown listing all groups. We position it
   absolutely near the click and close on outside click. Reusing this single
   popover element keeps the DOM clean and avoids stale handlers. */
let activePicker=null;
function openGroupPicker(event, formId){
  event.stopPropagation();
  closeGroupPicker(); // close any existing one before opening a new one
  const f=FORMS.find(x=>x.id===formId);
  if(!f){ return; }
  if(!canEditForm(f)){ toast('You don\'t have permission to change this form\'s group'); return; }

  const picker=document.createElement('div');
  picker.className='grp-picker';
  let html=`<div class="grp-picker-h">Move to group</div>`;
  // "None" lets the user remove the form from its current group.
  const noneSelected=!f.groupId;
  html+=`<div class="grp-picker-item${noneSelected?' selected':''}" data-grp="">
    <span class="gpi-dot" style="background:transparent;border:1px dashed var(--text-muted-2)"></span>
    <span>Ungrouped</span>
    ${noneSelected?'<span class="gpi-check">✓</span>':''}
  </div>`;
  if(GROUPS.length){
    html+=`<div class="grp-picker-divider"></div>`;
    [...GROUPS].sort((a,b)=>a.name.localeCompare(b.name)).forEach(g=>{
      const sel=f.groupId===g.id;
      html+=`<div class="grp-picker-item${sel?' selected':''}" data-grp="${g.id}">
        <span class="gpi-dot" style="background:${esc(g.color)}"></span>
        <span>${esc(g.name)}</span>
        ${sel?'<span class="gpi-check">✓</span>':''}
      </div>`;
    });
  }
  html+=`<div class="grp-picker-divider"></div>
    <div class="grp-picker-action" data-action="new">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>New group…</span>
    </div>`;
  picker.innerHTML=html;
  document.body.appendChild(picker);

  // Position below the chip (or above if there's no room). We measure first
  // to avoid jumping after appending.
  const rect=event.currentTarget.getBoundingClientRect();
  const pickerRect=picker.getBoundingClientRect();
  let top=rect.bottom+6, left=rect.left;
  if(top+pickerRect.height > window.innerHeight - 10){ top=rect.top - pickerRect.height - 6; }
  if(left+pickerRect.width > window.innerWidth - 10){ left=window.innerWidth - pickerRect.width - 10; }
  picker.style.top=top+'px';
  picker.style.left=Math.max(8,left)+'px';

  // Wire up actions
  picker.querySelectorAll('.grp-picker-item').forEach(item=>{
    item.addEventListener('click', e=>{
      e.stopPropagation();
      const gid=item.dataset.grp || null;
      setFormGroup(formId, gid);
      closeGroupPicker();
    });
  });
  picker.querySelector('.grp-picker-action[data-action="new"]')?.addEventListener('click', e=>{
    e.stopPropagation();
    closeGroupPicker();
    const name=prompt('New group name');
    if(name==null) return;
    const g=createGroup(name);
    if(g) setFormGroup(formId, g.id);
  });

  activePicker=picker;
}
function closeGroupPicker(){
  if(activePicker){ activePicker.remove(); activePicker=null; }
}
// Global outside-click closes the picker.
document.addEventListener('click', e=>{
  if(activePicker && !e.target.closest('.grp-picker')) closeGroupPicker();
});
// Re-position / close on scroll inside the manager
document.addEventListener('scroll', ()=>closeGroupPicker(), true);

/* Helper that re-renders both panes — called after group CRUD. */
function renderFormsListAll(){
  renderGroupsSidebar();
  renderFormsList();
}

function seedDemo(){
  const mk=(type,over)=>defaultField(type,over);
  FORM.title='';
  FORM.desc='';
  FORM.rows=[
    { id:uid('r'), fields:[ mk('text',{label:'First name',required:true}), mk('text',{label:'Last name',required:true}) ] },
    { id:uid('r'), fields:[ mk('email',{label:'Email',placeholder:'you@example.com',required:true}), mk('phone',{label:'Phone'}), mk('date',{label:'Date of birth'}) ] },
    { id:uid('r'), fields:[ mk('select',{label:'How did you hear about us?',options:['Referral','Search','Social','Other']}) ] },
  ];
}

/* Block persistence */
const BLOCKS_KEY='credify_form_blocks_v1';
function saveBlocks(){
  try { localStorage.setItem(BLOCKS_KEY, JSON.stringify(BLOCKS)); } catch(e){ }
}
function loadBlocks(){
  try { const raw=localStorage.getItem(BLOCKS_KEY); if(raw){ const arr=JSON.parse(raw); if(Array.isArray(arr)) return arr; } } catch(e){}
  return null;
}
// Seed a few demo blocks of random PREFILLABLE field types so you can drop a
// block onto a form and then autopopulate those fields onto another form.
// Idempotent + version-stamped: missing blocks are recreated; older versions
// regenerate once; current ones (incl. any you've edited) are left alone.
function seedDemoBlocks(){
  if(typeof BLOCKS==='undefined' || !Array.isArray(BLOCKS)) return;
  const BLOCK_SEED_VERSION=2; // v2: full-width fields (tidy single-row drop)
  // Realistic, recognizable labels — all prefillable types so every field can autopopulate.
  const pool=[
    ['text','Last Name'],['text','First Name'],['email','Email'],['phone','Phone'],
    ['date','Date of Birth'],['text','Address'],['text','City'],['text','ZIP Code'],
    ['select','State',['CA','TX','NY','FL','WA']],
    ['select','Insurance Carrier',['Aetna','Cigna','UnitedHealthcare','BCBS','Other']],
    ['text','Member ID'],['text','Group Number'],
    ['text','Emergency Contact Name'],['phone','Emergency Contact Phone'],
    ['radio','Preferred Contact Method',['Phone','Email','Text']],
    ['number','Height (in)'],['number','Weight (lb)'],
    ['range','Pain Level (0–10)'],['toggle','Consent to Treat'],
    ['checkboxes','Current Symptoms',['Anxiety','Depression','Insomnia','Fatigue']],
    ['textarea','Chief Complaint'],['url','Patient Portal URL'],['time','Preferred Call Time']
  ];
  const seeds=[
    {id:'block_demo_1', name:'Demo Block 1'},
    {id:'block_demo_2', name:'Demo Block 2'},
    {id:'block_demo_3', name:'Demo Block 3'}
  ];
  let changed=false;
  seeds.forEach(function(s){
    const existing=BLOCKS.find(function(b){return b.id===s.id;});
    if(existing && (existing.blockSeedVersion||0)>=BLOCK_SEED_VERSION) return; // current — leave alone
    // random subset (3–6 fields), random order
    const idxs=pool.map(function(_,i){return i;});
    for(var i=idxs.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=idxs[i]; idxs[i]=idxs[j]; idxs[j]=t; }
    const n=3+Math.floor(Math.random()*4);
    const fields=idxs.slice(0,n).map(function(k){
      const spec=pool[k]; const f=defaultField(spec[0]); f.label=spec[1];
      if(spec[2]) f.options=spec[2].slice();
      // Dropping a block places all its fields in ONE row; full-width keeps that
      // row tidy (a clean vertical stack) instead of ragged wrapping. Resize
      // individual fields after dropping if a side-by-side layout is wanted.
      f.span=12;
      return f;
    });
    const blockObj={ id:s.id, name:s.name, fields:fields, blockSeedVersion:BLOCK_SEED_VERSION };
    const at=BLOCKS.findIndex(function(b){return b.id===s.id;});
    if(at>=0) BLOCKS[at]=blockObj; else BLOCKS.push(blockObj);
    changed=true;
  });
  if(changed) saveBlocks();
}

/* ---- Forms collection persistence ----
   We store an array of forms. The working FORM is upserted into the collection
   on every render via saveForm(). A pointer remembers the last-open form id so a
   refresh reopens it. The old single-draft key is migrated on first load. */
const FORMS_KEY='credify_forms_v2';
const LAST_FORM_KEY='credify_last_form_v2';
const OLD_DRAFT_KEY='credify_form_draft_v1';

function loadForms(){
  try{ const raw=localStorage.getItem(FORMS_KEY); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)) return a; } }catch(e){}
  return null;
}
function persistForms(){ try{ localStorage.setItem(FORMS_KEY, JSON.stringify(FORMS)); }catch(e){} }

function formIsEmpty(f){
  // "empty" = no real fields anywhere and no title/desc
  const hasFields=(f.rows||[]).some(r=>r.fields&&r.fields.length);
  return !hasFields && !(f.title&&f.title.trim()) && !(f.desc&&f.desc.trim());
}

// Called by render() on every change — upserts the working form into the collection.
function saveForm(){
  if(!FORM.id) FORM.id=uid('form');
  // First save: assign current user as owner and start with no shares.
  // Subsequent saves preserve the existing ownership/share state.
  if(!FORM.ownerId) FORM.ownerId=CURRENT_USER_ID;
  if(!FORM.shares) FORM.shares=[];
  if(typeof ensureScoringInit==='function') ensureScoringInit(); else { if(!FORM.scoringGroups) FORM.scoringGroups=[]; FORM.scoringSections=FORM.scoringGroups; }
  // Viewers shouldn't be writing to forms — bail before persisting any change
  // that might have slipped through. (UI prevents this; this is the backstop.)
  if(!canEditForm(FORM)) return;
  const i=FORMS.findIndex(f=>f.id===FORM.id);
  // Don't write a brand-new, still-empty scaffold into the collection — that's
  // what produced stray "Untitled form · 0 fields" entries on every user switch
  // or last-form delete. Existing forms always save (so clearing one persists
  // the cleared state); a new form only persists once it has a title, a
  // description, or at least one field.
  if(i<0 && formIsEmpty(FORM)) return;
  normalizePages();
  // Drop any scoring-section references to deleted or no-longer-scoreable
  // fields so the saved snapshot is internally consistent on the next load.
  pruneScoringSections();
  pruneStyles();
  ensureVisGroupsInit();
  pruneVisGroups();
  pruneFieldMeta();
  FORM.updatedAt=Date.now();
  const snapshot=JSON.parse(JSON.stringify(FORM));
  if(i>=0) FORMS[i]=snapshot; else FORMS.push(snapshot);
  persistForms();
  try{ localStorage.setItem(LAST_FORM_KEY, FORM.id); }catch(e){}
  // Feed the undo/redo history. This is the one place every edit persists,
  // so it's the right single hook. (No-op while a restore is in progress.)
  // NOTE: historyRecord expects the serialized FORM string (it compares against
  // JSON.stringify(FORM) snapshots in its stack). Previously this passed an
  // undefined `snapStr`, so every record was a no-op and undo/redo never worked.
  if(typeof historyRecord==='function'){ try{ historyRecord(JSON.stringify(FORM)); }catch(e){} }
}

/* =====================================================================
   SAVE TO DATABASE  —  push the current form to a backend.
   ---------------------------------------------------------------------
   ▸ TO WIRE A REAL DATABASE: set DB_SAVE.endpoint to your save URL and,
     if needed, add an auth header in DB_SAVE.headers (e.g. a bearer token).
     The form is sent as JSON via the configured method (POST by default).
   ▸ Until an endpoint is set, this runs in STUB mode: it builds + logs the
     exact payload and resolves as success, so the whole Save UX works now.
   The request body is { id, title, schemaVersion, savedAt, form } where
   `form` is the complete form definition.
   ===================================================================== */
var DB_SAVE = {
  endpoint: '',                                   // <-- put your save URL here
  method:   'POST',
  headers:  { 'Content-Type': 'application/json' }, // add e.g. Authorization here
  schemaVersion: 1
};

function buildFormSavePayload(form){
  return {
    id: form.id || null,
    title: form.title || 'Untitled form',
    schemaVersion: DB_SAVE.schemaVersion,
    savedAt: new Date().toISOString(),
    form: JSON.parse(JSON.stringify(form))
  };
}

/* Returns a Promise that resolves with the server response (or a stub object)
   and rejects on a network / non-2xx error. Pure data layer — no UI here. */
function pushFormToDatabase(form){
  var payload = buildFormSavePayload(form);
  if(!DB_SAVE.endpoint){
    // STUB MODE — no backend wired yet. Surface the payload and succeed so the
    // button flow is fully exercised. Replace by setting DB_SAVE.endpoint.
    try{ console.log('[DB_SAVE stub] would POST form payload:', payload); }catch(e){}
    return new Promise(function(resolve){ setTimeout(function(){ resolve({ ok:true, stub:true, id:payload.id }); }, 400); });
  }
  return fetch(DB_SAVE.endpoint, {
    method: DB_SAVE.method || 'POST',
    headers: DB_SAVE.headers || { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  }).then(function(res){
    if(!res.ok) throw new Error('Server responded ' + res.status);
    return res.json().catch(function(){ return { ok:true }; });
  });
}

/* Toolbar handler: persists locally first, then pushes to the DB with clear
   saving / saved / error states on the button. */
/* ---- Draft vs Saved status -------------------------------------------------
   A form is "Saved" only when its current content matches what was last pushed
   to the database; ANY edit afterwards puts it back into "Draft". We derive this
   from a content snapshot (_dbClean) rather than a stored flag, so it stays
   correct across reloads and never desyncs. updatedAt/status/_dbClean are
   excluded from the snapshot so routine autosaves don't falsely mark a draft. */
function formCleanKey(form){
  if(!form) return '';
  var c={}; for(var k in form){ if(k==='status'||k==='_dbClean'||k==='updatedAt') continue; c[k]=form[k]; }
  try{ return JSON.stringify(c); }catch(e){ return ''; }
}
function isFormDraft(form){ return !form || !form._dbClean || form._dbClean!==formCleanKey(form); }
function updateDraftBadge(){
  var draft = isFormDraft(FORM);
  var b=document.getElementById('form-status-badge');
  if(b){
    b.textContent = draft ? '● Draft' : '● Saved';
    b.className = 'form-status-badge build-only ' + (draft?'is-draft':'is-saved');
    b.title = draft ? 'Unsaved changes — Save to commit to the database and enable delivery to patients'
                    : 'Saved to the database';
  }
  var cs=document.getElementById('csb-status');
  if(cs){
    cs.textContent = draft ? 'Draft — auto-saved locally · not in the database yet' : 'Saved to the database';
    cs.className = 'csb-status ' + (draft?'is-draft':'is-saved');
  }
}

var DB_SAVE_BUSY = false;
function _dbSaveBtns(){ return [
  {b:document.getElementById('dbsave-btn'),       l:document.getElementById('dbsave-label')},
  {b:document.getElementById('dbsave-btn-bottom'),l:document.getElementById('dbsave-label-bottom')}
];}
function _dbSaveSetBtns(text, disabled){ _dbSaveBtns().forEach(function(o){ if(o.l) o.l.textContent=text; if(o.b) o.b.disabled=disabled; }); }
function saveFormToDatabase(){
  if(DB_SAVE_BUSY) return;
  if(typeof currentFormReadOnly==='function' && currentFormReadOnly()){ toast('Read-only — can\'t save this form'); return; }
  if(typeof canEditForm==='function' && !canEditForm(FORM)){ toast('You don\'t have permission to save this form'); return; }
  saveForm(); // make sure localStorage has the latest before the remote push
  DB_SAVE_BUSY=true; _dbSaveSetBtns('Saving…', true);
  pushFormToDatabase(FORM).then(function(resp){
    // Mark this exact content as the saved baseline → form leaves Draft.
    FORM.status='saved';
    FORM._dbClean=formCleanKey(FORM);
    var i=FORMS.findIndex(function(f){return f.id===FORM.id;});
    if(i>=0) FORMS[i]=JSON.parse(JSON.stringify(FORM));
    if(typeof persistForms==='function') persistForms();
    updateDraftBadge();
    _dbSaveSetBtns('Saved ✓', false);
    toast((resp && resp.stub) ? 'Saved — DB endpoint not wired yet (stub)' : 'Form saved to database');
    setTimeout(function(){ _dbSaveSetBtns('Save', false); DB_SAVE_BUSY=false; updateDraftBadge(); }, 1500);
  }).catch(function(err){
    _dbSaveSetBtns('Save', false); DB_SAVE_BUSY=false;
    toast('Couldn\'t save to database: ' + ((err && err.message) || 'network error'));
  });
}


/* ===== Undo / Redo history =====
   saveForm() is the single choke point through which every edit persists, so a
   serialized FORM snapshot is recorded there. Undo/redo restore a snapshot and
   re-render. Rapid successive edits (e.g. typing a label) within a short window
   are coalesced into one step, so undo moves in sensible chunks rather than one
   character at a time. History is per-form: switching forms rebases it. */
var HIST={ stack:[], idx:-1, lastTime:0, restoring:false, formId:null };
var HIST_COALESCE_MS=450;
var HIST_MAX=150;

function historyReset(){
  try{
    var s=JSON.stringify(FORM);
    HIST.stack=[s]; HIST.idx=0; HIST.lastTime=0; HIST.formId=(FORM&&FORM.id)||null;
  }catch(e){ HIST.stack=[]; HIST.idx=-1; HIST.formId=null; }
  updateHistoryButtons();
}

function historyRecord(snapStr){
  if(HIST.restoring||snapStr==null) return;
  // A different form is now loaded → start that form's history fresh.
  if(HIST.formId && FORM && FORM.id && FORM.id!==HIST.formId){ historyReset(); return; }
  if(HIST.idx<0||!HIST.stack.length){ historyReset(); return; }
  if(snapStr===HIST.stack[HIST.idx]) return;          // nothing actually changed
  var now=Date.now();
  if((now-HIST.lastTime)<HIST_COALESCE_MS){
    HIST.stack[HIST.idx]=snapStr;                      // merge typing-burst into current step
  }else{
    HIST.stack=HIST.stack.slice(0,HIST.idx+1);         // drop the redo branch
    HIST.stack.push(snapStr);
    HIST.idx=HIST.stack.length-1;
    if(HIST.stack.length>HIST_MAX){ HIST.stack.shift(); HIST.idx--; }
  }
  HIST.lastTime=now; HIST.formId=(FORM&&FORM.id)||HIST.formId;
  updateHistoryButtons();
}

function historyCanUndo(){ return HIST.idx>0; }
function historyCanRedo(){ return HIST.idx>=0 && HIST.idx<HIST.stack.length-1; }

function historyUndo(){
  if(typeof currentFormReadOnly==='function'&&currentFormReadOnly()) return;
  if(!historyCanUndo()) return;
  HIST.idx--; historyApply(HIST.stack[HIST.idx]);
}
function historyRedo(){
  if(typeof currentFormReadOnly==='function'&&currentFormReadOnly()) return;
  if(!historyCanRedo()) return;
  HIST.idx++; historyApply(HIST.stack[HIST.idx]);
}

function historyApply(str){
  HIST.restoring=true;
  try{
    FORM=JSON.parse(str);
    if(!FORM.weightGroups) FORM.weightGroups=[];
    if(!FORM.shares) FORM.shares=[];
    if(typeof ensureScoringInit==='function') ensureScoringInit(); else { if(!FORM.scoringGroups) FORM.scoringGroups=[]; FORM.scoringSections=FORM.scoringGroups; }
    if(!FORM.rows||!FORM.rows.length) FORM.rows=[{id:uid('r'),fields:[],page:1}];
    SELECTED=null;
    var t=document.getElementById('form-title'); if(t) t.value=FORM.title||'';
    var d=document.getElementById('form-desc'); if(d) d.value=FORM.desc||'';
    if(typeof updateAllPagesButton==='function') updateAllPagesButton();
    render();                 // full refresh; the saveForm() it triggers is history-guarded
  }catch(e){}
  HIST.restoring=false;
  HIST.lastTime=0;            // the next edit starts a fresh (non-coalesced) step
  updateHistoryButtons();
}

function updateHistoryButtons(){
  var u=document.getElementById('undo-btn'), r=document.getElementById('redo-btn');
  if(u) u.disabled=!historyCanUndo();
  if(r) r.disabled=!historyCanRedo();
}

function loadFormIntoEditor(id, silent){
  const f=FORMS.find(x=>x.id===id);
  if(!f) return;
  // Refuse the load if the current user has no access at all. The Forms
  // Manager already filters by access, but a stale "last-open" id or a
  // direct-call from elsewhere could otherwise leak a forbidden form.
  if(!canViewForm(f)){
    if(!silent) toast('You don\'t have access to that form');
    return;
  }
  FORM=JSON.parse(JSON.stringify(f));
  if(!FORM.weightGroups) FORM.weightGroups=[];
  if(!FORM.shares) FORM.shares=[];
  if(typeof ensureScoringInit==='function') ensureScoringInit(); else { if(!FORM.scoringGroups) FORM.scoringGroups=[]; FORM.scoringSections=FORM.scoringGroups; }
  // Per-form view preference: each form remembers whether it was last opened
  // in single-page or all-pages mode. Missing on older saved forms = false.
  SHOW_ALL_PAGES=!!FORM.showAllPages;
  SELECTED=null;
  BUILDER_PAGE=1;
  PREVIEW_PAGE=1;
  // Close the form-level rule editor if it was open — it's bound to the
  // previous form, so it shouldn't linger over a freshly loaded one.
  closeModal('formrule-modal');
  // New form open = fresh preview state. Otherwise we'd keep stale answers
  // from the prior form, which would mis-attribute scores after switching.
  resetPreviewAnswers();
  document.getElementById('form-title').value=FORM.title||'';
  document.getElementById('form-desc').value=FORM.desc||'';
  updateAllPagesButton();
  try{ localStorage.setItem(LAST_FORM_KEY, FORM.id); }catch(e){}
  // Read-only forms open straight in preview so viewers see what the form
  // actually looks like, rather than an obviously-disabled build canvas.
  setMode(canEditForm(FORM)?'build':'preview');
  render();
  historyReset();
  applyRoleUI();
}

function newForm(){
  if(!canCreateForms()){ toast('Viewers can\'t create forms'); return; }
  FORM={id:uid('form'),title:'',desc:'',rows:[{id:uid('r'),fields:[]}],weightGroups:[],scoringGroups:[],scoringSections:[],ownerId:CURRENT_USER_ID,shares:[],showAllPages:false,updatedAt:Date.now()};
  SHOW_ALL_PAGES=false;
  SELECTED=null;
  document.getElementById('form-title').value='';
  document.getElementById('form-desc').value='';
  updateAllPagesButton();
  setMode('build');
  render();
  historyReset();
  applyRoleUI();
  toast('New form started');
}

/* ----- Demo "Visibility Forms" for cross-form search + score-triggered display -----
   Each is a self-contained scored form: 10 standard fields, a scoring section,
   and two extra fields that reveal once the section total crosses a threshold.
   Used to demonstrate Search Forms and the popup-on-condition feature. */
function buildDemoVisForm(spec){
  const opts=['Not at all','Several days','More than half the days','Nearly every day'];
  const sc=[0,1,2,3];
  const mk=(type,ov)=>defaultField(type,ov);
  const nameF=mk('text',{label:'Full name',span:6});
  const emailF=mk('email',{label:'Email',span:6});
  const phoneF=mk('phone',{label:'Phone',span:6});
  const dobF=mk('date',{label:'Date of birth',span:6});
  const sevF=mk('select',{label:'Self-rated severity',options:['Mild','Moderate','Severe'],optionScores:[1,2,3],span:12});
  const qfields=spec.q.map((label,i)=>mk('radio',{label:`${i+1}. ${label}`,options:opts.slice(),optionScores:sc.slice(),span:12}));
  const sect={id:uid('sect'),name:spec.sec,fieldIds:[...qfields.map(q=>q.id),sevF.id],bands:[]};
  const notesF=mk('textarea',{label:'Clinician follow-up notes',span:12,showIf:{type:'score',sectionId:sect.id,op:'gte',value:spec.thr}});
  const referF=mk('radio',{label:'Refer to a specialist?',options:['No','Yes'],optionScores:[0,0],span:6,showIf:{type:'score',sectionId:sect.id,op:'gte',value:spec.thr}});
  const rows=[
    {id:uid('r'),fields:[nameF,emailF]},
    {id:uid('r'),fields:[phoneF,dobF]},
    {id:uid('r'),fields:[sevF]},
    ...qfields.map(q=>({id:uid('r'),fields:[q]})),
    {id:uid('r'),fields:[notesF]},
    {id:uid('r'),fields:[referF]}
  ];
  return {id:uid('form'),title:spec.title,desc:spec.desc||'Demo form for cross-form visibility — total score ≥ '+spec.thr+' reveals the follow-up fields.',rows,weightGroups:[],scoringSections:[sect],ownerId:CURRENT_USER_ID,shares:[],showAllPages:false,demoVis:true,updatedAt:Date.now()};
}
function seedVisibilityForms(){
  if(!canCreateForms()){ toast('Viewers can\'t create forms'); return; }
  const specs=[
    {title:'Visibility Demo — Depression Screen', sec:'Depression score', thr:10, q:['Little interest or pleasure in doing things','Feeling down, depressed, or hopeless','Trouble falling or staying asleep','Feeling tired or having little energy','Poor appetite or overeating']},
    {title:'Visibility Demo — Anxiety Screen', sec:'Anxiety score', thr:10, q:['Feeling nervous, anxious, or on edge','Not being able to stop or control worrying','Worrying too much about different things','Trouble relaxing','Becoming easily annoyed or irritable']},
    {title:'Visibility Demo — Substance Use', sec:'Substance-use score', thr:8, q:['Used more than intended','Wanted to cut down but could not','Spent a lot of time using or recovering','Cravings or strong urges to use','Use caused problems at home or work']},
    {title:'Visibility Demo — Trauma Screen', sec:'Trauma score', thr:9, q:['Repeated disturbing memories','Avoiding reminders of the experience','Feeling on guard or easily startled','Trouble concentrating','Feeling distant or cut off from others']},
    {title:'Visibility Demo — General Wellness', sec:'Wellness score', thr:7, q:['Difficulty managing daily stress','Low motivation or interest','Strained relationships','Reduced work or school performance','Sleep or appetite changes']}
  ];
  let added=0;
  specs.forEach(spec=>{ if(FORMS.some(f=>f.title===spec.title)) return; FORMS.push(buildDemoVisForm(spec)); added++; });
  persistForms();
  toast(added?('Added '+added+' demo visibility form'+(added>1?'s':'')):'Demo visibility forms already exist');
  try{ if(document.getElementById('dispmgr-modal').classList.contains('open')) renderDisplayManager(); }catch(e){}
  try{ if(document.getElementById('forms-modal') && document.getElementById('forms-modal').classList.contains('open')) renderFormsListAll(); }catch(e){}
}

/* ============================================================
   DISPLAY FIELDS TEST FORM — a ready-made conditional-visibility test
   bench built from the uploaded Sample_Form_Data spec. Ten controller→
   dependent pairs: each dependent reveals when its controller's answer
   meets a show-when rule. Every rule is saved as a Display-Fields block
   so it opens and edits cleanly in the toolbar's "Display Fields" manager.
   Seeded once (deduped by title); stored in FORMS like any other form.
   ============================================================ */
function seedDisplayFieldsTestForm(){
  const TITLE='Show Fields Test Form';
  const OLD_TITLE='Display Fields Test Form';
  const SEED_VER=6; // bump to refresh the test bench in existing localStorage (v6: rules restored, fields 4-across chronological)
  // Migrate any earlier copy that used the old title so we never show both.
  const oldIdx=FORMS.findIndex(f=>f.title===OLD_TITLE);
  if(oldIdx>=0) FORMS.splice(oldIdx,1);
  const existingIdx=FORMS.findIndex(f=>f.title===TITLE);
  if(existingIdx>=0){
    if((FORMS[existingIdx].seedVersion||0) >= SEED_VER) return FORMS[existingIdx]; // up to date — keep any edits
    FORMS.splice(existingIdx,1); // stale version → rebuild fresh below
  }
  const df=(type,over)=>defaultField(type,Object.assign({},over));
  const rows=[];
  const dataFields=[]; // controller, dependent, controller, dependent … (chronological)
  const blk=c=>({block:true,name:'',match:'all',conditions:[c]});
  const pair=(ctrl,dep,cond)=>{
    dep.showIf=blk(cond(ctrl));
    dataFields.push(ctrl,dep);
  };
  rows.push({id:uid('r'),fields:[df('heading',{label:'Show Fields Test Form',span:12})]});
  rows.push({id:uid('r'),fields:[df('paragraph',{span:12,label:'Each field reveals a follow-up field when its rule is met. In Build, a blue \u201c\u{1F441} \u2026\u201d badge under a revealed field shows its rule (Build only, never on Preview). Edit rules in the toolbar\u2019s \u201cShow Fields\u201d button.'})]});

  // 1 — First Name (Short text) equals "Jay"
  pair(
    df('text',{label:'First Name',placeholder:'e.g. Jay'}),
    df('text',{label:'What is your last name?'}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'seq',value:'Jay'}));
  // 2 — Address (Long text) equals "San Diego, CA"
  pair(
    df('textarea',{label:'Address',placeholder:'e.g. San Diego, CA'}),
    df('text',{label:'Which neighborhood are you in?'}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'seq',value:'San Diego, CA'}));
  // 3 — Email equals "jay.morgan@example.com"
  pair(
    df('email',{label:'Email Address',placeholder:'e.g. jay.morgan@example.com'}),
    df('radio',{label:'May we send reminders to this email?',options:['Yes','No']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'seq',value:'jay.morgan@example.com'}));
  // 4 — Phone equals "(619) 555-0142"
  pair(
    df('phone',{label:'Phone Number',placeholder:'e.g. (619) 555-0142'}),
    df('radio',{label:'Can this number receive text messages?',options:['Yes','No']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'seq',value:'(619) 555-0142'}));
  // 5 — Years of Experience (Number) equals 8  (try "is at least 5" for a range)
  pair(
    df('number',{label:'Years of Experience',placeholder:'e.g. 8'}),
    df('select',{label:'What field is your experience in?',options:['Clinical / Therapy','Medical / Nursing','Administration','Billing / RCM','Technology','Other']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'eq',value:8}));
  // 6 — Website equals "https://www.jaymorgan.com"
  pair(
    df('url',{label:'Website',placeholder:'e.g. https://www.jaymorgan.com'}),
    df('radio',{label:'Is this a personal or business site?',options:['Personal','Business']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'seq',value:'https://www.jaymorgan.com'}));
  // 7 — State (searchable State field) equals "California (CA)"
  pair(
    df('state',{label:'State'}),
    df('select',{label:'Which California city?',options:['Los Angeles','San Diego','San Francisco','Sacramento','San Jose','Other']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'eq',value:[US_STATES.indexOf('California (CA)')]}));
  // 8 — Preferred Contact Method (Radio) equals "Email"
  const contactOpts=['Email','Phone','Text','Mail'];
  pair(
    df('radio',{label:'Preferred Contact Method',options:contactOpts.slice()}),
    df('email',{label:'What\u2019s the best email to reach you?'}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'eq',value:[contactOpts.indexOf('Email')]}));
  // 9 — Interests (Checkboxes) contains "Hiking"
  const interestOpts=['Hiking','Photography','Travel','Cooking','Reading'];
  pair(
    df('checkboxes',{label:'Interests',options:interestOpts.slice()}),
    df('textarea',{label:'Which trails do you hike most?'}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'includes',value:[interestOpts.indexOf('Hiking')]}));
  // 10 — Comments (Single textbox) is not empty
  pair(
    df('text',{label:'Comments',placeholder:'Type anything\u2026'}),
    df('radio',{label:'Would you like a follow-up call?',options:['Yes','No']}),
    ctrl=>({type:'field',fieldId:ctrl.id,op:'filled',value:''}));

  // Lay the 10 controller→dependent pairs out 4 across (span 3) per row, in
  // chronological order. The Show Fields rules are kept (configured), so each
  // dependent reveals on its controller's condition; the heading and intro
  // paragraph above stay full-width.
  dataFields.forEach(f=>{ f.span=3; });
  for(let i=0;i<dataFields.length;i+=4){ rows.push({id:uid('r'),fields:dataFields.slice(i,i+4)}); }

  const form={
    id:uid('form'), title:TITLE,
    desc:'', // ship with a blank description — placeholder shows in the builder
    rows, weightGroups:[], scoringGroups:[],scoringSections:[], visibilityGroups:[],
    ownerId:(typeof CURRENT_USER_ID!=='undefined'?CURRENT_USER_ID:(USERS[0]&&USERS[0].id)),
    shares:[], showAllPages:true, seedVersion:SEED_VER, updatedAt:Date.now()
  };
  FORMS.push(form); persistForms();
  return form;
}

/* ============================================================
   RICH SAMPLE FORMS — five varied, fully-populated forms for testing
   cross-form search ("All forms" toggle) and conditional visibility.
   Each form contributes DIFFERENT controller field types (select, radio,
   number, rating, toggle, date, scored sections) so the cross-form search
   returns a diverse, realistic set tagged with each form's title.
   Stored in FORMS (localStorage) like any other form.
   ============================================================ */
function buildRichForm(spec){
  const mk=(type,over)=>defaultField(type,Object.assign({},over));
  const fields={};      // name -> field (so showIf can reference by id)
  const rows=[];
  let section=null;
  spec.rows.forEach(rowDef=>{
    const rowFields=rowDef.map(fd=>{
      const f=mk(fd.type,{
        label:fd.label,
        span:fd.span||defaultSpanFor(fd.type),
        required:!!fd.required
      });
      if(fd.options){ f.options=fd.options.slice(); }
      if(fd.optionScores){ f.optionScores=fd.optionScores.slice(); }
      if(fd.help){ f.help=fd.help; }
      if(fd.placeholder){ f.placeholder=fd.placeholder; }
      if(fd.toggleOn){ f.toggleOn=fd.toggleOn; }
      if(fd.toggleOff){ f.toggleOff=fd.toggleOff; }
      if(fd.max!=null){ f.max=fd.max; }
      if(fd.sampleValue!==undefined){ f.sampleValue=fd.sampleValue; }
      if(fd.ref){ fields[fd.ref]=f; }
      return f;
    });
    rows.push({id:uid('r'),fields:rowFields});
  });
  // Build a scoring section if requested.
  let sections=[];
  if(spec.score){
    const ids=spec.score.refs.map(r=>fields[r]&&fields[r].id).filter(Boolean);
    section={id:uid('sect'),name:spec.score.name,fieldIds:ids,bands:(spec.score.bands||[])};
    sections=[section];
  }
  // Apply conditional showIf rules now that ids exist.
  (spec.conditions||[]).forEach(cond=>{
    const target=fields[cond.target];
    if(!target) return;
    if(cond.kind==='field'){
      const ctrl=fields[cond.on];
      if(ctrl) target.showIf={type:'field',fieldId:ctrl.id,op:cond.op,value:cond.value};
    } else if(cond.kind==='score' && section){
      target.showIf={type:'score',sectionId:section.id,op:cond.op,value:cond.value};
    }
  });
  return {
    id:uid('form'),
    title:spec.title,
    desc:spec.desc||'',
    rows,
    weightGroups:[],
    scoringSections:sections,
    visibilityGroups:[],
    ownerId:CURRENT_USER_ID,
    shares:[],
    showAllPages:false,
    sampleRich:true,
    updatedAt:Date.now()
  };
}

function seedRichSampleForms(silent){
  if(!canCreateForms()){ toast('Viewers can\'t create forms'); return; }
  const F5=['Never','Rarely','Sometimes','Often','Always'];
  const F5s=[0,1,2,3,4];
  const PHQ4=['Not at all','Several days','More than half the days','Nearly every day']; const PHQ4s=[0,1,2,3];
  const specs=[
    {
      title:'Sample - All Field Types (Show Fields test)',
      desc:'One of every condition-applicable field type, with real names - for testing Show Fields rules.',
      rows:[
        [{type:'heading',label:'All Field Types - Test Bench'}],
        [{type:'text',label:'First name',span:6,ref:'fname',sampleValue:'Jordan'},{type:'text',label:'Last name',span:6,ref:'lname',sampleValue:'Rivera'}],
        [{type:'email',label:'Email address',span:6,sampleValue:'jordan@example.com'},{type:'phone',label:'Mobile phone',span:6,sampleValue:'(619) 555-0142'}],
        [{type:'url',label:'Website',span:6,sampleValue:'https://example.com'},{type:'date',label:'Date of birth',span:6,sampleValue:'1990-04-12'}],
        [{type:'number',label:'Age',span:6,ref:'age',sampleValue:34},{type:'rating',label:'Satisfaction (1-5)',span:6,max:5,ref:'rating',sampleValue:4}],
        [{type:'range',label:'Pain level (0-10)',span:12,max:10,ref:'pain',sampleValue:6}],
        [{type:'radio',label:'Preferred contact method',span:12,options:['Phone call','Text message','Email'],ref:'contact',sampleValue:'Email'}],
        [{type:'select',label:'State',span:6,options:['California','New York','Texas','Florida'],ref:'state',sampleValue:'California'},{type:'toggle',label:'New patient?',span:6,toggleOn:'Yes',toggleOff:'No',ref:'newpt',sampleValue:true}],
        [{type:'checkboxes',label:'Current symptoms',span:12,options:['Anxiety','Low mood','Insomnia','Fatigue']}],
        [{type:'textarea',label:'Additional notes',span:12,ref:'notes',sampleValue:'Sample free-text notes for testing.'}]
      ]
    },
    {
      title:'Sample - Depression Screener (PHQ-9)',
      desc:'A fully scored screener with sample answers - for testing Scoring and score-based conditions.',
      rows:[
        [{type:'heading',label:'PHQ-9 Depression Screener',help:'Over the last 2 weeks, how often have you been bothered by the following?'}],
        [{type:'radio',label:'Little interest or pleasure in doing things',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p1',sampleValue:'More than half the days'}],
        [{type:'radio',label:'Feeling down, depressed, or hopeless',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p2',sampleValue:'More than half the days'}],
        [{type:'radio',label:'Trouble falling/staying asleep, or sleeping too much',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p3',sampleValue:'Nearly every day'}],
        [{type:'radio',label:'Feeling tired or having little energy',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p4',sampleValue:'Nearly every day'}],
        [{type:'radio',label:'Poor appetite or overeating',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p5',sampleValue:'Several days'}],
        [{type:'radio',label:'Feeling bad about yourself',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p6',sampleValue:'More than half the days'}],
        [{type:'radio',label:'Trouble concentrating on things',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p7',sampleValue:'Several days'}],
        [{type:'radio',label:'Moving/speaking slowly, or being restless',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p8',sampleValue:'Not at all'}],
        [{type:'radio',label:'Thoughts that you would be better off dead, or of hurting yourself',span:12,options:PHQ4,optionScores:PHQ4s,ref:'p9',sampleValue:'Several days'}],
        [{type:'textarea',label:'Clinician note - elevated risk, review before session',span:12,help:'Shown when PHQ-9 total is at least 10.',ref:'note'}]
      ],
      score:{name:'PHQ-9 total',refs:['p1','p2','p3','p4','p5','p6','p7','p8','p9'],bands:[
        {min:0,max:4,label:'Minimal',severity:'low'},
        {min:5,max:9,label:'Mild',severity:'low'},
        {min:10,max:14,label:'Moderate',severity:'mod'},
        {min:15,max:27,label:'Severe',severity:'high'}
      ]},
      conditions:[{kind:'score',target:'note',op:'gte',value:10}]
    },
    {
      title:'Sample — New Patient Intake',
      desc:'',
      rows:[
        [{type:'heading',label:'New Patient Intake'}],
        [{type:'text',label:'Full legal name',span:6,required:true,ref:'name',sampleValue:'Jordan A. Rivera'},{type:'date',label:'Date of birth',span:6,ref:'dob',sampleValue:'1990-04-15'}],
        [{type:'email',label:'Email address',span:6,sampleValue:'jordan.rivera@example.com'},{type:'phone',label:'Mobile phone',span:6,sampleValue:'(619) 555-0142'}],
        [{type:'select',label:'Preferred contact method',span:6,options:['Phone call','Text message','Email','Patient portal'],ref:'contact',sampleValue:'Text message'},
         {type:'select',label:'Insurance type',span:6,options:['Self-pay','Commercial / PPO','Commercial / HMO','Medicare','Medicaid','Other'],ref:'insurance',sampleValue:'Commercial / PPO'}],
        [{type:'text',label:'Insurance member ID',span:12,help:'Shown only when an insurance type other than self-pay is selected.',ref:'memberid',sampleValue:'PPO-88471203'}],
        [{type:'toggle',label:'Is this your first visit with us?',span:12,toggleOn:'Yes',toggleOff:'No',ref:'firstvisit',sampleValue:true}],
        [{type:'textarea',label:'Who referred you to our practice?',span:12,help:'Shown for first-time patients.',ref:'referredby',sampleValue:'Referred by Dr. Patel at Mission Valley Family Medicine.'}],
        [{type:'paragraph',label:'Reason for today\u2019s visit',span:12,placeholder:'Briefly describe what brings you in today\u2026',sampleValue:'Follow-up on persistent insomnia and daytime fatigue over the past two months.'}]
      ],
      conditions:[
        {kind:'field',target:'memberid',on:'insurance',op:'neq',value:0},
        {kind:'field',target:'referredby',on:'firstvisit',op:'eq',value:1}
      ]
    },
    {
      title:'Sample — Sleep Quality Assessment',
      desc:'',
      rows:[
        [{type:'heading',label:'Sleep Quality Assessment',help:'Over the past month, how often have you experienced the following?'}],
        [{type:'rating',label:'Overall sleep quality (1 = poor, 5 = excellent)',span:12,max:5,ref:'quality',sampleValue:2}],
        [{type:'radio',label:'Trouble falling asleep within 30 minutes',span:12,options:F5,optionScores:F5s,ref:'q1',sampleValue:'Often'}],
        [{type:'radio',label:'Waking during the night or early morning',span:12,options:F5,optionScores:F5s,ref:'q2',sampleValue:'Sometimes'}],
        [{type:'radio',label:'Feeling unrested even after sleeping',span:12,options:F5,optionScores:F5s,ref:'q3',sampleValue:'Often'}],
        [{type:'radio',label:'Daytime drowsiness affecting activities',span:12,options:F5,optionScores:F5s,ref:'q4',sampleValue:'Always'}],
        [{type:'number',label:'Average hours of sleep per night',span:6,ref:'hours',sampleValue:5},
         {type:'select',label:'Caffeine after 2pm?',span:6,options:['None','1 serving','2+ servings'],ref:'caffeine',sampleValue:'2+ servings'}],
        [{type:'textarea',label:'Clinician note — discuss sleep hygiene & possible referral',span:12,help:'Appears when sleep-disturbance score \u2265 8.',ref:'note'}]
      ],
      score:{name:'Sleep-disturbance score',refs:['q1','q2','q3','q4'],bands:[
        {min:0,max:7,label:'Minimal disturbance',severity:'low'},
        {min:8,max:11,label:'Moderate disturbance',severity:'mod'},
        {min:12,max:16,label:'Severe disturbance',severity:'high'}
      ]},
      conditions:[{kind:'score',target:'note',op:'gte',value:8}]
    },
    {
      title:'Sample — Medication Refill Request',
      desc:'',
      rows:[
        [{type:'heading',label:'Medication Refill Request'}],
        [{type:'text',label:'Patient name',span:6,required:true,sampleValue:'Jordan A. Rivera'},{type:'date',label:'Date of request',span:6,sampleValue:'2026-06-05'}],
        [{type:'text',label:'Medication name & strength',span:8,ref:'med',sampleValue:'Sertraline 50 mg tablet'},{type:'number',label:'Quantity requested',span:4,sampleValue:30}],
        [{type:'toggle',label:'Is this a controlled substance?',span:12,toggleOn:'Yes',toggleOff:'No',ref:'controlled',sampleValue:false}],
        [{type:'textarea',label:'Controlled-substance justification & last visit date',span:12,help:'Required when controlled substance = Yes.',ref:'justify'}],
        [{type:'text',label:'Preferred pharmacy name',span:6,sampleValue:'CVS Pharmacy #4821'},{type:'phone',label:'Pharmacy phone',span:6,sampleValue:'(619) 555-0199'}],
        [{type:'select',label:'Pickup or delivery?',span:6,options:['Pickup','Mail delivery'],ref:'fulfill',sampleValue:'Pickup'}]
      ],
      conditions:[{kind:'field',target:'justify',on:'controlled',op:'eq',value:1}]
    },
    {
      title:'Sample — Telehealth Visit Consent',
      desc:'',
      rows:[
        [{type:'heading',label:'Telehealth Informed Consent'}],
        [{type:'paragraph',label:'Consent statement',span:12,placeholder:'I understand that telehealth involves the use of electronic communications to enable a provider to deliver care remotely\u2026'}],
        [{type:'select',label:'State you will be located in during the visit',span:6,options:['California','Arizona','Nevada','Oregon','Washington','Other'],ref:'state',sampleValue:'California'}],
        [{type:'text',label:'If \u201cOther,\u201d which state?',span:6,ref:'otherstate'}],
        [{type:'toggle',label:'I consent to receive care via telehealth',span:12,toggleOn:'I agree',toggleOff:'I do not',ref:'agree',sampleValue:true}],
        [{type:'text',label:'Full name (as signature)',span:6,ref:'sig',sampleValue:'Jordan A. Rivera'},{type:'date',label:'Date',span:6,sampleValue:'2026-06-06'}],
        [{type:'signature',label:'Signature',span:12,help:'Appears once you have agreed to the consent.',ref:'sigpad'}]
      ],
      conditions:[
        {kind:'field',target:'otherstate',on:'state',op:'eq',value:5},
        {kind:'field',target:'sigpad',on:'agree',op:'eq',value:1}
      ]
    },
    {
      title:'Sample — Post-Visit Satisfaction Survey',
      desc:'',
      rows:[
        [{type:'heading',label:'How did we do?',help:'Your feedback helps us improve. This survey is anonymous.'}],
        [{type:'rating',label:'Overall satisfaction with your visit',span:12,max:5,ref:'sat',sampleValue:4}],
        [{type:'select',label:'How likely are you to recommend us?',span:12,options:['Very unlikely','Unlikely','Neutral','Likely','Very likely'],optionScores:[0,1,2,3,4],ref:'nps',sampleValue:'Likely'}],
        [{type:'checkboxes',label:'What went well?',span:12,options:['Short wait time','Friendly staff','Clear explanations','Felt heard','Easy scheduling'],sampleValue:['Friendly staff','Clear explanations','Felt heard']}],
        [{type:'radio',label:'Did you get the care you needed?',span:6,options:['Yes','Partially','No'],ref:'gotcare',sampleValue:'Yes'},
         {type:'select',label:'Visit type',span:6,options:['In person','Telehealth'],sampleValue:'In person'}],
        [{type:'textarea',label:'We\u2019re sorry — what could we have done better?',span:12,help:'Appears when satisfaction is rated low or care needs weren\u2019t fully met.',ref:'improve'}]
      ],
      conditions:[{kind:'field',target:'improve',on:'gotcare',op:'neq',value:0}]
    }
  ];
  let added=0;
  specs.forEach(spec=>{ if(FORMS.some(f=>f.title===spec.title)) return; FORMS.push(buildRichForm(spec)); added++; });
  persistForms();
  if(!silent) toast(added?('Added '+added+' sample form'+(added>1?'s':'')):'Sample forms already exist');
  try{ if(document.getElementById('dispmgr-modal')&&document.getElementById('dispmgr-modal').classList.contains('open')) renderDisplayManager(); }catch(e){}
  try{ if(document.getElementById('forms-modal') && document.getElementById('forms-modal').classList.contains('open')) renderFormsListAll(); }catch(e){}
  try{ renderFormsList(); }catch(e){}
}

function deleteForm(id){
  const f=FORMS.find(x=>x.id===id);
  if(!f) return;
  if(!canDeleteForm(f)){ toast('Only the owner or an admin can delete this form'); return; }
  if(!confirm('Delete "'+(f.title&&f.title.trim()?f.title:'Untitled form')+'"? This cannot be undone.')) return;
  FORMS=FORMS.filter(x=>x.id!==id);
  persistForms();
  // If we deleted the form currently open, find another the current user can
  // see — or scaffold a blank one if they're allowed to create.
  if(FORM.id===id){
    const visible=FORMS.filter(canViewForm).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(visible.length){ loadFormIntoEditor(visible[0].id, true); }
    else if(canCreateForms()){ scaffoldEmptyForm(); }
    else { showNoAccessState(); }
  }
  renderFormsList();
  toast('Form deleted');
}

function timeAgo(ts){
  if(!ts) return '';
  const s=Math.floor((Date.now()-ts)/1000);
  if(s<60) return 'just now';
  const m=Math.floor(s/60); if(m<60) return m+' min ago';
  const h=Math.floor(m/60); if(h<24) return h+(h===1?' hour ago':' hours ago');
  const d=Math.floor(h/24); if(d<7) return d+(d===1?' day ago':' days ago');
  return new Date(ts).toLocaleDateString();
}

function countFields(f){ return (f.rows||[]).reduce((n,r)=>n+(r.fields?r.fields.length:0),0); }

function renderFormsList(){
  const mount=document.getElementById('forms-list');
  const countEl=document.getElementById('forms-mgr-count');
  // Visible-to-current-user filter still applies first — rights always win.
  let visible=FORMS.filter(function(f){return canViewForm(f) && !f.sysOverrideKey;});

  // Then the sidebar group filter.
  if(FILTER_GROUP_ID==='ungrouped'){
    visible=visible.filter(f=>!f.groupId);
  } else if(FILTER_GROUP_ID!=='all'){
    visible=visible.filter(f=>f.groupId===FILTER_GROUP_ID);
  }

  // Search runs last so the user sees "20 of 47 in Onboarding" semantics.
  const totalBeforeSearch=visible.length;
  const matched=[]; // [{form, where}]
  if(FORM_SEARCH){
    visible.forEach(f=>{
      const m=matchForm(f, FORM_SEARCH);
      if(m.matches) matched.push({form:f, where:m.where});
    });
  } else {
    visible.forEach(f=>matched.push({form:f, where:null}));
  }

  // Newest first
  matched.sort((a,b)=>(b.form.updatedAt||0)-(a.form.updatedAt||0));

  // ----- Pagination -----
  // Clamp the current page into range (the list may have shrunk since we last
  // rendered — e.g. after a delete on the last page).
  const totalPages=Math.max(1, Math.ceil(matched.length/FORMS_PER_PAGE));
  if(FORMS_PAGE>totalPages) FORMS_PAGE=totalPages;
  if(FORMS_PAGE<1) FORMS_PAGE=1;
  const pageStart=(FORMS_PAGE-1)*FORMS_PER_PAGE;
  const pageItems=matched.slice(pageStart, pageStart+FORMS_PER_PAGE);

  // Toolbar count text — gives the user a sense of scale even with many forms.
  if(countEl){
    if(FORM_SEARCH){
      countEl.textContent=`${matched.length} of ${totalBeforeSearch} match`;
    } else {
      countEl.textContent=`${matched.length} form${matched.length===1?'':'s'}`;
    }
  }

  if(matched.length===0){
    const ico=`<svg class="fe-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    let title, sub;
    if(FORM_SEARCH){
      title='No matches';
      sub=`Nothing matches "${esc(FORM_SEARCH)}" in this view. Try a different search or pick "All forms".`;
    } else if(FILTER_GROUP_ID!=='all' && FILTER_GROUP_ID!=='ungrouped'){
      const g=findGroup(FILTER_GROUP_ID);
      title='No forms in this group';
      sub=g?`Drag a form here, or use the group chip on any form to add it to "${esc(g.name)}".`:'Group not found.';
    } else if(FILTER_GROUP_ID==='ungrouped'){
      title='No ungrouped forms';
      sub='Every visible form is already in a group.';
    } else if(canCreateForms()){
      title='No forms yet';
      sub='Click "+ New form" to start.';
    } else {
      title='No forms shared with you';
      sub='Ask an editor or admin to share one.';
    }
    mount.innerHTML=`<div class="forms-empty">${ico}<div class="fe-title">${esc(title)}</div><div class="fe-sub">${sub}</div></div>`;
    return;
  }

  let html='';
  const q=FORM_SEARCH;
  pageItems.forEach(({form:f, where})=>{
    const rawTitle=f.title&&f.title.trim()?f.title:'Untitled form';
    // Escape FIRST, then highlight — the highlight wrapper is the only HTML
    // we inject, and everything inside it came from esc(), so it's safe.
    const title=highlightHit(esc(rawTitle), q);
    const n=countFields(f);
    const isCurrent=f.id===FORM.id;
    const access=getAccess(f);
    const canEdit=canEditForm(f);
    const canDel=canDeleteForm(f);
    const canShare=canShareForm(f);
    const owner=USERS.find(u=>u.id===f.ownerId);
    const ownerLabel=owner?(owner.id===CURRENT_USER_ID?'You':owner.name):'Unknown';

    let accessPill='';
    if(access==='admin' && f.ownerId!==CURRENT_USER_ID) accessPill='<span class="access-badge">Admin</span>';
    else if(access==='owner') accessPill='<span class="access-badge owner">Owner</span>';
    else if(access==='edit') accessPill='<span class="access-badge edit">Can edit</span>';
    else if(access==='view') accessPill='<span class="access-badge view">View only</span>';

    // Group chip: shows the assigned group (or "+ Add to group" placeholder).
    // Clicking opens the picker popover. The chip is interactive only when
    // the user can edit the form — otherwise it shows as a static label.
    const grp=findGroup(f.groupId);
    let chip='';
    if(canEdit){
      chip = grp
        ? `<button class="group-chip" onclick="openGroupPicker(event,'${f.id}')"><span class="gc-dot" style="background:${esc(grp.color)}"></span>${esc(grp.name)}</button>`
        : `<button class="group-chip placeholder" onclick="openGroupPicker(event,'${f.id}')"><span class="gc-dot"></span>+ Add to group</button>`;
    } else if(grp){
      // Non-editors still see which group the form lives in, but can't change it.
      chip = `<span class="group-chip" style="cursor:default"><span class="gc-dot" style="background:${esc(grp.color)}"></span>${esc(grp.name)}</span>`;
    }

    // Match-source line — only shown for non-title matches, so the user knows
    // why a form they didn't expect appeared (e.g. "matched field: phone").
    let matchLine='';
    if(q && where && where!=='title'){
      matchLine=`<div class="form-row-match"><span class="form-row-match-tag">Match</span><span>${highlightHit(esc(where), q)}</span></div>`;
    }

    // Whole row is draggable so it can be dropped onto a group in the sidebar.
    // We set draggable only when the user can edit (otherwise dragging is a tease).
    const dragAttr=canEdit?` draggable="true" data-form-id="${f.id}"`:'';

    html+=`<div class="form-row-item${isCurrent?' current':''}"${dragAttr}>
      <div class="form-row-info" onclick="loadFormIntoEditor('${f.id}'); closeModal('forms-modal')">
        <div class="form-row-title">${title}${isCurrent?' <span class="form-row-badge">Editing</span>':''} ${accessPill}</div>
        <div class="form-row-meta">${n} field${n===1?'':'s'} · ${timeAgo(f.updatedAt)}</div>
        <div class="form-row-owner">Owned by ${esc(ownerLabel)}${shareTotalCount(f)?' · Shared with '+shareTotalCount(f):''}</div>
        ${chip?`<div class="form-row-chip-line">${chip}</div>`:''}
        ${matchLine}
      </div>
      <div class="form-row-actions">
        ${canShare?`<button class="share" title="Share" onclick="closeModal('forms-modal');openShareModal('${f.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>`:''}
        <button class="edit" title="${canEdit?'Edit':'View only'}" onclick="loadFormIntoEditor('${f.id}'); closeModal('forms-modal')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="del" title="${canDel?'Delete':'No permission to delete'}" ${canDel?'':'disabled'} onclick="${canDel?`deleteForm('${f.id}')`:''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
      </div>
    </div>`;
  });
  // Pagination controls — only shown when there's more than one page.
  if(totalPages>1){
    const prevDisabled=FORMS_PAGE<=1?'disabled':'';
    const nextDisabled=FORMS_PAGE>=totalPages?'disabled':'';
    // Build compact numbered buttons with ellipses for large ranges.
    let nums='';
    const windowSize=5;
    let lo=Math.max(1, FORMS_PAGE-Math.floor(windowSize/2));
    let hi=Math.min(totalPages, lo+windowSize-1);
    lo=Math.max(1, Math.min(lo, hi-windowSize+1));
    if(lo>1){
      nums+=`<button class="pg-num" onclick="gotoFormsPage(1)">1</button>`;
      if(lo>2) nums+=`<span class="pg-ellipsis">…</span>`;
    }
    for(let p=lo;p<=hi;p++){
      nums+=`<button class="pg-num${p===FORMS_PAGE?' active':''}" onclick="gotoFormsPage(${p})">${p}</button>`;
    }
    if(hi<totalPages){
      if(hi<totalPages-1) nums+=`<span class="pg-ellipsis">…</span>`;
      nums+=`<button class="pg-num" onclick="gotoFormsPage(${totalPages})">${totalPages}</button>`;
    }
    html+=`<div class="forms-pagination">
      <button class="pg-btn" ${prevDisabled} onclick="gotoFormsPage(${FORMS_PAGE-1})" title="Previous page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div class="pg-nums">${nums}</div>
      <button class="pg-btn" ${nextDisabled} onclick="gotoFormsPage(${FORMS_PAGE+1})" title="Next page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>`;
  }
  mount.innerHTML=html;
  bindFormRowDnD();
}

/* Jump to a page in the Forms Manager list. Clamped on render, so passing an
   out-of-range value (e.g. from a disabled-button edge) is harmless. */
function gotoFormsPage(p){
  FORMS_PAGE=p;
  renderFormsList();
  // Scroll the list back to top so the user sees the start of the new page.
  const mount=document.getElementById('forms-list');
  if(mount) mount.scrollTop=0;
}

/* Bind drag handlers on the list rows. We use the global `draggedData` slot
   (already used for palette/block drags) so the existing infrastructure plays
   nice — we just have to make sure we tag drags as type:'form' and clear
   the slot on drop/dragend. */
function bindFormRowDnD(){
  document.querySelectorAll('.form-row-item[draggable="true"]').forEach(row=>{
    row.addEventListener('dragstart', e=>{
      const fid=row.dataset.formId;
      const f=FORMS.find(x=>x.id===fid);
      draggedData={type:'form', formId:fid, previousGroupId: f?.groupId||null};
      e.dataTransfer.effectAllowed='move';
      try{ e.dataTransfer.setData('text/plain', JSON.stringify(draggedData)); }catch(err){}
      row.classList.add('dragging');
    });
    row.addEventListener('dragend', e=>{
      row.classList.remove('dragging');
      // Clear on next tick so any in-flight drop handlers still see the data.
      setTimeout(()=>{ if(draggedData && draggedData.type==='form') draggedData=null; },0);
    });
  });
}

function openForms(){ formsTab('mine'); }
/* Tab switch between the My Forms manager and the System Forms (instruments)
   modal. Each tab simply opens its own modal and closes the other, so the two
   read as one tabbed surface. (Merged from JAY build.) */
function formsTab(which){
  if(which==='system'){ closeModal('forms-modal'); closeModal('form-style-modal'); openInstruments(); }
  else if(which==='style'){ closeModal('forms-modal'); closeModal('instruments-modal'); openFormStyle(); }
  else { closeModal('instruments-modal'); closeModal('form-style-modal'); openFormsManager(); }
}

function openFormsManager(){
  // Reset to a clean state each time the manager opens. Leaving stale search
  // text or a stale group filter across opens is more confusing than helpful.
  FORM_SEARCH='';
  const input=document.getElementById('forms-search-input');
  if(input){ input.value=''; }
  const wrap=document.getElementById('forms-search');
  if(wrap){ wrap.classList.remove('has-value'); }
  // Validate the saved group filter — the group might have been deleted since.
  if(FILTER_GROUP_ID!=='all' && FILTER_GROUP_ID!=='ungrouped' && !findGroup(FILTER_GROUP_ID)){
    FILTER_GROUP_ID='all';
  }
  renderFormsListAll();
  // Hide the "+ New form" footer button for viewers — keeps the surface
  // consistent with the topbar treatment.
  const footBtn=document.querySelector('#forms-modal .modal-foot .btn.primary');
  if(footBtn) footBtn.style.display=canCreateForms()?'':'none';
  openModal('forms-modal');
  // Autofocus the search input after a tick so the cursor lands where the user
  // expects when juggling thousands of forms.
  setTimeout(()=>{ document.getElementById('forms-search-input')?.focus(); }, 50);
}

/* ── Main data boot ───────────────────────────────────────────────────────
   Reads the persisted collections, seeds first-run defaults, opens the last
   form, and binds top-level UI listeners. Wrapped in a function so the boot can
   be DEFERRED until data is available: in the MV3 extension the working store is
   empty until the host's postMessage seed lands (runtime.js sets
   window.__credifySeedPending); the hosted web app already has a populated
   localStorage (preboot.js) and runs it immediately. The launcher is at the end
   of this block. */
function __credifyMainBoot(){
const BUILD_STAMP='06-09-26 05:15PM PDT';
try{var _bs=document.getElementById('build-stamp'); if(_bs) _bs.textContent='build '+BUILD_STAMP;}catch(e){}
const stored=loadBlocks();
BLOCKS = stored || [];
seedDemoBlocks(); // demo blocks of random prefillable fields (idempotent, version-stamped)
renderFieldsTab();
renderBlocksTab();

// Load users — seed a default roster on the very first run so the demo has
// someone to be. Persist immediately so the seeded ids stay stable.
USERS = loadUsers() || [];
if(!USERS.length){ seedDefaultUsers(); }
CLIENTS = loadClients() || [];
if(!CLIENTS.length){ seedDefaultClients(); }
// Clinical roles / disciplines (SUD, Psychotherapy, …) — seed once on first run.
CLINICAL_ROLES = loadClinicalRoles() || [];
if(!CLINICAL_ROLES.length){ seedClinicalRoles(); }

// Restore the last-active user, defaulting to the first user (which is the
// admin in the seed roster — gives first-time users full permissions to try
// everything).
try{
  const lastUid=localStorage.getItem(CURRENT_USER_KEY);
  if(lastUid && USERS.some(u=>u.id===lastUid)) CURRENT_USER_ID=lastUid;
}catch(e){}
if(!CURRENT_USER_ID) CURRENT_USER_ID=USERS[0].id;
renderUserChip();

// Load the forms collection
FORMS = loadForms() || [];

// Load form groups (the clusters forms can belong to). No seeding here — if
// the user has no groups, the sidebar gracefully shows "No groups yet" and the
// "+" button is the way in.
GROUPS = loadGroups() || [];

// Backfill ownership on any pre-existing forms that don't have it yet.
// Without this, legacy forms would be invisible to everyone except admins.
// Default policy: orphan forms belong to the first admin (or first user).
const firstAdmin=USERS.find(u=>u.role==='admin')||USERS[0];
let backfilled=false;
FORMS.forEach(f=>{
  if(!f.ownerId){ f.ownerId=firstAdmin.id; backfilled=true; }
  if(!f.shares) f.shares=[];
  // Initialize scoring container so iteration/access elsewhere never hits
  // undefined on legacy forms saved before scoring shipped.
  if(!f.scoringSections){ f.scoringSections=[]; backfilled=true; }
  // If a form references a group that's since been deleted, clear the stale
  // reference. Cheap to do here and prevents "ghost group" filtering bugs.
  if(f.groupId && !GROUPS.some(g=>g.id===f.groupId)){ delete f.groupId; backfilled=true; }
});
if(backfilled) persistForms();

// One-time migration: pull the old single-draft into the collection if present
try{
  const oldRaw=localStorage.getItem(OLD_DRAFT_KEY);
  if(oldRaw){
    const old=JSON.parse(oldRaw);
    if(old && Array.isArray(old.rows) && !formIsEmpty(old)){
      old.id=old.id||uid('form');
      old.updatedAt=old.updatedAt||Date.now();
      if(!old.weightGroups) old.weightGroups=[];
      if(!old.ownerId) old.ownerId=firstAdmin.id;
      if(!old.shares) old.shares=[];
      FORMS.push(old);
      persistForms();
    }
    localStorage.removeItem(OLD_DRAFT_KEY);
  }
}catch(e){}

// Seed the autopopulation test forms (Source ×2, Destination ×2) if missing.
seedAutopopTestForms();

// Seed the 5 data-rich Show Fields sample forms (intake, sleep, refill, consent,
// survey) with realistic answers. Previously these only seeded lazily the first
// time the Show Fields manager opened; seeding at boot keeps them always present
// for cross-form search and the "Open a form when met" picker. Idempotent (skips
// any sample whose title already exists) and silent (no toast on load). Seeded
// before the test bench below so that bench stays the most-recent default form.
try{ if(typeof seedRichSampleForms==='function' && typeof canCreateForms==='function' && canCreateForms()) seedRichSampleForms(true); }catch(e){}

// Migration (06-09-26): delivered forms must ship with a BLANK description.
// Existing localStorage may still carry the descriptions earlier builds seeded;
// blank a form's desc only when it exactly matches a string we shipped, so a
// description the user typed themselves is never touched. Idempotent.
try{
  const _OLD_SEED_DESCS=new Set([
    'Conditional-visibility test bench \u2014 10 controller\u2192dependent pairs.',
    'Demographics, insurance, and reason for visit. Several controller fields (insurance type, contact method, new-patient toggle).',
    'Scored sleep screen with a rating, frequency questions, and a follow-up that appears on a high score.',
    'Short request form with a controlled-substance toggle and pharmacy fields.',
    'Consent form with a signature, agreement toggle, and state-of-residence selector.',
    'Feedback survey with NPS rating, multiple-choice, and a comment box that appears on low ratings.',
    'How satisfied are you with our service?',
    'Internal scoring template.',
    'Comprehensive depression intake: demographics, history, and the full PHQ-9 with severity banding.',
    'Anxiety intake: demographics, lifestyle factors, and the GAD-7 with severity banding.',
    'Alcohol and substance use intake with consumption scoring and risk banding.',
    'Trauma history and an 8-item PTSD symptom screen scored 0\u20134 per item.',
    'Whole-person wellbeing intake spanning mood, sleep, lifestyle, and social function.'
  ]);
  let _descChanged=false;
  FORMS.forEach(f=>{ if(f && _OLD_SEED_DESCS.has(f.desc)){ f.desc=''; _descChanged=true; } });
  if(_descChanged) persistForms();
}catch(e){}

// Show Fields starts clean — no demo form or preset conditional rules.
// Remove any previously-seeded "Show Fields Test Form" (and its old-title
// variant) from storage so existing users also get the clean slate.
(function clearShowFieldsDemo(){
  try{
    let changed=false;
    for(let i=FORMS.length-1;i>=0;i--){
      const t=FORMS[i] && FORMS[i].title;
      if(t==='Show Fields Test Form' || t==='Display Fields Test Form'){ FORMS.splice(i,1); changed=true; }
    }
    if(changed && typeof persistForms==='function') persistForms();
  }catch(e){}
})();

// Decide which form to open: last-open (if still visible to current user),
// else most-recent visible, else a seeded demo. The visibility filter is
// important — without it a viewer-mode reload could try to open a form the
// user has no access to.
let toOpen=null;
try{
  const lastId=localStorage.getItem(LAST_FORM_KEY);
  const lastForm=lastId?FORMS.find(f=>f.id===lastId):null;
  if(lastForm && canViewForm(lastForm)) toOpen=lastId;
}catch(e){}
if(!toOpen){
  const visible=FORMS.filter(canViewForm).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  if(visible.length) toOpen=visible[0].id;
}

if(toOpen){
  loadFormIntoEditor(toOpen, true);
} else if(canCreateForms()) {
  // First run for an admin/editor: start with a seeded demo so the canvas
  // isn't bare and the user can immediately try out drag-and-drop.
  // Detect a true first-ever run BEFORE we mutate FORMS — this also drives
  // whether we seed demo groups + extra demo forms below.
  const isFirstEver = FORMS.length===0;

  FORM={id:uid('form'),title:'',desc:'',rows:[],weightGroups:[],ownerId:CURRENT_USER_ID,shares:[]};
  seedDemo();
  if(isFirstEver){
    // Pre-share this demo form with the seeded editor + viewer so the rights
    // system has something to demonstrate when you switch users.
    const editor=USERS.find(u=>u.role==='editor');
    const viewer=USERS.find(u=>u.role==='viewer');
    if(editor) FORM.shares.push({userId:editor.id,access:'edit'});
    if(viewer) FORM.shares.push({userId:viewer.id,access:'view'});

    // Seed a few demo groups so the cluster feature is discoverable, and
    // pre-assign a couple of demo forms to them. We add these to FORMS
    // directly (then persistForms) instead of round-tripping through render.
    const gOnboard=createGroup('Onboarding', GROUP_COLORS[0]);
    const gFeedback=createGroup('Feedback', GROUP_COLORS[1]);
    const gInternal=createGroup('Internal', GROUP_COLORS[2]);
    // Put the main demo into Onboarding.
    if(gOnboard) FORM.groupId=gOnboard.id;
    // Build two extra demo forms to populate Feedback + Internal so the user
    // sees grouping in action immediately.
    const demoExtras=[
      {title:'Customer feedback survey', desc:'',
       group:gFeedback?.id, rows:[
         { id:uid('r'), fields:[ defaultField('rating',{label:'Overall satisfaction',max:5}) ]},
         { id:uid('r'), fields:[ defaultField('textarea',{label:'What could we improve?'}) ]},
       ]},
      {title:'Engineering interview rubric', desc:'',
       group:gInternal?.id, rows:[
         { id:uid('r'), fields:[ defaultField('text',{label:'Candidate name',required:true}), defaultField('date',{label:'Interview date'}) ]},
         { id:uid('r'), fields:[ defaultField('range',{label:'Technical depth',min:1,max:5,step:1}), defaultField('range',{label:'Communication',min:1,max:5,step:1}) ]},
       ]},
    ];
    demoExtras.forEach(d=>{
      const f={id:uid('form'),title:d.title,desc:d.desc,rows:d.rows,weightGroups:[],
               ownerId:CURRENT_USER_ID,shares:[],updatedAt:Date.now()-1};
      if(d.group) f.groupId=d.group;
      FORMS.push(f);
    });
    persistForms();
  }
  document.getElementById('form-title').value = FORM.title||'';
  document.getElementById('form-desc').value = FORM.desc||'';
  render(); // saveForm() inside render() will persist it into the collection
} else {
  // Viewer with nothing shared in — show a friendly empty state.
  showNoAccessState();
}
applyRoleUI();
scheduleReflow();

// Dismiss the field context menu on any interaction outside it. A normal
// (left) click anywhere, a right-click that didn't land on a field, scrolling,
// resizing, or Escape all close it. The capture phase on 'contextmenu' lets a
// right-click on another field re-open cleanly (its own handler runs after).
document.addEventListener('mousedown', e=>{
  const menu=document.getElementById('field-ctx-menu');
  if(menu && menu.classList.contains('open') && !menu.contains(e.target)) closeFieldContextMenu();
});
document.addEventListener('contextmenu', e=>{
  // If the right-click wasn't on a field, close any open menu (the field's own
  // oncontextmenu handles the on-field case and re-opens as needed).
  if(!(e.target.closest && e.target.closest('.field[data-field-id]'))) closeFieldContextMenu();
}, true);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeFieldContextMenu(); });

// Undo / Redo shortcuts. Only in Build mode, and never when the user is
// actively typing in a field (so native text undo keeps working there).
document.addEventListener('keydown', function(e){
  if(!(e.metaKey||e.ctrlKey)) return;
  var k=(e.key||'').toLowerCase();
  if(k!=='z'&&k!=='y') return;
  if(typeof MODE!=='undefined' && MODE!=='build') return;
  var ae=document.activeElement;
  if(ae && (ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.tagName==='SELECT'||ae.isContentEditable)) return;
  var isRedo = (k==='y') || (k==='z' && e.shiftKey);
  e.preventDefault();
  if(isRedo) historyRedo(); else historyUndo();
});
window.addEventListener('resize', closeFieldContextMenu);
window.addEventListener('scroll', closeFieldContextMenu, true);
} /* ── end __credifyMainBoot ── */

/* Run the main data boot. The extension defers until its postMessage seed lands
   (window.__credifySeedPending, set by runtime.js); the hosted web app runs it
   immediately because its localStorage is already populated by preboot.js. */
if (window.__credifySeedPending) {
  window.addEventListener('credify:seeded', function(){
    try { __credifyMainBoot(); } catch(e){ console.error('Credify boot failed', e); }
  }, { once:true });
} else {
  __credifyMainBoot();
}

/* ===================== REPORTS FEATURE =====================
   A report is a NAMED collection of SECTIONS. Each section targets one form and
   has: filters (AND-chained WHERE), a group-by dimension, a chart type, and a
   chosen set of table columns ("fields on that form, one by one"). You can add
   more form sections to the same report, then SAVE it (in-memory) and reload it.
   Response data is in-memory (RESPONSES). Charts are pure inline SVG (no libs).
   ============================================================ */

/* { [formId]: [ {id, submittedAt, values:{[fieldId]:v}} ] } */
let RESPONSES = {};

/* The report being edited. sections[] each: {formId, filters, groupBy, chart, cols:[colKey]} */
let REPORT = { name:'', sections:[], wizard:{active:false, si:0, phase:'form', formSearch:'', fieldSearch:''} };
/* Saved reports (in-memory): [{id, name, savedAt, report:<deep copy>}] */
let SAVED_REPORTS = [];

/* ---- helpers over the form model ---- */
function repAllFields(form){
  const SKIP = new Set(['heading','paragraph','divider','statusbar','signature']);
  const out = [];
  (form.rows||[]).forEach(r => (r.fields||[]).forEach(f => { if(!SKIP.has(f.type)) out.push(f); }));
  return out;
}
function repFieldById(form, id){ return repAllFields(form).find(f=>f.id===id) || null; }
function repFormById(id){ return (typeof FORMS!=='undefined'?FORMS:[]).find(f=>f.id===id) || null; }

function repFieldKind(f){
  if(!f) return 'text';
  if(f.type==='number'||f.type==='rating') return 'number';
  if(f.type==='select'||f.type==='radio'||f.type==='state') return 'choice';
  if(f.type==='checkboxes') return 'multichoice';
  if(f.type==='toggle') return 'bool';
  if(f.type==='date') return 'date';
  return 'text';
}
function repOperators(kind){
  switch(kind){
    case 'number': return [{v:'eq',l:'='},{v:'neq',l:'≠'},{v:'gt',l:'>'},{v:'gte',l:'≥'},{v:'lt',l:'<'},{v:'lte',l:'≤'},{v:'between',l:'between'},{v:'notbetween',l:'not between'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
    case 'choice': return [{v:'is',l:'is'},{v:'isnot',l:'is not'},{v:'anyof',l:'is any of'},{v:'noneof',l:'is none of'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
    case 'multichoice': return [{v:'has',l:'includes'},{v:'hasnot',l:"doesn't include"},{v:'hasany',l:'includes any of'},{v:'hasall',l:'includes all of'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
    case 'bool': return [{v:'is',l:'is'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
    case 'date': return [{v:'on',l:'on'},{v:'before',l:'before'},{v:'after',l:'after'},{v:'onbefore',l:'on or before'},{v:'onafter',l:'on or after'},{v:'between',l:'between'},{v:'notbetween',l:'not between'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
    default: return [{v:'contains',l:'contains'},{v:'ncontains',l:"doesn't contain"},{v:'is',l:'is'},{v:'isnot',l:'is not'},{v:'startswith',l:'starts with'},{v:'endswith',l:'ends with'},{v:'isempty',l:'is empty'},{v:'notempty',l:'is not empty'}];
  }
}

function repSectionScore(form, section, values){
  let total = 0;
  (section.fieldIds||[]).forEach(fid=>{
    const f = repFieldById(form, fid); if(!f) return;
    const v = values[fid]; if(v===undefined||v===null) return;
    if(f.type==='toggle'){ const sc=f.optionScores||[]; total += Number(v?(sc[0]||0):(sc[1]||0))||0; return; }
    if(f.type==='rating'||f.type==='number'){ total += Number(v)||0; return; }
    const opts=f.options||[], sc=f.optionScores||[]; const idx=opts.indexOf(v);
    if(idx>=0) total += Number(sc[idx]||0)||0;
  });
  return total;
}

/* reportable columns: data fields + scoring-section totals */
function repColumns(form){
  const cols = repAllFields(form).map(f=>({key:'f:'+f.id, label:f.label, kind:repFieldKind(f), field:f}));
  (form.scoringSections||[]).forEach(s=>{ cols.push({key:'s:'+s.id, label:s.name+' (score)', kind:'number', section:s}); });
  return cols;
}
function repColByKey(form, key){ return repColumns(form).find(c=>c.key===key) || null; }
function repValueFor(form, col, resp){
  if(!col) return undefined;
  if(col.section) return repSectionScore(form, col.section, resp.values||{});
  return (resp.values||{})[col.field.id];
}

/* ---- filtering (per section) ---- */
function repMatches(form, sec, resp){
  return (sec.filters||[]).every(flt=>{
    const col = repColByKey(form, flt.colKey); if(!col) return true; if(!flt.op) return true;
    const v = repValueFor(form, col, resp); const kind = col.kind; const num = Number(v);
    const a = flt.value, b = flt.value2;
    switch(flt.op){
      case 'contains': return String(v||'').toLowerCase().includes(String(a||'').toLowerCase());
      case 'ncontains': return !String(v||'').toLowerCase().includes(String(a||'').toLowerCase());
      case 'startswith': return String(v||'').toLowerCase().startsWith(String(a||'').toLowerCase());
      case 'endswith': return String(v||'').toLowerCase().endsWith(String(a||'').toLowerCase());
      case 'is':       return kind==='bool' ? (!!v === (String(a)==='true' || a===true)) : String(v==null?'':v).toLowerCase() === String(a||'').toLowerCase();
      case 'isnot':    return String(v==null?'':v).toLowerCase() !== String(a||'').toLowerCase();
      case 'isempty':  return v==null || v==='' || (Array.isArray(v)&&!v.length);
      case 'notempty': return !(v==null || v==='' || (Array.isArray(v)&&!v.length));
      case 'eq':  return num === Number(a);
      case 'neq': return num !== Number(a);
      case 'gt':  return num >  Number(a);
      case 'gte': return num >= Number(a);
      case 'lt':  return num <  Number(a);
      case 'lte': return num <= Number(a);
      case 'between': return kind==='date' ? (String(v||'')!=='' && String(v||'')>=String(a||'') && String(v||'')<=String(b||'')) : (num >= Number(a) && num <= Number(b));
      case 'notbetween': { if(String(v==null?'':v)==='') return false; return kind==='date' ? !(String(v)>=String(a||'') && String(v)<=String(b||'')) : !(num >= Number(a) && num <= Number(b)); }
      case 'anyof': return String(a||'').split('|').map(s=>s.trim().toLowerCase()).filter(Boolean).includes(String(v||'').toLowerCase());
      case 'noneof': return !String(a||'').split('|').map(s=>s.trim().toLowerCase()).filter(Boolean).includes(String(v||'').toLowerCase());
      case 'has':    return Array.isArray(v) && v.map(x=>String(x).toLowerCase()).includes(String(a||'').toLowerCase());
      case 'hasnot': return !(Array.isArray(v) && v.map(x=>String(x).toLowerCase()).includes(String(a||'').toLowerCase()));
      case 'hasany': { const arr=Array.isArray(v)?v.map(x=>String(x).toLowerCase()):[]; const list=String(a||'').split('|').map(s=>s.trim().toLowerCase()).filter(Boolean); return list.some(x=>arr.includes(x)); }
      case 'hasall': { const arr=Array.isArray(v)?v.map(x=>String(x).toLowerCase()):[]; const list=String(a||'').split('|').map(s=>s.trim().toLowerCase()).filter(Boolean); return list.length>0 && list.every(x=>arr.includes(x)); }
      case 'before': return String(v||'')!=='' && String(v||'') < String(a||'');
      case 'after':  return String(v||'')!=='' && String(v||'') > String(a||'');
      case 'on':     return String(v||'') === String(a||'');
      case 'onbefore': return String(v||'')!=='' && String(v||'') <= String(a||'');
      case 'onafter':  return String(v||'')!=='' && String(v||'') >= String(a||'');
      default: return true;
    }
  });
}
function repFilteredFor(form, sec){ return (RESPONSES[form.id]||[]).filter(r=>repMatches(form, sec, r)); }

/* ==================================================================
   RENDER
   ================================================================== */
function openReportsModal(){
  // Always (re)enter the wizard fresh unless an in-progress report exists.
  if(!REPORT.sections.length){
    REPORT.wizard = { active:true, si:0, phase:'form', formSearch:'', fieldSearch:'' };
    REPORT.sections = [];
  } else if(!REPORT.wizard){
    REPORT.wizard = { active:false, si:0, phase:'form', formSearch:'', fieldSearch:'' };
  }
  openModal('reports-modal');
  renderReports();
}

function repNewSection(formId){
  const form=repFormById(formId);
  const cols=form?repColumns(form):[];
  return { formId:formId||'', filters:[], groupBy:'', chart:'bar', cols: cols.slice(0,7).map(c=>c.key) };
}

/* ---- Top-level render: wizard while building, review when done ---- */
function renderReports(){
  const body=document.getElementById('reports-body'); if(!body) return;
  const forms=(typeof FORMS!=='undefined'?FORMS:[]);
  if(!forms.length){
    body.innerHTML='<div class="rep-empty">No forms yet. Use “+ Add 5 reporting sample forms” below, or create a form first.</div>';
    return;
  }
  const wiz=REPORT.wizard||{active:false};
  if(wiz.active){ body.innerHTML=repWizardHTML(); try{ enhanceDropdowns(body); }catch(e){} return; }
  body.innerHTML=repReviewHTML();
  try{ enhanceDropdowns(body); }catch(e){}
}

/* ============================ WIZARD ============================ */
function repWizardHTML(){
  const wiz=REPORT.wizard;
  // progress header
  let h='<div class="rep-wiz">';
  h+='<div class="rep-wizsteps">';
  h+='<span class="rep-wizstep'+(wiz.phase==='form'?' on':(wiz.phase==='fields'?' done':''))+'">1 · Select form</span>';
  h+='<span class="rep-wizsep"></span>';
  h+='<span class="rep-wizstep'+(wiz.phase==='fields'?' on':'')+'">2 · Fields &amp; operators</span>';
  h+='</div>';
  h+='<div class="rep-wiztitle">Section '+(wiz.si+1)+(REPORT.sections.length>wiz.si&&repFormById((REPORT.sections[wiz.si]||{}).formId)?' · '+esc(repFormById(REPORT.sections[wiz.si].formId).title):'')+'</div>';

  if(wiz.phase==='form') h+=repWizFormStep();
  else h+=repWizFieldsStep();

  h+='</div>';
  return h;
}

/* Step 1: searchable form list */
function repWizFormStep(){
  const forms=(typeof FORMS!=='undefined'?FORMS:[]);
  const q=(REPORT.wizard.formSearch||'').toLowerCase().trim();
  const sec=REPORT.sections[REPORT.wizard.si];
  const selId=sec?sec.formId:'';
  let list=forms.filter(f=>!q || (f.title||'').toLowerCase().includes(q) || (f.desc||'').toLowerCase().includes(q));
  let h='<div class="rep-wizbody">';
  h+='<div class="rep-searchbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h+='<input id="rep-form-search" type="text" placeholder="Search forms by name…" value="'+esc(REPORT.wizard.formSearch||'')+'" oninput="repFormSearch(this.value)" autofocus></div>';
  h+='<div class="rep-formlist">';
  if(!list.length) h+='<div class="rep-empty">No forms match “'+esc(REPORT.wizard.formSearch||'')+'”.</div>';
  list.forEach(f=>{
    const n=(RESPONSES[f.id]||[]).length;
    const fields=repAllFields(f).length;
    const sel=f.id===selId?' sel':'';
    h+='<button class="rep-formrow'+sel+'" onclick="repWizPickForm(\''+f.id+'\')">'
      +'<span class="rep-formrow-main"><span class="rep-formrow-title">'+esc(f.title||'Untitled')+'</span>'
      +'<span class="rep-formrow-meta">'+fields+' field'+(fields===1?'':'s')+' · '+n+' response'+(n===1?'':'s')+'</span></span>'
      +(f.id===selId?'<span class="rep-formrow-check">✓</span>':'')
      +'</button>';
  });
  h+='</div>';
  // footer nav
  h+='<div class="rep-wiznav">';
  if(REPORT.sections.length>1 || repHasAnyConfigured()) h+='<button class="btn" onclick="repWizCancel()">Cancel</button>';
  h+='<div style="flex:1"></div>';
  h+='<button class="btn primary" '+(selId?'':'disabled')+' onclick="repWizToFields()">Next: choose fields →</button>';
  h+='</div></div>';
  return h;
}

/* Step 2: searchable field picker, each added field gets an operator + value */
function repWizFieldsStep(){
  const sec=REPORT.sections[REPORT.wizard.si];
  const form=repFormById(sec.formId);
  if(!form){ REPORT.wizard.phase='form'; return repWizFormStep(); }
  const cols=repColumns(form);
  const q=(REPORT.wizard.fieldSearch||'').toLowerCase().trim();
  const matching=cols.filter(c=>!q || c.label.toLowerCase().includes(q));

  let h='<div class="rep-wizbody">';
  // chosen fields (with operators) — these are the section filters + table cols
  h+='<div class="rep-step-label">Selected fields (set an operator on each to filter; all are shown in the table)</div>';
  if(!(sec.filters||[]).length){
    h+='<div class="rep-empty" style="margin-bottom:10px">No fields chosen yet. Search below and click a field to add it.</div>';
  } else {
    (sec.filters||[]).forEach((flt,i)=>{ h+=repFieldChipHTML(form, cols, flt, i); });
  }

  // searchable add-field box
  h+='<div class="rep-searchbox" style="margin-top:12px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h+='<input id="rep-field-search" type="text" placeholder="Search fields to add…" value="'+esc(REPORT.wizard.fieldSearch||'')+'" oninput="repFieldSearch(this.value)"></div>';
  h+='<div class="rep-fieldlist">';
  const chosenKeys=new Set((sec.filters||[]).map(f=>f.colKey));
  let any=false;
  matching.forEach(c=>{
    if(chosenKeys.has(c.key)) return; // already added
    any=true;
    h+='<button class="rep-fieldrow" onclick="repWizAddField(\''+c.key+'\')"><span>'+esc(c.label)+'</span><span class="rep-fieldrow-kind">'+c.kind+'</span></button>';
  });
  if(!any) h+='<div class="rep-empty">No more fields match.</div>';
  h+='</div>';

  // group + chart for this section
  h+='<div class="rep-controls" style="margin-top:14px">';
  h+='<div class="rep-control"><label>Group by</label><select onchange="repSetGroupBy('+REPORT.wizard.si+',this.value)"><option value="">— none (overall) —</option>';
  cols.forEach(c=>{ h+='<option value="'+c.key+'"'+(sec.groupBy===c.key?' selected':'')+'>'+esc(c.label)+'</option>'; });
  h+='</select></div>';
  h+='<div class="rep-control"><label>Chart type</label><div class="rep-chiprow">';
  [['bar','Bar'],['line','Line'],['pie','Pie'],['histogram','Histogram']].forEach(ct=>{ h+='<button class="rep-chip'+(sec.chart===ct[0]?' on':'')+'" onclick="repSetChart('+REPORT.wizard.si+',\''+ct[0]+'\')">'+ct[1]+'</button>'; });
  h+='</div></div></div>';

  // nav
  h+='<div class="rep-wiznav">';
  h+='<button class="btn" onclick="repWizBackToForm()">← Back</button>';
  h+='<div style="flex:1"></div>';
  h+='<button class="btn" onclick="repWizAddAnotherForm()">+ Add another form</button>';
  h+='<button class="btn primary" onclick="repWizFinish()">Finish & view report →</button>';
  h+='</div></div>';
  return h;
}

/* One chosen field row in step 2: field label + operator + value + remove */
function repFieldChipHTML(form, cols, flt, i){
  const col=repColByKey(form, flt.colKey);
  if(!col) return '';
  const ops=repOperators(col.kind);
  const si=REPORT.wizard.si;
  let h='<div class="rep-filter"><span class="rep-fieldname">'+esc(col.label)+'</span>';
  h+='<select class="rep-op-sel enhance-dd" onchange="repSetFilterOp('+si+','+i+',this.value)"><option value="">(no filter)</option>';
  ops.forEach(o=>{ h+='<option value="'+o.v+'"'+(flt.op===o.v?' selected':'')+'>'+esc(o.l)+'</option>'; });
  h+='</select>';
  if(flt.op) h+=repFilterValueHTML(form, col, flt, si, i);
  h+='<button class="rep-filter-x" onclick="repRemoveFilter('+si+','+i+')" title="Remove field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  h+='</div>';
  return h;
}

/* ============================ REVIEW ============================ */
function repReviewHTML(){
  let h='';
  h+='<div class="rep-savedbar">';
  h+='<div class="rep-saved-left"><input id="rep-name" class="rep-nameinput" type="text" placeholder="Untitled report" value="'+esc(REPORT.name||'')+'" oninput="REPORT.name=this.value"><button class="btn primary" onclick="repSaveReport()">Save report</button><button class="btn" onclick="repEditWizard()">Edit sections</button></div>';
  if(SAVED_REPORTS.length){
    h+='<div class="rep-saved-right"><span class="rep-saved-lbl">Saved:</span>';
    SAVED_REPORTS.forEach(s=>{ h+='<span class="rep-saved-chip"><button class="rep-saved-load" onclick="repLoadReport(\''+s.id+'\')" title="Load this report">'+esc(s.name||'Untitled')+'</button><button class="rep-saved-del" onclick="repDeleteReport(\''+s.id+'\')" title="Delete">×</button></span>'; });
    h+='</div>';
  }
  h+='</div>';

  (REPORT.sections||[]).forEach((sec,si)=>{ h+=repReviewSectionHTML(sec, si); });
  h+='<button class="rep-addsection" onclick="repWizAddAnotherForm()">+ Add another form to this report</button>';
  return h;
}

function repReviewSectionHTML(sec, si){
  const form=repFormById(sec.formId);
  let h='<div class="rep-sectioncard">';
  h+='<div class="rep-sechead"><span class="rep-secnum">Section '+(si+1)+'</span>';
  h+='<span class="rep-formname">'+esc(form?form.title:'(no form)')+'</span>';
  h+='<button class="rep-sec-x" onclick="repWizEditSection('+si+')">Edit</button>';
  if(REPORT.sections.length>1) h+='<button class="rep-sec-x" onclick="repRemoveSection('+si+')">Remove</button>';
  h+='</div>';
  if(!form){ h+='<div class="rep-empty">This section has no form.</div></div>'; return h; }
  const all=RESPONSES[form.id]||[];
  if(!all.length){ h+='<div class="rep-empty">This form has no responses yet — nothing to chart. (Pick a form with data, or add responses.)</div></div>'; return h; }
  const filtered=repFilteredFor(form, sec);
  // active filters summary
  const active=(sec.filters||[]).filter(f=>f.op);
  if(active.length){
    h+='<div class="rep-filtersummary">';
    active.forEach((f,idx)=>{ const col=repColByKey(form,f.colKey); const ops=repOperators(col?col.kind:'text'); const ol=(ops.find(o=>o.v===f.op)||{}).l||f.op; h+='<span class="rep-fs-chip">'+(idx?'AND ':'')+esc(col?col.label:'?')+' '+esc(ol)+' '+esc(f.op==='isempty'||f.op==='notempty'?'':(f.value2?(f.value+'–'+f.value2):f.value))+'</span>'; });
    h+='</div>';
  }
  h+='<div class="rep-section"><div class="rep-section-h">Summary</div>'+repSummaryHTML(form, sec, filtered, all)+'</div>';
  h+='<div class="rep-section"><div class="rep-section-h">Chart</div><div class="rep-chartwrap">'+repChartSVG(form, sec, filtered)+'</div></div>';
  h+='<div class="rep-section"><div class="rep-section-h">Results table <span style="font-weight:400;color:var(--text-muted);font-size:12px">('+filtered.length+' of '+all.length+')</span></div>'+repTableHTML(form, sec, filtered)+'</div>';
  h+='</div>';
  return h;
}

/* ============================ WIZARD MUTATORS ============================ */
function repHasAnyConfigured(){ return (REPORT.sections||[]).some(s=>s.formId); }
function repFormSearch(v){
  REPORT.wizard.formSearch=v;
  // re-render only the list to keep focus in the search box
  const list=document.querySelector('.rep-formlist');
  if(list){ const tmp=document.createElement('div'); tmp.innerHTML=repWizFormStep(); const newList=tmp.querySelector('.rep-formlist'); if(newList){ list.innerHTML=newList.innerHTML; return; } }
  renderReports();
}
function repFieldSearch(v){
  REPORT.wizard.fieldSearch=v;
  const list=document.querySelector('.rep-fieldlist');
  if(list){ const tmp=document.createElement('div'); tmp.innerHTML=repWizFieldsStep(); const newList=tmp.querySelector('.rep-fieldlist'); if(newList){ list.innerHTML=newList.innerHTML; return; } }
  renderReports();
}
function repWizPickForm(formId){
  // create/replace the section at the wizard pointer
  const si=REPORT.wizard.si;
  if(!REPORT.sections[si] || REPORT.sections[si].formId!==formId){
    REPORT.sections[si]=repNewSection(formId);
  }
  REPORT.sections[si].formId=formId;
  // Wizard defines the table purely from the fields the user picks in step 2,
  // so clear the default column seed and let repWizAddField build it up.
  REPORT.sections[si].cols=[];
  REPORT.sections[si].filters=REPORT.sections[si].filters||[];
  renderReports();
}
function repWizToFields(){
  const si=REPORT.wizard.si;
  if(!REPORT.sections[si]||!REPORT.sections[si].formId) return;
  REPORT.wizard.phase='fields'; REPORT.wizard.fieldSearch='';
  renderReports();
}
function repWizBackToForm(){ REPORT.wizard.phase='form'; renderReports(); }
function repWizAddField(colKey){
  const sec=REPORT.sections[REPORT.wizard.si];
  sec.filters=sec.filters||[];
  if(sec.filters.some(f=>f.colKey===colKey)) return;
  sec.filters.push({colKey, op:'', value:'', value2:''});
  // also include it as a table column
  sec.cols=sec.cols||[];
  if(!sec.cols.includes(colKey)) sec.cols.push(colKey);
  REPORT.wizard.fieldSearch='';
  renderReports();
}
function repWizAddAnotherForm(){
  // push a fresh section and point the wizard at it on the form step
  REPORT.sections.push(repNewSection(''));
  REPORT.wizard = { active:true, si:REPORT.sections.length-1, phase:'form', formSearch:'', fieldSearch:'' };
  renderReports();
}
function repWizEditSection(si){
  REPORT.wizard = { active:true, si:si, phase:'form', formSearch:'', fieldSearch:'' };
  renderReports();
}
function repWizFinish(){
  // drop any empty trailing sections (no form picked)
  REPORT.sections = REPORT.sections.filter(s=>s.formId);
  if(!REPORT.sections.length){ toast('Pick at least one form first'); REPORT.wizard.phase='form'; renderReports(); return; }
  REPORT.wizard.active=false;
  renderReports();
}
function repWizCancel(){
  // remove the current in-progress section if it has no form, then exit wizard
  const si=REPORT.wizard.si;
  if(REPORT.sections[si] && !REPORT.sections[si].formId) REPORT.sections.splice(si,1);
  if(REPORT.sections.filter(s=>s.formId).length){ REPORT.wizard.active=false; }
  renderReports();
}
function repEditWizard(){
  REPORT.wizard = { active:true, si:0, phase:'form', formSearch:'', fieldSearch:'' };
  renderReports();
}

/* ---- shared section mutators (used by both wizard and review) ---- */
function repRemoveSection(si){
  REPORT.sections.splice(si,1);
  if(!REPORT.sections.length){ REPORT.wizard={active:true,si:0,phase:'form',formSearch:'',fieldSearch:''}; }
  renderReports();
}
function repSetFilterOp(si,i,op){ const f=REPORT.sections[si].filters[i]; f.op=op; f.value=''; f.value2=''; renderReports(); }
function repSetFilterVal(si,i,v){ REPORT.sections[si].filters[i].value=v; renderReports(); }
function repSetFilterVal2(si,i,v){ REPORT.sections[si].filters[i].value2=v; renderReports(); }
function repSetGroupBy(si,key){ REPORT.sections[si].groupBy=key; renderReports(); }
function repSetChart(si,t){ REPORT.sections[si].chart=t; renderReports(); }
function repRemoveFilter(si,i){
  const sec=REPORT.sections[si];
  const removed=sec.filters[i];
  sec.filters.splice(i,1);
  // also drop from table cols
  if(removed){ const ci=(sec.cols||[]).indexOf(removed.colKey); if(ci>=0) sec.cols.splice(ci,1); }
  renderReports();
}

function repFilterValueHTML(form, col, flt, si, i){
  const op=flt.op, kind=col.kind;
  if(op==='isempty'||op==='notempty') return '';
  if(kind==='choice' && (op==='is'||op==='isnot')){
    let h='<select class="rep-val enhance-dd" onchange="repSetFilterVal('+si+','+i+',this.value)"><option value="">value…</option>';
    (col.field.options||[]).forEach(o=>{ h+='<option'+(String(flt.value)===String(o)?' selected':'')+'>'+esc(o)+'</option>'; });
    return h+'</select>';
  }
  if(kind==='multichoice' && (op==='has'||op==='hasnot')){
    let h='<select class="rep-val enhance-dd" onchange="repSetFilterVal('+si+','+i+',this.value)"><option value="">value…</option>';
    (col.field.options||[]).forEach(o=>{ h+='<option'+(String(flt.value)===String(o)?' selected':'')+'>'+esc(o)+'</option>'; });
    return h+'</select>';
  }
  if(kind==='bool'){
    let h='<select class="rep-val enhance-dd" onchange="repSetFilterVal('+si+','+i+',this.value)">';
    h+='<option value="true"'+(String(flt.value)==='true'?' selected':'')+'>'+esc(col.field.toggleOn||'Yes')+'</option>';
    h+='<option value="false"'+(String(flt.value)==='false'?' selected':'')+'>'+esc(col.field.toggleOff||'No')+'</option>';
    return h+'</select>';
  }
  if(kind==='date'){
    let h='<input class="rep-val" type="date" value="'+esc(flt.value||'')+'" onchange="repSetFilterVal('+si+','+i+',this.value)">';
    if(op==='between'||op==='notbetween') h+='<input class="rep-val2" type="date" value="'+esc(flt.value2||'')+'" onchange="repSetFilterVal2('+si+','+i+',this.value)">';
    return h;
  }
  if(kind==='number'){
    let h='<input class="rep-val" type="number" step="any" placeholder="value" value="'+esc(flt.value==null?'':flt.value)+'" onchange="repSetFilterVal('+si+','+i+',this.value)">';
    if(op==='between'||op==='notbetween') h+='<input class="rep-val2" type="number" step="any" placeholder="and" value="'+esc(flt.value2==null?'':flt.value2)+'" onchange="repSetFilterVal2('+si+','+i+',this.value)">';
    return h;
  }
  const ph = (op==='anyof'||op==='noneof'||op==='hasany'||op==='hasall') ? 'a | b | c' : 'value';
  return '<input class="rep-val" type="text" placeholder="'+ph+'" value="'+esc(flt.value||'')+'" onchange="repSetFilterVal('+si+','+i+',this.value)">';
}

/* ---- Summary ---- */
function repSummaryHTML(form, sec, filtered, all){
  const stats=[];
  stats.push({v:String(filtered.length), l:'Matching responses'});
  const pct = all.length ? Math.round(filtered.length/all.length*100) : 0;
  stats.push({v:pct+'%', l:'of all '+all.length+' responses'});
  const col = sec.groupBy ? repColByKey(form, sec.groupBy) : null;
  let numericCol = col && col.kind==='number' ? col : null;
  if(!numericCol){ const s=(form.scoringSections||[])[0]; if(s) numericCol={key:'s:'+s.id,label:s.name+' (score)',kind:'number',section:s}; }
  if(numericCol){
    const nums=filtered.map(r=>Number(repValueFor(form,numericCol,r))).filter(n=>!isNaN(n));
    if(nums.length){
      const sum=nums.reduce((a,b)=>a+b,0); const mean=sum/nums.length;
      const sorted=nums.slice().sort((a,b)=>a-b);
      const median=sorted.length%2? sorted[(sorted.length-1)/2] : (sorted[sorted.length/2-1]+sorted[sorted.length/2])/2;
      stats.push({v:mean.toFixed(1), l:'Mean · '+esc(numericCol.label)});
      stats.push({v:String(median), l:'Median'});
      stats.push({v:String(Math.min.apply(null,nums)), l:'Min'});
      stats.push({v:String(Math.max.apply(null,nums)), l:'Max'});
    }
  }
  let h='<div class="rep-summary-grid">';
  stats.forEach(s=>{ h+='<div class="rep-stat"><div class="rep-stat-val">'+s.v+'</div><div class="rep-stat-lbl">'+s.l+'</div></div>'; });
  return h+'</div>';
}

/* ---- Aggregation ---- */
function repAggregate(form, sec, filtered){
  if(!sec.groupBy){ return [{label:'All responses', count:filtered.length}]; }
  const col=repColByKey(form, sec.groupBy); if(!col) return [{label:'All responses', count:filtered.length}];
  const map=new Map();
  filtered.forEach(r=>{
    let v=repValueFor(form, col, r);
    if(Array.isArray(v)) v=v.join(', ');
    if(col.kind==='bool') v = v ? (col.field.toggleOn||'Yes') : (col.field.toggleOff||'No');
    if(v===undefined||v===null||v==='') v='(blank)';
    const key=String(v); map.set(key,(map.get(key)||0)+1);
  });
  let arr=Array.from(map.entries()).map(([label,count])=>({label,count}));
  if(col.kind==='number') arr.sort((a,b)=>Number(a.label)-Number(b.label)); else arr.sort((a,b)=>b.count-a.count);
  return arr;
}

/* ---- Charts (pure SVG) ---- */
const REP_PALETTE=['#1a8a66','#22a87e','#3dbd94','#0e7490','#a06400','#c0392b','#7a5b12','#0a3d2b'];
function repChartSVG(form, sec, filtered){
  if(!filtered.length) return '<div class="rep-empty">No responses match the current filters.</div>';
  const data=repAggregate(form, sec, filtered);
  if(sec.chart==='pie') return repPieSVG(data);
  if(sec.chart==='line') return repLineSVG(data);
  if(sec.chart==='histogram') return repHistogramSVG(form, sec, filtered);
  return repBarSVG(data);
}
function repBarSVG(data){
  const W=640,padL=44,padR=16,padT=14,padB=70,barGap=10;
  const max=Math.max.apply(null,data.map(d=>d.count).concat([1])); const n=data.length;
  const plotW=W-padL-padR; const bw=Math.max(8,(plotW-barGap*(n+1))/n);
  const H=300,plotH=H-padT-padB;
  let s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="Sora,sans-serif">';
  for(let g=0;g<=4;g++){ const y=padT+plotH*(g/4); const val=Math.round(max*(1-g/4));
    s+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="#dde8e3" stroke-width="1"/>';
    s+='<text x="'+(padL-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#8aaa9a">'+val+'</text>'; }
  data.forEach((d,i)=>{ const x=padL+barGap+(bw+barGap)*i; const bh=plotH*(d.count/max); const y=padT+plotH-bh; const c=REP_PALETTE[i%REP_PALETTE.length];
    s+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="3" fill="'+c+'"><title>'+esc(d.label)+': '+d.count+'</title></rect>';
    s+='<text x="'+(x+bw/2)+'" y="'+(y-5)+'" text-anchor="middle" font-size="11" font-weight="600" fill="#0d1f18">'+d.count+'</text>';
    const lbl=d.label.length>14?d.label.slice(0,13)+'…':d.label;
    s+='<text x="'+(x+bw/2)+'" y="'+(padT+plotH+16)+'" text-anchor="end" font-size="10.5" fill="#527060" transform="rotate(-35 '+(x+bw/2)+' '+(padT+plotH+16)+')">'+esc(lbl)+'</text>'; });
  return s+'</svg>';
}
function repLineSVG(data){
  const W=640,padL=44,padR=16,padT=14,padB=70,H=300,plotH=H-padT-padB,plotW=W-padL-padR;
  const max=Math.max.apply(null,data.map(d=>d.count).concat([1])); const n=data.length;
  const xAt=i=> n<=1? padL+plotW/2 : padL+plotW*(i/(n-1)); const yAt=v=> padT+plotH*(1-v/max);
  let s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="Sora,sans-serif">';
  for(let g=0;g<=4;g++){ const y=padT+plotH*(g/4); const val=Math.round(max*(1-g/4));
    s+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="#dde8e3" stroke-width="1"/>';
    s+='<text x="'+(padL-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#8aaa9a">'+val+'</text>'; }
  let path=''; data.forEach((d,i)=>{ const x=xAt(i),y=yAt(d.count); path+=(i?'L':'M')+x+' '+y+' '; });
  s+='<path d="'+path+'" fill="none" stroke="#1a8a66" stroke-width="2.5" stroke-linejoin="round"/>';
  data.forEach((d,i)=>{ const x=xAt(i),y=yAt(d.count);
    s+='<circle cx="'+x+'" cy="'+y+'" r="4" fill="#1a8a66"><title>'+esc(d.label)+': '+d.count+'</title></circle>';
    s+='<text x="'+x+'" y="'+(y-9)+'" text-anchor="middle" font-size="11" font-weight="600" fill="#0d1f18">'+d.count+'</text>';
    const lbl=d.label.length>12?d.label.slice(0,11)+'…':d.label;
    s+='<text x="'+x+'" y="'+(padT+plotH+16)+'" text-anchor="end" font-size="10.5" fill="#527060" transform="rotate(-35 '+x+' '+(padT+plotH+16)+')">'+esc(lbl)+'</text>'; });
  return s+'</svg>';
}
function repPieSVG(data){
  const total=data.reduce((a,d)=>a+d.count,0)||1; const W=640,H=300,cx=150,cy=150,r=110;
  let s='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="Sora,sans-serif">'; let ang=-Math.PI/2;
  data.forEach((d,i)=>{ const frac=d.count/total; const a2=ang+frac*Math.PI*2;
    const x1=cx+r*Math.cos(ang),y1=cy+r*Math.sin(ang),x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
    const large=frac>0.5?1:0; const c=REP_PALETTE[i%REP_PALETTE.length];
    if(data.length===1){ s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+c+'"/>'; }
    else { s+='<path d="M'+cx+' '+cy+' L'+x1+' '+y1+' A'+r+' '+r+' 0 '+large+' 1 '+x2+' '+y2+' Z" fill="'+c+'"><title>'+esc(d.label)+': '+d.count+' ('+Math.round(frac*100)+'%)</title></path>'; }
    ang=a2; });
  let ly=40; data.slice(0,10).forEach((d,i)=>{ const c=REP_PALETTE[i%REP_PALETTE.length]; const lbl=d.label.length>26?d.label.slice(0,25)+'…':d.label;
    s+='<rect x="320" y="'+(ly-10)+'" width="13" height="13" rx="3" fill="'+c+'"/>';
    s+='<text x="340" y="'+ly+'" font-size="12" fill="#0d1f18">'+esc(lbl)+' — '+d.count+' ('+Math.round(d.count/total*100)+'%)</text>'; ly+=22; });
  return s+'</svg>';
}
function repHistogramSVG(form, sec, filtered){
  let col = sec.groupBy ? repColByKey(form, sec.groupBy) : null;
  if(!(col && col.kind==='number')){ const s0=(form.scoringSections||[])[0]; if(s0) col={key:'s:'+s0.id,label:s0.name,kind:'number',section:s0}; }
  if(!col){ const nf=repAllFields(form).find(f=>repFieldKind(f)==='number'); if(nf) col={key:'f:'+nf.id,label:nf.label,kind:'number',field:nf}; }
  if(!col) return '<div class="rep-empty">No numeric or score field to build a histogram. Pick a numeric “Group by”.</div>';
  const nums=filtered.map(r=>Number(repValueFor(form,col,r))).filter(n=>!isNaN(n));
  if(!nums.length) return '<div class="rep-empty">No numeric values to plot.</div>';
  const min=Math.min.apply(null,nums),max=Math.max.apply(null,nums),range=max-min;
  const bins = range<=0 ? 1 : Math.min(10, Math.max(4, Math.ceil(Math.sqrt(nums.length))));
  const width = range<=0 ? 1 : range/bins; const counts=new Array(bins).fill(0);
  nums.forEach(v=>{ let bi = range<=0?0:Math.floor((v-min)/width); if(bi>=bins) bi=bins-1; if(bi<0) bi=0; counts[bi]++; });
  const data=counts.map((c,i)=>({label: range<=0?String(min):(Math.round((min+i*width)*10)/10)+'–'+(Math.round((min+(i+1)*width)*10)/10), count:c}));
  return repBarSVG(data);
}

/* ---- Table (only selected columns) ---- */
function repTableHTML(form, sec, filtered){
  if(!filtered.length) return '<div class="rep-empty">No responses match the current filters.</div>';
  let chosen=(sec.cols||[]).map(k=>repColByKey(form,k)).filter(Boolean);
  if(!chosen.length){ return '<div class="rep-empty">No fields selected. Pick at least one field above to show in the table.</div>'; }
  let h='<div class="rep-table-wrap"><table class="rep-table"><thead><tr><th>#</th><th>Submitted</th>';
  chosen.forEach(c=>{ h+='<th>'+esc(c.label)+'</th>'; });
  h+='</tr></thead><tbody>';
  filtered.forEach((r,i)=>{
    h+='<tr><td>'+(i+1)+'</td><td>'+esc(repFmtDate(r.submittedAt))+'</td>';
    chosen.forEach(c=>{
      if(c.section){ const sc=repSectionScore(form,c.section,r.values||{}); const band=bandForScore(c.section,sc); const sev=band?(band.severity||''):''; const _bc=(band&&band.color&&/^#[0-9a-fA-F]{6}$/.test(band.color))?(' style="background:'+band.color+'14;border-color:'+band.color+'66;color:'+band.color+'"'):''; h+='<td>'+sc+(band?' <span class="rep-band-pill '+(_bc?'':sev)+'"'+_bc+'>'+esc(band.label)+'</span>':'')+'</td>'; return; }
      let v=(r.values||{})[c.field.id];
      if(Array.isArray(v)) v=v.join(', ');
      if(c.field.type==='toggle') v = v ? (c.field.toggleOn||'Yes') : (c.field.toggleOff||'No');
      h+='<td>'+esc(v==null?'':String(v))+'</td>';
    });
    h+='</tr>';
  });
  return h+'</tbody></table></div>';
}
function repFmtDate(ts){ try{ return new Date(ts).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }catch(e){ return ''; } }

/* ==================================================================
   STATE MUTATORS
   ================================================================== */
/* ---- Save / load (in-memory) ---- */
function repSaveReport(){
  const name=(REPORT.name||'').trim() || ('Report '+(SAVED_REPORTS.length+1));
  REPORT.name=name;
  const copy=JSON.parse(JSON.stringify(REPORT));
  // update existing save with same name, else add
  const ex=SAVED_REPORTS.find(s=>s.name.toLowerCase()===name.toLowerCase());
  if(ex){ ex.report=copy; ex.savedAt=Date.now(); toast('Updated saved report “'+name+'”'); }
  else { SAVED_REPORTS.push({id:uid('rep'), name, savedAt:Date.now(), report:copy}); toast('Saved report “'+name+'”'); }
  renderReports();
}
function repLoadReport(id){
  const s=SAVED_REPORTS.find(x=>x.id===id); if(!s) return;
  REPORT=JSON.parse(JSON.stringify(s.report));
  if(!REPORT.sections||!REPORT.sections.length) REPORT.sections=[repNewSection('')];
  renderReports();
}
function repDeleteReport(id){
  const i=SAVED_REPORTS.findIndex(x=>x.id===id); if(i<0) return;
  SAVED_REPORTS.splice(i,1); renderReports();
}

/* ==================================================================
   SAMPLE DATA — 5 comprehensive mental-health forms (~25 data fields each),
   each with 25 realistic responses. Replaces any prior reporting forms.
   ================================================================== */
function _rpick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function _rint(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
function _rbool(p){ return Math.random() < (p==null?0.5:p); }

/* Build a form from a compact column spec. Each col:
   {label, type, opts?, scores?, group?, ref}
   - choice types use opts (+ optional scores for scored items)
   We attach a _meta map ref→fieldId and optional scoring section. */
function repBuildForm(spec){
  const rows=[];
  rows.push({id:uid('r'),fields:[defaultField('heading',{label:spec.title.replace(' — Reporting test','')})]});
  const meta={};
  const scoreRefs=[];
  spec.cols.forEach(c=>{
    let f;
    if(c.type==='select'||c.type==='radio'){
      f=defaultField(c.type,{label:c.label,span:c.span||6,options:(c.opts||[]).slice()});
      if(c.scores){ f.optionScores=c.scores.slice(); scoreRefs.push(c.ref); }
    } else if(c.type==='checkboxes'){
      f=defaultField('checkboxes',{label:c.label,span:c.span||12,options:(c.opts||[]).slice()});
    } else if(c.type==='toggle'){
      f=defaultField('toggle',{label:c.label,span:c.span||6,toggleOn:c.on||'Yes',toggleOff:c.off||'No'});
    } else if(c.type==='number'){
      f=defaultField('number',{label:c.label,span:c.span||4,min:c.min,max:c.max});
    } else if(c.type==='rating'){
      f=defaultField('rating',{label:c.label,span:c.span||12,max:c.max||5});
    } else if(c.type==='date'){
      f=defaultField('date',{label:c.label,span:c.span||6});
    } else {
      f=defaultField(c.type||'text',{label:c.label,span:c.span||6});
    }
    meta[c.ref]=f.id; f._ref=c.ref;
    rows.push({id:uid('r'),fields:[f]});
  });
  let sections=[];
  if(spec.score && scoreRefs.length){
    const ids=scoreRefs.map(r=>meta[r]).filter(Boolean);
    sections=[{id:uid('sect'),name:spec.score.name,fieldIds:ids,bands:spec.score.bands||[]}];
  }
  return {
    id:uid('form'), title:spec.title, desc:spec.desc||'', rows,
    weightGroups:[], scoringSections:sections, visibilityGroups:[],
    ownerId:(typeof CURRENT_USER_ID!=='undefined'?CURRENT_USER_ID:null), shares:[],
    showAllPages:false, sampleReporting:true, updatedAt:Date.now(),
    _meta:meta, _spec:spec
  };
}

/* Generate N responses for a spec-built form, using each col's generator. */
function repGenResponses(form, N){
  const out=[]; const spec=form._spec; const meta=form._meta;
  for(let n=0;n<N;n++){
    const values={};
    // a per-respondent severity tendency to make scored distributions realistic
    const tend=Math.random();
    spec.cols.forEach(c=>{
      const fid=meta[c.ref]; let v;
      if(c.gen){ v=c.gen(tend); }
      else if(c.type==='select'||c.type==='radio'){
        if(c.scores){ // scored: bias by tendency
          const opts=c.opts; const r=Math.random(); let idx;
          if(tend<0.4) idx=r<0.55?0:r<0.82?1:r<0.95?2:Math.min(3,opts.length-1);
          else if(tend<0.75) idx=r<0.25?0:r<0.55?1:r<0.85?2:Math.min(3,opts.length-1);
          else idx=r<0.1?0:r<0.3?1:r<0.6?2:Math.min(opts.length-1,4);
          if(idx>=opts.length) idx=opts.length-1; v=opts[idx];
        } else v=_rpick(c.opts);
      }
      else if(c.type==='checkboxes'){ const pool=c.opts.slice(); const k=_rint(0,Math.min(3,pool.length)); const picks=[]; for(let j=0;j<k;j++) picks.push(pool.splice(_rint(0,pool.length-1),1)[0]); v=picks; }
      else if(c.type==='toggle'){ v=_rbool(c.p==null?0.6:c.p); }
      else if(c.type==='number'){ v=_rint(c.min==null?0:c.min, c.max==null?10:c.max); }
      else if(c.type==='rating'){ v=_rint(1,c.max||5); }
      else if(c.type==='date'){ const d=new Date(); d.setDate(d.getDate()-_rint(0,400)); v=d.toISOString().slice(0,10); }
      else if(c.sample){ v=_rpick(c.sample); }
      else v='';
      values[fid]=v;
    });
    out.push({id:uid('resp'), submittedAt: Date.now()-_rint(0,150)*86400000, values});
  }
  return out;
}

function seedReportingSampleForms(){
  if(typeof canCreateForms==='function' && !canCreateForms()){ toast('Viewers can\'t create forms'); return; }
  // Remove any prior reporting sample forms (replace behavior).
  if(typeof FORMS!=='undefined'){
    for(let i=FORMS.length-1;i>=0;i--){ if(FORMS[i].sampleReporting || /Reporting test$/.test(FORMS[i].title||'')){ delete RESPONSES[FORMS[i].id]; FORMS.splice(i,1); } }
  }
  const FREQ4=['Not at all','Several days','More than half the days','Nearly every day']; const FS4=[0,1,2,3];
  const FREQ5=['Never','Rarely','Sometimes','Often','Always']; const FS5=[0,1,2,3,4];
  const GENDER=['Female','Female','Male','Male','Non-binary','Prefer not to say'];
  const RACE=['White','Black or African American','Hispanic or Latino','Asian','Native American','Two or more','Prefer not to say'];
  const INS=['Self-pay','Commercial / PPO','Commercial / HMO','Medicare','Medicaid','Other'];
  const REGION=['North','South','East','West'];
  const MARITAL=['Single','Married','Partnered','Divorced','Widowed'];
  const EMPLOY=['Full-time','Part-time','Unemployed','Student','Retired','Disability'];
  const YESNO=['Yes','No'];

  const demoCols=()=>[
    {ref:'age',label:'Age',type:'number',min:18,max:78,span:4},
    {ref:'gender',label:'Gender',type:'select',opts:GENDER,span:4},
    {ref:'race',label:'Race / ethnicity',type:'select',opts:RACE,span:4},
    {ref:'region',label:'Region',type:'select',opts:REGION,span:4},
    {ref:'marital',label:'Marital status',type:'select',opts:MARITAL,span:4},
    {ref:'employ',label:'Employment',type:'select',opts:EMPLOY,span:4},
    {ref:'insurance',label:'Insurance type',type:'select',opts:INS,span:6},
    {ref:'visitdate',label:'Visit date',type:'date',span:6}
  ];

  const specs=[];

  // 1) Depression intake (PHQ-9 + demographics + context) ~25 fields
  specs.push({
    title:'Depression Intake & PHQ-9 — Reporting test',
    desc:'',
    cols:[].concat(demoCols(),[
      {ref:'priorrx',label:'Prior treatment for depression?',type:'toggle',on:'Yes',off:'No',p:0.5,span:6},
      {ref:'onmeds',label:'Currently taking psychiatric medication?',type:'toggle',on:'Yes',off:'No',p:0.45,span:6},
      {ref:'sleephrs',label:'Average hours of sleep per night',type:'number',min:3,max:10,span:4},
      {ref:'q1',label:'Little interest or pleasure in doing things',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q2',label:'Feeling down, depressed, or hopeless',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q3',label:'Trouble falling/staying asleep or sleeping too much',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q4',label:'Feeling tired or having little energy',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q5',label:'Poor appetite or overeating',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q6',label:'Feeling bad about yourself',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q7',label:'Trouble concentrating',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q8',label:'Moving/speaking slowly or being restless',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'q9',label:'Thoughts you would be better off dead',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'functional',label:'How difficult have these made daily life?',type:'radio',opts:['Not difficult','Somewhat','Very','Extremely']},
      {ref:'appetite',label:'Recent appetite change',type:'select',opts:['Decreased','No change','Increased'],span:4},
      {ref:'weightchg',label:'Weight change (lbs, +/-)',type:'number',min:-30,max:30,span:4},
      {ref:'suicidalhist',label:'History of suicidal ideation?',type:'toggle',on:'Yes',off:'No',p:0.3,span:4},
      {ref:'concerns',label:'Current concerns',type:'checkboxes',opts:['Mood','Sleep','Appetite','Energy','Concentration','Relationships']}
    ]),
    score:{name:'PHQ-9 total',bands:[{min:0,max:4,label:'Minimal',severity:'low'},{min:5,max:9,label:'Mild',severity:'mild'},{min:10,max:14,label:'Moderate',severity:'mod'},{min:15,max:19,label:'Mod. severe',severity:'high'},{min:20,max:27,label:'Severe',severity:'high'}]}
  });

  // 2) Anxiety intake (GAD-7 + context)
  specs.push({
    title:'Anxiety Intake & GAD-7 — Reporting test',
    desc:'',
    cols:[].concat(demoCols(),[
      {ref:'caffeine',label:'Caffeinated drinks per day',type:'number',min:0,max:8,span:4},
      {ref:'exercise',label:'Days exercised per week',type:'select',opts:['0','1–2','3–4','5+'],span:4},
      {ref:'panic',label:'History of panic attacks?',type:'toggle',on:'Yes',off:'No',p:0.4,span:6},
      {ref:'g1',label:'Feeling nervous, anxious, or on edge',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g2',label:'Not able to stop or control worrying',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g3',label:'Worrying too much about different things',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g4',label:'Trouble relaxing',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g5',label:'Being so restless it is hard to sit still',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g6',label:'Becoming easily annoyed or irritable',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'g7',label:'Feeling afraid as if something awful might happen',type:'radio',opts:FREQ4,scores:FS4},
      {ref:'triggers',label:'Common anxiety triggers',type:'checkboxes',opts:['Work','Health','Finances','Social','Family','Driving']},
      {ref:'impair',label:'Impact on work/social function',type:'radio',opts:['None','Mild','Moderate','Severe']},
      {ref:'support',label:'Has a support system?',type:'toggle',on:'Yes',off:'No',p:0.7,span:6},
      {ref:'sleepqual',label:'Sleep quality (1–5)',type:'rating',max:5},
      {ref:'avoidance',label:'Avoids anxiety-provoking situations?',type:'radio',opts:['Never','Sometimes','Often','Always']},
      {ref:'physical',label:'Physical symptoms present?',type:'checkboxes',opts:['Racing heart','Sweating','Shortness of breath','Dizziness','Nausea']},
      {ref:'onset',label:'Age symptoms began',type:'number',min:5,max:70,span:6}
    ]),
    score:{name:'GAD-7 total',bands:[{min:0,max:4,label:'Minimal',severity:'low'},{min:5,max:9,label:'Mild',severity:'mild'},{min:10,max:14,label:'Moderate',severity:'mod'},{min:15,max:21,label:'Severe',severity:'high'}]}
  });

  // 3) Substance use (AUDIT-style + history)
  specs.push({
    title:'Substance Use Screening — Reporting test',
    desc:'',
    cols:[].concat(demoCols(),[
      {ref:'a1',label:'How often do you have a drink containing alcohol?',type:'radio',opts:['Never','Monthly or less','2–4×/month','2–3×/week','4+×/week'],scores:FS5},
      {ref:'a2',label:'Drinks on a typical drinking day',type:'radio',opts:['1 or 2','3 or 4','5 or 6','7 to 9','10+'],scores:FS5},
      {ref:'a3',label:'How often 6+ drinks on one occasion?',type:'radio',opts:['Never','Less than monthly','Monthly','Weekly','Daily'],scores:FS5},
      {ref:'a4',label:'Unable to stop drinking once started?',type:'radio',opts:['Never','Less than monthly','Monthly','Weekly','Daily'],scores:FS5},
      {ref:'tobacco',label:'Tobacco use',type:'select',opts:['Never','Former','Current'],span:4},
      {ref:'cannabis',label:'Cannabis use',type:'select',opts:['Never','Occasional','Regular'],span:4},
      {ref:'otherdrugs',label:'Other drug use in past year?',type:'toggle',on:'Yes',off:'No',p:0.2,span:4},
      {ref:'firstuse',label:'Age of first alcohol use',type:'number',min:10,max:40,span:4},
      {ref:'family',label:'Family history of substance use?',type:'toggle',on:'Yes',off:'No',p:0.4,span:6},
      {ref:'treatbefore',label:'Prior substance treatment?',type:'toggle',on:'Yes',off:'No',p:0.25,span:6},
      {ref:'motiv',label:'Readiness to change',type:'radio',opts:['Not ready','Thinking about it','Ready','Already changing']},
      {ref:'consequences',label:'Consequences experienced',type:'checkboxes',opts:['Work','Legal','Relationship','Health','Financial']},
      {ref:'quitattempts',label:'Number of past quit attempts',type:'number',min:0,max:10,span:4},
      {ref:'cravings',label:'Craving frequency',type:'radio',opts:['Never','Sometimes','Often','Constant']},
      {ref:'withdrawal',label:'Experienced withdrawal symptoms?',type:'toggle',on:'Yes',off:'No',p:0.35,span:6},
      {ref:'overdose',label:'History of overdose?',type:'toggle',on:'Yes',off:'No',p:0.12,span:6}
    ]),
    score:{name:'AUDIT-C+ score',bands:[{min:0,max:4,label:'Low risk',severity:'low'},{min:5,max:9,label:'Increased',severity:'mild'},{min:10,max:14,label:'High',severity:'mod'},{min:15,max:20,label:'Severe',severity:'high'}]}
  });

  // 4) Trauma / PTSD intake
  specs.push({
    title:'Trauma & PTSD Intake — Reporting test',
    desc:'',
    cols:[].concat(demoCols(),[
      {ref:'eventtype',label:'Primary index event',type:'select',opts:['Accident','Assault','Combat','Disaster','Loss','Childhood','Other'],span:6},
      {ref:'agewhen',label:'Age at event',type:'number',min:1,max:70,span:6},
      {ref:'p1',label:'Disturbing memories of the event',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p2',label:'Disturbing dreams of the event',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p3',label:'Acting/feeling as if it were happening again',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p4',label:'Very upset when reminded',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p5',label:'Avoiding memories/thoughts/feelings',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p6',label:'Trouble remembering parts of it',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p7',label:'Feeling distant or cut off',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'p8',label:'Being “superalert” or on guard',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'flashfreq',label:'Flashback frequency',type:'radio',opts:['Never','Monthly','Weekly','Daily']},
      {ref:'safety',label:'Currently feels safe?',type:'toggle',on:'Yes',off:'No',p:0.6,span:6},
      {ref:'therapy',label:'In trauma-focused therapy?',type:'toggle',on:'Yes',off:'No',p:0.35,span:6},
      {ref:'symptoms',label:'Co-occurring symptoms',type:'checkboxes',opts:['Depression','Anxiety','Sleep','Substance use','Anger']},
      {ref:'duration',label:'Time since event',type:'select',opts:['<1 month','1–6 months','6–12 months','1–5 years','5+ years'],span:6},
      {ref:'dissociation',label:'Experiences dissociation?',type:'radio',opts:['Never','Rarely','Sometimes','Often']},
      {ref:'hospitalized',label:'Prior psychiatric hospitalization?',type:'toggle',on:'Yes',off:'No',p:0.2,span:6}
    ]),
    score:{name:'PTSD symptom total',bands:[{min:0,max:10,label:'Below threshold',severity:'low'},{min:11,max:20,label:'Elevated',severity:'mild'},{min:21,max:28,label:'Probable',severity:'mod'},{min:29,max:40,label:'Severe',severity:'high'}]}
  });

  // 5) General wellbeing / functioning
  specs.push({
    title:'Wellbeing & Functioning — Reporting test',
    desc:'',
    cols:[].concat(demoCols(),[
      {ref:'overall',label:'Overall wellbeing (1–5)',type:'rating',max:5},
      {ref:'sleephrs',label:'Average hours of sleep',type:'number',min:3,max:11,span:4},
      {ref:'sleepqual',label:'Sleep quality',type:'select',opts:['Poor','Fair','Good','Excellent'],span:4},
      {ref:'exercise',label:'Exercise days/week',type:'select',opts:['0','1–2','3–4','5+'],span:4},
      {ref:'diet',label:'Diet quality',type:'select',opts:['Poor','Fair','Good','Excellent'],span:4},
      {ref:'stress',label:'How often overwhelmed by stress?',type:'radio',opts:FREQ5,scores:FS5},
      {ref:'mood',label:'Typical mood lately',type:'radio',opts:['Very low','Low','Neutral','Good','Very good']},
      {ref:'energy',label:'Energy level',type:'radio',opts:['Very low','Low','Moderate','High']},
      {ref:'social',label:'Social connectedness',type:'radio',opts:['Isolated','Limited','Moderate','Strong']},
      {ref:'worklife',label:'Work–life balance',type:'radio',opts:['Poor','Fair','Good','Excellent']},
      {ref:'support',label:'Has someone to talk to?',type:'toggle',on:'Yes',off:'No',p:0.72,span:6},
      {ref:'finances',label:'Financial stress?',type:'toggle',on:'Yes',off:'No',p:0.5,span:6},
      {ref:'goals',label:'Areas to improve',type:'checkboxes',opts:['Sleep','Mood','Exercise','Diet','Stress','Relationships','Work']},
      {ref:'satisfaction',label:'Life satisfaction (1–5)',type:'rating',max:5},
      {ref:'screentime',label:'Daily screen time (hours)',type:'number',min:0,max:16,span:4},
      {ref:'alcohol',label:'Alcohol use',type:'select',opts:['None','Occasional','Moderate','Heavy'],span:4},
      {ref:'mindfulness',label:'Practices mindfulness/meditation?',type:'toggle',on:'Yes',off:'No',p:0.4,span:4}
    ]),
    score:{name:'Stress level',bands:[{min:0,max:1,label:'Low',severity:'low'},{min:2,max:2,label:'Moderate',severity:'mild'},{min:3,max:3,label:'High',severity:'mod'},{min:4,max:4,label:'Very high',severity:'high'}]}
  });

  let added=0;
  specs.forEach(spec=>{
    const form=repBuildForm(spec);
    FORMS.push(form);
    RESPONSES[form.id]=repGenResponses(form, 25);
    added++;
  });
  if(typeof persistForms==='function') persistForms();
  // reset the builder to a fresh section on the first new form
  const first=FORMS.find(f=>f.sampleReporting);
  REPORT={ name:'', sections:[ repNewSection(first?first.id:'') ] };
  toast('Added '+added+' reporting forms (~25 fields each) with 25 responses each');
  renderReports();
  try{ if(document.getElementById('forms-modal') && document.getElementById('forms-modal').classList.contains('open')) renderFormsListAll(); }catch(e){}
  try{ renderFormsList(); }catch(e){}
}