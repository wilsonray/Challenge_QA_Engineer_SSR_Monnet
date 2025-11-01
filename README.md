# Challenge QA Automation - Monnet Payments

Automated testing project built with Playwright + TypeScript for the Monnet Payments QA Automation Challenge.

## Features

- Multi-environment support (QA/CERT) with SHA256 encryption
- API testing (PokeAPI & JSONPlaceholder)
- UI testing (Wikipedia Pokemon pages)
- Dynamic test execution from Excel data
- Page Object Model and API abstraction patterns

⚠️ **Requirements:** `.env.qa` and `.env.cert` configuration files (see below)

## Requirements

- **Node.js** version 18 or superior
- **npm** version 9 or superior

### Verify Node.js 

```bash
node --version
npm --version
```

### Install Node.js (if you don't have it)

1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Follow the installation wizard
4. Verify installation with previous commands

## Project Installation

### 1. Clone repository

```bash
git clone https://github.com/wilsonray/Challenge_QA_Engineer_SSR_Monnet.git
cd Challenge_QA_Engineer_SSR_Monnet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Test Data File

Place the `Challenge automation - Datos-pruebas 2.xlsx` file in the `src/data/` directory:
```bash
src/data/Challenge automation - Datos-pruebas 2.xlsx
```

**Note:** This file contains the Pokemon test data (ID and names) required for test execution.

## Environment Configuration

### `.env` File

The project uses environment variables to handle secret keys. Create a `.env` file on the project root for each environment (QA and CERT):

```bash
# .env.qa
ENVIRONMENT=QA
SECRET_KEY_QA=PASTE_YOUR_KEY_HERE

# .env.cert
ENVIRONMENT=CERT
SECRET_KEY_CERT=PASTE_YOUR_KEY_HERE
```

**IMPORTANT:** The `.env` file is on the `.gitignore` list and **SHOULD NOT BE SHARED** publicly.

### Switch Environment

To run the tests on a desired environment, a specific command on the terminal is required:

- `ENVIRONMENT=QA` → Uses the QA secret key
- `ENVIRONMENT=CERT` → Uses the CERT secret key

## Run Tests

### Run Tests in QA Environment

```bash
npm run test:qa
```

### Run Tests in CERT Environment

```bash
npm run test:cert
```

### Run Tests with UI in QA Environment

```bash
npm run ui:qa
```

### Run Tests with UI in CERT Environment

```bash
npm run ui:cert
```

## See Report

After running a Test, you can check the auto-generated HTML report:

```bash
npx playwright show-report
```
This will open the detailed HTML report in your browser

## Project Structure

```
Challenge_QA_Engineer_SSR_Monnet/
├── src/            
│   ├── data/
│   │   ├── * Paste Excel File here *
│   │   └── urls.ts
│   ├── helpers/
│   │   ├── encryption.ts
│   │   ├── fixtures.ts             # Custom fixtures (encrypting)
│   │   ├── imageValidation.ts
│   │   ├── pokeapi_helpers.ts
│   │   └── readExcelPokemon.ts
│   ├── pom/
│   │   ├── api/
│   │   │   └── baseApi.ts
│   │   └── ui/
│   │       └── pokemon.page.ts
│   └── tests/
│       ├── api/
│       │   ├── parte1.spec.ts
│       │   └── parte2.spec.ts
│       └── ui/
│           └── parte3.spec.ts
├── images/                     # Generated: Pokemon images from Wikipedia
├── test-results/               # Generated: Test artifacts
├── playwright-report/          # Generated: HTML report               
├── playwright.config.ts        # Playwright Configuration
├── .env.cert                   # Environment Variables for CERT
├── .env.qa                     # Environment Variables for QA
├── .gitignore                  # Ignored Files
├── package.json                # Dependencies
└── README.md                   # This documentation
```
**Folders marked as "Generated" are created automatically during test execution.**

## Key Encryption

Project implements a **custom fixture** that:

1. Reads the secret key from `.env`
2. Hashes the key using **SHA256** (one-way hashing) 
3. Logs the encrypted key before each test (using the custom fixture)
4. **DOES NOT EXPOSE** secret key in the code

## Logs and Evidences

Project execution automatically generates:

- **Screenshots** in case of failures (`test-results/`)
- **Videos** when a test fails and retries (`test-results/`)
- **Traces** for debugging (`test-results/`)
- **HTML Report** with detailed results (`playwright-report/`)
- **Downloaded Images** from Wikipedia Pokemon pages (`images/`)

### Generated Folders

After running tests, the following folders will be created automatically:
```
project-root/
├── test-results/        # Test execution artifacts
├── playwright-report/   # HTML interactive report
└── images/              # Pokemon images downloaded from Wikipedia (UI tests)
```
**Note:** All evidence folders are in `.gitignore` and will be regenerated on each test execution.

## Technologies Used

- **Playwright** v1.40+ - Testing Framework
- **TypeScript** v5.3+ - Programming Language
- **Node.js** v18+ - Runtime
- **dotenv** - Environment variables handler
- **env-cmd** - CLI tool for loading environment-specific .env files
- **xlsx** - Excel file parser for reading test data
- **crypto** (native) - Encrypting SHA256

## Troubleshooting

### Error: "SECRET_KEY is not configured"

**Solution:** Verify that `.env.qa` or `.env.cert` files exist and have the proper variables

### Error: "Cannot find module 'dotenv'"

**Solution:** Install dependencies with `npm install`

### Tests don't run

**Solution:**
1. Verify Playwright is installed: `npx playwright install`
2. Verify Node.js is v18+: `node --version`

## Contact

For questions or issues, feel free to contact me at: wilson.villanueva@pucp.edu.pe

---

**Last Update:** October 31st, 2024