import { ReactElement, useCallback, useState } from "react";

import { useCollection } from "@cloudscape-design/collection-hooks";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import Header from "@cloudscape-design/components/header";
import { MultiselectProps } from "@cloudscape-design/components/multiselect";
import Pagination from "@cloudscape-design/components/pagination";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Table, { TableProps } from "@cloudscape-design/components/table";

import ApplicantStatus from "@/app/admin/applicants/components/ApplicantStatus";
import WaiverStatus from "@/app/admin/applicants/components/WaiverStatus";
import { Participant } from "@/lib/admin/useParticipants";
import { ParticipantRole } from "@/lib/userRecord";

import CheckinDayIcon from "./CheckinDayIcon";
import ParticipantAction from "./ParticipantAction";
import ParticipantsFilters from "./ParticipantsFilters";
import RoleBadge from "./RoleBadge";
// import SearchScannerModal from "./SearchScannerModal";

const SATURDAY = new Date("2026-05-16T07:00:00Z");
const SUNDAY = new Date("2026-05-17T07:00:00Z");

interface EmptyStateProps {
	title: string;
	subtitle?: string;
	action?: ReactElement;
}

interface ParticipantsTableProps {
	participants: Participant[];
	loading: boolean;
	initiateCheckIn: (participant: Participant) => void;
	initiatePromotion: (participant: Participant) => void;
	initiateConfirm: (participant: Participant) => void;
	initiateConfirmHacker: (participant: Participant) => void;
}

export type Options = ReadonlyArray<MultiselectProps.Option>;
const SEARCHABLE_COLUMNS: (keyof Participant)[] = [
	"_id",
	"first_name",
	"last_name",
	"roles",
	"status",
];

type StrictColumnDefinition = TableProps.ColumnDefinition<Participant> & {
	id: string;
	header: string;
};

function createLabelFunction(columnName: string) {
	return ({ sorted, descending }: { sorted: boolean; descending: boolean }) => {
		const sortState = sorted
			? `sorted ${descending ? "descending" : "ascending"}`
			: "not sorted";
		return `${columnName}, ${sortState}.`;
	};
}

function EmptyState({ title, subtitle, action }: EmptyStateProps) {
	return (
		<Box textAlign="center" color="inherit">
			<Box variant="strong" textAlign="center" color="inherit">
				{title}
			</Box>
			<Box variant="p" padding={{ bottom: "s" }} color="inherit">
				{subtitle}
			</Box>
			{action}
		</Box>
	);
}

