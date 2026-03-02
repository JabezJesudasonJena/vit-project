# Project Documentation

## Architecture Overview

```mermaid
flowchart TB
  subgraph Backend
    DS[dataStore.js]
    S[server.js]
    subgraph Routes
      R1[/api/apply]
      R2[/api/sign]
      R3[/api/login]
      R4[/api/doctors]
      R5[/api/query]
      R6[/api/ratings]
      R7[/api/emergency]
      R8[/api/health-tips]
      R9[/api/symptom]
    end
    DS --> Routes
    S --> Routes
  end

  subgraph Frontend
    subgraph Pages
      P1[home/page.tsx]
      P2[login/page.tsx]
      P3[signup/page.tsx]
      P4[apply/page.tsx]
      P5[book/page.tsx]
      P6[doctor/page.tsx]
      P7[patient/page.tsx]
      P8[medicine-reminder/page.tsx]
      P9[emergency/page.tsx]
      P10[symptom-checker/page.tsx]
      P11[patient-queries/page.tsx]
      P12[doctor-queries/page.tsx]
      P13[prescriptions/page.tsx]
      P14[ratings/page.tsx]
      P15[query/page.tsx]
      P16[video-consultation/page.tsx]
      P17[analytics/page.tsx]
    end
    C1[Chatbot.tsx]
    L[lib/api.ts]
    Layout[layout.tsx]
    P1 --> C1
    Layout --> Pages
    Pages --> L
    C1 --> L
  end

  Backend -->|HTTP| Frontend
```

The backend uses Express with an in-memory `dataStore` and modular route handlers. The frontend is a Next.js App Router project, with pages under `app/` calling backend endpoints via a centralized `lib/api.ts`.  

---

## Backend Layer

### dataStore.js  
An in-memory store simulating persistent data.  
- Collections:
  - `users`: registered user objects  
  - `applications`: application submissions  
  - `doctors`: doctor profiles  
  - `queries`: patient/doctor queries  
  - `ratings`: ratings records  
  - `emergencies`: emergency reports  
  - `healthTips`: static health tips  
  - `symptoms`: symptom-checker rules  

### server.js  
Bootstraps the Express server.  
- Middleware:
  - CORS  
  - JSON body parsing  
- Route mounting:
  - `/api/apply` → `routes/apply.js`  
  - `/api/sign` → `routes/sign.js`  
  - `/api/login` → `routes/login.js`  
  - `/api/doctors` → `routes/doctors.js`  
  - `/api/query` → `routes/query.js`  
  - `/api/ratings` → `routes/ratings.js`  
  - `/api/emergency` → `routes/emergency.js`  
  - `/api/health-tips` → `routes/healthTips.js`  
  - `/api/symptom` → `routes/symptomChecker.js`  

### Routes

#### routes/apply.js  
Handles user applications.  
- POST `/api/apply`  
  - Accepts application data  
  - Stores into `dataStore.applications`  
  - Responds with success status  

#### routes/sign.js  
Manages user signup.  
- POST `/api/sign`  
  - Validates uniqueness  
  - Adds new user to `dataStore.users`  
  - Returns created user ID  

#### routes/login.js  
Authenticates users.  
- POST `/api/login`  
  - Checks credentials against `dataStore.users`  
  - Returns auth token or error  

#### routes/doctors.js  
Exposes doctor profiles and availability.  
- GET `/api/doctors`  
  - Returns list of `dataStore.doctors`  

#### routes/query.js  
Handles patient/doctor queries.  
- POST `/api/query`  
  - Stores query in `dataStore.queries`  
  - Returns confirmation  
- GET `/api/query`  
  - Returns all queries  

#### routes/ratings.js  
Manages ratings for consultations.  
- POST `/api/ratings`  
  - Records a rating in `dataStore.ratings`  
  - Returns updated average rating  

#### routes/emergency.js  
Logs emergencies.  
- POST `/api/emergency`  
  - Saves details in `dataStore.emergencies`  
  - Returns acknowledgment  

#### routes/healthTips.js  
Serves static health tips.  
- GET `/api/health-tips`  
  - Returns `dataStore.healthTips` array  

#### routes/symptomChecker.js  
Simple rule-based symptom checker.  
- POST `/api/symptom`  
  - Receives symptoms list  
  - Matches against `dataStore.symptoms`  
  - Returns advice  

### package.json  
Defines backend dependencies:  
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.x",
    "cors": "^2.x"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## Frontend Layer

### lib/api.ts  
Centralized API client using `fetch`.  
- Methods:
  - `signUp(data): Promise<User>`  
  - `login(credentials): Promise<Token>`  
  - `applyForm(data): Promise<Application>`  
  - `getDoctors(): Promise<Doctor[]>`  
  - `submitQuery(data): Promise<Query>`  
  - `getQueries(): Promise<Query[]>`  
  - `submitRating(data): Promise<Rating>`  
  - `reportEmergency(data): Promise<Emergency>`  
  - `getHealthTips(): Promise<Tip[]>`  
  - `checkSymptoms(data): Promise<Advice>`  

### app/layout.tsx  
Root layout for all pages.  
- Wraps content in header/navigation  
- Includes global styles and fonts  

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### app/page.tsx  
Home page.  
- Welcomes users  
- Links to login/signup  

---

## Key Pages & Components

### Chatbot Component (`app/components/Chatbot.tsx`) 🤖  
An on-screen assistant.  
- Props: none  
- State: user input, message history  
- Uses `lib/api.checkSymptoms`  
- Renders chat bubbles and input form  

### Signup Page (`app/signup/page.tsx`)  
- Uses `lib/api.signUp`  
- Form fields: name, email, password  
- On success → redirects to login  

### Login Page (`app/login/page.tsx`)  
- Uses `lib/api.login`  
- Stores token in context or localStorage  
- On success → redirects to home  

### Apply Page (`app/apply/page.tsx`)  
- Form to submit applications  
- Calls `lib/api.applyForm`  

### Book Page (`app/book/page.tsx`)  
- Lists `lib.api.getDoctors()`  
- Allows appointment booking (not implemented backend)  

### Doctor & Patient Dashboards  
- `app/doctor/page.tsx` & `app/patient/page.tsx`  
- Show user-specific data (queries, ratings, prescriptions)  
- Fetch via `lib/api`  

### Emergency & Health Tips  
- `app/emergency/page.tsx`: Emergency report form  
- `app/health-tips/page.tsx`: Displays tips from `lib.api.getHealthTips()`  

### Symptom Checker (`app/symptom-checker/page.tsx`)  
- Collects symptoms  
- Shows advice from `lib.api.checkSymptoms`  

### Analytics Page (`app/analytics/page.tsx`)  
- Placeholder for usage analytics  

Other pages (`medicine-reminder`, `query`, `ratings`, `prescriptions`, `doctor-queries`, `patient-queries`, `video-consultation`) follow similar patterns: fetch or submit data via `lib/api` and display lists or forms.  

---

## Relationships & Data Flow

1. **User Action** (e.g. submit form)  
2. → **Page Component** calls  
3. → **lib/api.ts** which issues  
4. → **HTTP request** to  
5. → **Backend Route**  
6. → **dataStore.js**  
7. ← Response returns up the chain to update UI  

This layered separation keeps UI, API calls, and data logic modular and maintainable.
