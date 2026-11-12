// Nội dung + chấm điểm + bài giao + chấm AI
'use strict';

// ---------------- Nội dung ----------------
const Content = {
  lessons: {},
  index: {},          // ref "lessonId/qid" -> { lesson, set, q, kind }
  errors: [],
  register(L) {
    this.lessons[L.id] = L;
    for (const set of L.sets || []) {
      for (const q of set.mcq || []) this.index[L.id + '/' + q.id] = { lesson: L, set, q, kind: 'mcq' };
      for (const q of set.essay || []) this.index[L.id + '/' + q.id] = { lesson: L, set, q, kind: 'essay' };
    }
    this.check(L);
  },
  // kiểm tra nhanh khi nạp (bản đầy đủ: node tools/validate.js)
  check(L) {
    const ids = new Set();
    for (const set of L.sets || []) {
      for (const q of set.mcq || []) {
        if (ids.has(q.id)) this.errors.push(`${L.id}: trùng id ${q.id}`); ids.add(q.id);
        if (!Array.isArray(q.options) || q.options.length !== 4 || !(q.answer >= 0 && q.answer < 4)) this.errors.push(`${L.id}/${q.id}: phương án/đáp án sai`);
      }
      let pts = 0;
      for (const e of set.essay || []) {
        if (ids.has(e.id)) this.errors.push(`${L.id}: trùng id ${e.id}`); ids.add(e.id);
        const sum = (e.rubric || []).reduce((a, r) => a + r.pts, 0);
        if (Math.abs(sum - e.maxPoints) > 1e-9) this.errors.push(`${L.id}/${e.id}: tổng rubric ≠ maxPoints`);
        pts += e.maxPoints;
      }
      if ((set.essay || []).length && Math.abs(pts - 3) > 1e-9) this.errors.push(`${L.id}/${set.id}: tổng điểm tự luận ≠ 3`);
    }
    if (this.errors.length) console.warn('Lỗi nội dung:', this.errors);
  },
  get(ref) { return this.index[ref] || null; },
  set(lessonId, setId) { const L = this.lessons[lessonId]; return L && (L.sets || []).find(s => s.id === setId); },
  unitTitle(id) {
    for (const ch of window.TOC) for (const u of ch.units) if (u.id === id) return u.title;
    return this.lessons[id]?.title || id;
  },
  chapterOf(id) { const m = /^c(\d+)-/.exec(id); return m ? +m[1] : 0; },
};
window.registerLesson = L => Content.register(L);

// ---------------- Tiện ích ----------------
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const LEVEL = { de: 0, vua: 1, kho: 2 };
const round2 = x => Math.round(x * 100) / 100;

