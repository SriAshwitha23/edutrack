function login(){
    let id=document.getElementById("studentID").value;
    let pw=document.getElementById("password").value;
    if(id && pw){
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
    }
    else{
        alert("Enter valid details");
    }
}

function logout(){
    location.reload();
}

function showModule(id){
    document.getElementById("gpa").classList.add("hidden");
    document.getElementById("attendance").classList.add("hidden");
    document.getElementById("tasks").classList.add("hidden");

    document.getElementById(id).classList.remove("hidden");

    document.querySelectorAll(".navbar button").forEach(btn=>{
        btn.style.background="#667eea";
    });

    event.target.style.background="#4c51bf";
}
/* GPA */
const subjects = [
    "Calculus",
    "Programming",
    "Physics",
    "Engineering Graphics and Design",
    "BEEE"
];

window.onload = function(){

    const subjectContainer = document.getElementById("subjects");

    subjects.forEach((sub,i)=>{
        subjectContainer.innerHTML += `
        <div class="subject">
            <h3>${sub}</h3>
            ICA <input type="number" id="ica${i}" max="50">
            TEE <input type="number" id="tee${i}" max="100">
            <div class="progress"><div id="bar${i}" class="bar"></div></div>
            <div id="grade${i}"></div>
        </div>`;
    });

};

function getGP(p){
    if(p>=90)return 10;
    if(p>=80)return 9;
    if(p>=70)return 8;
    if(p>=60)return 7;
    if(p>=50)return 6;
    if(p>=40)return 5;
    return 0;
}


function calculateGPA(){
    let total=0;
    let error=false;
    let errorMsg="";

    subjects.forEach((_,i)=>{
        let ica=Number(document.getElementById(`ica${i}`).value);
        let tee=Number(document.getElementById(`tee${i}`).value);

        if(ica>50||tee>100||ica<0||tee<0||isNaN(ica)||isNaN(tee)){
            error=true;
            return;
        }
       
            let percent = ica + (tee/2);

            let grade =
                percent>=90?"O":
                percent>=80?"A+":
                percent>=70?"A":
                percent>=60?"B+":
                percent>=50?"B":
                percent>=40?"P":"F";

            document.getElementById(`grade${i}`).innerText =
                `Marks: ${percent}/100 | Grade: ${grade}`;

            document.getElementById(`bar${i}`).style.width=percent+"%";

            total += getGP(percent);
        
    });

    if(error){
        document.getElementById("errorMsg").innerText =
        "⚠️ Invalid input! ICA ≤ 50 and TEE ≤ 100 required.";
        return;
    }

    document.getElementById("errorMsg").innerText="";

    let gpa = total/subjects.length;
    document.getElementById("gpa_result").innerText =
        "GPA: "+gpa.toFixed(2);
}

/* Attendance */
const attendanceSubjects=[
    {name:"Programming",total:30},
    {name:"Engineering Graphics and Design",total:15},
    {name:"Calculus",total:45},
    {name:"Physics",total:30},
    {name:"BEEE",total:30}
];

const body=document.getElementById("attendanceBody");

attendanceSubjects.forEach((s,i)=>{
    body.innerHTML+=`
    <tr>
        <td>${s.name}</td>
        <td>${s.total}</td>
        <td><input type="number" id="c${i}"></td>
        <td><input type="number" id="a${i}"></td>
        <td id="p${i}"></td>
        <td id="msg${i}"></td>
    </tr>`;
});

function calculateAttendance(){
    let error=false;

     attendanceSubjects.forEach((sub,i)=>{
        let total = sub.total;

        let conductedInput = document.getElementById("c"+i).value.trim();
        let attendedInput = document.getElementById("a"+i).value.trim();

     // ✅ STOP if EMPTY (FINAL FIX)
     if(conductedInput === "" || attendedInput === ""){
        document.getElementById("p"+i).innerHTML = "-";
        document.getElementById("msg"+i).innerHTML = "-";
        return;
     }

     let conducted = Number(conductedInput);
        let attended = Number(attendedInput);

     // ✅ VALIDATION
        if(conducted > total || attended > conducted || conducted < 0 || attended < 0){
        document.getElementById("p"+i).innerHTML = "-";
        document.getElementById("msg"+i).innerHTML = "Invalid";
        error = true;
        return;
        }

        let percent = (attended / conducted * 100).toFixed(1);
        document.getElementById("p"+i).innerHTML = percent + "%";

        // ✅ SKIP LOGIC
        let requiredTotal = Math.ceil(0.8 * total);
        let remaining = total - conducted;
        let canSkip = attended + remaining - requiredTotal;

        let msgBox = document.getElementById("msg"+i);

        if(canSkip <= 0){
        msgBox.innerHTML = "No more skips left";
        msgBox.className = "red";
        }
        else{
        msgBox.innerHTML = "You can skip " + canSkip + " classes";

        if(canSkip == 1) msgBox.className = "red";
        else if(canSkip == 2) msgBox.className = "yellow";
        else msgBox.className = "green";
    }
});

    if(error){
        alert("⚠️ Invalid input! Ensure Total ≥ Conducted ≥ Attended");
    }
}

/* Tasks */
let tasks=[];

function addTask(){
    let sub=document.getElementById("task_subject").value;
    let desc=document.getElementById("task_description").value;
    let date=document.getElementById("task_deadline").value;

    if(!sub||!desc||!date)return alert("Fill all");

    tasks.push({sub,desc,date});
    render();
}

function render(){
    let list=document.getElementById("taskList");
    list.innerHTML="";

    tasks.sort((a,b)=>new Date(a.date)-new Date(b.date));

    tasks.forEach(t=>{
        list.innerHTML+=`
        <div class="subject">
            <b>${t.sub}</b><br>
            ${t.desc}<br>
            ${t.date}
        </div>`;
    });
}