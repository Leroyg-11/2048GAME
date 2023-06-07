var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}
  
function setGame(){
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]
    board = [
        [2, 2, 2, 2],
        [4, 4, 4, 4],
        [8, 8, 8, 8],
        [32, 32 ,32, 32]
    ]

    for(let irow = 0; irow < rows; irow++){
        for(let icol = 0; icol < columns; icol++){
            let tile = document.createElement("div");
            tile.id = irow.toString() + "-" + icol.toString();
            // Create <div id="0-0"> </div>
            let num = board[irow][icol];
            updateTile(tile, num);
            document.getElementById("board").append(tile)
        }
    }

}


function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText= num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }else {
            tile.classList.add("x8192");
        }

    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft(); 
    } else if (e.code == "ArrowRight") {
        slideRight(); 
    }
})

function filterZero(row){
    return row.filter(num => num != 0);
}

function slide(row){
    row = filterZero(row);

    for(let i = 0; i < row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] =0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while(row.length < columns){
        row.push(0);
    }
    return row;
}


function slideLeft() {
    for (let irow = 0; irow < rows; irow++){
        let row = board[irow];
        row = slide(row);
        board[irow] = row;

        for (let icol = 0; icol < columns; icol++){
            let tile = document.getElementById(irow.toString() + "-" + icol.toString());
            let num = board[irow][icol];
            updateTile(tile, num)
        }
    }

}

function slideRight() {
    for (let irow = 0; irow < rows; irow++){
        let row = board[irow];
        row.reverse();
        row = slide(row);
        row.reverse()
        board[irow] = row;

        for (let icol = 0; icol < columns; icol++){
            let tile = document.getElementById(irow.toString() + "-" + icol.toString());
            let num = board[irow][icol];
            updateTile(tile, num)
        }
    }

}