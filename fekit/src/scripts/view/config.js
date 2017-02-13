angular.module("myapp")
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/index/home");
		$stateProvider
			.state("index",{
				url:"/index",
				templateUrl:"./src/scripts/template/index.html",
				controller:"indexCtrl"
			})
			.state("guide",{
				url:"/guide",
				templateUrl:"./src/scripts/template/guide.html",
				controller:"guideCtrl"
			})
			.state("index.home",{
				url:"/home",
				templateUrl:"./src/scripts/template/home.html",
				controller:"homeCtrl"
			})
			.state("index.search",{
				url:"/search",
				templateUrl:"./src/scripts/template/search.html"
			})
			.state("index.my",{
				url:"/my",
				templateUrl:"./src/scripts/template/my.html"
			})
			.state("index.exit",{
				url:"/exit",
				templateUrl:"./src/scripts/template/exit.html"
			})
			.state("index.camera",{
				url:"/camera",
				templateUrl:"./src/scripts/template/camera.html"
			})
			.state("detail",{
				url:"/detail",
				templateUrl:"./src/scripts/template/detail.html",
				controller:"detailCtrl",
				params:{
					data:{}
				}
			})


	})
	.controller("guideCtrl",function($scope,$state){
			new Swiper(".guide")
			$scope.goHome=function(){
				$state.go("index.home")
				
			}
	}) 
	.controller("homeCtrl",function($scope,$http,$state,$timeout){
		//头部的热点和关注
		$(".hot span").on("click",function(){
			var n=$(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			topswiper.slideTo(n)
		})
		var topswiper=new Swiper(".main",{
			onSlideChangeStart:function(swiper){
				var index=swiper.activeIndex;
				console.log(index)
				$(".hot span").eq(index).addClass("active").siblings().removeClass("active");
			}
		})
		//足球现场的swiper,加导航部分的current添加
		$("#list li").on("click",function(){
			var inde=$(this).index();
			$(this).addClass("current").siblings().removeClass("current");
			myswiper.slideTo(inde)
		})
		
			new IScroll(".swiper-slide")
			
		

		var myswiper=new Swiper(".article",{
			onSlideChangeStart:function(swiper){
				var ind=swiper.activeIndex;
			//	console.log(ind)
				$("#list li").eq(ind).addClass("current").siblings().removeClass("current")
			}
		})
		//new Swiper(".article")
		//图片数据的请求
		$http.get("./src/scripts/lib/livelist.json")
			.success(function(data){
				console.log(data.data)
				$scope.arr=data.data
			})
		//new IScroll(".article")

		//足球现场的swiper
		$scope.detail=function(id){
			var obj={}
			angular.forEach($scope.arr,function(value,i){
				if(value.id==id){
					obj=value
				}
			})
			$state.go("detail",{
				data:obj
			})
		}
	})
	.controller("detailCtrl",function($scope,$stateParams,$state){
		//console.log($stateParams)
		$scope.details=$stateParams.data;
		console.log($scope.details)

		/*返回主页*/
		$scope.back=function(){
			$state.go("index.home")
		}
	})  
	.controller("indexCtrl",function($scope){
		
	})  
