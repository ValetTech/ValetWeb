CREATE TABLE [ValetAPI.Models].[CustomerToReservations](
	[CustomerId] [int] NOT NULL,
	[ReservationId] [int] NOT NULL,
 CONSTRAINT [FK_CustomerToReservations_Customer] FOREIGN KEY([CustomerId])
REFERENCES [ValetAPI.Models].[Customer] ([Id]),
 CONSTRAINT [FK_CustomerToReservations_Reservation] FOREIGN KEY([ReservationId])
REFERENCES [ValetAPI.Models].[Reservation] ([Id])
)
