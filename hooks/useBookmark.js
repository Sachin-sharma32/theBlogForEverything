import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";

export const useHandleBookmark = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "handleBookmark",
        (data) => {
            return axios.patch(
                `http://localhost:8000/api/v1/users/bookmarks/${data.userId}`,
                { postId: data.postId }
            );
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["bookmarks"]);
                queryClient.invalidateQueries(["me"]);
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useBookmarks = (success, error) => {
    return useQuery(
        "bookmarks",
        () => {
            return axios.get(
                `http://localhost:8000/api/v1/bookmarks/${data.bookmarkId}}`
            );
        },
        {
            select: (data) => {
                const bookmarks = data.data.data.doc;
                return bookmarks;
            },
        }
    );
};
