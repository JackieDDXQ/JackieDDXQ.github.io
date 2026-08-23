# Project page map

The `projects/` directory separates public case studies from the prototypes that support them.

## Case studies

Case-study HTML files stay directly under `projects/` so existing public URLs remain stable. For example, `projects/rights-management.html` continues to publish at `/projects/rights-management.html`.

## Prototypes

Canonical prototype files live under `projects/prototypes/` and are grouped by the case where they appear:

The rights-management case also provides a human-readable route directory at `projects/prototypes/rights-management/index.html`; its detailed inventory and UI rules are documented in `docs/RIGHTS_MANAGEMENT_PROTOTYPES.md`.

```text
projects/prototypes/
├── rights-management/
│   ├── depot/                 React + TypeScript supply prototype
│   ├── omni/                  React service prototype
│   └── cel/frontend/          Vue growth prototype
├── multi-tenant-mall/
│   └── shopping-mall/
│       ├── admin/             subscription operations prototype
│       └── mobile/            member-facing subscription prototype
├── physical-mall/
│   └── emall/                 commerce management prototype
└── chuxing-equity/
    └── teld/                  charging-rights management prototype
```

Old prototype locations are generated redirect pages, not editable source. After adding or renaming a pure-HTML prototype page, run `npm run generate:redirects` from the repository root.
