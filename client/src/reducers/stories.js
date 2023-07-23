const storyReducer = (state=[],action)=>{
    switch (action.type) {
        case "FETCH_ALL_STORIES":
            return action.payload;
        case "CREATE_STORY":
                return [...state,action.payload];
            
        case "UPDATE_STORY":
            return state.map((story)=>story._id===action.payload._id ? action.payload:story);
        default:
            return state;
    }
}
export default storyReducer;