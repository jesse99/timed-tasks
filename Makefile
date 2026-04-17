all: private


.PHONY: private
private: 
	@eslint private-data.js
	@eslint scripts/*.js
	@cp private-data.js data.js
	@open index.html

.PHONY: public
public: 
	#@eslint public-data.js
	#@eslint scripts/*.js
	@cp public-data.js data.js
	@open index.html
	
# To update the password:
#    1) Do `make public` and record the password hash using the console window.
#    2) Add the new password to current notes.
#    3) Add the hash to main.js.
#    4) Do `make package`.
#    5) Wait 10 minutes.
#    6) Use a browser (or phone) to verify that the new password works with the web site.
#    7) Commit the new code.
# To update the pictures
#    1) Run the command in pics.js
#    2) Paste in the new file list
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
