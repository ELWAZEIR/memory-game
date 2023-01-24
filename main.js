document.querySelector(".control-buttons span").onclick=function(){
let yourName=prompt("Whats your Name ?");
if (yourName==null || yourName==""){
    document.querySelector(".name span").innerHTML='unKnown';
    show(...AllBlock);
}else{
    document.querySelector(".name span").innerHTML=yourName ;
    document.getElementById('mu').play();
    show(...AllBlock);

}
document.querySelector(".control-buttons").remove();
};
let duration=1000;
let blocksContainer=document.querySelector(".memory-Game-blocks");
// let AllBlock = document.querySelectorAll(".game-block");
let AllBlock = document.getElementsByClassName("game-block");
let blocks = Array.from(blocksContainer.children);
// let orderRange=[...Array(blocks.length).keys()];
let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click',function(){
        flipBlock(block);
    });
});


function flipBlock(selectedBlock){
   
    selectedBlock.classList.add('is-flipped');
    let allFlipsBlocks=blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if(allFlipsBlocks.length === 2){
       stopClicking();

       checkSameCard(allFlipsBlocks[0],allFlipsBlocks[1]);
    }
}
function stopClicking(){
    blocksContainer.classList.add('cant-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('cant-clicking')
    }, duration);
}
function show(...AllBlock){
    
    AllBlock.forEach((e)=>{e.classList.add('is-flipped')});
   
    setTimeout(() => {
        AllBlock.forEach((e)=>{e.classList.remove('is-flipped')});
    }, 5000);
};

function checkSameCard(firstCard,secondCard) {
    let triesCount = document.querySelector('.tries span');
    if (firstCard.dataset.name === secondCard.dataset.name) {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        firstCard.classList.add('has-match');
        secondCard.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        triesCount.innerHTML = parseInt(triesCount.innerHTML) + 1 ;
        if(triesCount.innerHTML==="5"){
            end()
        }else{
       setTimeout(()=>{
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
       },duration);
       document.getElementById('fail').play();
    }
}
}
function shuffle(array){
    let current = array.length,
    temp,
    random;
    while(current > 0 ){
        random = Math.floor(Math.random() * current);
        current --;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;
}


 function end() {
   
 let finish = document.querySelector('.loz');
 finish.style.display = "block";
 document.querySelector('.loz span').onclick=function () {
    location.reload();
 }
 }