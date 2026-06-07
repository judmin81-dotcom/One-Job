<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>One Job — Daily Home Tasks</title>
<meta name="description" content="One small home job a day. Chip away at the list.">
<meta name="theme-color" content="#7a9e7e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="One Job">
<link rel="manifest" href="manifest.json">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f5f0e8;
    --warm-white: #faf8f4;
    --sage: #7a9e7e;
    --sage-light: #a8c5ab;
    --sage-dark: #5a7a5e;
    --clay: #c4845a;
    --ink: #2c2a26;
    --ink-mid: #5a5650;
    --ink-light: #9a9590;
    --linen: #e8e2d6;
    --linen-dark: #d4cdc0;
    --gold: #c9a84c;
    --mauve: #9b7ea8;
    --mauve-light: #c9b4d4;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px 60px;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .app {
    width: 100%;
    max-width: 480px;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  header { text-align: center; padding: 48px 0 32px; }

  .wordmark {
    font-family: 'Lora', serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink-light);
  }

  .date-display {
    font-family: 'Lora', serif;
    font-size: 28px;
    font-weight: 400;
    color: var(--ink);
    margin-top: 8px;
    line-height: 1.2;
  }

  .streak-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    background: var(--sage);
    color: white;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 5px 14px;
    border-radius: 20px;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.4s, transform 0.4s;
  }
  .streak-pill.visible { opacity: 1; transform: translateY(0); }

  /* ── Section labels ── */
  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 10px;
    padding-left: 2px;
  }

  /* ── Today card ── */
  .today-section { margin-bottom: 24px; }

  .job-card {
    background: var(--warm-white);
    border: 1px solid var(--linen-dark);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s;
  }

  .job-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: var(--sage);
    border-radius: 4px 0 0 4px;
    transition: background 0.4s;
  }
  .job-card.done::before { background: var(--gold); }

  .job-name {
    font-family: 'Lora', serif;
    font-size: 22px;
    font-weight: 500;
    color: var(--ink);
    line-height: 1.3;
    margin-bottom: 8px;
    transition: opacity 0.3s;
  }
  .job-card.done .job-name { text-decoration: line-through; opacity: 0.5; }

  .job-meta { font-size: 13px; color: var(--ink-light); font-style: italic; }
  .job-card.done .job-meta { opacity: 0.5; }

  .done-badge {
    position: absolute;
    top: 16px; right: 16px;
    background: var(--gold);
    color: white;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    padding: 4px 10px;
    border-radius: 10px;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.4s, transform 0.4s;
  }
  .job-card.done .done-badge { opacity: 1; transform: scale(1); }

  /* ── Buttons ── */
  .card-actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }

  .btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    padding: 10px 18px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .btn-primary { background: var(--sage); color: white; flex: 1; }
  .btn-primary:hover { background: var(--sage-dark); }
  .btn-primary:disabled { opacity: 0.4; cursor: default; }
  .btn-ghost { background: transparent; border: 1px solid var(--linen-dark); color: var(--ink-mid); }
  .btn-ghost:hover { background: var(--linen); }

  /* ── No task ── */
  .no-task {
    text-align: center;
    padding: 32px 0 8px;
    color: var(--ink-light);
    font-size: 14px;
    font-style: italic;
  }

  /* ── Add Job form ── */
  .add-section { margin-bottom: 24px; }

  .add-form { display: flex; gap: 8px; margin-bottom: 8px; }

  .add-input {
    flex: 1;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 11px 16px;
    border: 1px solid var(--linen-dark);
    border-radius: 10px;
    background: var(--warm-white);
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }
  .add-input:focus { border-color: var(--sage-light); }
  .add-input::placeholder { color: var(--ink-light); }

  .btn-add {
    background: var(--clay);
    color: white;
    padding: 11px 16px;
    border-radius: 10px;
    font-size: 20px;
    line-height: 1;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .btn-add:hover { background: #b07040; }

  /* ── Recurrence row ── */
  .recur-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0 2px;
  }

  .recur-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    color: var(--ink-light);
  }

  .recur-toggle input[type=checkbox] {
    accent-color: var(--mauve);
    width: 14px; height: 14px;
    cursor: pointer;
  }

  .recur-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .recur-num {
    width: 52px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 5px 8px;
    border: 1px solid var(--linen-dark);
    border-radius: 8px;
    background: var(--warm-white);
    color: var(--ink);
    outline: none;
    text-align: center;
  }
  .recur-num:focus { border-color: var(--mauve-light); }

  .recur-unit {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 5px 8px;
    border: 1px solid var(--linen-dark);
    border-radius: 8px;
    background: var(--warm-white);
    color: var(--ink);
    outline: none;
    cursor: pointer;
  }
  .recur-unit:focus { border-color: var(--mauve-light); }

  .recur-label { font-size: 12px; color: var(--ink-light); }

  /* ── Queue ── */
  .queue-section { margin-bottom: 28px; }

  .queue-list { display: flex; flex-direction: column; gap: 6px; }

  .queue-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--warm-white);
    border: 1px solid var(--linen-dark);
    border-radius: 10px;
    padding: 11px 14px;
    animation: slideIn 0.25s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .queue-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--linen-dark); flex-shrink: 0; }
  .queue-dot.recur { background: var(--mauve-light); }

  .queue-name { flex: 1; font-size: 14px; color: var(--ink-mid); }

  .queue-badge {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 2px 7px;
    border-radius: 8px;
    background: var(--mauve-light);
    color: var(--mauve);
    flex-shrink: 0;
  }

  .queue-delete {
    background: none;
    border: none;
    color: var(--ink-light);
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 2px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  .queue-delete:hover { opacity: 1; }

  .empty-queue {
    text-align: center;
    padding: 20px;
    color: var(--ink-light);
    font-size: 13px;
    font-style: italic;
    border: 1px dashed var(--linen-dark);
    border-radius: 10px;
  }

  /* ── Recurring jobs section ── */
  .recurring-section { margin-bottom: 28px; }

  .recur-list { display: flex; flex-direction: column; gap: 6px; }

  .recur-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--warm-white);
    border: 1px solid var(--linen-dark);
    border-radius: 10px;
    padding: 11px 14px;
    animation: slideIn 0.25s ease;
  }

  .recur-icon { font-size: 14px; flex-shrink: 0; }

  .recur-item-text { flex: 1; min-width: 0; }

  .recur-item-name { font-size: 14px; color: var(--ink-mid); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .recur-item-due {
    font-size: 11px;
    color: var(--ink-light);
    margin-top: 2px;
  }
  .recur-item-due.overdue { color: var(--clay); font-weight: 500; }
  .recur-item-due.due-today { color: var(--sage-dark); font-weight: 500; }

  .item-edit-btn {
    background: none; border: none; color: var(--ink-light);
    cursor: pointer; font-size: 13px; padding: 0 4px;
    opacity: 0.4; transition: opacity 0.2s; flex-shrink: 0;
    line-height: 1;
  }
  .item-edit-btn:hover { opacity: 1; }

  .item-today-btn {
    background: none; border: none; color: var(--sage);
    cursor: pointer; font-size: 16px; padding: 0 4px;
    opacity: 0.5; transition: opacity 0.2s; flex-shrink: 0;
    line-height: 1; font-weight: 700;
  }
  .item-today-btn:hover { opacity: 1; }

  /* ── Edit modal ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(44,42,38,0.35);
    backdrop-filter: blur(2px);
    z-index: 200;
    display: flex; align-items: flex-end; justify-content: center;
    padding: 0 12px 24px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s;
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }

  .modal-sheet {
    background: var(--warm-white);
    border-radius: 20px;
    width: 100%; max-width: 480px;
    padding: 24px;
    transform: translateY(20px);
    transition: transform 0.25s;
    box-shadow: 0 8px 40px rgba(44,42,38,0.18);
  }
  .modal-overlay.open .modal-sheet { transform: translateY(0); }

  .modal-title {
    font-family: 'Lora', serif;
    font-size: 17px;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 18px;
  }

  .modal-field { margin-bottom: 14px; }

  .modal-field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 6px;
    display: block;
  }

  .modal-input {
    width: 100%;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    padding: 11px 14px;
    border: 1px solid var(--linen-dark);
    border-radius: 10px;
    background: var(--cream);
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }
  .modal-input:focus { border-color: var(--sage-light); }

  .modal-recur-toggle {
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; user-select: none;
    font-size: 14px; color: var(--ink-mid);
  }
  .modal-recur-toggle input[type=checkbox] {
    accent-color: var(--mauve);
    width: 16px; height: 16px; cursor: pointer; flex-shrink: 0;
  }

  .modal-interval-row {
    display: flex; align-items: center; gap: 8px;
    margin-top: 10px; flex-wrap: wrap;
  }
  .modal-interval-label { font-size: 13px; color: var(--ink-light); }
  .modal-interval-num {
    width: 60px; text-align: center;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    padding: 8px 10px; border: 1px solid var(--linen-dark);
    border-radius: 9px; background: var(--cream); color: var(--ink); outline: none;
  }
  .modal-interval-num:focus { border-color: var(--mauve-light); }
  .modal-interval-unit {
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    padding: 8px 10px; border: 1px solid var(--linen-dark);
    border-radius: 9px; background: var(--cream); color: var(--ink);
    outline: none; cursor: pointer;
  }
  .modal-interval-unit:focus { border-color: var(--mauve-light); }

  .modal-actions { display: flex; gap: 8px; margin-top: 20px; }

  .modal-save {
    flex: 1; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    padding: 12px; border-radius: 11px; border: none;
    background: var(--sage); color: white; cursor: pointer; transition: background 0.2s;
  }
  .modal-save:hover { background: var(--sage-dark); }

  .modal-cancel {
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    padding: 12px 18px; border-radius: 11px;
    border: 1px solid var(--linen-dark); background: transparent;
    color: var(--ink-mid); cursor: pointer; transition: background 0.2s;
  }
  .modal-cancel:hover { background: var(--linen); }

  /* ── History ── */
  .history-section { margin-bottom: 28px; }
  .history-list { display: flex; flex-direction: column; gap: 6px; }

  .history-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    background: var(--warm-white);
    border: 1px solid var(--linen);
  }

  .history-check { color: var(--sage); font-size: 14px; flex-shrink: 0; }
  .history-text { flex: 1; }
  .history-name { font-size: 14px; color: var(--ink-mid); }
  .history-date { font-size: 11px; color: var(--ink-light); margin-top: 1px; }

  .clear-history-btn {
    font-size: 11px;
    color: var(--ink-light);
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    font-family: 'DM Sans', sans-serif;
    margin-top: 8px;
    display: block;
    text-align: right;
    width: 100%;
  }

  /* ── Divider ── */
  .divider { border: none; border-top: 1px solid var(--linen-dark); margin: 4px 0 20px; }

  /* ── Confetti ── */
  .confetti-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 100; overflow: hidden; }

  .petal {
    position: absolute;
    top: -20px;
    width: 8px; height: 8px;
    border-radius: 50% 0;
    animation: fall linear forwards;
    opacity: 0;
  }
  @keyframes fall {
    0%   { transform: translateY(0) rotate(0deg); opacity: 0.8; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }

  /* ── Collapsible ── */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
  }
  .section-toggle {
    font-size: 11px;
    color: var(--ink-light);
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }
  .collapsible {
    overflow: hidden;
    transition: max-height 0.35s ease, opacity 0.3s;
    max-height: 2000px;
    opacity: 1;
  }
  .collapsible.collapsed { max-height: 0; opacity: 0; }
