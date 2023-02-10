import {useQuery, useMutation} from 'react-query';
import axios from axios;

export const useGetAllComments = (onSuccess, onError, postId) =>{
  return useQuery("comments",()=>{
    return axios.get(`http://localhost:8000/api/v1/comments/${postId}`)
  },{
    onSuccess:onSuccess,
    onError:onError
  })
} 

export const useCreateComment = (onSuccess, onError) =>{
  return useMutation("createComment",(postId)=>{
    return axios.post(`http://localhost:8000/api/v1/comments/${postId}`)
  },{
    onSuccess,
    onError
  })
}

export const useHandleCommentLike = (onSuccess, onError) =>{
  return useMutation('commentLike',(commentsId, commentId)=>{
    return axios.patch(`http://localhost:8000/api/v1/comments/${commentsId}/comment/${commentId}`)
  },{
    onSuccess,
    onError
  })
}