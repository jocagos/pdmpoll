var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://jocagos:Yc8PMCDLfauSIlExUC7QRHXz5iCPSpexIfmTIZOY4ZwWBmV4PoKDE4xllsRGXHABOzkQIZqWlT37LVU9qU3UOg%3D%3D@jocagos.documents.azure.com:10255/?ssl=true", function(err, client) {
    if (err) throw err;
    var dbo = client.db('mydb');
    var myObj = { name: 'Company Inc', address: 'Highway 37' };
    dbo.collection('customers').insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log('1 Doc inserted');
        client.close();
    });
});