</style>
</head>
<body>

<div class="confetti-wrap" id="confettiWrap"></div>

<div class="app">

  <header>
    <div class="wordmark">One Job</div>
    <div class="date-display" id="dateDisplay"></div>
    <div class="streak-pill" id="streakPill">
      <span>🌿</span>
      <span id="streakText"></span>
    </div>
  </header>

  <!-- Today -->
  <section class="today-section">
    <div class="section-label">Today's Job</div>
    <div id="todayCard"></div>
  </section>

  <hr class="divider">

  <!-- Add Job -->
  <section class="add-section">
    <div class="section-label">Add a Job</div>
    <div class="add-form">
      <input type="text" class="add-input" id="addInput" placeholder="e.g. Clean bathroom mirror…" maxlength="80">
      <button class="btn-add" id="addBtn" title="Add">+</button>
    </div>
    <div class="recur-row">
      <label class="recur-toggle">
        <input type="checkbox" id="recurCheck">
        <span>Recurring</span>
      </label>
      <div class="recur-controls" id="recurControls" style="display:none">
        <span class="recur-label">every</span>
        <input type="number" class="recur-num" id="recurNum" value="14" min="1" max="365">
        <select class="recur-unit" id="recurUnit">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
        </select>
      </div>
    </div>
  </section>

  <!-- Queue -->
  <section class="queue-section">
    <div class="section-header" id="queueHeader">
      <div class="section-label" style="margin-bottom:0">Job Queue</div>
      <button class="section-toggle" id="queueToggle">hide</button>
    </div>
    <div class="collapsible" id="queueCollapsible">
      <div class="queue-list" id="queueList"></div>
    </div>
  </section>

  <hr class="divider">

  <!-- Recurring jobs -->
  <section class="recurring-section">
    <div class="section-header" id="recurHeader">
      <div class="section-label" style="margin-bottom:0">Recurring Jobs</div>
      <button class="section-toggle" id="recurToggle">hide</button>
    </div>
    <div class="collapsible" id="recurCollapsible">
      <div class="recur-list" id="recurList"></div>
    </div>
  </section>

  <hr class="divider">

  <!-- History -->
  <section class="history-section">
    <div class="section-header" id="historyHeader">
      <div class="section-label" style="margin-bottom:0">Completed Jobs</div>
      <button class="section-toggle" id="historyToggle">hide</button>
    </div>
    <div class="collapsible" id="historyCollapsible">
      <div class="history-list" id="historyList"></div>
    </div>
  </section>

