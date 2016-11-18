app.controller('main', function ($scope, Auth, $firebaseArray, $localStorage, $modal) {
  $scope.templates =
    [ { name: 'website', url: 'assets/js/views/website.html'},
      { name: 'signage', url: 'assets/js/views/signage.html'},
       { name: 'logo', url: 'assets/js/views/logo.html'} ];
  $scope.template = $scope.templates[0];
      $scope.websites = [];
      $scope.qItmes = [];
 $scope.newWebsite = {
 	      name: "",
      	pages: "",
      	designTime: "",
        cms: "",
        message: ""
 };

 $scope.newSign = {
 	description: '',
 	quantity:'',
 	width:'',
 	height:'',
 	m1:'',
 	m2:'',
 	p1:'',
 	p2:'',
 	designTime:'',
 	productionTime:'',
 	installationTime:'',
  signs: '',
  message: '',
  markUp: '40',
 }

 $scope.newLogo = {
  description: '',
  designTime: '',
  message: ''
 }
 var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/");
 $scope.qItems = 0;
 $scope.totalCost = 0;
 $scope.rate = 80;
 $scope.qID = "";
 $scope.descriptioni = "bbh";
 $scope.qoutes = [];
 $scope.qoutesIDs= [];
 $scope.temp = Auth.$getAuth();
 $scope.statusText = '';
 $scope.otherPrice = "5";
 var modifyIndex = 0;
  /*$scope.qID = $localStorage.$default({
          ID: 'mtest2'
        });*/
 var tempID = "mtest2"//$sessionStorage;
 
 //$scope.websites = $firebaseObject(ref.child($scope.temp.uid).child($scope.qID));



 $scope.getQuotes = function()
 {
      console.log("getQuotes enetered");
      var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid);
      ref.on("value", function(snapshot) {
        
        $scope.qoutes = snapshot.val();
        console.log($scope.qoutes);
        //alert($scope.qoutes);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
 }
  $scope.getQuotes();


  $scope.searchQoutes = function()
  {
      var qArray = [];
      console.log('searchquotes');
      var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid);
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot)
        {
          var key = childSnapshot.key();
          qArray.push(key);
          
          console.log($scope.qoutesIDs);
        });
        });
      $scope.qoutesIDs = qArray;
      
  }
  


 
 //$scope.data

 $scope.addWebsite = function(newWebsite)
 {

 	console.log(newWebsite);
 	$scope.websites.push({
 		name:$scope.newWebsite.description,
 		pages:$scope.newWebsite.pages,
 		hours:$scope.newWebsite.designTime,
    cms:$scope.newWebsite.cms,
    message:$scope.newWebsite.message,
 		cost: (parseInt($scope.newWebsite.designTime) * $scope.rate) + (1000),
    type: 0
 	}
 		);
 	$scope.qItems++;
 	$scope.calcTotalCosts();




 };
 $scope.getDetails = function()
 {
   
    console.log($scope.temp.uid);
    $scope.getQuotes();
 }

 $scope.write = function()
 {

    var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/");
  var usersRef = ref.child("users/"+$scope.temp.uid+'/'+$scope.qID+'/items');
  var usersRef2 = ref.child("users/"+$scope.temp.uid+'/'+$scope.qID+'/clientName');
  var usersRef3 = ref.child("users/"+$scope.temp.uid+'/'+$scope.qID+'/clientOrg');
  var usersRef4 = ref.child("users/"+$scope.temp.uid+'/'+$scope.qID+'/date');
  usersRef.set($scope.websites, function(error) 
    {
      if(error)
      {
        console.log("error!");
        $scope.statusText = 'Could not save the quote we got the following error: ' + error;
        $scope.$apply();
      }
      else
      {
        console.log("No errors");
        $scope.statusText = 'quote saved as '+ $scope.qID;
        $scope.$apply();
        var delay=2000; //1 seconds
        $('.statusText').fadeIn();
        setTimeout(function(){
            $('.statusText').fadeOut();
          }, delay); 
                }
  });
  usersRef2.set($scope.qName);
  usersRef3.set($scope.qOrg);
  usersRef4.set($scope.qDate.toISOString());
  $scope.calcTotalCosts();
 }

 $scope.read = function(ID)
 {
      var ref = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid+'/'+ID+'/items');
      var ref2 = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid+'/'+ID+'/clientName');
      var ref3 = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid+'/'+ID+'/clientOrg');
      var ref4 = new Firebase("https://dazzling-inferno-5138.firebaseio.com/users/"+$scope.temp.uid+'/'+ID+'/date');
      ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        $scope.websites = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
       ref2.on("value", function(snapshot) {
        console.log(snapshot.val());
        $scope.qName = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
        ref3.on("value", function(snapshot) {
        console.log(snapshot.val());
        $scope.qOrg = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      ref4.on("value", function(snapshot) {
        console.log(snapshot.val());
        $scope.qDate = new Date(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      $scope.qID = ID;
      $scope.calcTotalCosts();
      //$sessionStorage.ID = ID;

      //$scope.websites = $firebaseArray(ref.child($scope.temp.uid).child($scope.qID));
 }


  $scope.addLogo = function()
 {
    console.log("adding logo");
    var updatedItem = 
    {
    name:$scope.newLogo.description,
    hours:$scope.newLogo.designTime,
    message:$scope.newLogo.message,
    cost: parseInt($scope.newLogo.designTime) * $scope.rate,
    type: 2

    };

  console.log($scope.newLogo);
  $scope.websites.push(updatedItem);
  $scope.qItems++;
  $scope.calcTotalCosts();




 };

 $scope.modifyLogo = function()
 {
    console.log("modifying logo");
    var updatedItem = 
    {
    name:$scope.newLogo.description,
    hours:$scope.newLogo.designTime,
    message:$scope.newLogo.message,
    cost: parseInt($scope.newLogo.designTime) * $scope.rate,
    type: 2

    };
    $scope.websites.splice(modifyIndex,1, updatedItem);
    $scope.calcTotalCosts();
 }

  $scope.modifyWebsite = function()
 {
    console.log("modifying website " + $scope.modifyIndex);
    var updatedItem = 
    {
    name:$scope.newWebsite.description,
    pages:$scope.newWebsite.pages,
    hours:$scope.newWebsite.designTime,
    cms:$scope.newWebsite.cms,
    message:$scope.newWebsite.message,
    cost: (parseInt($scope.newWebsite.designTime) * $scope.rate) + (10*$scope.rate),
    type: 0

    };
    $scope.websites.splice(modifyIndex,1, updatedItem);
    $scope.calcTotalCosts();
 }

  $scope.modifySign = function()
 {

    console.log("modifying sign");
    $scope.totalSignCosts = ((($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.m2) +  ($scope.newSign.option*$scope.newSign.p1) + ($scope.newSign.option*$scope.newSign.p2)) * $scope.newSign.qty);
    $scope.totalHours = ($scope.newSign.designTime * $scope.rate) + (($scope.newSign.productionTime*$scope.rate)*$scope.newSign.qty) + (($scope.newSign.installationTime*$scope.rate)*$scope.newSign.qty);
    var updatedItem = 
    {
    name:$scope.newSign.description,
    quantity:$scope.newSign.qty,
    width:$scope.newSign.width,
    height:$scope.newSign.height,
    m1:$scope.newSign.m1,
    m2:$scope.newSign.m2,
    p1:$scope.newSign.p1,
    p2:$scope.newSign.p2,
    hours: parseFloat($scope.newSign.designTime) + (parseFloat($scope.newSign.productionTime)*$scope.newSign.qty) + (parseFloat($scope.newSign.installationTime)*$scope.newSign.qty),
    designTime:$scope.newSign.designTime,
    productionTime:$scope.newSign.productionTime,
    installationTime:$scope.newSign.installationTime,
    message: $scope.newSign.message,
    signs: parseFloat(((($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.m2) +   ($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.p1) + ($scope.newSign.option*$scope.newSign.p2)) * $scope.newSign.qty)),
    cost:  $scope.totalSignCosts + ($scope.totalSignCosts * (parseFloat($scope.newSign.markUp)/100)) + $scope.totalHours,
    type: 1

    };
    $scope.websites.splice(modifyIndex,1, updatedItem);
    $scope.calcTotalCosts();
 }

  $scope.addSign = function(newSign)
 {

 //	console.log(newWebsite);
    $scope.totalSignCosts = ((($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.m2) +  ($scope.newSign.option*$scope.newSign.p1) + ($scope.newSign.option*$scope.newSign.p2)) * $scope.newSign.qty);
    $scope.totalHours = ($scope.newSign.designTime * $scope.rate) + (($scope.newSign.productionTime*$scope.rate)*$scope.newSign.qty) + (($scope.newSign.installationTime*$scope.rate)*$scope.newSign.qty);
 	$scope.websites.push({
 		name:$scope.newSign.description,
 		quantity:$scope.newSign.qty,
 		width:$scope.newSign.width,
 		height:$scope.newSign.height,
 		m1:$scope.newSign.m1,
 		m2:$scope.newSign.m2,
 		p1:$scope.newSign.p1,
 		p2:$scope.newSign.p2,
 		hours: parseFloat($scope.newSign.designTime) + (parseFloat($scope.newSign.productionTime)*$scope.newSign.qty) + (parseFloat($scope.newSign.installationTime)*$scope.newSign.qty),
    designTime:$scope.newSign.designTime,
 		productionTime:$scope.newSign.productionTime,
 		installationTime:$scope.newSign.installationTime,
    message: $scope.newSign.message,
    signs: parseFloat(((($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.m2) +   ($scope.newSign.option*$scope.newSign.m1) +  ($scope.newSign.option*$scope.newSign.p1) + ($scope.newSign.option*$scope.newSign.p2)) * $scope.newSign.qty)),
 		cost:  $scope.totalSignCosts + ($scope.totalSignCosts * (parseFloat($scope.newSign.markUp)/100)) + $scope.totalHours,
    type: 1
 	}
 		);
 	$scope.qItems++;
 	$scope.calcTotalCosts();




 };
   $scope.removeItem = function(index){
    $scope.websites.splice(index, 1);
    $scope.calcTotalCosts();
  };
  $scope.cloneItem = function(index){
  	$scope.websites.push($scope.websites[index]);
  	$scope.calcTotalCosts();
  };
  //newLogo.description = "Hello";
  $scope.modify = function(index)
  {
    console.log("modify entered");
    console.log("modifying at: " + index);
    /*console.log($scope.websites[index].name);
    console.log($scope.websites[index].hours);
    console.log($scope.websites[index].message);*/
    modifyIndex = index;
    if($scope.websites[index].type == 2)
    {
          $scope.newLogo.description = $scope.websites[index].name;
          $scope.newLogo.designTime = $scope.websites[index].hours;
          $scope.newLogo.message = $scope.websites[index].message;
          console.log("found Logo");
    }
    else if($scope.websites[index].type == 0)
    {
          $scope.newWebsite.description = $scope.websites[index].name;
          $scope.newWebsite.pages = $scope.websites[index].pages;
          $scope.newWebsite.designTime = $scope.websites[index].hours;
          $scope.newWebsite.cms = $scope.websites[index].cms;
          $scope.newWebsite.message = $scope.websites[index].message;
          console.log("found website");
    }
    else if($scope.websites[index].type == 1)
    {
          $scope.newSign.description = $scope.websites[index].name;
          $scope.newSign.qty = $scope.websites[index].quantity;
          $scope.newSign.width = $scope.websites[index].width;
          $scope.newSign.height = $scope.websites[index].height;
          $scope.newSign.m1 = $scope.websites[index].m1;
          $scope.newSign.m2 = $scope.websites[index].m2;
          $scope.newSign.p1 = $scope.websites[index].p1;
          $scope.newSign.p2 = $scope.websites[index].p2;
          $scope.newSign.designTime = $scope.websites[index].designTime;
          $scope.newSign.productionTime = $scope.websites[index].productionTime;
          $scope.newSign.installationTime = $scope.websites[index].installationTime;
          $scope.newSign.message = $scope.websites[index].message;
      console.log("found Sign");
    }
    else
    {
      console.log("found nothing!");
    }
    $scope.calcTotalCosts();

   //console.log(newLogo);

  }

    $scope.getSpecs = function(website)
  {
      var specs = '';
      //console.log("getSpecs has run");
      if (website.hasOwnProperty('width'))
      {
        specs = 'Dimensions: ' + website.width + 'm ' + 'x' + website.height + ' m' + ', quantity: ' + website.quantity;
        return specs;
      }
  };
  $scope.genPDF = function()
  {
  	window.print();

  }
  $scope.calcTotalCosts = function()
  {
  	$scope.totalCost = 0;
  	for(i=0; i < $scope.websites.length; i++)
  	{
  		$scope.totalCost = $scope.totalCost + $scope.websites[i].cost;
  	}
  }

  $scope.open = function () {
    $scope.searchQoutes();
    var modalInstance = $modal.open({
      templateUrl: 'assets/js/views/searchWindow.html',
      controller: 'ModalInstanceCtrl',
            resolve: {
        qoutesIDs: function () {
          return $scope.qoutesIDs;
        }
        }    
      });

      modalInstance.result.then(function (selected) 
  {
      $scope.read(selected);
  }, function () 
  {
      $console.log(selected + ' read.');
  });
  };




});