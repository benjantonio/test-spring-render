
document.querySelectorAll(".time-pickable").forEach(timePickable => {
	let activePicker = null;

	timePickable.addEventListener("focus", () => {
		if (activePicker) return;

		activePicker = show(timePickable);

		const onClickAway = ({ target }) => {
			if (
				target === activePicker
				|| target === timePickable
				|| activePicker.contains(target)
			) {
				return;
			}

			document.removeEventListener("mousedown", onClickAway);
			document.body.removeChild(activePicker);
			activePicker = null;
		};

		document.addEventListener("mousedown", onClickAway);
	});
});


function show(timePickable) {
	const picker = buildPicker(timePickable);
	const { bottom: top, left } = timePickable.getBoundingClientRect();

	picker.style.top = `${top}px`;
	picker.style.left = `${left}px`;

	document.body.appendChild(picker);

	return picker;
}

function buildPicker(timePickable) {
	const picker = document.createElement("div");
	const hourOptions = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(numberToOption);
	const minuteOptions = [0, 15, 30, 45].map(numberToOption);

	picker.classList.add("time-picker");
	picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join("")}
		</select>
		:
		<select class="time-picker__select">
			${minuteOptions.join("")}
		</select>
		<div class="time-picker__select" >
			hrs
		</div>
	`;

	const selects = getSelectsFromPicker(picker);

	selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

	if (timePickable.value) {
		const { hour, minute } = getTimePartsFromPickable(timePickable);

		selects.hour.value = hour;
		selects.minute.value = minute;
	}

	return picker;
}

function getTimePartsFromPickable(timePickable) {
	const pattern = /^(\d+):(\d+)/;
	const [hour, minute] = Array.from(timePickable.value.match(pattern)).splice(1);

	return {
		hour,
		minute
	};
}

function getSelectsFromPicker(timePicker) {
	const [hour, minute] = timePicker.querySelectorAll(".time-picker__select");

	return {
		hour,
		minute
	};
}

function getTimeStringFromPicker(timePicker) {
	const selects = getSelectsFromPicker(timePicker);

	return `${selects.hour.value}:${selects.minute.value}`;
}

function numberToOption(number) {
	const padded = number.toString().padStart(2, "0");

	return `<option value="${padded}">${padded}</option>`;
}
