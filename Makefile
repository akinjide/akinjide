# Type `make` on the command line to deploy this site to S3.
#
# - To initialize your AWS command line tool, run `aws configure`.
# - To create an S3 bucket, run `aws s3 mb s3://mybucket`
# - To initialize your S3 bucket as a website, run `aws s3 website $(S3_BUCKET) --index-document index.html`

S3_BUCKET=s3://resume.akinjide.me/

all:
	aws s3 sync . $(S3_BUCKET) --exclude 'scripts/*' --exclude 'contact.php' --exclude 'minifer.js' --exclude 'node_modules/*' --exclude '.DS_Store' --exclude '.git/*' --exclude 'Makefile' --acl public-read --delete

develop:
	node minifer.js
	python ./serve.py

build:
	node minifer.js
