import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { getTicketById } from "../../../api/get-ticket-by-id";
import { getProductModules, type Module } from "../../../api/get-product-modules";
import { getUserProducts, type Product } from "../../../api/get-user-products";
import { getCustomers, type Customer } from "../../../api/get-customers";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateTicketData } from "../../../api/update-ticket-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

interface EditTicketDialogProps {
  id: number;
}

const ticketSchema = z.object({
  title: z.string().trim().min(5, "Título deve ter no mínimo 10 caracteres"),
  description: z
    .string()
    .trim()
    .min(5, "Descrição deve ter no mínimo 10 caracteres"),
  priority: z.enum(["LOW", "HIGH", "URGENT"], {
    required_error: "Prioridade é obrigatória",
  }),
  product_id: z.string().min(1, "Selecione um produto"),
  customer_id: z.string().min(1, "Selecione um cliente"),
  module_id: z.string().min(1, "Selecione um módulo"),
});

type TicketSchema = z.infer<typeof ticketSchema>;

export function EditTicketDialog({ id }: EditTicketDialogProps) {

  const [modules, setModules] = useState<Module[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { isSubmitting, errors },
      reset,
    } = useForm<TicketSchema>({ resolver: zodResolver(ticketSchema)});

  useEffect(() => {
    getUserProducts("").then(setProducts);
    getCustomers("").then(setCustomers);
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      getProductModules(selectedProductId).then(setModules);
      setValue("product_id", selectedProductId);
      setValue("module_id", "");
    } else {
      setModules([]);
    }
  }, [selectedProductId, setValue]);
  

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById({ id }),
    enabled: !!id,
  });

  useEffect(() => {
    if (ticket) {
      setValue("title", ticket.title);
      setValue("description", ticket.description);
      setValue("priority", ticket.priority);
      setValue("customer_id", ticket.customer_id);
      setValue("product_id", ticket.product_id);
      setValue("module_id", ticket.module_id);

      setSelectedProductId(ticket.product_id);
    }
  }, [ticket, setValue]);


  const { mutateAsync: updateTicketFn } = useMutation({
    mutationFn: updateTicketData,
  });

  function handleUpdateTicket(data: TicketSchema) {
    updateTicketFn({
      id: id,
      title: data.title,
      description: data.description,
      priority: data.priority,
      module_id: data.module_id,
      product_id: data.product_id,
      customer_id: data.customer_id,
    });

    reset();
    toast.success("Chamado registrado com sucesso!");
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editando Ticket #{id}</DialogTitle>
        <DialogDescription>
          Faça as alterações necessárias no ticket.
        </DialogDescription>
      </DialogHeader>
      <form
        className="p-2 flex flex-col gap-4"
        onSubmit={handleSubmit(handleUpdateTicket)}
      >
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Cliente</Label>
            <Controller
              name="customer_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.customer_id && (
              <span className="text-sm text-red-500">
                {errors.customer_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Produto</Label>
            <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedProductId(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.product_id && (
              <span className="text-sm text-red-500">
                {errors.product_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Módulo</Label>
            <Controller
              name="module_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedProductId || modules.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar módulo" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.length > 0 ? (
                      modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="none">
                        Nenhum módulo encontrado
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.module_id && (
              <span className="text-sm text-red-500">
                {errors.module_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input {...register("title")} placeholder="Título do chamado" />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Descrição</Label>
            <Textarea
              className="resize-none"
              {...register("description")}
              placeholder="Descreva o problema"
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixa</SelectItem>
                    <SelectItem value="HIGH">Alta</SelectItem>
                    <SelectItem value="URGENT">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <span className="text-sm text-red-500">
                {errors.priority.message}
              </span>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
