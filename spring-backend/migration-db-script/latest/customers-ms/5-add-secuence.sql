SET search_path TO customers_service, public;
ALTER TABLE customers
    ALTER COLUMN customer_number SET DEFAULT nextval('customers_customer_number_seq');