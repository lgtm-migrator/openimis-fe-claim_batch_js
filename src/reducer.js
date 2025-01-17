import {
    parseData, pageInfo, formatServerError, formatGraphQLError,
    dispatchMutationReq, dispatchMutationResp, dispatchMutationErr
} from '@openimis/fe-core';

function reducer(
    state = {
        fetchingBatchRunPicker: false,
        fetchedBatchRunPicker: false,
        errorBatchRunPicker: null,
        batchRunPicker: [],
        fetchingBatchRunWithLocationPicker: false,
        fetchedBatchRunWithLocationPicker: false,
        batchRunWithLocationPickerPageInfo: {},
        errorBatchRunWithLocationPicker: null,
        batchRunWithLocationPicker: [],
        fetchingBatchRunSearcher: false,
        fetchedBatchRunSearcher: false,
        batchRunSearcher: [],
        batchRunSearcherPageInfo: { totalCount: 0 },
        errorBatchRunSearcher: null,
        submittingMutation: false,
        mutation: {},
        generatingReport: false,
    },
    action,
) {
    switch (action.type) {
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_REQ':
            return {
                ...state,
                fetchingBatchRunPicker: true,
                fetchedBatchRunPicker: false,
                batchRunPicker: [],
                errorBatchRunPicker: null,
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_RESP':
            return {
                ...state,
                fetchingBatchRunPicker: false,
                fetchedBatchRunPicker: true,
                batchRunPicker: parseData(action.payload.data.batchRuns),
                errorBatchRunPicker: formatGraphQLError(action.payload)
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_ERR':
            return {
                ...state,
                fetchingBatchRunPicker: false,
                errorBatchRunPicker: formatServerError(action.payload)
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_SEARCHER_REQ':
            return {
                ...state,
                fetchingBatchRunSearcher: true,
                fetchedBatchRunSearcher: false,
                batchRunSearcher: [],
                batchRunSearcherPageInfo: { totalCount: 0 },
                errorBatchRunSearcher: null,
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_SEARCHER_RESP':
            return {
                ...state,
                fetchingBatchRunSearcher: false,
                fetchedBatchRunSearcher: true,
                batchRunSearcher: parseData(action.payload.data.batchRunsSummaries),
                batchRunSearcherPageInfo: pageInfo(action.payload.data.batchRunsSummaries),
                errorBatchRunSearcher: formatGraphQLError(action.payload)
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_SEARCHER_ERR':
            return {
                ...state,
                fetchingBatchRunSearcher: false,
                errorBatchRunSearcher: formatServerError(action.payload)
            };
        
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_WITH_LOCATION_REQ':
            return {
                ...state,
                fetchingBatchRunWithLocationPicker: true,
                fetchedBatchRunWithLocationPicker: false,
                batchRunWithLocationPicker: [],
                batchRunWithLocationPickerPageInfo: {},
                errorBatchRunWithLocationPicker: null,
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_WITH_LOCATION_RESP':
            return {
                ...state,
                fetchingBatchRunWithLocationPicker: false,
                fetchedBatchRunWithLocationPicker: true,
                batchRunWithLocationPicker: parseData(action.payload.data.batchRuns),
                batchRunWithLocationPickerPageInfo: pageInfo(action.payload.data.batchRuns),
                errorBatchRunWithLocationPicker: formatGraphQLError(action.payload)
            };
        case 'CLAIM_BATCH_CLAIM_BATCH_PICKER_WITH_LOCATION_ERR':
            return {
                ...state,
                fetchingBatchRunWithLocationPicker: false,
                errorBatchRunWithLocationPicker: formatServerError(action.payload)
            };
        case 'CLAIM_BATCH_MUTATION_REQ':
            return dispatchMutationReq(state, action)
        case 'CLAIM_BATCH_MUTATION_ERR':
            return dispatchMutationErr(state, action);
        case 'CLAIM_BATCH_PROCESS_RESP':
            return dispatchMutationResp(state, "processBatch", action)
        case 'CLAIM_BATCH_PREVIEW':
            return {
                ...state,
                generating: true,
            };
        case 'CLAIM_BATCH_PREVIEW_DONE':
            return {
                ...state,
                generating: false
            };            
        default:
            return state;
    }
}

export default reducer;
