import Textfield from "@/lib/components/forms/Textfield";

export default function ShortAnswers() {
	return (
		<div className="flex flex-col w-11/12 gap-5">
			<p className="text-4xl m-0 font-bold max-[700px]:text-3xl">
				II. Short Answers
			</p>
			<Textfield
				name="mentor_why_saq1"
				labelText="Why do you want to be a mentor for VenusHacks? What are you hoping to gain from this experience?"
				containerClass="flex flex-col w-full"
				isRequired={true}
				maxLength={1500}
			/>
			<Textfield
				name="mentor_inclusive_saq2"
				labelText="How do you hope to contribute to VenusHacks' inclusive environment?"
				containerClass="flex flex-col w-full"
				isRequired={true}
				maxLength={1500}
			/>
			<Textfield
				name="mentor_availability_saq3"
				labelText="Are you available to commit to the entire duration of VenusHacks 2026? If not, please specify your availability."
				containerClass="flex flex-col w-full"
				isRequired={true}
				maxLength={1500}
			/>
			<Textfield
				name="mentor_questions_saq4"
				labelText="Questions, comments, concerns?"
				containerClass="flex flex-col w-full"
				isRequired={false}
				maxLength={1500}
			/>
		</div>
	);
}
