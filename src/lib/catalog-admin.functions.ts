import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null }> }; userId: string };

async function assertAdmin(context: Ctx) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Only ONE SOLVE admins can manage the catalogue.");
}

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const getAdminCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) return { isAdmin: false as const, userId: context.userId };
    const db = await admin();
    const [cats, offers, pros] = await Promise.all([
      db.from("service_categories").select("id, name").order("name"),
      db.from("service_offerings").select("*").order("created_at", { ascending: false }),
      db.from("professionals").select("*").order("created_at", { ascending: false }),
    ]);
    return {
      isAdmin: true as const,
      userId: context.userId,
      categories: cats.data ?? [],
      offerings: offers.data ?? [],
      professionals: pros.data ?? [],
    };
  });

const offeringSchema = z.object({
  categoryId: z.string().min(1).max(50),
  name: z.string().trim().min(2).max(150),
  priceInr: z.number().int().min(0).max(10_000_000),
});

export const addOffering = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => offeringSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await (await admin()).from("service_offerings").insert({
      category_id: data.categoryId,
      name: data.name,
      price_inr: data.priceInr,
    });
    if (error) throw new Error("Could not save this service.");
    return { ok: true };
  });

const proSchema = z.object({
  name: z.string().trim().min(2).max(120),
  categoryId: z.string().min(1).max(50),
  areas: z.array(z.string().trim().min(1).max(80)).max(30),
  experienceYears: z.number().int().min(0).max(80),
  phone: z.string().trim().max(30).nullable(),
  verified: z.boolean(),
});

export const addProfessional = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => proSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await (await admin()).from("professionals").insert({
      name: data.name,
      category_id: data.categoryId,
      areas: data.areas,
      experience_years: data.experienceYears,
      phone: data.phone || null,
      verified: data.verified,
    });
    if (error) throw new Error("Could not save this professional.");
    return { ok: true };
  });

const toggleSchema = z.object({
  kind: z.enum(["offering", "professional"]),
  id: z.string().uuid(),
  active: z.boolean(),
});

export const setActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => toggleSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const table = data.kind === "offering" ? "service_offerings" : "professionals";
    const { error } = await (await admin()).from(table).update({ active: data.active }).eq("id", data.id);
    if (error) throw new Error("Could not update.");
    return { ok: true };
  });
