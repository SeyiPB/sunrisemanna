# Sunrise Manna - Daily Faith-Based Inspiration

Sunrise Manna is a subscription-based daily devotional application designed to start your day spiritually charged with kingdom wisdom and biblical insights.

## Features

- **Daily Inspiration**: Spiritual content to supercharge your morning.
- **Automated Morning Calls**: Users can subscribe to receive a daily phone call with the devotional.
  - Flexible scheduling (12:00 AM - 11:00 AM).
  - Timezone aware.
- **User-Friendly Interface**: A modern, responsive web application featuring a stunning hero section and easy-to-use subscription form.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend Integration**: Google Apps Script (Serverless function for handling subscriptions and data storage in Google Sheets)

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/SeyiPB/sunrisemanna.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd sunrisemanna
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## Development

The project uses `react-hook-form` and `zod` for robust form validation. The subscription data is sent to a deployed Google Apps Script Web App, which logs entries into a connected Google Sheet.

## License

[Add License Information]
