CREATE OR REPLACE FUNCTION generate_api_key() 
RETURNS TEXT 
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
$$ LANGUAGE plpgsql;
