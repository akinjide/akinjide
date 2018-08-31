# akinjide-resume

## Dependecies

  - Node.js
  - Jade
  - YAML
  - GNU Make
  - Icomoon
  - JQuery and JQuery Plugins

## Use

Configure `config/*.yml` files to suite you need.

  - `store.yml` - for generating resume, portfolio, books and contact page.
  - `cfn.yml` - for generating meta tags, about and profile page.
  - `sjc.yml` - for configuring scripts and styles. [auto-generated].
  - `src/includes/signature.txt` - add your fancy [text symbol](https://fsymbols.com/generators/) signature.

## Run

```bash
# Generate Development-only files and run locally.
$ make develop
$ lib/serve

# Generate Production-only files and deploy to host.
$ make build
$ make deploy
```


## Note
  - Adding books with `*.png` to `/static/books` directory, should match `name` in `store.yml` (i.e 'You Dont know JS (Up And Going)' matches 'you-dont-know-js-(up-and-going).png')