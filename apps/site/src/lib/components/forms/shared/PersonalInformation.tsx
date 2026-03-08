import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import TextInput from "../TextInput";
// import MultipleSelect from "../MultipleSelect";
// import DropdownSelectYesFRQ from "../DropdownSelectYesFRQ";

// //these values can be edited if backend needs it later on

// const pronouns = [
// 	{ value: "he", text: "He/him/his" },
// 	{ value: "she", text: "She/her/hers" },
// 	{ value: "they", text: "They/them/theirs" },
// 	{ value: "ze", text: "Ze/zir/zirs" },
// 	{ value: "other", text: "Other:" },
// ];

// const educationLevels = [
// 	{ value: "high school", text: "High School (18+)" },
// 	{ value: "first-year-undergrad", text: "First Year Undergraduate" },
// 	{ value: "second-year-undergrad", text: "Second Year Undergraduate" },
// 	{ value: "third-year-undergrad", text: "Third Year Undergraduate" },
// 	{ value: "fourth-year-undergrad", text: "Fourth Year Undergraduate" },
// 	{ value: "fifth-year-undergrad", text: "Fifth+ Year Undergraduate" },
// 	{ value: "graduate", text: "Graduate" },
// ];
// const universityOptions = [
// 	{ value: "UC Irvine", text: "UC Irvine" },
// 	{ value: "Cal Poly Pomona", text: "Cal Poly Pomona" },
// 	{ value: "Cal State Fullerton", text: "Cal State Fullerton" },
// 	{ value: "Cal State Long Beach", text: "Cal State Long Beach" },
// 	{ value: "UC Berkeley", text: "UC Berkeley" },
// 	{ value: "UCLA", text: "UCLA" },
// 	{ value: "UC Riverside", text: "UC Riverside" },
// 	{ value: "UC San Diego", text: "UC San Diego" },
// 	{ value: "UC Santa Barbara", text: "UC Santa Barbara" },
// 	{ value: "other", text: "Other" },
// ];

// const majorOptions = [
// 	{
// 		value: "Business Information Management",
// 		text: "Business Information Management",
// 	},
// 	{ value: "Computer Game Science", text: "Computer Game Science" },
// 	{ value: "Computer Science", text: "Computer Science" },
// 	{
// 		value: "Computer Science and Engineering",
// 		text: "Computer Science and Engineering",
// 	},
// 	{ value: "Data Science", text: "Data Science" },
// 	{ value: "Informatics", text: "Informatics" },
// 	{ value: "Electrical Engineering", text: "Electrical Engineering" },
// 	{ value: "Software Engineering", text: "Software Engineering" },
// 	{ value: "N/A (High School)", text: "N/A (High School)" },
// 	{ value: "Undeclared", text: "Undeclared" },
// 	{ value: "other", text: "Other" },
// ];

export default function EssentialQuestions() {
	return (
		<div className="flex flex-col gap-8 w-full">
			<div className="text-xl font-semibold ">I. Personal Information</div>
				<TextInput
					name="email"
					type="email"
					labelText="Email"
					placeholder="ex: peter@uci.edu"
					isRequired={true}
					containerClass="w-full"
				/>
			<div className="flex flex-col lg:flex-row md:flex-col sm:flex-col gap-3">
				<TextInput
				name="first_name"
				type="text"
				labelText="First Name"
				placeholder="Enter your first name"
				isRequired={true}
				containerClass="w-full"
				/>
				<TextInput
				name="last_name"
				type="text"
				labelText="Last Name"
				placeholder="Enter your last name"
				isRequired={true}
				containerClass="w-full"
				/>
				<TextInput
				name="preferred_name"
				type="text"
				labelText="Preferred Name (optional)"
				placeholder="Enter your preferred name (optional)"
				isRequired={false}
				containerClass="w-full"
				/>
			</div>
			<div className="flex flex-col lg:flex-row md:flex-col sm:flex-col gap-3">
				<TextInput
					name="pronouns"
					type="text"
					labelText="Pronouns"
					placeholder="Enter your preferred pronouns"
					isRequired={true}
					containerClass="w-full"
				/>
				<DropdownSelect
					name="gender"
					labelText="Gender Identity"
					values={[
						{ value: "female", text: "Female" },
						{ value: "non-binary", text: "Non-binary" },
						{ value: "male", text: "Male" },
						{ value: "prefer not to say", text: "Prefer not to say" },
						{ value: "other", text: "Other" },
					]}
					containerClass="w-full"
				/>
			</div>
			<div className="flex flex-col lg:flex-row md:flex-col sm:flex-col gap-3">
				<TextInput
					type="date"
					name="birthday"
					labelText="Date of Birth"
					isRequired={true}
					containerClass="w-full"
					placeholder="mm/dd/yyyy"
				/>
				<DropdownSelect
					name="valid_age"
					labelText="Will you be 18 years or oder by May 16th, 2026?"
					containerClass="w-full"
					values={[
						{value: "yes", text: "Yes"},
						{value: "no", text: "No"},
					]}
				/>
			</div>
			<DropdownSelect
				name="meal_preference"
				labelText="Please select the option that you most identify with."
				containerClass="w-full"
				values={[
					{
						value: "any", 
						text: "I eat anything, including the following (chicken, beef, pork)."
					},
					{ value: "chicken_only", text: "I eat meat, but only chicken." },
					{ value: "vegetarian", text: "I am vegetarian." },
					{ value: "vegan", text: "I am vegan." },
				]}
			/>
			<TextInput
				type="text"
				name="diet"
				labelText="Please describe any other dietary concerns that we should know about. This includes allergies, restrictions, etc."
				isRequired={true}
				containerClass="w-full"
				placeholder="ex. vegetarian, nut allergy, gluten-free"
			/>
			<DropdownSelect
				name="shirt_size"
				labelText="What is your t-shirt size?"
				containerClass="w-full"
				values={[
					{ value: "xs", text: "XL" },
					{ value: "s", text: "S" },
					{ value: "m", text: "M" },
					{ value: "l", text: "L" },
					{ value: "xl", text: "XL" },
				]}
			/>
			<DropdownSelect
				name="commitment"
				labelText="Will you be available to volunteer a combined amount of 5 hours minimum across Friday, May 15th, through May 17th, Sunday?"
				containerClass="w-full"
				values={[
					{ value: "yes", text: "Yes" },
					{ value: "no", text: "No" },
				]}
			/>
		</div>
	);
}
