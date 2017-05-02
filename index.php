<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<title>See N Say</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

	<link href="https://fonts.googleapis.com/css?family=Roboto|Ubuntu|Bowlby+One" rel="stylesheet">
	<link rel="stylesheet" href="style.css" type="text/css" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
	<div id="title" class="container-fluid">
		<div class="col-xs-12" id="header">
			<div class="col-md-8 col-md-offset-2" id="nameplate">
				<h1>See N Say</h1>
				<p>Decisions made for you by &nbsp; <strong id="tagline">&lt; C / K / Y &gt;</strong></p>
			</div>
		</div>
	</div>
	<div id="content" class="container">
		<!--<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modal">Open Modal</button>-->
		<div class="modal fade" id="modal" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
						<div class="square" id="animalpic">

						</div>
						<h3 class="modal-title">The <span id="animal">Cow</span> says:</h3>
					</div>
					<div class="modal-body">
						<p><span id="answer"></span></p>
					</div>
				</div>

			</div>
		</div>



		<div class="row" id="workspace">
			<div class="col-md-7 col-md-push-5" id="Spinner">
				<div id="wrap">
					<svg id="handle"></svg>
					<svg id="canvas"></svg>
					<svg id="plate"></svg>
					<svg id="arrow-face"></svg>
					<svg id="arrow"></svg>
					<div id="click-face"></div>
				</div>
			</div>
			<div class="col-md-5 col-md-pull-7" id="list">
				<div id="el-head">
					<h3>Answer options:</h3>
					<div class="col-xs-10 col-md-9">
						<input type="text" class="form-control" id="add-input">
					</div>
					<div class="col-xs-2">
						<button id="add" class="btn btn-focus">+</button>
					</div>
				</div>
				<div id="el">
					<h3>Your Choices:</h3>
					<div class="list-container">
						<div class="row scrollbar" id="sb_style">
							<ul class="list-group" id="el-list">
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12" id="info">
				<h3>About this project</h3>
				<p>This Virtual See-N-Say is a basic desision maker. <br /> You can add as many answer options as you would like, and the See-N-Say will select one for you! <br />
					<br /> This application uses Javascript to generate, select, and animate the application, so it is required for your browser to operate the See-N-Say! <br/>
					<br /> Feel free to check this project, and others like it on my website or on GitHub:
				</p>
				<div class="col-xs-6 col-md-6">
					<a href="https://github.com/hawasian/see-n-say" class="btn btn-focus" target="_blank">GitHub &nbsp;&nbsp;<i class="fa fa-github-alt" aria-hidden="true"></i></a>
				</div>
				<div class="col-xs-6 col-md-6">
					<a href="http://www.connorkyoung.com" class="btn btn-focus" target="_blank">My Site &nbsp;&nbsp;<i class="fa fa-rss" aria-hidden="true"></i></a>
				</div>
			</div>
		</div>
	</div>

	<div class="footer container-fluid">
		<div class="container">
			<div class="col-xs-12 col-md-6" id="cright">Copyright <i class="fa fa-copyright" aria-hidden="true"></i> 2017 Connor Young</div>
			<div class="col-xs-12 col-md-6" id="homelink"><a href="http://www.connorkyoung.com" target="_blank">connorkyoung.com</a></div>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script type="text/javascript" src="script.js"></script>
</body>

</html>