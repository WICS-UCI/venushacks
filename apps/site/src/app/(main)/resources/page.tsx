import { Metadata } from "next";
import { redirect } from "next/navigation";
import ResourceSection from "./components/ResourceSection";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Resources | VenusHacks 2026",
};

export default async function Resources() {
	if (process.env.MAINTENANCE_MODE_RESOURCES) {
		redirect("/");
	}

	return (
		<>
			<section className="w-full h-full mb-12">
				<div className="my-36 text-center">
					<h1 className="mb-2 font-display font-bold text-4xl md:text-5xl">
						Resources
					</h1>
				</div>
				<div className="mx-4 mb-40">
					<ResourceSection />
				</div>
			</section>
		</>
	);
}
