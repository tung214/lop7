#!/usr/bin/env node
// Kiểm tra nội dung: node tools/validate.js [file.js ...]   (mặc định: tất cả content/*.js trừ toc.js)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const katex = require('./node_modules/katex');

const contentDir = path.join(__dirname, '..', 'content');
let files = process.argv.slice(2);
if (!files.length) {
  files = fs.readdirSync(contentDir).filter(f => f.endsWith('.js') && f !== 'toc.js').map(f => path.join(contentDir, f));
}

let errors = 0, warnings = 0;
const err = (f, m) => { errors++; console.log(`  ✗ ${m}`); };
const warn = (f, m) => { warnings++; console.log(`  ! ${m}`); };

function checkMath(file, where, s) {
  if (typeof s !== 'string') return;
  // tách $$..$$ và $..$
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m;
  while ((m = re.exec(s))) {
    const tex = m[1] ?? m[2];
    try { katex.renderToString(tex, { throwOnError: true, displayMode: !!m[1] }); }
    catch (e) { err(file, `${where}: KaTeX lỗi "${tex.slice(0, 60)}" → ${e.message.split('\n')[0]}`); }
  }
  const stripped = s.replace(re, '');
  if (stripped.includes('$')) err(file, `${where}: dấu $ lẻ (thiếu cặp)`);
}

const LEVELS = { de: 0, vua: 1, kho: 2 };
let totalMcq = 0, totalEssay = 0;

for (const file of files) {
  const name = path.basename(file);
  console.log(`• ${name}`);
  const lessons = [];
  const ctx = { registerLesson: l => lessons.push(l) };
  try { vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: name }); }
  catch (e) { err(name, `Không chạy được file: ${e.message}`); continue; }
  if (lessons.length !== 1) { err(name, `Cần đúng 1 registerLesson, có ${lessons.length}`); continue; }
  const L = lessons[0];
  if (L.id + '.js' !== name) err(name, `id "${L.id}" không khớp tên file`);
  for (const k of ['id', 'chapter', 'kind', 'title', 'sets']) if (L[k] == null) err(name, `thiếu trường ${k}`);
  if (!['lesson', 'review'].includes(L.kind)) err(name, `kind không hợp lệ: ${L.kind}`);
  (L.theory || []).forEach((t, i) => { checkMath(name, `theory[${i}].heading`, t.heading); checkMath(name, `theory[${i}]`, t.html); });
  (L.skills || []).forEach((t, i) => checkMath(name, `skills[${i}]`, t));
  (L.examples || []).forEach((t, i) => { checkMath(name, `examples[${i}].q`, t.q); checkMath(name, `examples[${i}].solution`, t.solution); });
  if (L.kind === 'lesson' && !(L.theory || []).length) err(name, 'bài học thiếu lý thuyết');

  const ids = new Set();
  const expectSets = L.kind === 'lesson' ? ['d1', 'd2', 'd3', 'd4'] : ['d1', 'd2', 'd3'];
  const setIds = (L.sets || []).map(s => s.id);
  for (const s of expectSets) if (!setIds.includes(s)) err(name, `thiếu đề ${s}`);

  for (const set of L.sets || []) {
    const w = `[${set.id}]`;
    const mcq = set.mcq || [], essay = set.essay || [];
    const [mn, mx] = L.kind === 'review' ? [10, 12] : [8, 10];
    if (mcq.length < mn || mcq.length > mx) warn(name, `${w} có ${mcq.length} câu trắc nghiệm (nên ${mn}–${mx})`);
    if (essay.length < 1 || essay.length > 2) err(name, `${w} có ${essay.length} câu tự luận (cần 1–2)`);
    let prev = 0;
    const seenQ = new Set();
    for (const q of mcq) {
      const qw = `${w} ${q.id}`;
      if (!q.id || ids.has(q.id)) err(name, `${qw}: id rỗng hoặc trùng`); ids.add(q.id);
      if (!(q.level in LEVELS)) err(name, `${qw}: level không hợp lệ "${q.level}"`);
      else { if (LEVELS[q.level] < prev) err(name, `${qw}: chưa sắp xếp dễ → khó`); prev = LEVELS[q.level]; }
      if (!q.source) warn(name, `${qw}: thiếu source`);
      if (!Array.isArray(q.options) || q.options.length !== 4) err(name, `${qw}: cần đúng 4 phương án`);
      else {
        if (new Set(q.options.map(o => String(o).trim())).size !== 4) err(name, `${qw}: phương án trùng nhau`);
        q.options.forEach((o, i) => checkMath(name, `${qw}.options[${i}]`, o));
        if (q.options.some(o => /cả .*đều|tất cả các|A, B|đáp án [ABCD]/i.test(o))) err(name, `${qw}: phương án tham chiếu A/B/C/D (đáp án bị xáo)`);
      }
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(name, `${qw}: answer phải là 0..3`);
      if (!q.explain) err(name, `${qw}: thiếu explain`);
      checkMath(name, `${qw}.q`, q.q); checkMath(name, `${qw}.explain`, q.explain);
      if (seenQ.has(q.q)) warn(name, `${qw}: đề câu hỏi trùng câu khác trong đề`); seenQ.add(q.q);
      totalMcq++;
    }
    let pts = 0;
    for (const e of essay) {
      const ew = `${w} ${e.id}`;
      if (!e.id || ids.has(e.id)) err(name, `${ew}: id rỗng hoặc trùng`); ids.add(e.id);
      if (!e.modelAnswer) err(name, `${ew}: thiếu modelAnswer`);
      if (!Array.isArray(e.rubric) || !e.rubric.length) err(name, `${ew}: thiếu rubric`);
      else {
        const sum = e.rubric.reduce((a, r) => a + r.pts, 0);
        if (Math.abs(sum - e.maxPoints) > 1e-9) err(name, `${ew}: tổng rubric ${sum} ≠ maxPoints ${e.maxPoints}`);
        e.rubric.forEach((r, i) => checkMath(name, `${ew}.rubric[${i}]`, r.text));
      }
      pts += e.maxPoints || 0;
      checkMath(name, `${ew}.q`, e.q); checkMath(name, `${ew}.modelAnswer`, e.modelAnswer);
      totalEssay++;
    }
    if (Math.abs(pts - 3) > 1e-9) err(name, `${w}: tổng maxPoints tự luận = ${pts} (cần 3)`);
    // phân bố đáp án
    const dist = [0, 0, 0, 0]; mcq.forEach(q => dist[q.answer]++);
    if (mcq.length >= 8 && Math.max(...dist) > mcq.length * 0.6) warn(name, `${w}: đáp án dồn vào một vị trí ${JSON.stringify(dist)}`);
  }
}
console.log(`\nTổng: ${totalMcq} câu trắc nghiệm, ${totalEssay} câu tự luận — ${errors} lỗi, ${warnings} cảnh báo`);
process.exit(errors ? 1 : 0);
