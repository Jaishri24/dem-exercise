# Loan ~ Coding Exercise

## Project Details

The projects is monorepo consists of both frontend and backend,
* Frontend - React JS
* Backend - Nest JS / Typescript
* Docker
* Docker Compose
* Test Coverage
* Execution & Results

### Frontend
The front end project is simple as expected with link to backened rest api for all operations.

### Backend
The backend follows DDD where it composed of modules and clients. The modules Balance Sheet & Decision acts as the domain and related services are offered here. 
The modules interact with client services to fetch relevant data. In the project, balance sheet requires data from different clients hence gets accounting data from either 
one of the accounting providers via client i.e. Xero / MYOB and it is extendable to new accounting services.

### Docker
Each project is composed of dockerfile for testing local and live production build.

### Docker Compose
The docker compose automates the deployment of all the required services in one go.

### Test Coverage
![image](https://user-images.githubusercontent.com/69181684/236175547-af224857-1b61-47e4-a22f-0d17edc8dc00.png)

### Execution & Results

**Start services**

`docker compose up -d --build`
![image](https://user-images.githubusercontent.com/69181684/236177500-eaa693e8-64bb-4b1e-be3e-05b8ea43e6b9.png)

**Backend Endpoint**

`http://localhost:4000/api`

![image](https://user-images.githubusercontent.com/69181684/236177739-aa8f4b83-d441-4b5c-9ec3-8d06816196b7.png)

**Front Endpoint**

![image](https://user-images.githubusercontent.com/69181684/236178124-9382372b-86c6-4b7d-9795-1418ee19a9bf.png)





