import { formatDate } from '../lib/utils';
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — CampusConnect" },
      {
        name: "description",
        content: "Discover and RSVP to workshops, talks, hackathons, and meetups on campus.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select(
          `
          id, title, description, event_date, location, 
          clubs (name),
          event_rsvps (id, user_id)
        `,
        )
        .order("event_date", { ascending: true });
      return data || [];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("realtime_rsvps")
      .on("postgres_changes", { event: "*", schema: "public", table: "event_rsvps" }, () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient]);

  const toggleRsvp = useMutation({
    mutationFn: async ({ eventId, hasRsvpd }: { eventId: string; hasRsvpd: boolean }) => {
      if (!user) throw new Error("Must be logged in");
      if (hasRsvpd) {
        await supabase.from("event_rsvps").delete().match({ event_id: eventId, user_id: user.id });
      } else {
        await supabase.from("event_rsvps").insert({ event_id: eventId, user_id: user.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
    },
  });

  const colors = ["bg-lime", "bg-sky", "bg-peach", "bg-lavender"];

  const filteredEvents = filter === "All" ? events : events.filter(() => true);

  return (
    <SiteShell>
      <section className="border-b-2 border-black bg-sky px-4 py-14 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow font-bold">All events · Fall semester</p>
            <h1 className="mt-2 text-4xl font-bold md:text-6xl">What's on this week.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Workshop", "Talk", "Hackathon", "Social"].map((t, i) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`neu-border px-3 py-2 font-mono text-xs font-bold uppercase ${filter === t ? "bg-black text-cream" : "bg-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-cream px-4 py-12 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full font-mono text-center py-10">Loading events...</div>
          ) : (
            filteredEvents.map((e, index) => {
              const c = Array.isArray(e.clubs) ? e.clubs[0] : e.clubs;
              const rsvps = Array.isArray(e.event_rsvps) ? e.event_rsvps : [];
              const hasRsvpd = user ? rsvps.some((r) => r.user_id === user.id) : false;

              return (
                <article key={e.id} className="neu-border neu-press flex flex-col bg-white p-5">
                  <div className="mb-4 flex items-start justify-between">
                    {/* Updated: Standardized card badge layout using your global formatting utility */}
                    <div
                      className={`neu-border ${colors[index % colors.length]} px-4 py-3 text-center font-mono text-xs font-bold`}
                    >
                      {e.event_date ? formatDate(e.event_date).split(" at ")[0].toUpperCase() : "TBA"}
                    </div>
                    <span className="neu-border bg-cream px-2 py-1 font-mono text-[10px] font-bold uppercase">
                      Event
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{e.title}</h2>
                  <p className="mt-1 font-mono text-xs">{c?.name}</p>
                  <div className="my-4 border-t-2 border-black" />

                  {/* Updated Data List: Displays full standardized clean text layout */}
                  <dl className="space-y-1 font-mono text-xs">
                    <div className="flex flex-col gap-0.5 border-b border-gray-100 pb-1.5">
                      <dt className="font-bold uppercase text-gray-500">Date & Time</dt>
                      <dd className="font-medium text-black">
                        {e.event_date ? formatDate(e.event_date) : "TBA"}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-1.5">
                      <dt className="font-bold uppercase">Venue</dt>
                      <dd>{e.location || "TBA"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-bold uppercase text-lime-600">Attendees</dt>
                      <dd className="font-bold">{rsvps.length} RSVP'd</dd>
                    </div>
                  </dl>

                  <button
                    onClick={() => {
                      if (!user) return alert("Please log in to RSVP");
                      toggleRsvp.mutate({ eventId: e.id, hasRsvpd });
                    }}
                    disabled={toggleRsvp.isPending}
                    className={`neu-border neu-press mt-5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider ${hasRsvpd ? "bg-lime text-black" : "bg-black text-cream"}`}
                  >
                    {hasRsvpd ? "RSVP'd ✓" : "RSVP →"}
                  </button>
                </article>
              );
            })
          )}
        </div>
      </section>
    </SiteShell>
  );
}