var webpage = require('webpage'),
    //create a tab to browse
	page = webpage.create(),
	startUrl = "http://www.heise.de";

page.open(startUrl, function(status){
	if(status !== 'success'){
		console.log('Netzwerkproblem: ' + status);
		phantom.exit();
	}

	page.render('heise_' + Date.now() + '.jpg', {format: 'jpeg', quality: '90'});
	page.render('heise_' + Date.now() + '.pdf', {format: 'pdf', quality: '90'});
	
	//close browser
	phantom.exit();
});