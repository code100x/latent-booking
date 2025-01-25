use poem::{
    handler,
    middleware::{Middleware, Next},
    web::Data,
    Endpoint, Request, Result,
};

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

#[handler]
impl<E: Endpoint> AdminMiddlewareImpl<E> {
    async fn call(&self, req: Request, next: Next<E>) -> Result {
        println!("AdminMiddleware hit!");
        next.run(req).await
    }
}

pub struct SuperAdminMiddleware;

impl<E: Endpoint> Middleware<E> for SuperAdminMiddleware {
    type Output = SuperAdminMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        SuperAdminMiddlewareImpl { ep }
    }
}

pub struct SuperAdminMiddlewareImpl<E> {
    ep: E,
}

#[handler]
impl<E: Endpoint> SuperAdminMiddlewareImpl<E> {
    async fn call(&self, req: Request, next: Next<E>) -> Result {
        println!("SuperAdminMiddleware hit!");
        next.run(req).await
    }
}
