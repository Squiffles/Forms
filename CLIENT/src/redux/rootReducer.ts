// --------------- IMPORTS ---------------
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAnswersRequest } from "../services/requests/answer";


// --------------- MIDDLEWARES ---------------
const getAllAnswers = createAsyncThunk("root/fetchAnswers", async () => {
    try {
        const answers = await getAllAnswersRequest();
        return answers;
    } catch (error) {
        throw error;
    };
});


// --------------- REDUCER ---------------
// INTERFACE:
interface AnswerAttributes {
    answer_id: number;
    full_name: string;
    phone_number: string;
    start_date: string;
    preferred_language: string;
    how_found: string;
    newsletter_subscription: boolean | null;
};

interface answerState {
    answers: {
        data: AnswerAttributes[] | null,
        isSuccessful: Boolean,
        isRejected: Boolean,
        isLoading: Boolean
    },
};

const initialState: answerState = {
    answers: {
        data: null,
        isSuccessful: false,
        isRejected: false,
        isLoading: false
    },
};

const rootReducer = createSlice({
    name: "root",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAnswers.pending, (state) => {
                state.answers.isLoading = true;
                state.answers.isRejected = false;
                state.answers.isSuccessful = false;
                state.answers.data = null
            })
            .addCase(getAllAnswers.rejected, (state) => {
                state.answers.isLoading = false;
                state.answers.isRejected = true;
                state.answers.isSuccessful = false;
                state.answers.data = null
            })
            .addCase(getAllAnswers.fulfilled, (state, action) => {
                state.answers.isLoading = false;
                state.answers.isRejected = false;
                state.answers.isSuccessful = true;
                state.answers.data = action.payload
            })
    }
});


// --------------- EXPORTS ---------------
export {
    getAllAnswers
};
export default rootReducer.reducer;