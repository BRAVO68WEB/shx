CREATE OR REPLACE FUNCTION generate_short_url() 
RETURNS TEXT 
AS $$
DECLARE
  characters TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  url_key TEXT;
BEGIN
  url_key := '';

  FOR i IN 1..6 LOOP
    url_key := url_key || substr(characters, floor(random() * length(characters) + 1), 1);
  END LOOP;

  RETURN url_key;
END;
$$ LANGUAGE plpgsql;
