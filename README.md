# Writing Systems Database

A comprehensive database and API for exploring the world's writing systems, languages, scripts, and their relationships. Built with Nuxt 3, Prisma, and PostgreSQL.

## Features

- **Rich Data Models**: Languages, Scripts, Countries, and Unicode Characters with detailed metadata
- **Many-to-Many Relations**: Flexible relationships between languages, scripts, and countries via junction tables
- **RESTful API**: Complete CRUD operations for all entities
- **Complex Queries**: Pre-built endpoints for common use cases (languages by script, countries by language, etc.)
- **Seed Data**: Sample data covering major world languages and writing systems
- **Type Safety**: Full TypeScript support with Prisma
- **Docker Support**: Containerized PostgreSQL database

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

### Installation

1. Clone the repository and navigate to the project:

```bash
cd writing-systems
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Start the PostgreSQL database:

```bash
docker-compose up -d
```

5. Push the database schema:

```bash
npm run db:push
```

6. Seed the database with sample data:

```bash
npm run db:seed
```

7. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## Database Schema

### Core Models

#### Language
- `name`, `nativeName`: Language names
- `iso639_1`, `iso639_2`: ISO 639 language codes
- `family`, `branch`: Linguistic classification
- `speakers`: Estimated number of speakers
- Relations: scripts (m:n), countries (m:n), characters (1:n)

#### Script
- `name`, `nativeName`: Script names
- `iso15924`: ISO 15924 script code
- `type`: alphabet, abjad, abugida, syllabary, logographic
- `direction`: ltr, rtl, ttb, btt
- Relations: languages (m:n), characters (1:n)

#### Country
- `name`, `nativeName`: Country names
- `iso3166_1`, `iso3166_2`: ISO 3166 country codes
- `region`, `subregion`: Geographic classification
- `population`: Population count
- Relations: languages (m:n)

#### Character
- `character`: The actual character
- `unicodeHex`, `unicodeDec`: Unicode code point
- `name`: Unicode character name
- `block`, `category`: Unicode metadata
- Relations: language (n:1), script (n:1)

### Junction Tables

#### LanguageScript
Links languages to scripts with metadata:
- `isPrimary`: Whether this is the primary script for the language
- `status`: current, historical, liturgical, etc.

#### LanguageCountry
Links languages to countries with metadata:
- `isOfficial`: Whether this is an official language
- `speakers`: Number of speakers in this country
- `percentage`: Percentage of population
- `status`: official, regional, minority, etc.

## API Reference

### CRUD Endpoints

All entities support standard REST operations:

```
GET    /api/{entity}         # List all (supports filtering)
GET    /api/{entity}/{id}    # Get single item
POST   /api/{entity}         # Create new item
PUT    /api/{entity}/{id}    # Update item
DELETE /api/{entity}/{id}    # Delete item
```

Entities: `languages`, `scripts`, `countries`, `characters`

#### Query Parameters

**Include relations:**
```
GET /api/languages?include=all
GET /api/languages?include=scripts
GET /api/languages?include=countries
```

**Filter by properties:**
```
GET /api/languages?family=Indo-European
GET /api/scripts?type=alphabet
GET /api/countries?region=Asia
```

### Complex Query Endpoints

#### Languages by Script
Find all languages that use a specific script:
```
GET /api/queries/languages-by-script?scriptName=Latin
GET /api/queries/languages-by-script?scriptId={id}&isPrimary=true
```

#### Scripts by Language
Find all scripts used by a language:
```
GET /api/queries/scripts-by-language?languageName=Japanese
GET /api/queries/scripts-by-language?languageId={id}
```

#### Countries by Language
Find countries where a language is spoken:
```
GET /api/queries/countries-by-language?languageName=English
GET /api/queries/countries-by-language?languageId={id}&isOfficial=true
```

#### Languages by Country
Find languages spoken in a country:
```
GET /api/queries/languages-by-country?countryName=India
GET /api/queries/languages-by-country?iso3166_1=IN&isOfficial=true
```

#### Language Families
Get statistics on language families:
```
GET /api/queries/language-families              # List all families with counts
GET /api/queries/language-families?family=Indo-European  # Languages in family
```

#### Script Types
Get statistics on script types:
```
GET /api/queries/script-types                   # List all types with counts
GET /api/queries/script-types?type=alphabet     # Scripts of this type
```

### Relation Management Endpoints

#### Create Language-Script Relation
```
POST /api/relations/language-script
{
  "languageId": "...",
  "scriptId": "...",
  "isPrimary": true,
  "status": "current"
}
```

#### Delete Language-Script Relation
```
DELETE /api/relations/language-script/{id}
```

#### Create Language-Country Relation
```
POST /api/relations/language-country
{
  "languageId": "...",
  "countryId": "...",
  "isOfficial": true,
  "speakers": 1000000,
  "percentage": 25.5,
  "status": "official"
}
```

#### Delete Language-Country Relation
```
DELETE /api/relations/language-country/{id}
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

npm run db:push      # Push schema changes to database (dev)
npm run db:migrate   # Create and run migrations (production)
npm run db:seed      # Populate database with seed data
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Reset database and re-seed
```

### Docker Commands

```bash
docker-compose up -d       # Start PostgreSQL in background
docker-compose down        # Stop PostgreSQL
docker-compose logs -f     # View logs
docker-compose restart     # Restart database
```

### Database Migrations

For development, use `db:push`:
```bash
npm run db:push
```

For production, use migrations:
```bash
npm run db:migrate
```

### Prisma Studio

Explore your data visually:
```bash
npm run db:studio
```

Opens at `http://localhost:5555`

## Example Usage

### Creating a New Language

```bash
curl -X POST http://localhost:3000/api/languages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spanish",
    "nativeName": "Español",
    "iso639_1": "es",
    "iso639_2": "spa",
    "family": "Indo-European",
    "branch": "Romance",
    "speakers": 548000000,
    "description": "Spanish is a Romance language that originated in the Iberian Peninsula."
  }'
```

### Linking Language to Script

```bash
curl -X POST http://localhost:3000/api/relations/language-script \
  -H "Content-Type: application/json" \
  -d '{
    "languageId": "{spanish-id}",
    "scriptId": "{latin-id}",
    "isPrimary": true,
    "status": "current"
  }'
```

### Querying Complex Data

```bash
# Get all languages using the Latin script
curl http://localhost:3000/api/queries/languages-by-script?scriptName=Latin

# Get all scripts used by Japanese
curl http://localhost:3000/api/queries/scripts-by-language?languageName=Japanese

# Get official languages of India
curl http://localhost:3000/api/queries/languages-by-country?iso3166_1=IN&isOfficial=true

# Get all Indo-European languages with their scripts
curl http://localhost:3000/api/languages?family=Indo-European&include=scripts
```

## Project Structure

```
writing-systems/
├── .env                       # Environment variables
├── .env.example              # Environment template
├── docker-compose.yml        # PostgreSQL container config
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies and scripts
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data script
└── server/
    ├── api/
    │   ├── characters/      # Character CRUD endpoints
    │   ├── countries/       # Country CRUD endpoints
    │   ├── languages/       # Language CRUD endpoints
    │   ├── scripts/         # Script CRUD endpoints
    │   ├── queries/         # Complex query endpoints
    │   └── relations/       # Junction table endpoints
    └── utils/
        └── prisma.ts        # Prisma client singleton
```

## Technologies

- **Nuxt 3**: Full-stack Vue framework
- **Prisma**: Next-generation ORM
- **PostgreSQL**: Relational database
- **TypeScript**: Type-safe development
- **Docker**: Container platform

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
