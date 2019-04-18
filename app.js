var app = angular.module("dinamikFormApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/formYonetim");
    $stateProvider
        .state("formYonetim", {
            url: "/formYonetim",
            templateUrl: "forms/formYonetim.html"
        })
        .state("forms", {
            url: "/forms/:id",
            templateUrl: "forms/formGoruntule.html"
        });
});

app.directive("modalDirective", function () {
    return {
        templateUrl: "forms/directiveNewForm.html"
    }
});

app.controller("bodyController", function ($scope, $state, $timeout) {
    if (localStorage.getItem('formList')) {
        $scope.arrFormListAll = JSON.parse(localStorage.getItem('formList'));
        $scope.initForms = true;
    }
    else {
        $scope.arrFormListAll = [];
        $scope.initForms = false;
    }
    $scope.titleForm = {
        name: "",
        description: "",
        createdAt: "",
        fields: []
    };
    $scope.fieldForm = {
        required: false,
        name: "",
        dataType: ""
    };
    $scope.countArray = ["1"];

    $scope.fieldEkle = function () {
        $scope.countArray.push(new Date());
    };
    $scope.fieldSil = function () {
        if ($scope.countArray.length == 1) {
            alert("En az bir field alanı gerekiyor!.")
        }
        else {
            $scope.countArray = $scope.deleteArrayLeft($scope.countArray, 1);
        }
    }
    $scope.formSubmit = function () {
        for (let index = 0; index < $scope.countArray.length; index++) {
            if ($scope.fieldForm[index].required == undefined) {
                $scope.fieldForm[index].required = false;
            }
            $scope.titleForm.fields.push({ "required": $scope.fieldForm[index].required, "name": $scope.fieldForm[index].name, "dataType": $scope.fieldForm[index].dataType });
        }
        $scope.titleForm.createdAt = new Date().toISOString().slice(0, 10);
        $scope.addLocal($scope.titleForm);
    }
    $scope.addLocal = function (form) {
        // temp = localStorage.getItem("formList");
        //    temp="";
        //temp="";
        if ($scope.initForms) {
            temp = localStorage.getItem("formList");
            temp = $scope.addArrayRight($scope.addArrayRight($scope.deleteArrayLeft(temp, 1), ",").concat(JSON.stringify(form)), "]");
            localStorage.setItem("formList", temp);
            $scope.temizle();
        }
        else {
            temp = $scope.addArrayRight("[".concat(JSON.stringify(form)), "]");
            $scope.initForms = true;
            localStorage.setItem("formList", temp);
            $scope.temizle();
        }
    }
    $scope.temizle = function () {
        alert("Formunuz başarılı bir şekilde kaydedildi.");
        $scope.arrFormListAll = JSON.parse(localStorage.getItem('formList'));
        $scope.titleForm = {
            name: "",
            description: "",
            createdAt: "",
            fields: []
        };
        $scope.fieldForm = {
            required: false,
            name: "",
            dataType: ""
        };
        $scope.countArray = ["1"];
    }
    $scope.deleteArrayLeft = function (arrayDeleted, count) {
        return arrayDeleted.slice(0, arrayDeleted.length - count);
    }
    $scope.addArrayRight = function (addedArray, addedText) {
        return addedArray.concat(addedText);
    }

    $scope.indexGonder = function (index) {
        $scope.createFormJson = $scope.arrFormListAll[index];
    };
    $scope.goruntuleSubmit = function () {
        alert("Formunuz başarılı bir şekilde gönderildi.");
        $timeout(function () {
            $state.go('formYonetim');
        }, 3000);
    };
    $scope.modalOn = function () {
        $scope.titleForm = {
            name: "",
            description: "",
            createdAt: "",
            fields: []
        };
        $scope.fieldForm = {
            required: false,
            name: "",
            dataType: ""
        };
        $scope.countArray = ["1"];
    }
});
