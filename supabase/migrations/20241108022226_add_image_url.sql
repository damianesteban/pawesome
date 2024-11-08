-- ANIMALS
create type public.species as enum ('Dog', 'Cat');
ALTER TABLE public.animals
ADD COLUMN image_url VARCHAR(255),
ADD COLUMN species species;