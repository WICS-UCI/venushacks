/* eslint-disable @next/next/no-img-element */
import { getPartners } from "./getPartners";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export default async function Partners() {
	const { partners } = await getPartners();

	return (
		<section className="container py-24 relative mx-auto w-full ">
			<h2 className={`text-center text-4xl sm:text-[3rem] font-display mb-16`}>
				Partners
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:max-w-3xl xl:max-w-4xl max-w-xl mx-auto">
				{partners.map(({ _key, name, url, logo }) => (
					<a
						key={_key}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-white/5 backdrop-blur-sm p-6 aspect-video flex items-center justify-center hover:bg-white/10 transition-colors"
					>
						<img
							src={builder.image(logo).format("webp").url()}
							alt={`${name} logo`}
							className="h-full max-w-full max-h-full object-contain"
						/>
					</a>
				))}
			</div>
		</section>
	);
}
