CREATE TABLE [ValetAPI.Models].[SittingToReservations](
	[SittingId] [int] NOT NULL,
	[ReservationId] [int] NOT NULL,
 CONSTRAINT [FK_SittingToReservations_Reservation] FOREIGN KEY([ReservationId])
REFERENCES [ValetAPI.Models].[Reservation] ([Id]),
 CONSTRAINT [FK_SittingToReservations_Sitting] FOREIGN KEY([SittingId])
REFERENCES [ValetAPI.Models].[Sitting] ([Id])
)
