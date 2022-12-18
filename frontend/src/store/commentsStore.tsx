import create from "zustand";
import { User } from "../type/user";
import { Comment } from "../type/comment";

const comments: Comment[] = [];

for (var i = 0; i < 10; i++) {
    const u: User = {
        name: `user-${i + 1}`,
        email: 'abc',
        avatarUrl: 'abc',
    }
    const c: Comment = {
        id: `cmt-${i + 1}`,
        content: 'acnakjsnckjasncjknasjkcsac',
        rate: 3,
        user: u,
    }

    comments.push(c);
}

type CommentsStore = {
    comments: Comment[];
    setComments: (comments: Comment[]) => void;
    addCommnet: (comment: Comment) => void;
    uppdateComment: (commnet: Comment, user: User) => void;
};

const useCommentsStore = create<CommentsStore>(
    (set): CommentsStore => ({
        comments: comments,
        setComments: (comments: Comment[]) =>
            set((state) => ({
                ...state,
                comments,
            })),
        addCommnet: (comment: Comment) =>
            set((state) => ({
                ...state,
                comments: [
                    comment,
                    ...state.comments,
                ]
            })),
        uppdateComment: (comment: Comment, user: User) =>
            set((state) => ({
                ...state,
                comments: state.comments.map(cmt => {
                    if (cmt.user.name === user.name) cmt = { ...comment };
                    return cmt;
                })
            })),
    })
);

export default useCommentsStore;