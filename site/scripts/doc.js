//steal/js jmvc/scripts/doc.js
//load("jmvc/scripts/doc.js")



load('steal/rhino/rhino.js');
steal.overwrite = true;
load('documentjs/documentjs.js');


DocumentJS('site/scripts/doc.html',{
	markdown : /*'jquery','steal','jmvc','tutorials','funcunit','mxui',*/
		['can', 'site'],
	out : 'site/docs'
});
