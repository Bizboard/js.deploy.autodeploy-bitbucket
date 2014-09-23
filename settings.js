module.exports = {
	// configure the port where the webhook receiver will post it's payload.
	port: 9001,
	// the workingfolder is used a execution environment for the GIT pulling
	workingfolder: "/home/user",
	// add 1 or more targets. This enables you to configure multiple repositories on a deployment server
	targets: [
	 {
		url: "/yourteam/some.repository.example1/",
		folder: "/home/user/example1",
		branch: "master"
	 }, 
	 { 
		url: "/yourteam/some.repository.example2/",
		folder: "/home/user/example2",
		branch: "develop"
	 }]
};
	
