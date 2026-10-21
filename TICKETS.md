# Tickets

Every ticket needs three things: a **migration**, a **new endpoint** and **changes in the frontend**. They are ordered from easiest to hardest.

Remember: never change a migration that already ran, always make a new one (`npm run migrate:make name_of_the_migration`), and write a working `down` function.

---

## SO-1 · Upvote footage

**Story:** As a visitor, I want to upvote useful footage so the best material rises to the top.

**Migration**
- Add an `upvotes` integer column to `footage`, not nullable, default `0`.

**Endpoint**
- `POST /api/footage/:id/upvote`: adds 1 to the item's `upvotes` and returns the updated item.
- Tip: look up `increment` in the Knex documentation.
- Return `404` when no item with that id exists.

**Frontend**
- Add `upvotes` to the `Footage` class and show the count with an upvote button in `renderHtmlString()`, e.g. `▲ 12`.
- Clicking the button calls the endpoint and updates the count without reloading the whole list.
- Sort the list by upvotes, highest first.

**Acceptance criteria**
- [ ] Upvotes are still there after refreshing the page.
- [ ] Existing footage starts at 0 upvotes.

---

## SO-2 · Archive view & restore

**Story:** As a moderator, I want to see archived footage and restore something I archived by mistake.

**Migration**
- Add a nullable `archivedAt` column to `footage`.

**Endpoints**
- New: `GET /api/footage/archived`: returns all archived footage, most recently archived first.
- Change the existing `PATCH /api/footage/:id`: when archiving, set `archivedAt` to `new Date().toISOString()`; when restoring (`{ archived: false }`), set it back to `null`.

**Frontend**
- A "Show archive" toggle that switches between the normal list and the archive.
- Archived items show "Archived on …" and a **Restore** button instead of **Archive**.

**Acceptance criteria**
- [ ] Archiving and then restoring an item puts it back in the normal list.
- [ ] A restored item has no `archivedAt` anymore.

---

## SO-3 · Media type & detail view

**Story:** As a visitor, I want to watch or view the footage directly in the app instead of only getting a link.

**Migration**
- Add a `mediaType` string column to `footage` (`'youtube'`, `'image'` or `'link'`), default `'link'`.

**Endpoints**
- New: `GET /api/footage/:id`: returns one item, or `404` when it does not exist or is archived.
- Change the existing `POST /api/footage`: accept `mediaType` and return `400` when the value is not one of the allowed types.

**Frontend**
- Add a `<select>` for the media type to the form.
- Clicking an item opens a detail view that fetches `/api/footage/:id`.
- Make subclasses of `Footage`: `YoutubeFootage`, `ImageFootage` and `LinkFootage`. Each one overrides `renderHtmlString()` (an embedded video, an `<img>`, or a plain link).

**Acceptance criteria**
- [ ] A YouTube URL plays inside the detail view.
- [ ] An unknown id shows a friendly "not found" message.
- [ ] Posting an unknown media type returns `400`.

---

## SO-4 · Report inappropriate footage

**Story:** As a visitor, I want to report footage (doxxing, wrong event, fake, …) so moderators can review it.

**Migration**
- Create a new `reports` table with: `id`, `footageId` (foreign key to `footage.id`), `reason` (string, required) and `createdAt`.

**Endpoints**
- `POST /api/footage/:id/reports` with body `{ reason }`: returns `201` and the new report, or `404` when the footage does not exist.
- `GET /api/reports`: returns all reports, including the `eventName` and `footageURI` of the reported footage (tip: `join`).

**Frontend**
- A **Report** button on every item that asks for a reason.
- A "Moderation" section that lists all reports, each with an **Archive footage** button (reuse the existing PATCH endpoint).

**Acceptance criteria**
- [ ] One item can have multiple reports.
- [ ] Reporting footage that does not exist returns `404`.

---

## SO-5 · Events as their own table (stretch)

**Story:** As a visitor, I want footage grouped under one event, instead of "Strike 21/10" and "strike 21-10" showing up as two different events.

**Migration**
- Create an `events` table with: `id`, `name`, `date` and `location`.
- Add an `eventId` column (foreign key to `events.id`) to `footage`.
- Move the existing data: for every distinct `eventName` + `eventDate` in `footage`, create an event and fill in `eventId` on the matching footage.
- Write a `down` function that undoes all of this.

**Endpoints**
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id/footage`
- Change `POST /api/footage` so it takes an `eventId` instead of a name and date.

**Frontend**
- Replace the name and date inputs with a `<select>` filled with the events from `/api/events`, plus a small form to create a new event.
- Show the footage grouped per event.

**Acceptance criteria**
- [ ] Existing footage is still there after the migration, linked to the right event.
- [ ] `npx knex migrate:rollback` followed by `npm run migrate` works without errors.
