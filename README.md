# CRM SaaS Frontend

This is the frontend of the CRM SaaS project, built with Vite, React, and Tailwind CSS.

## Features

- Role-based access control
- Dashboard and analytics
- HR management
- Sales CRM
- Accounting module
- Project and task management
- Meeting scheduling
- OKR tracking
- Personal app integration

## Tech Stack

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context / Redux (Specify if used)
- **Routing**: React Router
- **Build Tool**: Vite
- **Linting**: ESLint

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/crm_saas-frontend.git
   cd crm_saas-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser at `http://localhost:5173/`

## Project Structure

```
crm_saas/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components
│   │   ├── accounting/
│   │   ├── calendar/
│   │   ├── crm/
│   │   ├── dashboard/
│   │   ├── documents/
│   │   ├── hrm/
│   │   ├── layout/
│   │   ├── manager/
│   │   ├── meetings/
│   │   ├── okrapp/
│   │   ├── shared/
│   ├── pages/             # Main page components
│   ├── hooks/             # Custom hooks
│   ├── context/           # Global state management
│   ├── services/          # API calls and utilities
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint

## Contributing

Feel free to submit issues or pull requests. Follow the coding guidelines and use meaningful commit messages.

## License

[MIT License](LICENSE)

---

**Author:** Clinton Okumu
**Contact:** clintonomondiokumu@gmail.com
