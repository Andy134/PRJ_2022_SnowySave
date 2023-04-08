import moment from "moment";
import Swal from "sweetalert2"



export const util = {
    getLocalCurrency,
    confirmSAlert,
    saveSuccess,
    getDate,
}

function getDate(date){
    var check = moment(date, 'YYYY/MM/DD');
    return {
      day: check.format('D'),
      month: check.format('M'),
      year: check.format('YYYY')
    }
  }

function getLocalCurrency(amount){
    amount = amount || 0 
    return amount?.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
}

function confirmSAlert(action, title = 'Do you want to save the changes?'){
    Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: 'Save',
        icon: "question",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            action()
            // Swal.fire('Saved!', '', 'success')
        }
      })
}

function saveSuccess(text = 'Save sucessfully !'){
    Swal.fire(text,"","success");
}