</div>

<!-- Edit modal -->
<div class="modal-overlay" id="editModal">
  <div class="modal-sheet">
    <div class="modal-title">Edit Job</div>
    <div class="modal-field">
      <label class="modal-field-label" for="modalName">Job name</label>
      <input type="text" class="modal-input" id="modalName" maxlength="80">
    </div>
    <div class="modal-field">
      <label class="modal-recur-toggle">
        <input type="checkbox" id="modalRecurCheck">
        <span>Recurring job</span>
      </label>
      <div class="modal-interval-row" id="modalIntervalRow" style="display:none">
        <span class="modal-interval-label">every</span>
        <input type="number" class="modal-interval-num" id="modalIntervalNum" min="1" max="365" value="14">
        <select class="modal-interval-unit" id="modalIntervalUnit">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
        </select>
      </div>
    </div>
    <div class="modal-actions">
      <button class="modal-save" id="modalSave">Save</button>
      <button class="modal-cancel" id="modalCancel">Cancel</button>
    </div>
  </div>
</div>

<script>
// ── State ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'one_job_v1';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState(); }
  catch { return defaultState(); }
}

function defaultState() {
  return {
    queue: [],          // [{ name, recurId? }]  one-off items waiting
    recurring: [],      // [{ id, name, intervalDays, lastDoneDate, nextDueDate }]
    history: [],        // [{ name, date, recurring? }]
    today: null,        // { name, date, recurId? }
    todayDone: false,
    streak: 0,
    lastDoneDate: null,
    undoSnapshot: null,
    queueOpen: true,
    recurOpen: true,
    historyOpen: true,
  };
}

