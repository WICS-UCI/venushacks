export default function hasDeadlinePassed() {
	const pstDeadline = "2026-05-03T23:59:00";
	const utcOffset = "-08:00";

	const deadline = new Date(pstDeadline + utcOffset);
	const now = new Date();

	return now > deadline;
}
