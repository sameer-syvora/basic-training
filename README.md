# 📺 OTT Streaming Platform (Backend)

This project is a backend service for an OTT (Over-The-Top) streaming platform that supports user authentication, content listing, admin uploads, subscription management, watchlist features, and genre-based filtering. Built using **Node.js**, **Express**, **Sequelize (PostgreSQL)**, and **Passport.js** (Google OAuth), the platform supports role-based access for admins and users.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Signup/Login with JWT tokens.
  - Google OAuth support.

- 👤 **User Features**
  - Watchlist: Add or retrieve watchlisted content.
  - Subscription handling: Manage premium access.

- 🎬 **Content Management**
  - Users can browse all content or filter by genre.
  - Admins can upload new content (movies, series, etc.).

- 🛡️ **Role-Based Access Control**
  - Admin routes protected by middleware.
  - Content access limited for non-premium users.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL via Sequelize ORM
- **Authentication:** JWT & Google OAuth (via Passport.js)
- **ORM Models:** Users, Content, Watchlist (Many-to-Many)

---

## 📁 API Structure

### 👥 `/auth`
| Route         | Method | Description           |
|---------------|--------|-----------------------|
| `/signup`     | POST   | User signup           |
| `/login`      | POST   | User login            |
| `/google`     | GET    | Initiate Google OAuth |
| `/google/callback` | GET | OAuth callback       |

### 👤 `/users`
| Route               | Method | Description                      |
|--------------------|--------|----------------------------------|
| `/watchlist`       | GET    | Get user's watchlist (token req.) |
| `/watchlist`       | POST   | Add content to watchlist (token req.) |
| `/subscribe`       | POST   | Start/renew subscription (token req.) |

### 🎬 `/content`
| Route         | Method | Description           |
|---------------|--------|-----------------------|
| `/`           | GET    | List all content       |
| `/:genre`     | GET    | List content by genre  |

### 🛠️ `/admin`
| Route         | Method | Description           |
|---------------|--------|-----------------------|
| `/content`    | POST   | Add new content (admin only) |

---

## 🗂️ Database Models

### User
- `id`, `username`, `email`, `password`
- `role`: `"user"` or `"admin"`
- `subscriptionStart`, `subscriptionEnd`

### Content
- `title`, `genre[]`, `description`, `thumbnailURL`, `contentURL`
- `contentType`: `"movie"`, `"series"`, `"short"`, `"live"`
- `isPremium`, `releaseDate`, `duration`, `language`, `rating`

### Watchlist
- Many-to-many relation between `User` and `Content`

---

## 🔐 Middleware

- `checkToken`: Validates JWT
- `isAdmin`: Checks if user has admin role

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sameer-syvora/basic-training.git
cd basic-training
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file with the following:

```env
JWTSECRETCODE=your_jwt_secret
GOOGLECLIENTID=your_google_client_id
GOOGLECLIENTSECRET=your_google_client_secret
DBHOST=localhost
DBNAME=ottdb
DBUSER=postgres
DBPASS=your_db_password
```

> Adjust DB settings as per your PostgreSQL configuration.

### 4. Start the server

```bash
npm start
```

---

## 🧪 Example Request

```http
POST /auth/signup
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "secure123"
}
```

---

## ✅ Future Improvements

- Add dynamic video streaming support
- Add pagination and search features
- Enhance Google OAuth to auto-fill user data
- Add email verification and password reset

---

## 📄 License

This project is licensed under the ISC License.