const Grade = {
  SET_NAMES: { mix: 'Đề trộn', custom: 'Đề tự chọn' },
  setName(lessonId, setId) {
    if (this.SET_NAMES[setId]) return this.SET_NAMES[setId];
    return Content.set(lessonId, setId)?.name || setId;
  },

  // Tạo lượt làm mới. refs: danh sách ref cho đề trộn / tự chọn
  newAttempt({ studentId, lessonId, setId, assignmentId = null, itemIndex = null, refs = null }) {
    let mcqRefs = [], essayRefs = [];
    if (refs) {
      for (const r of refs) { const it = Content.get(r); if (!it) continue; (it.kind === 'mcq' ? mcqRefs : essayRefs).push(r); }
    } else {
      const set = Content.set(lessonId, setId);
      if (!set) throw new Error('Không tìm thấy đề');
      mcqRefs = set.mcq.map(q => lessonId + '/' + q.id);
      essayRefs = (set.essay || []).map(q => lessonId + '/' + q.id);
    }
    return {
      id: Store.uid('at-'), studentId, lessonId, setId, assignmentId, itemIndex,
      items: { mcq: mcqRefs.map(ref => ({ ref, perm: shuffle([0, 1, 2, 3]) })), essay: essayRefs.map(ref => ({ ref })) },
      answers: {}, essay: {}, essayGrades: {},
      startedAt: Store.now(), status: 'draft',
    };
  },

  // Đề trộn: 10 câu từ Đề 1–3, ưu tiên câu từng làm sai; 1 bộ tự luận ngẫu nhiên
  mixRefs(lessonId, history) {
    const L = Content.lessons[lessonId];
    const base = L.sets.filter(s => !s.advanced);
    const pool = base.flatMap(s => s.mcq.map(q => lessonId + '/' + q.id));
    const wrong = new Set();
    for (const a of history) for (const [ref, ok] of Object.entries(a.mcqResult?.detail || {})) if (!ok) wrong.add(ref);
    const picked = [...shuffle(pool.filter(r => wrong.has(r))), ...shuffle(pool.filter(r => !wrong.has(r)))].slice(0, 10);
    picked.sort((a, b) => LEVEL[Content.get(a).q.level] - LEVEL[Content.get(b).q.level]);
    const essaySet = shuffle(base)[0];
    return [...picked, ...(essaySet.essay || []).map(q => lessonId + '/' + q.id)];
  },

  isCorrect(attempt, item) {
    const shown = attempt.answers[item.ref];
    if (shown == null) return false;
    return item.perm[shown] === Content.get(item.ref)?.q.answer;
  },

  // Tính lại điểm. Trắc nghiệm 7đ + tự luận 3đ (không có tự luận → trắc nghiệm 10đ)
  recompute(a) {
    const mcq = a.items.mcq, essay = a.items.essay;
    const mcqMax = essay.length ? 7 : 10;
    if (a.status !== 'draft') {
      const detail = {}; let correct = 0;
      for (const it of mcq) { const ok = this.isCorrect(a, it); detail[it.ref] = ok; if (ok) correct++; }
      a.mcqResult = { correct, total: mcq.length, score: round2(mcq.length ? correct / mcq.length * mcqMax : 0), detail };
    }
    const essayMax = essay.reduce((s, it) => s + (Content.get(it.ref)?.q.maxPoints || 0), 0);
    const graded = essay.filter(it => a.essayGrades?.[it.ref] != null);
    const got = graded.reduce((s, it) => s + (+a.essayGrades[it.ref].points || 0), 0);
    a.essayScore = essayMax ? round2(got / essayMax * (10 - mcqMax)) : 0;
    if (a.status !== 'draft') a.status = graded.length === essay.length ? 'graded' : 'pending';
    a.score = round2((a.mcqResult?.score || 0) + a.essayScore);
    return a;
  },

  submit(a) {
    a.status = 'submitted';
    a.submittedAt = Store.now();
    a.durationSec = Math.round((Date.parse(a.submittedAt) - Date.parse(a.startedAt)) / 1000);
    return this.recompute(a);
  },

  // ---------- Bài giao ----------
  // Trạng thái 1 mục trong bài giao đối với 1 học sinh
  itemStatus(asg, idx, sid, attempts, reads) {
    const it = asg.items[idx];
    if (it.type === 'theory') return reads.some(r => r.studentId === sid && r.lessonId === it.lessonId) ? 'done' : 'todo';
    const mine = attempts.filter(a => a.studentId === sid && a.assignmentId === asg.id && a.itemIndex === idx && a.status !== 'draft');
    if (!mine.length) return 'todo';
    const min = asg.minScore || 0;
    if (mine.some(a => a.status === 'graded' && a.score >= min)) return 'done';
    if (mine.some(a => a.status === 'pending')) return 'pending';
    return 'retry';        // đã chấm nhưng chưa đạt điểm tối thiểu
  },
  assignmentStatus(asg, sid, attempts, reads) {
    const st = asg.items.map((_, i) => this.itemStatus(asg, i, sid, attempts, reads));
    if (st.every(s => s === 'done')) return { status: 'done', items: st };
    if (st.every(s => s === 'done' || s === 'pending')) return { status: 'pending', items: st };
    const overdue = asg.dueDate && new Date() > new Date(asg.dueDate + 'T23:59:59');
    if (overdue) return { status: 'overdue', items: st };
    return { status: st.some(s => s !== 'todo') ? 'doing' : 'todo', items: st };
  },
  STATUS_TEXT: { todo: 'Chưa làm', doing: 'Đang làm', pending: 'Chờ chấm', done: 'Hoàn thành', overdue: 'Quá hạn', retry: 'Cần làm lại' },

  // ---------- Chấm AI ----------
  AI_INSTRUCTIONS: `Bạn là giáo viên Toán lớp 7 (chương trình Kết nối tri thức). Hãy chấm từng câu tự luận trong "items".
Với mỗi câu: đọc đề (question), lời giải mẫu (modelAnswer), thang điểm (rubric, maxPoints) và bài làm của học sinh (studentAnswer và/hoặc ảnh studentImage).
- Cho điểm theo từng tiêu chí trong rubric; được cho điểm lẻ 0,25. Không vượt quá maxPoints.
- Chấp nhận cách giải khác nếu đúng. Nếu chỉ có đáp số đúng mà thiếu lập luận thì trừ điểm các bước lập luận.
- comment: nhận xét ngắn gọn, thân thiện bằng tiếng Việt cho học sinh lớp 7: chỉ ra chỗ đúng, chỗ sai và cách sửa (1–3 câu).
TRẢ VỀ DUY NHẤT một file JSON tên "ket-qua-cham.json" có dạng:
{"kind":"ket-qua-cham","results":[{"attemptId":"...","qid":"...","points":2.5,"comment":"..."}]}`,

  async aiExport(attempts, students, loadImage) {
    const items = [];
    for (const a of attempts) {
      for (const it of a.items.essay) {
        if (a.essayGrades?.[it.ref] != null) continue;
        const c = Content.get(it.ref); if (!c) continue;
        const ans = a.essay?.[it.ref] || {};
        items.push({
          attemptId: a.id, qid: it.ref,
          student: students[a.studentId]?.name || '',
          lesson: Content.unitTitle(a.lessonId),
          question: c.q.q, maxPoints: c.q.maxPoints, rubric: c.q.rubric, modelAnswer: c.q.modelAnswer,
          studentAnswer: ans.text || '',
          studentImage: ans.image ? await loadImage(ans.image) : null,
        });
      }
    }
    return { kind: 'cham-bai-ai', createdAt: Store.now(), instructions: this.AI_INSTRUCTIONS, items };
  },
  // trả về danh sách attempt đã cập nhật
  aiApply(json, attemptsById) {
    const results = Array.isArray(json) ? json : json.results;
    if (!Array.isArray(results)) throw new Error('File không đúng định dạng (cần mảng "results")');
    const changed = new Map(); let n = 0;
    for (const r of results) {
      const a = attemptsById[r.attemptId]; const c = Content.get(r.qid);
      if (!a || !c || !a.items.essay.some(it => it.ref === r.qid)) continue;
      const pts = Math.max(0, Math.min(c.q.maxPoints, Number(r.points) || 0));
      a.essayGrades = a.essayGrades || {};
      a.essayGrades[r.qid] = { points: pts, comment: String(r.comment || ''), by: 'ai', at: Store.now() };
      this.recompute(a); changed.set(a.id, a); n++;
    }
    return { count: n, attempts: [...changed.values()] };
  },
};
window.Content = Content;
window.Grade = Grade;
