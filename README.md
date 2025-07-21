# Matrimonial BioData Platform

A modern, secure, and responsive matrimonial platform to create, browse, and connect biodata profiles, featuring success stories and premium member highlights.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This platform allows users to register and create biodata profiles categorized by gender and location. Users can filter, search, and sort biodatas, view detailed profiles, and explore success stories from couples who found partners via this platform.

The application also showcases premium members and provides statistics such as total biodatas, gender distribution, and number of married couples.

---

## Features

- User authentication (registration, login, social login)
- Create, update, and view biodata profiles
- Filtering by type (Male/Female), division, and age range
- Search and sorting capabilities with pagination
- Display success stories of married couples with reviews and images
- Premium members highlight section
- Real-time counters with animated statistics
- Secure API endpoints with token-based authorization
- Responsive UI with smooth animations

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Framer Motion, React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Authentication
- **Other:** Axios, React CountUp, React Icons

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
Install dependencies for frontend and backend:

bash
Copy
Edit
cd client
npm install
cd ../server
npm install
Setup environment variables for both client and server:

Firebase config

MongoDB URI

API keys (if any)

Run the backend server:

bash
Copy
Edit
cd server
npm run dev
Run the frontend client:

bash
Copy
Edit
cd client
npm start
Usage
Navigate to the homepage to browse biodata profiles.

Use filters and search bar to refine results.

View individual biodata profiles for detailed information.

Visit the Success Stories section to read about happy couples.

Explore Premium Members highlighted profiles.

Check real-time statistics on the dashboard.

API Endpoints (examples)
GET /biodatas - Fetch all biodata profiles

GET /biodata-stats - Get total biodata count, gender breakdown, married count

GET /success-stories - Fetch recent success stories

POST /auth/register - User registration

POST /auth/login - User login

Contributing
Contributions are welcome! Please open issues or submit pull requests for bug fixes and feature requests.

License
This project is licensed under the MIT License.

Made with ❤️ by Your Md Raihan Uddin

raihanuddin.cse8.bu@gmail.com

---

If you want, I can generate a README.md file for you and save it so you can download it — just let me kn