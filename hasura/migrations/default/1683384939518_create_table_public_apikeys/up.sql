CREATE TABLE "public"."apikeys" ("keyID" uuid NOT NULL DEFAULT gen_random_uuid(), "key" text NOT NULL DEFAULT generate_api_key(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("keyID") , UNIQUE ("keyID"), UNIQUE ("key"));COMMENT ON TABLE "public"."apikeys" IS E'API Keys Allowed';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_apikeys_updated_at"
BEFORE UPDATE ON "public"."apikeys"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_apikeys_updated_at" ON "public"."apikeys"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
