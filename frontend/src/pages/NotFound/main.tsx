import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="mt-4 text-2xl text-muted-foreground">Page Not Found</p>
      <Link to="/" className="mt-8 text-primary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
