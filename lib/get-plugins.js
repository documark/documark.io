#!/usr/bin/env node

var request = require('request');
var url     = "https://registry.npmjs.org/-/_view/byKeyword?startkey=[%22documark-plugin%22]&endkey=[%22documark-plugin%22,{}]&group_level=3";

request(url, function (err, res, body) {
	if ( ! err && res.statusCode !== 200) {
		if (err) process.stderr.write(err);
		process.stdout.write(body);
		process.exit(1);
	}
	var plugins = [];
	JSON.parse(body).rows.map(function (row) {
		if (row.key[1].indexOf('dmp-') === -1) return;
		plugins.push({
			pkg: row.key[1],
			desc: row.key[2]
		});
	});
	plugins.sort(function (a, b) {
		return a.pkg.localeCompare(b.pkg);
	});
	process.stdout.write(JSON.stringify(plugins) + '\n');
	process.exit(1);
});
