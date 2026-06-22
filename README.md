# Shiner Pickleball Club — v1 (scaffold)

This repo contains a Vite + React + Tailwind scaffold for Shiner Pickleball Club.

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Azure Static Web Apps

- Build with `npm run build` and deploy the `dist` output.
- Functions are under the `api/` folder and use Azure Functions JS handlers.
Deployment

This repo includes a GitHub Actions workflow to deploy to Azure Static Web Apps on push to `main`.

Steps to publish:

1. Create a GitHub repository and push this project to it.

```bash
git init
git add .
git commit -m "Initial Shiner Pickleball Club site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. In your GitHub repo, add a secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` (get this from Azure Static Web Apps deployment center when creating the static app).

3. The workflow `.github/workflows/azure-static-web-apps.yml` will run on push and deploy the site and `api/` functions.

4. After deployment, Azure provides a URL for your Static Web App. Copy that URL and share it.

Next steps

- Implement full reservation scheduler improvements, Stripe payments, auth, and analytics.
