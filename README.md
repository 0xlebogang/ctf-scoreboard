# CTF Scoreboard

A simple scoreboard built for the flash of being at the ITWeb Security Summit Hackathon

## Prerequisites

- Mise (v2026.5+) (optional)
- Bun (v1.3+) (optional)
- Docker & Docker Compose (latest stable version)

> This project uses Mise-en-place as its tool manager. It is optional to have either mise or bun installed but you will need to have at least one of them.

## Development Setup

1. Fork this [repo](https://github.com/0xlebogang/ctf-scoreboard/fork)

2. Clone your fork

    > Replace {your-username} with your actual github username

    ```bash
    git clone https://github.com/{your-username}/ctf-scoreboard.git

    cd ctf-scoreboard/
    ```

    or

    ```bash
    git clone git@github.com:{your-username}/ctf-scoreboard.git

    cd ctf-scoreboard/
    ```

3. Install dependencies

    ```bash
    bun install
    ```

4. Copy the example `.env` file and rename it to ".env"

    ```bash
    cp .env.example .env
    ```

5. Populate the environment variables as necessary. Refer to the [.env](./.env.example) for the descriptions of the variables needed to be populated.

6. Run the development server

    ```bash
    bun run dev
    ```


---

<div align="center">
    <small>Built by:</small>
    <a href="https://lebophoshoko.dedyn.io">Lebogang Phoshoko</a><br />
    <a href="https://lethabomaepa.netlify.app">Lethabo Maepa</a>
</div>
