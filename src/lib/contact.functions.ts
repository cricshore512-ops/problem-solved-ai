import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  topic: z.enum(["customer", "professional", "partner", "other"]),
  message: z.string().trim().min(10, "Please write at least a short message").max(2000),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Silently accept bot submissions without storing them.
    if (data.website) return { ok: true as const };

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("Contact form: missing backend configuration");
      throw new Error("The contact form is not configured right now. Please email us instead.");
    }

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      topic: data.topic,
      message: data.message,
    });
    if (error) {
      console.error("Contact message insert failed", error.code);
      throw new Error("Your message could not be sent. Please try again in a moment.");
    }
    return { ok: true as const };
  });
