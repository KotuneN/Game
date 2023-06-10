const area = document.getElementById('area')
const cell = document.getElementsByClassName('cell')
const currentPlayer = document.getElementById('curPlayer')
// Обьявление игрока
let player = "x"

//Логика статистики
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

// Выйграшные комбинации
const winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

// Создание игрового поля
for (let i = 1; i <= 9; i++){
    area.innerHTML += "<div class='cell' pos=" + i + "></div>"
}


for (let i = 0; i<cell.length; i++){
    cell[i].addEventListener('click', cellClick, false)
}

function cellClick(){
    let data = []
    if(!this.innerHTML){
        this.innerHTML = player;
    } else {
        const modalOverlayError = document.querySelector('.modal-overlay-error');
        modalOverlayError.classList.add('modal-overlay-error--visible');
        modalOverlayError.addEventListener('click', (e) => {
            if (e.target == modalOverlayError) {
                modalOverlayError.classList.remove('modal-overlay-error--visible');
            }
        });
        return
    }

    for (let i in cell){
        if (cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }
  
    if(checWin(data)) {
        
        stat[player]+= 1
        let infoWinPlayer = (`<div>Win</div><div style="font-size: 50px">${player}</div>`)
        document.getElementById("final-rez").innerHTML=infoWinPlayer;
        const modalOverlayWin = document.querySelector('.modal-overlay-win');
        modalOverlayWin.classList.add('modal-overlay-win--visible');
        modalOverlayWin.addEventListener('click', (e) => {
            if (e.target == modalOverlayWin) {
              modalOverlayWin.classList.remove('modal-overlay-win--visible');
              restart()
            } 
        
        })
        
    } else {
        let draw = true
        for(var i in cell){
            if(cell[i].innerHTML == '') draw = false
        }
        if(draw){
            stat.d+= 1
            let infoWinPlayer = (`<div style="font-size: 40px">Ничья</div>`)
            document.getElementById("final-rez").innerHTML=infoWinPlayer;
            const modalOverlayWin = document.querySelector('.modal-overlay-win');
            modalOverlayWin.classList.add('modal-overlay-win--visible');
            modalOverlayWin.addEventListener('click', (e) => {
                if (e.target == modalOverlayWin) {
                  modalOverlayWin.classList.remove('modal-overlay-win--visible');
                  restart()
                } 
            
            })
        }

    }

    player = player == 'x' ? 'o' : 'x';
    currentPlayer.innerHTML = player.toUpperCase()
}

function checWin(data) {
    for(let i in winIndex){
        let win = true
        for(let j in winIndex[i]){
            let id = winIndex[i][j]
            let ind = data.indexOf(id)

            if (ind == -1){
                win = false
            }
        }
        if(win) return true
    }
    return false
}

function restart() {
    for(let i = 0; i < cell.length; i++){
        cell[i].innerHTML = ''
    }

    updateStat();
}

function updateStat(){
    document.getElementById('wX').innerHTML = stat.x
    document.getElementById('wO').innerHTML = stat.o
    document.getElementById('xo').innerHTML = stat.d
}

const btns = document.querySelectorAll('.setting');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal-info');

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

modalOverlay.addEventListener('click', (e) => {
	console.log(e.target);

	if (e.target == modalOverlay) {
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
	}
});