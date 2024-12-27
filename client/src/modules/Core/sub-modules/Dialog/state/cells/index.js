import { ERROR, SUCCESS } from '../../consts';
import dialog from './dialog';
import displayUserGuide from './displayUserGuide';

export const onSuccess = (message) => dialog.action({
    type: SUCCESS,
    message,
});

export const onError = (message) => dialog.action({
    type: ERROR,
    message,
});

export const onCloseDialog = () => dialog.action({})


export default {
    dialog,
    displayUserGuide
}