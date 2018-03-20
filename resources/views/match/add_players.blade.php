@extends('base_layout')


@section('page_content')

    {{--CSS--}}
    <link rel="stylesheet" href="/assets/css/add_players.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    {{--Fonts--}}
    <link href="https://fonts.googleapis.com/css?family=Patua+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <div class="col-md-12" id="main-body" style="margin-top: 50px;">
        <form action="/match/{{Request::route('id')}}/addplayer" method="post">
            {{ csrf_field() }}
            <div class="col-md-6">
                <p class="team-name">{{ $match->teams[0]->team_name }}</p>
                @for ($i=1;$i<=$match->player_total;$i++)
                    <div class="col-md-12">
                        <label for="p_t1_{{$i}}" class="col-md-4">Player {{ $i }}</label>
                        <div class="col-md-8">
                            <input name="p_t1_{{$i}}" type="text" class="form-control" placeholder="Ex. Sakib Al Hasan" required>
                        </div>
                    </div>
                @endfor
            </div>
            <div class="col-md-6">
                <p class="team-name">{{ $match->teams[1]->team_name }}</p>
                @for ($i=1;$i<=$match->player_total;$i++)
                    <div class="col-md-12">
                        <label for="p_t2_{{$i}}" class="col-md-4">Player {{ $i }}</label>
                        <div class="col-md-8">
                            <input name="p_t2_{{$i}}" type="text" class="form-control" placeholder="Ex. Sakib Al Hasan" required>
                        </div>
                    </div>
                @endfor
            </div>
            <br>
            <div class="col-md-12">
                <div class="col-md-2 col-md-offset-5">
                    <input type="submit" class="btn btn-success" value="Finish Up">
                </div>
            </div>
        </form>
    </div>

@endsection