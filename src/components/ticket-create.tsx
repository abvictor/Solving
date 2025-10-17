import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { registerTicket } from "../api/register-ticket";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getProductModules, type Module } from "../api/get-product-modules";
import { getUserProducts, type Product } from "../api/get-user-products";
import { getCustomers, type Customer } from "../api/get-customers";

const ticketSchema = z.object({
  title: z.string().min(10, "Título deve ter no mínimo 10 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  priority: z.string().min(1, "Selecione uma prioridade"),
  product_id: z.string().min(1, "Selecione um produto"),
  customer_id: z.string().min(1, "Selecione um cliente"),
  module_id: z.string().min(1, "Selecione um módulo"),
});

type TicketSchema = z.infer<typeof ticketSchema>;

export function TicketCreate() {
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
  } = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      product_id: "",
      customer_id: "",
      module_id: "",
    },
  });

  const { mutateAsync: registerTicketFn } = useMutation({
    mutationFn: registerTicket,
  });

  async function handleRegisterTicket(data: TicketSchema) {
    registerTicketFn({
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

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criando novo ticket</DialogTitle>
        <DialogDescription>
          Preencha as informações abaixo para registrar um chamado.
        </DialogDescription>
      </DialogHeader>
      <form
        className="p-2 flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegisterTicket)}
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
                      <SelectItem key={customer.id} value={customer.id}>
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
            <Label>Prioridade</Label>
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