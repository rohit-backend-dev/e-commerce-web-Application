````markdown
# E-Commerce Web Application

![E-Commerce Banner](https://drive.google.com/uc?export=view&id=1qKAjD0re9KcnLjOUucFTTYXYCRY1Rkrn)

## Project Overview

This is a **full-stack E-Commerce Web Application** built using **React.js** for the frontend and **Spring Boot** for the backend. The platform supports:

- Product listing, search, and filtering
- Shopping cart and checkout flow
- Stripe payment integration
- User authentication with JWT
- AI-generated content (Gemini API) and dynamic image fetching (Unsplash API)
- Email notifications for orders using Gmail SMTP
- Responsive and modern UI
- Secured Login/Signup using Google SMTP OTP secured by Spring Security

This project is **production-ready** and hosted at: [Frontend Live Site](https://e-c0mmerceapp.netlify.app/)

---

## Tech Stack

### Frontend
- **React.js** with React Router for SPA routing
- **Axios** for API requests
- **Tailwind CSS / Material UI** (optional for styling)
- **Netlify** for deployment

### Backend
- **Spring Boot** (or Node.js + Express)
- **H2 / MongoDB / MySQL** for database
- **JWT** for authentication
- **Stripe API** for payments
- **Gemini AI & Unsplash APIs** for dynamic content
- **SMTP (Gmail)** for email notifications

---

## Features

### User Features
- Browse products by category
- Add products to cart and checkout
- Secure payments via Stripe
- Receive order confirmation emails
- Search and filter products

### Advanced Features
- AI-powered product descriptions using Gemini API
- Dynamic image fetching for products via Unsplash API
- Responsive design for mobile and desktop
- JWT-based authentication for secure API access
- File upload support for product images

### Product Images Preview

![Product 1](https://drive.google.com/uc?export=view&id=1qKAjD0re9KcnLjOUucFTTYXYCRY1Rkrn)  
![Product 2](https://drive.google.com/uc?export=view&id=13L6NZdlN_njFbw9Vfvtx-uOmVFy2r85T)  
![Product 3](https://drive.google.com/uc?export=view&id=10seY5Tfjy0ew9uTW47TtEp3qVtTbOP9U)  
![Product 4](https://drive.google.com/uc?export=view&id=10s_hFuykXdzrzs5mP2wPAOm7KxmjJaPX)

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Java (for Spring Boot backend)
- MongoDB / MySQL / H2 database

---

### Frontend Setup
```bash
git clone https://github.com/rohit-backend-dev/e-commerce-web-Application.git
cd e-commerce-web-Application/frontend
npm install
npm start
````

* Frontend will run on: `http://localhost:5173`
* Hosted live at: [https://e-c0mmerceapp.netlify.app/](https://e-c0mmerceapp.netlify.app/)

---

### Backend Setup

```bash
cd ../backend
# For Spring Boot
./mvnw spring-boot:run
```

* Backend will run on: `http://localhost:8080`
* Can be deployed on Heroku, Railway, AWS, or DigitalOcean
* Ensure environment variables are configured

---

### Environment Variables

Create a `.env` file in the backend root folder:

```env
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_email_app_password
```

> **Note:** Do not commit `.env` to GitHub to keep credentials secure.

---

## License

MIT License © Rohit Mishra

---

## Contributing
```
1. Fork the repository
2. Create a branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Description"`
4. Push to your branch: `git push origin feature-name`
5. Create a Pull Request

```

