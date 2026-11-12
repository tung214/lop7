// Ứng dụng chính: router + các màn hình
'use strict';

const $app = document.getElementById('app');
const $top = document.getElementById('topbar');
const PALETTE = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#6250d6', '#e34948'];
const LETTERS = ['A', 'B', 'C', 'D'];

// ---------------- tiện ích ----------------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = x => (x == null || isNaN(x)) ? '–' : (Math.round(x * 100) / 100).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
const fmtDate = iso => { if (!iso) return ''; const d = new Date(iso); return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }); };
const fmtDay = iso => iso ? new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : '';
const fmtDur = s => s == null ? '' : `${Math.floor(s / 60)} phút ${s % 60} giây`;
const sleepFrame = () => new Promise(r => requestAnimationFrame(r));
const qs = s => Object.fromEntries(new URLSearchParams(s || ''));
const today = () => new Date().toISOString().slice(0, 10);

function math(el) {
  if (!window.renderMathInElement) return;
  renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false, macros: { '\\frac': '\\dfrac' } });   // phân số cỡ lớn cho dễ đọc
}
function toast(msg, ms = 2600) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), ms);
}
function download(name, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function pickJson() {
  return new Promise((resolve, reject) => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return;
      const r = new FileReader(); r.onload = () => { try { resolve(JSON.parse(r.result)); } catch (e) { reject(new Error('File không phải JSON hợp lệ')); } };
      r.readAsText(f);
    };
    inp.click();
  });
}
function compressImage(file, maxSide = 1100, quality = 0.62) {
  return new Promise((resolve, reject) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, maxSide / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => reject(new Error('Không đọc được ảnh'));
    img.src = url;
  });
}
async function imageToDataUrl(src) {
  if (!src || src.startsWith('data:')) return src;
  const blob = await (await fetch(src)).blob();
  return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
}
const scoreBadge = a => {
  if (a.status === 'pending') return `<span class="badge warn">Chờ chấm tự luận · TN ${fmt(a.mcqResult?.score)}đ</span>`;
  const cls = a.score >= 8 ? 'good' : a.score >= 5 ? 'accent' : 'bad';
  return `<span class="badge ${cls}">${fmt(a.score)} điểm</span>`;
};
const statusBadge = st => {
  const cls = { done: 'good', pending: 'warn', overdue: 'bad', retry: 'bad', doing: 'accent', todo: '' }[st] || '';
  return `<span class="badge ${cls}">${Grade.STATUS_TEXT[st] || st}</span>`;
};
const avatar = (s, size = 56) => `<span class="avatar" style="background:${esc(s.color || PALETTE[0])};width:${size}px;height:${size}px;font-size:${size / 2.4}px">${esc((s.name || '?').trim()[0]?.toUpperCase() || '?')}</span>`;
const shortTitle = id => {
  const t = Content.unitTitle(id);
  const m = /^(Bài \d+)\./.exec(t); if (m) return m[1];
  return t.replace('Luyện tập chung', 'LT chung').replace('Ôn tập chương', 'Ôn tập ch.');
};
const unitCell = id => `<span title="${esc(Content.unitTitle(id))}">${esc(shortTitle(id))}</span>`;
const unitReady = id => window.TOC.some(ch => ch.units.some(u => u.id === id && u.ready)) && !!Content.lessons[id];

// ---------------- trạng thái màn hình ----------------
let cleanup = [];
const onCleanup = fn => cleanup.push(fn);
let charts = [];
function chartColors() {
  const cs = getComputedStyle(document.documentElement);
  return { text: cs.getPropertyValue('--text-2').trim(), grid: cs.getPropertyValue('--border').trim(), accent: cs.getPropertyValue('--accent').trim(), surface: cs.getPropertyValue('--surface').trim() };
}

// ---------------- topbar ----------------
function renderTop(active) {
  const s = Store.session;
  const mode = Store.mode === 'server' ? 'Mạng LAN' : 'Máy này';
  let nav = '';
  if (s?.role === 'student') {
    nav = `<a href="#/" class="${active === 'home' ? 'active' : ''}">Học</a>
      <a href="#/progress" class="${active === 'progress' ? 'active' : ''}">Tiến độ</a>
      <a href="#/me" class="${active === 'me' ? 'active' : ''}"><span class="who"><span class="dot" style="background:${esc(s.color)}"></span>${esc(s.name)}</span></a>`;
  } else if (s?.role === 'parent') {
    nav = `<a href="#/parent" class="${active === 'parent' ? 'active' : ''}">Dashboard</a>
      <a href="#/toc" class="${active === 'toc' ? 'active' : ''}">Bài học</a>
      <button id="btnLogout">Thoát</button>`;
  }
  $top.innerHTML = `<a class="brand" href="#/">📘 Toán 7 <span class="mode-badge">· ${mode}</span></a><nav>${nav}</nav>`;
  $top.querySelector('#btnLogout')?.addEventListener('click', () => { Store.logout(); location.hash = '#/login'; });
}

// ---------------- dữ liệu ----------------
async function myData() {
  const [attempts, assignments, reads, drafts] = await Promise.all([
    Store.list('attempts'), Store.list('assignments'), Store.list('reads'), Store.list('drafts')]);
  return { attempts: attempts.filter(a => a.status !== 'draft'), assignments, reads, drafts };
}
function bestBy(attempts, keyFn) {
  const m = {};
  for (const a of attempts) {
    const k = keyFn(a); const cur = m[k];
    if (!cur || a.score > cur.score) m[k] = a;
  }
  return m;
}

// ================= ĐĂNG NHẬP / CÀI ĐẶT =================
async function viewLogin() {
  renderTop();
  const info = await Store.setupInfo();
  if (!info.hasParent && info.studentCount === 0) return viewSetup();
  const students = await Store.listStudents();
  $app.innerHTML = `
    <div class="card">
      <h1>Chào bạn! Ai đang học đây?</h1>
      ${students.length ? `<div class="students">${students.map(s => `
        <button class="student-tile" data-id="${esc(s.id)}">${avatar(s)}<b>${esc(s.name)}</b></button>`).join('')}</div>`
      : `<p class="empty">Chưa có học sinh nào. Phụ huynh hãy đăng nhập để thêm học sinh.</p>`}
      <form class="pinbox" id="pinForm" hidden>
        <p id="pinWho"></p>
        <input type="password" inputmode="numeric" autocomplete="off" maxlength="8" id="pin" placeholder="PIN">
        <p class="small" id="pinErr" style="color:var(--bad)"></p>
        <button class="btn primary" style="width:100%">Vào học</button>
      </form>
    </div>
    <div class="row">
      ${info.hasParent ? `<button class="btn" id="btnParent">👪 Phụ huynh</button>` : ''}
      ${Store.mode === 'local' && !info.hasParent ? `<button class="btn" id="btnImport">📥 Nhập gói từ phụ huynh</button>` : ''}
    </div>`;
  let target = null;
  const form = $app.querySelector('#pinForm'), pin = $app.querySelector('#pin');
  const choose = (role, s) => {
    target = { role, id: s?.id };
    $app.querySelectorAll('.student-tile').forEach(b => b.classList.toggle('sel', b.dataset.id === s?.id));
    $app.querySelector('#pinWho').innerHTML = role === 'parent' ? 'Nhập PIN <b>phụ huynh</b>' : `Nhập PIN của <b>${esc(s.name)}</b>`;
    form.hidden = false; pin.value = ''; $app.querySelector('#pinErr').textContent = ''; pin.focus();
  };
  $app.querySelectorAll('.student-tile').forEach(b => b.onclick = () => choose('student', students.find(s => s.id === b.dataset.id)));
  $app.querySelector('#btnParent')?.addEventListener('click', () => choose('parent'));
  $app.querySelector('#btnImport')?.addEventListener('click', async () => {
    try { const d = await pickJson(); const n = await Store.importData(d); toast(`Đã nhập ${n} mục`); viewLogin(); } catch (e) { toast(e.message); }
  });
  form.onsubmit = async e => {
    e.preventDefault();
    try {
      const s = await Store.login(target.role, target.id, pin.value.trim());
      if (!s) { $app.querySelector('#pinErr').textContent = 'Sai PIN, thử lại nhé.'; pin.select(); return; }
      location.hash = s.role === 'parent' ? '#/parent' : '#/';
    } catch (err) { $app.querySelector('#pinErr').textContent = err.message; }
  };
}

function viewSetup() {
  renderTop();
  $app.innerHTML = `
    <div class="card">
      <h1>Cài đặt lần đầu</h1>
      <p>Đặt <b>mã PIN phụ huynh</b> (4–8 chữ số). PIN này dùng để vào Dashboard: thêm học sinh, giao bài, chấm bài.</p>
      <form id="f" style="max-width:320px">
        <label class="field"><span>PIN phụ huynh</span><input type="password" inputmode="numeric" id="p1" maxlength="8"></label>
        <label class="field"><span>Nhập lại PIN</span><input type="password" inputmode="numeric" id="p2" maxlength="8"></label>
        <button class="btn primary">Lưu và tiếp tục</button>
      </form>
    </div>
    ${Store.mode === 'local' ? `<div class="card"><h3>Đây là máy của con (học ở nhà khác)?</h3>
      <p class="small muted">Nhập "gói giao bài" phụ huynh gửi (file .json) để bắt đầu học, không cần đặt PIN phụ huynh.</p>
      <button class="btn" id="btnImport">📥 Nhập gói từ phụ huynh</button></div>` : ''}`;
  $app.querySelector('#f').onsubmit = async e => {
    e.preventDefault();
    const a = $app.querySelector('#p1').value.trim(), b = $app.querySelector('#p2').value.trim();
    if (!/^\d{4,8}$/.test(a)) return toast('PIN phải gồm 4–8 chữ số');
    if (a !== b) return toast('Hai lần nhập PIN không khớp');
    try {
      await Store.setup(a); await Store.login('parent', null, a);
      toast('Đã lưu. Hãy thêm học sinh.'); location.hash = '#/parent/students';
    } catch (err) { toast(err.message); }
  };
  $app.querySelector('#btnImport')?.addEventListener('click', async () => {
    try { const d = await pickJson(); const n = await Store.importData(d); toast(`Đã nhập ${n} mục`); location.hash = '#/login'; route(); } catch (e) { toast(e.message); }
  });
}

