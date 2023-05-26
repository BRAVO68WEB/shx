--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS '';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: generate_api_key(); Type: FUNCTION; Schema: public; Owner: shx-dev
--

CREATE FUNCTION public.generate_api_key() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
  api_key TEXT;
BEGIN
  api_key := format('SHX-%s-%s', 
                    array_to_string(
                      ARRAY(
                        SELECT chr((97 + round(random() * 25))::integer) 
                        FROM generate_series(1, 5)
                      ), ''
                    ),
                    array_to_string(
                      ARRAY(
                        SELECT chr((97 + round(random() * 25))::integer) 
                        FROM generate_series(1, 5)
                      ), ''
                    )
                  );
  RETURN api_key;
END;
$$;


ALTER FUNCTION public.generate_api_key() OWNER TO "shx-dev";

--
-- Name: generate_short_url(); Type: FUNCTION; Schema: public; Owner: shx-dev
--

CREATE FUNCTION public.generate_short_url() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
  url_key TEXT;
BEGIN
  url_key := '';

  FOR i IN 1..6 LOOP
    url_key := url_key || chr((97 + round(random() * 25))::integer);
  END LOOP;

  RETURN url_key;
END;
$$;


ALTER FUNCTION public.generate_short_url() OWNER TO "shx-dev";

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: shx-dev
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO "shx-dev";

--
-- Name: unique_random(integer, text, text); Type: FUNCTION; Schema: public; Owner: shx-dev
--

CREATE FUNCTION public.unique_random(len integer, _table text, _col text) RETURNS text
    LANGUAGE plpgsql
    AS $$
declare
  result text;
  numrows int;
begin
  result = random_string(len);
  loop
    execute format('select 1 from %I where %I = %L', _table, _col, result);
    get diagnostics numrows = row_count;
    if numrows = 0 then
      return result; 
    end if;
    result = random_string(len);
  end loop;
end;
$$;


ALTER FUNCTION public.unique_random(len integer, _table text, _col text) OWNER TO "shx-dev";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: apikeys; Type: TABLE; Schema: public; Owner: shx-dev
--

CREATE TABLE public.apikeys (
    "keyID" uuid DEFAULT gen_random_uuid() NOT NULL,
    key text DEFAULT public.generate_api_key() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.apikeys OWNER TO "shx-dev";

--
-- Name: TABLE apikeys; Type: COMMENT; Schema: public; Owner: shx-dev
--

COMMENT ON TABLE public.apikeys IS 'API Keys Allowed';


--
-- Name: gists; Type: TABLE; Schema: public; Owner: shx-dev
--

CREATE TABLE public.gists (
    "gistID" uuid DEFAULT gen_random_uuid() NOT NULL,
    content text NOT NULL,
    gist_url_key text DEFAULT public.generate_short_url() NOT NULL,
    "isPrivate" boolean DEFAULT false NOT NULL,
    passkey text,
    "isOneTimeOnly" boolean DEFAULT false NOT NULL,
    views numeric DEFAULT 0 NOT NULL,
    creator_ip text,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    "apikeyUsed" uuid NOT NULL
);


ALTER TABLE public.gists OWNER TO "shx-dev";

--
-- Name: shorturls; Type: TABLE; Schema: public; Owner: shx-dev
--

CREATE TABLE public.shorturls (
    "urlID" uuid DEFAULT gen_random_uuid() NOT NULL,
    original_url text NOT NULL,
    short_key text DEFAULT public.generate_short_url() NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    clicks integer DEFAULT 0 NOT NULL,
    creator_ip text,
    "apikeyUsed" uuid NOT NULL
);


ALTER TABLE public.shorturls OWNER TO "shx-dev";

--
-- Name: TABLE shorturls; Type: COMMENT; Schema: public; Owner: shx-dev
--

COMMENT ON TABLE public.shorturls IS 'All Short URLs';


--
-- Name: uploads; Type: TABLE; Schema: public; Owner: shx-dev
--

CREATE TABLE public.uploads (
    "fileID" uuid DEFAULT gen_random_uuid() NOT NULL,
    filename text NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now() NOT NULL,
    upload_url text NOT NULL,
    "apikeyUsed" uuid NOT NULL,
    uploader_ip text,
    "deleteToken" text DEFAULT public.generate_short_url() NOT NULL
);


ALTER TABLE public.uploads OWNER TO "shx-dev";

--
-- Name: TABLE uploads; Type: COMMENT; Schema: public; Owner: shx-dev
--

COMMENT ON TABLE public.uploads IS 'File Uploads Data';


--
-- Data for Name: apikeys; Type: TABLE DATA; Schema: public; Owner: shx-dev
--

COPY public.apikeys ("keyID", key, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: gists; Type: TABLE DATA; Schema: public; Owner: shx-dev
--

COPY public.gists ("gistID", content, gist_url_key, "isPrivate", passkey, "isOneTimeOnly", views, creator_ip, created_on, "apikeyUsed") FROM stdin;
\.


--
-- Data for Name: shorturls; Type: TABLE DATA; Schema: public; Owner: shx-dev
--

COPY public.shorturls ("urlID", original_url, short_key, created_on, clicks, creator_ip, "apikeyUsed") FROM stdin;
\.


--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: shx-dev
--

COPY public.uploads ("fileID", filename, uploaded_at, upload_url, "apikeyUsed", uploader_ip, "deleteToken") FROM stdin;
\.


--
-- Name: apikeys apikeys_key_key; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.apikeys
    ADD CONSTRAINT apikeys_key_key UNIQUE (key);


--
-- Name: apikeys apikeys_pkey; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.apikeys
    ADD CONSTRAINT apikeys_pkey PRIMARY KEY ("keyID");


--
-- Name: gists gists_gist_url_key_key; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.gists
    ADD CONSTRAINT gists_gist_url_key_key UNIQUE (gist_url_key);


--
-- Name: gists gists_pkey; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.gists
    ADD CONSTRAINT gists_pkey PRIMARY KEY ("gistID");


--
-- Name: shorturls shorturls_pkey; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT shorturls_pkey PRIMARY KEY ("urlID");


--
-- Name: shorturls shorturls_short_key_key; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT shorturls_short_key_key UNIQUE (short_key);


--
-- Name: uploads uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY ("fileID");


--
-- Name: uploads uploads_upload_url_key; Type: CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_upload_url_key UNIQUE (upload_url);


--
-- Name: apikeys set_public_apikeys_updated_at; Type: TRIGGER; Schema: public; Owner: shx-dev
--

CREATE TRIGGER set_public_apikeys_updated_at BEFORE UPDATE ON public.apikeys FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_apikeys_updated_at ON apikeys; Type: COMMENT; Schema: public; Owner: shx-dev
--

COMMENT ON TRIGGER set_public_apikeys_updated_at ON public.apikeys IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: gists gists_apikeyUsed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.gists
    ADD CONSTRAINT "gists_apikeyUsed_fkey" FOREIGN KEY ("apikeyUsed") REFERENCES public.apikeys("keyID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shorturls shorturls_apikeyUsed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT "shorturls_apikeyUsed_fkey" FOREIGN KEY ("apikeyUsed") REFERENCES public.apikeys("keyID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: uploads uploads_apikeyUsed_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shx-dev
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT "uploads_apikeyUsed_fkey" FOREIGN KEY ("apikeyUsed") REFERENCES public.apikeys("keyID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

