all: private

.PHONY: private
private: 
	@eslint private-data.js
	@eslint scripts/*.js
	@cp private-data.js data.js
	@open index.html

.PHONY: public
public: 
	@eslint public-data.js
	@eslint scripts/*.js
	@cp public-data.js data.js
	@open index.html
	
# Encrypts the private data file so that it can be uploaded. Descrypt it using:
# 	openssl enc -d -aes-256-cbc -in private-data.js.enc > private-data.js
.PHONY: encrypt
encrypt: 
	@openssl enc -aes-256-cbc -salt -in private-data.js -out private-data.js.enc

# Uses https://www.maxlaumeister.com/pagecrypt to create a password protected all
# in one file that can be uploaded to a web hosting service.
# TODO: 
#    updating this tends to require that people clear the cache
#    can use: <meta http-equiv="Cache-control" content="No-Cache">
#    or maybe change an etag?
#    or just need to wait a few mins for hosting service to update?
# cache-manager on Hostinger does have a purge option
# looks like there can be issues when file list is too large (html gets truncated)
.PHONY: package
package: 
	@python3 combine.py index.html private-data.js
	@python3 encrypt.py combined.html
	@rm -rf web-site
	@mkdir web-site
	@cp combined-protected.html web-site/index.html
	@cp -R scripts web-site
	@cp -R styles web-site
	@cp -R images web-site
	@cp -R pics web-site
	@cp -R lost-pics web-site
	@scp -P 65002 -r web-site/* u506882013@213.190.6.43:public_html/
	@echo 'record the password in private-data.js'
