interface FloatingBubbleProps {
	navText: string;
}

export default function FloatingBubble({ navText }: FloatingBubbleProps) {
	return (
		<div className="flex items-center bg-[rgba(255,255,255,0.6)] rounded-full p-3 shadow-md text-sm md:text-base font-figtree w-fit">
			<span className="px-4 py-2 text-black bg-white rounded-full pointer-events-none md:px-6">
				{navText}
			</span>

			<form method="post" action="api/user/logout">
				<button type="submit" className="px-4 py-2 text-black md:px-6">
					Logout
				</button>
			</form>
		</div>
	);
}
