import fs from 'fs-extra';

// when we build ts to js it don't copy src/emails dir. 
// this shell command will help us to copy src/emails to build/src/ dir

// The tsc compiler only compiles .ts files, not assets or 
// other non-TypeScript files, such as .ejs, .json, or .css. These files 
// are ignored unless you manually handle them, either through a custom 
// script or a tool.

fs.copySync('src/emails', 'build/src/emails');
