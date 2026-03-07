export default function BasicInformation() {
	return (
		<div className="flex flex-col gap-3 ">
			<p className="font-normal text-3xl m-0 mb-2 font-sniglet text-center">
				Volunteer Application
			</p>

			<p>
				Interested in volunteering during VenusHacks 2026? Please fill in the
				application below!
			</p>

			<p>
				VenusHacks is UCI’s largest women-centric hackathon that includes
				networking, fun activities, educational workshops, and lots of coding!
				Our mission is to empower underrepresented groups by providing an
				inclusive community to foster growth and creativity in computing. This
				event will take place from{" "}
				<b>
					May 15th - May 17th (not overnight) at UC Irvine in the Donald Bren
					Hall.
				</b>
			</p>
			<p>
				As a volunteer, you will be assigned to various roles throughout the
				event, which include but are not limited to:
			</p>

			<ol className="list-decimal list-inside">
				<li>Food Service</li>
				<li>Check In</li>
				<li>Snack and info table</li>
				<li>Event Set Up & Clean Up</li>
			</ol>

			<p>Details about the role:</p>
			<ul className="list-disc list-inside">
				<li>Volunteers will be scheduled for specific time slots </li>
				<li>Volunteers will also be given free food & swag! </li>
				<li>
					There will be a <b>mandatory </b>volunteer orientation prior to the
					first day of the hackathon (Time TBD). If you are unable to attend,
					you must watch the recording that will be sent out.
				</li>
			</ul>
			<p>
				<b>IMPORTANT NOTE:</b> Please only apply if you are sure about your 
				availability. In addition, there will be no travel reimbursements for 
				this role.
			</p>
			<p>
				<b>Application Due Date: Friday, April 24, 2026 at 11:59 PM</b>
			</p>
			<p>
				If you have any questions about VenusHacks, please check out our{" "} 
				<a 
					className="underline hover:text-blue-800"
					style={{ color: 'rgb(37, 99, 235)' }}
					href="https://venushacks.com/">
					website
				</a>{" "} 
				or email us at venushacks.uci@gmail.com :)</p>
		</div>
	);
}
