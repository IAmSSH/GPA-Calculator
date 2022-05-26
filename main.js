let count = 4;
let sem = 1;

const gradeMap = {
    "A": 4.000,
    "A-": 3.667,
    "B+": 3.333,
    "B": 3.000,
    "B-": 2.667,
    "C+": 2.333,
    "C": 2.000,
    "C-": 1.667,
    "D+": 1.333,
    "D": 1.000,
    "F": 0.000
}

function getGpa() {
  //   let courses = document.querySelectorAll(".course");

  //   let sum = 0;

  //   courses.forEach((course) => {
  //     sum += Number(course.value);
  //   });

  //   const result = document.querySelector(".result");

  //   if (result) {
  //     result.innerHTML = `GPA: ${sum}`;
  //   } else {
  //     let resultDiv = document.createElement("div");
  //     resultDiv.className = "result";
  //     resultDiv.innerHTML = `GPA: ${sum}`;
  //     document.querySelector(".container").appendChild(resultDiv);
  //   }

  let allSems = document.querySelectorAll(".items");

  let qp = [];
  let credits = [];

  allSems.forEach((semester, idx) => {
      let creditSum = 0;
      let qpSum = 0;

    for (let i = 0; i < semester.childElementCount; i++) {
      let element = semester.children[i];
      let credit = Number(element.children[1].value);
      let grade = element.children[2].value;

      let gradeVal = Number(gradeMap[grade]);

      creditSum += credit;
      qpSum += (credit * gradeVal);


      //   console.log(
      //     `Sem ${idx} ::
      //         Credit : ${credit}
      //         Grade : ${grade}`
      //   );
    }

    qp.push(qpSum);
    credits.push(creditSum);
  });

//   console.log(`gpa :: ${gpa}`)
//   console.log(`credits :: ${credits}`)

    const result = document.querySelector(".result");

    if (result) {
      result.innerHTML = createResult(qp, credits);
    } else {
      let resultDiv = document.createElement("div");
      resultDiv.className = "result";
      resultDiv.innerHTML = createResult(qp, credits);
      document.querySelector(".container").appendChild(resultDiv);
    }
}

function createResult(qp, credits) {
    let tqp = 0;
    let tqh = 0;

    let len = qp.length;

    let result = "";

    for(let i = 0; i < len; i++) {
        // update tqp
        tqp += qp[i];

        // update tqh
        tqh += credits[i];

        // create sem result
        result += `<div style="margin-bottom:4px">Semester ${i+1} GPA : ${qp[i]/credits[i]}</div>`
    }

    result += `<div style="font-weight:bold">CGPA : ${tqp/tqh}</div>`

    return result;
}

function addCourse() {
  let item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
    <label for="course_${count}">Course ${count}</label>
    <input type="text" name="credit" id="credit" placeholder="Credit">
    <input type="text" name="grade" id="grade" placeholder="Grade">
    `;
  count++;

  // add to last sem using semCount variable
  // instead of .items
  let className = `.sem_${sem}`;
  document.querySelector(className).appendChild(item);
}

function addSemester() {
  // reset count
  count = 4;
  sem++;

  let divider = document.createElement("div");
  divider.className = `divider`;

  let semDiv = document.createElement("div");
  semDiv.className = `items sem_${sem}`;
  semDiv.innerHTML = `
    <div class="item">
    <label for="course_1">Course 1</label>
    <!-- <input type="text" name="course_1" id="course_1" class="course" /> -->

    <input type="text" name="credit" id="credit" placeholder="Credit">
    <input type="text" name="grade" id="grade" placeholder="Grade">
  </div>
  <div class="item">
    <label for="course_2">Course 2</label>
    <!-- <input type="text" name="course_2" id="course_2" class="course" /> -->

    <input type="text" name="credit" id="credit" placeholder="Credit">
    <input type="text" name="grade" id="grade" placeholder="Grade">
  </div>
  <div class="item">
    <label for="course_3">Course 3</label>
    <!-- <input type="text" name="course_3" id="course_3" class="course" /> -->

    <input type="text" name="credit" id="credit" placeholder="Credit">
    <input type="text" name="grade" id="grade" placeholder="Grade">
  </div>
      `;

  document.querySelector(".wrapper").appendChild(divider);
  document.querySelector(".wrapper").appendChild(semDiv);
}

let getGpaBtn = document.getElementById("get_gpa");
let addCourseBtn = document.getElementById("add_course");
let addSemestereBtn = document.getElementById("add_semester");

getGpaBtn.addEventListener("click", getGpa);
addCourseBtn.addEventListener("click", addCourse);
addSemestereBtn.addEventListener("click", addSemester);
