import { Tooltip, Footer } from "src/app/components";
import { starterPackData } from "src/app/data/resources-info";

import "./Resources.scss";

function Resources() {
	return (
		<div className="starter-packs">
			<h2>Resources</h2>
			{starterPackData.map(function (starterPack) {
				return (
					<div className="starter-pack-card" key={starterPack.name}>
						<div className="starter-pack-card-information">
							<h3>{starterPack.name}</h3>
							<p>{starterPack.description}</p>
						</div>
						<div className="starter-pack-card-links">
							{starterPack.packs.map(function (pack) {
								return (
									<Tooltip content={pack.tooltip} key={pack.name}>
										<a
											className="starter-pack-card-link"
											href={pack.link}
											target={pack.link.startsWith("/") ? "_self" : "_blank"}
											rel="noopener noreferrer"
										>
											<div>
												<h4>{pack.name}</h4>
											</div>
										</a>
									</Tooltip>
								);
							})}
						</div>
					</div>
				);
			})}
			<Footer />
		</div>
	);
}

// const Resources = () => process.env.NEXT_PUBLIC_MAINTENANCE_MODE_RESOURCES ? redirect("/") : <p>Resources</p>;

export default Resources;
