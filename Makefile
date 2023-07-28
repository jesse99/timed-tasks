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
	
# To update the password:
# 1) Do `make public` and record the password hash using the console window.
# 2) Add the new password to main.js.
# 3) Verify that the new password works with `make public`.
# 4) Add the new password to private-data.js.
# 5) Do `make package`.
# 6) Wait 10 minutes,
# 7) Use a browser (or phone) to verify that the new password works with the web site.
# 8) Commit the new code.
.PHONY: package
package: 
	@echo 'update pics.js and pics_custom.js as necessary'
	@rm -rf web-site
	@mkdir web-site
	@cp -R private-data.js web-site
	@cp -R index.html web-site
	@cp -R scripts web-site
	@cp -R styles web-site
	@cp -R images web-site
	@cp -R pics web-site
	@cp -R pics-custom web-site
	@cp -R pics-finished web-site
	scp -P 65002 -r web-site/* u506882013@212.1.209.147:public_html/
	@echo 'record the password in current-notes'
