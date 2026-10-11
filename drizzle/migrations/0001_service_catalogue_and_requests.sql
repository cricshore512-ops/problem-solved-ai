CREATE TABLE public.service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  typical_issues TEXT[] NOT NULL DEFAULT '{}',
  consult_options TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true
);
GRANT SELECT ON public.service_categories TO anon, authenticated;
GRANT ALL ON public.service_categories TO service_role;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active service categories" ON public.service_categories FOR SELECT TO anon, authenticated USING (active);

INSERT INTO public.service_categories (id, name, description, typical_issues, consult_options) VALUES
('plumbing','Plumbing','Leaks, blocked drains, taps, pipes, water heaters and bathroom fittings.', ARRAY['leaking tap','pipe leak','blocked drain','low water pressure','geyser not heating'], ARRAY['video','home_visit']),
('electrical','Electrical','Wiring faults, tripping breakers, switches, sockets, lights and fans.', ARRAY['breaker tripping','sparking socket','no power','fan not working'], ARRAY['video','home_visit']),
('appliance_repair','Appliance Repair','Refrigerators, washing machines, microwaves, ovens and other home appliances.', ARRAY['fridge not cooling','washing machine noise','microwave not heating'], ARRAY['chat','video','home_visit']),
('ac_service','AC Service','Air conditioner servicing, gas refill, cooling issues and installation.', ARRAY['AC not cooling','water leaking from AC','ice on pipe'], ARRAY['video','home_visit']),
('cleaning','Cleaning','Home deep cleaning, kitchen, bathroom, sofa and carpet cleaning.', ARRAY['deep cleaning','bathroom cleaning','sofa cleaning'], ARRAY['home_visit']),
('carpentry','Carpentry','Furniture repair, doors, locks, hinges and fittings.', ARRAY['door not closing','broken hinge','furniture assembly'], ARRAY['video','home_visit']),
('pest_control','Pest Control','Cockroaches, termites, bed bugs, mosquitoes and rodents.', ARRAY['cockroaches','termites','bed bugs'], ARRAY['home_visit']),
('painting','Painting & Maintenance','Wall painting, dampness, seepage and general maintenance.', ARRAY['wall dampness','paint peeling','seepage'], ARRAY['video','home_visit']);

CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT ('OS-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  user_id UUID NOT NULL,
  client_key TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.service_categories(id),
  problem_summary TEXT NOT NULL CHECK (char_length(problem_summary) BETWEEN 5 AND 2000),
  location TEXT NOT NULL CHECK (char_length(location) BETWEEN 2 AND 300),
  urgency TEXT NOT NULL CHECK (urgency IN ('low','normal','urgent','emergency')),
  preferred_time TEXT CHECK (preferred_time IS NULL OR char_length(preferred_time) <= 200),
  contact_phone TEXT CHECK (contact_phone IS NULL OR char_length(contact_phone) <= 30),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','reviewing','matched','closed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, client_key)
);
GRANT SELECT, INSERT ON public.service_requests TO authenticated;
GRANT ALL ON public.service_requests TO service_role;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own service requests" ON public.service_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own service requests" ON public.service_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'submitted');