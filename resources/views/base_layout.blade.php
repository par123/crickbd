<!DOCTYPE html>
<html xmlns:https="http://www.w3.org/1999/xhtml">
<head>
    <title>CricBD</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    {{--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"></script>--}}
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Patua+One" rel="stylesheet">

    <style>

    </style>
    <link rel="stylesheet" href="/assets/css/base_layout.css">
</head>


<body>
<div class="body-wrap">
    <div class="container">
        <nav class="navbar navbar-default navbar-fixed-top navbar-design" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/" style="color: #000;font-family: 'Patua One', cursive;">CricBD</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/match">Match</a></li>
                        <li><a href="/match/create">Create Match</a></li>
                        <li><a href="/login">login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/mygames">Admin Panel</a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
    </div>


    @yield('page_content')

</div>
<div class="col-md-12" style="margin: 0;padding: 0;">
    <footer id="footer">
        <div>
            <ul class="icons">
                <li><a href="" class="fa fa-twitter"><span class="label">Twitter</span></a></li>
                <li><a href="" class="fa fa-facebook"><span class="label">Facebook</span></a></li>
                <!--<li><a href="#" class="fa fa-instagram"><span class="label">Instagram</span></a></li>-->
                <!--<li><a href="#" class="fa fa-envelope-o"><span class="label">Email</span></a></li>-->
            </ul>
        </div>
        <div class="copyright">
            &copy; CricBD 2018. All rights reserved.
        </div>
    </footer>
</div>

</body>
</html>