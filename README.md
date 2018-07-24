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

  - `data.yml` - for generating resume, portfolio, books and contact page.
  - `config.yml` - for generating meta tags and about, profile page.
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
  - Adding books to `/static/books` directory, should match `name` in `data.yml`