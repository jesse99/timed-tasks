# Used to replace the following line:
#    <script src="data.js"></script>
# in the input file with the contents of a second file.
# Usage is `python3 input-file second-file`.
import re, sys

if len(sys.argv) != 3:
	print("Expected input and second file arguments")
	sys.exit(1)

with open(sys.argv[1], 'r') as file:
	input = file.read()
with open(sys.argv[2], 'r') as file:
	script = file.read()

# Can also use sed or awk but that gets messy and multi-line files seem to be annoying.
output = re.sub('<script src="data.js"></script>', f"<script>{script}</script>", input)

with open("combined.html", 'w', encoding = 'utf-8') as file:
	file.write(f"{output}")
