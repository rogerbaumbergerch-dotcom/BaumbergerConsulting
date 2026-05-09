# AGENTS

This file defines the agent rules for this repository.

## Supplement

The upper section is a supplement to the master section below.

- Prefer simple, maintainable, and clearly structured solutions.
- Keep changes small, targeted, and backward compatible unless explicitly requested otherwise.
- Separate domain logic from I/O and framework code, and avoid duplication.
- Use secure defaults, validate external input, and never leak secrets or personal data.
- Return clear, consistent error messages and log relevant diagnostics for failures.
- Add or update tests for changed logic, and prioritize fast unit tests.
- Keep API behavior consistent (status codes, payload structure, and field naming).
- Show frontend errors to users, not only in the console, and provide resilient fallbacks.
- Document important architectural decisions briefly in the appropriate files.

//// master

# General

- Use `rg` when needed.
- No need to write a summary of your changes at the end of an agent session. Please only do this if you are asked to.
- All code comments, docstrings, and log messages must be in English.
- Do not reference requirement IDs or quotes within the code; mention fulfillment only in the accompanying text response.

# Backend 

- **Location**: All backend-related source code and configuration (including `pyproject.toml`) are located in the `/backend` subdirectory.
- **Environment**: Python 3.13 (requires-python = "~=3.13.0"). Use modern features like the new `type` alias statement.
- **Frameworks**:
  - **FastAPI**: Always use `async def` for endpoints.
  - **Validation**: Use Pydantic v2.
  - **Database**: Use SQLAlchemy 2.0 with the `Mapped` and `mapped_column` approach for ORM models and `async_sessionmaker`.
- **Infrastructure**: AWS (CDK) deployed via Lambda.
- **Formatting & Linting**: No need to manually fix formatting errors, `ruff` (with `black` style) will do it for you. Line-length is 120. `I-Sort` is active. Quote style is set to `preserve`.
- **Type Hints**: Ensure full type-safety (pyright compatible). Note that pyright paths in `pyproject.toml` are relative to the `/backend` directory. Use `| None` instead of `Optional` and native collections like `list[str]` or `dict[str, Any]`.
- **Documentation**: Use **reStructuredText (reST)** style for all public functions and classes (not NumPy/Google style).
  - Use colon-based fields: `:param name:`, `:type name:`, and `:return:`.
  - Provide a one-sentence summary, document all parameters, and return values.
  - Example:
    ```python
    def get_results(work_id: str) -> list[dict[str, Any]]:
        """
        Retrieve all processed results for a specific work ID.

        :param assay_id: The unique identifier of the work.
        :type assay_id: str
        :return: A list of result dictionaries.
        :rtype: list[dict[str, Any]]
        """
    ```
- **Logging**: Use the `logging` module (no `print` statements). Use `logging.exception` for exceptions.
- **Imports**: Always use module-level imports. Avoid in-function imports whenever possible.
- **Testing**: Use `pytest` with `pytest-asyncio` (`asyncio_mode = "auto"`). Test files belong in `backend/tests/unit/` and follow the `test_{MODULE}.py` naming convention. Available markers: `integration`, `system`.

## Backend code quality guardrails (clean + minimal code)

- Keep implementation minimal: prefer the smallest change that solves the problem.
- Apply **SOLID** consistently:
  - Single Responsibility: one reason to change per module/function/class.
  - Open/Closed: extend behavior via composition instead of rewriting stable code.
  - Liskov Substitution: derived types must preserve expected behavior.
  - Interface Segregation: avoid broad interfaces; keep contracts focused.
  - Dependency Inversion: depend on abstractions for external services.
- Follow **KISS**, **DRY**, and **YAGNI**:
  - KISS: choose straightforward control flow and data structures.
  - DRY: extract shared logic instead of duplicating code.
  - YAGNI: do not add speculative options, flags, or abstractions.
- Prefer **Pydantic v2** models for request/response validation and schema boundaries.
- Use explicit types everywhere and avoid `Any` unless required by external APIs.
- Avoid hidden side effects: keep I/O, network access, and persistence out of pure domain functions.

## Backend verification commands

Run these commands after backend changes (from repository root):

```bash
cd backend && ruff check .
cd backend && ruff format .
cd backend && pyright
cd backend && pytest -q
```

If only one module changed, run at least the relevant unit tests for that module.

# Frontend

## Stack

- **Framework**: React 18 with JSX
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS 3 (mobile-first, use `sm:` / `md:` breakpoints)
- **UI components**: shadcn/ui (`@radix-ui/*`)
- **Data fetching**: TanStack Query v5
- **Routing**: react-router-dom v6
- **Notifications**: sonner toasts

## API integration

- Only rely on the API client defined in `frontend/api/`. Don't manually define API services outside of that directory.

## General React

- Always use functional components with hooks.
- Prefer destructuring props directly in the function signature.
- Keep components small and focused; extract sub-components when JSX grows complex.

## Code style

- Don't omit curly braces for single-line statements like `if (condition) return`.
- Use `const` for all variables that are not reassigned.
- use one common and central place where constants are defined. They shall not be in the source code or functions.

## Dependencies

Don't introduce new dependencies without asking. We try to keep the dependencies minimal and up to date.

## Testing

When testing React components, stub any component that relies on browser-only APIs (e.g. animation, IntersectionObserver) that are not available in the test environment.

### Testing philosophy

Focus on testing UI behavior from the user's perspective, not the inner workings of components. Test what the user can see and interact with rather than implementation details. This applies to both unit and integration tests. For example, prefer asserting that certain content is visible or hidden rather than checking if a specific API call was made.

### Test file conventions

Test files are always colocated with the source file they test:

- Unit tests: `*.test.jsx` (e.g., `RequestRow.test.jsx`)
- Integration tests: `*.integration.test.jsx` (e.g., `RequestRow.integration.test.jsx`)

### Test IDs

Use `data-test-id` attributes to identify elements in the DOM for testing if no better alternative is available. Never use Tailwind classes to identify elements.

## Development workflow

During development, regularly run `npm run build` in the `frontend/` folder to ensure the code compiles without errors.


## Documentation

create/ update documentation according to the code sequence diagrams, class and entity diagrams. create them if they dont exist
- Always update all UML documentation files under `docs/` (all `*.puml`) whenever architecture, flow, module responsibilities, entities, or dependencies change in code.
- This includes newly created UML files in the same task.
- Keep `docs/analysis-scenarios-flow.puml` and `docs/application-class-diagram.puml` aligned as minimum baseline diagrams for every relevant backend/frontend change.

## instruction to run
go through this list everytime you get called