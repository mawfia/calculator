var operand1 = [];
var operand2 = [];
var operation = null;

$('button').click(function(e){
	
	mapValue($(this).val());
	
});

$('body').keypress(function(e){

      getValue(e);

});

function mapValue(value){
	
	switch(value){
		case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
			if(!operation) { operand1.push(value); display(operand1.join(''), "", "", null); console.log(operand1.join('')); }
			else { operand2.push(value); display(operand1.join(''), operand2.join(''), operation); console.log(operand2.join('')); }			
			break;
		case '+': case '-': case '/': case '*':
			operation = value; 
			display(operand1.join(''), "", operation);
			break; 
		case '.': 
			if(!operation && operand1.indexOf(value) == -1) {operand1.push(value); display(operand1.join(''), "", null, null); break; }
			else if(operand2 && operand2.indexOf(value) == -1) {operand2.push(value); display(operand1.join(''), operand2.join(''), operation, null); break; }
		case 'C': clear(); display(operand1, operand2, null, null); break; 
		case 'B':  
				if(operand1.length > 0 && operation && operand2.length > 0) { operand2.pop(); display(operand1.join(''), operand2.join(''), operation); } 
				else if( operand1.length > 0 && operation) { operation = null; display(operand1.join(''), operand2.join(''), operation); }
				else if( operand1.length > 0 ) { operand1.pop(); display(operand1.join(''), "", ""); }
			break;
		case '=': 
			calculate(parseFloat(operand1.join(''), 10), parseFloat(operand2.join(''), 10), operation);
			break;
		default: break;
	}
}

function getValue(e){

	//console.log(e.key + " " + e.which + " " + e.code);
	if(e.which === 13) mapValue('=');
	else if(e.which === 0) mapValue('C');
	else mapValue(e.key);
}

function display(operand1, operand2, operation, result){
	if (result) $('#result').text(operand1 + " " + operation + " " + operand2 + " = " + result);
	else if(operand1.length > 0 && operand2.length > 0 && operation)	$('#result').text(operand1 + " " + operation + " " + operand2);
	else if(operand1.length > 0 && operation) $('#result').text(operand1 + " " + operation);
	else if(operand1.length > 0) $('#result').text(operand1);
	else $('#result').text('');
}

function calculate(num1, num2, operation){
	switch(operation){
		case '+': display(num1, num2, operation, num1 + num2); break;
		case '-': display(num1, num2, operation, num1 - num2); break;
		case '*': display(num1, num2, operation, num1 * num2); break;
		case '/': display(num1, num2, operation, num1 / num2); break;
		default: break;
	}
	clear();
}

function clear(){
		operation = null;
		operator = null;
		for(var i = operand1.length; i >= 0; i--) operand1.pop();
		for(var i = operand2.length; i >= 0; i--) operand2.pop();
}