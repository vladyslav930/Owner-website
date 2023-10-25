# Owner v2 Website

## Git Branching Model

This project uses the [Parallel Develop and Master][1] branching model.
Features get to the `master` only through acceptance on `develop`.

## Development

### npm start

runs the development server at `http://localhost:4200/`

### npm test[:(watch|tdd)]

executes the unit tests via [Jest][2]

### npm run build[:(prod|staging|dev)]

verifies that the project can be bundled successfully

### npm run lint[:(fix|styl)]

runs the ng and styl linters

## DataDog patch instructions
Useful link: [Make changes to node_modules files with patch-package][3].

In case DataDog library is updated and current patch doesn't work do:
* open `/node_modules/@datadog/browser-core/cjs/boot/init.js` and update `checkIsNotLocalFile()` just to return `true` always
* open `/node_modules/@datadog/browser-core/esm/boot/init.js` and update `checkIsNotLocalFile()` just to return `true` always
* run `npx patch-package @datadog/browser-core`

[1]: https://myndmanagement.atlassian.net/wiki/spaces/ENG/pages/504005054/Git+Branching+Models#%E2%80%9CParallel-Develop-And-Master%E2%80%9D-Model
[2]: https://jestjs.io/en/
[3]: https://dev.to/roshangm1/make-changes-to-nodemodule-files-with-patch-package-30h4
