var hive=angular.module("hive",["ui.router","hive.controllers","hive.services","hive.directives","firebase"]);hive.config(function(e,t){e.state("hive",{"abstract":!0,views:{header:{templateUrl:"templates/header.html"}}}).state("hive.login",{url:"/",views:{"content@":{templateUrl:"templates/login.html"}}}).state("hive.chat",{url:"/chat",views:{"content@":{templateUrl:"templates/chat.html"}}}),t.otherwise("/")});