function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

let state = loadState();
// Migrate old queue format (plain strings → objects)
if (state.queue.length && typeof state.queue[0] === 'string') {
  state.queue = state.queue.map(name => ({ name }));
}
// Ensure recurring array always exists (missing in older saved states)
if (!Array.isArray(state.recurring)) state.recurring = [];
if (!Array.isArray(state.queue))     state.queue = [];
if (!Array.isArray(state.history))   state.history = [];

// ── Date helpers ─────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0, 10); }

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

function niceToday() {
  return new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
}

function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
}

function intervalDays(num, unit) {
  if (unit === 'weeks')  return num * 7;
  if (unit === 'months') return num * 30;
  return num;
}

function intervalLabel(r) {
  const days = r.intervalDays;
  if (days % 30 === 0) return `every ${days/30} month${days/30 > 1 ? 's' : ''}`;
  if (days % 7  === 0) return `every ${days/7} week${days/7 > 1 ? 's' : ''}`;
  return `every ${days} day${days > 1 ? 's' : ''}`;
}

function dueLabel(r) {
  const today = todayStr();
  const diff = daysBetween(today, r.nextDueDate);
  if (!r.lastDoneDate) return 'not yet done';
  if (diff < 0)  return `overdue by ${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''}`;
  if (diff === 0) return 'due today';
  if (diff === 1) return 'due tomorrow';
  return `due in ${diff} days`;
}

