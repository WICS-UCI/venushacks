import ApplyButton from "src/app/components/apply-button/ApplyButton";
import StaticCoral from "src/app/components/static-coral/StaticCoral";

import "./Apply.scss";

export default function Apply() {
	return (
		<section>
			<div className="apply">
				<h1 className="apply-heading">APPLY</h1>
				<div className="apply-buttons">
					<ApplyButton
						id="otter-apply"
						className="order-1 order-md-2"
						text="Apply as a Hacker!"
						href="https://airtable.com/app4GBC5A7cYMsnZX/shrsPSPqu4IgTulIg"
					/>
					<ApplyButton
						id="scuba-apply"
						className="order-2 order-md-1"
						text="Apply as a Mentor!"
						href="https://airtable.com/appQKJHFzsVtW8zTy/pagh87UzaDRye4ipd/form"
					/>
					<ApplyButton
						id="treasure-apply"
						className="order-3"
						text="Apply as a Volunteer!"
						href="https://airtable.com/appM5dE6Qk4awfDOJ/shrkHIDutaaezVGql"
					/>
				</div>
			</div>

			<StaticCoral />
		</section>
	);
}
