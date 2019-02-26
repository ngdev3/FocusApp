<?php include 'header.php';?>


<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container no-padding">
			<ul class="nav navbar-nav top_header">
				<li class="menu_icon back_icon"><a href="javascript:void(0)"  ><img style="width:13px;" src="assets/img/icon/back.png" id="asdf" alt="menu icon" /></a></li>
				<li class="logo_name"><a class="text-left back">Notification</a></li>
			  
			</ul>
			
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>
<!-- END HEADER -->
<div class="notification pl-10 pr-10 pt-10 mt-50"> 
    <div class="notification_div">
	    <div class="notify_icon_div">
			<div class="notification_icon">
				<i class="fa fa-bell-o" aria-hidden="true"></i>
			</div>
		</div>	
		<div class="notification_detail">
		    <h3>Welcome to FOCUS APP</h3>
			<p>This is where you will see your personalized offers</p>
			<p><span>1 days ago</span></p>
		</div>
	</div>
	 	
</div>
<script>

    $('.digit1 input').keyup(function(){
        if($(this).val().length==$(this).attr("maxlength")){
            $(this).next().focus();
        }
    });

</script>	
<?php include 'footer.php';?>