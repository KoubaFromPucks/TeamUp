import { createUpdateConcreteEvent, deleteConcreteEvent } from "@/facades/concrete_event/concrete-event-facade";
import { ConcreteEventUpdateDto } from "@/facades/concrete_event/schema";
import { useMutation } from "@tanstack/react-query"

export const useUpdateConcreteEventMutation = () =>
    useMutation({
        mutationFn: async ({
            data,
            id
        }: {
            data: ConcreteEventUpdateDto;
            id: string;
        }) => {
            const { error, concreteEvent } = await createUpdateConcreteEvent(id, data);

            if(error){
                throw new Error(String(error));
            }

            if(!concreteEvent){
                throw new Error('Concrete event update failed');
            }

            return concreteEvent;
        }
    });

export const useDeleteConcreteEventMutation = () =>
	useMutation({
		mutationFn: async (id: string) => {
			const { error, ok } = await deleteConcreteEvent(id);
			if (!ok) {
				throw new Error(error ?? "Failed to delete concrete event");
			}
			return id;
		}
	});