import useResources from "./useResources";

export default function Resources() {
	const { resources, isLoading, error } = useResources();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!resources) return <div>No resources found</div>;

	return (
		<>
			{resources.order.map(
				({ _id, iconUrl, title, description, resources }) => (
					<p key={_id}>
						{title} {description}
					</p>
				)
			)}
		</>
	);
}
