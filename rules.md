# Lendsqr Frontend Assessment — Rules

## 1. Mandatory Stack

The project **must use**:

- React
- TypeScript
- SCSS

Recommended tooling:

- Vite
- React Router
- Axios
- TanStack Query (optional but good)
- Jest + React Testing Library
- ESLint + Prettier

---

# 2. Required Pages

Build **4 pages**:

1. **Login**
2. **Dashboard**
3. **Users**
4. **User Details**

Rules:

- Users page must fetch **500 records from a mock API**
- Clicking a user opens **User Details**
- Store selected user in **LocalStorage or IndexedDB**
- App must be **mobile responsive**

---

# 3. Suggested Folder Structure

```
src
 ├─ components
 │   ├─ UI
 │   └─ Layout
 ├─ pages
 │   ├─ Login
 │   ├─ Dashboard
 │   ├─ Users
 │   └─ UserDetails
 ├─ services
 ├─ hooks
 ├─ types
 ├─ utils
 ├─ router
 ├─ styles
 └─ App.tsx
```

---

# 4. Routing

```
/
/login
/dashboard
/users
/users/:id
```

Login → redirect to Dashboard.

---

# 5. Mock API

Generate **500 users**.

Each user should include fields like:

```
id
organization
username
email
phoneNumber
dateJoined
status
profile
education
socials
guarantor
```

---

# 6. Local Storage

Save selected user:

```ts
localStorage.setItem("selectedUser", JSON.stringify(user));
```

Retrieve in User Details page.

---

# 7. Styling Rules

Use **SCSS only**.

Recommended structure:

```
styles
 ├─ _variables.scss
 ├─ _mixins.scss
 ├─ layout
 └─ components
```

Use **Flexbox or Grid** for layout.

---

# 8. Code Quality

Follow best practices:

- Strong TypeScript typing
- Clean component structure
- Reusable UI components
- Clear naming conventions
- Small focused functions

Example commits:

```
feat: implement login page
feat: add users table
feat: implement user details
test: add unit tests
style: responsive layout
```

---

# 9. Testing

Include **positive and negative tests**.

Example:

Positive

```
renders users table
fetches users successfully
```

Negative

```
handles API error
shows empty state
```

---

# 10. Deployment

Deploy on a free host.

Examples:

```
Vercel
Netlify
```

URL format:

```
https://<name>-lendsqr-fe-test.<platform>
```

---

# 11. Repo Requirements

Repository name:

```
lendsqr-fe-test
```

Must include:

- clean commit history
- README
- setup instructions
- deployment link

---

# 12. README Must Include

- Project overview
- Tech stack
- Setup instructions

```
npm install
npm run dev
```

- Architecture decisions
- Deployment link

---

# 13. What matters Most

1. Pixel-perfect design
2. Clean architecture
3. TypeScript usage
4. Responsive layout
5. Testing
6. Clear GitHub history