// ================= TRANG CHỦ HỌC SINH / MỤC LỤC =================
async function viewHome() {
  const s = Store.session; const isStudent = s.role === 'student';
  renderTop(isStudent ? 'home' : 'toc');
  const d = isStudent ? await myData() : { attempts: [], assignments: [], reads: [], drafts: [] };
  const byUnit = {};
  for (const a of d.attempts) (byUnit[a.lessonId] ||= []).push(a);

  let html = '';
  if (isStudent) {
    const list = d.assignments.map(a => ({ a, st: Grade.assignmentStatus(a, s.studentId, d.attempts, d.reads) }))
      .filter(x => x.st.status !== 'done' || (Date.now() - Date.parse(x.a.createdAt)) < 3 * 864e5)
      .sort((x, y) => (x.st.status === 'done') - (y.st.status === 'done') || (x.a.dueDate || '9').localeCompare(y.a.dueDate || '9'));
    html += `<div class="card"><h2>📌 Bài bố mẹ giao</h2>${list.length ? list.map(({ a, st }) => assignmentCard(a, st)).join('') : '<p class="muted">Chưa có bài được giao. Con tự chọn bài bên dưới để học nhé!</p>'}</div>`;
    if (d.drafts.length) {
      html += `<div class="card tight"><b>✏️ Bài đang làm dở:</b> ${d.drafts.map(dr => `<a href="${esc(dr.url)}">${esc(Content.unitTitle(dr.attempt.lessonId))} – ${esc(Grade.setName(dr.attempt.lessonId, dr.attempt.setId))}</a>`).join(' · ')}</div>`;
    }
  } else {
    html += `<div class="card tight muted small">Chế độ xem của phụ huynh: xem nội dung bài học và đề. Muốn giao bài, vào Dashboard → Giao bài.</div>`;
  }
  for (const ch of window.TOC) {
    html += `<div class="card chapter"><h2>${esc(ch.title)}</h2>`;
    for (const u of ch.units) {
      const ready = unitReady(u.id);
      const at = byUnit[u.id] || [];
      const best = bestBy(at, a => a.setId);
      const L = Content.lessons[u.id];
      const sets = ready ? L.sets.map(st => {
        const b = best[st.id];
        return `<span class="badge ${b ? (b.status === 'pending' ? 'warn' : b.score >= 8 ? 'good' : 'accent') : ''}">${esc(st.advanced ? 'Đề 4★' : st.name)}${b ? ' · ' + (b.status === 'pending' ? 'chờ chấm' : fmt(b.score)) : ''}</span>`;
      }).join('') : '';
      const pending = at.filter(a => a.status === 'pending').length;
      html += `<div class="unit ${ready ? '' : 'disabled'}">
        <div class="t">${ready ? `<a href="#/lesson/${u.id}"><b>${esc(u.title)}</b></a>` : `<b>${esc(u.title)}</b> <span class="badge">sắp có</span>`}
          ${ready && isStudent ? `<div class="sets">${sets}</div>` : ''}</div>
        ${isStudent && at.length ? `<div class="small muted" style="text-align:right">${at.length} lượt${pending ? `<br><span class="badge warn">${pending} chờ chấm</span>` : ''}</div>` : ''}
      </div>`;
    }
    html += `</div>`;
  }
  $app.innerHTML = html;
}

function assignmentCard(a, st) {
  const items = a.items.map((it, i) => {
    const label = itemLabel(it);
    const href = it.type === 'theory' ? `#/lesson/${it.lessonId}?a=${a.id}&i=${i}`
      : `#/quiz/${it.lessonId}/${it.type === 'custom' ? 'custom' : it.setId}?a=${a.id}&i=${i}`;
    const s = st.items[i];
    return `<li class="row" style="gap:6px">${statusBadge(s)} <span>${esc(label)}</span>
      ${s === 'done' || s === 'pending' ? '' : `<a class="btn small primary" href="${href}">${it.type === 'theory' ? 'Đọc' : 'Làm ngay'}</a>`}</li>`;
  }).join('');
  return `<div class="card tight" style="border-left:4px solid var(--${st.status === 'overdue' ? 'bad' : st.status === 'done' ? 'good' : 'accent'})">
    <div class="row"><b>${esc(a.title || 'Bài được giao')}</b>${statusBadge(st.status)}<span class="spacer"></span>
      ${a.dueDate ? `<span class="small muted">Hạn: ${new Date(a.dueDate).toLocaleDateString('vi-VN')}</span>` : ''}</div>
    ${a.note ? `<p class="small">💬 ${esc(a.note)}</p>` : ''}
    ${a.minScore ? `<p class="small muted">Cần đạt từ ${fmt(a.minScore)} điểm.</p>` : ''}
    <ul style="list-style:none;padding:0;margin:6px 0 0;display:grid;gap:6px">${items}</ul></div>`;
}
function itemLabel(it) {
  const t = Content.unitTitle(it.lessonId);
  if (it.type === 'theory') return `Đọc lý thuyết: ${t}`;
  if (it.type === 'custom') return `${t} – Đề tự chọn (${it.refs.length} câu)`;
  return `${t} – ${Grade.setName(it.lessonId, it.setId)}`;
}

