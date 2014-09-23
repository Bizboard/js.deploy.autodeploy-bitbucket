io.node.deploy-bitbucket
========================
Automate your application deployment on Linux target machines. You can configure 1 or many repositories and script a shell script with custom steps to deploy as you require.


Prerequisites
=============
For this code to work you will need to install:
* git
* Node.JS 0.10.x or higher
* NPM package manager


Install
=======
After installing git and node.JS. You will need to install this solution as follows:
* checkout this repository on the destination server
* run [npm install] where the package.json file is located
* edit and change the settings.js according to your configuration needs.
* run node main.js (verify that server is listening on specified port)
* Configure a Bitbucket Webhook POST hook in your Repository settings and add as follows:
** http://yourserver.com:specified-port/deploy/

Settings
========
port            : On what server port the Webhook Receiver is listening
workingfolder   : Working folder on server
targets         : repositories that need to be monitored (array)
target.url      : relative Bitbucket Repository url (e.g.  /team/project/ )
target.folder   : absolute path of repository folder on disk
target.branch   : which branch you choose that triggers a new GIT PULL 

deploy.sh
=========
Each type of application has it's own particulair deployment steps. This solutions delegates all operations to the
deploy.sh shell script. Making it easy for you to script some custom deployment actions. Like stop/start services.

Troubleshooting
===============
.... We'll process that after we get some community feedback ....

Finally
=======
Right! You should be able to POST your commits and have them handled on the server as you go.
