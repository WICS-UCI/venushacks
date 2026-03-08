import DropdownSelectYesFRQ from "@/lib/components/forms/DropdownSelectYesFRQ";
import SimpleCheckBox from "@/lib/components/forms/SimpleCheckBox";

const yesNoValues = [
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" },
];

export default function VolunteerGeneralQuestions() {
	return (
		<div className="flex flex-col items-start gap-5">
			<div className="text-xl font-semibold">II. General Questions</div>
			<DropdownSelectYesFRQ
				name="prior_experience"
				labelText="Any prior hackathon volunteer experience (ex. VH 2025)?"
				containerClass="w-full"
				values={yesNoValues}
			/>
			<SimpleCheckBox
				name="transportation"
				labelText="I acknowledge that I am responsible for my own transportation to UC Irvine and overnight stay between event days."
				containerClass="w-full"
				isRequired={true}
				labelClass=""
			/>
			<SimpleCheckBox
				name="availability_confirmation"
				labelText="I will be available to volunteer a combined amount of 5 hours minimum across Friday, May 15th, through May 17th, Sunday."
				containerClass="w-full"
				isRequired={true}
				labelClass=""
			/>
		</div>
	);
}
