# Stackly — IT Solutions & Services (React Training Final Project, Task 15)

“Innovating today, securing tomorrow — your trusted partner in IT solutions.”

Complete React + Vite + TypeScript frontend app: marketing site + case studies + validated
contact + full CRUD dashboard. Built with pnpm, React Router, Redux Toolkit, Tailwind CSS v4,
Lucide icons and Oxlint.

## Run

```sh
pnpm install
pnpm run dev      # dev server
pnpm run build    # tsc + production build (dist/)
pnpm run preview  # preview dist/
pnpm run lint     # oxlint
```

## Routes (6 pages, React Router)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | hero, services preview, featured work, testimonials |
| `/about` | About | values, timeline, **live API team** via `useFetch` |
| `/services` | Services (parent) | **nested routing** layout + side nav |
| `/services/:slug` | Service detail | `useParams`, scope/deliverables/pricing |
| `/work` | Case studies | `useSearchParams` filter + debounced search, Redux saves |
| `/work/:id` | Case study detail | `useParams`, related work |
| `/contact` | Contact | **form validation**, `?service=` prefill, localStorage inbox |
| `/dashboard` | Dashboard | full **CRUD** on service requests |
| `*` | 404 | NotFound |

## Session-topics map

- Components / Props — `Button`, `Badge`, `TextInput`, cards, layout
- `useState` — forms, dialogs, menus, filters
- `useEffect` — API fetch, localStorage sync, scroll lock, seeding
- `useRef` — About scroll-to-team + focus, Contact first-error focus
- `useContext` — `AppProvider` (theme + display name)
- `useReducer` — dashboard view state (status / sort / query)
- Conditional rendering — loading / empty / error / success states everywhere
- List rendering — services, projects, team, testimonials, requests
- API integration — `useFetch` → `jsonplaceholder.typicode.com/users` with local fallback
- Custom hooks — `useFetch`, `useLocalStorage`, `useDebounce`, `useDocumentTitle`
- Routing / Nested routing / `useParams` / `useSearchParams` — see table
- Redux — `requests` slice (CRUD + persist) and `saved` slice (bookmarks)
- CRUD — dashboard dialog (create/update), status triage, delete confirm
- Form validation — shared validators for contact + request forms
- Responsive UI — Tailwind, mobile nav, grid → stack layouts

## Deploy (Netlify)

`netlify.toml` builds with `pnpm run build`, publishes `dist/`, and redirects all
routes to `/index.html` for the SPA router. `public/_redirects` is the backup for the
same rule. Deploy by connecting the repo (or `dist/`) on Netlify — no screenshots,
just the domain link per the task brief.
