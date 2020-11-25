const rank={
    '(':0,
    ')':0,
    '+':1,
    '-':1,
    '*':2,
    '/':2
}

const num = [0,1,2,3,4,5,6,7,8,9];

function infixTopostfix(infix){

    let postfix = "" ;
    let stack = [] ;
    let top = -1 ;

    for(let i = 0 ; i < infix.length ; ++i ){

        if(infix[i] in num){
            postfix += infix[i];
        }
        else if(infix[i] == ' '){
            continue;
        }
        else{

            if(infix[i] == '('){
                stack.push(infix[i]);
                ++top;
            }
            else if(infix[i] == ')'){
                
                while(stack[top] != '('){
                    postfix += stack.pop();
                    --top;
                }
                stack.pop();
                --top;
            }
            else if( rank[infix[i]] >= rank[stack[top]] || top == -1){
                stack.push(infix[i]);
                ++top;
            }
            
            else if( rank[infix[i]] < rank[stack[top]]){
                while( (top > -1) && ( rank[stack[top]] > rank[infix[i]] ) ){
                    postfix += stack.pop();
                    --top;
                }
                stack.push(infix[i]);
                ++top;
            }
        }
    }
    if(top != -1){
        for(let i= top;i>=0;--i){
            postfix+=stack.pop();
        }
    }

    return cal(postfix);
}
function cal(exp){
    let stack = [];
    for(let i=0;i<exp.length;++i){
        if(exp[i] in num){
            stack.push(exp[i]-0);
        }
        else{
            let y=stack.pop();
            let x=stack.pop();
            
            switch(exp[i]){
                case '+':stack.push(x+y);break;
                case '-':stack.push(x-y);break;
                case '*':stack.push(x*y);break;
                case '/':stack.push(x/y);break;
                default :break;
            }
        }
    }
    return stack.pop();
}

console.log(infixTopostfix("6/3-1"));