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
.PHONY: package
package: 
	@python3 combine.py index.html private-data.js
	@python3 encrypt.py combined.html
	@rm -rf web-site
	@mkdir web-site
	@cp combined-protected.html web-site/index.html
	@cp -R scripts web-site
	@cp -R styles web-site
	@tar -zcvf web-site.tar.gz web-site

