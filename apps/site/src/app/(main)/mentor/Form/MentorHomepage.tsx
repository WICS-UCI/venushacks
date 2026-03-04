export default function MentorHomepage() {
	return (
		<div className="flex flex-col gap-5 w-11/12">
			<p className="text-4xl m-0 max-[700px]:text-3xl">Mentor Application</p>
			<p className="text-lg m-0">
				Hello! Thank you for your interest in becoming a mentor at VenusHacks
				2026. Planned in collaboration with WICS and Hack at UCI, VenusHacks is
				UCI&apos;s largest women-centric hackathon that includes networking, fun
				activities, educational workshops, and lots of coding! Our mission is to
				empower underrepresented groups by providing an inclusive community to
				foster growth and creativity in computing.
			</p>
			<hr className="border-t border-gray-800 my-2" />
			<table className="w-full text-lg border-collapse">
				<tbody>
					<tr>
						<td className="font-bold py-3 pr-8 align-top w-28">WHO</td>
						<td className="py-3">
							You! A professional, student, or industry member who is ready to
							help and share their expertise!
						</td>
					</tr>
					<tr>
						<td className="font-bold py-3 pr-8 align-top">WHAT</td>
						<td className="py-3">VenusHacks 2026</td>
					</tr>
					<tr>
						<td className="font-bold py-3 pr-8 align-top">WHEN</td>
						<td className="py-3">May 15, 2026 - May 17, 2026</td>
					</tr>
					<tr>
						<td className="font-bold py-3 pr-8 align-top">WHERE</td>
						<td className="py-3">UC Irvine (Donald Bren Hall)</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
