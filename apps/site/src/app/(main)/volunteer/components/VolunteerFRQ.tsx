import Textfield from "@/lib/components/forms/Textfield";

export default function VolunteerFRQ() {
	return (
		<div className="flex flex-col items-start gap-5">
			<div className="text-xl font-semibold">III. Free Response Questions</div>
			<Textfield
				name="frq_volunteer"
				labelText="Why do you want to be a volunteer at Venus Hacks? [max of 150 words]"
				containerClass="w-full"
				placeholder={"Answer in 150 words"}
				isRequired={true}
				maxLength={150}
			/>
			<Textfield
				name="frq_experience"
				labelText="What do you expect to gain from this experience? [max of 150 words]"
				containerClass="w-full"
				placeholder={"Answer in 150 words"}
				isRequired={true}
				maxLength={150}
			/>
			<Textfield
				name="frq_picnic"
				labelText="What would you bring to your ideal picnic outing and why? Who would be there? [max of 100 words]"
				containerClass="w-full"
				placeholder={"Answer in 150 words"}
				isRequired={true}
				maxLength={100}
			/>
		</div>
	);
}