function dueClass(r) {
  const today = todayStr();
  const diff = daysBetween(today, r.nextDueDate);
  if (diff < 0)  return 'overdue';
  if (diff === 0) return 'due-today';
  return '';
}

// ── Recurring: check & auto-queue ─────────────────────────────────────────
function processRecurring() {
  const today = todayStr();
  let changed = false;
  state.recurring.forEach(r => {
    // Due if never done, or nextDueDate <= today
    const due = !r.lastDoneDate || r.nextDueDate <= today;
    const alreadyQueued = state.queue.some(q => q.recurId === r.id);
    if (due && !alreadyQueued) {
      state.queue.push({ name: r.name, recurId: r.id });
      changed = true;
    }
  });
  if (changed) saveState(state);
}

// ── Streak ───────────────────────────────────────────────────────────────
function checkAndUpdateStreak() {
  const today = todayStr();
  const last = state.lastDoneDate;
  if (last === today) return;
  if (last) {
    const diff = daysBetween(last, today);
    state.streak = diff === 1 ? (state.streak || 0) + 1 : 1;
  } else {
    state.streak = 1;
  }
  state.lastDoneDate = today;
}

// ── Suggest today ─────────────────────────────────────────────────────────
function suggestJob(forceNew) {
  const today = todayStr();
  if (state.today && state.today.date === today && !forceNew) return;
  if (state.queue.length === 0) { state.today = null; state.todayDone = false; return; }
  const idx = Math.floor(Math.random() * state.queue.length);
  const item = state.queue[idx];
  state.today = { name: item.name, date: today, recurId: item.recurId || null };
  state.todayDone = false;
  saveState(state);
}

// ── Mark done ─────────────────────────────────────────────────────────────
function markDone() {
  if (!state.today || state.todayDone) return;

  state.undoSnapshot = JSON.parse(JSON.stringify({
    queue: state.queue, history: state.history, today: state.today,
    todayDone: state.todayDone, streak: state.streak, lastDoneDate: state.lastDoneDate,
    recurring: state.recurring,
  }));

  state.todayDone = true;
  const today = todayStr();

  // Remove from queue (match by recurId if present, else name)
  state.queue = state.queue.filter(q =>
    state.today.recurId ? q.recurId !== state.today.recurId : q.name !== state.today.name
  );

  // If recurring, update lastDoneDate + nextDueDate
  if (state.today.recurId) {
    const r = state.recurring.find(x => x.id === state.today.recurId);
    if (r) {
      r.lastDoneDate = today;
      r.nextDueDate  = addDays(today, r.intervalDays);
    }
  }

  state.history.unshift({ name: state.today.name, date: today, recurring: !!state.today.recurId });
  if (state.history.length > 60) state.history = state.history.slice(0, 60);

  checkAndUpdateStreak();
  saveState(state);
  renderAll();
  spawnPetals();
}

// ── Undo ─────────────────────────────────────────────────────────────────
function undoComplete() {
  if (!state.undoSnapshot) return;
  const s = state.undoSnapshot;
  Object.assign(state, { queue: s.queue, history: s.history, today: s.today,
    todayDone: s.todayDone, streak: s.streak, lastDoneDate: s.lastDoneDate,
    recurring: s.recurring, undoSnapshot: null });
  saveState(state);
  renderAll();
}

// ── Confetti ──────────────────────────────────────────────────────────────
function spawnPetals() {
  const wrap = document.getElementById('confettiWrap');
  const colours = ['#7a9e7e','#a8c5ab','#c9a84c','#c4845a','#d4cdc0'];
  for (let i = 0; i < 28; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colours[Math.floor(Math.random() * colours.length)];
      p.style.animationDuration = (2 + Math.random() * 2) + 's';
      p.style.animationDelay = (Math.random() * 0.5) + 's';
      p.style.width = p.style.height = (6 + Math.random() * 6) + 'px';
      wrap.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 60);
  }
}

// ── Render ────────────────────────────────────────────────────────────────
function renderHeader() {
  document.getElementById('dateDisplay').textContent = niceToday();
  const pill = document.getElementById('streakPill');
  const txt  = document.getElementById('streakText');
  if (state.streak >= 2)     { txt.textContent = `${state.streak} day streak`; pill.classList.add('visible'); }
  else if (state.streak ===1){ txt.textContent = 'Day 1 — keep going';          pill.classList.add('visible'); }
  else                        { pill.classList.remove('visible'); }
}

