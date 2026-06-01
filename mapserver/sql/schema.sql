CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  email text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  CONSTRAINT users_pk PRIMARY KEY (id),
  CONSTRAINT users_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.user_lists (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  "name" varchar NOT NULL,
  created_at timestamp NOT NULL,
  CONSTRAINT user_lists_pk PRIMARY KEY (id),
  CONSTRAINT "FK_user_lists_user_id"
    FOREIGN KEY (user_id) REFERENCES public.users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public.stored_addresses (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  list_id uuid NOT NULL,
  "name" varchar NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  created_at timestamp DEFAULT now() NULL,
  CONSTRAINT stored_addresses_pk PRIMARY KEY (id),
  CONSTRAINT stored_addresses_user_lists_fk
    FOREIGN KEY (list_id) REFERENCES public.user_lists(id)
    ON DELETE CASCADE,
  CONSTRAINT stored_addresses_users_fk
    FOREIGN KEY (user_id) REFERENCES public.users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.contribute_places (
  place_id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  name varchar NOT NULL,
  short_description varchar NOT NULL,
  category varchar NOT NULL,
  email varchar NOT NULL,
  phone_number varchar NOT NULL,
  website varchar NOT NULL,
  postal_address varchar NOT NULL,
  exact_address varchar NOT NULL,
  landmark varchar NOT NULL,
  opening_hours varchar NOT NULL,
  closing_hours varchar NOT NULL,
  services varchar NOT NULL,
  price_range varchar NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT contribute_places_pk PRIMARY KEY (place_id),
  CONSTRAINT contribute_places_users_fk
    FOREIGN KEY (user_id) REFERENCES public.users(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_lists_user_id ON public.user_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_stored_addresses_user_id ON public.stored_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_stored_addresses_list_id ON public.stored_addresses(list_id);
CREATE INDEX IF NOT EXISTS idx_contribute_places_user_id ON public.contribute_places(user_id);
CREATE INDEX IF NOT EXISTS idx_contribute_places_category ON public.contribute_places(category);
