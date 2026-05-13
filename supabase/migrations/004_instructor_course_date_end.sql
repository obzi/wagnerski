-- Přidání sloupce date_end do instructor_courses pro automatické skrývání po skončení kurzu
alter table instructor_courses add column if not exists date_end date;
