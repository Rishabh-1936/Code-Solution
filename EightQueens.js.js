function EightQueens(strArr) { 

    let row = [[],[]], col = [[],[]] ,dig = [] ;
    let flag = 0;
    for(let i=0;i<9;++i){
      row[0][i] = row[1][i] = 0;
      col[0][i] = col[1][i] = 0;
    }
  
    for(let j=0;j<strArr.length;++j){
        let ele = strArr[j];
        
      let t = ele.split('') ; 
      let x = Number(t[1]) ;
      let y = Number(t[3]) ;
  
      //for checking diagonally

        for(let i=0;i<dig.length;++i){
            let e = dig[i];
            if( Math.abs( e[0] - x ) == Math.abs( e[1] - y )){
                flag = 1;
                return `(${e[0]},${e[1]})`;
              }
        }

      //no match found
      dig.push([x,y]);
      
      if(row[0][x] == 0){
        row[0][x] = 1;
        row[1][x] = y;
      }
      else{
        flag = 1;
        return `(${x},${row[1][x]})`;
      }
  
      if(col[1][y] == 0){
        col[1][y] = 1 ;
        col[0][y] = x ;
      }
      else{
        flag = 1;
        return `(${col[0][y]},${y})`;
      }
    }
    return 'true';  
  }
  
  let s=["(2,1)", "(4,3)", "(6,3)", "(8,4)", "(3,4)", "(1,6)", "(7,7)", "(5,8)"]   
  console.log(EightQueens(s));