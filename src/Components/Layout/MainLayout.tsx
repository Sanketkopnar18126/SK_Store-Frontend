import { Footer } from '../Ui/Footer/Footer'
import type { PropsWithChildren } from 'react'
import { Navbar } from '../Ui/Navbar/Navbar'

export const MainLayout = ({children}:PropsWithChildren) => {
  return (
   <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
