'use strict';

const express = require('express');

const app = express();
app.use(express.json({ limit: '64kb' }));

/**
 * Deterministic slug generator:
 * - trim
 * - lowercase
 * - replace any run of non [a-z0-9] with a single hyphen
 * - collapse multiple hyphens
 * - trim hyphens from ends
 */
function toSlug(text) {
  const s = String(text).trim().toLowerCase();
  const replaced = s.replace(/[^a-z0-9]+/g, '-');
  const collapsed = replaced.replace(/-+/g, '-');
  return collapsed.replace(/^-|-$/g, '');
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/v1/slug', (req, res) => {
  const { text } = req.body || {};

  if (typeof text !== 'string') {
    return res.status(400).json({ error: "Input must be a string field named 'text'" });
  }

  const slug = toSlug(text);

  return res.status(200).json({ slug });
});

// 404 fallback (keeps root from confusing you during manual checks)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Slug Generator running on port ${PORT}`);
});
