import { lazy, Suspense } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { ErrorBoundary } from '@/core/components';

const WelcomePage = lazy(() => import('@/pages/Welcome'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Suspense>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <WelcomePage />
          </SuspenseWrapper>
        ),
      },
      // Feature routes will be added here
    ],
  },
];

export const appRouter = createBrowserRouter(routes);
