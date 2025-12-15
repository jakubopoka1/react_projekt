"use client";

import { useEffect, useMemo, useState } from "react";

function pad2(n) {
	return String(n).padStart(2, "0");
}
function toKey(date) {
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
		date.getDate()
	)}`;
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
const WEEKDAYS = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];

export default function CalendarPage() {
	const now = new Date();
	const [year, setYear] = useState(now.getFullYear());
	const [monthIndex, setMonthIndex] = useState(now.getMonth());

	const [tasks, setTasks] = useState({});
	const [hydrated, setHydrated] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalDateKey, setModalDateKey] = useState("");
	const [editingTaskId, setEditingTaskId] = useState(null);

	const [formTitle, setFormTitle] = useState("");
	const [formTime, setFormTime] = useState("");
	const [formDesc, setFormDesc] = useState("");

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setTasks(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
		} catch {}
	}, [tasks, hydrated]);

	const monthLabel = useMemo(() => {
		return new Date(year, monthIndex, 1).toLocaleDateString("pl-PL", {
			month: "long",
			year: "numeric",
		});
	}, [year, monthIndex]);

	const gridDays = useMemo(() => {
		const first = startOfMonth(year, monthIndex);
		const leading = weekdayMonFirst(first);
		const total = daysInMonth(year, monthIndex);

		const cells = [];
		for (let i = 0; i < 42; i++) {
			const dayNum = i - leading + 1;
			const date = new Date(year, monthIndex, dayNum);
			const inMonth = dayNum >= 1 && dayNum <= total;
			cells.push({ date, inMonth });
		}
		return cells;
	}, [year, monthIndex]);

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

		setTasks((prev) => {
			const next = { ...prev };
			const list = Array.isArray(next[modalDateKey])
				? [...next[modalDateKey]]
				: [];

			if (editingTaskId) {
				const i = list.findIndex((t) => t.id === editingTaskId);
				if (i !== -1) {
					list[i] = {
						...list[i],
						title: formTitle.trim(),
						time: formTime.trim(),
						desc: formDesc.trim(),
					};
				}
			} else {
				list.push({
					id: uid(),
					title: formTitle.trim(),
					time: formTime.trim(),
					desc: formDesc.trim(),
				});
			}

			next[modalDateKey] = list;
			return next;
		});

		closeModal();
	}

	function deleteTask() {
		if (!editingTaskId) return;

		setTasks((prev) => {
			const next = { ...prev };
			const list = Array.isArray(next[modalDateKey]) ? next[modalDateKey] : [];
			const filtered = list.filter((t) => t.id !== editingTaskId);

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

	return (
		<div className='p-6 text-black'>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex gap-2 items-center'>
					<button className='border px-3 py-2 bg-white' onClick={prevMonth}>
						←
					</button>
					<button className='border px-3 py-2 bg-white' onClick={nextMonth}>
						→
					</button>
					<div className='text-xl font-bold capitalize'>{monthLabel}</div>
				</div>

				<div className='flex gap-2'>
					<select
						className='border px-2 py-2 bg-white'
						value={monthIndex}
						onChange={(e) => setMonthIndex(Number(e.target.value))}>
						{Array.from({ length: 12 }).map((_, i) => (
							<option key={i} value={i}>
								{new Date(2000, i, 1).toLocaleDateString("pl-PL", {
									month: "long",
								})}
							</option>
						))}
					</select>

					<input
						type='number'
						className='border px-2 py-2 w-28 bg-white'
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
					/>
				</div>
			</div>

			<div className='grid grid-cols-7 gap-2 mb-2'>
				{WEEKDAYS.map((d) => (
					<div key={d} className='font-semibold'>
						{d}
					</div>
				))}
			</div>

			<div className='grid grid-cols-7 gap-2'>
				{gridDays.map(({ date, inMonth }, idx) => {
					const key = toKey(date);
					const list = tasksForKey(key);
					const isToday = key === todayKey;

					return (
						<div
							key={idx}
							className={`border rounded p-2 min-h-[120px] bg-white ${
								!inMonth ? "opacity-40" : ""
							} ${isToday ? "ring-2" : ""}`}>
							<div className='flex justify-between mb-2'>
								<b>{date.getDate()}</b>
								<button
									className='border px-2 bg-white'
									onClick={() => openAddModal(date)}>
									+
								</button>
							</div>

							<div className='flex flex-col gap-1'>
								{list.length === 0 && (
									<div className='text-xs text-gray-600'>Brak zadań</div>
								)}
								{list.map((t) => (
									<button
										key={t.id}
										className='border px-2 py-1 text-left bg-white hover:bg-gray-100'
										onClick={() => openEditModal(key, t)}>
										<div className='flex justify-between'>
											<span className='font-medium'>{t.title}</span>
											{t.time && (
												<span className='text-xs text-gray-600'>{t.time}</span>
											)}
										</div>
										{t.desc && (
											<div className='text-xs text-gray-700 truncate'>
												{t.desc}
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					);
				})}
			</div>

			{modalOpen && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
					<div className='bg-white p-4 rounded w-full max-w-md'>
						<h2 className='font-bold mb-2'>
							{editingTaskId ? "Edytuj" : "Dodaj"} zadanie
						</h2>

						<input
							className='border p-2 w-full mb-2'
							placeholder='Tytuł'
							value={formTitle}
							onChange={(e) => setFormTitle(e.target.value)}
						/>
						<input
							className='border p-2 w-full mb-2'
							placeholder='Godzina'
							value={formTime}
							onChange={(e) => setFormTime(e.target.value)}
						/>
						<textarea
							className='border p-2 w-full mb-2'
							placeholder='Opis'
							value={formDesc}
							onChange={(e) => setFormDesc(e.target.value)}
						/>

						<div className='flex justify-between'>
							{editingTaskId && (
								<button className='border px-3 py-2' onClick={deleteTask}>
									Usuń
								</button>
							)}
							<div className='flex gap-2'>
								<button className='border px-3 py-2' onClick={closeModal}>
									Anuluj
								</button>
								<button
									className='border px-3 py-2'
									onClick={saveTask}
									disabled={!formTitle.trim()}>
									Zapisz
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
