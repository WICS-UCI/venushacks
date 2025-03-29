import useResources from "./useResources";
import { Nav, Redirect } from "src/app/components";

export default function Resources() {
	const { resources, isLoading, error } = useResources();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!resources) return <div>No resources found</div>;

	return (
		<div className="Resources">
		<h1>Hello!</h1>
		<Nav />
			{resources.order.map(
				({ _id, iconUrl, title, description, resources }) => (
					<p key={_id}>
						{title} {description}
					</p>
				)
			)}
		</div>
	);
}
