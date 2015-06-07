var webpage = require('webpage'),
    //create a tab to browse
	page = webpage.create(),
	startUrl = "http://www.heise.de";

page.open(startUrl, function(status){
	if(status !== 'success'){
		console.log('Netzwerkproblem: ' + status);
		phantom.exit();
	}
	
	console.log(page.content);
	
	//close browser
	phantom.exit();
});