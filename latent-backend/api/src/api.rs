use poem_openapi::OpenApi;
use crate::routes::{
    user::*,
    admin::*,
    admin_event::*,
    admin_location::*,
    superadmin::*,
    user_booking::*,
    user_transaction::*,
};

/// Main API implementation that aggregates all routes
#[OpenApi]
impl crate::Api {
    // User routes
    #[oai(path = "/user/signup", method = "post")]
    async fn create_user(
        &self,
        body: Json<CreateUser>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateUserResponse>, AppError> {
        self.create_user_impl(body, state).await
    }

    #[oai(path = "/user/signup/verify", method = "post")]
    async fn create_user_verify(
        &self,
        body: Json<CreateUserVerify>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<VerifyUserResponse>, AppError> {
        self.create_user_verify_impl(body, state).await
    }

    #[oai(path = "/user/signin", method = "post")]
    async fn sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {
        self.sign_in_impl(body, state).await
    }

    #[oai(path = "/user/signin/verify", method = "post")]
    async fn sign_in_verify(
        &self,
        body: Json<SignInVerify>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<VerifyUserResponse>, AppError> {
        self.sign_in_verify_impl(body, state).await
    }

    // Admin routes
    #[oai(path = "/admin/signin", method = "post")]
    async fn admin_sign_in(
        &self,
        body: Json<AdminSignInRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<AdminSignInResponse>, AppError> {
        self.admin_sign_in_impl(body, state).await
    }

    #[oai(path = "/admin/signin/verify", method = "post")]
    async fn admin_sign_in_verify(
        &self,
        body: Json<AdminSignInVerify>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<AdminVerifyResponse>, AppError> {
        self.admin_sign_in_verify_impl(body, state).await
    }

    // Admin Event routes
    #[oai(path = "/admin/event", method = "post")]
    async fn create_event(
        &self,
        auth: AdminAuth,
        body: Json<CreateEventRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<EventResponse>, AppError> {
        self.create_event_impl(auth, body, state).await
    }

    #[oai(path = "/admin/event/metadata/:event_id", method = "put")]
    async fn update_event(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        body: Json<UpdateEventRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<EventResponse>, AppError> {
        self.update_event_impl(auth, event_id, body, state).await
    }

    #[oai(path = "/admin/event", method = "get")]
    async fn get_events(
        &self,
        auth: AdminAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<Vec<(Event, Vec<SeatType>)>>, AppError> {
        self.get_events_impl(auth, state).await
    }

    #[oai(path = "/admin/event/:event_id", method = "get")]
    async fn get_event(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<(Event, Vec<SeatType>)>, AppError> {
        self.get_event_impl(auth, event_id, state).await
    }

    #[oai(path = "/admin/event/seats/:event_id", method = "put")]
    async fn update_seats(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        body: Json<UpdateSeatsRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<UpdateSeatsResponse>, AppError> {
        self.update_seats_impl(auth, event_id, body, state).await
    }

    // Admin Location routes
    #[oai(path = "/admin/location", method = "post")]
    async fn create_location(
        &self,
        auth: SuperAdminAuth,
        body: Json<CreateLocationRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<LocationResponse>, AppError> {
        self.create_location_impl(auth, body, state).await
    }

    #[oai(path = "/admin/location", method = "get")]
    async fn get_locations(
        &self,
        auth: AdminAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<LocationsResponse>, AppError> {
        self.get_locations_impl(auth, state).await
    }

    // Superadmin routes
    #[oai(path = "/superadmin/signin", method = "post")]
    async fn superadmin_sign_in(
        &self,
        body: Json<SuperAdminSignInRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SuperAdminSignInResponse>, AppError> {
        self.superadmin_sign_in_impl(body, state).await
    }

    #[oai(path = "/superadmin/signin/verify", method = "post")]
    async fn superadmin_sign_in_verify(
        &self,
        body: Json<SuperAdminSignInVerify>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SuperAdminVerifyResponse>, AppError> {
        self.superadmin_sign_in_verify_impl(body, state).await
    }

    // User Booking routes
    #[oai(path = "/user/bookings", method = "post")]
    async fn create_booking(
        &self,
        auth: UserAuth,
        body: Json<CreateBookingRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<BookingResponse>, AppError> {
        self.create_booking_impl(auth, body, state).await
    }

    #[oai(path = "/user/bookings", method = "get")]
    async fn get_bookings(
        &self,
        auth: UserAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<BookingsResponse>, AppError> {
        self.get_bookings_impl(auth, state).await
    }

    // User Transaction routes
    #[oai(path = "/user/transaction", method = "get")]
    async fn get_transactions(
        &self,
        auth: UserAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<TransactionsResponse>, AppError> {
        self.get_transactions_impl(auth, state).await
    }
}
