# Chroma Console, aka 'Coco'

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Rainbow font, with one import.** No configuration needed, just works for terminal or Google Chrome.

![alt text](https://github.com/GamesOfSummer/chroma-console/blob/main/Preview.gif?raw=true)

```
import { Coco } from 'chroma-console';

(...)

Coco.log('testing debug output');
```

![alt text](https://github.com/GamesOfSummer/chroma-console/blob/main/TestingOutput.png?raw=true)

Big colorful buffers incase you need a visual blurb somewhere...

```
import { Coco } from 'chroma-console';

(...)

Coco.start();
Coco.end();
```

![alt text](https://github.com/GamesOfSummer/chroma-console/blob/main/TestingOutput2.png?raw=true)

Uses [🔗 gradient-string](https://github.com/bokub/gradient-string)

Please note if you want more options, please check out [🔗 Chalk](https://github.com/chalk/chalk),[🔗 Chalk Animation](https://github.com/bokub/chalk-animation), or[🔗colorfy](https://github.com/kippisone/colorfy)

NPM Package Link - https://www.npmjs.com/package/chroma-console

### TODO -

-   typescript types
-   if you set the color wrong, error out
-   different colors (red, orange, yellow, etc) / unit tests for this
-   bool flag helper
