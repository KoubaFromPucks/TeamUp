import { UserUpdateCreateDto } from '@/facades/user/schema';
import { useMutation } from '@tanstack/react-query';
import { createUpdateUser } from '@/facades/user/user-facade';
import { toast } from 'sonner';

export const useUpdateUserMutation = () =>
	useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: UserUpdateCreateDto;
			id: string;
		}) => {
			const { error, user } = await createUpdateUser(id, data);

			if (error) {
				throw new Error(String(error));
			}

			if (!user) {
				throw new Error('User update failed');
			}

			return user;
		}
	});