function renderTodayCard() {
  const c = document.getElementById('todayCard');
  if (!state.today) {
    const hasJobs = state.queue.length > 0;
    c.innerHTML = `
      <div class="no-task">${hasJobs ? 'Tap <em>Suggest a Job</em> to get today\'s task.' : 'Add some jobs below to get started.'}</div>
      ${hasJobs ? `<div style="margin-top:12px"><button class="btn btn-primary" id="suggestBtn" style="width:100%">Suggest a Job →</button></div>` : ''}
    `;
    document.getElementById('suggestBtn')?.addEventListener('click', () => { suggestJob(true); renderAll(); });
    return;
  }
  const done = state.todayDone;
  const isRecur = !!state.today.recurId;
  const metaText = isRecur
    ? `Recurring job${done ? '' : ' — suggested for today'}`
    : 'Suggested for today';

  c.innerHTML = `
    <div class="job-card ${done ? 'done' : ''}">
      <div class="done-badge">Done ✓</div>
      <div class="job-name">${escHtml(state.today.name)}</div>
      <div class="job-meta">${metaText}</div>
      <div class="card-actions">
        <button class="btn btn-primary" id="doneBtn" ${done ? 'disabled' : ''}>${done ? '✓ Completed' : 'Mark as Done'}</button>
        ${done
          ? `<button class="btn btn-ghost" id="undoBtn">↩ Undo</button>`
          : `<button class="btn btn-ghost" id="skipBtn">Different Job</button>`}
      </div>
    </div>
  `;
  document.getElementById('doneBtn')?.addEventListener('click', markDone);
  document.getElementById('undoBtn')?.addEventListener('click', undoComplete);
  document.getElementById('skipBtn')?.addEventListener('click', () => { suggestJob(true); renderAll(); });
}

function renderQueue() {
  const list   = document.getElementById('queueList');
  const toggle = document.getElementById('queueToggle');
  const coll   = document.getElementById('queueCollapsible');
  toggle.textContent = state.queueOpen ? 'hide' : 'show';
  coll.classList.toggle('collapsed', !state.queueOpen);

  if (!state.queue.length) {
    list.innerHTML = `<div class="empty-queue">No jobs queued — add some above.</div>`;
    return;
  }
  list.innerHTML = state.queue.map((job, i) => `
    <div class="queue-item">
      <div class="queue-dot ${job.recurId ? 'recur' : ''}"></div>
      <div class="queue-name">${escHtml(job.name)}</div>
      ${job.recurId ? `<span class="queue-badge">↺ recurring</span>` : ''}
      <button class="item-today-btn" data-qi="${i}" title="Do today">→</button>
      <button class="item-edit-btn" data-qi="${i}" title="Edit">✏️</button>
      <button class="queue-delete" data-i="${i}" title="Remove">×</button>
    </div>
  `).join('');

  list.querySelectorAll('.item-today-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const i = parseInt(btn.dataset.qi);
      const job = state.queue[i];
      state.today = { name: job.name, date: todayStr(), recurId: job.recurId || null };
      state.todayDone = false;
      saveState(state); renderAll();
    });
  });

  list.querySelectorAll('.item-edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const i = parseInt(btn.dataset.qi);
      const job = state.queue[i];
      // If it's a recurring queue item, edit via the recurring entry
      if (job.recurId) {
        const r = state.recurring.find(x => x.id === job.recurId);
        if (r) openEditModal({ type: 'recurring', id: r.id });
      } else {
        openEditModal({ type: 'queue', index: i });
      }
    });
  });

  list.querySelectorAll('.queue-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.i);
      const removed = state.queue[i];
      state.queue.splice(i, 1);
      if (state.today && state.today.name === removed.name) { state.today = null; state.todayDone = false; }
      saveState(state); renderAll();
    });
  });
}

