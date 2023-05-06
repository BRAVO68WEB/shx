CREATE OR REPLACE FUNCTION generate_short_url() 
RETURNS TEXT 
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
$$ LANGUAGE plpgsql;
