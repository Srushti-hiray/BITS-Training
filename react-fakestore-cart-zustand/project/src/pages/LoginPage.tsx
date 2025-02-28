import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-10 w-10 text-gray-500" />
            </div>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">
              This section is not implemented yet. Check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}