# MIT-SS2021

# THD App

# Team members
| Name | Matriculation Number |
| ------ | ------ |
| Zohaib Masood | 00775592 |
| M. Danyal Butt | 00772823 |

Deggendorf Institute of Technology
---
## Git repository
[GitLab link for Repository](https://mygit.th-deg.de/mb23823/mit-ss2021)

---

## Features
- Material Design
- News
- Event
- Room
- International Office
- Book Appointment
- Login
- Register

### Requirements - install in OS before running this application
1. Nodejs Express
2. Mongodb
3. Windows 10 , Linux, IOS
---

## Starting in Development mode
To start the app in Development mode follwoing steps are required. 
Clone this repo to your desktop.

## Setup - running api backend

1. Go to directory `repo/my-api`, open cmd, and run  `npm install` to install all the dependencies for api endpoints.
2.  Once installation is finished, run the following commands to setup the environment
3. run the commands in order to set environment varibales: `set HOST=localhost` , `set MONGO_DB_URL=mongodb://localhost:27017/thd-api-db`, `set PORT=3000`
4. Now run `npm run start` to start server 



## Setup - Running Frontend Client
1. Go to directory `repo/my-app`,  and run  `npm install` to install all the angular client. To start the client, check the `src/proxy.conf.json` and configure the line `"target": "http://localhost:3000/api/"` accordingly. 
2. Open cmd in `repo/my-app` and run `ng serve` to start the angular client. Now go to browser and access the client on `http://localhost:4200/`


----

## Adding User Accounts
User accounts can be added in the following steps.
1. go to `http://localhost:4200/register` and add a new normal user. 
2. from mongo database explorer change the user role to `admin`



| Task | User |
| ------ | ------ |
| News Api | Zohaib Masood |
| Event Api | Zohaib Masood |
| User API | Zohaib Masood |
| Room API | Zohaib Masood |
| InternationalOffice API | Zohaib Masood |
| Appointment API | M. Danyal Butt |
| User Authentication | M. Danyal Butt |
| News Component | M. Danyal Butt |
| Event Component | M. Danyal Butt |
| User Component | M. Danyal Butt |
| Room Component | M. Danyal Butt |
| InternationalOffice Component | M. Danyal Butt |
| Appointment Component | Zohaib Masood |

