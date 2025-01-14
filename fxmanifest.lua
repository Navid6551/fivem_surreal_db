fx_version 'cerulean'
game 'common'

author "Navid"
description "Fivem SuurealDB Wrapper"
version '2.1.4'

server_script 'build/server.js'

convar_category 'fivem_surreal_db' {
	'Configuration',
	{
		{ 'Connection url', 'surreal_url', 'CV_STRING', 'http://127.0.0.1:8000/rpc' },
        { 'Connection user', 'surreal_username', 'CV_STRING', 'root' },
        { 'Connection user password', 'surreal_password', 'CV_STRING', 'root' },
        { 'Connection database name', 'surreal_database', 'CV_STRING', 'fivem' },
        { 'Connection namespace', 'surreal_namespace', 'CV_STRING', 'fivem' },
	}
}