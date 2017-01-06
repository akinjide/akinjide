# Type `make` on the command line to deploy this site to S3.
#
# - To initialize your AWS command line tool, run `aws configure`.
# - To create an S3 bucket, run `aws s3 mb s3://mybucket`
# - To initialize your S3 bucket as a website, run `aws s3 website $(S3_BUCKET) --index-document index.html`

S3_BUCKET=s3://resume.akinjide.me/
PUG_SRC=src/{index,404}.jade
PUG_DIR=./
MIN_PATH=./minifer.js

all:
	aws s3 sync . $(S3_BUCKET) --exclude 'scripts/*' --exclude 'contact.php' --exclude '*.bak' --exclude 'serve.py' --exclude 'minifer.js' --exclude 'node_modules/*' --exclude '.DS_Store' --exclude '.git/*' --exclude 'Makefile' --acl public-read --delete

develop:
	node $(MIN_PATH) development

	jade \
		--pretty \
		--watch \
		$(PUG_SRC) \
		--out \
		$(PUG_DIR)

	python ./serve.py

build:
	node $(MIN_PATH) production

	jade \
		$(PUG_SRC) \
		--out \
		$(PUG_DIR)

.PHONY: build