
app.controller('spscontroller', function ($scope,spsservice) {




    load();
    
     $scope.Categories = [];
     $scope.Category = {
         ID:0,
         CategoryId: "",
         CategoryName:""
     };
    var IsUpdate = false;
    //Function to load all categories
    function load() {
        var promiseGet = spsservice.get($scope);

        promiseGet.then(function (resp) {
            $scope.Categories = resp.data;
        }, function (err) {
            $scope.Message = "Error " + err.status;
        });
    }

    //Function to load the selected record
    $scope.loadRecord = function (cat,$event) {
        $event.preventDefault();
        $scope.Category.ID = cat.ID;
        $scope.Category.CategoryId = cat.CategoryId;
        $scope.Category.CategoryName = cat.CategoryName;
        IsUpdate = true;
    }

    //Function to Create a new category or update existing base on the
    //IdUpdate boolean
    $scope.save = function ($event) {
        $event.preventDefault();
        if (!IsUpdate) {
            var promiseSave = spsservice.add($scope);
            promiseSave.then(function (resp) {
                alert("Saved");
            }, function (err) {
                $scope.Message = "Error " + err.status;
            });
        } else {
            var promiseUpdate = spsservice.update($scope);
            promiseUpdate.then(function (resp) {
                alert("Saved");
            }, function (err) {
                $scope.Message = "Error " + err.status;
            });
            IsUpdate = false;
        }
    }
});