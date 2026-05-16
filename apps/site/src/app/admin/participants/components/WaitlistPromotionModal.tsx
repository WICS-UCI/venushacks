import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Modal from "@cloudscape-design/components/modal";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextContent from "@cloudscape-design/components/text-content";

import { ActionModalProps } from "./CheckInModal";

function WaitlistPromotionModal({
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
							Promote
						</Button>
					</SpaceBetween>
				</Box>
			}
			header={`Promote ${participant?.first_name} ${participant?.last_name} Off Waitlist`}
		>
			<SpaceBetween size="m">
				<TextContent>
					<ul>
						{/* TODO: actual instructions for check-in leads */}
						<li>Ask for a photo ID and verify name is under waitlist.</li>
						<li>Have participant log into the portal and sign the waiver.</li>
					</ul>
				</TextContent>
				{/* TODO: badge barcode input */}
			</SpaceBetween>
		</Modal>
	);
}
export default WaitlistPromotionModal;
