'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { useRouter } from "next/navigation";

const schema = z.object({
  search: z.string({
    required_error: "Campo obrigatório."
  }).min(1, {
    message: "Campo obrigatório.",
  }).trim(),
})

type SearchFormSchemaProps = z.infer<typeof schema>

type SearchFormProps = {
  defaultValues?: SearchFormSchemaProps
}

export const SearchForm = ({defaultValues}: SearchFormProps) => {
  const router = useRouter()

  const form = useForm<SearchFormSchemaProps>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleSubmit: SubmitHandler<SearchFormSchemaProps> = ({search}) => {
    router.push(`/barbershops?search=${search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}