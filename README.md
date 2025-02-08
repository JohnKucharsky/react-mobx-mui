
# React Effector MUI

This is a frontend project built for [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Features

- **Effector** for state management
- **Type-safe** with Zod
- **MUI** for UI components, including dark mode and a color picker
- **React Router** for navigation
- **Formik** for form validation
- **Type-safe internationalization** with i18next
- **Advanced linting and formatting** using ESLint and Prettier
- **End-to-end testing** with Cypress

## Libraries and Frameworks

| **Name**                                      | **Version** | **Description**       |  
|-----------------------------------------------|-------------|-----------------------|  
| [TypeScript](https://www.typescriptlang.org/) | 5.7.x       | Type-safe JavaScript  |  
| [React](https://react.dev/)                   | 19.x        | UI library            |  
| [Vite](https://vite.dev/)                     | 6.x         | Build tool            |  
| [React Router](https://reactrouter.com/)      | 7.x         | Navigation library    |  
| [Effector](https://effector.dev/)             | 23.x        | State manager         |  
| [MUI](https://mui.com/)                       | 6.x         | UI components         |  
| [Zod](https://zod.dev/)                       | 3.x         | Schema validation     |  
| [Formik](https://formik.org/)                 | 2.x         | Form state management |  
| [Cypress](https://www.cypress.io/)            | 13.x        | End-to-end testing    |  
| [i18next](https://www.i18next.com/)           | 24.x        | Internationalization  |  

## Getting Started

A demo of the app is live at: [https://react-effector-mui.vercel.app/](https://react-effector-mui.vercel.app/).

### Development

1. Copy the environment file:
   ```bash  
   cp .env.example .env.local
   ``` 
   
2. Install dependencies:
    ```bash  
   yarn
   ``` 
   
3. Run dev:
   ```bash  
   yarn dev
   ``` 

### Production

1. Build the application:
   ```bash  
   yarn build
   ``` 

2. Preview the build:
    ```bash  
   yarn preview
   ``` 

### Testing

1. Run tests in the browser:
   ```bash  
   yarn test:open
   ``` 

2. Run tests in the terminal:
    ```bash  
   yarn test:run
   ``` 