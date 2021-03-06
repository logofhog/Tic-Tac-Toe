window.onload = function() {

    function clickable(val){
        var is_clickable = val
        
        this.getValue = function() {
            return is_clickable
        }

        this.setValue = function(val){
            is_clickable = val
            }
        }
    var clickable = new clickable(true)

    var gameboard = document.getElementById('gameboard')
    var newGame = document.getElementById('newgame')
    newgame.addEventListener("click", function() {
        makeNewGame()
    })

    gameboard.addEventListener("click", function(element) {
        if (clickable.getValue()) {
            makemove(element.target.id)
            clickable.setValue(false)
        }
    })

    function makemove(id) {
        if (id == 'gameboard') {
            return
        }
        var move = new XMLHttpRequest()
        move.open('POST', '/playgame/')
        move.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        move.onreadystatechange = updateBoard
        move.send(id)

        var is_won = document.getElementById('is_won');
        var player_square = document.getElementById(id);
        if (player_square.innerHTML == '') {
            player_square.innerHTML = 'X'
        }

        function updateBoard() {
            clickable.setValue(true)
            console.log(move.readyState)
            if (move.readyState == 4) {
                json_data = move.responseText
                console.log(json_data)
                json_data = JSON.parse(json_data)
                
                if (json_data.move > -1) {
                    document.getElementById(json_data.move).innerHTML = 'O';
                }
                if (json_data.is_won == 'won') {
                    is_won.innerHTML = 'you lost'
                    for (id in json_data.winning_moves){
                        console.log(id)
                        var element = document.getElementById(json_data.winning_moves[id])
                        element.className = 'winners'
                    }
                }
                
            }

        } //function updateBoard
    }// function makemove

    function makeNewGame() {
        clickable.setValue(true)
        var newgame = new XMLHttpRequest()
        newgame.open('POST', '/playgame/')
        newgame.send('makenewgame')
        newgame.onreadystatechange = newGame
        is_won.innerHTML = ''

        function newGame() {
            if (newgame.readyState == 4) {
                for (var i=0; i<=8; i++) {
                    var element = document.getElementById(i);
                    element.innerHTML = '';
                    element.className = ''
                }
            }
        }
    }// function makeNewGame

}//window.onload




