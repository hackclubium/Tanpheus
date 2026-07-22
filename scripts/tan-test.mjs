import { analyzeTanka } from './tanka.mjs';

console.log(JSON.stringify(analyzeTanka(process.argv.slice(2).join(' ')), null, 2));
