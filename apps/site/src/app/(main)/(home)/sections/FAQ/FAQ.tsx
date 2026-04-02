import { getQuestions } from "./getQuestions";
import FAQItem from "./FAQItem";
import { PortableText } from "@portabletext/react";

export interface FAQAccordion {
	faq: FAQ[];
}

export interface FAQ {
	_key: string;
	question: JSX.Element;
	answer: JSX.Element;
}

const FAQ = async () => {
	const questions = await getQuestions();
	const faq = questions[0]["faqs"].map(({ _key, question, answer }) => ({
		_key,
		question: <strong>{question}</strong>,
		answer: <PortableText value={answer} />,
	}));

	return (
		<section className="w-full px-6 py-16 md:px-10 lg:px-16">
			<div className="max-w-[1200px] mx-auto">
				<h2 className="font-torus text-[#2f3152] text-5xl md:text-6xl text-center mb-10 tracking-wide">
					FAQs
				</h2>
				<div className="flex flex-col gap-4 md:flex-row">
					<div className="flex flex-col flex-1 gap-4">
						{faq
							.filter((_, i) => i % 2 === 0)
							.map((item, i) => (
								<FAQItem key={item._key} faq={item} index={i * 2} />
							))}
					</div>
					<div className="flex flex-col flex-1 gap-4">
						{faq
							.filter((_, i) => i % 2 === 1)
							.map((item, i) => (
								<FAQItem key={item._key} faq={item} index={i * 2 + 1} />
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;
