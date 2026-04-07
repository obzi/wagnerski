-- Allow 'hours' type in contacts and seed default opening hours
alter table contacts drop constraint contacts_type_check;
alter table contacts add constraint contacts_type_check
  check (type in ('phone', 'email', 'address', 'facebook', 'instagram', 'hours'));

insert into contacts (type, label, value, url, sort_order)
values ('hours', 'Otevírací doba', '9:00 – 16:00', '', 60);
