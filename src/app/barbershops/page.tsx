import { Header } from "@/components/core/header"
import { db } from "@/lib/prisma"
import { BarbershopItem } from "../(home)/components/barbershop-item"
import { redirect } from "next/navigation"
import { SearchForm } from "@/components/shared/search-form"

type BarbershopsProps = {
  searchParams: {
    search?: string
  }
}

const Barbershops = async ({ searchParams }: BarbershopsProps) => {
  if(!searchParams.search) {
    redirect('/')
  }
  
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })

  return ( 
    <>
      <Header />
    
      <div className="px-5 py-6 flex flex-col gap-6">
        <SearchForm 
          defaultValues={{
            search: searchParams.search
          }} 
        />

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams?.search}&quot;
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map(barbershop => (
            <div key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Barbershops;