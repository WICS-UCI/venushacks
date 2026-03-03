import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import MultipleSelect from "@/lib/components/forms/MultipleSelect";
import SimpleRadio from "@/lib/components/forms/SimpleRadio";
import TextInput from "@/lib/components/forms/TextInput";

const pronouns = [
	{ value: "he", text: "He/him/his" },
	{ value: "she", text: "She/her/hers" },
	{ value: "they", text: "They/them/theirs" },
	{ value: "ze", text: "Ze/zir/zirs" },
	{ value: "other", text: "Other:" },
];

const ethnicity = [
	{ value: "American", text: "American Indian or Alaskan" },
	{ value: "Asian", text: "Asian or Pacific Islander" },
	{ value: "Black", text: "Black or African American" },
	{ value: "Hispanic", text: "Hispanic" },
	{ value: "White", text: "White or Caucasian" },
	{ value: "Two-or-more", text: "Two or more races" },
	{ value: "Prefer not to answer", text: "Prefer not to answer" },
	{ value: "other", text: "Other:" },
];

const yesNoOptions = [
	{ labelText: "Yes", inputValue: "Yes" },
	{ labelText: "No", inputValue: "No" },
];

export default function BasicInformation() {
	return (
		<div className="flex flex-col gap-5 w-11/12">
			<p className="text-4xl m-0 max-[700px]:text-3xl">Basic Information</p>
			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<TextInput
					name="first_name"
					labelText="First Name"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Peter"
				/>
				<TextInput
					name="last_name"
					labelText="Last Name"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Anteater"
				/>
			</div>

			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<MultipleSelect
					name="pronouns"
					labelText="Pronouns"
					inputType="checkbox"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					values={pronouns}
				/>
				<DropdownSelect
					name="ethnicity"
					labelText="Race / Ethnicity"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					values={ethnicity}
				/>
			</div>
			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<SimpleRadio
					name="is_first_hackathon"
					values={yesNoOptions}
					title="Is this your first Hackathon?"
					titleClass="text-xl mb-0.5"
					containerClassTotal="flex flex-col w-full max-[1000px]:w-full"
					isRequired={true}
					labelClass="text-xl"
					containerClassInputLabels="flex gap-2 items-center"
					containerClassValues="flex gap-5"
				/>
			</div>
		</div>
	);
}
