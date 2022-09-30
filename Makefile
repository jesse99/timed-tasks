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
	
# This uploads all the files that are needed to the hosting service and prompts
# you for a new password for the web site. It'll also ask for the hosting service
# password (TK23). WAITING 10 mins seems to be enough.
# Be sure to update password in private-data.js.
#
# It works by using https://www.maxlaumeister.com/pagecrypt to create a password
# protected all in one file that can be uploaded to a web hosting service.
# TODO: 
# looks like there can be issues when file list is too large (html gets truncated)
.PHONY: package
package: 
	@echo 'update pics.js as necessary'
	@python3 combine.py index.html private-data.js
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
