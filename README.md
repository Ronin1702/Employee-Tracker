# Employee Tracker 3000 [![GPLv3](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE)

A simple command-line application to manage a company's employee database,  with functionalities such as view, update and delete departments, roles, and employees.

## Table of Contents

* [Description](#description)
* [Technology](#technology)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Links](#links)
* [License](#license)

## Description

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

[*back to top*](#table-of-contents)

## Technology

* [![Node.js](https://img.shields.io/badge/Node.js®-v20.4.0-blue?logo=node.js)](https://nodejs.org/en)

* [![npm](https://img.shields.io/badge/npm-v9.8.0-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)
  * [![Cli-Table3 Package](https://img.shields.io/badge/Cli--Table3-0.6.3-green?logo=npm)](https://www.npmjs.com/package/cli-table3)
  * [![DotEnv Package](https://img.shields.io/badge/DotEnv-16.3.1-green?logo=dotenv)](https://www.npmjs.com/package/dotenv)
  * [![Inquirer Package](https://img.shields.io/badge/Inquirer-8.2.5-green?logo=npm)](https://www.npmjs.com/package/inquirer)
  * [![MySQL2 Package](https://img.shields.io/badge/MySQL2-3.5.2-green?logo=mysql)](https://www.npmjs.com/package/https://www.npmjs.com/package/mysql2)

[*back to top*](#table-of-contents)

## Installation

* Packages to support this application can be installed by using [*npm install*](https://docs.npmjs.com/cli/v9/commands/npm-install) commands.

> **Note**: If you do not have a `package.json` in your directory already, enter command below to [*initiate*](https://docs.npmjs.com/cli/v9/commands/npm-init).
>
>```bash
>npm init -y
>```
>
>```bash
>npm i cli-table3@0.6.3 dotenv@16.3.1 express@4.18.2 inquirer@8.2.5 mysql2@3.5.2
>```
>
> **Important**: Please @ the **EXACT** versions as shown above to ensure the functionality of this application.

**Before you start, make sure to created a *`.env`* file in the root directory as the example shown below:**

```bash
DB_HOST=Replace this with your own hostname, e.g. "localhost"
DB_USER=Replace this with your own username, e.g. "root"
DB_PASS=Replace this with your own password to your "host"
DB_NAME=employee_db
```

[*back to top*](#table-of-contents)

## Usage

* This application can be invoked by using the following command:

```bash
npm start
```

* Workflow:

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

[*back to top*](#table-of-contents)

## Screenshots

* Main Interface

![Main](./img/Employee-Tracker-Screenshot.png)

[*back to top*](#table-of-contents)

## Links

[![Tweet about this](https://img.shields.io/static/v1.svg?label=Tweet%20about%20this&message=🎵&color=blue&logo=twitter&style=social)](https://rb.gy/s47zc)

* GitHub Repo: [Employee-Tracker](https://github.com/Ronin1702/Employee-Tracker)
* Walkthrough Video

[![Walkthrough Video](./img/Employee%20Tracker.gif)](https://drive.google.com/file/d/1_zVCtHVpiJ8ZTMMw7eN3g57NYMmSHCzc/view)

[*back to top*](#table-of-contents)

## License

* This application is licensed by [![GPLv3](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE).

[*back to top*](#table-of-contents)

---
![Copyright](https://img.shields.io/static/v1.svg?label=Employee%20Tracker%20©️%20&message=%202023%20Kai%20Chen&labelColor=informational&color=033450)
