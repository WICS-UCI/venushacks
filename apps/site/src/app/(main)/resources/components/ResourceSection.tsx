import clsx from "clsx";
import ResourceCategory from "./ResourceCategory";
import ResourceDescription from "./ResourceDescription";
import ResourceItem from "./ResourceItem";
import { getResources } from "../getResources";
import styles from "./ResourceSection.module.scss";

export default async function ResourceSection() {
	const resources = await getResources();
	return (
		<>
			{resources.order.map(
				({ _id, iconUrl, title, description, resources }) => (
					<>
						<div className="hidden md:block">
							<div
								key={_id}
								className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center lg:pr-[3.25vw]"
							>
								<ResourceCategory
									iconUrl={iconUrl ?? ""}
									title={title}
									isMobile={false}
								/>
								<div className="col-span-2 w-full max-w-5xl bg-black p-12 grow-[2] mb-12 border-[5px] border-white shadow-[9px_9px_0px_1px_#ffffff] select-none">
									<ResourceDescription
										title={title}
										description={description ?? ""}
										isMobile={false}
									/>
									<div
										className={clsx(
											styles.background,
											"overflow-y-auto h-[226px] xl:h-[266px] pb-[9px] pr-4",
										)}
									>
										<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
											{resources.map(
												({ _id, resourceIconUrl, title, link }) => (
													<ResourceItem
														key={_id}
														resourceIconUrl={resourceIconUrl}
														title={title}
														link={link}
														isMobile={false}
													/>
												),
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="block md:hidden">
							<div className="w-full max-w-5xl bg-black p-5 sm:p-7 grow-[2] mb-12 border-[5px] border-white shadow-[9px_9px_0px_1px_#ffffff] select-none">
								<div className="flex justify-stretch select-none pointer-events-none">
									<ResourceCategory
										iconUrl={iconUrl ?? ""}
										title={title}
										isMobile={true}
									/>
									<ResourceDescription
										title={title}
										description={description ?? ""}
										isMobile={true}
									/>
								</div>
								<div className="pb-[9px]">
									<div className="mt-2 flex flex-col gap-4">
										{resources.map(({ _id, title, link }) => (
											<ResourceItem
												key={_id}
												title={title}
												link={link}
												isMobile={true}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</>
				),
			)}
		</>
	);
}
