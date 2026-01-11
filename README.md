# Skillix MCP Server

> Skill + Mix = Skillix — Mix skills, empower AI

Skillix is an MCP (Model Context Protocol) based skill management system that provides AI coding agents (like Cursor) with the ability to create, manage, load, and evolve skills.

## Features

- 🎯 **Skill Management** - Create, read, update, delete local skills
- ⚙️ **Configuration Management** - Global and project-level configuration support
- 📦 **Local-First Strategy** - Project skills take precedence over global skills
- 🔧 **MCP Integration** - Seamlessly integrates with AI coding assistants

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Install from Source

```bash
# Clone the repository
git clone https://github.com/your-username/skillix-mcp.git
cd skillix-mcp

# Install dependencies
npm install

# Build
npm run build
```

## Configuration

Add Skillix to your MCP configuration file:

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "skillix": {
      "command": "node",
      "args": ["/path/to/skillix-mcp/dist/index.js"]
    }
  }
}
```

## Available Tools

### sx-skill

Local skill management tool.

| Action | Description |
|--------|-------------|
| `list` | List all global and project skills |
| `read` | Read skill details including metadata and content |
| `create` | Create a new skill with directory structure |
| `update` | Update existing skill metadata or content |
| `delete` | Delete a skill and all its files |

**Examples:**

```bash
# List all skills
sx-skill action=list

# Read a skill
sx-skill action=read name=my-skill

# Create a new skill
sx-skill action=create name=my-skill metadata={"name":"my-skill","description":"My first skill"} body="# My Skill\n\nSkill content here..."

# Update a skill
sx-skill action=update name=my-skill body="# Updated Content"

# Delete a skill
sx-skill action=delete name=my-skill
```

### sx-config

Configuration management tool.

| Action | Description |
|--------|-------------|
| `get` | Get global or project configuration |
| `set` | Set configuration value |
| `init` | Initialize project configuration |
| `sources` | Manage skill sources (list/add/remove) |

**Examples:**

```bash
# Get configuration
sx-config action=get scope=global

# Initialize project
sx-config action=init projectRoot=/path/to/project

# Add a skill source
sx-config action=sources sourceAction=add source={"name":"my-source","url":"https://github.com/user/skills"}
```

### sx-help

Help information tool.

| Topic | Description |
|-------|-------------|
| `overview` | General overview of Skillix |
| `skill` | sx-skill tool help |
| `config` | sx-config tool help |
| `all` | All help topics |

**Examples:**

```bash
# Get overview help
sx-help topic=overview

# Get skill tool help
sx-help topic=skill
```

## Skill Format

Skills are defined using Markdown files with YAML frontmatter:

```markdown
---
name: my-skill
description: A description of what this skill does
version: 1.0.0
author: your-name
tags: [tag1, tag2]
---

# My Skill

Skill content and instructions here...
```

### Skill Directory Structure

```
my-skill/
├── SKILL.md          # Required: Skill definition file
├── scripts/          # Optional: Executable scripts
├── references/       # Optional: Reference documents
├── assets/           # Optional: Resource files
└── logs/             # Optional: Execution logs
```

### Naming Rules

- Format: hyphen-case (lowercase letters, numbers, hyphens)
- Must start with a lowercase letter
- Length: 2-64 characters
- Example: ✅ `pdf-converter` ❌ `PDF_Converter`

## Storage Locations

### Global Directory (`~/.skillix/`)

```
~/.skillix/
├── config.json       # Global configuration
├── skills/           # Global skills directory
├── logs/             # System logs
├── cache/            # Cache directory
└── data/             # Data directory
```

### Project Directory (`.skillix/`)

```
project/
└── .skillix/
    ├── config.json   # Project configuration
    ├── skills/       # Project-level skills
    └── logs/         # Project logs
```

## Local-First Strategy

1. **Skill Lookup Order**: Project skills → Global skills → Remote market
2. **Configuration Priority**: Project config → Global config → Default config
3. **Same-Name Skills**: Project-level skills override global skills

## Development

```bash
# Development mode
npm run dev

# Build
npm run build

# Run tests
npm test

# Start server
npm start
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
