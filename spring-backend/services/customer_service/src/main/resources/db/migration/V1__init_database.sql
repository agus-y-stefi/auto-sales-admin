CREATE TABLE customers
(
    customer_number   SERIAL PRIMARY KEY,
    customer_name     VARCHAR(50)    NOT NULL,
    contact_first_name VARCHAR(50),
    contact_last_name  VARCHAR(50),
    phone            VARCHAR(50),
    city             VARCHAR(50),
    country          VARCHAR(50),
    credit_limit      DECIMAL(10, 2) NOT NULL
);

CREATE TABLE employees
(
    employee_number SERIAL PRIMARY KEY,
    last_name       VARCHAR(50) NOT NULL,
    first_name      VARCHAR(50) NOT NULL,
    extension      VARCHAR(10) NOT NULL,
    office_code     VARCHAR(10) NOT NULL
);

CREATE TABLE offices
(
    office_code   VARCHAR(10) PRIMARY KEY,
    city         VARCHAR(50) NOT NULL,
    phone        VARCHAR(50) NOT NULL,
    address_line1 VARCHAR(50) NOT NULL,
    address_line2 VARCHAR(50),
    state        VARCHAR(50),
    country      VARCHAR(50) NOT NULL,
    postal_code   VARCHAR(15) NOT NULL,
    territory    VARCHAR(10) NOT NULL
);

ALTER TABLE employees
    ADD CONSTRAINT fk_office
        FOREIGN KEY (office_code) REFERENCES offices (office_code);