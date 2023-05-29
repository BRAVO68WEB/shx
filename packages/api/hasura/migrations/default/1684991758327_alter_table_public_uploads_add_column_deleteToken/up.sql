alter table "public"."uploads" add column "deleteToken" Text
 not null default generate_short_url();