// ================= BÀI HỌC =================
async function viewLesson(id, query) {
  const s = Store.session; const isStudent = s.role === 'student';
  renderTop(isStudent ? 'home' : 'toc');
  const L = Content.lessons[id];
  if (!L) { $app.innerHTML = '<p class="empty">Bài này chưa có nội dung.</p>'; return; }
  let attempts = [];
  if (isStudent) {
    attempts = (await Store.list('attempts')).filter(a => a.lessonId === id && a.status !== 'draft');
    const rid = s.studentId + '|' + id;
    if (!(await Store.get('reads', rid))) await Store.put('reads', { id: rid, studentId: s.studentId, lessonId: id, at: Store.now() }).catch(() => { });
  }
  const best = bestBy(attempts, a => a.setId);
  const baseDone = L.sets.filter(x => !x.advanced).every(x => best[x.id]);
  const goodBase = L.sets.filter(x => !x.advanced).some(x => best[x.id] && best[x.id].score >= 8);
  const setBtn = st => {
    const b = best[st.id];
    const locked = isStudent && st.advanced && !goodBase;
    const info = b ? (b.status === 'pending' ? 'chờ chấm' : `cao nhất ${fmt(b.score)}đ`) : 'chưa làm';
    const meta = `${st.mcq.length} trắc nghiệm · ${(st.essay || []).length} tự luận`;
    if (!isStudent) return `<a class="btn" href="#/lesson/${id}?preview=${st.id}">${esc(st.name)}<small>${meta}</small></a>`;
    return locked ? `<button class="btn" disabled>🔒 ${esc(st.name)}<small>Đạt ≥ 8đ ở Đề 1–3 để mở</small></button>`
      : `<a class="btn ${b ? '' : 'primary'}" href="#/quiz/${id}/${st.id}">${esc(st.name)}<small>${info}</small></a>`;
  };
  const pages = [L.sgkPages && `SGK tr.${L.sgkPages.join('–')}`, L.sbtPages && `SBT tr.${L.sbtPages.join('–')}`].filter(Boolean).join(' · ');
  $app.innerHTML = `
    <div class="card theory">
      <p class="small muted"><a href="#/${isStudent ? '' : 'toc'}">← Mục lục</a> · Chương ${L.chapter}${pages ? ' · ' + pages : ''}</p>
      <h1>${esc(L.title)}</h1>
      ${(L.objectives || []).length ? `<p class="small muted">🎯 ${L.objectives.map(esc).join(' · ')}</p>` : ''}
      ${(L.theory || []).map(t => `<h3>${t.heading}</h3><div>${t.html}</div>`).join('')}
    </div>
    ${(L.skills || []).length ? `<div class="card"><h2>💡 Mẹo giải toán</h2><ul class="skills">${L.skills.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
    ${(L.examples || []).length ? `<div class="card"><h2>📝 Ví dụ giải mẫu</h2>${L.examples.map((e, i) => `
      <details class="example"><summary>Ví dụ ${i + 1}: <span>${e.q}</span></summary><div style="margin-top:8px">${e.solution}</div></details>`).join('')}
      <p class="small muted">Bấm vào từng ví dụ để xem lời giải. Hãy tự làm trước rồi mới xem nhé!</p></div>` : ''}
    <div class="card" id="sets"><h2>✍️ Làm bài tập</h2>
      <div class="setpick">${L.sets.map(setBtn).join('')}
        ${isStudent && L.sets.length ? (baseDone ? `<a class="btn" href="#/quiz/${id}/mix">🔀 Đề trộn<small>ôn câu từng sai</small></a>`
      : `<button class="btn" disabled>🔒 Đề trộn<small>Làm xong Đề 1–3 để mở</small></button>`) : ''}
      </div></div>
    <div id="preview"></div>`;
  math($app);
  if (!isStudent && query.preview) renderPreview(id, query.preview);
  if (query.a && isStudent) toast('Đã đánh dấu: đã đọc lý thuyết ✓');
}

// Phụ huynh xem trước đề (có đáp án)
function renderPreview(lessonId, setId) {
  const st = Content.set(lessonId, setId); if (!st) return;
  const box = $app.querySelector('#preview');
  box.innerHTML = `<div class="card"><h2>Xem trước: ${esc(st.name)} <span class="badge">có đáp án</span></h2>
    ${st.mcq.map((q, i) => `<div class="q"><div class="qhead"><span class="qnum">Câu ${i + 1}.</span><span>${q.q}</span> <span class="badge">${levelText(q.level)}</span></div>
      <div class="opts">${q.options.map((o, k) => `<div class="opt ${k === q.answer ? 'correct' : ''}"><span class="letter">${LETTERS[k]}.</span><span>${o}</span></div>`).join('')}</div>
      <div class="explain">${q.explain}<div class="small muted">Nguồn: ${esc(q.source || '')}</div></div></div>`).join('')}
    ${(st.essay || []).map((e, i) => `<div class="q"><div class="qhead"><span class="qnum">Tự luận ${i + 1} (${fmt(e.maxPoints)}đ).</span><span>${e.q}</span></div>
      <div class="model"><b>Lời giải mẫu:</b><br>${e.modelAnswer}</div>
      <p class="small"><b>Thang điểm:</b> ${e.rubric.map(r => `${r.text} (${fmt(r.pts)}đ)`).join('; ')}</p></div>`).join('')}</div>`;
  math(box); box.scrollIntoView({ behavior: 'smooth' });
}
const levelText = l => ({ de: 'Dễ', vua: 'Vừa', kho: 'Khó' }[l] || l);

// ================= LÀM BÀI =================
async function viewQuiz(lessonId, setId, query) {
  const s = Store.session; renderTop('home');
  const L = Content.lessons[lessonId];
  if (!L) { $app.innerHTML = '<p class="empty">Không tìm thấy bài.</p>'; return; }
  const asgId = query.a || null; const idx = query.i != null ? +query.i : null;
  const draftId = [s.studentId, lessonId, setId, asgId || '', idx ?? ''].join('|');
  let draft = await Store.get('drafts', draftId);
  let attempt = draft?.attempt;
  if (!attempt) {
    let refs = null;
    if (setId === 'mix') {
      const hist = (await Store.list('attempts')).filter(a => a.lessonId === lessonId && a.status !== 'draft');
      refs = Grade.mixRefs(lessonId, hist);
    } else if (setId === 'custom') {
      const asg = asgId && await Store.get('assignments', asgId);
      refs = asg?.items?.[idx]?.refs;
      if (!refs) { $app.innerHTML = '<p class="empty">Không tìm thấy bài được giao.</p>'; return; }
    }
    attempt = Grade.newAttempt({ studentId: s.studentId, lessonId, setId, assignmentId: asgId, itemIndex: idx, refs });
  }
  const url = location.hash;
  let saveTimer = null;
  const saveDraft = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => Store.put('drafts', { id: draftId, studentId: s.studentId, url, attempt }).catch(e => toast(e.message)), 600);
  };

  const mcqHtml = attempt.items.mcq.map((it, i) => {
    const c = Content.get(it.ref); if (!c) return '';
    return `<div class="q" data-ref="${esc(it.ref)}"><div class="qhead"><span class="qnum">Câu ${i + 1}.</span><span>${c.q.q}</span></div>
      <div class="opts">${it.perm.map((orig, d) => `
        <label class="opt ${attempt.answers[it.ref] === d ? 'chosen' : ''}"><input type="radio" name="${esc(it.ref)}" value="${d}" ${attempt.answers[it.ref] === d ? 'checked' : ''}>
          <span class="letter">${LETTERS[d]}.</span><span>${c.q.options[orig]}</span></label>`).join('')}</div></div>`;
  }).join('');
  const essayHtml = attempt.items.essay.map((it, i) => {
    const c = Content.get(it.ref); if (!c) return '';
    const ans = attempt.essay[it.ref] || {};
    return `<div class="q" data-essay="${esc(it.ref)}"><div class="qhead"><span class="qnum">Tự luận ${i + 1} (${fmt(c.q.maxPoints)}đ).</span><span>${c.q.q}</span></div>
      <textarea placeholder="Trình bày lời giải của con ở đây (có thể viết phân số dạng -3/4, luỹ thừa dạng 2^3)…">${esc(ans.text || '')}</textarea>
      <div class="row" style="margin-top:8px"><label class="btn small">📷 Chụp / chọn ảnh bài làm<input type="file" accept="image/*" capture="environment" hidden></label>
        <button class="btn small danger" data-rmimg ${ans.image ? '' : 'hidden'}>Xoá ảnh</button></div>
      <div class="photo-preview">${ans.image ? `<img src="${esc(ans.image)}" alt="Ảnh bài làm">` : ''}</div></div>`;
  }).join('');

  $app.innerHTML = `<div class="card">
    <p class="small muted"><a href="#/lesson/${lessonId}">← ${esc(L.title)}</a></p>
    <div class="row"><h1 style="margin:0">${esc(Grade.setName(lessonId, setId))}</h1><span class="spacer"></span><span class="badge accent timer" id="timer">00:00</span></div>
    <p class="small muted">${attempt.items.mcq.length} câu trắc nghiệm${attempt.items.essay.length ? ` (${attempt.items.essay.length ? 7 : 10} điểm) + ${attempt.items.essay.length} câu tự luận (3 điểm)` : ' (10 điểm)'}. Câu hỏi xếp từ dễ đến khó. Bài được lưu nháp tự động.</p>
    <h2 style="margin-top:14px">Phần 1. Trắc nghiệm</h2>${mcqHtml}
    ${essayHtml ? `<h2 style="margin-top:18px">Phần 2. Tự luận</h2>${essayHtml}` : ''}
    <div class="sticky-submit"><span class="small muted" id="progress"></span><span class="spacer"></span><button class="btn primary" id="btnSubmit">Nộp bài</button></div>
  </div>`;
  math($app);

  const t0 = Date.parse(attempt.startedAt);
  const tick = () => { const sec = Math.max(0, Math.round((Date.now() - t0) / 1000)); const el = document.getElementById('timer'); if (el) el.textContent = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; };
  tick(); const iv = setInterval(tick, 1000); onCleanup(() => { clearInterval(iv); clearTimeout(saveTimer); });
  const updProgress = () => { $app.querySelector('#progress').textContent = `Đã làm ${Object.keys(attempt.answers).length}/${attempt.items.mcq.length} câu trắc nghiệm`; };
  updProgress();

  $app.querySelectorAll('.q[data-ref]').forEach(q => q.addEventListener('change', e => {
    attempt.answers[q.dataset.ref] = +e.target.value;
    q.querySelectorAll('.opt').forEach(o => o.classList.toggle('chosen', o.querySelector('input').checked));
    updProgress(); saveDraft();
  }));
  $app.querySelectorAll('.q[data-essay]').forEach(q => {
    const ref = q.dataset.essay;
    const ans = () => (attempt.essay[ref] ||= {});
    q.querySelector('textarea').addEventListener('input', e => { ans().text = e.target.value; saveDraft(); });
    q.querySelector('input[type=file]').addEventListener('change', async e => {
      const f = e.target.files[0]; if (!f) return;
      try {
        toast('Đang xử lý ảnh…', 1200);
        const dataUrl = await compressImage(f);
        ans().image = await Store.uploadImage(dataUrl);
        q.querySelector('.photo-preview').innerHTML = `<img src="${esc(ans().image)}" alt="Ảnh bài làm">`;
        q.querySelector('[data-rmimg]').hidden = false; saveDraft();
      } catch (err) { toast(err.message); }
    });
    q.querySelector('[data-rmimg]').addEventListener('click', () => { delete ans().image; q.querySelector('.photo-preview').innerHTML = ''; q.querySelector('[data-rmimg]').hidden = true; saveDraft(); });
  });
  $app.querySelector('#btnSubmit').onclick = async () => {
    const missing = attempt.items.mcq.length - Object.keys(attempt.answers).length;
    const emptyEssay = attempt.items.essay.filter(it => !attempt.essay[it.ref]?.text?.trim() && !attempt.essay[it.ref]?.image).length;
    const warn = [missing && `${missing} câu trắc nghiệm chưa chọn`, emptyEssay && `${emptyEssay} câu tự luận chưa làm`].filter(Boolean).join(', ');
    if (!confirm(warn ? `Con còn ${warn}. Vẫn nộp bài?` : 'Con chắc chắn muốn nộp bài?')) return;
    clearTimeout(saveTimer);
    Grade.submit(attempt);
    try {
      await Store.put('attempts', attempt);
      await Store.del('drafts', draftId).catch(() => { });
      location.hash = '#/attempt/' + attempt.id;
    } catch (e) { toast(e.message, 5000); }
  };
}

// ================= KẾT QUẢ =================
async function viewAttempt(id) {
  const s = Store.session; renderTop(s.role === 'student' ? 'home' : 'parent');
  const a = await Store.get('attempts', id);
  if (!a) { $app.innerHTML = '<p class="empty">Không tìm thấy bài làm.</p>'; return; }
  Grade.recompute(a);
  const L = Content.lessons[a.lessonId];
  const isParent = s.role === 'parent';
  let student = null;
  if (isParent) student = (await Store.list('students')).find(x => x.id === a.studentId);
  const mcq = a.items.mcq.map((it, i) => {
    const c = Content.get(it.ref); if (!c) return '';
    const chosen = a.answers[it.ref]; const ok = Grade.isCorrect(a, it);
    return `<div class="q"><div class="qhead"><span class="qnum">Câu ${i + 1}.</span><span>${c.q.q}</span></div>
      <div class="opts">${it.perm.map((orig, d) => {
      const cls = orig === c.q.answer ? 'correct' : (d === chosen ? 'wrong' : '');
      const mark = orig === c.q.answer ? ' ✓' : (d === chosen ? ' ✗' : '');
      return `<div class="opt ${cls}"><span class="letter">${LETTERS[d]}.</span><span>${c.q.options[orig]}</span><b>${mark}</b></div>`;
    }).join('')}</div>
      <div class="explain"><span class="verdict ${ok ? 'good' : 'bad'}">${ok ? '✓ Đúng' : chosen == null ? '✗ Chưa làm' : '✗ Sai'}</span> — ${c.q.explain}</div></div>`;
  }).join('');
  const essay = a.items.essay.map((it, i) => {
    const c = Content.get(it.ref); if (!c) return '';
    const ans = a.essay?.[it.ref] || {}; const g = a.essayGrades?.[it.ref];
    return `<div class="q"><div class="qhead"><span class="qnum">Tự luận ${i + 1} (${fmt(c.q.maxPoints)}đ).</span><span>${c.q.q}</span></div>
      <div class="small muted">Bài làm:</div>
      ${ans.text ? `<div class="essay-ans">${esc(ans.text)}</div>` : ''}${ans.image ? `<div class="photo-preview"><img src="${esc(ans.image)}" alt="Ảnh bài làm"></div>` : ''}
      ${!ans.text && !ans.image ? '<p class="muted">(không làm)</p>' : ''}
      ${g ? `<div class="explain"><b>Điểm: ${fmt(g.points)}/${fmt(c.q.maxPoints)}</b> <span class="badge">${g.by === 'ai' ? '🤖 AI chấm' : '👪 Phụ huynh chấm'}</span>${g.comment ? `<br>💬 ${esc(g.comment)}` : ''}</div>`
        : `<div class="explain"><span class="badge warn">Chờ chấm</span> Bố mẹ sẽ chấm câu này. Lời giải mẫu sẽ hiện sau khi chấm.</div>`}
      ${g || isParent ? `<div class="model" style="margin-top:8px"><b>Lời giải mẫu:</b><br>${c.q.modelAnswer}</div>` : ''}</div>`;
  }).join('');
  const color = a.status === 'pending' ? 'var(--warn)' : a.score >= 8 ? 'var(--good)' : a.score >= 5 ? 'var(--accent)' : 'var(--bad)';
  const cheer = a.status === 'pending' ? 'Đã nộp! Phần tự luận đang chờ chấm.' : a.score >= 9 ? 'Xuất sắc! 🎉' : a.score >= 8 ? 'Giỏi lắm! 👏' : a.score >= 6.5 ? 'Khá tốt, cố thêm chút nữa nhé! 💪' : a.score >= 5 ? 'Đạt rồi, xem lại các câu sai nhé.' : 'Chưa đạt – đọc lại lý thuyết rồi làm lại nhé!';
  $app.innerHTML = `
    <div class="card">
      <p class="small muted"><a href="#/lesson/${a.lessonId}">← ${esc(L?.title || a.lessonId)}</a>${student ? ` · Học sinh: <b>${esc(student.name)}</b>` : ''}</p>
      <div class="row" style="align-items:flex-end">
        <div><h1 style="margin-bottom:4px">${esc(Grade.setName(a.lessonId, a.setId))}</h1>
          <div class="small muted">Nộp lúc ${fmtDate(a.submittedAt)} · ${fmtDur(a.durationSec)}</div></div>
        <span class="spacer"></span>
        <div style="text-align:right"><div class="score-big" style="color:${color}">${a.status === 'pending' ? fmt(a.mcqResult.score) + '<span style="font-size:1rem">+?</span>' : fmt(a.score)}</div><div class="small muted">/ 10 điểm</div></div>
      </div>
      <p><b>${cheer}</b></p>
      <div class="stats">
        <div class="stat"><div class="v">${a.mcqResult.correct}/${a.mcqResult.total}</div><div class="l">câu trắc nghiệm đúng (${fmt(a.mcqResult.score)}đ)</div></div>
        ${a.items.essay.length ? `<div class="stat"><div class="v">${a.status === 'pending' ? '?' : fmt(a.essayScore)}</div><div class="l">điểm tự luận / 3</div></div>` : ''}
      </div>
      <div class="row" style="margin-top:12px">
        ${!isParent ? `<a class="btn primary" href="#/quiz/${a.lessonId}/${a.setId}${a.assignmentId ? `?a=${a.assignmentId}&i=${a.itemIndex}` : ''}">↻ Làm lại</a><a class="btn" href="#/">Về trang chính</a>` : ''}
        ${isParent && a.status === 'pending' ? `<a class="btn primary" href="#/grade/${a.id}">Chấm tự luận</a>` : ''}
        ${isParent && a.status === 'graded' && a.items.essay.length ? `<a class="btn" href="#/grade/${a.id}">Sửa điểm</a>` : ''}
      </div>
    </div>
    <div class="card"><h2>Phần 1. Trắc nghiệm</h2>${mcq}</div>
    ${essay ? `<div class="card"><h2>Phần 2. Tự luận</h2>${essay}</div>` : ''}`;
  math($app);
}

// ================= CHẤM BÀI (phụ huynh) =================
async function viewGrade(id) {
  renderTop('parent');
  const a = await Store.get('attempts', id);
  if (!a) { $app.innerHTML = '<p class="empty">Không tìm thấy bài làm.</p>'; return; }
  const student = (await Store.list('students')).find(x => x.id === a.studentId);
  const rows = a.items.essay.map((it, i) => {
    const c = Content.get(it.ref); if (!c) return '';
    const ans = a.essay?.[it.ref] || {}; const g = a.essayGrades?.[it.ref] || {};
    return `<div class="card" data-ref="${esc(it.ref)}" data-max="${c.q.maxPoints}">
      <h3>Tự luận ${i + 1} (${fmt(c.q.maxPoints)} điểm)</h3><div>${c.q.q}</div>
      <div class="hr"></div>
      <div class="small muted">Bài làm của ${esc(student?.name || 'con')}:</div>
      ${ans.text ? `<div class="essay-ans">${esc(ans.text)}</div>` : ''}${ans.image ? `<div class="photo-preview"><a href="${esc(ans.image)}" target="_blank"><img src="${esc(ans.image)}" alt="Ảnh bài làm"></a></div>` : ''}
      ${!ans.text && !ans.image ? '<p class="muted">(không làm)</p>' : ''}
      <div class="model" style="margin-top:10px"><b>Lời giải mẫu:</b><br>${c.q.modelAnswer}</div>
      <p style="margin-top:10px"><b>Thang điểm</b> (tick tiêu chí con làm đúng):</p>
      ${c.q.rubric.map((r, k) => `<label class="row" style="gap:8px;margin-bottom:6px;align-items:flex-start"><input type="checkbox" data-pts="${r.pts}" style="width:20px;height:20px;margin-top:3px"><span>${r.text} <b>(${fmt(r.pts)}đ)</b></span></label>`).join('')}
      <div class="row"><label class="field" style="max-width:140px"><span>Điểm</span><input type="number" step="0.25" min="0" max="${c.q.maxPoints}" class="pts" value="${g.points ?? ''}"></label>
        <label class="field" style="flex:1;min-width:200px"><span>Nhận xét cho con</span><input type="text" class="cmt" value="${esc(g.comment || '')}" placeholder="VD: Đúng hướng, nhưng quên đổi dấu khi chuyển vế"></label></div>
    </div>`;
  }).join('');
  $app.innerHTML = `<div class="card"><p class="small muted"><a href="#/parent/grade">← Danh sách chờ chấm</a></p>
      <h1>Chấm bài: ${esc(student?.name || '')}</h1>
      <p>${esc(Content.unitTitle(a.lessonId))} – ${esc(Grade.setName(a.lessonId, a.setId))} · nộp ${fmtDate(a.submittedAt)}</p>
      <p>Trắc nghiệm: <b>${a.mcqResult.correct}/${a.mcqResult.total}</b> câu đúng → <b>${fmt(a.mcqResult.score)}</b> điểm. <a href="#/attempt/${a.id}">Xem toàn bộ bài</a></p></div>
    ${rows}
    <div class="row"><button class="btn primary" id="btnSave">Lưu điểm</button><a class="btn" href="#/parent/grade">Huỷ</a></div>`;
  math($app);
  $app.querySelectorAll('[data-ref]').forEach(card => {
    const inp = card.querySelector('.pts');
    card.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => {
      inp.value = [...card.querySelectorAll('input[type=checkbox]:checked')].reduce((s, x) => s + +x.dataset.pts, 0);
    }));
  });
  $app.querySelector('#btnSave').onclick = async () => {
    a.essayGrades = a.essayGrades || {};
    for (const card of $app.querySelectorAll('[data-ref]')) {
      const v = card.querySelector('.pts').value;
      if (v === '') continue;
      const pts = Math.max(0, Math.min(+card.dataset.max, +v));
      a.essayGrades[card.dataset.ref] = { points: pts, comment: card.querySelector('.cmt').value.trim(), by: 'parent', at: Store.now() };
    }
    Grade.recompute(a);
    try { await Store.put('attempts', a); toast(a.status === 'graded' ? `Đã chấm xong: ${fmt(a.score)} điểm` : 'Đã lưu (còn câu chưa chấm)'); location.hash = '#/parent/grade'; }
    catch (e) { toast(e.message); }
  };
}

// ================= TIẾN ĐỘ (dùng chung) =================
function renderProgress(box, attempts, students, opts = {}) {
  const done = attempts.filter(a => a.status !== 'draft').sort((x, y) => x.submittedAt.localeCompare(y.submittedAt));
  const graded = done.filter(a => a.status === 'graded');
  const mcqC = done.reduce((s, a) => s + a.mcqResult.correct, 0), mcqT = done.reduce((s, a) => s + a.mcqResult.total, 0);
  const avg = graded.length ? graded.reduce((s, a) => s + a.score, 0) / graded.length : null;
  const week = done.filter(a => Date.now() - Date.parse(a.submittedAt) < 7 * 864e5).length;
  const multi = opts.multi && students.length > 1;
  const chOpts = window.TOC.map(ch => `<option value="${ch.chapter}">${esc(ch.title)}</option>`).join('');
  box.innerHTML = `
    <div class="stats" style="margin-bottom:14px">
      <div class="stat"><div class="v">${done.length}</div><div class="l">lượt làm bài (${week} trong 7 ngày)</div></div>
      <div class="stat"><div class="v">${fmt(avg)}</div><div class="l">điểm trung bình (bài đã chấm)</div></div>
      <div class="stat"><div class="v">${mcqT ? Math.round(mcqC / mcqT * 100) + '%' : '–'}</div><div class="l">câu trắc nghiệm đúng</div></div>
      <div class="stat"><div class="v">${done.filter(a => a.status === 'pending').length}</div><div class="l">bài chờ chấm</div></div>
    </div>
    ${done.length ? `
    <div class="card"><div class="row"><div><div class="chart-title">Điểm theo thời gian</div><div class="chart-sub">Mỗi điểm là một lượt làm bài đã chấm</div></div><span class="spacer"></span>
      <select id="chFilter" style="width:auto"><option value="">Tất cả chương</option>${chOpts}</select></div>
      <div class="chart-box"><canvas id="cLine" aria-label="Biểu đồ điểm theo thời gian"></canvas></div></div>
    <div class="card"><div class="chart-title">${multi ? 'Điểm trung bình theo chương – so sánh các bạn' : 'Điểm cao nhất từng bài'}</div>
      <div class="chart-sub">${multi ? 'Mỗi bạn một màu' : 'Cột ngắn = bài cần ôn thêm'}</div>
      <div class="chart-box" id="barBox"><canvas id="cBar" aria-label="Biểu đồ cột điểm"></canvas></div></div>
    <div class="card"><h3>Tiến bộ qua các đề</h3><div class="table-wrap">${setTable(done, multi ? null : students)}</div></div>
    <div class="card"><h3>Lịch sử làm bài</h3><div class="table-wrap"><table class="list"><thead><tr><th>Ngày</th>${multi || opts.showStudent ? '<th>Học sinh</th>' : ''}<th>Bài</th><th>Đề</th><th>Điểm</th><th></th></tr></thead><tbody>
      ${done.slice().reverse().map(a => `<tr><td class="small">${fmtDate(a.submittedAt)}</td>${multi || opts.showStudent ? `<td>${esc(students.find(s => s.id === a.studentId)?.name || '')}</td>` : ''}
        <td>${unitCell(a.lessonId)}</td><td>${esc(Grade.setName(a.lessonId, a.setId))}</td><td>${scoreBadge(a)}</td><td><a href="#/attempt/${a.id}">Xem</a></td></tr>`).join('')}
    </tbody></table></div></div>` : '<p class="empty">Chưa có lượt làm bài nào.</p>'}`;
  if (!done.length || !window.Chart) return;
  const col = chartColors();
  Chart.defaults.color = col.text; Chart.defaults.borderColor = col.grid; Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  const studentColor = sid => students.find(s => s.id === sid)?.color || col.accent;

  const drawLine = (chapter) => {
    charts.filter(c => c.canvas.id === 'cLine').forEach(c => c.destroy());
    charts = charts.filter(c => c.canvas.id !== 'cLine');
    const pts = graded.filter(a => !chapter || Content.chapterOf(a.lessonId) === +chapter);
    const sids = [...new Set(pts.map(a => a.studentId))];
    const labels = pts.map(a => fmtDay(a.submittedAt));
    const datasets = (multi ? sids : [null]).map(sid => {
      const color = multi ? studentColor(sid) : col.accent;
      return {
        label: multi ? (students.find(s => s.id === sid)?.name || '') : 'Điểm',
        data: pts.map(a => (!multi || a.studentId === sid) ? a.score : null),
        borderColor: color, backgroundColor: color, borderWidth: 2, pointRadius: 4, pointHoverRadius: 6, spanGaps: true, tension: 0.2,
        pointBorderColor: col.surface, pointBorderWidth: 2,
      };
    });
    charts.push(new Chart(document.getElementById('cLine'), {
      type: 'line', data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        scales: { y: { min: 0, max: 10, ticks: { stepSize: 2 }, grid: { color: col.grid } }, x: { grid: { display: false } } },
        plugins: {
          legend: { display: multi },
          tooltip: { callbacks: { title: items => { const a = pts[items[0].dataIndex]; return `${Content.unitTitle(a.lessonId)} – ${Grade.setName(a.lessonId, a.setId)}`; }, label: it => `${it.dataset.label}: ${fmt(it.parsed.y)} điểm` } },
        },
      },
    }));
  };
  drawLine('');
  box.querySelector('#chFilter').onchange = e => drawLine(e.target.value);

  if (multi) {
    const sids = students.map(s => s.id);
    const chs = window.TOC.map(ch => ch.chapter);
    const datasets = sids.map(sid => {
      const s = students.find(x => x.id === sid);
      return {
        label: s.name, backgroundColor: s.color, borderRadius: 4, borderSkipped: 'start', borderColor: col.surface, borderWidth: { left: 0, right: 0, top: 0, bottom: 0 },
        data: chs.map(ch => { const g = graded.filter(a => a.studentId === sid && Content.chapterOf(a.lessonId) === ch); return g.length ? g.reduce((x, a) => x + a.score, 0) / g.length : null; }),
      };
    });
    charts.push(new Chart(document.getElementById('cBar'), {
      type: 'bar', data: { labels: chs.map(c => 'Chương ' + ['I', 'II', 'III', 'IV', 'V'][c - 1]), datasets },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 10, grid: { color: col.grid } }, x: { grid: { display: false } } }, plugins: { tooltip: { callbacks: { label: it => `${it.dataset.label}: ${fmt(it.parsed.y)} điểm` } } } },
    }));
  } else {
    const best = bestBy(graded, a => a.lessonId);
    const units = window.TOC.flatMap(ch => ch.units).filter(u => best[u.id]);
    box.querySelector('#barBox').style.height = Math.max(160, units.length * 34 + 40) + 'px';
    charts.push(new Chart(document.getElementById('cBar'), {
      type: 'bar',
      data: { labels: units.map(u => u.title.replace(/^(Bài \d+)\..*/, '$1').replace('Luyện tập chung', 'LT chung')), datasets: [{ label: 'Điểm cao nhất', data: units.map(u => best[u.id].score), backgroundColor: col.accent, borderRadius: 4, borderSkipped: 'start', maxBarThickness: 22 }] },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        scales: { x: { min: 0, max: 10, grid: { color: col.grid } }, y: { grid: { display: false } } },
        plugins: { legend: { display: false }, tooltip: { callbacks: { title: it => units[it[0].dataIndex].title, label: it => `Cao nhất: ${fmt(it.parsed.x)} điểm` } } },
      },
    }));
  }
}
function setTable(done, students) {
  const by = {};
  for (const a of done) { (by[a.lessonId] ||= {}); const cur = by[a.lessonId][a.setId]; if (a.status === 'graded' && (!cur || a.score > cur)) by[a.lessonId][a.setId] = a.score; else if (cur == null && a.status === 'pending') by[a.lessonId][a.setId] = cur ?? null; }
  const units = window.TOC.flatMap(ch => ch.units).filter(u => by[u.id]);
  const cols = ['d1', 'd2', 'd3', 'd4', 'mix', 'custom'];
  const cell = v => v === undefined ? '<td class="num muted">–</td>' : v === null ? '<td class="num"><span class="badge warn">chờ</span></td>' : `<td class="num">${fmt(v)}</td>`;
  return `<table class="list"><thead><tr><th>Bài</th><th>Đề 1</th><th>Đề 2</th><th>Đề 3</th><th>Đề 4★</th><th>Trộn</th><th>Tự chọn</th></tr></thead><tbody>
    ${units.map(u => `<tr><td>${unitCell(u.id)}</td>${cols.map(c => cell(by[u.id][c])).join('')}</tr>`).join('')}</tbody></table>
    <p class="small muted">Điểm cao nhất của mỗi đề (bài đã chấm).</p>`;
}

async function viewProgress() {
  renderTop('progress');
  const d = await myData();
  const s = Store.session;
  $app.innerHTML = `<h1>Tiến độ học tập của ${esc(s.name)}</h1><div id="pg"></div>`;
  renderProgress($app.querySelector('#pg'), d.attempts, [{ id: s.studentId, name: s.name, color: s.color }]);
}

async function viewMe() {
  renderTop('me');
  const s = Store.session;
  $app.innerHTML = `<div class="card"><div class="row">${avatar(s)}<h1 style="margin:0">${esc(s.name)}</h1></div></div>
    ${Store.mode === 'local' ? `<div class="card"><h3>Gửi bài cho phụ huynh</h3>
      <p class="small muted">Dùng khi con học ở máy khác với máy của phụ huynh. Tải file rồi gửi cho bố mẹ (Zalo, USB…).</p>
      <button class="btn" id="btnSend">📤 Tải file bài làm</button>
      <h3 style="margin-top:16px">Nhận bài giao / kết quả chấm</h3>
      <p class="small muted">Nhập "gói giao bài" phụ huynh gửi.</p><button class="btn" id="btnRecv">📥 Nhập gói</button></div>` : ''}
    <div class="card"><button class="btn" id="btnTheme">🌓 Đổi giao diện sáng/tối</button>
      <button class="btn danger" id="btnOut">Đăng xuất</button></div>`;
  $app.querySelector('#btnOut').onclick = () => { Store.logout(); location.hash = '#/login'; };
  $app.querySelector('#btnTheme').onclick = toggleTheme;
  $app.querySelector('#btnSend')?.addEventListener('click', async () => download(`bai-lam-${slug(s.name)}-${today()}.json`, await Store.exportStudentWork()));
  $app.querySelector('#btnRecv')?.addEventListener('click', async () => {
    try {
      const d = await pickJson();
      // máy của con: cho phép nhập gói mà không cần PIN phụ huynh
      const n = await LocalBackend.importData({ role: 'parent' }, d); toast(`Đã nhập ${n} mục`);
    } catch (e) { toast(e.message); }
  });
}
const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').replace(/[^\w]+/g, '-').toLowerCase();
function toggleTheme() {
  const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('toan7.theme', next); } catch (e) { }
}

// ================= DASHBOARD PHỤ HUYNH =================
const PTABS = [['overview', 'Tổng quan'], ['grade', 'Chấm bài'], ['assign', 'Giao bài'], ['progress', 'Tiến độ'], ['students', 'Học sinh'], ['data', 'Dữ liệu']];
let parentFilter = '';
try { parentFilter = sessionStorage.getItem('toan7.pf') || ''; } catch (e) { }

async function viewParent(tab = 'overview', query = {}) {
  renderTop('parent');
  const [students, attemptsAll, assignments, reads] = await Promise.all([Store.list('students'), Store.list('attempts'), Store.list('assignments'), Store.list('reads')]);
  students.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  const attempts = attemptsAll.filter(a => a.status !== 'draft');
  if (parentFilter && !students.some(s => s.id === parentFilter)) parentFilter = '';
  const pending = attempts.filter(a => a.status === 'pending').length;
  $app.innerHTML = `
    <div class="row" style="margin-bottom:10px"><h1 style="margin:0">Dashboard phụ huynh</h1><span class="spacer"></span>
      ${students.length ? `<select id="sf" style="width:auto"><option value="">Tất cả học sinh</option>${students.map(s => `<option value="${esc(s.id)}" ${s.id === parentFilter ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select>` : ''}</div>
    <div class="tabs">${PTABS.map(([k, t]) => `<a href="#/parent/${k}" class="${k === tab ? 'active' : ''}">${t}${k === 'grade' && pending ? ` <span class="badge warn">${pending}</span>` : ''}</a>`).join('')}</div>
    <div id="tab"></div>`;
  $app.querySelector('#sf')?.addEventListener('change', e => { parentFilter = e.target.value; try { sessionStorage.setItem('toan7.pf', parentFilter); } catch (x) { } viewParent(tab, query); });
  const box = $app.querySelector('#tab');
  const ctx = { students, attempts, assignments, reads, box, query, filtered: parentFilter ? students.filter(s => s.id === parentFilter) : students };
  const fn = { overview: pOverview, grade: pGrade, assign: pAssign, progress: pProgress, students: pStudents, data: pData }[tab] || pOverview;
  await fn(ctx);
  math(box);
}

function pOverview({ students, attempts, assignments, reads, box, filtered }) {
  if (!students.length) { box.innerHTML = `<div class="card empty">Chưa có học sinh. <a href="#/parent/students">Thêm học sinh</a></div>`; return; }
  const rows = filtered.map(s => {
    const mine = attempts.filter(a => a.studentId === s.id);
    const graded = mine.filter(a => a.status === 'graded');
    const avg = graded.length ? graded.reduce((x, a) => x + a.score, 0) / graded.length : null;
    const week = mine.filter(a => Date.now() - Date.parse(a.submittedAt) < 7 * 864e5).length;
    const asg = assignments.filter(a => a.studentIds.includes(s.id)).map(a => Grade.assignmentStatus(a, s.id, attempts, reads).status);
    const last = mine.map(a => a.submittedAt).sort().pop();
    return `<tr><td><span class="who"><span class="dot" style="background:${esc(s.color)}"></span>${esc(s.name)}</span></td><td class="num">${week}</td><td class="num">${fmt(avg)}</td>
      <td class="num">${mine.filter(a => a.status === 'pending').length}</td><td>${['todo', 'doing', 'overdue', 'pending'].map(st => { const n = asg.filter(x => x === st).length; return n ? statusBadge(st).replace('</span>', ` ${n}</span>`) : ''; }).join(' ') || '<span class="muted">–</span>'}</td>
      <td class="small muted">${last ? fmtDate(last) : 'chưa làm'}</td></tr>`;
  }).join('');
  // bài yếu: điểm TB thấp nhất (đã chấm)
  const weak = [];
  for (const s of filtered) {
    const by = {};
    for (const a of attempts.filter(a => a.studentId === s.id && a.status === 'graded')) (by[a.lessonId] ||= []).push(a.score);
    for (const [lid, arr] of Object.entries(by)) weak.push({ s, lid, avg: arr.reduce((x, y) => x + y, 0) / arr.length, n: arr.length });
  }
  weak.sort((a, b) => a.avg - b.avg);
  const due = assignments.filter(a => a.dueDate && a.dueDate >= today() && filtered.some(s => a.studentIds.includes(s.id)))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5);
  box.innerHTML = `
    <div class="card"><h3>Tình hình chung</h3><div class="table-wrap"><table class="list"><thead><tr><th>Học sinh</th><th>Lượt làm (7 ngày)</th><th>Điểm TB</th><th>Chờ chấm</th><th>Bài giao</th><th>Lần cuối</th></tr></thead><tbody>${rows}</tbody></table></div></div>
    <div class="card"><h3>⚠️ Bài cần ôn thêm (điểm TB thấp nhất)</h3>
      ${weak.length ? `<table class="list"><tbody>${weak.slice(0, 5).map(w => `<tr><td>${esc(w.s.name)}</td><td>${unitCell(w.lid)}</td><td class="num">${fmt(w.avg)} (${w.n} lượt)</td>
        <td><a class="btn small" href="#/parent/assign?lesson=${w.lid}&student=${w.s.id}">Giao ôn lại</a></td></tr>`).join('')}</tbody></table>` : '<p class="muted">Chưa có bài đã chấm.</p>'}</div>
    <div class="card"><h3>📅 Bài giao sắp đến hạn</h3>${due.length ? `<ul>${due.map(a => `<li>${esc(a.title)} – hạn ${new Date(a.dueDate).toLocaleDateString('vi-VN')}</li>`).join('')}</ul>` : '<p class="muted">Không có.</p>'}
      <a class="btn small primary" href="#/parent/assign">+ Giao bài mới</a></div>`;
}

function pGrade({ students, attempts, box, filtered }) {
  const ids = new Set(filtered.map(s => s.id));
  const pend = attempts.filter(a => a.status === 'pending' && ids.has(a.studentId)).sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
  const name = sid => students.find(s => s.id === sid)?.name || '';
  box.innerHTML = `
    <div class="card"><h3>Bài chờ chấm tự luận (${pend.length})</h3>
      ${pend.length ? `<div class="table-wrap"><table class="list"><thead><tr><th>Nộp lúc</th><th>Học sinh</th><th>Bài</th><th>Trắc nghiệm</th><th></th></tr></thead><tbody>
        ${pend.map(a => `<tr><td>${fmtDate(a.submittedAt)}</td><td>${esc(name(a.studentId))}</td><td>${unitCell(a.lessonId)} – ${esc(Grade.setName(a.lessonId, a.setId))}</td>
          <td class="num">${a.mcqResult.correct}/${a.mcqResult.total}</td><td><a class="btn small primary" href="#/grade/${a.id}">Chấm</a></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Không có bài nào chờ chấm 🎉</p>'}
    </div>
    <div class="card"><h3>🤖 Nhờ AI chấm</h3>
      <ol class="small">
        <li>Bấm <b>Xuất bài chờ chấm</b> → tải file <code>cham-bai-….json</code> (gồm đề, lời giải mẫu, thang điểm, bài làm và ảnh).</li>
        <li>Đưa file cho Claude (Claude Code: "chấm file này"; hoặc tải lên claude.ai). File đã có sẵn hướng dẫn chấm.</li>
        <li>Claude trả về file <code>ket-qua-cham.json</code> → bấm <b>Nhập kết quả chấm</b>. Sau đó vẫn sửa điểm được.</li>
      </ol>
      <div class="row"><button class="btn" id="btnAiExp" ${pend.length ? '' : 'disabled'}>📤 Xuất bài chờ chấm</button><button class="btn" id="btnAiImp">📥 Nhập kết quả chấm</button></div>
    </div>`;
  box.querySelector('#btnAiExp').onclick = async () => {
    try {
      toast('Đang chuẩn bị file…', 1500);
      const data = await Grade.aiExport(pend, Object.fromEntries(students.map(s => [s.id, s])), imageToDataUrl);
      download(`cham-bai-${today()}.json`, data);
    } catch (e) { toast(e.message); }
  };
  box.querySelector('#btnAiImp').onclick = async () => {
    try {
      const json = await pickJson();
      const byId = Object.fromEntries(attempts.map(a => [a.id, a]));
      const r = Grade.aiApply(json, byId);
      for (const a of r.attempts) await Store.put('attempts', a);
      toast(`Đã nhập điểm cho ${r.count} câu (${r.attempts.length} bài)`); viewParent('grade');
    } catch (e) { toast(e.message, 4000); }
  };
}

function pProgress({ students, attempts, box, filtered }) {
  const ids = new Set(filtered.map(s => s.id));
  box.innerHTML = '<div id="pg"></div>';
  renderProgress(box.querySelector('#pg'), attempts.filter(a => ids.has(a.studentId)), filtered, { multi: filtered.length > 1, showStudent: true });
}

function pStudents({ students, attempts, assignments, box }) {
  box.innerHTML = `
    <div class="card"><h3>Danh sách học sinh</h3>
      ${students.length ? `<div class="table-wrap"><table class="list"><thead><tr><th>Tên</th><th>PIN</th><th>Lượt làm</th><th></th></tr></thead><tbody>
      ${students.map(s => `<tr><td><span class="who"><span class="dot" style="background:${esc(s.color)}"></span>${esc(s.name)}</span></td><td><code>${esc(s.pin)}</code></td>
        <td class="num">${attempts.filter(a => a.studentId === s.id).length}</td>
        <td class="row" style="gap:6px"><button class="btn small" data-edit="${esc(s.id)}">Sửa</button>
          ${Store.mode === 'local' ? `<button class="btn small" data-pack="${esc(s.id)}" title="Dùng khi con học ở máy khác">📤 Gói giao bài</button>` : ''}
          <button class="btn small danger" data-del="${esc(s.id)}">Xoá</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Chưa có học sinh.</p>'}
    </div>
    <div class="card"><h3 id="fTitle">Thêm học sinh</h3>
      <form id="sForm" style="max-width:420px">
        <label class="field"><span>Tên</span><input type="text" id="sName" maxlength="30" required></label>
        <label class="field"><span>PIN (4–8 chữ số)</span><input type="text" inputmode="numeric" id="sPin" maxlength="8" required></label>
        <div class="field"><span class="small muted">Màu</span><div class="chips" id="sColor">${PALETTE.map((c, i) => `<label class="chip"><input type="radio" name="color" value="${c}" ${i === students.length % PALETTE.length ? 'checked' : ''}><span class="dot" style="background:${c}"></span></label>`).join('')}</div></div>
        <div class="row"><button class="btn primary">Lưu</button><button type="button" class="btn" id="sCancel" hidden>Huỷ sửa</button></div>
      </form>
      ${Store.mode === 'local' ? '<p class="small muted" style="margin-top:12px">“Gói giao bài”: dùng khi con học ở máy khác (không cùng wifi). Gói gồm thông tin đăng nhập, bài được giao và kết quả chấm của con; gửi file cho con để nhập ở máy của con.</p>' : ''}
    </div>`;
  let editing = null;
  const f = box.querySelector('#sForm');
  box.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    editing = students.find(s => s.id === b.dataset.edit);
    box.querySelector('#fTitle').textContent = 'Sửa: ' + editing.name;
    f.sName.value = editing.name; f.sPin.value = editing.pin;
    f.querySelectorAll('[name=color]').forEach(r => r.checked = r.value === editing.color);
    box.querySelector('#sCancel').hidden = false; f.scrollIntoView({ behavior: 'smooth' });
  });
  box.querySelector('#sCancel').onclick = () => viewParent('students');
  f.onsubmit = async e => {
    e.preventDefault();
    const name = f.sName.value.trim(), pin = f.sPin.value.trim();
    if (!name) return toast('Nhập tên');
    if (!/^\d{4,8}$/.test(pin)) return toast('PIN phải gồm 4–8 chữ số');
    if (students.some(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== editing?.id)) return toast('Tên này đã có');
    const color = f.querySelector('[name=color]:checked')?.value || PALETTE[0];
    await Store.put('students', { ...(editing || { id: Store.uid('s-'), createdAt: Store.now() }), name, pin, color });
    toast('Đã lưu'); viewParent('students');
  };
  box.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    const s = students.find(x => x.id === b.dataset.del);
    if (!confirm(`Xoá học sinh "${s.name}" và toàn bộ bài làm của bạn ấy? Nên Sao lưu trước (tab Dữ liệu).`)) return;
    for (const a of attempts.filter(a => a.studentId === s.id)) await Store.del('attempts', a.id);
    for (const a of assignments.filter(a => a.studentIds.includes(s.id))) {
      a.studentIds = a.studentIds.filter(x => x !== s.id);
      a.studentIds.length ? await Store.put('assignments', a) : await Store.del('assignments', a.id);
    }
    await Store.del('students', s.id); toast('Đã xoá'); viewParent('students');
  });
  box.querySelectorAll('[data-pack]').forEach(b => b.onclick = async () => {
    const s = students.find(x => x.id === b.dataset.pack);
    const all = await Store.exportAll();
    const pick = (col, fn) => Object.fromEntries(Object.values(all[col]).filter(fn).map(x => [x.id, x]));
    download(`giao-bai-${slug(s.name)}-${today()}.json`, {
      kind: 'goi-giao-bai', students: { [s.id]: s },
      assignments: pick('assignments', a => a.studentIds.includes(s.id)),
      attempts: pick('attempts', a => a.studentId === s.id),
    });
  });
}

function pAssign({ students, attempts, assignments, reads, box, query, filtered }) {
  const ready = window.TOC.flatMap(ch => ch.units).filter(u => unitReady(u.id));
  const draft = { title: '', studentIds: query.student ? [query.student] : filtered.length === 1 ? [filtered[0].id] : [], items: [], dueDate: '', note: '', minScore: '' };
  if (query.lesson) { draft.items.push({ type: 'theory', lessonId: query.lesson }, { type: 'set', lessonId: query.lesson, setId: 'mix' }); draft.title = 'Ôn lại: ' + Content.unitTitle(query.lesson); }
  let editingId = null;

  const render = () => {
    const unitOpts = ready.map(u => `<option value="${u.id}">${esc(u.title)}</option>`).join('');
    box.innerHTML = `
      <div class="card"><h3>${editingId ? 'Sửa bài giao' : 'Giao bài mới'}</h3>
        <label class="field"><span>Tiêu đề</span><input type="text" id="aTitle" value="${esc(draft.title)}" placeholder="VD: Ôn số hữu tỉ cuối tuần"></label>
        <div class="field"><span class="small muted">Giao cho</span><div class="chips">
          ${students.map(s => `<label class="chip"><input type="checkbox" class="aStu" value="${esc(s.id)}" ${draft.studentIds.includes(s.id) ? 'checked' : ''}><span class="dot" style="background:${esc(s.color)}"></span>${esc(s.name)}</label>`).join('')}
          ${students.length > 1 ? `<button type="button" class="btn small" id="aAll">Cả nhóm</button>` : ''}</div></div>
        <div class="field"><span class="small muted">Nội dung</span>
          ${draft.items.length ? `<ol>${draft.items.map((it, i) => `<li class="row" style="gap:6px;margin-bottom:4px">${esc(itemLabel(it))} <button class="btn small danger" data-rm="${i}">✕</button></li>`).join('')}</ol>` : '<p class="muted small">Chưa có mục nào.</p>'}
          <div class="row"><select id="aUnit" style="flex:2;min-width:200px">${unitOpts}</select>
            <select id="aType" style="flex:1;min-width:150px"><option value="theory">Đọc lý thuyết</option><option value="d1">Đề 1</option><option value="d2">Đề 2</option><option value="d3">Đề 3</option><option value="d4">Đề 4 – Nâng cao</option><option value="mix">Đề trộn</option><option value="custom">Đề tự chọn câu…</option></select>
            <button type="button" class="btn" id="aAdd">+ Thêm</button></div>
          <div id="picker"></div></div>
        <div class="row">
          <label class="field" style="flex:1;min-width:150px"><span>Hạn nộp</span><input type="date" id="aDue" value="${esc(draft.dueDate)}"></label>
          <label class="field" style="flex:1;min-width:150px"><span>Điểm tối thiểu (tuỳ chọn)</span><input type="number" id="aMin" min="0" max="10" step="0.5" value="${esc(draft.minScore)}" placeholder="VD: 8"></label></div>
        <label class="field"><span>Lời nhắn cho con</span><input type="text" id="aNote" value="${esc(draft.note)}" placeholder="VD: Làm cẩn thận phần quy đồng nhé"></label>
        <div class="row"><button class="btn primary" id="aSave">${editingId ? 'Lưu thay đổi' : 'Giao bài'}</button>${editingId ? '<button class="btn" id="aCancel">Huỷ</button>' : ''}</div>
      </div>
      <div class="card"><h3>Bài đã giao</h3>${assignments.length ? assignments.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(a => `
        <div class="card tight"><div class="row"><b>${esc(a.title)}</b><span class="small muted">giao ${fmtDay(a.createdAt)}${a.dueDate ? ' · hạn ' + new Date(a.dueDate).toLocaleDateString('vi-VN') : ''}</span><span class="spacer"></span>
          <button class="btn small" data-edit="${a.id}">Sửa</button><button class="btn small danger" data-del="${a.id}">Xoá</button></div>
          <div class="small">${a.items.map(itemLabel).map(esc).join(' · ')}</div>
          <div class="row small" style="margin-top:6px">${a.studentIds.map(sid => { const s = students.find(x => x.id === sid); return s ? `<span>${esc(s.name)}: ${statusBadge(Grade.assignmentStatus(a, sid, attempts, reads).status)}</span>` : ''; }).join('')}</div></div>`).join('') : '<p class="muted">Chưa giao bài nào.</p>'}</div>`;
    math(box);
    const sync = () => {
      draft.title = box.querySelector('#aTitle').value; draft.dueDate = box.querySelector('#aDue').value;
      draft.note = box.querySelector('#aNote').value; draft.minScore = box.querySelector('#aMin').value;
      draft.studentIds = [...box.querySelectorAll('.aStu:checked')].map(x => x.value);
    };
    box.querySelector('#aAll')?.addEventListener('click', () => { box.querySelectorAll('.aStu').forEach(x => x.checked = true); });
    box.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { sync(); draft.items.splice(+b.dataset.rm, 1); render(); });
    box.querySelector('#aAdd').onclick = () => {
      sync();
      const lessonId = box.querySelector('#aUnit').value, type = box.querySelector('#aType').value;
      const L = Content.lessons[lessonId];
      if (type === 'custom') return showPicker(lessonId);
      if (/^d\d$/.test(type) && !L.sets.some(s => s.id === type)) return toast('Bài này không có ' + type.replace('d', 'Đề '));
      draft.items.push(type === 'theory' ? { type, lessonId } : { type: 'set', lessonId, setId: type });
      if (!draft.title) draft.title = Content.unitTitle(lessonId);
      render();
    };
    box.querySelector('#aCancel')?.addEventListener('click', () => { editingId = null; Object.assign(draft, { title: '', items: [], note: '', dueDate: '', minScore: '' }); render(); });
    box.querySelector('#aSave').onclick = async () => {
      sync();
      if (!draft.studentIds.length) return toast('Chọn ít nhất một học sinh');
      if (!draft.items.length) return toast('Thêm ít nhất một mục');
      const old = editingId ? assignments.find(a => a.id === editingId) : null;
      const a = { ...(old || { id: Store.uid('as-'), createdAt: Store.now() }), title: draft.title.trim() || 'Bài được giao', studentIds: draft.studentIds, items: draft.items, dueDate: draft.dueDate || null, note: draft.note.trim(), minScore: draft.minScore ? +draft.minScore : null };
      await Store.put('assignments', a); toast('Đã giao bài'); location.hash = '#/parent/assign'; viewParent('assign');
    };
    box.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (confirm('Xoá bài giao này? (bài con đã làm vẫn được giữ)')) { await Store.del('assignments', b.dataset.del); viewParent('assign'); } });
    box.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
      const a = assignments.find(x => x.id === b.dataset.edit); editingId = a.id;
      Object.assign(draft, { title: a.title, studentIds: a.studentIds.slice(), items: JSON.parse(JSON.stringify(a.items)), dueDate: a.dueDate || '', note: a.note || '', minScore: a.minScore ?? '' });
      render(); box.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // chọn câu cho đề tự chọn
  const showPicker = lessonId => {
    const L = Content.lessons[lessonId];
    const wrong = new Set();
    for (const a of attempts.filter(a => a.lessonId === lessonId && draft.studentIds.includes(a.studentId)))
      for (const [ref, ok] of Object.entries(a.mcqResult?.detail || {})) if (!ok) wrong.add(ref);
    const all = L.sets.flatMap(st => [...st.mcq.map(q => ({ q, st, kind: 'mcq' })), ...(st.essay || []).map(q => ({ q, st, kind: 'essay' }))]);
    const pk = box.querySelector('#picker');
    pk.innerHTML = `<div class="card tight" style="margin-top:10px"><div class="row"><b>Chọn câu – ${esc(L.title)}</b><span class="spacer"></span>
        <select id="pLv" style="width:auto"><option value="">Mọi mức</option><option value="de">Dễ</option><option value="vua">Vừa</option><option value="kho">Khó</option></select>
        <button class="btn small" id="pWrong" ${wrong.size ? '' : 'disabled'}>+ Câu con hay sai (${wrong.size})</button></div>
      <div class="qpick" style="margin-top:8px">${all.map(({ q, st, kind }) => `<label data-lv="${q.level}"><input type="checkbox" value="${lessonId}/${q.id}" style="margin-top:4px">
        <span><span class="badge">${esc(st.name)}</span> <span class="badge ${kind === 'essay' ? 'accent' : ''}">${kind === 'essay' ? 'Tự luận ' + fmt(q.maxPoints) + 'đ' : levelText(q.level)}</span>${wrong.has(lessonId + '/' + q.id) ? ' <span class="badge bad">hay sai</span>' : ''} ${q.q}</span></label>`).join('')}</div>
      <div class="row" style="margin-top:8px"><span class="small muted" id="pCount">0 câu</span><span class="spacer"></span><button class="btn small" id="pCancel">Huỷ</button><button class="btn small primary" id="pOk">Thêm đề tự chọn</button></div></div>`;
    math(pk);
    const count = () => pk.querySelector('#pCount').textContent = pk.querySelectorAll('.qpick input:checked').length + ' câu đã chọn';
    pk.querySelector('.qpick').addEventListener('change', count);
    pk.querySelector('#pLv').onchange = e => pk.querySelectorAll('.qpick label').forEach(l => l.hidden = !!e.target.value && l.dataset.lv !== e.target.value);
    pk.querySelector('#pWrong').onclick = () => { pk.querySelectorAll('.qpick input').forEach(i => { if (wrong.has(i.value)) i.checked = true; }); count(); };
    pk.querySelector('#pCancel').onclick = () => pk.innerHTML = '';
    pk.querySelector('#pOk').onclick = () => {
      const refs = [...pk.querySelectorAll('.qpick input:checked')].map(i => i.value);
      if (!refs.length) return toast('Chưa chọn câu nào');
      refs.sort((a, b) => (Content.get(a).kind === 'essay') - (Content.get(b).kind === 'essay') || LEVEL[Content.get(a).q.level] - LEVEL[Content.get(b).q.level]);
      draft.items.push({ type: 'custom', lessonId, refs });
      if (!draft.title) draft.title = Content.unitTitle(lessonId);
      render();
    };
  };
  if (!students.length) { box.innerHTML = `<div class="card empty">Chưa có học sinh. <a href="#/parent/students">Thêm học sinh</a></div>`; return; }
  render();
}

