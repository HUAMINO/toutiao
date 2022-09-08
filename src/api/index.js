import { login, getSmsCode, getUserInfo, getUserChannels, addFollow, deleteFollow } from '@/api/user'
import { getArticles, getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addUserChannel, deleteUserChannel, getAllChannels } from '@/api/channel'
import { getSearchSuggestions, getSearchResult } from '@/api/search'
import { getComments, addCommentLike, deleteCommentLike, addComment } from '@/api/comment'

// 用户接口
export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const deleteUserChannelAPI = deleteUserChannel
export const addUserChannelAPI = addUserChannel
export const getAllChannelsAPI = getAllChannels
export const getSearchSuggestionsAPI = getSearchSuggestions
export const getSearchResultAPI = getSearchResult
export const getArticleByIdAPI = getArticleById
export const addFollowAPI = addFollow
export const deleteFollowAPI = deleteFollow
export const addCollectAPI = addCollect
export const deleteCollectAPI = deleteCollect
export const addLiketAPI = addLike
export const deleteLikeAPI = deleteLike
export const getCommentsAPI = getComments
export const addCommentLikeAPI = addCommentLike
export const deleteCommentLikeAPI = deleteCommentLike
export const addCommentAPI = addComment
