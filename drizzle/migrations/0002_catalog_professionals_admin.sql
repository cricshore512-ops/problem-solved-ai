CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.service_offerings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id text NOT NULL REFERENCES public.service_categories(id),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 150),
  price_inr integer NOT NULL CHECK (price_inr >= 0),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_offerings TO anon, authenticated;
GRANT ALL ON public.service_offerings TO service_role;
ALTER TABLE public.service_offerings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active offerings" ON public.service_offerings FOR SELECT TO anon, authenticated USING (active);

CREATE TABLE public.professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  category_id text NOT NULL REFERENCES public.service_categories(id),
  areas text[] NOT NULL DEFAULT '{}',
  city text NOT NULL DEFAULT 'Mumbai',
  experience_years integer NOT NULL DEFAULT 0 CHECK (experience_years >= 0),
  phone text,
  verified boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- Phone numbers stay private: public roles can only read non-contact columns.
GRANT SELECT (id, name, category_id, areas, city, experience_years, verified, active) ON public.professionals TO anon, authenticated;
GRANT ALL ON public.professionals TO service_role;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active professionals" ON public.professionals FOR SELECT TO anon, authenticated USING (active);