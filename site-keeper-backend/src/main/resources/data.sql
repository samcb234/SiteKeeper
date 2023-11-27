insert into roles(role) values('admin');
insert into roles(role) values('manager');
insert into roles(role) values('engineer');
insert into roles(role) values('user');

insert into project_status(status) values ('costing'),
                                          ('requirements'),
                                          ('development'),
                                          ('design'),
                                          ('testing'),
                                          ('finished');

insert into user (contact_info, fname, lname, user_role, contact_date) values ('user1@email.com', 'john', 'smith', 1, 'never'),
('user2@email.com', 'Sam', 'Block', 2, 'never'),
('user3@email.com', 'Mohamed', 'Barry', 3, 'never'),
('test.email1@email.com', 'test', 'user', 4, 'never'),
('user5@email.com', 'Eduardo', 'Saavedra', 1, 'never');

insert into costing() values ();
insert into costing() values ();
insert into costing() values ();
insert into costing() values ();
insert into costing() values ();
insert into costing() values ();
insert into costing() values ();
insert into costing() values ();

insert into discipline (type) values ('terminal');
insert into discipline (type) values ('middleware');
insert into discipline (type) values ('host');

insert into project (start_date, end_date, name, total_hours, project_manager) values ('01/01/2023', '01/01/2024', 'first project', 56, 1);
insert into project (start_date, end_date, name, total_hours, project_manager) values ('01/01/2012', '01/01/2014', 'second project', 300, 2);
insert into project (start_date, end_date, name, total_hours, project_manager) values ('01/01/2023', '01/01/2024', 'third project', 56, 1);
insert into project (start_date, end_date, name, total_hours, project_manager) values ('01/01/2012', '01/01/2014', 'fourth project', 300, 2);

insert into disciplines_on_projects (project, discipline, estimated_by, total_cost, costing) values (1, 1, 2, 50, 4),
(1, 2, 1, 40, 5),
(1, 3, 3, 60, 6),
(2, 1, 2, 100, 7),
(2, 2, 3, 60, 8);

insert into project_discipline_lead_engineers(project, discipline, user) values (1, 1, 1),
                                                             (1, 2, 3),
                                                             (1, 3, 2),
                                                             (2, 1, 2),
                                                             (2, 2, 3),
                                                             (1, 1, 2);

insert into site (name, site_manager, location) values ('site 1', 3, 'west greenwich');
insert into site (name, site_manager, location) values ('site 2', 1, 'providence');

insert into disciplines_on_sites(site, discipline) values (1, 1);
insert into disciplines_on_sites(site, discipline) values (1, 2);
insert into disciplines_on_sites(site, discipline) values (1, 3);

insert into disciplines_on_sites(site, discipline) values (2, 1);
insert into disciplines_on_sites(site, discipline) values (2, 2);

insert into site_discipline_lead_engineers(site, discipline, user) values (1, 1, 1),
                                                                          (1, 2, 2),
                                                                          (1, 3, 3),
                                                                          (2, 1, 3),
                                                                          (2, 2, 1);

insert into projects_on_sites(project, site) values (1, 1);
insert into projects_on_sites(project, site) values (1, 2);
insert into projects_on_sites(project, site) values (2, 1);
insert into projects_on_sites(project, site) values (2, 2);

insert into feature (description, name) values ('Im too lazy to write a full description here lol', 'terminal feature');
insert into feature (description, name) values ('Im too lazy to write a full description here lol', 'middleware feature');
insert into feature ( description, name) values ('Im too lazy to write a full description here lol', 'host feature');

insert into disciplines_on_features (feature, discipline) values (1, 1);
insert into disciplines_on_features (feature, discipline) values (2, 2);
insert into disciplines_on_features (feature, discipline) values (3, 3);

insert into features_on_projects(feature, project) values (1, 1);
insert into features_on_projects(feature, project) values (2, 1);
insert into features_on_projects(feature, project) values (3, 1);
insert into features_on_projects(feature, project) values (1, 4);

insert into features_on_sites(feature, site) values (1, 1);
insert into features_on_sites(feature, site) values (2, 1);
insert into features_on_sites(feature, site) values (3, 1);

