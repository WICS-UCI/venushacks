import RequiredAsterisk from "./RequiredAsterisk";

export interface RadioGridColumn {
	value: string;
	label: string;
}

export interface RadioGridRow {
	name: string;
	label: string;
}

interface RadioGridProps {
	columns: RadioGridColumn[];
	rows: RadioGridRow[];
	labelText?: string;
	isRequired?: boolean;
}

export default function RadioGrid({
	columns,
	rows,
	labelText,
	isRequired = true,
}: RadioGridProps) {
	return (
		<div className="flex flex-col w-full gap-2">
			{labelText && (
				<p className="mb-1 text-sm font-medium">
					{labelText} {isRequired && <RequiredAsterisk />}
				</p>
			)}
			<div className="w-full overflow-x-auto border border-gray-300 shadow-md rounded-xl">
			<table className="min-w-full text-sm">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="w-1/3 px-4 py-3 font-medium text-left text-gray-700" />
							{columns.map((col) => (
								<th
									key={col.value}
									className="px-2 py-3 font-medium text-center text-gray-700"
								>
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<tr
								key={row.name}
								className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
							>
								<td className="px-4 py-3 text-gray-900">{row.label}</td>
								{columns.map((col) => (
									<td key={col.value} className="px-2 py-3 text-center">
										<input
											type="radio"
											name={row.name}
											value={col.value}
											required={isRequired}
											className="w-4 h-4 cursor-pointer accent-gray-600"
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