function ParticipantsTable({
	participants,
	loading,
	initiateCheckIn,
	initiatePromotion,
	initiateConfirm,
	initiateConfirmHacker,
}: ParticipantsTableProps) {
	const [preferences, setPreferences] = useState({
		pageSize: 20,
		visibleContent: [
			"uid",
			"firstName",
			"lastName",
			"roles",
			"status",
			"waiver",
			"saturday",
			"sunday",
			"action",
		],
	});
	const [filterRole, setFilterRole] = useState<Options>([]);
	const [filterStatus, setFilterStatus] = useState<Options>([]);
	const matchesRole = (p: Participant) =>
		filterRole.length === 0 ||
		filterRole
			.map((r) => r.value)
			.some((role) => p.roles.includes(role as ParticipantRole));
	const matchesStatus = (p: Participant) =>
		filterStatus.length === 0 ||
		filterStatus.map((s) => s.value).includes(p.status);

	const {
		items,
		actions,
		filteredItemsCount,
		collectionProps,
		filterProps,
		paginationProps,
	} = useCollection(participants, {
		filtering: {
			empty: <EmptyState title="No participants" />,
			noMatch: (
				<EmptyState
					title="No matches"
					action={
						<Button onClick={() => actions.setFiltering("")}>
							Clear filter
						</Button>
					}
				/>
			),
			filteringFunction: (item, filteringText) => {
				if (!matchesRole(item)) {
					return false;
				}
				if (!matchesStatus(item)) {
					return false;
				}
				const filteringTextLC = filteringText.toLowerCase();

				return (
					SEARCHABLE_COLUMNS.map((key) => item[key]).some(
						(value) =>
							typeof value === "string" &&
							value.toLowerCase().includes(filteringTextLC),
					) ||
					`${item.first_name} ${item.last_name}`
						.toLowerCase()
						.includes(filteringTextLC)
				);
			},
		},
		pagination: { pageSize: preferences.pageSize },
		sorting: {},
		selection: {},
	});

	const allRoles = new Set(participants.flatMap((p) => p.roles));
	const roleOptions = Array.from(allRoles).map((r) => ({ value: r, label: r }));
	const allStatuses = new Set(participants.map((p) => p.status));
	const statusOptions = Array.from(allStatuses).map((s) => ({
		value: s,
		label: s,
	}));

	const ActionCell = useCallback(
		(participant: Participant) => (
			<ParticipantAction
				participant={participant}
				initiateCheckIn={initiateCheckIn}
				initiatePromotion={initiatePromotion}
				initiateConfirm={initiateConfirm}
				initiateConfirmHacker={initiateConfirmHacker}
			/>
		),
		[initiateCheckIn, initiatePromotion, initiateConfirm, initiateConfirmHacker],
	);

	const columnDefinitions: StrictColumnDefinition[] = [
		{
			id: "uid",
			header: "UID",
			cell: (item: Participant) => item._id,
			ariaLabel: createLabelFunction("UID"),
			sortingField: "_id",
			isRowHeader: true,
		},
		{
			id: "firstName",
			header: "First name",
			cell: (item: Participant) => item.first_name,
			ariaLabel: createLabelFunction("First name"),
			sortingField: "first_name",
		},
		{
			id: "lastName",
			header: "Last name",
			cell: (item: Participant) => item.last_name,
			ariaLabel: createLabelFunction("Last name"),
			sortingField: "last_name",
		},
		{
			id: "roles",
			header: "Roles",
			cell: RoleBadge,
			ariaLabel: createLabelFunction("Roles"),
			sortingField: "roles",
		},
		{
			id: "status",
			header: "Status",
			cell: ApplicantStatus,
			ariaLabel: createLabelFunction("status"),
			sortingField: "status",
		},
		{
			id: "waiver",
			header: "Waiver",
			cell: WaiverStatus,
			ariaLabel: createLabelFunction("Waiver signed"),
			sortingField: "waiver_signed",
		},
		{
			id: "saturday",
			header: "Sat",
			cell: SaturdayCheckin,
			sortingField: "saturday",
		},
		{
			id: "sunday",
			header: "Sun",
			cell: SundayCheckin,
			sortingField: "sunday",
		},
		{
			id: "action",
			header: "Action",
			cell: ActionCell,
			minWidth: 108,
		},
	];

	const emptyMessage = (
		<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
			<SpaceBetween size="m">
				<b>No participants</b>
			</SpaceBetween>
		</Box>
	);

	// Uncomment code to enable badge scanner functionality

	// const [showScanner, setShowScanner] = useState(false);

	// const openScanner = () => {
	// 	setShowScanner(true);
	// };

	// const cancelScanner = () => {
	// 	setShowScanner(false);
	// };

	// const useScannerValue = (value: string) => {
	// 	actions.setFiltering(value);
	// 	setShowScanner(false);
	// };

	return (
		<>
			{/* <SearchScannerModal
				onDismiss={cancelScanner}
				onConfirm={useScannerValue}
				show={showScanner}
			/> */}
			<Table
				{...collectionProps}
				header={
					<Header
						counter={`(${participants.length})`}
					// actions={<Button onClick={openScanner}>Scan Badge</Button>}
					>
						Participants
					</Header>
				}
				columnDefinitions={columnDefinitions}
				visibleColumns={preferences.visibleContent}
				items={items}
				loading={loading}
				loadingText="Loading participants"
				variant="full-page"
				stickyColumns={{ first: 1, last: 0 }}
				trackBy="_id"
				empty={emptyMessage}
				filter={
					<ParticipantsFilters
						filteredItemsCount={filteredItemsCount}
						filterProps={filterProps}
						roles={roleOptions}
						selectedRoles={filterRole}
						setSelectedRoles={setFilterRole}
						statuses={statusOptions}
						selectedStatuses={filterStatus}
						setSelectedStatuses={setFilterStatus}
					/>
				}
				pagination={
					<Pagination
						{...paginationProps}
						ariaLabels={{
							nextPageLabel: "Next page",
							pageLabel: (pageNumber) => `Go to page ${pageNumber}`,
							previousPageLabel: "Previous page",
						}}
					/>
				}
				preferences={
					<CollectionPreferences
						pageSizePreference={{
							title: "Select page size",
							options: [
								{ value: 20, label: "20 people" },
								{ value: 50, label: "50 people" },
								{ value: 100, label: "100 people" },
							],
						}}
						visibleContentPreference={{
							title: "Select visible columns",
							options: [
								{
									label: "Participant info",
									options: columnDefinitions.map(({ id, header }) => ({
										id,
										label: header,
									})),
								},
							],
						}}
						cancelLabel="Cancel"
						confirmLabel="Confirm"
						title="Preferences"
						preferences={preferences}
						onConfirm={({ detail }) =>
							setPreferences(
								detail as { pageSize: number; visibleContent: Array<string> },
							)
						}
					/>
				}
			/>
		</>
	);
}

const SaturdayCheckin = ({ checkins }: Participant) => (
	<CheckinDayIcon checkins={checkins} date={SATURDAY} />
);

const SundayCheckin = ({ checkins }: Participant) => (
	<CheckinDayIcon checkins={checkins} date={SUNDAY} />
);

export default ParticipantsTable;
