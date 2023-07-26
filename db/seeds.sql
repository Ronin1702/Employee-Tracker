-- Insert departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Person', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Lead', 90000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Coordinator', 60000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Johnson', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Brown', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Davis', 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('James', 'Miller', 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jennifer', 'Wilson', 7, 6);
