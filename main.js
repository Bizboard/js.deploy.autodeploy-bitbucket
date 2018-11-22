var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    settings = require('./settings'),
    _ = require("underscore"),
    app = express();

    app.use(bodyParser.json());
    app.use( bodyParser.urlencoded({ extended: true }) ); // to support URL-encoded bodies

    var server = app.listen(settings.port, function() {
        console.log('Listening on port %d', server.address().port);
    });

    // handle the post messages
    app.post('/deploy/', function (req, res) {

        var stringify = JSON.stringify(req.body);
        var data = JSON.parse(stringify);

        console.log("Validating if commit is part of monitored scope");

         var repository = _.find(settings.targets, function(record){
             console.log(" data.repository.full_name", record.url, " origin::",  data.repository.full_name);
            return record.url === data.repository.full_name;
         });

         // found a configured repository to update
         if (repository) {
            console.log("Repository target found: " + repository.url);
            console.log('Detecting branch: ' + repository.branch);

            // look for any branch commits configured.
            var matched = _.find(data.push.changes, function(changes){
               return changes.new.name === repository.branch;
            });


            if (matched) {
                console.log("Trigger update!");
                var spawn = require('child_process').spawn,
                deploy = spawn('sh', [ 'deploy.sh', repository.folder, repository.branch ], {
                    cwd: settings.workingfolder
                });

                deploy.stdout.on('data', function (data) {
                    console.log(''+data);
                });

                deploy.on('close', function (code) {
                    console.log('Child process exited with code ' + code);
                });

                res.status(200).json({message: 'Bitbucket Hook received! update!'});

            } else  {
                console.log("Don't update!");
                res.status(200).json({message: "Don't update!"});
            }
         } else {
             console.log("Repository target not found: " + data.repository.full_name);
             res.status(200).json({message: "Repository target not found: " + data.repository.full_name});
         }
    });

