# 🟢 RegoloFactor

RegoloFactor is a **one‑page web application built with Next.js and React** that helps you automatically **refactor code** with different strategies:

- ✨ Readability  
- ⚡ Performance  
- 🎯 Idiomatic  
- 🧩 Modularization  

You paste code into an editor, pick the type of refactor, and the app uses an AI‑powered backend (`/api/refactor`) to generate a refactored version.  

The UI also provides tools to:
- View a **diff** between your original and refactored code (with color‑highlighted changes)
- Copy the refactored code to clipboard
- Download the diff as a `.diff` file

---

## 📸 Features

- **Code editor** for input and output (using a custom `CodeEditor` component)
- **Selectable refactor modes**
- **Streaming API response** (shows refactored code as it is being generated)
- **Diff viewer modal** (with green/red/gray highlighting)
- **Copy to clipboard** support
- **Download diff as file**

---

## 🏗️ Tech Stack

- [Next.js 13+](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [diff](https://www.npmjs.com/package/diff) (for generating diffs)

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/regolofactor.git
cd regolofactor
```

### 2. Install dependencies

```sh
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Regolo.ai API Key

To use REgoloFACTOR with the qwen3-coder-30B model, you need to configure your Regolo.ai API key:

Copy .env.example to .env.local in the project root.

```sh
cp .env.example .env.local
```

Open `.env.local` and insert your Regolo.ai API key.

Example:

```
REGOLO_API_KEY=your_api_key_here
```

👉 You can start creating an account and generating API keys at https://regolo.ai.

### 4. Run the development server

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at:

👉 http://localhost:3000

### 5. Build for production

```sh
npm run build
npm run start
```

---

## ⚙️ API Endpoint

The app expects an API endpoint at:

```
/api/refactor
```

It should accept a `POST` request with a JSON payload:

```json
{
  "code": "// your code here",
  "mode": "readability"
}
```

and return the refactored code as a **stream**.  
(Example implementation would depend on the AI service you are connecting to.)

---

## 📂 Project Structure

```
app/
  page.tsx        # Main page
  layout.tsx
  global.css
components/
  Header.tsx
  CodeSection.tsx
  ActionButtons.tsx
  DiffModal.tsx
  CodeEditor.tsx
lib/
  diffUtils.ts    # functions to generate diffs
  regolo.ts       # handles regolo API connection
api/
  refactor/
    route.ts      # endpoint for code refactoring
```

---

## ✅ Example Workflow

1. Paste your code into the *Original Code* editor.  
2. Choose a **refactor mode** from the dropdown.  
3. Click **🚀 Refactor Code**.  
4. See the refactored code appear in the *Refactored Code* editor.  
5. Use the buttons to:
   - **👁️ View Diff** → see diff into a modal  
   - **📄 Download Diff** → get a `.diff` file  
   - **📋 Copy** → copy refactored code to clipboard  

---

## 📝 License

MIT License. Free to use and modify.