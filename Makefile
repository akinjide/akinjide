# Type `make` on the command line to deploy this site to S3.
#
# - To initialize your AWS command line tool, run `aws configure`.
# - To create an S3 bucket, run `aws s3 mb s3://mybucket`
# - To initialize your S3 bucket as a website, run `aws s3 website $(S3_BUCKET) --index-document index.html`

S3_BUCKET=s3://resume.akinjide.me/
MINIFY_PATH=./bin/minify
COMPILE_PATH=./bin/compile

all:
	@echo Deploying...
	aws s3 sync . $(S3_BUCKET) \
		--exclude 'static/scripts/*' \
		--exclude '*.bak' \
		--exclude 'bin/*' \
		--exclude 'node_modules/*' \
		--exclude '.DS_Store' \
		--exclude '.git/*' \
		--exclude 'Makefile' \
		--acl public-read --delete

develop:
	@echo Starting...
	if [ -d build ]; then echo "\n  >>> Directory given already exists...\n"; else mkdir build; fi

	node $(MINIFY_PATH) development
	node $(COMPILE_PATH) development

build:
	@echo Building app...
	if [ -d build ]; then echo "\n  >>> Directory given already exists...\n"; else mkdir build; fi

	node $(MIN_PATH) production
	node $(COMPILE_PATH) production

.PHONY: build
