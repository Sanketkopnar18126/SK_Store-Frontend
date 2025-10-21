import { Card, CardContent } from '../../Ui/card'
import { LogOut } from 'lucide-react'
import { Button } from '../../Ui/button'

export const LogoutPage = () => {
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 p-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-xl">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <LogOut className="w-12 h-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Ready to leave?
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            You can always log back in anytime.
          </p>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="w-1/2 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
