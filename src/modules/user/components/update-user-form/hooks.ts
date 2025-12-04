import { UserUpdateCreateDto } from '@/facades/user/schema';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/facades/user/user-facade';

export const useUpdateUserMutation = () =>
	useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: UserUpdateCreateDto;
			id: string;
		}) => {
			const { error, user } = await updateUser(id, data);

			if (error) {
				throw new Error(String(error));
			}

			if (!user) {
				throw new Error('User update failed');
			}

			return user;
		}
	});
