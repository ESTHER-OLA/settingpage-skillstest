````markdown
# Settings Page Design using Tailwind and React

## Overview

This project involves designing a responsive settings page for both desktop and mobile views using Tailwind CSS and React. The settings page allows users to manage their roles and preferences. Additionally, a simple REST API is created using Node.js and Next.js to fetch and display user roles.

## Features

- Responsive design for desktop and mobile views
- User roles management interface
- REST API to fetch user roles
- Deployment on Vercel

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Next.js (for REST API)
- **Deployment:** Vercel

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/ESTHER-OLA/settingpage-skillstest.git
cd your-repo-name
```
````

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run the Application Locally

To run the frontend and backend locally, use the following commands in two separate terminal windows:

1. **Start the Next.js API server:**

```bash
cd api
npm run dev
# or
yarn dev
```

2. **Start the React frontend:**

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` to view the application in your browser.

## API Endpoints

- **GET /api/userRoles**: Fetches the list of user roles.

### Example Response

```json
[
  {
    "role": "Superadmin",
    "status": "Active"
  },
  {
    "role": "Merchantadmin",
    "status": "Active"
  },
  ...
]
```

## Design

For UI components, I utilized [ShadCN](https://ui.shadcn.com/) for inspiration and design consistency. Tailwind CSS is used for styling.

## Deployment

The project is deployed on Vercel. You can view the live application at the following link:

- [Live Application on Vercel](https://your-vercel-app-url.vercel.app)

## GitHub Repository

You can find the source code for this project in the following GitHub repository:

- [GitHub Repository](https://github.com/ESTHER-OLA/settingpage-skillstest.git)

## Acknowledgments

- Tailwind CSS for beautiful UI components.
- React for easy component-based development.
- Next.js for simple API routes.
- Vercel for deployment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

```
