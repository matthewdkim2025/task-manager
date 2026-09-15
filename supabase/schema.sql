create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  due_date timestamptz,
  completed boolean not null default false,
  source text not null default 'manual',
  moodle_uid text unique,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id int primary key default 1,
  moodle_ics_url text
);

insert into settings (id) values (1) on conflict do nothing;
