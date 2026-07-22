# Tanpheus
A cool bot who loves tankas.

Slack bot that watches opted-in channels for opted-in users. When a message looks like a 5/7/5/7/7 tanka, it reposts the text in-thread:

```text
original tanka
---
by <@USERID>
```

Then it reacts with `:email:`.

## Shape

- GitHub Actions runs local checks on every push.
- GitHub Actions runs `scripts/run-tanpheus.mjs` every 6 hours and on manual dispatch as a backstop.
- Cloudflare Worker receives Slack slash commands.
- Cloudflare Worker receives Slack message events and posts matching tankas immediately.
- Cloudflare D1 stores opted-in Slack channel IDs, user IDs, diagnostics, and short-lived duplicate guards.

## Slack App

Create a Slack app with these bot scopes:

- `channels:history`
- `channels:join`
- `channels:read`
- `chat:write`
- `reactions:write`

For private channels, also add:

- `groups:history`
- `groups:read`

Add these slash commands, all pointing at Worker URL:

- `/tan-in`
- `/tan-out`
- `/tan-chan-in`
- `/tan-chan-out`
- `/tan-test` to show detector output for text
- `/tan-debug` to show current Slack user/channel IDs, opt-in state, and latest received message event

`/tan-chan-in` tries to join public channels automatically. Private channels still need:

```text
/invite @Tanpheus
```

Enable Events API:

- Request URL: Worker URL, for example `https://tanpheus.example.workers.dev`
- Subscribe to bot event: `message.channels`
- For private channels, also subscribe to: `message.groups`

## Secrets

Set GitHub repository secrets:

- `SLACK_BOT_TOKEN`: Slack bot token, starts with `xoxb-`.
- `TANPHEUS_STATE_URL`: Worker URL, for example `https://tanpheus.example.workers.dev`. `/state` is added automatically when omitted.
- `TANPHEUS_STATE_TOKEN`: shared secret used by GitHub Actions to read Worker state.

Set Worker secrets/vars:

- `SLACK_SIGNING_SECRET`: Slack app signing secret.
- `SLACK_BOT_TOKEN`: Slack bot token, starts with `xoxb-`.
- `TANPHEUS_STATE_TOKEN`: same value as GitHub secret.

Bind a D1 database named `TANPHEUS_DB`. Update `wrangler.toml` with its database ID.

## Local Checks

```sh
npm run check
```

## Limits

Tanka detection uses the same English syllable heuristic as Haikpheus. It will miss edge cases.
