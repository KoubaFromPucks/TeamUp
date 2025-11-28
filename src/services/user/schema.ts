export type UserSelectModel = {
    id: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
};

export type UserInsertModel = Omit<UserSelectModel, 'id'>;