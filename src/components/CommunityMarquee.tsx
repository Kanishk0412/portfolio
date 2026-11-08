// Names come from the events and community history on this site. They are plain
// text rather than logos so they don't imply any company endorsement.
const COMMUNITIES = [
  "GeeksforGeeks",
  "MongoDB User Group Chandigarh",
  "AI Community Delhi",
  "GDG Cloud Chandigarh",
  "GDG On Campus UIET",
  "AI Community Ghaziabad",
  "Azure Developer Community",
  "Hack Briven",
  "NIT Hamirpur",
  "Masters’ Union",
  "University of Delhi",
  "Panjab University",
  "Bharti Foundation",
];

function MarqueeList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`marquee-list flex shrink-0 items-center gap-x-10 pr-10 ${hidden ? "marquee-duplicate" : ""}`}
    >
      {COMMUNITIES.map((name) => (
        <li key={name} className="whitespace-nowrap text-lg font-semibold text-foreground/50">
          {name}
        </li>
      ))}
    </ul>
  );
}

export function CommunityMarquee() {
  return (
    <section aria-labelledby="community-marquee" className="container mx-auto px-6 md:px-12">
      <h2
        id="community-marquee"
        className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60"
      >
        Communities and campuses I&apos;ve worked with
      </h2>
      <div className="marquee overflow-hidden">
        <div className="marquee-track flex w-max">
          <MarqueeList />
          <MarqueeList hidden />
        </div>
      </div>
    </section>
  );
}
