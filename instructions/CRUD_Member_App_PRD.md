
# Product Requirements Document (PRD)  
## 📌 Title: Member Management CRUD App

---

### 1. Document Control
- **Author:** Aristotelis Symeonidis, Christos Katsiagonis
- **Date:** 2025-05-13  
- **Version:** 1.0  
- **Status:** Final  

---

### 2. Overview / Purpose
A fullstack web app that provides Create, Read, Update, and Delete (CRUD) functionality for managing a list of members. Users will be able to:
- View a list of members
- Filter/search through members
- Add new members
- Edit existing members
- Delete members

The app will be built to demonstrate clean architecture, user-friendly design, and best practices in modern web development using:
- **Frontend:** Next.js + TailwindCSS
- **Backend:** NestJS
- **Database:** MySQL

---

### 3. Goals & Objectives
- Build a clean and responsive fullstack CRUD application
- Implement filtering on key columns
- Ensure smooth user experience with error handling and form validation
- Serve as a starter template or educational app for fullstack development

---

### 4. Scope
#### ✅ In Scope
- CRUD operations on a single `members` table
- Filters on table columns
- Responsive design using TailwindCSS
- Basic form validation and error messages
- Fullstack implementation with REST API

#### ❌ Out of Scope
- Authentication / Authorization
- Role-based access
- Deployment configuration

---

### 5. User Stories / Use Cases
- *As a user, I want to see a table of all members so that I can view their information.*
- *As a user, I want to add a new member using a form so that the list is always up to date.*
- *As a user, I want to update member information using a form.*
- *As a user, I want to delete a member if the record is no longer relevant.*
- *As a user, I want to filter members by first name, last name, sex, hometown, or cat/dog lover preference.*

---

### 6. Functional Requirements
#### 🗂️ Data Model - `members`
| Field           | Type     | Notes                      |
|----------------|----------|----------------------------|
| `id`            | UUID     | Primary key, auto-gen      |
| `first_name`    | String   | Required                   |
| `last_name`     | String   | Required                   |
| `sex`           | Enum     | 'Male' / 'Female' / 'Other'|
| `hometown`      | String   |                            |
| `job_title`     | String   |                            |
| `cat_dog_lover` | Enum     | 'Cat' / 'Dog' / 'Both'     |

#### 🔧 Backend (NestJS)
- RESTful API endpoints:
  - `GET /members`
  - `POST /members`
  - `PUT /members/:id`
  - `DELETE /members/:id`
- Input validation using `class-validator`
- Error handling for:
  - Missing fields
  - Invalid enum values
  - Not found (404)
  - Server errors (500)

#### 🎨 Frontend (Next.js + TailwindCSS)
- Landing page with header and menu
- Central table view with:
  - Sortable columns
  - Filter/search inputs
- Modal or inline form for:
  - Creating new member
  - Editing member
- Delete with confirmation prompt
- Form validation (e.g., required fields, enum select dropdowns)
- Toast notifications or alerts for success/failure states

---

### 7. Non-Functional Requirements
- Responsive design (mobile/tablet/desktop)
- Clean and consistent UI with TailwindCSS
- Fast initial load and minimal re-rendering
- Code should follow clean architecture practices
- Generic error messages for users; detailed logs for devs.
- Always validate & sanitize on server; escape output.

---

### 8. User Interface / UX Requirements
- Header with logo or title and basic menu (`Home`, `About`)
- Central card or container with members table
- Forms should be accessible and use native HTML5 validation
- Use Tailwind utilities to ensure a clean layout
- Filters should be simple text inputs or dropdowns above the table

---

### 9. Assumptions
- Only admin-level users will access this tool (no login required)
- Backend and frontend will run on local dev servers (`localhost:3000` for Next.js, `localhost:4000` for NestJS)
- No pagination required for now

---

### 10. Acceptance Criteria
- [ ] Users can successfully perform all CRUD operations
- [ ] Filters return correct subset of members
- [ ] All form fields have validation and show proper error messages
- [ ] App is responsive and visually clean
- [ ] Backend handles errors gracefully and returns proper HTTP status codes

---

### 11. Timeline / Milestones
| Phase               | Est. Time |
|---------------------|-----------|
| Requirements & Design | 1 day     |
| Backend API (NestJS)  | 2 days    |
| Frontend UI (Next.js) | 3 days    |
| Integration & Testing | 1–2 days  |

---

### 12. Stakeholders
- **Product Owner:** [You]
- **Developer:** Cursor + Vibe
- **Designer:** N/A (Tailwind default)

---

### 13. Appendices / References
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [MySQL Schema Reference](https://dev.mysql.com/doc/)
