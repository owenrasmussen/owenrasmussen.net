import ScrollReveal from "@/components/ScrollReveal";
import TiltPhone from "@/components/TiltPhone";
import PhoneFrame from "@/components/PhoneFrame";

export const metadata = {
  title: "Lazy Booking — Owen Rasmussen",
  description:
    "An AI travel agent that plans and books flights and hotels in one checkout.",
};

const LIVE_URL = "https://lazy-booking.vercel.app";

const steps = [
  {
    n: "01",
    title: "Chat",
    body: "“Beach, cheap, near a city, last week of June.” That's enough — the agent fills in the rest.",
  },
  {
    n: "02",
    title: "Plan",
    body: "Flights, hotels, and day trips get assembled into one itinerary, editable right in chat.",
  },
  {
    n: "03",
    title: "Book",
    body: "One payment, one confirmation. Every leg books at once.",
  },
];

const stack = [
  "Next.js",
  "OpenAI",
  "Duffel",
  "Clerk",
  "Supabase",
  "Stripe",
];

export default function LazyBookingPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <h1 className="pointer-events-none select-none text-center text-[13vw] font-black leading-none tracking-tighter text-white/[0.06] sm:text-[9vw]">
          LAZY BOOKING
        </h1>

        <div className="relative mx-auto -mt-[9vw] flex max-w-5xl flex-col items-center sm:-mt-[6vw]">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Owen Rasmussen · AI Travel Agent
          </p>
          <h2 className="mt-6 text-center text-4xl font-semibold tracking-tight sm:text-6xl">
            Booking,
            <br />
            <span className="italic text-white/70">but lazy.</span>
          </h2>

          {/* Phone mockup — real 3D box (front face + left/right metal edges), tilted via scroll */}
          <TiltPhone className="mt-16">
            <PhoneFrame src={LIVE_URL} />
          </TiltPhone>

          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Visit Lazy Booking
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* What it is */}
      <section className="mx-auto max-w-2xl px-6 py-28">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            What it is
          </p>
          <p className="mt-6 text-2xl leading-relaxed text-white/90 sm:text-3xl">
            An AI travel agent. Describe a trip in plain language and it plans
            the flights, the hotel, the activities, and all the boring bits
            in between — you just show up.
          </p>
        </ScrollReveal>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            How it works
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.n} startDelayPx={i * 40}>
              <div className="border-t border-white/10 pt-6">
                <span className="text-sm text-white/40">{step.n}</span>
                <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stack + status */}
      <section className="mx-auto max-w-2xl px-6 pb-28">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Stack
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/50">
            Currently in beta, running against the Duffel sandbox — no real
            bookings are made yet.
          </p>
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-[40vh] text-center">
        <ScrollReveal>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Get there. Effortlessly.
          </h3>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start planning
            <span aria-hidden>→</span>
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
