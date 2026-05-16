import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Modal from "@cloudscape-design/components/modal";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextContent from "@cloudscape-design/components/text-content";

import { ActionModalProps } from "./CheckInModal";

function ConfirmAttendanceModal({
	onDismiss,
	onConfirm,
	participant,
}: ActionModalProps) {
	if (participant === null) {
		return <Modal visible={false} />;
	}

	return (
		<Modal
			onDismiss={onDismiss}
			visible={true}
			footer={
				<Box float="right">
					<SpaceBetween direction="horizontal" size="xs">
						<Button variant="link" onClick={onDismiss}>
							Cancel
						</Button>
						<Button variant="primary" onClick={() => onConfirm(participant)}>
							Confirm Attendance
						</Button>
					</SpaceBetween>
				</Box>
			}
			header={`Confirm Attendance for ${participant.first_name} ${participant.last_name}`}
		>
			<SpaceBetween size="m">
				<TextContent>
					<p>
						This action will update the participant&apos;s status from accepted
						to confirmed. The participant will be able to check into the event
						moving forward.
					</p>
				</TextContent>
			</SpaceBetween>
		</Modal>
	);
}

export default ConfirmAttendanceModal;
