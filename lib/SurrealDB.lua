local resourceName = GetCurrentResourceName()
local SurrealDB = exports[resourceName].SurrealDB()

local function onReady(cb)
	while GetResourceState(resourceName) ~= 'started' do
		Wait(50)
	end

	repeat
        Wait(5)
    until surrealdb:isConnected()
    cb()
end

SurrealDB.ready = setmetatable({
	await = onReady
}, {
	__call = function(_, cb)
		Citizen.CreateThreadNow(function() onReady(cb) end)
	end,
})

_ENV.SurrealDB = SurrealDB