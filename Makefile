#JSL ?= jsl

all: private

.PHONY: private
private: 
	@cp private-data.js data.js
	@open index.html

.PHONY: public
public: 
	@cp public-data.js data.js
	@open index.html
	