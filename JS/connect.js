var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://jocagos:Yc8PMCDLfauSIlExUC7QRHXz5iCPSpexIfmTIZOY4ZwWBmV4PoKDE4xllsRGXHABOzkQIZqWlT37LVU9qU3UOg%3D%3D@jocagos.documents.azure.com:10255/?ssl=true", function(err, client) {
    console.log('Connected?: ' + client.isConnected());
    client.close();
});