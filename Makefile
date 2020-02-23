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
	
# Uses https://www.maxlaumeister.com/pagecrypt/
.PHONY: package
package: 
	@python3 combine.py index.html private-data.js
	@python3 encrypt.py combined.html