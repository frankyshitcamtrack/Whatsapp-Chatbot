function padTwoDigits(num) {
    return num.toString().padStart(2, "0");
}


function dateInYyyyMmDdHhMmSs(date) {
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate()),
      ].join("-")   
    )
}


module.exports={dateInYyyyMmDdHhMmSs}