const inputBtn = document.querySelector("#inputbtn");
const calculateBtn = document.querySelector("#calculatebtn");
const ageResult = document.querySelector("#ageresult");

calculateBtn.addEventListener("click" , ()=>{
      if(inputBtn.value == ""){
        alert("Please Enter Your DOB");
      }
      else{

        // new date formate
        const dob = new Date(inputBtn.value );
        // getting year
        const dobYear = dob.getFullYear();  // ex : 09-11-1998 , it gives 1998
        // getting current year
        const currentYear = new Date();   // it gives todays date like 14/04/2024
        const nowYear = currentYear.getFullYear();  // it gives full year from curret=nt year ex : 2024
        const ageYear = nowYear - dobYear; //n ex: 2024 - 1998 = 26

        // getting month
        const dobMonth = dob.getMonth();
        // getting current month
        const currentMonth = new Date();
        const nowMonth = currentMonth.getMonth();
        const finalMonth = Math.abs(nowMonth - dobMonth);


        // getting day
        const dobDay = dob.getDay();
        const currentDay = currentYear.getDate();
        // const nowDay = currentDay.currentDay();
        const finalDay = currentDay - dobDay;

        ageResult.innerHTML = `🎉You age is : ${ageYear}-year  ${finalMonth}-month and ${finalDay}-Day`;
      }
})