function pData({ box }) {
  const lan = Store.mode === 'server';
  box.innerHTML = `
    <div class="card"><h3>Chế độ hiện tại: ${lan ? '🌐 Mạng LAN (server)' : '💻 Một máy (lưu trong trình duyệt)'}</h3>
      ${lan ? `<p>Các máy cùng wifi mở <b>${esc(location.origin)}</b> để học. Dữ liệu lưu ở thư mục <code>data/</code> trên máy chạy server, tự sao lưu mỗi ngày.</p>`
      : `<p class="small">Dữ liệu nằm trong trình duyệt của máy này. Hãy <b>Sao lưu</b> định kỳ.</p>
         <p class="small muted">Muốn các con làm bài từ điện thoại/máy khác cùng wifi: trên máy này chạy <code>python3 server.py</code> trong thư mục <code>toan</code>, rồi mở địa chỉ được in ra. Có thể chuyển dữ liệu hiện tại sang server bằng Sao lưu → (mở bản server) → Khôi phục.</p>`}</div>
    <div class="card"><h3>Sao lưu & khôi phục</h3>
      <div class="row"><button class="btn" id="dExp">💾 Sao lưu (tải file)</button><button class="btn" id="dImp">📂 Khôi phục / Nhập file</button></div>
      <p class="small muted">"Nhập file" gộp dữ liệu (không xoá dữ liệu đang có): dùng cho file sao lưu, file "bài làm" con gửi, hoặc chuyển dữ liệu giữa máy và server.</p></div>
    <div class="card"><h3>Đổi PIN phụ huynh</h3><form id="pinF" class="row" style="max-width:420px">
      <input type="password" inputmode="numeric" maxlength="8" id="np" placeholder="PIN mới" style="flex:1"><button class="btn">Đổi</button></form></div>
    ${Content.errors.length ? `<div class="card"><h3 style="color:var(--bad)">Lỗi nội dung</h3><ul class="small">${Content.errors.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>` : ''}`;
  box.querySelector('#dExp').onclick = async () => download(`toan7-saoluu-${today()}.json`, await Store.exportAll());
  box.querySelector('#dImp').onclick = async () => { try { const d = await pickJson(); const n = await Store.importData(d); toast(`Đã gộp ${n} mục`); viewParent('data'); } catch (e) { toast(e.message, 4000); } };
  box.querySelector('#pinF').onsubmit = async e => {
    e.preventDefault(); const p = box.querySelector('#np').value.trim();
    if (!/^\d{4,8}$/.test(p)) return toast('PIN phải gồm 4–8 chữ số');
    await Store.setParentPin(p); toast('Đã đổi PIN phụ huynh'); box.querySelector('#np').value = '';
  };
}

// ================= ROUTER =================
const ROUTES = [
  [/^#\/login$/, viewLogin, 'public'],
  [/^#\/toc$/, viewHome, 'any'],
  [/^#\/lesson\/([\w-]+)$/, viewLesson, 'any'],
  [/^#\/quiz\/([\w-]+)\/([\w-]+)$/, viewQuiz, 'student'],
  [/^#\/attempt\/([\w-]+)$/, viewAttempt, 'any'],
  [/^#\/progress$/, viewProgress, 'student'],
  [/^#\/me$/, viewMe, 'student'],
  [/^#\/grade\/([\w-]+)$/, viewGrade, 'parent'],
  [/^#\/parent(?:\/(\w+))?$/, viewParent, 'parent'],
  [/^#\/?$/, viewHome, 'student'],
];
async function route() {
  cleanup.forEach(f => { try { f(); } catch (e) { } }); cleanup = [];
  charts.forEach(c => c.destroy()); charts = [];
  const [path, q] = (location.hash || '#/').split('?');
  const query = qs(q);
  const s = Store.session;
  for (const [re, fn, need] of ROUTES) {
    const m = re.exec(path); if (!m) continue;
    if (need !== 'public' && !s) { location.hash = '#/login'; return; }
    if (need === 'student' && s.role !== 'student') { location.hash = s.role === 'parent' ? '#/parent' : '#/login'; return; }
    if (need === 'parent' && s.role !== 'parent') { location.hash = '#/'; return; }
    try { await fn(...m.slice(1).filter(x => x !== undefined), query); }
    catch (e) { console.error(e); $app.innerHTML = `<div class="card"><p style="color:var(--bad)">Lỗi: ${esc(e.message)}</p><a class="btn" href="#/">Về trang chính</a></div>`; }
    window.scrollTo(0, 0);
    return;
  }
  location.hash = s ? (s.role === 'parent' ? '#/parent' : '#/') : '#/login';
}
// viewParent nhận (tab, query) nhưng tab có thể vắng
const _vp = viewParent;
ROUTES.find(r => r[1] === viewParent)[1] = (...args) => { const query = args.pop(); return _vp(args[0] || 'overview', query); };
const _vl = viewLesson;
ROUTES.find(r => r[1] === viewLesson)[1] = (id, query) => _vl(id, query || {});

(async function start() {
  try { const t = localStorage.getItem('toan7.theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { }
  await Store.init();
  window.addEventListener('hashchange', route);
  route();
})();
