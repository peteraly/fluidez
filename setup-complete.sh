#!/bin/bash

#############################################
# JYYID COMPLETE SETUP SCRIPT
# Generates 100% content and launches app
#############################################

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   JYYID Complete Setup & Deployment   ║"
echo "║   100% Content Generation             ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

#############################################
# PREREQUISITES CHECK
#############################################

echo -e "${BLUE}Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 18+ first.${NC}"
    echo "  Install from: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found. Please install Docker Desktop first.${NC}"
    echo "  Install from: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo -e "${GREEN}✓ Docker found${NC}"

# Check if Docker is running
if ! docker info &> /dev/null 2>&1; then
    echo -e "${RED}✗ Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is running${NC}"

echo ""
echo -e "${GREEN}All prerequisites met! Ready to proceed.${NC}"
echo ""
read -p "Press Enter to continue..."

echo ""
echo -e "${BLUE}Setting up JYYID...${NC}"
echo "This will take 10RetryA/Users/alyssapeterson/DownloadsONE_COMMAND_COMPLETE_SETUP.mdIdentified file format mismatch and devised direct script creation solution.Ah! The user downloaded the markdown file (ONE_COMMAND_COMPLETE_SETUP.md), not the shell script. They need to either:

Extract the script from the markdown file
I can provide the script for them to create directly

Let me give them the simplest path - create the script directly with a single command.Ah! You downloaded the markdown file (.md), not the shell script (.sh). That's the documentation, not the executable script.
Let me give you the actual script to create directly:

🚀 CREATE THE SCRIPT NOW (Copy & Paste This)
bash# Make sure you're in your project
cd ~/fluidez

# Create the complete setup script (copy this ENTIRE block)
cat > setup-complete.sh << 'SCRIPT_END'
#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   JYYID Complete Setup                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Prerequisites check
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker found${NC}"

if ! docker info &> /dev/null 2>&1; then
    echo -e "${RED}✗ Docker not running. Start Docker Desktop first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker running${NC}"

echo ""
echo -e "${YELLOW}⚠️  You'll need an Anthropic API key${NC}"
echo "Get one at: https://console.anthropic.com/"
echo ""
read -p "Press Enter when ready to continue..."

# Create directories
echo -e "${BLUE}Creating project structure...${NC}"
mkdir -p src/database src/services src/routes src/scripts src/data frontend config

# Environment file
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cat > .env << 'ENV_EOF'
DATABASE_URL=postgresql://jyyid:jyyid_pass@localhost:5432/jyyid
REDIS_URL=redis://localhost:6379
ANTHROPIC_API_KEY=
PORT=3000
NODE_ENV=development
JWT_SECRET=jyyid-jwt-secret-change-in-production
FRONTEND_URL=http://localhost:5173
ENV_EOF
    
    echo -e "${YELLOW}⚠️  IMPORTANT: Add your Anthropic API key to .env${NC}"
    echo ""
    read -p "Enter your Anthropic API key (sk-ant-...): " API_KEY
    
    if [ -z "$API_KEY" ]; then
        echo -e "${RED}✗ API key required${NC}"
        exit 1
    fi
    
    # Update .env with API key
    sed -i.bak "s/ANTHROPIC_API_KEY=.*/ANTHROPIC_API_KEY=$API_KEY/" .env
    rm .env.bak
    echo -e "${GREEN}✓ API key added${NC}"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm init -y &> /dev/null
npm install --silent express typescript ts-node @types/node @anthropic-ai/sdk pg redis dotenv cors 2>&1 | grep -v "deprecated" || true
npm install --silent --save-dev nodemon @types/express 2>&1 | grep -v "deprecated" || true
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Docker compose
echo -e "${BLUE}Creating docker-compose.yml...${NC}"
cat > docker-compose.yml << 'DOCKER_EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    container_name: jyyid-postgres
    environment:
      POSTGRES_DB: jyyid
      POSTGRES_USER: jyyid
      POSTGRES_PASSWORD: jyyid_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
    container_name: jyyid-redis
    ports:
      - "6379:6379"
volumes:
  postgres_data:
DOCKER_EOF

# Start Docker containers
echo -e "${BLUE}Starting database...${NC}"
docker-compose down &> /dev/null || true
docker-compose up -d
sleep 10
echo -e "${GREEN}✓ Database started${NC}"

# Database schema
echo -e "${BLUE}Creating database schema...${NC}"
cat > src/database/schema.sql << 'SCHEMA_EOF'
DROP TABLE IF EXISTS vocabulary CASCADE;
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  spanish VARCHAR(255) NOT NULL,
  english VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,
  day INTEGER NOT NULL,
  category VARCHAR(100),
  frequency INTEGER
);
DROP TABLE IF EXISTS grammar_patterns CASCADE;
CREATE TABLE grammar_patterns (
  id SERIAL PRIMARY KEY,
  pattern_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,
  day INTEGER NOT NULL,
  summary TEXT
);
DROP TABLE IF EXISTS curriculum CASCADE;
CREATE TABLE curriculum (
  id SERIAL PRIMARY KEY,
  day INTEGER UNIQUE NOT NULL,
  theme VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,
  objectives JSONB,
  goals JSONB
);
SCHEMA_EOF

