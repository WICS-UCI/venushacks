"use client";

import { useState, useMemo, useContext } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import {
	SpaceBetween,
	Header,
	Button,
	Input,
	FormField,
	Table,
	Box,
	Modal,
	Alert,
	Badge,
	ColumnLayout,
} from "@cloudscape-design/components";
import useHackerApplicants, {
	HackerApplicantSummary,
} from "@/lib/admin/useHackerApplicants";
import { isDirector } from "@/lib/admin/authorization";
import UserContext from "@/lib/admin/UserContext";
import ReleaseNonHackerDecisions from "../email-sender/components/ReleaseDecisions";

function getRawScore(applicant: HackerApplicantSummary): number {
    const breakdown = applicant.application_data.review_breakdown ?? {};
    const scores = Object.values(breakdown)[0] ?? {};
    return Object.values(scores).reduce<number>((sum, val) => {
        if (typeof val === "number") return sum + val;
        return sum + Object.values(val).reduce<number>((s, v) => s + v, 0);
    }, 0);
}

type DecisionBucket = "accept" | "waitlist" | "reject";

function assignDecision(index: number, acceptCount: number, waitlistCount: number): DecisionBucket {
	if (index < acceptCount) return "accept";
	if (index < acceptCount + waitlistCount) return "waitlist";
	return "reject";
}

function DecisionSender() {
	const router = useRouter();

	const { roles } = useContext(UserContext);

	if (!isDirector(roles)) {
		router.push("/admin/dashboard");
	}

	const { applicantList, loading } = useHackerApplicants();
	const [acceptCount, setAcceptCount] = useState("");
	const [waitlistCount, setWaitlistCount] = useState("");
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [sending, setSending] = useState(false);
	const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const sorted = useMemo(() =>
        [...applicantList]
            .filter((a) => Object.keys(a.application_data.review_breakdown ?? {}).length > 0)
            .sort((a, b) => getRawScore(b) - getRawScore(a)),
        [applicantList]
    );

	const accept = parseInt(acceptCount) || 0;
	const waitlist = parseInt(waitlistCount) || 0;

    const preview = useMemo(() =>
        sorted.map((applicant, i) => ({
            ...applicant,
            rawScore: getRawScore(applicant),
            bucket: assignDecision(i, accept, waitlist),
        })),
        [sorted, accept, waitlist]
    );
	
	const rejectedList = preview.filter((a) => a.bucket === "reject");

	const isValid = accept > 0 && waitlist >= 0 && accept + waitlist <= sorted.length;

    const handleSend = async () => {
        setSending(true);
        setConfirmVisible(false);
        try {
            await axios.post("/api/director/release/hackers", {
                accept_count: accept,
                waitlist_count: waitlist,
            });
            setResult({ type: "success", message: `Emails sent: ${accept} accepted, ${waitlist} waitlisted, ${rejectedList.length} rejected.` });
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
            setResult({ type: "error", message: `Failed to send emails: ${message}` });
        } finally {
            setSending(false);
        }
    };

	const bucketBadge = (bucket: DecisionBucket) => {
		if (bucket === "accept") return <Badge color="green">Accept</Badge>;
		if (bucket === "waitlist") return <Badge color="blue">Waitlist</Badge>;
		return <Badge color="red">Reject</Badge>;
	};

	return (
		<SpaceBetween size="l">
			<Header variant="h1">Decision email sender</Header>

			{result && (
				<Alert
					type={result.type}
					dismissible
					onDismiss={() => setResult(null)}
				>
					{result.message}
				</Alert>
			)}

			<ColumnLayout columns={3}>
				<FormField label="Accept top N applicants">
					<Input
						value={acceptCount}
						onChange={({ detail }) => setAcceptCount(detail.value)}
						type="number"
						placeholder="e.g. 150"
					/>
				</FormField>
				<FormField label="Waitlist next N applicants">
					<Input
						value={waitlistCount}
						onChange={({ detail }) => setWaitlistCount(detail.value)}
						type="number"
						placeholder="e.g. 50"
					/>
				</FormField>
				<FormField label="Reject remaining">
					<Input value={String(Math.max(0, sorted.length - accept - waitlist))} disabled />
				</FormField>
			</ColumnLayout>

			<Table
				loading={loading}
				columnDefinitions={[
					{
                        id: "rank",
                        header: "#",
                        cell: (item) => preview.indexOf(item) + 1,
                        width: 50,
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
						id: "score",
						header: "Raw score",
                        cell: (item) => (item.rawScore * 100 / 30).toFixed(2),
					},
					{
						id: "decision",
						header: "Decision",
						cell: (item) => bucketBadge(item.bucket),
					},
				]}
				items={preview}
				trackBy="_id"
				header={
					<Header
						counter={`(${preview.length})`}
						actions={
							<Button
								variant="primary"
								disabled={!isValid || sending}
								loading={sending}
								onClick={() => setConfirmVisible(true)}
							>
								Send HACKER decision emails
							</Button>
						}
					>
						Applicant preview
					</Header>
				}
				empty={<Box textAlign="center">No reviewed applicants</Box>}
			/>
			<ReleaseNonHackerDecisions />

			<Modal
				visible={confirmVisible}
				onDismiss={() => setConfirmVisible(false)}
				header="Confirm sending decision emails"
				footer={
					<Box float="right">
						<SpaceBetween direction="horizontal" size="xs">
							<Button onClick={() => setConfirmVisible(false)}>Cancel</Button>
							<Button variant="primary" onClick={handleSend} loading={sending}>
								Confirm and send
							</Button>
						</SpaceBetween>
					</Box>
				}
			>
				<SpaceBetween size="s">
					<p>This will send decision emails to all {preview.length} applicants. This action cannot be undone.</p>
					<ColumnLayout columns={3}>
						<div><strong>{accept}</strong> accepted</div>
						<div><strong>{waitlist}</strong> waitlisted</div>
						<div><strong>{rejectedList.length}</strong> rejected</div>
					</ColumnLayout>
				</SpaceBetween>
			</Modal>
		</SpaceBetween>
	);
}

export default DecisionSender;
