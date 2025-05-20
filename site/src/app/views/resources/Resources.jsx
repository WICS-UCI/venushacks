import { Nav } from "src/app/components";
import ResourceCarousel from "src/app/components/resource-carousel/ResourceCarousel";
import useResources from "./useResources";

import "./Resources.scss";

const backgroundImages = [
	"/assets/images/resources-card1.png",
	"/assets/images/resources-card2.png",
	"/assets/images/resources-card3.png",
	"/assets/images/resources-card4.png",
];

export default function Resources() {
	const { resources, resourcesLength, isLoading, error } = useResources();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!resources) return <div>No resources found</div>;

	return (
		<div className="Resources">
			<div id="left-fishes" />
			<div id="right-fishes" />

			<h1 className="resources-title">RESOURCES</h1>
			<img
				src="/assets/images/resources-coral-top.svg"
				alt="top coral"
				id="resources-top-coral"
			/>
			<Nav />
			<div className="resource-list">
				{resources.order.map(({ _id, title, resources }, index) => (
					<div key={_id} className="category">
						<h3 className="category-title">{title}</h3>
						<ResourceCarousel
							resources={resources}
							backgroundImage={
								backgroundImages[
									Math.floor(
										(index / resourcesLength) * backgroundImages.length
									)
								]
							}
							className="resource-carousel"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