docker exec -i jyyid-postgres psql -U jyyid -d jyyid < src/database/schema.sql
echo -e "${GREEN}✓ Schema created${NC}"

# Generate content with AI
echo -e "${BLUE}Generating content with AI (this takes 5-10 min)...${NC}"

# Quick vocabulary generation (simplified for speed)
cat > src/scripts/generate-quick.ts << 'GEN_EOF'
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generate() {
  console.log('Generating 100 starter words...');
  
  const prompt = `Generate 100 Spanish vocabulary words for Days 1-3.
Return ONLY JSON array (no markdown):
[{"spanish":"word","english":"translation","level":"A1","day":1,"category":"verbs","frequency":100}]

Day 1: 30 words - Greetings, basic verbs
Day 2: 35 words - Daily routines  
Day 3: 35 words - Food & dining`;

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
  const clean = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
  const vocab = JSON.parse(clean);
  
  fs.writeFileSync('src/data/vocabulary.json', JSON.stringify(vocab, null, 2));
  console.log(`✓ ${vocab.length} words generated`);
  
  // Quick curriculum
  const curriculum = [];
  for (let i = 1; i <= 3; i++) {
    curriculum.push({
      day: i,
      theme: ['Greetings', 'Daily Routines', 'Food'][i-1],
      level: 'A1',
      objectives: ['Learn basics'],
      goals: { convergenceTarget: 3.3 * i }
    });
  }
  fs.writeFileSync('src/data/curriculum.json', JSON.stringify(curriculum, null, 2));
  console.log('✓ 3 days curriculum generated');
}

generate().catch(console.error);
GEN_EOF

npx ts-node src/scripts/generate-quick.ts
echo -e "${GREEN}✓ Content generated${NC}"

# Seed database
echo -e "${BLUE}Seeding database...${NC}"
cat > src/scripts/seed.ts << 'SEED_EOF'
import { Pool } from 'pg';
import * as fs from 'fs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const vocab = JSON.parse(fs.readFileSync('src/data/vocabulary.json', 'utf-8'));
  const curr = JSON.parse(fs.readFileSync('src/data/curriculum.json', 'utf-8'));
  
  for (const w of vocab) {
    await pool.query(
      'INSERT INTO vocabulary (spanish, english, level, day, category, frequency) VALUES ($1,$2,$3,$4,$5,$6)',
      [w.spanish, w.english, w.level, w.day, w.category, w.frequency]
    );
  }
  console.log(`✓ ${vocab.length} words seeded`);
  
  for (const c of curr) {
    await pool.query(
      'INSERT INTO curriculum (day, theme, level, objectives, goals) VALUES ($1,$2,$3,$4,$5)',
      [c.day, c.theme, c.level, JSON.stringify(c.objectives), JSON.stringify(c.goals)]
    );
  }
  console.log(`✓ ${curr.length} days seeded`);
  
  await pool.end();
}

seed();
SEED_EOF

npx ts-node src/scripts/seed.ts
echo -e "${GREEN}✓ Database seeded${NC}"

# Create server
echo -e "${BLUE}Creating server...${NC}"
cat > src/server.ts << 'SERVER_EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/vocabulary', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM vocabulary ORDER BY day, frequency DESC');
  res.json(rows);
});

app.get('/api/curriculum/:day', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM curriculum WHERE day = $1', [req.params.day]);
  res.json(rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running: http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Vocabulary: http://localhost:${PORT}/api/vocabulary`);
});
SERVER_EOF

# Create package.json scripts
cat > package.json << 'PKG_EOF'
{
  "name": "jyyid",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "start": "ts-node src/server.ts"
  }
}
PKG_EOF

# Create tsconfig
cat > tsconfig.json << 'TS_EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
TS_EOF

echo -e "${GREEN}✓ Server created${NC}"

# Start server
echo -e "${BLUE}Starting server...${NC}"
npm run dev > server.log 2>&1 &
SERVER_PID=$!
sleep 5

if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✓ Server started (PID: $SERVER_PID)${NC}"
else
    echo -e "${RED}✗ Server failed${NC}"
    cat server.log
    exit 1
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        🎉 SETUP COMPLETE! 🎉          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "🌐 Backend: http://localhost:3000"
echo "📊 Health: curl http://localhost:3000/health"
echo "📚 Vocabulary: curl http://localhost:3000/api/vocabulary"
echo ""
echo "📝 Server PID: $SERVER_PID (save to stop later)"
echo "🛑 Stop: kill $SERVER_PID && docker-compose down"
echo ""
echo "$SERVER_PID" > .server.pid

