let sportsOne: string[] = ["Golf","Football","Basketball"];
// for(let i = 0; i < sportsOne.length; i++){
//     console.log(sportsOne[i]);
// }

for(let tempSport of sportsOne){
    if(tempSport=="Football"){
        console.log(tempSport + " Siuuu");
    }else{
        console.log(tempSport);
    }
}