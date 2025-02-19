import PrimaryButton from "../primary-button/PrimaryButton";
import "./ComingSoonForm.scss";

export default function ComingSoonForm() {
	return (
		<form
			action="https://venushacks.us14.list-manage.com/subscribe/post"
			method="POST"
			className="email-form"
		>
			<input type="hidden" name="u" value="f6273e8cb99a5b38c895e6292" />
			<input type="hidden" name="id" value="7afebb41eb" />

			<label htmlFor="MERGE0" />
			<input
				type="email"
				className="email-input"
				autoCapitalize="off"
				autoCorrect="off"
				name="MERGE0"
				id="MERGE0"
				placeholder="Email Address"
			/>
			<PrimaryButton type="submit">Notify Me!</PrimaryButton>
		</form>
	);
}
