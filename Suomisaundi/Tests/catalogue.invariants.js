'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const readJSON = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const exists = p => fs.existsSync(path.join(ROOT, p));
const results = [];
const test = (id, fn) => {
  try { const evidence = fn(); results.push({id, status:'PASS', evidence}); }
  catch (error) { results.push({id, status:'FAIL', evidence:error.message}); }
};
const requireTrue = (v,m) => { if(!v) throw new Error(m); return m; };

test('no-name-only-external-id', () => {
  const p=readJSON('Catalogue/external.identifier.policy.json');
  return requireTrue(p.rules.some(x=>/name similarity alone/i.test(x)), 'External-ID policy rejects name-only identity attachment.');
});
test('no-catalogue-implies-genre', () => {
  const p=readJSON('Catalogue/membership.json');
  return requireTrue(JSON.stringify(p).match(/not sufficient|relevance/i), 'Membership model separates catalogue relevance from genre classification.');
});
test('claim-scoped-qualification', () => {
  const p=readJSON('Catalogue/corroboration.json');
  return requireTrue(/claims\/fields|claim/i.test(JSON.stringify(p)), 'Corroboration model scopes qualification to claims/fields.');
});
test('snapshots-immutable', () => {
  const p=readJSON('Catalogue/index.json');
  return requireTrue(p.canonical_rules.some(x=>/never silently rewritten/i.test(x)), 'Canonical rules declare dated snapshots immutable.');
});
test('alias-not-person', () => {
  const p=readJSON('Relationships/identity.edges.json');
  const human=p.edges.some(x=>x.from==='person.jere-hakkinen' && x.to==='artist.luomuhappo');
  return requireTrue(human && exists('People/Jere Häkkinen/person.json') && exists('Artists/Luomuhappo/artist.json'), 'Person and artist identities are represented separately and explicitly related.');
});
test('release-role-required', () => {
  const p=readJSON('Relationships/release.edges.json');
  return requireTrue(p.edges.length>0 && p.edges.every(x=>typeof x.role==='string' && x.role.length>0), 'All canonical release edges currently carry explicit roles.');
});
test('unknown-not-invented', () => {
  const p=readJSON('External/pending.json');
  return requireTrue(p.targets.length>0 && p.targets.every(x=>x.status==='pending') && /not evidence/i.test(p.note), 'Unresolved external metadata is retained as pending.');
});

const failed=results.filter(x=>x.status==='FAIL');
const report={schema:'haamu.suomisaundi.catalogue-test-run',version:'0.1.0',runner:'Tests/catalogue.invariants.js',results,summary:{total:results.length,passed:results.length-failed.length,failed:failed.length}};
process.stdout.write(JSON.stringify(report,null,2)+'\n');
process.exitCode=failed.length ? 1 : 0;
