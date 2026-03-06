import DayShift from "./DayShift";

export default function ShiftAvailability() {
	return (
		<div className="flex flex-col gap-10 ">
			<div className="text-3xl font-sniglet">IV. Shift Availability</div>
			<div className="w-full flex flex-col items-center gap-10">
				<DayShift
					shiftText="April 16 - Saturday Shift"
					shiftLabel="saturday_availability"
					startHour={7}
					endHour={24}
				/>
				<DayShift
					shiftText="April 17 - Sunday Shift"
					shiftLabel="sunday_availability"
					startHour={7}
					endHour={18}
				/>
			</div>
		</div>
	);
}