function renderRecurring() {
  const list   = document.getElementById('recurList');
  const toggle = document.getElementById('recurToggle');
  const coll   = document.getElementById('recurCollapsible');
  toggle.textContent = state.recurOpen ? 'hide' : 'show';
  coll.classList.toggle('collapsed', !state.recurOpen);

  if (!state.recurring.length) {
    list.innerHTML = `<div class="empty-queue">No recurring jobs yet. Tick "Recurring" when adding a job.</div>`;
    return;
  }

  list.innerHTML = state.recurring.map((r, i) => `
    <div class="recur-item">
      <div class="recur-icon">↺</div>
      <div class="recur-item-text">
        <div class="recur-item-name">${escHtml(r.name)}</div>
        <div class="recur-item-due ${dueClass(r)}">${intervalLabel(r)} · ${dueLabel(r)}</div>
      </div>
      <button class="item-edit-btn" data-rid="${r.id}" title="Edit">✏️</button>
      <button class="queue-delete" data-ri="${i}" title="Remove">×</button>
    </div>
  `).join('');

  list.querySelectorAll('.item-edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openEditModal({ type: 'recurring', id: btn.dataset.rid });
    });
  });

  list.querySelectorAll('.queue-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.ri);
      const r = state.recurring[i];
      state.queue = state.queue.filter(q => q.recurId !== r.id);
      state.recurring.splice(i, 1);
      if (state.today && state.today.recurId === r.id) { state.today = null; state.todayDone = false; }
      saveState(state); renderAll();
    });
  });
}

