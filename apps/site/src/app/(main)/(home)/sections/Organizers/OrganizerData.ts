export interface OrganizerData {
	name: string;
	department: string;
	displayDepartment?: string;
	role: string;
	image?: string;
	link?: string;
}

// Dummy Data before Sanity Implementation
export const DUMMY_ORGANIZERS: OrganizerData[] = [
	// Board — Co-Presidents + all Co-Chairs
	{ name: "Josephine Bhadran", department: "Board", role: "Co-President" },
	{ name: "Arnav Nigam", department: "Board", role: "Co-President" },
	{
		name: "Charity Fan",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Logistics",
	},
	{
		name: "Ethan Chin",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Logistics",
	},
	{
		name: "Rishita Dugar",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Corporate",
		link: "https://www.linkedin.com/in/rishita-dugar",
	},
	{
		name: "Mandy Woo",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Corporate",
		link: "https://www.linkedin.com/in/mandy-woo",
	},
	{
		name: "Julia Modina",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Design",
		link: "https://www.linkedin.com/in/julia-modina",
	},
	{
		name: "Julia Tjia",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Marketing",
		link: "https://www.linkedin.com/in/julia-tjia",
	},
	{
		name: "Sarah Tan",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Tech",
	},
	{
		name: "Noah Kim",
		department: "Board",
		role: "Co-Chair",
		displayDepartment: "Tech",
		link: "https://www.linkedin.com/in/noahkim004",
	},
	// Logistics
	{ name: "Anya Gupta", department: "Logistics", role: "Organizer" },
	{
		name: "Arnav Pandey",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/arnav-pandey-985280227/",
	},
	{ name: "Catie Peng", department: "Logistics", role: "Organizer" },
	{
		name: "Jessica Liao",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/jessica-liao-089359244",
	},
	{
		name: "Justin Ho",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/chakjustinho/",
	},
	{
		name: "Kristin Francisco",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/kristin-francisco",
	},
	{
		name: "Molly Neary",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/molly-neary",
	},
	{
		name: "Vicky Zhang",
		department: "Logistics",
		role: "Organizer",
		link: "https://www.linkedin.com/in/vicky-zhang-963159230/",
	},
	{ name: "Xenia Anguiano", department: "Logistics", role: "Organizer" },
	// Corporate
	{
		name: "Alexa Tran",
		department: "Corporate",
		role: "Organizer",
		link: "https://www.linkedin.com/in/alexa-tran-904799331/",
	},
	{
		name: "Alina Sheikh",
		department: "Corporate",
		role: "Organizer",
		link: "https://linkedin.com/in/alinarsheikh",
	},
	{ name: "Ceidy Hernandez", department: "Corporate", role: "Organizer" },
	{ name: "Evie Ngo", department: "Corporate", role: "Organizer" },
	{ name: "Felicia Leung", department: "Corporate", role: "Organizer" },
	{
		name: "Onuva Ekram",
		department: "Corporate",
		role: "Organizer",
		link: "https://linkedin.com/in/onuva",
	},
	{
		name: "Riya Panche",
		department: "Corporate",
		role: "Organizer",
		link: "https://www.linkedin.com/in/riya-panche/",
	},
	{ name: "Zan Naqvi", department: "Corporate", role: "Organizer" },
	// Design
	{
		name: "Elijah Smith",
		department: "Design",
		role: "Organizer",
		link: "https://www.linkedin.com/in/elijah-smith-71319429a",
	},
	{
		name: "Jason Zhang",
		department: "Design",
		role: "Organizer",
		link: "https://www.linkedin.com/in/jason-zhang-3b114a250/",
	},
	{
		name: "Julia Nguyen",
		department: "Design",
		role: "Organizer",
		link: "https://www.linkedin.com/in/julia-t-nguyen",
	},
	{ name: "Pamela Cabingao", department: "Design", role: "Organizer" },
	{
		name: "Sherry Tram",
		department: "Design",
		role: "Organizer",
		link: "https://www.linkedin.com/in/sherry-tram",
	},
	{
		name: "Tanya Yu",
		department: "Design",
		role: "Organizer",
		link: "https://www.linkedin.com/in/tanya-yu-b5ba92292",
	},
	// Marketing
	{
		name: "Anshika Govada",
		department: "Marketing",
		role: "Organizer",
		link: "https://www.linkedin.com/in/anshika-govada-a71239283",
	},
	{
		name: "Kathryn Liang",
		department: "Marketing",
		role: "Organizer",
		link: "https://www.linkedin.com/in/kathryn-liang",
	},
	{
		name: "Mari Kashiwagi",
		department: "Marketing",
		role: "Organizer",
		link: "https://www.linkedin.com/in/mari-kashiwagi-866305355",
	},
	{ name: "Reneem Saadeh", department: "Marketing", role: "Organizer" },
	// Tech
	{
		name: "Aariel Abaincia",
		department: "Tech",
		role: "Organizer",
		link: "https://www.linkedin.com/in/aariel-abaincia",
	},
	{
		name: "Aurelia Sindhunirmala",
		department: "Tech",
		role: "Organizer",
		link: "https://www.linkedin.com/in/aureliasindhu",
	},
	{
		name: "Jonathan Chau",
		department: "Tech",
		role: "Organizer",
		link: "https://www.linkedin.com/in/jonathan-chau06/",
	},
	{
		name: "Kaelyn Sung",
		department: "Tech",
		role: "Organizer",
		link: "https://www.linkedin.com/in/kaelyn-sung-72b850294/",
	},
	{
		name: "Mehek Bhatnagar",
		department: "Tech",
		role: "Organizer",
		link: "https://www.linkedin.com/in/mehek-bhatnagar-b81504245",
	},
	{
		name: "Yousef Khan",
		department: "Tech",
		role: "Organizer",
		link: "https://linkedin.com/in/theyousefkhan",
	},
];
