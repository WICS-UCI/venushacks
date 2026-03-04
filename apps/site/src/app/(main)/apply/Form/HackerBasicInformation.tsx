import DropdownSelect from "@/lib/components/forms/DropdownSelect";
{/*import MultipleSelect from "@/lib/components/forms/MultipleSelect";*/}
{/*import SimpleRadio from "@/lib/components/forms/SimpleRadio";*/}
import TextInput from "@/lib/components/forms/TextInput";

const pronouns = [
	{ value: "he", text: "He/him/his" },
	{ value: "she", text: "She/her/hers" },
	{ value: "they", text: "They/them/theirs" },
	{ value: "ze", text: "Ze/zir/zirs" },
	{ value: "other", text: "Other:" },
];

const yesNoOptions = [
  { value: "Yes", text: "Yes" },
  { value: "No", text: "No" },
];

const shirtSizes = [
  { value: "small", text: "Small" },
  { value: "medium", text: "Medium" },
  { value: "large", text: "Large" },
  { value: "other", text: "Other:" },
];

const universityOptions = [
  { value: "UC Irvine", text: "UC Irvine" },
  { value: "Cal Poly Pomona", text: "Cal Poly Pomona" },
  { value: "Cal State Fullerton", text: "Cal State Fullerton" },
  { value: "Cal State Long Beach", text: "Cal State Long Beach" },
  { value: "UC Berkeley", text: "UC Berkeley" },
  { value: "UCLA", text: "UCLA" },
  { value: "UC Riverside", text: "UC Riverside" },
  { value: "UC San Diego", text: "UC San Diego" },
  { value: "UC Santa Barbara", text: "UC Santa Barbara" },
  { value: "other", text: "Other" },
];

const educationLevels = [
  { value: "high school", text: "High School (18+)" },
  { value: "first-year-undergrad", text: "First Year Undergraduate" },
  { value: "second-year-undergrad", text: "Second Year Undergraduate" },
  { value: "third-year-undergrad", text: "Third Year Undergraduate" },
  { value: "fourth-year-undergrad", text: "Fourth Year Undergraduate" },
  { value: "fifth-year-undergrad", text: "Fifth+ Year Undergraduate" },
  { value: "graduate", text: "Graduate" },
];

export default function BasicInformation() {
  return (
    <div className="w-full flex flex-col gap-8">
      <p className="text-4xl m-0 max-[700px]:text-3xl">I. Personal Information</p>

      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <TextInput
          name="first_name"
          labelText="First Name"
          containerClass="col-span-12 md:col-span-4"
          isRequired={true}
          type="text"
          placeholder="Enter your first name"
        />
        <TextInput
          name="last_name"
          labelText="Last Name"
          containerClass="col-span-12 md:col-span-4"
          isRequired={true}
          type="text"
          placeholder="Enter your last name"
        />
        <TextInput
          name="preferred_name"
          labelText="Preferred Name (optional)"
          containerClass="col-span-12 md:col-span-4"
          isRequired={false}
          type="text"
          placeholder="Enter your preferred name (optional)"
        />

        {/* Row 2: Email (full width) */}
        <TextInput
          name="email"
          labelText="Email"
          containerClass="col-span-12"
          isRequired={true}
          type="text"
          placeholder="ex: peter@uci.edu"
        />

        {/* Row 3: DOB (left) + 18+ (right) */}
        <TextInput
          name="date_of_birth"
          labelText="Date of Birth"
          containerClass="col-span-12 md:col-span-6"
          isRequired={true}
          type="text"
          placeholder="mm/dd/yyyy"
        />
        <DropdownSelect
          name="18_or_older"
          labelText="Will you be 18 years or older by May 16th, 2026?"
          containerClass="col-span-12 md:col-span-6"
          isRequired={true}
          values={yesNoOptions}
          placeholder="Female"
        />

        <DropdownSelect
			name="gender_pronouns"
			labelText="Gender Pronouns"
			containerClass="col-span-12 md:col-span-6"
			isRequired={true}
			values={pronouns}
			placeholder="Yes"
        />
        <TextInput
          name="pronoun"
          labelText="Preferred Pronouns"
          containerClass="col-span-12 md:col-span-6"
          isRequired={true}
          type="text"
          placeholder="Enter your preferred pronouns"
        />

        {/* Row 5: Shirt size SHOULD BE FULL WIDTH like the image */}
        <DropdownSelect
          name="shirt_size"
          labelText="Shirt Size (Unisex)"
          containerClass="col-span-12"
          isRequired={true}
          values={shirtSizes}
          placeholder="Small"
        />

        {/* Next rows: School / majors / year — all FULL WIDTH like the image */}
        <DropdownSelect
          name="school"
          labelText="What university do you attend?"
          values={universityOptions}
          isRequired={true}
          containerClass="col-span-12"
          placeholder="UC Irvine"
        />

        <TextInput
          name="majors_minors"
          labelText="What major(s) and minor(s), if any, are you?"
          containerClass="col-span-12"
          isRequired={true}
          type="text"
          placeholder="ex: Computer Science, Psychology"
        />

        <DropdownSelect
          name="education_level"
          labelText="What year are you?"
          values={educationLevels}
          isRequired={true}
          containerClass="col-span-12"
          placeholder="Freshman"
        />
      </div>
    </div>
  );
}