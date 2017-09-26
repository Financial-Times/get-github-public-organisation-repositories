# ./node_modules/.bin on the PATH
export PATH := ./node_modules/.bin:$(PATH)

# Use bash not sh
SHELL := /bin/bash

# Environment variables
# ---------------------

EXPECTED_COVERAGE = 50


# Verify tasks
# ------------

verify:
	eslint .

verify-coverage:
	@nyc check-coverage --lines $(EXPECTED_COVERAGE) --functions $(EXPECTED_COVERAGE) --branches $(EXPECTED_COVERAGE)
	@$(DONE)


# Test tasks
# ----------

test: test-unit-coverage verify-coverage
	@$(DONE)

test-unit:
	@NODE_ENV=test mocha test/unit --recursive
	@$(DONE)

test-unit-coverage:
	@NODE_ENV=test nyc --all --reporter=text --reporter=html mocha test/unit --recursive
	@$(DONE)
