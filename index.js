const displaylength = document.getElementById("display-length");
const sliderinput = document.getElementById("slider-input");
const upperbox = document.getElementById("ch1");
const lowerbox = document.getElementById("ch2");
const number = document.getElementById("ch3");
const symbols = document.getElementById("ch4");
const Indicolor = document.getElementById("color");
const passInput=document.getElementById("passwordInput");
const msg=document.getElementById("msg");
const copybutton=document.getElementById("copy-btn");
const checkbox=document.querySelectorAll("input[type=checkbox]");
const lastbutton=document.getElementById("last-button");

let countchkbox=0;
const symbol = "`!#$%^&*()_?/:;,";
let passwordlength = 10;
handleSlider();
function handleSlider() {
  sliderinput.value = passwordlength;
  displaylength.innerText = passwordlength;
}

sliderinput.addEventListener("input", (e) => {
  passwordlength = e.target.value;
  handleSlider();
});

function generateInteger(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateNumber() {
  return generateInteger(0, 9);
}
function generateUppercase() {
  return String.fromCharCode(generateInteger(65, 91));
}
function generateLowercase() {
  return String.fromCharCode(generateInteger(97, 123));
}
function generateSymbol() {
  let randsym = generateInteger(0, symbol.length);
  return symbol[randsym];
}
function setIndictor(color) {
  Indicolor.style.backgroundColor = color;
  Indicolor.style.boxShadow= "10px 10px 10px black";
}

function Passwordstrength() {
  let hasupper = false;
  let haslower = false;
  let hasnumber = false;
  let hassymbol = false;

  if (upperbox.checked) hasupper = true;
  if (lowerbox.checked) haslower = true;
  if (number.checked) hasnumber = true;
  if (symbols.checked) hassymbol = true;

  if (hasupper && haslower && (hasnumber || hassymbol) && passwordlength >= 8) {
    setIndictor("#008000");
  } else if (
    (hasupper || haslower) &&
    (hasnumber || hassymbol) &&
    passwordlength < 6
  ) {
    setIndictor("#ffff00");
  } else {
    setIndictor("#ff0000");
  }
}

async function copyPwd(){
    try{
        if(passInput.value){
           await navigator.clipboard.writeText(passInput.value);
           msg.innerText="copied";
        }
    }
    catch(e){
           msg.innerText="Failed";
    }
    // msg.classList.add("active");
    setTimeout(function(){
        msg.classList.add("active");
    },2000);
   
}
copybutton.addEventListener("click",()=>{
  if(passInput.value){
    copyPwd();
  }

})

function checktickbox(){
  countchkbox=0;
  checkbox.forEach((ch)=>{
    if(ch.checked)
    countchkbox++;
  });
}
checkbox.forEach((ch)=>{
 ch.addEventListener("change",checktickbox)
});

let password="";
lastbutton.addEventListener("click",()=>{
if(passwordlength<=0) return;
password="";
if(passwordlength<countchkbox){
  passwordlength=countchkbox;
  handleSlider();
}
let Arraypass=[];
if(upperbox.checked){
  Arraypass.push(generateUppercase);
}
if(lowerbox.checked){
  Arraypass.push(generateLowercase);
}
if(number.checked){
  Arraypass.push(generateNumber);
}
if(symbols.checked){
  Arraypass.push(generateSymbol);
}

for(let i=0;i<Arraypass.length;i++){
  password+=Arraypass[i]();
}

for(let i=0;i<passwordlength-Arraypass.length;i++){
  let randomdata=generateInteger(0,Arraypass.length);
  password+=Arraypass[randomdata]();
}

passInput.value=password;
Passwordstrength();
})


