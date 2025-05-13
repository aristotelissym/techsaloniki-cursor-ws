# 🧭 UX User Flow: Member Management CRUD App

This document outlines the main user flows for the Member Management CRUD application built with Next.js, TailwindCSS, NestJS, and MySQL.

---

## 👤 Primary User
An admin or team member who wants to manage (view, add, edit, delete) a list of members in the system. No authentication is required.

---

## 🏠 1. Landing Page (Home)

**URL:** `/`

**Purpose:** Welcome the user and guide them to the member management table.

**Elements:**
- Header with logo/title
- Navigation menu (`Home`, `About`)
- Call to action: "View Members"

**Primary Actions:**
- Click "View Members" → Navigate to `/members`

---

## 📋 2. View Members

**URL:** `/members`

**Purpose:** Display all members in a central table with filtering and action options.

**Elements:**
- Header (persistent across pages)
- Filters:
  - First Name (input)
  - Last Name (input)
  - Sex (dropdown)
  - Cat/Dog Lover (dropdown)
- Table with columns:
  - First Name, Last Name, Sex, Hometown, Job Title, Cat/Dog Lover
- Action buttons:
  - Edit (📝)
  - Delete (🗑️)
- “Add New Member” button

**Primary Actions:**
- Filter data by form inputs
- Click “Add New Member” → Open create form
- Click 📝 → Open edit form
- Click 🗑️ → Prompt confirmation modal, then delete

---

## ➕ 3. Add New Member

**URL:** `/members/new` or modal on `/members`

**Purpose:** Collect user input for creating a new member.

**Fields (all with validation):**
- First Name (required)
- Last Name (required)
- Sex (dropdown: Male, Female, Other)
- Hometown
- Job Title
- Cat/Dog Lover (dropdown: Cat, Dog, Both)

**Primary Actions:**
- Fill out form
- Click “Save”
- Show success or error toast
- Redirect to `/members` on success

---

## ✏️ 4. Edit Existing Member

**URL:** `/members/[id]/edit` or modal on `/members`

**Purpose:** Allow user to modify an existing member’s details.

**Fields:**
- Same as "Add" form, pre-filled with current values

**Primary Actions:**
- Update fields
- Click “Save”
- Show success or error toast
- Redirect to `/members` on success

---

## ❌ 5. Delete Member

**Initiated from:** `/members` table action

**Flow:**
- Click 🗑️ → Show confirmation modal
- Confirm deletion → Send DELETE request
- Show success/failure toast
- Refresh table

---

## 🔍 6. Filter/Search Members

**Initiated from:** `/members`

**Fields:**
- Text input for first/last name
- Dropdowns for sex and cat/dog lover

**Behavior:**
- On input/change, filter results in real-time (or debounce API call)
- Filtered members shown in table

---

## ✅ UX Best Practices
- Provide loading spinners or skeletons during data fetch
- Show clear validation errors below each field
- Display toast notifications for all actions (success/failure)
- Make all forms accessible with proper labels and keyboard navigation
- Ensure responsive layout (mobile, tablet, desktop)

---

## 🔁 Summary Flow

```
[Landing Page] → [Members Table] → [Add / Edit / Delete] → [Filtered View] → [Success Feedback]
```

---

## 📎 Notes
- No authentication flow
- No pagination (initial version)
- API errors should be mapped to user-friendly messages