function renderHistory() {
  const list   = document.getElementById('historyList');
  const toggle = document.getElementById('historyToggle');
  const coll   = document.getElementById('historyCollapsible');
  toggle.textContent = state.historyOpen ? 'hide' : 'show';
  coll.classList.toggle('collapsed', !state.historyOpen);

  if (!state.history.length) {
    list.innerHTML = `<div class="empty-queue">No completed jobs yet. You've got this.</div>`;
    return;
  }
  list.innerHTML = state.history.map(h => `
    <div class="history-item">
      <div class="history-check">${h.recurring ? '↺' : '✓'}</div>
      <div class="history-text">
        <div class="history-name">${escHtml(h.name)}</div>
        <div class="history-date">${formatDate(h.date)}</div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.clear-history-btn').forEach(el => el.remove());
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-history-btn';
  clearBtn.textContent = 'Clear history';
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all history?')) { state.history = []; saveState(state); renderAll(); }
  });
  list.after(clearBtn);
}

function renderAll() {
  renderHeader();
  renderTodayCard();
  renderQueue();
  renderRecurring();
  renderHistory();
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Add job ───────────────────────────────────────────────────────────────
document.getElementById('addBtn').addEventListener('click', addJob);
document.getElementById('addInput').addEventListener('keydown', e => { if (e.key === 'Enter') addJob(); });

// Recurrence toggle
document.getElementById('recurCheck').addEventListener('change', function() {
  document.getElementById('recurControls').style.display = this.checked ? 'flex' : 'none';
});

function addJob() {
  const input    = document.getElementById('addInput');
  const val      = input.value.trim();
  if (!val) return;

  const isRecur  = document.getElementById('recurCheck').checked;
  const numRaw   = parseInt(document.getElementById('recurNum').value) || 14;
  const unit     = document.getElementById('recurUnit').value;
  const days     = intervalDays(numRaw, unit);

  if (isRecur) {
    // Check not already a recurring job by same name
    if (state.recurring.some(r => r.name === val)) { input.select(); return; }
    const id = Date.now().toString(36);
    const today = todayStr();
    state.recurring.push({
      id,
      name: val,
      intervalDays: days,
      lastDoneDate: null,
      nextDueDate: today,   // due immediately — queue it now
    });
    // Queue it right away (first time)
    state.queue.push({ name: val, recurId: id });
  } else {
    if (state.queue.some(q => q.name === val && !q.recurId)) { input.select(); return; }
    state.queue.push({ name: val });
  }

  if (!state.today || state.today.date !== todayStr()) suggestJob(false);

  saveState(state);
  input.value = '';
  document.getElementById('recurCheck').checked = false;
  document.getElementById('recurControls').style.display = 'none';
  renderAll();
}

// ── Edit Modal ────────────────────────────────────────────────────────────
let editContext = null; // { type: 'queue'|'recurring', index?, id? }

const modalOverlay    = document.getElementById('editModal');
const modalName       = document.getElementById('modalName');
const modalRecurCheck = document.getElementById('modalRecurCheck');
const modalIntervalRow= document.getElementById('modalIntervalRow');
const modalIntervalNum= document.getElementById('modalIntervalNum');
const modalIntervalUnit=document.getElementById('modalIntervalUnit');

modalRecurCheck.addEventListener('change', function() {
  modalIntervalRow.style.display = this.checked ? 'flex' : 'none';
});

function openEditModal(ctx) {
  editContext = ctx;
  if (ctx.type === 'queue') {
    const job = state.queue[ctx.index];
    modalName.value = job.name;
    modalRecurCheck.checked = false;
    modalIntervalRow.style.display = 'none';
    modalIntervalNum.value = 14;
    modalIntervalUnit.value = 'days';
  } else {
    const r = state.recurring.find(x => x.id === ctx.id);
    modalName.value = r.name;
    modalRecurCheck.checked = true;
    modalIntervalRow.style.display = 'flex';
    const d = r.intervalDays;
    if (d % 30 === 0)     { modalIntervalNum.value = d/30; modalIntervalUnit.value = 'months'; }
    else if (d % 7 === 0) { modalIntervalNum.value = d/7;  modalIntervalUnit.value = 'weeks'; }
    else                  { modalIntervalNum.value = d;     modalIntervalUnit.value = 'days'; }
  }
  modalOverlay.classList.add('open');
  setTimeout(() => modalName.focus(), 100);
}

function closeEditModal() {
  modalOverlay.classList.remove('open');
  editContext = null;
}

document.getElementById('modalCancel').addEventListener('click', closeEditModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeEditModal(); });

document.getElementById('modalSave').addEventListener('click', () => {
  const newName = modalName.value.trim();
  if (!newName || !editContext) return;
  const isRecur  = modalRecurCheck.checked;
  const num      = parseInt(modalIntervalNum.value) || 14;
  const unit     = modalIntervalUnit.value;
  const days     = intervalDays(num, unit);

  if (editContext.type === 'queue') {
    const job = state.queue[editContext.index];
    const oldName = job.name;

    if (isRecur) {
      // Promote one-off → recurring
      state.queue.splice(editContext.index, 1);
      const id = Date.now().toString(36);
      state.recurring.push({ id, name: newName, intervalDays: days, lastDoneDate: null, nextDueDate: todayStr() });
      state.queue.push({ name: newName, recurId: id });
      if (state.today && state.today.name === oldName) { state.today.name = newName; state.today.recurId = id; }
    } else {
      // Update name only
      job.name = newName;
      if (state.today && state.today.name === oldName) state.today.name = newName;
    }

  } else {
    // Editing a recurring job
    const r = state.recurring.find(x => x.id === editContext.id);
    const oldName = r.name;

    if (isRecur) {
      // Update name + interval
      r.name = newName;
      r.intervalDays = days;
      const base = r.lastDoneDate || todayStr();
      r.nextDueDate = addDays(base, days);
      // Update name in queue entry too
      const qEntry = state.queue.find(q => q.recurId === r.id);
      if (qEntry) qEntry.name = newName;
      if (state.today && state.today.recurId === r.id) state.today.name = newName;
    } else {
      // Demote recurring → one-off
      state.queue = state.queue.filter(q => q.recurId !== r.id);
      state.recurring = state.recurring.filter(x => x.id !== r.id);
      if (state.today && state.today.recurId === r.id) { state.today.name = newName; state.today.recurId = null; }
      state.queue.push({ name: newName });
    }
  }

  saveState(state);
  closeEditModal();
  renderAll();
});

// ── Collapsibles ──────────────────────────────────────────────────────────
document.getElementById('queueHeader').addEventListener('click', () => {
  state.queueOpen = !state.queueOpen; saveState(state); renderQueue();
});
document.getElementById('recurHeader').addEventListener('click', () => {
  state.recurOpen = !state.recurOpen; saveState(state); renderRecurring();
});
document.getElementById('historyHeader').addEventListener('click', () => {
  state.historyOpen = !state.historyOpen; saveState(state); renderHistory();
});

// ── Boot ──────────────────────────────────────────────────────────────────
processRecurring();   // auto-queue any overdue recurring jobs on load
if (state.queue.length > 0 && (!state.today || state.today.date !== todayStr())) {
  suggestJob(false);
}
renderAll();

// ── Service Worker ────────────────────────────────────────────────────────
if ('serviceWorker' in navigator && !location.hostname.includes('claudeusercontent.com')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.warn('SW registration failed:', err));
  });
}
</script>
</body>
</html>
