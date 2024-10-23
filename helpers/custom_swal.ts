import Swal from "sweetalert2"

type Icon = 'success' | 'error' | 'warning' | 'info' | 'question';

export const customSwal = ({title, text, error}: {title:string, text?:string, error:Icon}) => {

    return Swal.fire({
        title: title,
        text: text,
        icon: error
    })
}