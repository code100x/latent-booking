use poem::{Endpoint, EndpointExt, Middleware, Request, Result};

pub struct AdminMiddleware;

impl<E: Endpoint> Middleware<E> for AdminMiddleware {
    type Output = AdminMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        AdminMiddlewareImpl { ep }
    }
}

pub struct AdminMiddlewareImpl<E> {
    ep: E,
}

impl<E: poem::Endpoint> poem::Endpoint for AdminMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, req: Request) -> Result<Self::Output> {
        println!("AdminMiddleware hit!");
        self.ep.call(req).await
    }
}

// Define a simple middleware for POST
pub struct SuperAdminMiddleware;

impl<E: poem::Endpoint> Middleware<E> for SuperAdminMiddleware {
    type Output = SuperAdminMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        SuperAdminMiddlewareImpl { ep }
    }
}

pub struct SuperAdminMiddlewareImpl<E> {
    ep: E,
}

impl<E: poem::Endpoint> poem::Endpoint for SuperAdminMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, req: Request) -> Result<Self::Output> {
        println!("SuperAdminMiddleware hit!");
        self.ep.call(req).await
    }
}

pub fn admin_middleware(ep: impl poem::Endpoint) -> impl poem::Endpoint {
    ep.with(AdminMiddleware)
}

pub fn superadmin_middleware(ep: impl poem::Endpoint) -> impl poem::Endpoint {
    ep.with(SuperAdminMiddleware)
}
