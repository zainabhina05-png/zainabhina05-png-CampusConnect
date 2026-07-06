# Issues to Create

*Since the `gh` CLI was not available on your machine, here is the list of 20 `good-first-issue` tickets. You can manually create these in your GitHub repository, or write a quick Node script to use the GitHub API to create them.*

---

## 1. Add Loading Skeleton for Event Cards
**Title:** Add loading skeletons for event cards on the feed page
**Description:** When the events feed is fetching data from Supabase, the screen just shows a blank space or basic text. We need a nice loading skeleton (using Tailwind's `animate-pulse`) to show placeholder cards so users know content is loading.
**Acceptance Criteria:** 
- Create a `<EventCardSkeleton />` component
- Render 3-4 skeletons on `events.tsx` while `isLoading` is true
**Suggested Files:** `src/routes/events.tsx`, `src/components/`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 2. Empty State for Club Directory
**Title:** Create a beautiful empty state for the Club Directory
**Description:** If there are no clubs in the database yet, the Club Directory page looks broken. We need an "Empty State" component with an illustration (e.g. from Lucide React), a message saying "No clubs found", and a button to "Create a Club" (which can just alert for now if the feature isn't ready).
**Acceptance Criteria:**
- Display empty state if `clubs.length === 0`
- Use Lucide icons and match the app's Tailwind aesthetic
**Suggested Files:** `src/routes/clubs.index.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `design`, `good-first-issue`

## 3. Toast Notifications for Auth Errors
**Title:** Add toast notifications for Login/Signup errors
**Description:** Right now, if a user enters the wrong password, they might just get a generic red text or nothing at all. We should use a toast library (like `sonner` or `react-hot-toast` if installed, or build a simple one) to show a popup in the bottom right corner when auth fails.
**Acceptance Criteria:**
- Show a red error toast when Supabase login returns an error
**Suggested Files:** `src/routes/auth.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `bug`, `good-first-issue`

## 4. Fix Responsive Design on Dashboard Navigation
**Title:** Make the dashboard sidebar responsive (mobile-friendly)
**Description:** On mobile devices (width < 768px), the dashboard sidebar takes up the whole screen or overlaps content. We need to hide it behind a hamburger menu on small screens.
**Acceptance Criteria:**
- Sidebar is hidden by default on mobile
- A hamburger menu icon appears on mobile to toggle the sidebar
**Suggested Files:** `src/routes/dashboard.tsx`
**Difficulty:** intermediate
**Labels:** `frontend`, `design`, `good-first-issue`

## 5. Add "Copy Link" Button to Events
**Title:** Add a "Copy Link" share button to individual event pages
**Description:** Users should be able to easily share an event. Add a small share icon button that copies the current page URL to their clipboard using the `navigator.clipboard` API and shows a success toast.
**Acceptance Criteria:**
- Button exists with a Lucide `Share` or `Copy` icon
- Clicking it copies `window.location.href` to clipboard
- Visual feedback is given to the user (e.g., text changes to "Copied!" temporarily)
**Suggested Files:** `src/routes/events.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 6. JSDoc Comments for Supabase Hooks
**Title:** Add JSDoc comments to Supabase data fetching hooks
**Description:** To help other contributors understand our data layer, we need clear JSDoc comments on the custom hooks used to fetch data from Supabase. Explain what arguments the hook takes and what it returns.
**Acceptance Criteria:**
- Add `/** ... */` JSDoc comments to at least 3 custom hooks (if they exist, otherwise document the main data fetching functions).
**Suggested Files:** `src/lib/supabase/` or `src/hooks/` (if any exist)
**Difficulty:** good-first-issue
**Labels:** `docs`, `good-first-issue`

## 7. Accessibility: Add missing `aria-labels` to Icon Buttons
**Title:** Improve accessibility by adding aria-labels to all icon-only buttons
**Description:** Screen readers can't understand buttons that only contain an icon (like a trash can or edit pencil). We need to go through the app and ensure all icon-only `<button>` tags have a descriptive `aria-label`.
**Acceptance Criteria:**
- All icon buttons in the main navigation and event cards have `aria-label` attributes.
**Suggested Files:** `src/routes/__root.tsx`, `src/routes/events.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `bug`, `good-first-issue`

## 8. 404 Not Found Page Polish
**Title:** Design a better 404 Not Found page
**Description:** Our current fallback/404 page is probably just blank or very basic. Let's make a fun, branded 404 page with a "Go back home" button.
**Acceptance Criteria:**
- The 404 route displays a friendly message and an illustration/icon.
- Includes a functional link back to the home/feed page.
**Suggested Files:** Route configuration (likely `src/routes/__root.tsx` or similar)
**Difficulty:** good-first-issue
**Labels:** `frontend`, `design`, `good-first-issue`

## 9. Form Input Validation for RSVP
**Title:** Add basic frontend validation for the RSVP form
**Description:** When a user RSVPs for an event, we need to ensure they don't submit an empty form if we require extra fields (like diet preferences or student ID).
**Acceptance Criteria:**
- Add HTML5 `required` attributes or use React Hook Form / Zod (if already in the project) to prevent empty submissions.
**Suggested Files:** `src/routes/events.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 10. Date Formatting Utility
**Title:** Create a reusable date formatting utility
**Description:** We are displaying raw timestamp strings from Postgres (e.g., `2026-07-06T12:00:00Z`). We need a small utility function using `Intl.DateTimeFormat` (or `date-fns`/`dayjs` if installed) to format these into "July 6, 2026 at 12:00 PM".
**Acceptance Criteria:**
- Create a `formatDate.ts` utility.
- Implement it in the event cards to replace raw dates.
**Suggested Files:** `src/lib/utils.ts` (create if needed), `src/routes/events.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 11. Add "Scroll to Top" Button
**Title:** Implement a Scroll-to-Top button on long feeds
**Description:** The discussion feed and event lists can get very long. It would be helpful to have a floating button in the bottom right corner that appears after scrolling down, which smoothly scrolls the user back to the top.
**Acceptance Criteria:**
- Button appears only when `window.scrollY > 300`
- Clicking it triggers `window.scrollTo({ top: 0, behavior: 'smooth' })`
**Suggested Files:** `src/routes/feed.tsx`, `src/routes/__root.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 12. Password Visibility Toggle
**Title:** Add show/hide password toggle on login screen
**Description:** Standard UX practice is to allow users to click an eye icon to see the password they are typing.
**Acceptance Criteria:**
- Add an eye/eye-off icon inside the password input field.
- Toggle input `type` between `"password"` and `"text"`.
**Suggested Files:** `src/routes/auth.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 13. Certificate Download Loading State
**Title:** Show loading spinner while certificate is generating
**Description:** Generating a certificate might take a second. We should disable the download button and show a spinner inside it while the action is processing to prevent double-clicks.
**Acceptance Criteria:**
- Download button is disabled when generating.
- Button text changes to "Generating..." or shows a spinner.
**Suggested Files:** `src/routes/certificates.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 14. Standardize Button Styles
**Title:** Refactor hardcoded button styles to use a unified Component
**Description:** There might be several standard `<button>` tags with long Tailwind classes sprinkled around. We should ensure they all use a unified `<Button />` component (like shadcn/ui if used, or a custom one) for consistency.
**Acceptance Criteria:**
- Replace at least 5 raw `<button className="...">` instances with the unified component.
**Suggested Files:** Throughout `src/routes/`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `refactor`, `good-first-issue`

## 15. Setup Pre-commit Hook (Husky)
**Title:** Add Husky pre-commit hook to run linter
**Description:** To ensure no bad code is committed, let's set up a pre-commit hook that automatically runs `bun run lint` before allowing a git commit.
**Acceptance Criteria:**
- Install `husky` and `lint-staged`.
- Configure it to run ESLint/Prettier on staged files.
**Suggested Files:** `package.json`
**Difficulty:** intermediate
**Labels:** `backend`, `enhancement`, `good-first-issue`

## 16. Dark Mode Support: Colors Polish
**Title:** Ensure contrast is accessible in Dark Mode
**Description:** Some of our text colors might be too dark against the dark mode background. Run an accessibility contrast checker and tweak the Tailwind classes (e.g. `dark:text-gray-300` instead of `dark:text-gray-500`).
**Acceptance Criteria:**
- Ensure all main text has a contrast ratio of at least 4.5:1 against the background in dark mode.
**Suggested Files:** Throughout `src/routes/`
**Difficulty:** intermediate
**Labels:** `frontend`, `design`, `good-first-issue`

## 17. Avatar Component Fallback
**Title:** Add Initials Fallback to User Avatars
**Description:** If a user hasn't uploaded a profile picture, their avatar should display their initials (e.g. John Doe -> JD) with a colored background, instead of a broken image link.
**Acceptance Criteria:**
- `<Avatar>` component displays initials if `imageUrl` is null or fails to load.
**Suggested Files:** `src/components/` (or wherever Avatar is defined)
**Difficulty:** good-first-issue
**Labels:** `frontend`, `enhancement`, `good-first-issue`

## 18. Fix Typos in Documentation
**Title:** Proofread and fix typos in README and Contribution docs
**Description:** An easy win for a first-time contributor. Read through the newly added `README.md` and `CONTRIBUTING.md` and fix any grammatical errors, missing links, or formatting issues.
**Acceptance Criteria:**
- Submit a PR fixing at least 1-2 typos or formatting improvements.
**Suggested Files:** `README.md`, `CONTRIBUTING.md`
**Difficulty:** good-first-issue
**Labels:** `docs`, `good-first-issue`

## 19. Environment Variable Validation
**Title:** Validate environment variables on app startup
**Description:** If `VITE_SUPABASE_URL` is missing, the app crashes obscurely. Let's add a small check in a central config file that throws a clear, helpful error in the console if environment variables are missing.
**Acceptance Criteria:**
- Throw a clear error during development if required `import.meta.env` variables are missing.
**Suggested Files:** `src/lib/supabase/client.ts` or `src/main.tsx`
**Difficulty:** good-first-issue
**Labels:** `frontend`, `bug`, `good-first-issue`

## 20. Add Pagination to Events Feed
**Title:** Implement infinite scroll or pagination for events
**Description:** If there are 1000 events, fetching them all at once will slow down the app. We should fetch them in chunks of 20.
**Acceptance Criteria:**
- Update the Supabase query to use `.range(0, 19)`.
- Add a "Load More" button at the bottom of the feed that fetches the next 20.
**Suggested Files:** `src/routes/events.tsx`
**Difficulty:** advanced
**Labels:** `frontend`, `backend`, `good-first-issue`
