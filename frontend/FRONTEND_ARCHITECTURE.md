# Project Structure Analysis: app-ui Architecture

This document outlines the architectural patterns and directory structure mandated for the Engiknow frontend project, based on the `app-ui` standard.

## Directory Mapping

| Key Term         | Path                          | Description                                                                                             |
| :--------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------ |
| **Queries**      | `src/Common/Queries/`         | React Query hooks (`useQuery`, `useMutation`) for state management and data fetching.                   |
| **Containers**   | `src/Container/`              | Logic components responsible for fetching data via Queries and passing it to presentational components. |
| **UI**           | `src/components/`             | Reusable presentational components (e.g., Cards, Tables, Buttons).                                      |
| **PageWrapper**  | `src/components/pageWrapper/` | High-level page layouts that compose UI components and handle view states (loading, empty, error).      |
| **Repositories** | `src/Repositories/`           | API layer handling direct HTTP requests, decoupled from React.                                          |

## Architectural Pattern & Data Flow

The application follows a strict Container-Presentational pattern with a distinct Service Layer for API interaction.

### 1. Repository Layer (`src/Repositories/`)

- **Responsibility**: Direct API communication.
- **Pattern**: Classes (e.g., `Application`) with async methods matching API endpoints. Uses a Singleton pattern (`getInstance`).

### 2. Query Layer (`src/Common/Queries/`)

- **Responsibility**: State management and caching using `react-query`.
- **Pattern**: Custom hooks wrapping Repository calls. Handles specific React Query configurations (cache time, stale time, invalidation).

### 3. Container Layer (`src/Container/`)

- **Responsibility**: Data fetching logic.
- **Pattern**: Wrapper components that use Query hooks to fetch data and pass it down to children using `cloneElement`. They do not typically render UI markup directly, but rather inject props into their children.

### 4. PageWrapper (`src/components/pageWrapper/`)

- **Responsibility**: Page composition and view state handling.
- **Pattern**: Receives data (from Containers) and determines what to show:
  - **Loading**: Renders `CompleteLoader` or similar.
  - **Error**: Renders `ErrorComponent`.
  - **Empty**: Renders `EmptyComponent` (often with CTA to add items).
  - **Success**: Renders `HeadingComponent` and lists/grids of UI components (e.g., `ApplicationCard`).

### 5. UI Components (`src/components/`)

- **Responsibility**: Pure rendering.
- **Pattern**: Reusable, props-driven components.

## Usage Guide (for future referencing)

When implementing a new feature:

1. **API**: Add the endpoint to `endpoints.js` (if needed) and a method to the relevant Repository class.
2. **Query**: Create or update hooks in `Common/Queries/` to wrap the new Repository method.
3. **Container**: Create a Container to call the new hook.
4. **UI**:
   - Create a PageWrapper to layout the page.
   - Create/Reuse Components (Cards, Tables) to display the data.
5. **Route**: Connect the Container and PageWrapper in the page route (likely in `app/`).
