import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { api } from "./lib/api"

function App() {
  const [totalSpent, setTotalSpent] = useState<number | null>(null)

  useEffect(() => {
    const fetchTotalSpent = async () => {
      const res = await api.expenses["total-spent"].$get()
      const totalSpent = await res.json()
      setTotalSpent(totalSpent.totalSpent)
    }
    fetchTotalSpent()
  }, [])

  return (
    <>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Total Spentt</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {totalSpent === null ? "Loading..." : `$${totalSpent}`}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default App
