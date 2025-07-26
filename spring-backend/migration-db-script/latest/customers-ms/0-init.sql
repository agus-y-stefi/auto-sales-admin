create table if not exists customers
(
    customer_number    int            not null,
    customer_name      varchar(50)    null,
    contact_last_name  varchar(50)    null,
    contact_first_name varchar(50)    null,
    phone              varchar(50)    not null,
    city               varchar(50)    not null,
    country            varchar(50)    not null,
    credit_limit       decimal(10, 2) null
);

alter table customers
    add primary key (customer_number);

create table if not exists employees
(
    employee_number int         not null,
    last_name       varchar(50) null,
    first_name      varchar(50) null,
    extension       varchar(10) not null,
    office_code     varchar(10) null
);

create index officeCode
    on employees (office_code);

alter table employees
    add primary key (employee_number);

create table if not exists offices
(
    office_code   varchar(10) not null,
    city          varchar(50) not null,
    phone         varchar(50) not null,
    address_line1 varchar(50) null,
    address_line2 varchar(50) null,
    state         varchar(50) null,
    country       varchar(50) not null,
    postal_code   varchar(15) null,
    territory     varchar(10) not null
);

alter table offices
    add primary key (office_code);

alter table employees
    add constraint employees_ibfk_2
        foreign key (office_code) references offices (office_code);


