import Textfield from "@/lib/components/forms/Textfield";

export default function ExtraQuestions() {
	return (
		<div className="flex flex-col gap-5">
			<div className="text-xl font-semibold font-sniglet">
				V. Extra Questions
			</div>
			<Textfield
				name="allergies"
				labelText="If you are tasked to serve food, do you have any allergies we should be aware of? If so, please explain the severity of each allergy."
				containerClass="w-11/12 flex flex-col gap-5 font-sniglent"
				isRequired={false}
				maxLength={1500}
			/>
			<Textfield
				name="extra_questions"
				labelText="Any questions, comments, or concerns?"
				containerClass="w-11/12 flex flex-col gap-5 font-sniglet"
				isRequired={false}
				maxLength={1500}
			/>
		</div>
	);
}
