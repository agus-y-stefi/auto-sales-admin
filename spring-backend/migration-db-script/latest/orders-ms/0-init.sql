CREATE SCHEMA IF NOT EXISTS orders_service AUTHORIZATION postgres;

SET search_path TO orders_service, public;

CREATE TABLE orders
(
    order_number              BIGINT      NOT NULL,
    order_date                DATE        NOT NULL DEFAULT CURRENT_DATE,
    required_date             DATE,
    shipped_date              DATE,
    status                    VARCHAR(15) NOT NULL,
    comments                  TEXT,
    customer_number           BIGINT,
    sales_rep_employee_number BIGINT
);

alter table orders
    add constraint idx_16398_primary
        primary key (order_number);


create table orderdetails
(
    order_number     bigint      not null,
    product_code     varchar(15) not null,
    quantity_ordered bigint,
    price_each       numeric(10, 2)
);

alter table orderdetails
    add constraint idx_16395_primary
        primary key (order_number, product_code);


alter table orderdetails
    add constraint orderdetails_ibfk_1
        foreign key (order_number) references orders
            on update restrict on delete restrict;


create table payments
(
    check_number varchar(50)    not null,
    payment_date date,
    amount       numeric(10, 2) not null,
    order_number bigint         not null
);

alter table payments
    add constraint idx_16403_primary
        primary key (order_number, check_number);

alter table payments
    add constraint payments_ibfk_order
        foreign key (order_number) references orders
            on update cascade on delete restrict;


