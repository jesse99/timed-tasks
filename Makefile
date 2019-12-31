#JSL ?= jsl

all: private

.PHONY: private
private: 
	cp private-strings.js strings.js
	open index.html

.PHONY: public
public: 
	cp public-strings.js strings.js
	open index.html
	