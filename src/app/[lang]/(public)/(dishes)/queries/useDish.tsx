import dishApiRequest from '@/app/(public)/(dishes)/apiRequests/dish';
import {
  DishListParamsType,
  UpdateDishBodyType,
} from '@/app/(public)/(dishes)/schemaValidations/dish.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDishListQuery = (params: DishListParamsType) => {
  return useQuery({
    queryKey: ['dishes'],
    queryFn: () => dishApiRequest.list(params),
  });
};

export const useGetDishQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['dishes', id],
    queryFn: () => dishApiRequest.getDish(id),
    enabled,
  });
};

export const useAddDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dishApiRequest.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishes'],
      });
    },
  });
};

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }: UpdateDishBodyType & { id: number }) =>
      dishApiRequest.updateDish(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishes'],
        exact: true,
      });
    },
  });
};

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dishApiRequest.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishes'],
      });
    },
  });
};
