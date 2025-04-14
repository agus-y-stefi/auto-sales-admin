CREATE TABLE IF NOT EXISTS orders
(
    order_number              Serial PRIMARY KEY,
    order_date                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    required_date             TIMESTAMP,
    shipped_date              TIMESTAMP,
    status                    VARCHAR(20),
    comments                  TEXT,
    customer_number           INT,
    sales_rep_employee_number INT
);

CREATE TABLE IF NOT EXISTS customers
(
    customer_number    INT PRIMARY KEY,
    customer_name      VARCHAR(50),
    contact_last_name  VARCHAR(50),
    contact_first_name VARCHAR(50),
    phone              VARCHAR(50),
    city               VARCHAR(50),
    country            VARCHAR(50),
    credit_limit       DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS payments
(
    customer_number INT,
    check_number    VARCHAR(50),
    payment_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount          DECIMAL(10, 2),
    PRIMARY KEY (customer_number, check_number)
);

ALTER TABLE orders
    ADD CONSTRAINT customers_orders foreign key (customer_number) references customers (customer_number);

ALTER TABLE payments
    ADD CONSTRAINT customers_payments foreign key (customer_number) references customers (customer_number);