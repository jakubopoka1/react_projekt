(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(protected)/calendar/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CalendarPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function pad2(n) {
    return String(n).padStart(2, "0");
}
function toKey(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
function startOfMonth(year, monthIndex) {
    return new Date(year, monthIndex, 1);
}
function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
}
function weekdayMonFirst(date) {
    const d = date.getDay();
    return (d + 6) % 7;
}
function uid() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
const STORAGE_KEY = "calendar_tasks_v1";
const WEEKDAYS = [
    "Pon",
    "Wto",
    "Śro",
    "Czw",
    "Pią",
    "Sob",
    "Nie"
];
function CalendarPage() {
    _s();
    const now = new Date();
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(now.getFullYear());
    const [monthIndex, setMonthIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(now.getMonth());
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalDateKey, setModalDateKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingTaskId, setEditingTaskId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formTitle, setFormTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formTime, setFormTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formDesc, setFormDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarPage.useEffect": ()=>{
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) setTasks(JSON.parse(raw));
            } catch  {}
            setHydrated(true);
        }
    }["CalendarPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarPage.useEffect": ()=>{
            if (!hydrated) return;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            } catch  {}
        }
    }["CalendarPage.useEffect"], [
        tasks,
        hydrated
    ]);
    const monthLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CalendarPage.useMemo[monthLabel]": ()=>{
            return new Date(year, monthIndex, 1).toLocaleDateString("pl-PL", {
                month: "long",
                year: "numeric"
            });
        }
    }["CalendarPage.useMemo[monthLabel]"], [
        year,
        monthIndex
    ]);
    const gridDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CalendarPage.useMemo[gridDays]": ()=>{
            const first = startOfMonth(year, monthIndex);
            const leading = weekdayMonFirst(first);
            const total = daysInMonth(year, monthIndex);
            const cells = [];
            for(let i = 0; i < 42; i++){
                const dayNum = i - leading + 1;
                const date = new Date(year, monthIndex, dayNum);
                const inMonth = dayNum >= 1 && dayNum <= total;
                cells.push({
                    date,
                    inMonth
                });
            }
            return cells;
        }
    }["CalendarPage.useMemo[gridDays]"], [
        year,
        monthIndex
    ]);
    function openAddModal(date) {
        setModalDateKey(toKey(date));
        setEditingTaskId(null);
        setFormTitle("");
        setFormTime("");
        setFormDesc("");
        setModalOpen(true);
    }
    function openEditModal(dateKey, task) {
        setModalDateKey(dateKey);
        setEditingTaskId(task.id);
        setFormTitle(task.title || "");
        setFormTime(task.time || "");
        setFormDesc(task.desc || "");
        setModalOpen(true);
    }
    function closeModal() {
        setModalOpen(false);
        setModalDateKey("");
        setEditingTaskId(null);
        setFormTitle("");
        setFormTime("");
        setFormDesc("");
    }
    function saveTask() {
        if (!formTitle.trim()) return;
        setTasks((prev)=>{
            const next = {
                ...prev
            };
            const list = Array.isArray(next[modalDateKey]) ? [
                ...next[modalDateKey]
            ] : [];
            if (editingTaskId) {
                const i = list.findIndex((t)=>t.id === editingTaskId);
                if (i !== -1) {
                    list[i] = {
                        ...list[i],
                        title: formTitle.trim(),
                        time: formTime.trim(),
                        desc: formDesc.trim()
                    };
                }
            } else {
                list.push({
                    id: uid(),
                    title: formTitle.trim(),
                    time: formTime.trim(),
                    desc: formDesc.trim()
                });
            }
            next[modalDateKey] = list;
            return next;
        });
        closeModal();
    }
    function deleteTask() {
        if (!editingTaskId) return;
        setTasks((prev)=>{
            const next = {
                ...prev
            };
            const list = Array.isArray(next[modalDateKey]) ? next[modalDateKey] : [];
            const filtered = list.filter((t)=>t.id !== editingTaskId);
            if (filtered.length === 0) delete next[modalDateKey];
            else next[modalDateKey] = filtered;
            return next;
        });
        closeModal();
    }
    function prevMonth() {
        const d = new Date(year, monthIndex - 1, 1);
        setYear(d.getFullYear());
        setMonthIndex(d.getMonth());
    }
    function nextMonth() {
        const d = new Date(year, monthIndex + 1, 1);
        setYear(d.getFullYear());
        setMonthIndex(d.getMonth());
    }
    function tasksForKey(key) {
        return Array.isArray(tasks[key]) ? tasks[key] : [];
    }
    const todayKey = toKey(new Date());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "join",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-outline btn-sm join-item",
                                        onClick: prevMonth,
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 185,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-outline btn-sm join-item",
                                        onClick: nextMonth,
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 190,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 184,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold capitalize",
                                children: monthLabel
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 197,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 183,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "select select-bordered select-sm",
                                value: monthIndex,
                                onChange: (e)=>setMonthIndex(Number(e.target.value)),
                                children: Array.from({
                                    length: 12
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: i,
                                        children: new Date(2000, i, 1).toLocaleDateString("pl-PL", {
                                            month: "long"
                                        })
                                    }, i, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 206,
                                        columnNumber: 8
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 201,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "input input-bordered input-sm w-28",
                                value: year,
                                onChange: (e)=>setYear(Number(e.target.value))
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 214,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 200,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/calendar/page.js",
                lineNumber: 182,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-2 mb-2",
                children: WEEKDAYS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-semibold opacity-70 px-1",
                        children: d
                    }, d, false, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 225,
                        columnNumber: 6
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(protected)/calendar/page.js",
                lineNumber: 223,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-2",
                children: gridDays.map(({ date, inMonth }, idx)=>{
                    const key = toKey(date);
                    const list = tasksForKey(key);
                    const isToday = key === todayKey;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "card bg-base-100 shadow-sm border border-base-300",
                            "p-2 min-h-[130px] overflow-hidden",
                            !inMonth ? "opacity-40" : "",
                            isToday ? "ring-2 ring-primary" : ""
                        ].join(" "),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-base",
                                                children: date.getDate()
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                lineNumber: 248,
                                                columnNumber: 10
                                            }, this),
                                            list.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "badge badge-neutral badge-sm",
                                                children: list.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                lineNumber: 250,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 247,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-primary btn-xs",
                                        onClick: ()=>openAddModal(date),
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 256,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 246,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    list.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-60",
                                        children: "Brak zadań"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 265,
                                        columnNumber: 10
                                    }, this),
                                    list.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-ghost btn-sm justify-start text-left normal-case h-auto py-1",
                                            onClick: ()=>openEditModal(key, t),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium truncate",
                                                                children: t.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                                lineNumber: 275,
                                                                columnNumber: 13
                                                            }, this),
                                                            t.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs opacity-70 shrink-0",
                                                                children: t.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                                lineNumber: 277,
                                                                columnNumber: 14
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                                        lineNumber: 274,
                                                        columnNumber: 12
                                                    }, this),
                                                    t.desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs opacity-70 truncate",
                                                        children: t.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                                        lineNumber: 283,
                                                        columnNumber: 13
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                lineNumber: 273,
                                                columnNumber: 11
                                            }, this)
                                        }, t.id, false, {
                                            fileName: "[project]/app/(protected)/calendar/page.js",
                                            lineNumber: 269,
                                            columnNumber: 10
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 263,
                                columnNumber: 8
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 238,
                        columnNumber: 7
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/(protected)/calendar/page.js",
                lineNumber: 231,
                columnNumber: 4
            }, this),
            modalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal modal-open",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-box",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-lg mb-3",
                                children: [
                                    editingTaskId ? "Edytuj" : "Dodaj",
                                    " zadanie"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 299,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input input-bordered w-full",
                                        placeholder: "Tytuł",
                                        value: formTitle,
                                        onChange: (e)=>setFormTitle(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 304,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input input-bordered w-full",
                                        placeholder: "Godzina (np. 14:30)",
                                        value: formTime,
                                        onChange: (e)=>setFormTime(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 310,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "textarea textarea-bordered w-full",
                                        placeholder: "Opis",
                                        value: formDesc,
                                        onChange: (e)=>setFormDesc(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 316,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 303,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-action flex justify-between w-full",
                                children: [
                                    editingTaskId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn btn-error",
                                        onClick: deleteTask,
                                        children: "Usuń"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 326,
                                        columnNumber: 9
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 333,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn",
                                                onClick: closeModal,
                                                children: "Anuluj"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                lineNumber: 337,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn btn-primary",
                                                onClick: saveTask,
                                                disabled: !formTitle.trim(),
                                                children: "Zapisz"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/calendar/page.js",
                                                lineNumber: 340,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/calendar/page.js",
                                        lineNumber: 336,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/calendar/page.js",
                                lineNumber: 324,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 298,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-backdrop",
                        onClick: closeModal
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/calendar/page.js",
                        lineNumber: 351,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/calendar/page.js",
                lineNumber: 297,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/calendar/page.js",
        lineNumber: 181,
        columnNumber: 3
    }, this);
}
_s(CalendarPage, "mT+AXavOw7dj/qrgPmilPmtW3MA=");
_c = CalendarPage;
var _c;
__turbopack_context__.k.register(_c, "CalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28protected%29_calendar_page_91a7630c.js.map