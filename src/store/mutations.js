import * as types from './mutation-types'

const mutations = {
	[types.SET_TITLE_API](state,title){
		state.titleApi = title
	},
}

export default mutations