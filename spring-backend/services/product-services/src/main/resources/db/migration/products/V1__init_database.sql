CREATE TABLE IF NOT EXISTS order_details
(
    order_number     INT            NOT NULL,
    product_code     VARCHAR(15)    NOT NULL,
    quantity_ordered INT            NOT NULL,
    price_each       DECIMAL(10, 2) NOT NULL,
    primary key (order_number, product_code)
);

CREATE TABLE IF NOT EXISTS products
(
    product_code        VARCHAR(15) PRIMARY KEY,
    product_name        VARCHAR(70)    NOT NULL,
    product_line        VARCHAR(50)    NOT NULL,
    product_scale       VARCHAR(10)    NOT NULL,
    product_vendor      VARCHAR(50)    NOT NULL,
    product_description TEXT           NOT NULL,
    quantity_in_stock    INT            NOT NULL,
    buy_price           DECIMAL(10, 2) NOT NULL,
    msrp               DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_lines
(
    product_line     VARCHAR(50) PRIMARY KEY,
    text_description TEXT NOT NULL
);

alter table order_details
    add constraint fk_orderdetails_products foreign key (product_code) references products (product_code);

alter table products
    add constraint fk_products_productlines foreign key (product_line) references product_lines (product_line);