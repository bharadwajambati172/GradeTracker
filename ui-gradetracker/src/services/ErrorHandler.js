import { toast } from 'react-toastify';

const handleError = (error) => {
    toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    throw new Error(error.response.message);
}

export default handleError;