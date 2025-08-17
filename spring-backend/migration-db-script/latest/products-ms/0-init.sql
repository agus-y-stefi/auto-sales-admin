SET search_path TO products_service, public;

create table products
(
    product_code        varchar(15) not null,
    product_name        varchar(70),
    product_line        varchar(50),
    product_scale       varchar(10),
    product_vendor      varchar(50),
    product_description text,
    quantity_in_stock   smallint,
    buy_price           numeric(10, 2),
    m_s_r_p             numeric(10, 2)
);


alter table products
    add constraint idx_16411_primary
        primary key (product_code);

create table productlines
(
    product_line     varchar(50) not null,
    text_description varchar(4000)
);


alter table productlines
    add constraint idx_16406_primary
        primary key (product_line);


ALTER TABLE products
    ADD CONSTRAINT products_ibfk_1
        FOREIGN KEY (product_line) REFERENCES productlines (product_line)
