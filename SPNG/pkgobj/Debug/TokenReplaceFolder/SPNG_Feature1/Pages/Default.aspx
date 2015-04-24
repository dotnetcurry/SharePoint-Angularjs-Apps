<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.1.3.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/angular.min.js"></script>
    <script src="../Scripts/angular-ui/ui-bootstrap-tpls.min.js"></script>

   
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />


     <script src="../Scripts/MyScripts/module.js" type="text/javascript"></script>
    <script src="../Scripts/MyScripts/service.js" type="text/javascript"></script>
    <script src="../Scripts/MyScripts/controller.js" type="text/javascript"></script>


    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <!-- Add your JavaScript to the following file -->
   <%-- <script type="text/javascript" src="../Scripts/App.js"></script>--%>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Using AngularJs with SharePoint 2013 Online
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    
   
    <div ng-app="spsmodule">
        <div ng-controller="spscontroller">
            <hr />
            <br />

        <div id="dvdml">
            <table class="table table-condensed table-striped table-bordered">
                <tr>
                    <td>Category Id:</td>
                    <td>
                        <input type="text" class="form-control"
                               ng-model="Category.CategoryId" />
                    </td>
                </tr>
                <tr>
                    <td>Category Name:</td>
                    <td>
                        <input type="text" class="form-control"
                               ng-model="Category.CategoryName">
                    </td>
                </tr>
            </table>

            </div>
   <input type="button" id="btnaddcategory" 
       class="btn btn-small btn-primary" 
        value="Save" ng-click="save($event)"/>        
    <br />
      <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th class="c1">RecordId</th>
                 <th class="c1">CategoryId</th>
                 <th class="c1">CategoryName</th>
                <th class="c1"></th>
                <th class="c1"></th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="Cat in Categories|orderBy:'CategoryId'">
                <td>{{Cat.ID}}</td>
                <td>{{Cat.CategoryId}}</td>
                <td>{{Cat.CategoryName}}</td>
                 <td>
                    <button class="btn glyphicon glyphicon-pencil"
                         ng-click="loadRecord(Cat,$event)"/>
                </td>
                
            </tr>
        </tbody>
    </table>
        </div>
    </div>


 </asp:Content>
