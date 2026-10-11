import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const requestSchema = z.object({
  clientKey: z.string().min(8).max(100),
  categoryId: z.string().min(1).max(50),
  problemSummary: z.string().trim().min(5).max(2000),
  location: z.string().trim().min(2).max(300),
  urgency: z.enum(["low", "normal", "urgent", "emergency"]),
  preferredTime: z.string().trim().max(200).nullable(),
  contactPhone: z.string().trim().max(30).nullable(),
});

export type ServiceRequestInput = z.infer<typeof requestSchema>;

export const createServiceRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => requestSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    // Idempotent: the same confirmation card cannot create two requests.
    const { data: existing } = await supabase
      .from("service_requests")
      .select("reference, status")
      .eq("user_id", userId)
      .eq("client_key", data.clientKey)
      .maybeSingle();
    if (existing) return existing;

    const { data: row, error } = await supabase
      .from("service_requests")
      .insert({
        user_id: userId,
        client_key: data.clientKey,
        category_id: data.categoryId,
        problem_summary: data.problemSummary,
        location: data.location,
        urgency: data.urgency,
        preferred_time: data.preferredTime || null,
        contact_phone: data.contactPhone || null,
      })
      .select("reference, status")
      .single();
    if (error || !row) {
      console.error("Service request insert failed", error?.code);
      throw new Error("Your service request could not be saved. Please try again.");
    }
    return row;
  });
