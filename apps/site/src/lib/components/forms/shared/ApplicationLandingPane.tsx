"use client";

export default function ApplicationLandingPane({
  applicationType,
}: {
  applicationType: "Hacker" | "Mentor" | "Volunteer";
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        {/* Grey circle avatar placeholder */}
        <div className="h-24 w-24 rounded-full bg-slate-200" />

        <h1 className="font-sniglet text-4xl font-extrabold tracking-tight">
            {applicationType} Application
        </h1>

        <p className="mt-6 text-left text-slate-700 leading-relaxed">
          Hello! Thank you for your interest in becoming a {applicationType.toLowerCase()} at
          VenusHacks 2026. Planned in collaboration with WICS and Hack at UCI, VenusHacks is UCI’s
          largest women-centric hackathon that includes networking, fun activities, educational
          workshops, and lots of coding! Our mission is to empower underrepresented groups by
          providing an inclusive community to foster growth and creativity in computing.
        </p>
      </div>

      <hr className="my-8 border-black-200" />

      {/* WHO/WHAT/WHEN/WHERE block */}
      <div className="grid grid-cols-1 gap-4 text-slate-800 md:grid-cols-[120px_1fr]">
        <div className="font-extrabold">WHO</div>
        <div>
          You! A high school (18+) student, undergraduate, or graduate student of any experience
          level!
        </div>

        <div className="font-extrabold">WHAT</div>
        <div>VenusHacks 2026</div>

        <div className="font-extrabold">WHEN</div>
        <div>May 15, 2026 - May 17, 2026</div>

        <div className="font-extrabold">WHERE</div>
        <div>UC Irvine (Donald Bren Hall)</div>
      </div>
    </div>
  );
}