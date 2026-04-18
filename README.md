# School Management API

Node.js + Express + MySQL APIs for adding schools and listing schools sorted by distance.

## Endpoints

1. POST /addSchool
2. GET /listSchools?latitude=<value>&longitude=<value>

## Setup

1. Install dependencies:
   npm install
2. Copy env file:
   cp .env.example .env
3. Update .env values with your MySQL credentials.
4. Run SQL in sql/schema.sql to create database and table.
5. Start server:
   npm run dev

## API Examples

### Add School

POST /addSchool

Request body:
{
  "name": "Green Valley School",
  "address": "12 Lake Road, Jaipur",
  "latitude": 26.9124,
  "longitude": 75.7873
}

### List Schools

GET /listSchools?latitude=26.9124&longitude=75.7873

Returns schools sorted by nearest distance using the Haversine formula.

## Postman Collection

Import postman/school-management.postman_collection.json into Postman.
