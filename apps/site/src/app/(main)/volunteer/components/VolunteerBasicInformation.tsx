import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import MultipleSelect from "@/lib/components/forms/MultipleSelect";
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

export default function BasicInformation() {
	return (
		<div className="flex flex-col gap-5 w-11/12">
			<p className="text-4xl m-0 max-[700px]:text-3xl font-bold">
				Basic Information
			</p>
			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<TextInput
					name="first_name"
					labelText="First Name"
					containerClass="flex flex-col w-6/12 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Peter"
				/>
				<TextInput
					name="last_name"
					labelText="Last Name"
					containerClass="flex flex-col w-6/12 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Anteater"
				/>
			</div>

			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<DropdownSelect
					name="ethnicity"
					labelText="Race / Ethnicity"
					containerClass="flex flex-col w-full max-[1000px]:w-full"
					values={ethnicity}
				/>
			</div>

			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<MultipleSelect
					name="pronouns"
					labelText="Preferred Pronouns"
					containerClass="flex flex-col w-full"
					inputType="checkbox"
					values={pronouns}
				/>
			</div>
		</div>
	);
}
