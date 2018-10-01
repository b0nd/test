export const POST_A_TASK_LOCAL_SAVE = "POST_TASK_LOCAL_SAVE";


export const savePostTaskData = (payload) =>{
    return {
        type: POST_A_TASK_LOCAL_SAVE,
        payload: payload
    }
}


