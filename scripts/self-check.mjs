import assert from 'node:assert/strict';
import { analyzeTanka, isTanka } from './tanka.mjs';

const tanka = 'autumn rain falls down\ngentle rivers flowing slow\nnight birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields';
assert.equal(isTanka(tanka), true);
assert.deepEqual(analyzeTanka(tanka).counts, [5, 7, 5, 7, 7]);
assert.equal(isTanka('autumn rain falls down\ngentle rivers flowing slow\nnight birds sing softly'), false);
assert.equal(isTanka('<https://example.com|autumn rain falls down\ngentle rivers flowing slow\nnight birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields>'), false);
assert.equal(isTanka('<slack://canvas/C123|autumn rain falls down\ngentle rivers flowing slow\nnight birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields>'), false);
assert.equal(isTanka('<F123ABC|autumn rain falls down\ngentle rivers flowing slow\nnight birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields>'), false);
assert.equal(isTanka("if u mean the first there's a canvas we're making here https://hackclub.enterprise.slack.com/docs/T0266FRGM/F0BJ8GR09TK"), false);
assert.equal(isTanka("if u mean the first there's a canvas we're making here F0BJ8GR09TK"), false);
assert.equal(isTanka('*autumn* rain falls down\n_gentle_ rivers flowing slow\n~night~ birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields'), true);
assert.equal(isTanka('`autumn rain falls down`\ngentle rivers flowing slow\nnight birds sing softly\nmoonlit branches lean softly\nstars return to quiet fields'), false);
assert.equal(isTanka('not\na tanka\nat all'), false);
assert.equal(isTanka('thanks'), false);

console.log('ok');
