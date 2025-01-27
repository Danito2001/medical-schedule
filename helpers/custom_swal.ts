import Swal from "sweetalert2"

type Icon = 'success' | 'error' | 'warning' | 'info' | 'question';

export const customSwal = ({title, text, error, html}: {title:string, text?:string, error:Icon, html?:string}) => {

    return Swal.fire({
        title: title,
        text: text,
        icon: error,
        html: html
    })
}