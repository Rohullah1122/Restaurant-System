# Team Tasks: Assignment 1 (React Frontend)

## Who does what
| Person | Parts | Share |
|---|---|---|
| **Rohullah Hussaini** | Project setup, routing, App state, Navbar, Footer, Home (intro + floating food), Menu (search + filters), MenuCard, Cart, My Orders, Reservations & events, main styles | ~70% |
| **[Teammate name]** | Admin Dashboard, AI ChatBot (+ dataset), Login / Register page | ~30% |

Each person owns **different files**, so we don't overwrite each other's work.

---

## 🚧 Teammate tasks

Files to work in (they already exist as placeholders, just replace them):
- `frontend/src/pages/Admin.jsx` + new `frontend/src/pages/Admin.css`
- `frontend/src/components/ChatBot.jsx` + new `frontend/src/components/ChatBot.css`
- `frontend/src/data/chatData.js`
- `frontend/src/pages/Login.jsx`

**Code style (same as the rest of the project):** simple code, a short comment on every line,
use the colors from `index.css` (`var(--red)`, `var(--yellow)`, `var(--dark-red)`, `var(--cream)`),
and the shared classes `.page`, `.page-title`, `.form`, `.btn`, `.btn-small`, `.order-box`, `.status`, `.error`, `.success`, `.note`.

### 1. Login / Register page (`Login.jsx`)
Props from App: `login(email, password)` and `register(name, email, password)`
- [ ] One page with two modes: Login and Create account (button to switch)
- [ ] Controlled inputs with `useState` (name only shows when registering → conditional rendering)
- [ ] Validation: all fields filled, password at least 6 characters, show errors in `.error`
- [ ] `login()` returns the user or `undefined` → show "Wrong email or password"
- [ ] `register()` returns `false` if the email is used → show a message
- [ ] After login: admins go to `/admin`, customers go to `/menu` (`useNavigate`)
- [ ] Show the demo accounts under the form (admin@hussainis.com / admin123, ali@gmail.com / ali123)

### 2. AI ChatBot (`ChatBot.jsx`, `chatData.js`, `ChatBot.css`)
Props from App: `orders`, `user`
- [ ] Put the 6 questions and answers from the assignment in `chatData.js` (with keywords)
- [ ] Round 💬 button fixed at the bottom right that opens / closes the chat
- [ ] Message list (`.map()`), bot messages on the left, user messages on the right
- [ ] Quick buttons for the 6 questions + an input box to type any question
- [ ] Find the answer by checking if the question contains a keyword
- [ ] "What did I order last time?" → use the user's real last order from `orders` if they have one
- [ ] Friendly default answer when nothing matches

### 3. Admin Dashboard (`Admin.jsx`, `Admin.css`)
Props from App: `user`, `menu`, `setMenu`, `orders`, `updateOrderStatus`, `reservations`, `updateReservation`
- [ ] Only admins can see it, everyone else gets "Admins only" + a login link (conditional rendering)
- [ ] Tabs: Menu · Orders · Reservations · Analytics
- [ ] **Menu tab:** form to add / edit items (name, emoji, category, price, description, ingredients, diet tags), validation (price > 0), table of all items with Edit, Delete and Available / Sold out buttons, all done by changing `menu` with `setMenu`
- [ ] **Orders tab:** list of orders with a dropdown to change status (Pending → Preparing → Ready → Delivered) using `updateOrderStatus`
- [ ] **Reservations tab:** list of bookings with Approve / Cancel buttons using `updateReservation`
- [ ] **Analytics tab (optional):** total orders, orders today, total sales, most popular items

---

## How we work on GitHub
1. Get the code (first time only):
   ```
   git clone https://github.com/Rohullah1122/Hussaini-s-resturant.git
   cd Hussaini-s-resturant/frontend
   npm install
   npm run dev
   ```
2. Make your own branch before coding:
   ```
   git checkout -b admin-chat-login
   ```
3. Save and upload often (small commits with clear messages):
   ```
   git add .
   git commit -m "Add admin menu tab"
   git push origin admin-chat-login
   ```
4. When a part is done: on GitHub click **Compare & pull request** → the other person checks it → **Merge**.
5. Before starting work each day: `git checkout main` → `git pull` → `git checkout admin-chat-login` → `git merge main`

