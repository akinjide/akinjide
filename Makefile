# Type `make` on the command line to deploy this site to S3.
#
# - To initialize your AWS command line tool, run `aws configure`.
# - To create an S3 bucket, run `aws s3 mb s3://mybucket`
# - To initialize your S3 bucket as a website, run `aws s3 website $(S3_BUCKET) --index-document index.html`

.PHONY: build clean

S3_BUCKET=s3://resume.akinjide.me/
COMPILE_PATH=./bin/compile

deploy: build
	@echo -- Starting [deploy]
	aws s3 sync . $(S3_BUCKET) \
		--exclude 'static/scripts/*' \
		--exclude 'bin/*' \
		--exclude 'node_modules/*' \
		--exclude '.DS_Store' \
		--exclude '.git/*' \
		--exclude 'sw.js' \
		--exclude 'src/*' \
		--exclude 'lib/*' \
		--exclude 'Makefile' \
		--acl public-read --delete
	@echo -- Finished [deploy]

develop:
	@echo -- Starting [develop]
	if [ -d build ]; then echo "-- build directory existed"; else mkdir build; fi
	node $(COMPILE_PATH) development
	@echo -- Finished [develop]

build: clean
	@echo -- Starting [build]
	if [ -d build ]; then echo "-- build directory existed"; else mkdir build; fi
	node $(COMPILE_PATH) production
	@echo -- Finished [build]

clean:
	@echo -- Starting [clean]
	if [ -d build ]; then rm -rf build; rm *.html; echo "-- build directory cleaned"; else mkdir build; fi
	@echo -- Finished [clean]
