app.controller('buisnessDashboardCtrl', ['$scope', 'commonService', '$rootScope','httpService','CONSTANTS',
		function ($scope, commonService, $rootScope, httpService, CONSTANTS) {
				init();
				function init()
				{
					$rootScope.isLogin = true;
						commonService.checkUserLoggedIn();
						$scope.potentialJobsIndicator = false;
						$scope.jobsInProgressIndicator = false;
						$scope.jobsNeedActionIndicator = false;
						$scope.jobsCompletedIndicator = false;
						$scope.invoicesIndicator = false;
						$scope.deleteMsg = false;
						$scope.assignMsg = false;
						$scope.reviewsIndicator = false;
						$scope.anchorDisable = true;
						$scope.buisnessDashboardIndicator = true;
						$scope.reviewDetail = {};
						$scope.ratingList=[1,2,3,4,5];
						getDateList();
						//Fetch task posters's history
						//This is actually customer.
						getBuisnessTaskOpen(); // It will fetch list of task posted by user.

						getMessageOnDashBoard();

				}
				function getPersonalMessagesForAllTask()
				{

								var userId = commonService.getUserid();
								var messages = {};
							 // messages.taskId = taskId;
								//messages.poster_userid = userId;
								$rootScope.loaderIndicator = true;
								httpService.getPersonalMessage(messages).then(function (data) {
										if (data.data.data.length >= 1) {
												$scope.messageList = data.data.data;
												$rootScope.loaderIndicator = false;

										} else {
												$rootScope.loaderIndicator = false;
										}
								});


				}
				$scope.changedValue= function(rating){
						$scope.ratingList=[];
						rating=rating==undefined?5:rating;
						for (var i = 1; i <= rating; i++) {
								$scope.ratingList.push(i);
						}
				}
				function getMessageOnDashBoard(){
						var userId = commonService.getUserid();
						$scope.userId = userId;
								$rootScope.loaderIndicator = true;
								httpService.getMessageOnDashBoard(userId).then(function (data) {
										if (data.data.data.length >= 1) {
												$scope.reviewsIndicator = false;
												$scope.dashboardMessage = data.data.data;
												$rootScope.loaderIndicator = false;

										} else {
												$rootScope.loaderIndicator = false;
												$scope.reviewsIndicator = true;
										}
								});
				}
				function getDateList() {
						$scope.dayArray = [];
						for (var i = 1; i <= 9; i++) {
								$scope.dayArray.push('0' + i);
						}


						$scope.monthArray = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
						var year = (new Date()).getFullYear()
						$scope.yearArray = [];
						for (var i = year ; i <= 2067; i++) {
								$scope.yearArray.push(i);
						}
				}

				$scope.openSelectedtaskInDetail = function (data) {

						//$('#OpenTaskModal').modal('toggle');
						$("#OpenTaskModal").modal({ backdrop: "static" });
						$('#OpenTaskModal').modal({ backdrop: 'static', keyboard: false }, 'show');
						$scope.cardDetails = {};
						$scope.taskDetail = {};
						$scope.taskDetail = data;
						$scope.taskDetail.category_Detail = {};
						$scope.taskDetail.category_question = angular.fromJson(data.category_question);
						getInterestedUsersList(data.id);
						getTaskDetail();

						if ($scope.taskDetail.isPaymentMade == "false")
						{
								//get card details if exists.
								getCardDetails();

						}

				}
				function getTaskDetail()
				{
						switch ($scope.taskDetail.category.name) {
								case CONSTANTS.CATEGORY.Catering:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.cateringType] = $scope.taskDetail.category_question['cateringType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.mealType] = $scope.taskDetail.category_question['mealType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.drinkType] = $scope.taskDetail.category_question['drinkType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.menuRequests] = $scope.taskDetail.category_question['menuRequests'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.waitingRequire] = $scope.taskDetail.category_question['waitingRequire'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.dietaryRequirement] = $scope.taskDetail.category_question['dietaryRequirement'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.totalCost] = $scope.taskDetail.category_question['totalCost'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.costType] = $scope.taskDetail.category_question['costType'];
										break;
								case CONSTANTS.CATEGORY.Cleaning:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleanersNeeded] = $scope.taskDetail.category_question['cleanersNeeded'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist] = $scope.taskDetail.category_question['cleaningChecklist'];
										//JSON.stringify($scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]);

										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.equipmentRequired] = $scope.taskDetail.category_question['equipmentRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.timeRequired] = $scope.taskDetail.category_question['timeRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.totalCost] = $scope.taskDetail.category_question['totalCost'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.costType] = $scope.taskDetail.category_question['costType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]
											 = $scope.taskDetail.category_question['cleaningChecklist'].join([separator = ',']);
										break;
								case CONSTANTS.CATEGORY.Patisserie:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.cakeTypes] = $scope.taskDetail.category_question['cakeTypes'].join([separator = ',']);
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.describeReq] = $scope.taskDetail.category_question['describeReq'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertType] = $scope.taskDetail.category_question['desertType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.dietaryRequirement] = $scope.taskDetail.category_question['dietaryRequirement'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.numberOfDesert] = $scope.taskDetail.category_question['numberOfDesert'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.costType] = $scope.taskDetail.category_question['costType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.totalCost] = $scope.taskDetail.category_question['totalCost'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertImages] = $scope.taskDetail.category_question['desertImages'];

										break;
								case CONSTANTS.CATEGORY.Waiting_Staff:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCode] = $scope.taskDetail.category_question['dressCode'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCodeDescription] = $scope.taskDetail.category_question['dressCodeDescription'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCost] = $scope.taskDetail.category_question['totalCost'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalWaiter] = $scope.taskDetail.category_question['totalWaiter'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.waitersTask] = $scope.taskDetail.category_question['waitersTask'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.bartender_count] = $scope.taskDetail.category_question['bartender_count'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.is_bartender_req] = $scope.taskDetail.category_question['is_bartender_req'];

										break;
								case CONSTANTS.CATEGORY.Graphic_Design:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.totalBudgetForbanners] = $scope.taskDetail.category_question['totalBudgetForbanners'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.numberOfBanners] = $scope.taskDetail.category_question['numberOfBanners'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.designPrinted] = $scope.taskDetail.category_question['designPrinted'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.additionalInformation] = $scope.taskDetail.category_question['additionalInformation'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicBanners] = $scope.taskDetail.category_question['graphicBanners'].join([separator = ',']);
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicImages] = $scope.taskDetail.category_question['graphicImages'];
										break;
								case CONSTANTS.CATEGORY.Supply_Hire:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.decriptionInDetail] = $scope.taskDetail.category_question['decriptionInDetail'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.returnSupplies] = $scope.taskDetail.category_question['returnSupplies'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.IscleaningPriceToBeIncluded] = $scope.taskDetail.category_question['IscleaningPriceToBeIncluded'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.supplyTypes] = $scope.taskDetail.category_question['supplyTypes'].join([separator = ',']);;
										break;
								case CONSTANTS.CATEGORY.Hair_and_Beauty:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.hairStyleRequired] = $scope.taskDetail.category_question['hairStyleRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.location] = $scope.taskDetail.category_question['location'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.makeUpTypeRequired] = $scope.taskDetail.category_question['makeUpTypeRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.needToBring] = $scope.taskDetail.category_question['needToBring'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.specialRequestsForHairStyle] = $scope.taskDetail.category_question['specialRequestsForHairStyle'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.specialRequirement] = $scope.taskDetail.category_question['specialRequirement'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.serviceType] = $scope.taskDetail.category_question['serviceType'].join([separator = ',']);
										if($scope.taskDetail.category_question['hairType'])
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.hairType] = $scope.taskDetail.category_question['hairType'].join([separator = ',']);;;

										break;
								case CONSTANTS.CATEGORY.Entertainment_and_talent:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.entertainerRequired] = $scope.taskDetail.category_question['entertainerRequired'].join([separator = ',']);
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.equipmentReadyForTalent] = $scope.taskDetail.category_question['equipmentReadyForTalent'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.thingsRequiredForTalent] = $scope.taskDetail.category_question['thingsRequiredForTalent'];
										break;
								case CONSTANTS.CATEGORY.Car_and_Venue_Hire:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.carType] = $scope.taskDetail.category_question['carType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.hireType] = $scope.taskDetail.category_question['hireType'].join([separator = ',']);;
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCars] = $scope.taskDetail.category_question['totalCars'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCost] = $scope.taskDetail.category_question['totalCost'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueCleaning] = $scope.taskDetail.category_question['venueCleaning'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueType] = $scope.taskDetail.category_question['venueType'];
										break;
								case CONSTANTS.CATEGORY.Floristry:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.arrangementPresentation] = $scope.taskDetail.category_question['arrangementPresentation'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.costType] = $scope.taskDetail.category_question['costType'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.flowersRequiredDescription] = $scope.taskDetail.category_question['flowersRequiredDescription'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.specialRequestDesc] = $scope.taskDetail.category_question['specialRequestDesc'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.totalCost] = $scope.taskDetail.category_question['totalCost'];
										break;
								case CONSTANTS.CATEGORY.Photography_Videography:
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.eventRequirement] = $scope.taskDetail.category_question['eventRequirement'].join([separator = ',']);;;
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalPhotographerRequired] = $scope.taskDetail.category_question['totalPhotographerRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.additionalComments] = $scope.taskDetail.category_question['additionalComments'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.placesRequiredForPhotographers] = $scope.taskDetail.category_question['placesRequiredForPhotographers'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.servicesRequired] = $scope.taskDetail.category_question['servicesRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.servicesRequiredVideographer] = $scope.taskDetail.category_question['servicesRequiredVideographer'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalvideographerRequired] = $scope.taskDetail.category_question['totalvideographerRequired'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalGuestVideography] = $scope.taskDetail.category_question['totalGuestVideography'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.placesRequiredForVideographer] = $scope.taskDetail.category_question['placesRequiredForVideographer'];
										$scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.additionalCommentsVideographer] = $scope.taskDetail.category_question['additionalCommentsVideographer'];

										break;
								default:
						}
				}
				$scope.openProgresstaskInDetail = function(data)
				{
						$scope.showFeedbackForm=true;
						$('#progressTaskModal').modal('toggle');
						$("#progressTaskModal").modal({ backdrop: "static" });
						$('#progressTaskModal').modal({ backdrop: 'static', keyboard: false }, 'show');
						$scope.userId = commonService.getUserid();
						$scope.taskDetail = {};
						$scope.taskDetail = data;
						$scope.taskDetail.category_Detail = {};
						$scope.taskDetail.category_question = angular.fromJson(data.category_question);
						$scope.messageUser = false;
						getMessages(data.id);
						getTaskDetail();
						$("#assignBtn").attr('disabled', 'disabled');

				}
				function getInterestedUsersList(taskid)
				{
						$rootScope.loaderIndicator = true;
						$scope.taskid = taskid;
						httpService.getInterestedUsersList(taskid).then(function (response) {
								$rootScope.loaderIndicator = false;
								if(response.data.code == 200)
								{
										$scope.interestedUsersList = response.data.data;
										$scope.interestedUsersListCount = $scope.interestedUsersList.length;
								}
								else
								{
										$scope.interestedUsersListCount = 0;
								}
						});
				}
				function getMessages(taskId){
						var userId = commonService.getUserid();
						var messages = {};
								messages.taskId = taskId;
								messages.poster_userid = userId;
								$rootScope.loaderIndicator = true;
								httpService.getPersonalMessage(messages).then(function (data) {
										if (data.data.message == "Success") {
												//get comment list
												$scope.commentDescription = "";
												$scope.commentList = data.data.data;
												$scope.countIndicator = $scope.commentList.length;
												$rootScope.loaderIndicator = false;
												$scope.CommentRecordIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.messageUser = false;
										} else {
												$rootScope.loaderIndicator = false;
										}
								});

				}
				function getCardDetails() {
						var userId = commonService.getUserid();
						var user = {
								"userId": userId
						}
						$rootScope.loaderIndicator = true;
						httpService.getCardDetails(user).then(function (response) {
								$rootScope.loaderIndicator = false;
								if($scope.taskDetail.isPaymentMade== "false"){
										if (response.data.message == "No card added yet!") {
										$scope.cardDetailsAlreadySaved = false;
										$scope.NoCardDetailsFound = true;

								}
								else {
										$scope.card = {};
										$scope.card = response.data.result[0];
										$scope.cardDetailsAlreadySaved = true;
										$scope.NoCardDetailsFound = false;

								}
								} else {
										$scope.cardDetailsAlreadySaved = false;
										$scope.NoCardDetailsFound = false;
								}

						});
				}

				$scope.calculateCharges = function(amount)
				{
					 // $scope.serviceCharges = amount * 0.1;
						$scope.totalPaymentMade = amount + $scope.serviceCharges;
				}
				$scope.makePaymentByAddingCard = function (cardDetails, paymentForm, amount)
				{
						paymentForm.$setSubmitted(true);
						if (paymentForm.$valid) {
								if (true) {
										$rootScope.loaderIndicator = true;
										$scope.cardDetails.userId = commonService.getUserid();
										$scope.cardDetails.taskId = $scope.taskid;
										$scope.cardDetails.amount = amount;
										httpService.makePayment($scope.cardDetails).then(function (result) {
												if (result.data.message == 'Payment has been successfully done!' && result.data.success == true) {
												$rootScope.loaderIndicator = false;
												paymentForm.$setPristine();
												paymentForm.$setUntouched();
												$scope.successMessageIndicator = true;
												$scope.errorMessageIndicator = false;
												$scope.message = "Payment done successfully.Please assign task.";
												$scope.cardDetails = {};
												$("#assignBtn").removeAttr('disabled');
												} else {
												$rootScope.loaderIndicator = false;
												paymentForm.$setPristine();
												paymentForm.$setUntouched();
												$scope.successMessageIndicator = false;
												$scope.errorMessageIndicator = true;
												$scope.message = result.message;
												$scope.cardDetails = {};
												}

										});
								}
								else
								{
										$scope.errorMessageIndicator = false;
										$scope.message = "Please enter required details.";
								}
						} else {
									$scope.errorMessageIndicator = true;
									$scope.message = "Please enter required details.";
						}
				}
				$scope.assignTaskToUser = function (item)
				{
						if ($scope.paymentMadeBeforeAssignment || $scope.taskDetail.isPaymentMade == "true")
						{
								$rootScope.loaderIndicator = true;
								$scope.assignTask = {};
								$scope.assignTask.taskId = item.taskId;
								$scope.assignTask.taskPostedUserID = item.taskPostedUserID;
								$scope.assignTask.assignUserID = item.showInterestedUserID;
								$scope.assignTask.taskStatus = "assigned";
								httpService.assignUser($scope.assignTask).then(function (response) {
										$('#OpenTaskModal').modal('hide');
										alert("task assigned successfully");
										getBuisnessTaskOpen();
										$rootScope.loaderIndicator = false;
								});
						}
						else {
								alert("please make payment before assigning a task.");
						}
				}

				$scope.makePayment = function(amount)
				{
						if (amount > 0 )
						{
								var paymentDetail = {};
								$scope.amountMessage = "";
								$scope.amountIndicator = false;
								paymentDetail.card_id = $scope.card.card_id;
								//paymentDetail.card_id = "CARD-2KA98699N6290702ULJH2SYQ";
								paymentDetail.amount = amount;
								paymentDetail.userId = commonService.getUserid();
								paymentDetail.taskId = $scope.taskid;
								paymentDetail.first_name = $scope.card.first_name;
								paymentDetail.last_name = $scope.card.last_name;
								$rootScope.loaderIndicator = true;
								httpService.paymentByCard(paymentDetail).then(function (response) {
										$rootScope.loaderIndicator = false;
										if (response.data.success == false)
										{
												$scope.paymentMadeBeforeAssignment = false;
												$scope.paymentSuccessMessage = "Payment failed ! Credit card was refused."
										}
										else
										{
												$scope.paymentMadeBeforeAssignment = true;
												$scope.paymentSuccessMessage = "Payment successfull. Please proceed to assign task.";
												$("#assignBtn").removeAttr('disabled');
										}
								});
						}
						else {
								$scope.amountIndicator = true;
								$scope.amountMessage = "Please enter valid amount";
						}
				}

				$scope.deleteTask = function(data)
				{
						var r = confirm("Are you sure you want to delete this task ?");
						if (r == true) {
								httpService.deleteTask(data.id).then(function (response) {
										$('#OpenTaskModal').modal('hide');
										getBuisnessTask();
								});
						}

				}
				function getBuisnessTaskOpen()
				{
						$rootScope.loaderIndicator = true;
						httpService.getBuisnessTask($rootScope.userID).then(function (response) {
								console.log(response);
								if (response.data.code == 200) {
										$rootScope.loaderIndicator = false;
										$scope.openTask = [];
										$scope.progressTask = [];
										$scope.looking_user_offers = [];
										if(response.data.data.open)
										{
												$scope.potentialJobsIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.openTask = response.data.data.open;
										}
										if (response.data.data.assigned) {
												$scope.jobsInProgressIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.progressTask = response.data.data.assigned;
												getPersonalMessagesForAllTask();
										}
										if (response.data.data.looking_user_offers) {
												$scope.looking_user_Indicator = true;
												$rootScope.loaderIndicator = false;
												$scope.looking_user_offers = response.data.data.looking_user_offers[0];

										}

								}
								else if (response.data.code == 404) {
										$rootScope.loaderIndicator = false;
										$scope.potentialJobsIndicator = false;
										$scope.jobsInProgressIndicator = false;
										$scope.looking_user_Indicator = false;
										$scope.openTask = [];
								}
						});
				}

				$scope.addCommentChange = function () {
						if ($scope.commentDescription && $scope.commentDescription != "") {
								$scope.anchorDisable = false;
						}
						else {
								$scope.anchorDisable = true;
						}
				}

				$scope.addComment = function () {
						if ($scope.commentDescription) {
								var comment = {};
								comment.comments = $scope.commentDescription;
								comment.taskId = $scope.taskDetail.id;
								comment.userId = commonService.getUserid();
								$rootScope.loaderIndicator = true;
								httpService.addPersonalMessage(comment).then(function (data) {
										if (data.data.message == "Message added successfully.") {
												//get comment list
												$scope.commentDescription = "";
												getMessages($scope.taskDetail.id);
												$rootScope.loaderIndicator = false;
												$scope.messageUser = false;
										}
								});
						}
				}
				$scope.getAllComments = function (taskId) {
						$scope.commentList = {};
						httpService.getAllComment(taskId).then(function (data) {
								$rootScope.loaderIndicator = true;
								if (data.data.message == 'Comments list') {
										//get comment list
										$scope.commentList = data.data.data;
										$scope.countIndicator = $scope.commentList.length;
										$rootScope.loaderIndicator = false;
										$scope.CommentRecordIndicator = true;
								}
								if (data.data.message == 'Record not found!') {
										this.commentIndicator = false;
										$rootScope.loaderIndicator = false;
										$scope.CommentRecordIndicator = false;
								}
								else {
										this.commentIndicator = false;
										$rootScope.loaderIndicator = false;
								}
						});
				}
				$scope.messageView = function()
				{
						$scope.messageUser = true;
						$scope.commentDescription = "";
				}
				function getCustomerTask() {
						$rootScope.loaderIndicator = true;
						httpService.getCustomerTask($rootScope.userID).then(function (response) {
								console.log(response);
								if (response.data.code == 200) {
										$scope.openTaskCustomer = [];
										$scope.progressTaskCustomer = [];
										$rootScope.loaderIndicator = false;
										if (response.data.data.open) {

												$scope.potentialJobsCustomerIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.openTaskCustomer = response.data.data.open;
										}
										if (response.data.data.assigned) {
												$scope.jobsInProgressCustomerIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.progressTaskCustomer = response.data.data.assigned;
										}
										if (response.data.data.completed) {
												$scope.jobsCompletedCustomerIndicator = true;
												$rootScope.loaderIndicator = false;
												$scope.completedTaskCustomer = response.data.data.completed;
										}

								}
								else if (response.data.code == 404) {
										$rootScope.loaderIndicator = false;
										$scope.potentialJobsCustomerIndicator = false;
										$scope.jobsInProgressCustomerIndicator = false;
										$scope.openTaskCustomer = [];
								}
						});
						//get recommendation task
						var userId = commonService.getUserid();
						$rootScope.loaderIndicator = true;
						httpService.getRecommendationTask(userId).then(function (res) {
								if (res.data.code == 200 && res.data.message == "Recommended Task") {
										$scope.recommendationJobsCustomerIndicator = true;
										$rootScope.loaderIndicator = false;
										$scope.recommendedTaskCustomer = res.data.data;

								}
								else
								{
										$scope.recommendationJobsCustomerIndicator = false;
										$rootScope.loaderIndicator = false;
								}
						});

				}
				$scope.showBuisnessTab = function()
				{
						$scope.buisnessDashboardIndicator = true;
						$scope.customerDashboardIndicator = false;
				}
				$scope.showCustomerTab = function () {
						$scope.buisnessDashboardIndicator = false;
						$scope.customerDashboardIndicator = true;
						getCustomerTask()
				}
				$scope.completeTask = function (data) {
				 if ($scope.reviewDetail.review&&$scope.reviewDetail.doersRating) {
								$scope.reviewErrorMessageIndicator=false;
								$rootScope.loaderIndicator = true;
								var task = {};
								var id = data.id;
								task.task_status = "completed";
								httpService.updateTask(id, task).then(function (response) {
										$('#progressTaskModal').modal('hide');
										getBuisnessTaskOpen();
										alert("task completed");
										$rootScope.loaderIndicator = false;
								});
						} else {
								 $scope.reviewErrorMessageIndicator=true;
								 $scope.reviewMessage = "Please enter the review";
						}
				}
				$scope.submitReview=function(reviewDetail,reviewForm) {
							 reviewForm.$setSubmitted(true);
						 if (reviewForm.$valid) {
								$scope.reviewErrorMessageIndicator=false;
								$scope.reviewDetail.feedback=[{"name":$scope.taskDetail.event_title},{"messge":reviewDetail.review}];
								$scope.reviewDetail.review_rating=[{"name":$scope.taskDetail.event_title},{"rating":reviewDetail.doersRating}];
								httpService.updateProfile($scope.taskDetail.seeker_user_id,$scope.reviewDetail).then(function (result) {
									 $scope.showFeedbackForm=false;
									 $scope.feedbackMessage="Thank You for your valuable feedback";
//                        if (result.data.message == 'Payment has been successfully done!' && result.data.success == true) {
//                        $rootScope.loaderIndicator = false;
//                        paymentForm.$setPristine();
//                        paymentForm.$setUntouched();
//                        $scope.successMessageIndicator = true;
//                        $scope.errorMessageIndicator = false;
//                        $scope.message = "Payment done successfully.Please assign task.";
//                        $scope.cardDetails = {};
//                        $("#assignBtn").removeAttr('disabled');
//                        } else {
//                        $rootScope.loaderIndicator = false;
//                        paymentForm.$setPristine();
//                        paymentForm.$setUntouched();
//                        $scope.successMessageIndicator = false;
//                        $scope.errorMessageIndicator = true;
//                        $scope.message = result.message;
//                        $scope.cardDetails = {};
//                        }
//
										});
						 }else {
								$scope.reviewErrorMessageIndicator=true;
								$scope.reviewMessage = "Please enter the review";
						 }
								 }
				$scope.onReply = function (item) {
						$('#item_' + item.id).show();
						$scope.anchorDisable = true;
				}

				$scope.addCommentReplyChange = function (replyCommentDesc) {
						if (replyCommentDesc && replyCommentDesc != "") {
								$scope.anchorReplyDisable = false;
						}
						else {
								$scope.anchorReplyDisable = true;;
						}
				}

				$scope.checkIfReplyExists = function (id, List) {
						$scope.repliedObjectList = {};
						$scope.repliedObjectList = $.grep(List, function (x) {
								return x.commentId === id;
						});
						if ($scope.repliedObjectList.length > 0) {
								return true;
						}
						else {
								return false;
						}
				}

				$scope.replyComment = function (replyCommentDesc, commentId) {
						var comment = {};
						comment.commentDescription = replyCommentDesc;
						comment.taskId = $scope.taskDetail.id;
						comment.userId = commonService.getUserid();
						comment.commentId = commentId;
						$rootScope.loaderIndicator = true;;
						httpService.replyComment(comment).then(function (data) {
								if (data.data.message == 'Comment replied!') {
										$scope.replyCommentDesc = "";
										$scope.getAllComments($scope.taskDetail.id);
										comment = {};
								}
						});
				}

}])
