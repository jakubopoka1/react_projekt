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
		<div className='p-6'>
			<div className='flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between'>
				<div className='flex items-center gap-2'>
					<div className='join'>
						<button
							className='btn btn-outline btn-sm join-item'
							onClick={prevMonth}>
							←
						</button>
						<button
							className='btn btn-outline btn-sm join-item'
							onClick={nextMonth}>
							→
						</button>
					</div>

					<div className='text-2xl font-bold capitalize'>{monthLabel}</div>
				</div>

				<div className='flex gap-2 items-center'>
					<select
						className='select select-bordered select-sm'
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
						className='input input-bordered input-sm w-28'
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
					/>
				</div>
			</div>

			<div className='grid grid-cols-7 gap-2 mb-2'>
				{WEEKDAYS.map((d) => (
					<div key={d} className='text-sm font-semibold opacity-70 px-1'>
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
							className={[
								"card bg-base-100 shadow-sm border border-base-300",
								"p-2 min-h-[130px] overflow-hidden",
								!inMonth ? "opacity-40" : "",
								isToday ? "ring-2 ring-primary" : "",
							].join(" ")}>
							<div className='flex justify-between items-start gap-2 mb-2'>
								<div className='flex items-center gap-2'>
									<div className='font-bold text-base'>{date.getDate()}</div>
									{list.length > 0 && (
										<div className='badge badge-neutral badge-sm'>
											{list.length}
										</div>
									)}
								</div>

								<button
									className='btn btn-primary btn-xs'
									onClick={() => openAddModal(date)}>
									+
								</button>
							</div>

							<div className='flex flex-col gap-1'>
								{list.length === 0 && (
									<div className='text-xs opacity-60'>Brak zadań</div>
								)}

								{list.map((t) => (
									<button
										key={t.id}
										className='btn btn-ghost btn-sm justify-start text-left normal-case h-auto py-1'
										onClick={() => openEditModal(key, t)}>
										<div className='w-full'>
											<div className='flex justify-between gap-2'>
												<span className='font-medium truncate'>{t.title}</span>
												{t.time && (
													<span className='text-xs opacity-70 shrink-0'>
														{t.time}
													</span>
												)}
											</div>
											{t.desc && (
												<div className='text-xs opacity-70 truncate'>
													{t.desc}
												</div>
											)}
										</div>
									</button>
								))}
							</div>
						</div>
					);
				})}
			</div>

			{modalOpen && (
				<div className='modal modal-open'>
					<div className='modal-box'>
						<h2 className='font-bold text-lg mb-3'>
							{editingTaskId ? "Edytuj" : "Dodaj"} zadanie
						</h2>

						<div className='space-y-2'>
							<input
								className='input input-bordered w-full'
								placeholder='Tytuł'
								value={formTitle}
								onChange={(e) => setFormTitle(e.target.value)}
							/>
							<input
								className='input input-bordered w-full'
								placeholder='Godzina (np. 14:30)'
								value={formTime}
								onChange={(e) => setFormTime(e.target.value)}
							/>
							<textarea
								className='textarea textarea-bordered w-full'
								placeholder='Opis'
								value={formDesc}
								onChange={(e) => setFormDesc(e.target.value)}
							/>
						</div>

						<div className='modal-action flex justify-between w-full'>
							{editingTaskId ? (
								<button
									type='button'
									className='btn btn-error'
									onClick={deleteTask}>
									Usuń
								</button>
							) : (
								<div />
							)}

							<div className='flex gap-2'>
								<button type='button' className='btn' onClick={closeModal}>
									Anuluj
								</button>
								<button
									type='button'
									className='btn btn-primary'
									onClick={saveTask}
									disabled={!formTitle.trim()}>
									Zapisz
								</button>
							</div>
						</div>
					</div>

					<div className='modal-backdrop' onClick={closeModal} />
				</div>
			)}
		</div>
	);
}
