# Hussaini's – Smart Restaurant (Assignment 1: React Frontend)

> 🚧 Admin Dashboard, AI ChatBot and Login are being built by my teammate (see ../TEAM_TASKS.md).

## How to run
1. Open this folder in VS Code
2. In the terminal run: `npm install` (only the first time)
3. Then run: `npm run dev`
4. Open the link it shows (usually http://localhost:5173)

## Demo accounts
- Admin: `admin@hussainis.com` / `admin123`
- Customer: `ali@gmail.com` / `ali123` (or register a new one)

## Folder structure
```
src/
  main.jsx            starts the app (BrowserRouter)
  App.jsx             keeps all the state + the routes
  index.css           all styles (red & yellow theme, animations, phone layout)
  data/
    menuData.js       starting menu items
    chatData.js       simulated AI questions & answers
    users.js          demo accounts
  components/
    Navbar.jsx        top menu (with phone ☰ menu)
    Footer.jsx        bottom info
    Intro.jsx         full-screen welcome animation + Skip button
    FloatingFood.jsx  floating food animation
    MenuCard.jsx      one food card
    ChatBot.jsx       AI assistant chat
  pages/
    Home.jsx          hero, story, popular dishes, events
    Menu.jsx          search + filters + items by category
    Cart.jsx          quantities, delivery/pickup, place order
    Orders.jsx        order history + status steps
    Reservation.jsx   book a table or event + my reservations
    Login.jsx         login / register
    Admin.jsx         admin dashboard (menu CRUD, orders, reservations, analytics)
    NotFound.jsx      404 page
```

## Where each grading point is (for the demo video)
| Rubric point | Where to show it |
|---|---|
| Components | `components/` and `pages/` folders |
| Props | `App.jsx` sends `menu`, `addToCart`, `cart`... to pages; `MenuCard` gets `item` |
| State (useState) | `App.jsx` (menu, cart, orders, reservations, user), forms in every page |
| Hooks (useEffect) | `App.jsx` saves data to localStorage; `Intro.jsx` timer |
| Forms | `Reservation.jsx`, `Cart.jsx`, `Login.jsx`, `Admin.jsx` (with validation) |
| Conditional rendering | `Intro` only first time, Admin-only page, address box only for Delivery, event notes only for events |
| List rendering (map) | Menu cards, cart items, orders, chat messages, admin table |
| Routing | `main.jsx` (BrowserRouter) + `App.jsx` (Routes) + `Navbar.jsx` (NavLink) |
| AI feature | `ChatBot.jsx` + `data/chatData.js` (option 2: simulated AI) |
| Bonus: mobile responsive | `@media` at the bottom of `index.css` |

## Notes
- Data is saved in the browser (localStorage). To reset everything, open DevTools → Application → Local Storage → Clear.
- Payment and delivery are simulated (allowed by the assignment).
