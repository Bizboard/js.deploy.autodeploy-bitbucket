#!/bin/sh
# Example script of BRUTE FORCE pulling the configured repository.

PREFIX="--git-dir=.git --work-tree=."
(
	cd $1;
	git ${PREFIX} reset -- .;
	git ${PREFIX} checkout -- .;
	git ${PREFIX} checkout $2;
	git ${PREFIX} fetch;
	git ${PREFIX} pull -s recursive -X theirs;
)