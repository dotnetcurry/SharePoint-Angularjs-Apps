
(function (app) {
app.service('spsservice', function ($q) {


    function manageQueryStringParameter(paramToRetrieve) {
        var params =
        document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve) {
                return singleParam[1];
            }
        }
    }

    var hostWebUrl;
    var appWebUrl;
    //The SharePoint App where the App is actualy installed
    hostWebUrl = decodeURIComponent(manageQueryStringParameter('SPHostUrl'));
    //The App web where the component to be accessed by the app are deployed
    appWebUrl = decodeURIComponent(manageQueryStringParameter('SPAppWebUrl'));


    //Function to read all records
    this.get = function () {

        var deferred = $q.defer();
        //Get the SharePoint Context object based upon the URL
        var ctx = new SP.ClientContext(appWebUrl);
        var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

        var web = appCtxSite.get_web(); //Get the Web 

        var list = web.get_lists().getByTitle("CategoryList"); //Get the List

        var query = new SP.CamlQuery(); //The Query object. This is used to query for data in the List

        query.set_viewXml('<View><RowLimit></RowLimit>10</View>');

        var items = list.getItems(query);

        ctx.load(list); //Retrieves the properties of a client object from the server.
        ctx.load(items);

       
        //Execute the Query Asynchronously
        ctx.executeQueryAsync(
            Function.createDelegate(this, function () {
                var itemInfo = '';
                var enumerator = items.getEnumerator();
                var CategoryArray = [];

                while (enumerator.moveNext()) {
                    var currentListItem = enumerator.get_current();
                     
                    CategoryArray.push({
                        ID: currentListItem.get_item('ID'),
                        CategoryId: currentListItem.get_item('Title'),
                        CategoryName: currentListItem.get_item('CategoryName')
                    });
                }
                deferred.resolve(CategoryArray);
            }),
            Function.createDelegate(this, function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
            );
        return deferred.promise;
    };

    //Function to Add the new record in the List
    this.add = function (Category) {
       
        var deferred = $q.defer();
       //debugger;
        var ctx = new SP.ClientContext(appWebUrl);//Get the SharePoint Context object based upon the URL
        var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

        var web = appCtxSite.get_web(); //Get the Site 

        var list = web.get_lists().getByTitle("CategoryList"); //Get the List based upon the Title
        var listCreationInformation = new SP.ListItemCreationInformation(); //Object for creating Item in the List

        ctx.load(list);
        var listItem = list.addItem(listCreationInformation);

        listItem.set_item("Title", Category.CategoryId);
        listItem.set_item("CategoryName", Category.CategoryName);
        listItem.update(); //Update the List Item

        ctx.load(listItem);
        //Execute the batch Asynchronously
        ctx.executeQueryAsync(
            Function.createDelegate(this, function () {
                var Categories = [];
                    var id = listItem.get_id();
                   Categories.push({
                        ID: listItem.get_item('ID'),
                        CategoryId: listItem.get_item('Title'),
                        CategoryName: listItem.get_item('CategoryName')
                   });
                   deferred.resolve(Categories);
                 }),
            Function.createDelegate(this, function () {
                deferred.reject('Request failed. ' + args.get_message() +
'\n' + args.get_stackTrace());
            })
           );

        return deferred.promise;
    }

    //Method to Update update the record
    this.update = function (Category) {
         
        var deferred = $q.defer();
        var ctx = new SP.ClientContext(appWebUrl);
        var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

        var web = appCtxSite.get_web();

        var list = web.get_lists().getByTitle("CategoryList");
        ctx.load(list);

        listItemToUpdate = list.getItemById(Category.ID);

        ctx.load(listItemToUpdate);

        listItemToUpdate.set_item('CategoryName', Category.CategoryName);
        listItemToUpdate.update();

        ctx.executeQueryAsync(
            Function.createDelegate(this, function () {
               var Categories = [];
               var id = listItemToUpdate.get_id();
                    Categories.push({
                        ID: listItemToUpdate.get_item('ID'),
                        CategoryId: listItemToUpdate.get_item('Title'),
                        CategoryName: listItemToUpdate.get_item('CategoryName')
                    });
                    deferred.resolve(Categories);
            }),
            Function.createDelegate(this, function () {
                deferred.reject('Request failed. ' + args.get_message() +
'\n' + args.get_stackTrace());
            })
            );
        return deferred.promise;
    };
});
}(angular.module('spsmodule')));
