import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Section } from "@/components/site/Primitives";
import { SignInPanel } from "@/components/site/RealAiAssistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addOffering,
  addProfessional,
  getAdminCatalog,
  setActive,
} from "@/lib/catalog-admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Catalogue Admin | One Solve" },
      { name: "description", content: "Manage ONE SOLVE services, prices and professionals." },
      { property: "og:title", content: "Catalogue Admin | One Solve" },
      { property: "og:description", content: "Manage ONE SOLVE services, prices and professionals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Catalog = Awaited<ReturnType<typeof getAdminCatalog>>;

function AdminPage() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <Section className="pt-8">
      {signedIn === null ? null : signedIn ? <AdminPanel /> : <SignInPanel redirectPath="/admin" />}
    </Section>
  );
}

const field = "h-10 rounded-md border border-input bg-background px-3 text-sm";

function AdminPanel() {
  const [cat, setCat] = useState<Catalog | null>(null);
  const load = useCallback(() => {
    getAdminCatalog().then(setCat).catch((e: Error) => toast.error(e.message));
  }, []);
  useEffect(load, [load]);

  if (!cat) return <p className="text-muted-foreground">Loading…</p>;
  if (!cat.isAdmin)
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold">Admin access needed</h1>
        <p className="mt-2 text-muted-foreground">
          Your account is not an admin yet. Ask the ONE SOLVE team to grant access.
        </p>
      </div>
    );

  const catName = (id: string) => cat.categories.find((c) => c.id === id)?.name ?? id;
  const run = async (p: Promise<unknown>, msg: string) => {
    try {
      await p;
      toast.success(msg);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Catalogue — Mumbai</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Services & fixed prices</h2>
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const form = e.currentTarget;
            void run(
              addOffering({
                data: {
                  categoryId: String(f.get("category")),
                  name: String(f.get("name")),
                  priceInr: Number(f.get("price")),
                },
              }).then(() => form.reset()),
              "Service added",
            );
          }}
        >
          <select name="category" className={field} required>
            {cat.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Input name="name" placeholder="Job, e.g. Tap repair" required className="w-56" />
          <Input name="price" type="number" min={0} placeholder="Price ₹" required className="w-32" />
          <Button type="submit">Add service</Button>
        </form>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {cat.offerings.map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-3 p-3 text-sm">
              <span className={o.active ? "" : "text-muted-foreground line-through"}>
                {catName(o.category_id)} · {o.name} · <b>₹{o.price_inr}</b>
              </span>
              <Button size="sm" variant="outline" onClick={() => void run(setActive({ data: { kind: "offering", id: o.id, active: !o.active } }), "Updated")}>
                {o.active ? "Hide" : "Show"}
              </Button>
            </li>
          ))}
          {cat.offerings.length === 0 && <li className="p-3 text-sm text-muted-foreground">No services yet.</li>}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Professionals</h2>
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const form = e.currentTarget;
            void run(
              addProfessional({
                data: {
                  name: String(f.get("name")),
                  categoryId: String(f.get("category")),
                  areas: String(f.get("areas")).split(",").map((s) => s.trim()).filter(Boolean),
                  experienceYears: Number(f.get("exp") || 0),
                  phone: String(f.get("phone") || "") || null,
                  verified: f.get("verified") === "on",
                },
              }).then(() => form.reset()),
              "Professional added",
            );
          }}
        >
          <Input name="name" placeholder="Full name" required className="w-48" />
          <select name="category" className={field} required>
            {cat.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Input name="areas" placeholder="Areas, e.g. Andheri, Bandra" required className="w-64" />
          <Input name="exp" type="number" min={0} placeholder="Years" className="w-24" />
          <Input name="phone" placeholder="Phone (private)" className="w-40" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="verified" /> Verified
          </label>
          <Button type="submit">Add professional</Button>
        </form>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {cat.professionals.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 p-3 text-sm">
              <span className={p.active ? "" : "text-muted-foreground line-through"}>
                <b>{p.name}</b> · {catName(p.category_id)} · {p.areas.join(", ")} · {p.experience_years} yrs
                {p.verified ? " · ✓ verified" : ""} {p.phone ? `· ${p.phone}` : ""}
              </span>
              <Button size="sm" variant="outline" onClick={() => void run(setActive({ data: { kind: "professional", id: p.id, active: !p.active } }), "Updated")}>
                {p.active ? "Hide" : "Show"}
              </Button>
            </li>
          ))}
          {cat.professionals.length === 0 && <li className="p-3 text-sm text-muted-foreground">No professionals yet.</li>}
        </ul>
      </section>
    </div>
  );
}
