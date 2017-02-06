<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>See N Say</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css" type="text/css" />
</head>

<body>
	<div class="container">
		<!--<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modal">Open Modal</button>-->
		<div class="modal fade" id="modal" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">The <span id="animal">Cow</span> says:</h4>
					</div>
					<div class="modal-body">
						<p><span id="answer"></span></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>

		<div class="row">
			<div class="col-xs-12">
				<h1>See N Say</h1>
				<p>Welcome to See N Say, where we make the decisions you are incapable of! You infant...</p>
			</div>
		</div>

		<div class="row" id="workspace">
			<div class="col-lg-7 col-lg-push-5" id="Spinner">
				<div id="wrap">
					<svg id="handle"></svg>
					<svg id="canvas"></svg>
					<svg id="plate"></svg>
					<svg id="arrow-face"></svg>
					<svg id="arrow"></svg>
					<div id="click-face"></div>
				</div>
			</div>
			<div class="col-lg-5 col-lg-pull-7" id="list">

				<div class="row" id="el-head">
					<h2>Answer options:</h2>
					<div class="col-xs-5 col-md-9">
						<input type="text" class="form-control" id="add-input">
					</div>
					<div class="col-xs-3">
						<button id="add" class="btn btn-default">+</button>
					</div>
				</div>
				<h3>Your Choices:</h3>
				<div class="row scrollbar" id="sb_style">
					<ul class="list-group" id="el-list">
					</ul>
				</div>
			</div>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script type="text/javascript" src="script.js"></script>
</body>

</html>