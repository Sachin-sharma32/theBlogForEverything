import {useQuery, useMutation} from 'react-query';
import axios from axios;

export const useCreateTag = (onSuccess, onError) =>{
  return useMutation('createTag',()=>{
    return axios.post('http://localhost:8000/api/v1/tags')
  },{
    onSuccess,
    onError
  })
}

export const useGetAllPosts = () =>{
  return useQuery('posts',()=>{
    return axios.get('http://localhost:8000/api/v1/tags')
  })
}