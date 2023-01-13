# Typescript Node/Express REST Api

A REST api project stub for a single entity, users.

## Utilising
- Winston (logging)
- Data Type/Access Objects
- Mongoose/MongoDB
- Express Validator

## Control Flow
- HTTP Request
- > user.routes.config: paths URL to correct controller functions and applies necessary middlwares
- > if middleware are validated, controllers connect request to correct users.service methods
- > services call applicable methods from 'Data Access Object', users.dao 
- > DAO uses Data Type Objects for typing, uses.dto