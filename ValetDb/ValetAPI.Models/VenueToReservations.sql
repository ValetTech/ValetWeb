CREATE TABLE [ValetAPI.Models].[VenueToReservations](
	[VenueId] [int] NOT NULL,
	[ReservationId] [int] NOT NULL,
 CONSTRAINT [FK_VenueToReservations_Reservation] FOREIGN KEY([ReservationId])
REFERENCES [ValetAPI.Models].[Reservation] ([Id]),
 CONSTRAINT [FK_VenueToReservations_Venue] FOREIGN KEY([VenueId])
REFERENCES [ValetAPI.Models].[Venue] ([Id])
)
