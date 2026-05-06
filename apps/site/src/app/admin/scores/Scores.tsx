"use client";

import { useState, useMemo, useContext } from "react";
import axios from "axios";

import NotificationContext from "@/lib/admin/NotificationContext";
import useHackerApplicants, {
	HackerApplicantSummary,
} from "@/lib/admin/useHackerApplicants";
import { OVERQUALIFIED_SCORE } from "@/lib/decisionScores";
import {
	Box,
	Button,
	FlashbarProps,
	Header,
	Modal,
	SpaceBetween,
	Table,
} from "@cloudscape-design/components";

function sortApplicantsByNormalizedScore(applicants: HackerApplicantSummary[]) {
	return [...applicants].sort((a, b) => {
		const aScore = Object.values(a.application_data.normalized_scores ?? {})[0] ?? 0;
		const bScore = Object.values(b.application_data.normalized_scores ?? {})[0] ?? 0;
		return bScore - aScore;
	});
}

const downloadCSV = (data: HackerApplicantSummary[]) => {
	const headers = ["Name", "Email", "Resume URL", "Normalized Score"];
	const rows = data.map((a) => {
		const score = Object.values(a.application_data.normalized_scores ?? {})[0] ?? 0;
		return [
			`${a.first_name} ${a.last_name}`,
			a.application_data.email,
			a.application_data.resume_url,
			score.toFixed(2),
		];
	});

	const csvContent =
		"data:text/csv;charset=utf-8," +
		[headers, ...rows].map((e) => e.join(",")).join("\n");

	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "applicants.csv");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const ResumeModalButton = (item: HackerApplicantSummary) => {
	const [showResume, setShowResume] = useState(false);

	return (
		<>
			<div style={{ display: "flex", gap: "0.5rem" }}>
				<Button onClick={() => setShowResume(true)}>View Resume</Button>
				<Button
					variant="link"
					onClick={() =>
						window.open(
							item.application_data.resume_url,
							"_blank",
							"noopener,noreferrer",
						)
					}
				>
					Open in New Tab
				</Button>
			</div>
			<Modal
				onDismiss={() => setShowResume(false)}
				visible={showResume}
				closeAriaLabel="Close modal"
				header="Resume"
				size="max"
			>
				<Box>
					<iframe
						src={`${item.application_data.resume_url}/preview`}
						title="Resume"
						style={{ width: "100%", height: "80vh", border: 0 }}
					/>
				</Box>
			</Modal>
		</>
	);
};

function Scores() {
	const { setNotifications } = useContext(NotificationContext);
	const { applicantList, loading, refetch } = useHackerApplicants();

	const filteredApplicants = useMemo(
		() => applicantList.filter((a) => a.avg_score !== OVERQUALIFIED_SCORE),
		[applicantList],
	);

	const sorted: (HackerApplicantSummary & { rowIndex: number })[] =
    sortApplicantsByNormalizedScore(filteredApplicants).map((item, index) => ({
        ...item,
        rowIndex: index + 1,
    }));

	console.log(sorted)

	const handleClick = () => {
		axios
			.get("/api/admin/normalize-detailed-scores")
			.then(() => {
				console.log("normalize success");
				const successMessage: FlashbarProps.MessageDefinition = {
					type: "success",
					content: "Successfully normalized scores!",
					id: `${Date.now()}`,
					dismissible: true,
					onDismiss: () => {
						if (setNotifications)
							setNotifications((prev) =>
								prev.filter((msg) => msg.id !== successMessage.id),
							);
					},
				};
				if (setNotifications)
					setNotifications((prev) => [successMessage, ...prev]);

				refetch();
			})
			.catch((error) => {
				console.error("normalize error", error);
				const errorMessage: FlashbarProps.MessageDefinition = {
					type: "error",
					content: `Request failed: ${error.message}`,
					id: `${Date.now()}`,
					dismissible: true,
					onDismiss: () => {
						if (setNotifications)
							setNotifications((prev) =>
								prev.filter((msg) => msg.id !== errorMessage.id),
							);
					},
				};
				if (setNotifications)
					setNotifications((prev) => [errorMessage, ...prev]);
			});
	};

	return (
		<SpaceBetween size="l">
			<Header variant="h1">Scores</Header>
			<Table
				loading={loading}
				columnDefinitions={[
					{
						id: "index",
						header: "#",
						cell: (item) => (item as HackerApplicantSummary & { rowIndex: number }).rowIndex,
						width: 40,
					},
					{
						id: "name",
						header: "Name",
						cell: (item) => `${item.first_name} ${item.last_name}`,
					},
					{
						id: "email",
						header: "Email",
						cell: (item) => item.application_data.email,
					},
					{
						id: "resume",
						header: "Resume",
						cell: ResumeModalButton,
						minWidth: 350,
					},
					{
						id: "normalizedScore",
						header: "Normalized Score",
						cell: (item) => {
							const score = Object.values(item.application_data.normalized_scores ?? {})[0] ?? 0;
							return score.toFixed(2);
						},
					},
				]}
				items={sorted}
				header={
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h2>Applicants</h2>
						<div style={{ display: "flex", gap: "0.5rem" }}>
							<Button onClick={() => downloadCSV(sorted)}>Download CSV</Button>
							<Button variant="primary" onClick={handleClick}>
								Normalize scores
							</Button>
						</div>
					</div>
				}
			/>
		</SpaceBetween>
	);
}

export default Scores;