insert into terminal(name, description) values ('terminal 1', 'Im too lazy to write a full description here lol');
insert into terminal(name, description) values ('terminal 2', 'Im too lazy to write a full description here lol');
insert into terminal(name, description) values ('terminal 3', 'Im too lazy to write a full description here lol');

insert into framework(name, description) values ('framework 1', 'Im too lazy to write a full description here lol');
insert into framework(name, description) values ('framework 2', 'Im too lazy to write a full description here lol');
insert into framework(name, description) values ('framework 3', 'Im too lazy to write a full description here lol');

insert into terminals_on_sites(terminal, site, framework) values (1, 1, 1);
insert into terminals_on_sites(terminal, site, framework) values (2, 1, 2);
insert into terminals_on_sites(terminal, site, framework) values (3, 1, 3);
insert into terminals_on_sites(terminal, site, framework) values (1, 2, 1);

insert into terminals_on_projects(terminal, project, framework) values (1, 1, 1);
insert into terminals_on_projects(terminal, project, framework) values (2, 1, 2);
insert into terminals_on_projects(terminal, project, framework) values (3, 1, 3);
insert into terminals_on_projects(terminal, project, framework) values (1, 2, 1);

insert into information(discipline_id, info, project_id) values(1, 'link goes here', 1);
insert into information(discipline_id, info, project_id) values(2, 'link goes here', 1);
insert into information(discipline_id, info, project_id) values(3, 'link goes here', 1);
insert into information(discipline_id, info, project_id) values(2, 'link goes here', 1);

insert into users_on_sites(user, site, active) values (1, 1, true);
insert into users_on_sites(user, site, active) values (2, 1, true);
insert into users_on_sites(user, site, active) values (3, 1, false);
insert into users_on_sites(user, site, active) values (2, 2, true);
insert into users_on_sites(user, site, active) values (3, 2, false);

insert into users_on_projects(user, project, active, discipline) values (1, 1, true, 1),
(2, 1, true, 2),
(3, 1, false, 3),
(2, 2, true, 1),
(3, 2, false, 2),
(5, 1, true, 2);

insert into peripheral(img, description, name) values ('image', 'description', 'name');

insert into middleware(description, name) values ('this is a description', 'middleware 1');
insert into middleware(description, name) values ('this is a description', 'middleware 2');
insert into middleware(description, name) values ('this is a description', 'middleware 3');

insert into host(description, name) values ('this is a description', 'host 1');
insert into host(description, name) values ('this is a description', 'host 2');
insert into host(description, name) values ('this is a description', 'host 3');


insert into middleware_on_sites(middleware, site) values (1, 1);
insert into middleware_on_sites(middleware, site) values (1, 2);
insert into middleware_on_sites(middleware, site) values (2, 2);

insert into middleware_on_projects(middleware, project) values (1, 1);
insert into middleware_on_projects(middleware, project) values (1, 2);
insert into middleware_on_projects(middleware, project) values (2, 2);

insert into hosts_on_sites(host, site) values (1, 1);
insert into hosts_on_sites(host, site) values (1, 2);
insert into hosts_on_sites(host, site) values (2, 2);

insert into hosts_on_projects(host, project) values (1, 1);
insert into hosts_on_projects(host, project) values (1, 2);
insert into hosts_on_projects(host, project) values (2, 2);

insert into message(sender, costing, message, date_sent) values (1, 1, 'hello there', 'today');
insert into message(sender, costing, message, date_sent) values (2, 1, 'hi how are you', 'today');
insert into message(sender, costing, message, date_sent) values (1, 2, 'different conversation', 'today');

insert into terminal(name, description) values ('new terminal', 'Im too lazy to write a full description here lol');
insert into terminals_on_sites(terminal, site, framework) values (4, 2, 1);

insert into similar_projects(project1, project2) values (1, 2);
insert into similar_projects(project1, project2) values (3, 4);
insert into similar_projects(project1, project2) values (1, 3);
insert into similar_projects(project1, project2) values (4, 1);